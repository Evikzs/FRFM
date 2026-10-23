# FRFM – Corporate Table Soccer Series page

One event page for [frfm.ro](https://frfm.ro), the website of the Romanian Table Soccer Federation.

The page helps a company join a table soccer match series between companies. It explains the event, shows the steps to join, and collects the details of the company's contact person in a form.

Planned URL: `https://frfm.ro/corporate-series/`

## What is in this repo

```
corporate-series/
├── index.html                      The page
├── contact.php                     Form handler (checks the data, saves it to CSV, sends an email)
├── assets/css/corporate-series.css Styles: the Ave theme values of frfm.ro
├── assets/js/corporate-series.js   Header, parallax, title animation, back-to-top, form submit
├── assets/img/                     Put frfm-logo.png here (and hero.jpg if you use a photo)
└── data/.htaccess                  Blocks web access to the saved registrations
```

No build step. No dependencies to install. Fonts (Roboto) and icons (Font Awesome 5.15.4) load from Google Fonts and cdnjs, the same as on frfm.ro.

## Analysis: what the website is built with

### frfm.ro

| Item | Finding |
| --- | --- |
| CMS | WordPress 6.4.5 |
| Theme | Ave by LiquidThemes (`wp-content/themes/ave`) |
| Page builder | WPBakery Page Builder 7.2, Slider Revolution 6.6.20 |
| Front end | Bootstrap 3 grid, jQuery, Font Awesome 5, Ave "liquid" effects (split text, parallax, sticky header) |
| Server | LiteSpeed (shared hosting with PHP) |
| Language | English (`lang="en-US"`) |

**Current state (23 Oct 2026): the homepage is broken.** The server holds only one static `index.html`. Somebody saved it from the browser ("Save page as") and uploaded it without its asset folder. All CSS, JavaScript, the logo and the hero photo return 404, and so do all WordPress paths (`wp-login.php`, `xmlrpc.php`, `wp-content/...`). Visitors see unstyled text. The white "website under construction" heading is invisible on the white page.

**Fix for the homepage:** upload the folder `Romanian Table Soccer Federation – The official website of the Romanian Table Soccer Federation_files` to the web root, next to `index.html`. That folder was created on the computer that saved the page.

### The market

Peer table soccer federations use a CMS or a site generator:

| Site | Built with |
| --- | --- |
| ITSF – tablesoccer.org | Astro |
| Germany – dtfb.de | Joomla |
| Netherlands – tafelvoetbal.nl | Joomla |
| Poland – ptsf.pl | WordPress |
| Romania – frfm.ro | WordPress (Ave + WPBakery), served as a static snapshot |

### Decision

The page is static HTML, CSS and a small vanilla JavaScript file, plus one PHP file for the form.

- It drops into the current hosting as it is. WordPress is not running on the server now.
- It uses the Ave class names and values (`.btn`, `.iconbox`, `.lqd-contact-form`, `.accordion`, `.lqd-back-to-top`, Bootstrap 3 widths). It looks the same as the site, and it can move into WordPress + WPBakery later.
- It does not copy the Ave theme files. Ave is a paid theme; the CSS here is written new, with the same values.

## Design values taken from frfm.ro and Ave

| Element | Value | Source |
| --- | --- | --- |
| Accent / button color | `#0029ff` (rgb 0, 41, 255) | frfm.ro header button |
| Header | white bar, 10px padding, logo left with 11px padding, "Visit us on Facebook" bordered button right, sticky with shadow `0 2px 58px rgba(0,0,0,.17)` | frfm.ro inline styles |
| Hero | full height (90vh), parallax background, white centered heading 40–72px (FitText), underline highlight 0.275em | frfm.ro hero row |
| Font | Roboto, 16px, line height 1.7 | Ave defaults |
| Text / headings | `#808291` / `#181b31`, headings weight 500 | Ave defaults |
| Buttons | square corners, 1px border, large padding `1.3em 2.7em`, lift 1px on hover | Ave `.btn-lg` |
| Form fields | 50px high, 1px `#d5d6de` border, `2em` side padding, square | Ave `.lqd-contact-form` |
| Container | 750 / 970 / 1170px | Bootstrap 3 (Ave) |

Two small, intended changes from Ave:

- Typed text in the form fields is dark (`#181b31`), not light grey. Light grey text is hard to read.
- Form fields have visible labels, not only placeholders.

## Deploy

1. Copy the `corporate-series/` folder to the web root of frfm.ro.
2. Copy `frfm-logo.png` from the `_files` folder (see above) to `corporate-series/assets/img/`. Until you do this, the header shows the text "FRFM" in place of the logo.
3. Open `corporate-series/contact.php` and set:
   - `RECIPIENT_EMAIL`: the address that gets the registrations.
   - `SENDER_EMAIL`: an address on the frfm.ro domain, for example `no-reply@frfm.ro`.
4. Make sure PHP can write to `corporate-series/data/`.
5. Send one test registration. Then open `https://frfm.ro/corporate-series/data/registrations.csv` in a browser. You must get **403 Forbidden**. If you can see the file, the `.htaccess` is not active: move `DATA_FILE` in `contact.php` to a folder outside the web root.

The form also works without email: it always saves to the CSV file. Each registration goes to email **and** CSV, so no lead gets lost if the mail server fails.

## When the event goes live

Search `index.html` for `EDIT WHEN LIVE`. Change:

- the date (hero and "The event at a glance"),
- the location (hero and "The event at a glance"),
- the FAQ answer "When and where is the event?".

To use a photo in the hero: put it in `assets/img/hero.jpg`, then on `<section class="cs-hero">` add the class `has-photo` and `style="--hero-image: url('assets/img/hero.jpg')"`.

If the series repeats: change "First edition" in the hero and in "The event at a glance", and update the FAQ "Is this a one-time event?". Contacts who ticked "Keep me informed about future editions" have `future_events = yes` in the CSV.

## The form

| Field | Required |
| --- | --- |
| Company name, your name, work email | yes |
| Option: company / team or department / group of colleagues | yes |
| Number of players (estimate) | yes |
| Consent to store the details | yes |
| Phone, role, city, message, "keep me informed" | no |

Protection in `contact.php`: server-side checks for every field, fixed lists for the option fields, a hidden spam-trap field, no line breaks in header values, and a guard against formulas in the CSV (Excel). The page shows errors next to each field. Without JavaScript, the browser checks the fields and `contact.php` answers with a small HTML page.

The CSV holds personal data (GDPR). Delete a contact's row when that person asks. Do not commit the CSV; `.gitignore` blocks it.

## Test on your computer

```sh
php -S 127.0.0.1:8000 -t corporate-series
```

Open `http://127.0.0.1:8000/`. The built-in PHP server does not read `.htaccess`, so the data-folder block only works on the real server.

## Known limit

Body text uses the Ave grey `#808291`. Its contrast on white is 3.8:1, below the WCAG AA level of 4.5:1. To fix it on this page, set `--color-font: #6b6d7c;` in `corporate-series.css` (5.1:1). The rest of frfm.ro uses the same grey, so change both together.
