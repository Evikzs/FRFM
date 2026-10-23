import type { CSSProperties, ReactNode } from 'react'

/** Width in "ch" that splits the title into two balanced lines (same rule as the live site). */
function titleCap(title: string) {
  const words = title.trim().split(/\s+/)
  if (words.length < 2) return 20
  let best = Infinity
  for (let i = 1; i < words.length; i++) {
    const longest = Math.max(words.slice(0, i).join(' ').length, words.slice(i).join(' ').length)
    best = Math.min(best, longest)
  }
  return best + 1
}

type PageHeroProps = {
  eyebrow: string
  title: string
  intro: string
  children?: ReactNode
}

// Blue inner-page hero of the live site (About, Play, ...).
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#00286F] text-white">
      <div className="absolute inset-0 bg-primary" />
      <div className="relative mx-auto w-full max-w-[1280px] px-4 pt-13 pb-5 sm:px-6 sm:pb-10 lg:px-8">
        <p className="font-condensed text-sm font-bold tracking-[0.2em] text-yellow uppercase">{eyebrow}</p>
        <h1
          className="m-0 mt-3.5 max-w-full font-sans text-[clamp(1.75rem,9.2vw,2.75rem)] leading-[0.96] font-black tracking-tight text-balance uppercase md:max-w-(--title-cap) md:text-[64px]"
          style={{ '--title-cap': `${titleCap(title)}ch` } as CSSProperties}
        >
          {title}
        </h1>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.6] text-[#D6E2F7]">{intro}</p>
        {children}
      </div>
    </section>
  )
}
