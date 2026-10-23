import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FEDERATION_EMAIL, mainSiteHref } from '@/lib/site'
import { supabase } from '@/lib/supabase'

export const PARTICIPATION_OPTIONS = ['company', 'team', 'colleagues'] as const
export const PLAYER_OPTIONS = ['2-4', '5-10', '11-20', '20+', 'unsure'] as const

const EMPTY = {
  company: '',
  name: '',
  email: '',
  phone: '',
  role: '',
  city: '',
  participation: '',
  players: '',
  message: '',
  website: '',
}

type Fields = typeof EMPTY

const labelClass = 'font-condensed text-sm font-bold tracking-[0.14em] text-ink-70 uppercase'
const fieldClass = 'h-12 rounded-field border-border-strong px-3.5 text-base'

type RegistrationFormProps = {
  /** Increases when a "Keep me informed" link elsewhere on the page is used. */
  updatesRequest: number
}

// Registration form for the contact person. Same field, label and button
// styles as the contact form of the live site; the data goes to the
// "submit-corporate-registration" Supabase Edge Function.
export function RegistrationForm({ updatesRequest }: RegistrationFormProps) {
  const { t, i18n } = useTranslation('corporate')
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [updates, setUpdates] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (updatesRequest > 0) setUpdates(true)
  }, [updatesRequest])

  function bind(name: keyof Fields) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((current) => ({ ...current, [name]: event.target.value }))
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (submitting) return

    setSent(false)
    setFailed(false)
    setSubmitting(true)

    const response = supabase
      ? await supabase.functions.invoke('submit-corporate-registration', {
          body: { ...fields, updates, language: i18n.resolvedLanguage ?? 'en' },
        })
      : { data: null, error: new Error('Supabase is not configured') }

    setSubmitting(false)

    if (response.error || !response.data?.ok) {
      setFailed(true)
      return
    }

    setFields(EMPTY)
    setUpdates(false)
    setSent(true)
  }

  function optionalLabel(text: string) {
    return (
      <>
        {text}
        <span className="ml-1.5 font-semibold tracking-[0.1em] text-slate">· {t('form.optional')}</span>
      </>
    )
  }

  return (
    <section id="register" className="scroll-mt-18 rounded-card border border-border bg-surface p-5 sm:p-9 lg:scroll-mt-24">
      <h2 className="m-0 font-sans text-[26px] font-black tracking-tight text-ink sm:text-[30px]">{t('form.heading')}</h2>
      <p className="mt-2.5 max-w-[56ch] text-base leading-[1.6] text-ink-70">{t('form.intro')}</p>

      <form onSubmit={onSubmit} className="mt-6.5 flex flex-col gap-4.5 [&_input]:scroll-mt-24 [&_textarea]:scroll-mt-24">
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>{t('form.fields.company')}</span>
            <Input
              required
              maxLength={150}
              autoComplete="organization"
              value={fields.company}
              onChange={bind('company')}
              placeholder={t('form.fields.companyPlaceholder')}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>{t('form.fields.name')}</span>
            <Input
              required
              maxLength={120}
              autoComplete="name"
              value={fields.name}
              onChange={bind('name')}
              placeholder={t('form.fields.namePlaceholder')}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>{t('form.fields.email')}</span>
            <Input
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={fields.email}
              onChange={bind('email')}
              placeholder={t('form.fields.emailPlaceholder')}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>{optionalLabel(t('form.fields.phone'))}</span>
            <Input
              type="tel"
              maxLength={40}
              pattern="[0-9 +\(\)\.\-\/]{6,40}"
              autoComplete="tel"
              value={fields.phone}
              onChange={bind('phone')}
              placeholder={t('form.fields.phonePlaceholder')}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>{optionalLabel(t('form.fields.role'))}</span>
            <Input
              maxLength={120}
              autoComplete="organization-title"
              value={fields.role}
              onChange={bind('role')}
              placeholder={t('form.fields.rolePlaceholder')}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>{optionalLabel(t('form.fields.city'))}</span>
            <Input
              maxLength={80}
              autoComplete="address-level2"
              value={fields.city}
              onChange={bind('city')}
              placeholder={t('form.fields.cityPlaceholder')}
              className={fieldClass}
            />
          </label>

          <fieldset className="flex flex-col gap-2 sm:col-span-2">
            <legend className={`${labelClass} mb-2`}>{t('form.fields.participation')}</legend>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {PARTICIPATION_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer gap-3 rounded-card border border-border-strong bg-surface p-4 transition-colors hover:bg-tint has-checked:border-primary has-checked:bg-tint has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
                >
                  <input
                    type="radio"
                    name="participation"
                    value={option}
                    required
                    checked={fields.participation === option}
                    onChange={bind('participation')}
                    className="mt-0.5 size-[18px] shrink-0 accent-primary outline-none"
                  />
                  <span className="flex flex-col gap-1">
                    <span className="font-sans text-[15px] font-bold tracking-tight text-ink">
                      {t(`form.participation.${option}.title`)}
                    </span>
                    <span className="text-sm leading-[1.5] text-ink-70">{t(`form.participation.${option}.body`)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <span id="players-label" className={labelClass}>
              {t('form.fields.players')}
            </span>
            <Select
              name="players"
              required
              aria-labelledby="players-label"
              value={fields.players}
              onValueChange={(players) => setFields((current) => ({ ...current, players }))}
              placeholder={t('form.fields.playersPlaceholder')}
              options={PLAYER_OPTIONS.map((value) => ({ value, label: t(`form.players.${value}`) }))}
              className={fieldClass}
            />
          </div>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={labelClass}>{optionalLabel(t('form.fields.message'))}</span>
            <Textarea
              maxLength={2000}
              value={fields.message}
              onChange={bind('message')}
              placeholder={t('form.fields.messagePlaceholder')}
              rows={5}
              className="min-h-[140px] rounded-field border-border-strong px-3.5 py-3.5 text-base leading-[1.6]"
            />
          </label>

          <div className="flex items-start gap-3 sm:col-span-2">
            <Checkbox id="corporate-updates" checked={updates} onCheckedChange={setUpdates} className="mt-0.5" />
            <label htmlFor="corporate-updates" className="cursor-pointer text-[15px] leading-[1.5] text-ink-70">
              {t('form.fields.updates')}
            </label>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
          <Button type="submit" disabled={submitting} className="h-12 w-full rounded-action px-7 text-base font-bold sm:h-auto sm:w-fit sm:py-3.5">
            {t(submitting ? 'form.submitting' : 'form.submit')}
          </Button>
          <span className="text-sm text-muted-2">
            <Trans
              t={t}
              i18nKey="form.disclaimer"
              components={{
                privacy: (
                  <a href={mainSiteHref('/legal?tab=privacy')} className="text-primary underline-offset-4 hover:underline" />
                ),
              }}
            />
          </span>
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={fields.website}
          onChange={bind('website')}
          className="absolute left-[-9999px] h-px w-px opacity-0"
        />

        {sent && (
          <p role="status" className="text-sm font-semibold text-primary">
            {t('form.sent')}
          </p>
        )}
        {failed && (
          <p role="alert" className="text-sm font-medium text-red">
            {t('form.error', { email: FEDERATION_EMAIL })}
          </p>
        )}
      </form>
    </section>
  )
}
