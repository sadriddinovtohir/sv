import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiGlobe, FiChevronDown } from 'react-icons/fi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/nav'
import { useState } from 'react'

const LANGS = [
  { code: 'en', country: 'gb', badge: 'EN', color: '#38bdf8', label: 'English' },
  { code: 'uz', country: 'uz', badge: 'UZ', color: '#22c55e', label: "O'zbek" },
  { code: 'ru', country: 'ru', badge: 'RU', color: '#ff2d55', label: 'Русский' },
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

function LanguageSwitcher({ currentLang, changeLang, className }) {
  const current = LANGS.find((l) => l.code === currentLang) || LANGS[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[13px] font-medium text-white/85 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/10',
            className
          )}
        >
          <FiGlobe size={14} className="text-primary" />
          <LangFlag country={current.country} badge={current.badge} color={current.color} />
          <span>{current.label}</span>
          <FiChevronDown size={12} className="text-white/50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px] border-white/10 bg-[rgba(18,18,28,0.95)] backdrop-blur-2xl">
        {LANGS.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLang(lang.code)}
            className={cn(
              'gap-2.5 text-[13px]',
              currentLang === lang.code ? 'font-semibold text-accent' : 'text-white/75'
            )}
          >
            <LangFlag country={lang.country} badge={lang.badge} color={lang.color} />
            <span>{lang.label}</span>
            {currentLang === lang.code && <span className="ml-auto text-[10px] text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NavLinks({ orientation = 'row', onNavigate }) {
  const { t } = useTranslation()
  return (
    <nav
      className={cn(
        'flex gap-1.5 rounded-full border border-white/7 bg-white/4 p-2 backdrop-blur-2xl',
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
              'flex items-center justify-center gap-1.5 rounded-full px-4 py-1.75 text-sm font-medium whitespace-nowrap text-white/65 transition-all duration-300 hover:bg-white/8 hover:text-white',
              orientation === 'column' && 'justify-start gap-3 bg-white/5 px-5 py-3.5 text-base',
              isActive && 'bg-primary text-white hover:bg-primary hover:text-white'
            )
          }
        >
          <Icon size={orientation === 'column' ? 19 : undefined} /> {t(labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const isMobile = useMediaQuery('(max-width:724px)')

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }
  const currentLang = i18n.language

  if (isMobile) {
    return (
      <div className="flex items-center justify-between p-2.5">
        <span className="text-lg font-medium">T.S</span>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label={t('NAV_HOME')}>
          <FiMenu size={22} />
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="right"
            className="z-1300 w-4/5 border-white/10 bg-[#1a0008] text-white"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col p-6">
              <span className="text-xl font-semibold">T.S</span>

              <div className="flex flex-1 flex-col items-center justify-center gap-8">
                <NavLinks orientation="column" onNavigate={() => setOpen(false)} />
                <LanguageSwitcher currentLang={currentLang} changeLang={changeLang} className="w-full justify-center py-2.5" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-2.5">
      <NavLinks orientation="row" />
      <LanguageSwitcher currentLang={currentLang} changeLang={changeLang} />
    </div>
  )
}
