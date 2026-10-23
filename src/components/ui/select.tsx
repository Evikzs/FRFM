import { Check, ChevronDown } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export type SelectOption = { value: string; label: string }

type SelectProps = {
  id?: string
  name?: string
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

// Same trigger, content and item classes as the Select in the main FRFM app.
function Select({ id, name, value, onValueChange, options, placeholder, required, disabled, className, ...aria }: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value || undefined}
      onValueChange={onValueChange}
      name={name}
      required={required}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        id={id}
        data-slot="select"
        className={cn(
          'flex h-12 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
          'data-placeholder:text-muted-2',
          'sm:text-sm lg:h-8',
          className,
        )}
        {...aria}
      >
        <span className="min-w-0 truncate text-left">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="size-4 shrink-0 opacity-60 transition-transform data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            'z-50 max-w-[calc(100vw-2rem)] min-w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-input bg-surface text-ink',
            'shadow-[0_14px_34px_rgba(10,15,28,.14)]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-100',
          )}
        >
          <SelectPrimitive.Viewport className="max-h-[min(320px,var(--radix-select-content-available-height))] p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  'relative flex cursor-pointer items-center justify-between gap-3 rounded-field px-3 py-2.5 text-base whitespace-nowrap outline-none select-none',
                  'data-highlighted:bg-tint data-highlighted:text-primary',
                  'data-[state=checked]:font-bold data-[state=checked]:text-primary',
                  'data-disabled:pointer-events-none data-disabled:opacity-50',
                  'sm:py-2 sm:text-sm',
                )}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="shrink-0 text-primary">
                  <Check className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export { Select }
