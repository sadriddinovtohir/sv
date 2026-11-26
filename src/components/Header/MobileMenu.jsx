import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/nav'
import { LanguageSwitcher, Logo } from './HeaderParts'

/**
 * Mobile drawer. Hand-rolled instead of a Radix Sheet: it is always mounted
 * (no chunk to fetch on the first tap, no portal/mount work on every open)
 * and only `transform`/`opacity` animate, so the slide stays on the GPU and
 * doesn't stutter on phones. Closed, it is `inert`: hidden from taps, focus
 * and screen readers.
 */
export default function MobileMenu({ open, onOpenChange }) {
  const { t } = useTranslation()
  const panelRef = useRef(null)
  const close = () => onOpenChange(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    // Lock page scroll behind the drawer. overflow on <html> only — no
    // scrollbar-width padding tricks, so nothing on the page reflows.
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    panelRef.current?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  return createPortal(
    <div className="md:hidden" inert={!open}>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          'fixed inset-0 z-1300 bg-black/60 transition-opacity duration-300 ease-out',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('NAV_HOME')}
        tabIndex={-1}
        className={cn(
          'fixed inset-y-0 right-0 z-1301 flex w-[82%] max-w-[340px] flex-col border-l border-white/10 bg-background shadow-[-24px_0_60px_rgba(0,0,0,0.45)] outline-none',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Top bar: logo + close */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
          <div onClick={close}>
            <Logo />
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex size-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-white/80 transition-colors active:bg-white/12"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-5">
          {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }, i) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={close}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : '0ms' }}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[15px] font-semibold',
                  'transition-[opacity,translate,background-color,color] duration-300 ease-out',
                  open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-[#2f9bff] text-snow shadow-[0_6px_20px_-6px_rgba(61,107,255,0.7)]'
                    : 'text-white/75 active:bg-white/8'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-xl',
                      isActive ? 'bg-white/20' : 'bg-white/6 text-accent'
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  {t(labelKey)}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Language */}
        <div className="border-t border-white/8 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <LanguageSwitcher className="w-full [&>button]:h-11 [&>ul]:top-auto [&>ul]:bottom-full [&>ul]:mt-0 [&>ul]:mb-2 [&>ul]:w-full" />
        </div>
      </div>
    </div>,
    document.body
  )
}
