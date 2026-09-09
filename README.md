# Vaseo Medical — website

A static marketing site for Vaseo Medical Pty Ltd, the Australian arm of
Prion Medical. No build step and no framework: it uses native Web Components
and ES modules, so it deploys to any static host as-is.

## Project structure

```
.
├── index.html        Page shell + unique prose (hero, about, compliance, contact copy)
├── news.html         News page shell (header + news list + footer)
├── crf-ablation-system.html
│                     CRF product page: system, indications, electrode
│                     table, heritage and the brochure downloads
├── styles.css        Design tokens + all styling
├── logo.svg          Brand mark + wordmark
├── favicon.svg       Browser-tab icon (the mark on its own)
├── og-image.png      1200x630 social preview (LinkedIn, X, Slack)
├── docs/             Downloadable PDFs served by the CRF product page
└── js/
    ├── main.js              Entry point: registers components, starts behaviours
    ├── site-content.js      Single source of truth for all editable copy
    ├── lib/
    │   └── component.js      Base class + href helpers shared by every component
    ├── components/
    │   ├── site-header.js         <site-header>        nav + mobile menu
    │   ├── site-marquee.js        <site-marquee>       scrolling keyword band
    │   ├── product-card.js        <product-card>       one device card
    │   ├── portfolio-grid.js      <portfolio-grid>     composes the product cards
    │   ├── clinical-list.js       <clinical-list>      clinical-area rows
    │   ├── resource-list.js       <resource-list>      downloadable brochure rows
    │   ├── partner-list.js        <partner-list>       "why partner" bullet list
    │   ├── contact-form.js        <contact-form>       enquiry form + validation
    │   ├── reimbursement-check.js <reimbursement-check> eligibility modal + form
    │   ├── news-list.js           <news-list>          dated news + optional LinkedIn embed
    │   └── site-footer.js         <site-footer>        footer + auto year
    └── behaviours/
        └── scroll-reveal.js  fade-and-rise reveal on scroll
```

## Editing content

Most text changes happen in **one place**: `js/site-content.js`. Adding a
product is a single entry in the `products` array; the card renders itself.
Menu items, marquee words, clinical areas, partner points, news entries and
footer links work the same way. Brochures are the same pattern with one extra
step: drop the PDF in `docs/`, then add an entry to `resources` (the `size`
field is shown to the visitor, so keep it in step with `du -h docs/<file>`);
they render on the CRF product page. The longer prose blocks (hero, about,
regulatory, contact) live directly in `index.html`, and the CRF product copy
in `crf-ablation-system.html`.

A product gains its own detail page by adding `href` (and optionally
`linkLabel`) to its entry in `products`: the card turns into a link to that
page. A product without an `href` stays a plain card.

## Running it

Because it uses ES modules, browsers require the files to be served over HTTP
(opening `index.html` directly via `file://` will not load the modules).

Local preview from this folder:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

For production, upload the whole folder to any static host (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, or a standard web server).

## Still to do

- **Both forms are front-end only.** `contact-form.js` and
  `reimbursement-check.js` validate input and then show a confirmation
  without sending anything. Connect their `submit` handlers to an email
  service or backend before launch — the reimbursement form in particular
  promises that "our regulatory department will contact you shortly".
- **Phone number and office address** are commented out in the contact
  section of `index.html`; restore those rows once confirmed.
- **ARTG sponsor details** are commented out in the regulatory section of
  `index.html` for the same reason.
- **The LinkedIn embed on the news page is off.** Set `linkedinEmbedUrl` in
  `js/site-content.js` to a full embed URL including the post id
  (`.../embed/feed/update/urn:li:share:...`) and it appears above the news
  list. An incomplete URL is ignored rather than rendered as a dead iframe.
- **The canonical and Open Graph URLs** in both HTML files point at
  `https://vaseomedical.com`. Update them if the site lands on another domain.

## Notes

- The logo inherits nothing and is drawn in black; the footer flips it to
  white with `filter: invert(1)`. It is a real vector, so it stays crisp at
  any size.
- `logo.svg`, `favicon.svg` and `og-image.png` were generated from
  `VASEOMEDICALLOGO blackwhite.ai`.
