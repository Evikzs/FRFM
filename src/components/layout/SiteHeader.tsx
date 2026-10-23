import { Menu } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mainSiteHref } from '@/lib/site'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNav } from './MobileNav'
import { NAV_ITEMS, type NavKey } from './navigation'
import { SearchField } from './SearchField'

// Sticky header of the live site: logo, primary navigation, search, EN/RO switcher.
export function SiteHeader({ active }: { active?: NavKey }) {
  const { t } = useTranslation('common')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm">
      <header className="w-full border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-[1360px] items-center justify-between gap-6 px-4 sm:h-16 sm:px-8 lg:h-[72px]">
          <a aria-label={t('homeAriaLabel')} className="flex shrink-0 items-center gap-2.5" href={mainSiteHref('/')}>
            <img alt="" className="h-7 w-auto sm:h-8 lg:h-[34px]" src="/frfm-logo.svg" />
            <span className="font-sans text-[17px] font-black tracking-[-0.03em] text-primary uppercase">FRFM</span>
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-px lg:flex" aria-label={t('nav.ariaLabel')}>
            {NAV_ITEMS.map(({ key, path }) => (
              <a
                key={key}
                href={mainSiteHref(path)}
                aria-current={key === active ? 'page' : undefined}
                className={cn(
                  'rounded-action px-2.5 py-2 font-sans text-sm font-bold tracking-[-0.01em] whitespace-nowrap transition-colors',
                  key === active ? 'bg-primary text-white' : 'text-ink-70 hover:bg-tint hover:text-primary',
                )}
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div className="relative hidden sm:block">
              <SearchField id="header-search" />
            </div>
            <LanguageSwitcher />
            <button
              type="button"
              data-testid="mobile-nav-toggle"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-border text-ink lg:hidden"
              aria-label={t('menu.open')}
              aria-expanded={menuOpen}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} active={active} />
    </div>
  )
}
