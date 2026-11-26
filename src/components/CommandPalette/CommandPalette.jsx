import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  FiArrowRight, FiBookOpen, FiCopy, FiFileText, FiFolder, FiGlobe, FiHome,
  FiMail, FiMoon, FiSearch, FiSun, FiUser, FiCode, FiBriefcase,
} from "react-icons/fi"
import { FaGithub, FaGitlab, FaLinkedin, FaTelegram } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { filterCommands } from "@/lib/commandSearch"
import { getTheme, toggleTheme } from "@/lib/theme"
import { track } from "@/lib/analytics"
import { SITE } from "@/config/site"
import { PROJECTS, localizeProject } from "@/Page/Projects/projectsData"

const LANGS = [
  { code: "uz", label: "O'zbekcha" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
]

/**
 * Ctrl/⌘+K palette: jump to any page or project, switch theme/language, copy
 * the email or open a profile. Lazy-loaded by MainLayout on the first
 * shortcut press / search-button click, so it costs nothing until used.
 * MainLayout mounts it only while open, so every open starts fresh.
 * Implements the WAI-ARIA combobox + listbox pattern by hand (no Radix).
 */
export default function CommandPalette({ onClose }) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const [notice, setNotice] = useState("")
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const returnFocusRef = useRef(null)

  const items = useMemo(() => {
    const go = (to) => () => navigate(to)
    const external = (href) => () => window.open(href, "_blank", "noopener,noreferrer")
    const pages = [
      { id: "p-home", label: t("NAV_HOME"), icon: FiHome, run: go("/"), keywords: ["home", "bosh"] },
      { id: "p-about", label: t("NAV_ABOUT"), icon: FiUser, run: go("/about"), keywords: ["about", "haqida"] },
      { id: "p-projects", label: t("NAV_PROJECTS"), icon: FiFolder, run: go("/projects"), keywords: ["projects", "portfolio", "loyiha"] },
      { id: "p-skills", label: t("NAV_SKILLS"), icon: FiCode, run: go("/skills"), keywords: ["skills", "stack"] },
      { id: "p-offer", label: t("SERVICES_TITLE"), icon: FiBriefcase, run: go("/offer"), keywords: ["services", "offer", "xizmat"] },
      { id: "p-blog", label: t("NAV_BLOG"), icon: FiBookOpen, run: go("/blog"), keywords: ["blog", "articles", "maqola"] },
      { id: "p-resume", label: t("NAV_RESUME"), icon: FiFileText, run: go("/resume"), keywords: ["resume", "cv", "rezyume", "pdf"] },
      { id: "p-contact", label: t("NAV_CONTACT"), icon: FiMail, run: go("/contact"), keywords: ["contact", "hire", "aloqa"] },
    ].map((i) => ({ ...i, group: t("CMD_GROUP_PAGES") }))

    const projects = PROJECTS.map((p) => {
      const lp = localizeProject(p, t)
      return {
        id: `proj-${p.id}`,
        label: lp.title,
        icon: FiFolder,
        run: go(`/projects/${p.id}`),
        keywords: [...(p.categories ?? []), ...(lp.tech ?? []).slice(0, 8)],
        group: t("CMD_GROUP_PROJECTS"),
      }
    })

    const isLight = getTheme() === "light"
    const actions = [
      {
        id: "a-theme",
        label: isLight ? t("THEME_TO_DARK") : t("THEME_TO_LIGHT"),
        icon: isLight ? FiMoon : FiSun,
        run: () => toggleTheme(),
        keywords: ["theme", "dark", "light", "tema", "mavzu"],
      },
      ...LANGS.filter((l) => l.code !== i18n.language).map((l) => ({
        id: `a-lang-${l.code}`,
        label: `${t("CMD_LANGUAGE")}: ${l.label}`,
        icon: FiGlobe,
        run: () => {
          i18n.changeLanguage(l.code)
          localStorage.setItem("lang", l.code)
        },
        keywords: ["language", "til", "язык", l.code],
      })),
      {
        id: "a-email",
        label: t("CMD_COPY_EMAIL"),
        icon: FiCopy,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(SITE.email)
            setNotice(t("CMD_COPIED"))
          } catch {
            setNotice(SITE.email)
          }
        },
        keywords: ["email", "mail", "gmail", "copy"],
      },
      { id: "a-github", label: "GitHub", icon: FaGithub, run: external(SITE.links.github), keywords: ["github", "code", "repo"] },
      { id: "a-gitlab", label: "GitLab", icon: FaGitlab, run: external(SITE.links.gitlab), keywords: ["gitlab", "code", "repo"] },
      { id: "a-telegram", label: "Telegram", icon: FaTelegram, run: external(SITE.links.telegram), keywords: ["telegram", "chat"] },
      { id: "a-linkedin", label: "LinkedIn", icon: FaLinkedin, run: external(SITE.links.linkedin), keywords: ["linkedin"] },
    ].map((i) => ({ ...i, group: t("CMD_GROUP_ACTIONS") }))

    return [...pages, ...actions, ...projects]
  }, [t, i18n, navigate])

  const results = useMemo(() => filterCommands(items, query), [items, query])

  // Mount: remember focus, lock scroll, focus the input. Unmount: restore both.
  useEffect(() => {
    returnFocusRef.current = document.activeElement
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      cancelAnimationFrame(id)
      document.body.style.overflow = prevOverflow
      returnFocusRef.current?.focus?.()
    }
  }, [])

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  const runItem = (item) => {
    if (!item) return
    track("command_palette_run", { command: item.id })
    item.run()
    if (!item.keepOpen) onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      runItem(results[active])
    } else if (e.key === "Escape") {
      e.preventDefault()
      onClose()
    } else if (e.key === "Tab") {
      // The input is the only focus stop; keep focus inside the dialog.
      e.preventDefault()
    }
  }

  const activeId = results[active] ? `cmd-${results[active].id}` : undefined

  return createPortal(
    <div className="no-print fixed inset-0 z-1400 flex items-start justify-center px-3 pt-[12vh]">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/55 animate-in fade-in-0 duration-200"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("CMD_TITLE")}
        className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-white/10 bg-popover shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
      >
        <div className="flex items-center gap-3 border-b border-white/8 px-4">
          <FiSearch size={18} className="shrink-0 text-white/45" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
              setNotice("")
            }}
            onKeyDown={onKeyDown}
            placeholder={t("CMD_PLACEHOLDER")}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            className="h-14 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/40"
          />
          <kbd className="hidden shrink-0 rounded-md border border-white/12 px-1.5 py-0.5 font-mono text-[11px] text-white/45 sm:block">
            Esc
          </kbd>
        </div>

        <ul
          id="cmd-list"
          ref={listRef}
          role="listbox"
          aria-label={t("CMD_TITLE")}
          className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-white/50">{t("CMD_EMPTY")}</li>
          )}
          {results.map((item, index) => {
            const Icon = item.icon
            const selected = index === active
            return (
              <li
                key={item.id}
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={selected}
                data-index={index}
                onMouseMove={() => !selected && setActive(index)}
                onClick={() => runItem(item)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-white/80 transition-colors",
                  selected && "bg-primary/15 text-white"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-white/60",
                    selected && "border-primary/40 text-accent"
                  )}
                >
                  <Icon size={15} />
                </span>
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <span className="shrink-0 text-[11px] text-white/40">{item.group}</span>
                {selected && <FiArrowRight size={14} className="shrink-0 text-accent" aria-hidden="true" />}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-white/8 px-4 py-2.5 text-[11.5px] text-white/45">
          <span aria-live="polite" className="font-semibold text-accent">{notice}</span>
          <span className="hidden gap-3 sm:flex">
            <span><kbd className="font-mono">↑↓</kbd> {t("CMD_HINT_NAVIGATE")}</span>
            <span><kbd className="font-mono">↵</kbd> {t("CMD_HINT_SELECT")}</span>
          </span>
        </div>
      </div>
    </div>,
    document.body
  )
}
