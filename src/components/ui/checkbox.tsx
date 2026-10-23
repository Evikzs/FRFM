import { Check } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type CheckboxProps = Omit<ComponentProps<'button'>, 'onChange'> & {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

// Same markup and classes as the Checkbox in the main FRFM app (newsletter form).
function Checkbox({ id, checked, onCheckedChange, disabled, className, ...props }: CheckboxProps) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      data-slot="checkbox"
      className={cn(
        'inline-flex size-[22px] shrink-0 items-center justify-center rounded-field border transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 lg:size-5',
        checked ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-transparent hover:bg-tint',
        className,
      )}
      {...props}
    >
      <Check className="size-3.5" strokeWidth={3} />
    </button>
  )
}

export { Checkbox }
