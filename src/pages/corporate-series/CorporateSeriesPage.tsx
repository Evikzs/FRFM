import { ArrowRight, Building2, ChevronDown, Handshake, Users, type LucideIcon } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero } from '@/components/PageHero'
import { RegistrationForm } from './RegistrationForm'

const SECTIONS = ['event', 'who', 'how', 'faq', 'register'] as const

const WHO_OPTIONS: { key: 'company' | 'team' | 'colleagues'; icon: LucideIcon }[] = [
  { key: 'company', icon: Building2 },
  { key: 'team', icon: Users },
  { key: 'colleagues', icon: Handshake },
]

const FACTS = ['event', 'edition', 'date', 'venue', 'openTo', 'level'] as const

type Step = { title: string; body: string }
type FaqItem = { id: string; q: string; a: string }

// Content card used on the Play page of the live site.
function ContentCard({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-18 rounded-card border border-border bg-surface p-4.5 lg:scroll-mt-24 lg:p-6.5">
      <h2 className="font-sans text-[21px] font-extrabold tracking-tight text-ink">{heading}</h2>
      <div className="mt-3 flex flex-col gap-3 text-base leading-[1.68] text-ink-70 lg:text-[15px] lg:leading-[1.65]">{children}</div>
    </section>
  )
}

export function CorporateSeriesPage() {
  const { t, i18n } = useTranslation('corporate')
  const [updatesRequest, setUpdatesRequest] = useState(0)

  useEffect(() => {
    document.title = `${t('meta.title')} · FRFM`
  }, [t, i18n.resolvedLanguage])

  const eventBody = t('event.body', { returnObjects: true }) as string[]
  const steps = t('how.steps', { returnObjects: true }) as Step[]
  const faq = t('faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
        <div className="mt-7 mb-4 flex flex-col gap-3.5 sm:mb-0 sm:flex-row sm:flex-wrap">
          <a
            href="#register"
            className="inline-flex h-[52px] w-full appearance-none items-center justify-center rounded-action border-0 bg-white px-7 font-sans text-base font-extrabold text-ink transition-colors hover:bg-yellow sm:h-[54px] sm:w-auto sm:justify-start"
          >
            {t('cta.register')}
          </a>
          <a
            href="#how"
            className="inline-flex h-[52px] w-full appearance-none items-center justify-center rounded-action border-[1.5px] border-white/50 bg-transparent px-7 font-sans text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10 sm:h-[54px] sm:w-auto sm:justify-start"
          >
            {t('cta.how')}
          </a>
        </div>
      </PageHero>

      <section className="mx-auto w-full max-w-[1280px] px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-13">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px]">
          <div className="order-1 flex min-w-0 flex-col gap-8">
            <ContentCard id="event" heading={t('event.heading')}>
              {eventBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </ContentCard>

            <ContentCard id="who" heading={t('who.heading')}>
              <p>{t('who.intro')}</p>
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {WHO_OPTIONS.map(({ key, icon: Icon }) => (
                  <div key={key} className="rounded-card border border-[#CBD6EA] bg-tint p-4.5 sm:p-5">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                    <p className="mt-3 font-sans text-lg font-extrabold tracking-tight text-ink">{t(`who.options.${key}.title`)}</p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-ink-70">{t(`who.options.${key}.body`)}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard id="how" heading={t('how.heading')}>
              <p>{t('how.intro')}</p>
              <ol className="mt-2 flex flex-col gap-4">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4 border-b border-[#F2F4F7] pb-4 last:border-b-0 last:pb-0">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-field bg-tint font-condensed text-lg font-bold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-sans text-[17px] font-extrabold tracking-tight text-ink">{step.title}</p>
                      <p className="mt-1 text-[15px] leading-[1.6] text-ink-70">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ContentCard>

            <ContentCard id="faq" heading={t('faq.heading')}>
              <div className="flex flex-col">
                {faq.map((item) => (
                  <details key={item.id} className="group border-b border-[#F2F4F7] last:border-b-0">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 font-sans text-base font-bold tracking-tight text-ink transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <ChevronDown className="size-4 shrink-0 text-slate transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="pb-4">{item.a}</p>
                  </details>
                ))}
              </div>
            </ContentCard>

            <RegistrationForm updatesRequest={updatesRequest} />
          </div>

          <aside className="order-2 flex flex-col gap-4">
            <nav aria-label={t('sectionNav.label')} className="hidden rounded-card border border-border bg-surface p-5.5 md:block">
              <p className="font-condensed text-sm font-bold tracking-[0.16em] text-slate uppercase">{t('sectionNav.label')}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {SECTIONS.map((section) => (
                  <li key={section}>
                    <a href={`#${section}`} className="text-[15px] font-semibold text-primary hover:underline">
                      {t(`sectionNav.${section}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-card border border-border bg-surface p-5.5">
              <p className="font-condensed text-sm font-bold tracking-[0.16em] text-slate uppercase">{t('facts.label')}</p>
              <dl className="mt-3.5 flex flex-col gap-3.5">
                {FACTS.map((fact) => (
                  <div key={fact} className="border-b border-[#F2F4F7] pb-3.5 last:border-b-0 last:pb-0">
                    <dt className="font-condensed text-xs font-semibold tracking-[0.12em] text-slate uppercase">{t(`facts.${fact}`)}</dt>
                    <dd className="mt-1 text-[15px] leading-[1.5] font-semibold text-ink">{t(`facts.${fact}Value`)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-card bg-primary p-4.5 text-white sm:p-6.5">
              <p className="font-condensed text-sm font-bold tracking-[0.18em] text-yellow uppercase">{t('future.eyebrow')}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#D6E2F7]">{t('future.body')}</p>
              <a
                href="#register"
                onClick={() => setUpdatesRequest((count) => count + 1)}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-sans text-[15px] font-bold text-white transition-colors hover:text-yellow sm:min-h-0"
              >
                {t('future.link')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
