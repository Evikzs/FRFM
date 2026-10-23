/**
 * The header and footer in this repo are a replica of the main FRFM app.
 * Their links point to the main site, so the replica stays navigable.
 */
const MAIN_SITE_URL = ((import.meta.env.VITE_MAIN_SITE_URL as string | undefined) ?? 'https://frfm-web-ai-dev.pages.dev').replace(/\/$/, '')

export function mainSiteHref(path: string) {
  return `${MAIN_SITE_URL}${path}`
}

export const FEDERATION_EMAIL = 'frfm.board@gmail.com'
