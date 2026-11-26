import { lazy, Suspense, useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { LanguageSwitcher, Logo, NavLinks, SearchButton, ThemeToggle } from './HeaderParts'

const loadMobileMenu = () => import('./MobileMenu')
const MobileMenu = lazy(loadMobileMenu)

export default function Header() {
  const [open, setOpen] = useState(false)

  // On phones, fetch the menu chunk once the page is idle, so the first tap
  // opens the drawer at once instead of waiting on the network mid-animation.
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    const cancel = window.cancelIdleCallback || clearTimeout
    const id = idle(() => loadMobileMenu())
    return () => cancel(id)
  }, [])
  // Stays true after the first open so the Sheet can play its close animation.
  const [menuMounted, setMenuMounted] = useState(false)

  const openMenu = () => {
    setMenuMounted(true)
    setOpen(true)
  }

  // Desktop and mobile layouts are both rendered and toggled with CSS
  // breakpoints, so the right one is there on the very first paint — a JS
  // media query used to flip it after mount and the header visibly jumped.
  return (
    <div className="flex h-14 items-center justify-between gap-3 md:h-16">
      <Logo />

      <div className="hidden flex-1 justify-center md:flex">
        <NavLinks orientation="row" />
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <SearchButton />
        <ThemeToggle />
        <LanguageSwitcher compact />
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <SearchButton />
        <ThemeToggle />
        <button
          type="button"
          onClick={openMenu}
          // Start fetching the menu chunk as soon as a finger lands on the button.
          onPointerDown={loadMobileMenu}
          aria-label="Menu"
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
        >
          <FiMenu size={22} />
        </button>
      </div>

      {menuMounted && (
        <Suspense fallback={null}>
          <MobileMenu open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </div>
  )
}
