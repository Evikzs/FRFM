# FRFM – Corporate Series page

An event page for the FRFM website ([frfm-web-ai-dev.pages.dev](https://frfm-web-ai-dev.pages.dev)), in English and Romanian.

The page helps a company join a table football series between companies. It explains the event, shows the steps to join, and collects the details of the company's contact person.

Route: `/corporate-series`

## Same stack as the live site

The live site is a React single-page app. This repo uses the same stack and versions:

| Part | Live site | This repo |
| --- | --- | --- |
| Framework | React 19.2 + Vite | React 19.2 + Vite 7 |
| Routing | React Router 7.18 | React Router 7.18 |
| Styles | Tailwind CSS 4.3.3, shadcn/ui components | Same; components ported 1:1 |
| Fonts | Public Sans, Barlow Condensed | Same |
| Icons | Lucide | Same |
| Languages | i18next, EN + RO, one namespace per page | Same; new `corporate` namespace |
| Backend | Supabase (tables + Edge Functions) | Same; new table + Edge Function |
| Hosting | Cloudflare Pages | Cloudflare Pages (`public/_redirects`) and Vercel (`vercel.json`) ready |

The design tokens in `src/index.css` are copied from the live CSS (`--frfm-primary: #003aa0`, flag yellow and red, radii, shadows).

## Language switcher

The page uses the same i18next setup as the live site. The language is saved in `localStorage` under the key `i18nextLng`. The EN/RO switcher in the header and in the mobile menu changes every string on the page. On the same domain, the choice is shared with the rest of the site.

- English: `src/locales/en/corporate.ts`
- Romanian: `src/locales/ro/corporate.ts` (typed against the English file, so a missing key fails the build)

## What is in this repo

```
src/
├── pages/corporate-series/
│   ├── CorporateSeriesPage.tsx   The page   ← port this
│   └── RegistrationForm.tsx      The form   ← port this
├── locales/{en,ro}/corporate.ts  Page copy  ← port this (add "corporate" to the i18n namespaces)
├── locales/{en,ro}/common.ts     Header/footer strings, copied from the live site (replica only)
├── components/PageHero.tsx       Same as the live inner-page hero
├── components/ui/                Button, Input, Textarea, Select, Checkbox (same as the live app)
├── components/layout/            Header, mobile menu, footer: replica of the live site, do not port
└── i18n.ts                       Same i18next setup as the live site
supabase/
├── migrations/…_corporate_series_registrations.sql
└── functions/submit-corporate-registration/index.ts
```

## Port the page into the main app

1. Copy `src/pages/corporate-series/` into the app.
2. Copy `src/locales/en/corporate.ts` and `src/locales/ro/corporate.ts`, and add `corporate` to `resources` and `ns` in the app's i18n setup.
3. Add the route `/corporate-series` inside the app's layout.
4. Use the app's own `PageHero` and `components/ui/*`; they have the same API.
5. Add a link to the page, for example from Competitions.

## Form and Supabase

The form follows the pattern of the live contact form: `supabase.functions.invoke(...)`, a hidden `website` spam-trap field, and `{ ok: true }` on success.

1. Run the migration. It creates `corporate_series_registrations` with row-level security on and no public access.
2. Deploy the function: `supabase functions deploy submit-corporate-registration`.
3. Read registrations in the Supabase table editor. The file has an example policy, if admins need to read them in the app.

Fields: company, contact name, email (required); option (company / team / colleagues) and number of players (required); phone, role, city, message, "keep me informed about future editions" (optional). The table also stores the language and the edition number, for future editions.

## Run locally

```sh
cp .env.example .env.local   # fill in the Supabase URL and anon key
npm install
npm run dev                  # http://localhost:5173 → /corporate-series
npm run build                # typecheck + production build in dist/
```

Without Supabase values the page still renders. The form then shows its error message.

## When the event goes live

Search the locale files for `EDIT WHEN LIVE`. Change `facts.dateValue`, `facts.venueValue` and the FAQ answer `when`, in both `en` and `ro`.
