import { useTranslation } from 'react-i18next'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { LanguageSwitcher, Logo, NavLinks } from './HeaderParts'

// Lazy-loaded by Header on the first tap of the menu button, so the Radix
// Dialog behind the Sheet stays off the initial page load.
export default function MobileMenu({ open, onOpenChange }) {
  const { t } = useTranslation()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="z-1300 w-4/5 border-white/10 bg-background text-white"
      >
        <SheetTitle className="sr-only">{t('NAV_HOME')}</SheetTitle>
        <div className="flex h-full flex-col p-6">
          <Logo />

          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <NavLinks orientation="column" onNavigate={() => onOpenChange(false)} />
            <LanguageSwitcher className="w-full [&>button]:py-2.5" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
