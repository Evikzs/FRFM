import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const LANGUAGES = ['en', 'ro'] as const

type Variant = 'header' | 'mobile'

// EN / RO switcher, same markup as the live site. Changing the language
// re-renders every translated string, including the Corporate Series page.
export function LanguageSwitcher({ variant = 'header' }: { variant?: Variant }) {
  const { t, i18n } = useTranslation('common')
  const current = i18n.resolvedLanguage ?? 'en'

  if (variant === 'mobile') {
    return (
      <div
        className="flex h-[34px] items-center overflow-hidden rounded-pill border border-white/35 font-condensed text-[13px] font-bold tracking-[0.08em]"
        role="group"
        aria-label={t('language.ariaLabel')}
      >
        {LANGUAGES.map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={current === lng}
            className={cn('flex h-full items-center px-3 transition-colors', current === lng ? 'bg-white text-primary' : 'text-white')}
          >
            {t(`language.${lng}`)}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div
      className="hidden items-center overflow-hidden rounded-pill border border-border text-xs font-semibold sm:flex"
      role="group"
      aria-label={t('language.ariaLabel')}
    >
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={cn(
            'inline-flex h-8 items-center px-2.5 font-condensed tracking-wide transition-colors lg:h-auto lg:py-1',
            current === lng ? 'bg-primary text-white' : 'text-ink hover:bg-tint',
          )}
        >
          {t(`language.${lng}`)}
        </button>
      ))}
    </div>
  )
}
