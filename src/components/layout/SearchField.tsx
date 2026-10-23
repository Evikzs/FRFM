import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { mainSiteHref } from '@/lib/site'
import { cn } from '@/lib/utils'

type Variant = 'header' | 'mobile'

// Search box of the live site. In this replica it sends the query to the
// search page of the main site.
export function SearchField({ variant = 'header', id }: { variant?: Variant; id: string }) {
  const { t } = useTranslation('common')
  const [query, setQuery] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const q = query.trim()
    if (q) window.location.href = mainSiteHref(`/search?q=${encodeURIComponent(q)}`)
  }

  const mobile = variant === 'mobile'

  return (
    <form role="search" onSubmit={onSubmit}>
      <label
        htmlFor={id}
        className={cn(
          'flex items-center overflow-hidden rounded-control border transition-colors',
          mobile
            ? 'h-12 w-full border-white/20 bg-white/5 focus-within:border-white/50'
            : 'h-9 w-[220px] border-border bg-surface focus-within:border-primary',
        )}
      >
        <span className={cn('flex h-full shrink-0 items-center justify-center', mobile ? 'w-10 text-white/60' : 'w-8 text-slate')}>
          <Search className="size-4" aria-hidden="true" />
        </span>
        <input
          id={id}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          aria-label={t('search.ariaLabel')}
          className={cn(
            'h-full min-w-0 flex-1 appearance-none border-0 bg-transparent font-sans outline-none',
            mobile ? 'pr-3 text-base text-white placeholder:text-white/50' : 'pr-2.5 text-sm text-ink placeholder:text-muted-2',
          )}
        />
      </label>
    </form>
  )
}
