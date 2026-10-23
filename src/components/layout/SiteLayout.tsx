import type { ReactNode } from 'react'
import type { NavKey } from './navigation'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

// Page frame of the live site. Only for this replica: in the main app, render
// the page inside the app's own layout instead.
export function SiteLayout({ active, children }: { active?: NavKey; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <SiteHeader active={active} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
