# Vaseo Medical — website

A static marketing site for Vaseo Medical Pty Ltd, the Australian arm of
Prion Medical. No build step and no framework: it uses native Web Components
and ES modules, so it deploys to any static host as-is.

The site represents **one system**: the Cambridge Interventional CRF
radiofrequency ablation platform and its internally-cooled electrodes. One
platform, several indications — thyroid nodules and uterine fibroids are the
two the manufacturer's brochures document in full, with liver, pancreatic and
bone (osteoid osteoma) applications named as the wider reach of the same
generator and electrode range. Every page is written on that assumption: the
home page introduces it, `crf-ablation-system.html` covers it in depth. If a
second line is ever added, the arrays in `js/site-content.js` are where it
enters the site.

## Project structure

```
.
├── index.html        Page shell + unique prose (hero, about, the system,
│                     indications, compliance, contact copy)
├── news.html         News page shell (header + news list + footer)
├── crf-ablation-system.html
│                     CRF product page: system, indications, electrode
│                     table, heritage and the brochure downloads
├── styles.css        Design tokens + all styling
├── logo.svg          Brand mark + wordmark
├── favicon.svg       Browser-tab icon (the mark on its own)
├── og-image.png      1200x630 social preview (LinkedIn, X, Slack)
├── bump.py           Stamps a new ?v= on every script URL (see Deploying)
├── docs/             Downloadable PDFs served by the CRF product page
└── js/
    ├── main.js              Entry point: registers components, starts behaviours
    ├── site-content.js      Single source of truth for all editable copy
    ├── lib/
    │   └── component.js      Base class + href helpers shared by every component
    ├── components/
    │   ├── site-header.js         <site-header>        nav + mobile menu
    │   ├── site-marquee.js        <site-marquee>       scrolling keyword band
    │   ├── product-card.js        <product-card>       one supply card
    │   ├── portfolio-grid.js      <portfolio-grid>     composes the supply cards
    │   ├── clinical-list.js       <clinical-list>      indication rows
    │   ├── resource-list.js       <resource-list>      downloadable brochure rows
    │   ├── partner-list.js        <partner-list>       "why partner" bullet list
    │   ├── contact-form.js        <contact-form>       black button + enquiry dialog
    │   │                                              (the site's only form)
    │   ├── news-list.js           <news-list>          dated news + optional LinkedIn embed
    │   └── site-footer.js         <site-footer>        footer + auto year
    └── behaviours/
        └── scroll-reveal.js  fade-and-rise reveal on scroll
```

## Editing content

Most text changes happen in **one place**: `js/site-content.js`. The three
cards in the "What we supply" section (`#system`) are the `products` array —
today the capital equipment, the electrodes and the support around them.
Menu items, marquee words, indications (`clinicalAreas` — rows A/B/C), partner
points, news
entries and footer links work the same way. Brochures are the same pattern with
one extra step: drop the PDF in `docs/`, then add an entry to `resources` (the
`size` field is shown to the visitor, so keep it in step with
`du -h docs/<file>`); they render on the CRF product page. The longer prose
blocks (hero, about, regulatory, contact) live directly in `index.html`, and
the CRF product copy in `crf-ablation-system.html`.

A card gains a detail page by adding `href` (and optionally `linkLabel`) to its
entry in `products`: the card turns into a link to that page. An entry without
an `href` stays a plain card.

### One form, one inbox

There is exactly one enquiry form on the site: `<contact-form>`. It renders a
black button under the Australia map and opens the form in a dialog over the
page. Every call to action anywhere else — the regulatory section's "Talk to our
team" button, the header and hero CTAs, the footer — points at `#contact`, which
lands the visitor on that button rather than opening a form of its own. If a new
kind of enquiry comes up, add a field to the one form instead of a second one.

### Where content goes

The home page is an **overview** and nothing more. Everything deeper about the
product — the four-part system breakdown, the electrode size and part-number
table, the manufacturer's heritage, the brochures and the indications in full —
lives one click away on `crf-ablation-system.html`, which card 01 and the
indications CTA both open at the top.

That split is the rule to keep when editing: if a `clinicalAreas` row grows past
a sentence or two, or a home section starts explaining the device rather than
introducing it, the text belongs on the product page instead.

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

## Deploying

**After editing anything under `js/`, run `bump.py` before pushing:**

```
python3 bump.py
```

There is no build step, so browsers decide for themselves how long to keep
`js/*.js`. GitHub Pages sends `max-age=600`, but browsers hold ES modules well
past that — a visitor can sit on old JavaScript after a deploy and see none of
the change, while the server is serving the new file perfectly. `bump.py`
appends `?v=<timestamp>` to every script URL (the `<script src>` in each HTML
page and every relative import inside `js/`), so new code arrives at a new URL
and a stale copy can never be reused.

CSS is not versioned: `styles.css` is a plain stylesheet, and a hard refresh
picks it up. If a style change ever proves as sticky as the modules did, the
same trick works on the `<link rel="stylesheet">`.

## Still to do

- **The enquiry dialog is front-end only.** `contact-form.js` validates input
  and then hands the enquiry to the visitor's own mail client. Connect its `submit`
  handler to an email service or backend before launch — the form promises that
  a specialist will respond.
- **The liver, pancreas and osteoid-osteoma applications have no documentation
  on the site.** Row C of the indications and the matching row on the product
  page are written as the wider reach of the platform rather than as documented
  protocols. Add manufacturer material to `docs/` and `resources` if it exists,
  or keep the wording as-is.
- **Phone number and office address** are commented out in the contact
  section of `index.html`; restore those rows once confirmed.
- **ARTG sponsor details** are commented out in the regulatory section of
  `index.html` for the same reason.
- **The LinkedIn embed on the news page is off.** Set `linkedinEmbedUrl` in
  `js/site-content.js` to a full embed URL including the post id
  (`.../embed/feed/update/urn:li:share:...`) and it appears above the news
  list. An incomplete URL is ignored rather than rendered as a dead iframe.
- **The canonical and Open Graph URLs** in all three HTML files point at
  `https://vaseomedical.com`, which is not registered yet — purchase is planned
  for around October 2026. Until then the site is served from
  `https://landerkerstens.github.io/vaseomedical/` and those URLs resolve to
  nothing, so social previews and canonical hints are inert. Once the domain is
  live, add a `CNAME` file with the bare hostname and point DNS at GitHub Pages;
  no other change is needed, the URLs are already correct for it.
- **`og-image.png` still carries the old, broader positioning.** Regenerate it
  around the CRF ablation system before the site is shared on LinkedIn or X.

## Notes

- The logo inherits nothing and is drawn in black; the footer flips it to
  white with `filter: invert(1)`. It is a real vector, so it stays crisp at
  any size.
- `logo.svg`, `favicon.svg` and `og-image.png` were generated from
  `VASEOMEDICALLOGO blackwhite.ai`.
