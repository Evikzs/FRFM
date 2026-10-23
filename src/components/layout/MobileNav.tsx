import { X } from 'lucide-react'
import { Dialog } from 'radix-ui'
import { useTranslation } from 'react-i18next'
import { mainSiteHref } from '@/lib/site'
import { cn } from '@/lib/utils'
import { FlagStripe } from './FlagStripe'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MOBILE_NAV_GROUPS, navPath, type NavKey } from './navigation'
import { SearchField } from './SearchField'

type MobileNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  active?: NavKey
}

// Full-height mobile menu, same layout and classes as the live site.
export function MobileNav({ open, onOpenChange, active }: MobileNavProps) {
  const { t } = useTranslation('common')

  function linkClass(key: NavKey) {
    return cn(
      'flex min-h-11 items-center border-l-[3px] px-3.5 font-sans text-[17px] tracking-[-0.025em] transition-colors',
      key === active ? 'border-yellow bg-yellow/12 font-extrabold text-yellow' : 'border-transparent font-semibold text-white',
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 lg:hidden" />
        <Dialog.Content
          data-slot="mobile-nav-overlay"
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col overflow-y-auto bg-[linear-gradient(170deg,#00286F,#003AA0_58%,#0B52C6)] text-white outline-none duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right sm:w-[min(420px,80vw)] sm:border-l sm:border-white/15 sm:shadow-overlay lg:hidden motion-reduce:data-[state=closed]:slide-out-to-right-0 motion-reduce:data-[state=open]:slide-in-from-right-0"
        >
          <Dialog.Title className="sr-only">{t('nav.ariaLabel')}</Dialog.Title>
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:h-16 sm:px-6">
            <a aria-label={t('homeAriaLabel')} className="flex shrink-0 items-center gap-2.5" href={mainSiteHref('/')}>
              <img alt="" className="h-7 w-auto sm:h-8" src="/frfm-logo.svg" />
              <span className="font-sans text-[17px] font-black tracking-[-0.03em] text-white uppercase">FRFM</span>
            </a>
            <div className="flex shrink-0 items-center gap-2.5">
              <LanguageSwitcher variant="mobile" />
              <Dialog.Close
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-white/35 text-white"
                aria-label={t('menu.close')}
              >
                <X className="size-5" aria-hidden="true" />
              </Dialog.Close>
            </div>
          </div>

          <div className="shrink-0 px-4 py-4 sm:px-6">
            <SearchField variant="mobile" id="mobile-nav-search" />
          </div>

          <nav className="shrink-0 px-2 pt-5" aria-label={t('nav.ariaLabel')}>
            <div className="px-3.5">
              <a className={linkClass('home')} href={mainSiteHref('/')}>
                {t('nav.home')}
              </a>
            </div>
            <div className="mt-3">
              {MOBILE_NAV_GROUPS.map(({ group, keys }) => (
                <div key={group} className="mt-3 first:mt-0 sm:mt-0">
                  <div className="px-4 pb-1.5 font-condensed text-xs font-bold tracking-[0.18em] text-white/60 uppercase">
                    {t(`footer.groups.${group}`)}
                  </div>
                  <div className="px-3.5">
                    {keys.map((key) => (
                      <a
                        key={key}
                        className={linkClass(key)}
                        href={mainSiteHref(navPath(key))}
                        aria-current={key === active ? 'page' : undefined}
                      >
                        {t(`nav.${key}`)}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="mt-auto flex shrink-0 items-center gap-3 px-4 pt-5 pb-5 sm:px-6">
            <FlagStripe className="w-13 shrink-0" />
            <span className="text-[13px] text-white/65">{t('federationName')}</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
