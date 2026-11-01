import { lazy, Suspense, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { LanguageSwitcher, Logo, NavLinks } from './HeaderParts'

const MobileMenu = lazy(() => import('./MobileMenu'))

export default function Header() {
  const [open, setOpen] = useState(false)
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
      <div className="hidden md:block">
        <LanguageSwitcher compact />
      </div>

      <button
        type="button"
        onClick={openMenu}
        // Start fetching the menu chunk as soon as a finger lands on the button.
        onPointerDown={() => import('./MobileMenu')}
        aria-label="Menu"
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
      >
        <FiMenu size={22} />
      </button>

      {menuMounted && (
        <Suspense fallback={null}>
          <MobileMenu open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </div>
  )
}
