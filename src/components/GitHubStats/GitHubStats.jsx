import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGithub, FaGitlab } from "react-icons/fa"
import { FiArrowUpRight } from "react-icons/fi"
import { GlassPanel } from "@/components/common/GlassPanel"
import { SITE } from "@/config/site"

// GitHub's own language colors for what appears in this profile; others get gray.
const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", HTML: "#e34c26", CSS: "#563d7c",
  SCSS: "#c6538c", Python: "#3572A5", Vue: "#41b883", Shell: "#89e051",
  Dockerfile: "#384d54", Java: "#b07219", Go: "#00ADD8", PHP: "#4F5D95",
}
const langColor = (name) => LANG_COLORS[name] ?? "#8b949e"

// Loads once, the first time the section scrolls near the viewport, so the
// home page's first paint never waits on GitHub/GitLab.
function useProfileStats() {
  const ref = useRef(null)
  const [state, setState] = useState({ status: "idle", data: null })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let cancelled = false
    const load = () => {
      setState({ status: "loading", data: null })
      fetch("/api/github")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
        .then((data) => !cancelled && setState({ status: "ready", data }))
        .catch(() => !cancelled && setState({ status: "error", data: null }))
    }
    if (typeof IntersectionObserver === "undefined") {
      load()
      return () => { cancelled = true }
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          load()
        }
      },
      { rootMargin: "300px 0px" }
    )
    io.observe(node)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [])

  return { ref, ...state }
}

/**
 * One platform card: avatar, name, @handle, a few numbers and a profile link.
 * Without data (API down) it still renders as a plain link to the profile.
 */
function ProfileCard({ icon, platform, accent, profile, fallbackUrl, fallbackLogin, stats, loading }) {
  const { t } = useTranslation()
  const url = profile?.url ?? fallbackUrl
  return (
    <GlassPanel
      as="a"
      href={url}
      target="_blank"
      rel="noreferrer"
      hover
      accent={accent}
      className="group flex flex-col gap-4 p-5 sm:p-6"
    >
      <div className="flex items-center gap-3.5">
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt=""
            width="52"
            height="52"
            loading="lazy"
            className="size-13 shrink-0 rounded-full ring-2 ring-white/10"
          />
        ) : (
          <span className="flex size-13 shrink-0 items-center justify-center rounded-full bg-white/6 text-white/70 [&>svg]:size-6">
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold tracking-wide text-white/50 uppercase">
            <span className="flex [&>svg]:size-3.5" style={{ color: accent }}>{icon}</span> {platform}
          </p>
          <p className="truncate text-[16px] font-bold text-white">{profile?.name ?? SITE.name}</p>
          <p className="truncate text-[13px] text-white/55">@{profile?.login ?? fallbackLogin}</p>
        </div>
        <FiArrowUpRight size={18} className="shrink-0 text-white/40 transition-colors group-hover:text-accent" />
      </div>

      {loading ? (
        <div aria-hidden="true" className="h-[52px] animate-pulse rounded-xl bg-white/5" />
      ) : (
        stats.length > 0 && (
          <dl
            className="grid gap-2 border-t border-white/8 pt-4"
            style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="text-xl leading-tight font-extrabold text-white">{s.value}</dd>
                <dt className="mt-0.5 truncate text-[11px] text-white/50">{s.label}</dt>
              </div>
            ))}
          </dl>
        )
      )}

      <span className="text-[12.5px] font-semibold text-accent">
        {t("PROFILE_OPEN")} →
      </span>
    </GlassPanel>
  )
}

function LanguageBar({ languages }) {
  const { t } = useTranslation()
  if (!languages?.length) return null
  return (
    <GlassPanel className="p-4 sm:p-5">
      <p className="mb-3 text-sm font-bold text-white">{t("GITHUB_LANGUAGES")}</p>
      <div className="mb-3 flex h-2.5 overflow-hidden rounded-full bg-white/8">
        {languages.map((l) => (
          <span key={l.name} style={{ width: `${l.percent}%`, background: langColor(l.name) }} title={`${l.name} ${l.percent}%`} />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/70">
        {languages.map((l) => (
          <li key={l.name} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ background: langColor(l.name) }} />
            {l.name} <span className="text-white/45">{l.percent}%</span>
          </li>
        ))}
      </ul>
    </GlassPanel>
  )
}

/**
 * Public / private / total repo tiles. Private and total only appear when the
 * server knows them (owner tokens configured); otherwise just the public
 * count plus `extra` tiles, so nothing shown is a guess.
 */
function repoTiles(t, repos, extra = []) {
  if (!repos) return extra
  if (repos.private == null) return [{ label: t("REPOS_PUBLIC"), value: repos.public }, ...extra]
  return [
    { label: t("REPOS_PUBLIC"), value: repos.public },
    { label: t("REPOS_PRIVATE"), value: repos.private },
    { label: t("REPOS_TOTAL"), value: repos.total },
  ]
}

/**
 * GitHub and GitLab profiles side by side with their current numbers, plus
 * the GitHub language mix. Data comes from /api/github (cached server-side
 * for an hour); if it fails, the cards stay as plain profile links.
 */
export default function GitHubStats() {
  const { t } = useTranslation()
  const { ref, status, data } = useProfileStats()
  const loading = status === "idle" || status === "loading"
  const gl = data?.gitlab

  const githubStats = data
    ? repoTiles(t, data.repos, [
        { label: t("GITHUB_STARS"), value: data.totals.stars },
        { label: t("GITHUB_FOLLOWERS"), value: data.profile.followers },
      ])
    : []
  const gitlabStats = gl ? repoTiles(t, gl.repos) : []

  return (
    <section ref={ref} aria-labelledby="profiles-heading" className="mb-14">
      <div className="mb-5">
        <h2 id="profiles-heading" className="mb-0.5 text-[18px] font-bold text-white md:text-[22px]">
          {t("GITHUB_TITLE")}
        </h2>
        <span aria-hidden="true" className="heading-bar mb-1.5" />
        <p className="text-[13px] text-white/60">{t("GITHUB_SUBTITLE")}</p>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          <ProfileCard
            icon={<FaGithub />}
            platform="GitHub"
            accent="#8b9cff"
            profile={data?.profile}
            fallbackUrl={SITE.links.github}
            fallbackLogin={SITE.githubUser}
            stats={githubStats}
            loading={loading}
          />
          <ProfileCard
            icon={<FaGitlab />}
            platform="GitLab"
            accent="#fc6d26"
            profile={gl}
            fallbackUrl={SITE.links.gitlab}
            fallbackLogin={SITE.gitlabUser}
            stats={gitlabStats}
            loading={loading}
          />
        </div>
        {status === "ready" && <LanguageBar languages={data.languages} />}
      </div>
    </section>
  )
}
