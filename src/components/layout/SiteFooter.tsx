import { useTranslation } from 'react-i18next'
import { mainSiteHref } from '@/lib/site'
import { FlagStripe } from './FlagStripe'

const GROUPS = [
  {
    group: 'compete',
    links: [
      { key: 'calendar', path: '/competitions?tab=calendar' },
      { key: 'results', path: '/competitions?tab=results' },
      { key: 'rankings', path: '/rankings' },
      { key: 'history', path: '/competitions?tab=history' },
    ],
  },
  {
    group: 'play',
    links: [
      { key: 'howToPlay', path: '/play?tab=howToPlay' },
      { key: 'whereToPlay', path: '/play?tab=whereToPlay' },
      { key: 'joinAClub', path: '/play?tab=joinAClub' },
      { key: 'coralProfile', path: '/play?tab=coralProfile' },
    ],
  },
  {
    group: 'federation',
    links: [
      { key: 'aboutFrfm', path: '/about?tab=about' },
      { key: 'clubs', path: '/clubs' },
      { key: 'documents', path: '/documents' },
      { key: 'shop', path: '/shop' },
      { key: 'contact', path: '/about?tab=contact' },
    ],
  },
] as const

const LEGAL = [
  { key: 'privacy', path: '/legal?tab=privacy' },
  { key: 'terms', path: '/legal?tab=terms' },
  { key: 'gdpr', path: '/legal?tab=gdpr' },
] as const

// Footer of the live site, same layout and classes.
export function SiteFooter() {
  const { t } = useTranslation('common')

  return (
    <footer className="bg-primary-hover text-[#A8BEE4]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[0.9fr_1.6fr] sm:gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <img alt="" className="h-10 w-auto" src="/frfm-logo.svg" />
              <span className="font-sans text-xl font-extrabold tracking-tight text-white uppercase">FRFM</span>
            </div>
            <p className="mx-auto mt-4 max-w-[30ch] text-sm sm:mx-0 sm:max-w-[26ch] lg:max-w-[38ch]">{t('footer.tagline')}</p>
            <FlagStripe className="mx-auto mt-5 sm:mx-0" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 lg:contents lg:gap-0">
            {GROUPS.map(({ group, links }) => (
              <div key={group}>
                <p className="text-center font-condensed text-sm font-bold tracking-[0.18em] text-white uppercase sm:text-left">
                  {t(`footer.groups.${group}`)}
                </p>
                <ul className="mt-3.5 flex flex-col gap-1 lg:gap-2.5">
                  {links.map(({ key, path }) => (
                    <li key={key}>
                      <a
                        className="flex min-h-11 items-center justify-center text-sm transition-colors hover:text-white sm:justify-start lg:min-h-0"
                        href={mainSiteHref(path)}
                      >
                        {t(`footer.links.${key}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-3 px-4 py-4.5 text-center text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:text-left lg:px-8">
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <span className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4.5">
            {LEGAL.map(({ key, path }) => (
              <a key={key} className="transition-colors hover:text-white" href={mainSiteHref(path)}>
                {t(`footer.legal.${key}`)}
              </a>
            ))}
            <a className="text-[13px] text-[#5C7CB8] transition-colors hover:text-[#A8BEE4]" href={mainSiteHref('/login')}>
              {t('footer.adminSignIn')}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
