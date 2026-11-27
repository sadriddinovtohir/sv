import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa"
import { FiDownload, FiFileText, FiMail, FiMapPin, FiPhone } from "react-icons/fi"
import { Seo } from "@/components/common/Seo"
import { Button } from "@/components/ui/button"
import { SITE } from "@/config/site"
import { track } from "@/lib/analytics"
import { summarize } from "@/lib/text"
import { skillCategoryData } from "@/data/skillsData"
import { PROJECTS, localizeProject } from "@/Page/Projects/projectsData"

// The projects worth a recruiter's 30 seconds, in this order.
const RESUME_PROJECTS = ["uzfixcar", "zukko-crm", "zukko-backend", "studance-crm", "studance-backend", "gap-bot"]

// "example.com/path" — full URLs are printed as text so they stay readable on paper.
const prettyUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

// The link printed next to a project. Projects whose `link` is only the
// Telegram contact (no public demo) fall back to their repository, if any.
const projectLink = (p) => (p.link && !p.telegramContact ? p.link : p.giturl || p.gitlab || null)

function ProjectUrl({ href }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block text-[12.5px] break-all text-accent hover:underline">
      {prettyUrl(href)}
    </a>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="break-after-avoid mb-3 border-b border-white/10 pb-1.5 text-[13px] font-bold tracking-[0.14em] text-accent uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

/**
 * `/resume` — a one-page CV generated from the same data as the rest of the
 * site, so it never goes stale. "Download PDF" opens the browser's print
 * dialog; the print styles in index.css drop the site chrome and switch to
 * dark-on-white ink, so "Save as PDF" gives a clean A4 document.
 */
export default function Resume() {
  const { t } = useTranslation()

  const projects = useMemo(
    () =>
      RESUME_PROJECTS.map((id) => PROJECTS.find((p) => p.id === id))
        .filter(Boolean)
        .map((p) => localizeProject(p, t)),
    [t]
  )

  // Everything else on the projects page, listed compactly so the PDF shows
  // the whole portfolio, not only the highlights.
  const otherProjects = useMemo(
    () => PROJECTS.filter((p) => !RESUME_PROJECTS.includes(p.id)).map((p) => localizeProject(p, t)),
    [t]
  )

  const contacts = [
    { icon: <FiMail />, label: SITE.email, href: `mailto:${SITE.email}` },
    { icon: <FiPhone />, label: SITE.phone, href: SITE.phoneHref },
    { icon: <FiMapPin />, label: SITE.location },
    { icon: <FaGithub />, label: "github.com/" + SITE.githubUser, href: SITE.links.github },
    { icon: <FaLinkedin />, label: "LinkedIn", href: SITE.links.linkedin },
    { icon: <FaTelegram />, label: "@tohir_sadriddinov", href: SITE.links.telegram },
    { icon: <FiFileText />, label: prettyUrl(SITE.resumeUrl), href: SITE.resumeUrl },
  ]

  const download = () => {
    track("resume_download")
    window.print()
  }

  return (
    <div className="pt-8 pb-14 md:pt-12">
      <Seo title={t("NAV_RESUME")} description={t("RESUME_DESC")} />

      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-[560px] text-[13.5px] text-white/60">{t("RESUME_HINT")}</p>
        <Button variant="brand" onClick={download} className="h-10.5 rounded-xl px-5 text-[14px]">
          <FiDownload size={15} /> {t("RESUME_DOWNLOAD")}
        </Button>
      </div>

      <article className="mx-auto max-w-[860px] rounded-2xl border border-white/8 bg-white/[0.035] p-6 text-white sm:p-10 print:max-w-none print:rounded-none print:border-0 print:bg-transparent print:p-0">
        <header className="mb-7">
          <h1 className="text-[clamp(1.6rem,1.2rem+2vw,2.4rem)] leading-tight font-extrabold tracking-tight">
            {SITE.name}
          </h1>
          <p className="text-aurora mt-0.5 text-lg font-bold print:text-[#3d6bff]">{t("ROLE_TITLE")}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-white/70">
            {contacts.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <span className="text-accent">{c.icon}</span>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {c.label}
                  </a>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ul>
        </header>

        <div className="flex flex-col gap-7">
          <Section title={t("RESUME_SUMMARY")}>
            <p className="text-[14px] leading-[1.75] text-white/80">{t("I")}</p>
          </Section>

          <Section title={t("experience")}>
            <p className="text-[14px] leading-[1.75] text-white/80">{t("exp_text")}</p>
          </Section>

          <Section title={t("RESUME_PROJECTS")}>
            <ul className="flex flex-col gap-4">
              {projects.map((p) => (
                <li key={p.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <Link to={`/projects/${p.id}`} className="text-[15px] font-bold text-white hover:text-accent">
                      {p.title}
                    </Link>
                    {p.tech?.length > 0 && (
                      <span className="text-[12px] text-white/50">{p.tech.slice(0, 5).join(" · ")}</span>
                    )}
                  </div>
                  <ProjectUrl href={projectLink(p)} />
                  <p className="mt-1 text-[13.5px] leading-[1.7] text-white/70">{summarize(p.desc)}</p>
                </li>
              ))}
            </ul>
          </Section>

          {otherProjects.length > 0 && (
            <Section title={t("RESUME_OTHER_PROJECTS")}>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 print:grid-cols-2">
                {otherProjects.map((p) => (
                  <li key={p.id} className="break-inside-avoid">
                    <Link to={`/projects/${p.id}`} className="block text-[13.5px] font-bold text-white hover:text-accent">
                      {p.title}
                    </Link>
                    {p.tech?.length > 0 && (
                      <span className="block text-[12px] text-white/50">{p.tech.slice(0, 4).join(" · ")}</span>
                    )}
                    <ProjectUrl href={projectLink(p)} />
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title={t("SKILLS_TITLE")}>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {skillCategoryData.map((cat) => (
                <div key={cat.labelKey} className="break-inside-avoid">
                  <dt className="text-[13px] font-bold text-white">{t(cat.labelKey)}</dt>
                  <dd className="text-[13px] leading-[1.65] text-white/70">
                    {cat.skills.map((s) => s.name).join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title={t("RESUME_EDUCATION")}>
            <p className="text-[14px] leading-[1.75] text-white/80">{t("RESUME_EDUCATION_TEXT")}</p>
          </Section>

          <p className="border-t border-white/10 pt-3 text-[12.5px] text-white/60">
            {t("RESUME_ONLINE")}:{" "}
            <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="font-semibold text-accent hover:underline">
              {SITE.resumeUrl}
            </a>
          </p>
        </div>
      </article>
    </div>
  )
}
