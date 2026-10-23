// Primary navigation of the main FRFM app, in the same order.
export type NavKey = 'home' | 'news' | 'competitions' | 'rankings' | 'play' | 'clubs' | 'documents' | 'shop' | 'about'

export const NAV_ITEMS: { key: NavKey; path: string }[] = [
  { key: 'home', path: '/' },
  { key: 'news', path: '/news' },
  { key: 'competitions', path: '/competitions' },
  { key: 'rankings', path: '/rankings' },
  { key: 'play', path: '/play' },
  { key: 'clubs', path: '/clubs' },
  { key: 'documents', path: '/documents' },
  { key: 'shop', path: '/shop' },
  { key: 'about', path: '/about' },
]

// Groups of the mobile menu, as on the live site.
export const MOBILE_NAV_GROUPS: { group: 'compete' | 'federation'; keys: NavKey[] }[] = [
  { group: 'compete', keys: ['competitions', 'rankings', 'play', 'clubs'] },
  { group: 'federation', keys: ['news', 'documents', 'about', 'shop'] },
]

export function navPath(key: NavKey) {
  return NAV_ITEMS.find((item) => item.key === key)?.path ?? '/'
}
