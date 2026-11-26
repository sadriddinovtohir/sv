import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { _resetGithubCache, aggregateStats, handleGithubStats, repoCounts } from "./github.js"

const user = {
  login: "dev", name: "Dev", avatar_url: "a", html_url: "https://github.com/dev", bio: null,
  followers: 7, following: 1, public_repos: 4, created_at: "2023-01-01T00:00:00Z",
}
const repo = (over) => ({
  name: "r", description: null, html_url: "u", homepage: "", language: "JavaScript",
  stargazers_count: 0, forks_count: 0, pushed_at: "2026-01-01T00:00:00Z", fork: false, archived: false,
  ...over,
})

describe("aggregateStats", () => {
  it("ignores forks and archived repos and totals stars/forks", () => {
    const stats = aggregateStats(user, [
      repo({ name: "a", stargazers_count: 3, forks_count: 1 }),
      repo({ name: "b", stargazers_count: 2, language: "TypeScript" }),
      repo({ name: "fork", fork: true, stargazers_count: 100 }),
      repo({ name: "old", archived: true, stargazers_count: 50 }),
    ])
    expect(stats.totals).toEqual({ repos: 2, stars: 5, forks: 1 })
    expect(stats.profile.followers).toBe(7)
  })

  it("ranks languages by repo count with percentages", () => {
    const stats = aggregateStats(user, [
      repo({ name: "a" }), repo({ name: "b" }), repo({ name: "c", language: "CSS" }), repo({ name: "d", language: null }),
    ])
    expect(stats.languages).toEqual([
      { name: "JavaScript", count: 2, percent: 66.7 },
      { name: "CSS", count: 1, percent: 33.3 },
    ])
  })

  it("does not expose individual repositories", () => {
    expect(aggregateStats(user, [repo({ name: "secret-ish" })])).not.toHaveProperty("recent")
  })
})

describe("repoCounts", () => {
  it("adds public and private into a total", () => {
    expect(repoCounts(12, 5)).toEqual({ public: 12, private: 5, total: 17 })
    expect(repoCounts(0, 0)).toEqual({ public: 0, private: 0, total: 0 })
  })

  it("leaves private and total unknown without an owner token", () => {
    expect(repoCounts(12, null)).toEqual({ public: 12, private: null, total: null })
  })
})

describe("handleGithubStats", () => {
  beforeEach(() => {
    _resetGithubCache()
    delete process.env.GITHUB_TOKEN
    delete process.env.GITLAB_TOKEN
    vi.spyOn(console, "error").mockImplementation(() => {})
  })
  afterEach(() => vi.unstubAllGlobals())

  // Fake GitHub + GitLab. The owner tokens are "gh-owner" / "gl-owner".
  const okFetch = () =>
    vi.fn(async (url, init = {}) => {
      const u = String(url)
      const auth = init.headers?.Authorization ?? init.headers?.["PRIVATE-TOKEN"] ?? ""
      let body = { ...user, login: "sadriddinovtohir" }
      if (u.endsWith("api.github.com/user")) body = { login: auth.includes("gh-owner") ? "sadriddinovtohir" : "someone", owned_private_repos: 5 }
      else if (u.includes("api.github.com") && u.includes("/repos")) body = [repo({ name: "x", stargazers_count: 2 })]
      else if (u.includes("/api/v4/users?username=")) body = [{ id: 1, username: "gl", name: "GL", avatar_url: "a", web_url: "https://gitlab.com/gl" }]
      else if (u.endsWith("/api/v4/user")) body = { id: auth === "gl-owner" ? 1 : 99 }
      else if (u.includes("/api/v4/projects?membership")) body = [{ visibility: "public" }, { visibility: "private" }, { visibility: "private" }, { visibility: "internal" }]
      else if (u.includes("/api/v4/users/1/projects")) body = [{ id: 10 }]
      return { ok: true, json: async () => body }
    })

  it("shows only public counts without tokens", async () => {
    vi.stubGlobal("fetch", okFetch())
    const { body } = await handleGithubStats({ now: 0 })
    expect(body.repos).toEqual({ public: 4, private: null, total: null })
    expect(body.gitlab.repos).toEqual({ public: 1, private: null, total: null })
  })

  it("adds private and total counts with the owners' tokens", async () => {
    process.env.GITHUB_TOKEN = "gh-owner"
    process.env.GITLAB_TOKEN = "gl-owner"
    vi.stubGlobal("fetch", okFetch())
    const { body } = await handleGithubStats({ now: 0 })
    expect(body.repos).toEqual({ public: 4, private: 5, total: 9 })
    expect(body.gitlab.repos).toEqual({ public: 1, private: 3, total: 4 })
  })

  it("ignores tokens that belong to another account", async () => {
    process.env.GITHUB_TOKEN = "gh-other"
    process.env.GITLAB_TOKEN = "gl-other"
    vi.stubGlobal("fetch", okFetch())
    const { body } = await handleGithubStats({ now: 0 })
    expect(body.repos.private).toBeNull()
    expect(body.gitlab.repos.private).toBeNull()
  })

  it("fetches, caches for an hour and sets CDN cache headers", async () => {
    const fetchMock = okFetch()
    vi.stubGlobal("fetch", fetchMock)
    const first = await handleGithubStats({ now: 0 })
    expect(first.statusCode).toBe(200)
    expect(first.headers["Cache-Control"]).toContain("s-maxage=3600")
    expect(first.body.totals.stars).toBe(2)
    expect(first.body.gitlab).toEqual({
      login: "gl", name: "GL", avatar: "a", url: "https://gitlab.com/gl",
      repos: { public: 1, private: null, total: null },
    })
    const calls = fetchMock.mock.calls.length

    await handleGithubStats({ now: 30 * 60 * 1000 })
    expect(fetchMock).toHaveBeenCalledTimes(calls) // served from memory
  })

  it("serves the last good copy when GitHub fails", async () => {
    vi.stubGlobal("fetch", okFetch())
    await handleGithubStats({ now: 0 })
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 403 })))
    const res = await handleGithubStats({ now: 2 * 60 * 60 * 1000 })
    expect(res.statusCode).toBe(200)
    expect(res.body.stale).toBe(true)
  })

  it("returns 502 when GitHub fails and nothing is cached", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 403 })))
    const res = await handleGithubStats({ now: 0 })
    expect(res.statusCode).toBe(502)
    expect(res.headers["Cache-Control"]).toBe("no-store")
  })
})
