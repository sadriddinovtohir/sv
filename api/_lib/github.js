// GitHub + GitLab profile stats for the portfolio's "GitHub & GitLab" section.
//
// Runs server-side (Vercel function in production, Vite middleware in dev) so
// that an optional GITHUB_TOKEN never reaches the browser and the response can
// be cached at the CDN. Only the configured account is ever fetched — the
// endpoint takes no username parameter, so it can't be abused as a proxy.
//
// Without a token GitHub allows 60 requests/hour per server IP; the CDN cache
// (1h) plus the in-memory cache below keep us far under that.
//
// Optional env vars (server-side only, never sent to the browser):
//   GITHUB_TOKEN — owner's token: adds the private repo count.
//   GITLAB_TOKEN — owner's token (read_api): adds private project counts.
// Only counts are returned; private repo names are never exposed.

const API = "https://api.github.com"
const CACHE_MS = 60 * 60 * 1000
const MAX_REPO_PAGES = 3

let cache = { key: "", at: 0, data: null }

/** Pure aggregation, kept separate from fetching so it can be unit-tested. */
export function aggregateStats(user, repos) {
  const own = repos.filter((r) => !r.fork && !r.archived)

  const langCount = new Map()
  for (const r of own) {
    if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1)
  }
  const langTotal = [...langCount.values()].reduce((a, b) => a + b, 0)
  const languages = [...langCount.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([name, count]) => ({ name, count, percent: Math.round((count / langTotal) * 1000) / 10 }))

  return {
    profile: {
      login: user.login,
      name: user.name,
      avatar: user.avatar_url,
      url: user.html_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      createdAt: user.created_at,
    },
    totals: {
      repos: own.length,
      stars: own.reduce((s, r) => s + (r.stargazers_count || 0), 0),
      forks: own.reduce((s, r) => s + (r.forks_count || 0), 0),
    },
    languages,
    fetchedAt: new Date().toISOString(),
  }
}

async function gh(path, token) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-github-stats",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) {
    const err = new Error(`GitHub ${res.status} on ${path}`)
    err.status = res.status
    throw err
  }
  return res.json()
}

/**
 * Public / private / total repository counts. `private` and `total` stay
 * null when they can't be known (no owner token), so the UI can show only
 * what is actually true instead of a misleading total.
 */
export function repoCounts(publicCount, privateCount) {
  const pub = Number(publicCount) || 0
  if (privateCount == null) return { public: pub, private: null, total: null }
  const priv = Number(privateCount) || 0
  return { public: pub, private: priv, total: pub + priv }
}

// Private GitHub repo count. Needs GITHUB_TOKEN of the profile owner
// (classic: "repo" scope; fine-grained: all repositories, Metadata read-only).
// A token that belongs to someone else is ignored.
async function fetchGithubPrivateCount(login, token) {
  if (!token) return null
  const me = await gh("/user", token)
  if (String(me.login).toLowerCase() !== login.toLowerCase()) return null
  if (typeof me.owned_private_repos === "number") return me.owned_private_repos
  let count = 0
  for (let page = 1; page <= MAX_REPO_PAGES; page++) {
    const batch = await gh(`/user/repos?visibility=private&affiliation=owner&per_page=100&page=${page}`, token)
    count += batch.length
    if (batch.length < 100) break
  }
  return count
}

async function gl(path, token) {
  const res = await fetch(`https://gitlab.com/api/v4${path}`, token ? { headers: { "PRIVATE-TOKEN": token } } : undefined)
  if (!res.ok) {
    const err = new Error(`GitLab ${res.status} on ${path}`)
    err.status = res.status
    throw err
  }
  return res.json()
}

// GitLab's public API gives the profile (name, avatar, link) without a token.
// With GITLAB_TOKEN (the owner's, "read_api" scope) the project counts also
// cover private projects, including ones in groups the owner maintains.
// Never fails the whole response: any error just yields null.
export async function fetchGitlabProfile(username, token = "") {
  try {
    const users = await gl(`/users?username=${encodeURIComponent(username)}`)
    const user = users?.[0]
    if (!user) return null

    let projects = null
    if (token) {
      const me = await gl("/user", token).catch(() => null)
      if (me && me.id === user.id) {
        projects = []
        for (let page = 1; page <= MAX_REPO_PAGES; page++) {
          const batch = await gl(`/projects?membership=true&min_access_level=40&archived=false&per_page=100&page=${page}`, token)
          projects.push(...batch)
          if (batch.length < 100) break
        }
      }
    }

    let counts
    if (projects) {
      const pub = projects.filter((p) => p.visibility === "public").length
      counts = repoCounts(pub, projects.length - pub)
    } else {
      const publicList = await gl(`/users/${user.id}/projects?per_page=100&simple=true`).catch(() => [])
      projects = Array.isArray(publicList) ? publicList : []
      counts = repoCounts(projects.length, null)
    }

    return {
      login: user.username,
      name: user.name,
      avatar: user.avatar_url,
      url: user.web_url,
      repos: counts,
    }
  } catch {
    return null
  }
}

export async function fetchGithubStats(login, token) {
  const user = await gh(`/users/${encodeURIComponent(login)}`, token)
  const repos = []
  for (let page = 1; page <= MAX_REPO_PAGES; page++) {
    const batch = await gh(`/users/${encodeURIComponent(login)}/repos?per_page=100&type=owner&sort=pushed&page=${page}`, token)
    repos.push(...batch)
    if (batch.length < 100) break
  }
  const privateCount = await fetchGithubPrivateCount(login, token).catch(() => null)
  return { ...aggregateStats(user, repos), repos: repoCounts(user.public_repos, privateCount) }
}

/** Shared by api/github.js and the Vite dev middleware. */
export async function handleGithubStats({ now = Date.now() } = {}) {
  const login = process.env.GITHUB_USERNAME || "sadriddinovtohir"
  const gitlabUser = process.env.GITLAB_USERNAME || "sadriddinovtohir"
  const token = process.env.GITHUB_TOKEN || ""
  const gitlabToken = process.env.GITLAB_TOKEN || ""
  const headers = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" }

  if (cache.data && cache.key === login && now - cache.at < CACHE_MS) {
    return { statusCode: 200, headers, body: cache.data }
  }

  try {
    const [github, gitlab] = await Promise.all([fetchGithubStats(login, token), fetchGitlabProfile(gitlabUser, gitlabToken)])
    const data = { ...github, gitlab }
    cache = { key: login, at: now, data }
    return { statusCode: 200, headers, body: data }
  } catch (err) {
    console.error("GitHub stats error:", err.message)
    // Serve the last good copy rather than an error when GitHub hiccups or
    // the anonymous rate limit runs out.
    if (cache.data && cache.key === login) {
      return { statusCode: 200, headers, body: { ...cache.data, stale: true } }
    }
    const statusCode = err.status === 404 ? 404 : 502
    return { statusCode, headers: { "Cache-Control": "no-store" }, body: { error: "GitHub is unavailable" } }
  }
}

/** Test hook: forget the in-memory cache. */
export function _resetGithubCache() {
  cache = { key: "", at: 0, data: null }
}
