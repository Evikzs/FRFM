import { cn } from '@/lib/utils'

// The blue / yellow / red stripe used across the FRFM site.
export function FlagStripe({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('flex h-[3px] w-14', className)}>
      <span className="flex-1 bg-primary" />
      <span className="flex-1 bg-yellow" />
      <span className="flex-1 bg-red" />
    </span>
  )
}
