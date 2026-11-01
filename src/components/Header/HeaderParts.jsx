import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { FiGlobe, FiChevronDown } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/nav'

const LANGS = [
  { code: 'en', country: 'gb', badge: 'EN', color: '#38bdf8', label: 'English' },
  { code: 'uz', country: 'uz', badge: 'UZ', color: '#22c55e', label: "O'zbek" },
  { code: 'ru', country: 'ru', badge: 'RU', color: '#f472b6', label: 'Русский' },
]

function LangFlag({ country, badge, color }) {
  return (
    <span
      className="inline-flex h-4 w-5.5 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border"
      style={{ background: `${color}22`, borderColor: `${color}55` }}
    >
      <img
        src={`https://flagcdn.com/24x18/${country}.png`}
        srcSet={`https://flagcdn.com/48x36/${country}.png 2x`}
        alt={badge}
        width={22}
        height={16}
        className="block h-full w-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    </span>
  )
}

function useLanguage() {
  const { i18n } = useTranslation()
  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }
  return { currentLang: i18n.language, changeLang }
}

/**
 * Language picker. A small hand-rolled menu instead of Radix DropdownMenu:
 * the header is on every first paint, and pulling a Radix primitive in there
 * put ~20 KB of mostly-unused JS on the critical path.
 */
export function LanguageSwitcher({ compact = false, className }) {
  const { currentLang, changeLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = LANGS.find((l) => l.code === currentLang) || LANGS[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[13px] font-medium text-white/85 transition-colors duration-200 hover:border-white/30 hover:bg-white/10"
      >
        <FiGlobe size={14} className="text-accent" />
        <LangFlag country={current.country} badge={current.badge} color={current.color} />
        {/* Tablet widths are tight once the nav is inline — show just the flag there. */}
        <span className={compact ? 'hidden lg:inline' : undefined}>{current.label}</span>
        <FiChevronDown size={12} className={cn('text-white/50 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute top-full right-0 z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-popover p-1 shadow-[0_16px_40px_rgba(0,0,0,0.5)] animate-in fade-in-0 zoom-in-95"
        >
          {LANGS.map((lang) => {
            const active = currentLang === lang.code
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    changeLang(lang.code)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors hover:bg-white/8',
                    active ? 'font-semibold text-accent' : 'text-white/75'
                  )}
                >
                  <LangFlag country={lang.country} badge={lang.badge} color={lang.color} />
                  <span>{lang.label}</span>
                  {active && <span className="ml-auto text-[10px] text-accent">✓</span>}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function NavLinks({ orientation = 'row', onNavigate }) {
  const { t } = useTranslation()
  return (
    <nav
      className={cn(
        'flex gap-1 rounded-full border border-white/8 bg-white/4 p-1.5',
        orientation === 'row'
          ? 'flex-row flex-wrap items-center'
          : 'w-full flex-col items-stretch gap-3 border-none bg-transparent p-0'
      )}
    >
      {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.75 text-sm font-medium whitespace-nowrap text-white/65 transition-colors duration-300 hover:bg-white/8 hover:text-white lg:px-4',
              orientation === 'row' && 'max-lg:[&>svg]:hidden',
              orientation === 'column' && 'justify-start gap-3 rounded-2xl bg-white/5 px-5 py-3.5 text-base',
              isActive && 'bg-gradient-to-r from-primary to-primary/70 text-white shadow-[0_4px_18px_rgba(124,92,255,0.45)] hover:bg-primary hover:text-white'
            )
          }
        >
          <Icon size={orientation === 'column' ? 19 : undefined} /> {t(labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}

export function Logo() {
  return (
    <NavLink
      to="/"
      className="group flex items-center gap-2.5 text-lg font-extrabold tracking-tight"
    >
      {/* Code-style mark: gradient frame around a dark tile with "<TS/>". */}
      <span className="rounded-xl bg-gradient-to-br from-primary via-accent to-glow p-px shadow-[0_0_18px_-4px_rgba(124,92,255,0.7)] transition-shadow duration-300 group-hover:shadow-[0_0_24px_-2px_rgba(34,211,238,0.7)]">
        <span className="flex h-9 items-center rounded-[11px] bg-background px-2 font-mono text-[13px] leading-none font-bold">
          <span className="text-accent transition-transform duration-300 group-hover:-translate-x-0.5">&lt;</span>
          <span className="text-white">TS</span>
          <span className="text-glow transition-transform duration-300 group-hover:translate-x-0.5">/&gt;</span>
        </span>
      </span>
      <span className="hidden lg:inline text-white/90">Tohirbek</span>
      {/* Accessible name on screens where only the "TS" monogram is visible. */}
      <span className="sr-only lg:hidden">Tohirbek Sadriddinov</span>
    </NavLink>
  )
}
