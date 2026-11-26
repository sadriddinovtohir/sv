import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { LanguageSwitcher, Logo, NavLinks, SearchButton, ThemeToggle } from './HeaderParts'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [open, setOpen] = useState(false)

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
          onClick={() => setOpen(true)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
        >
          <FiMenu size={22} />
        </button>
      </div>

      {/* Always mounted (it's light): opening is just a CSS transform. */}
      <MobileMenu open={open} onOpenChange={setOpen} />
    </div>
  )
}
