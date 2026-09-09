/* =========================================================
   site-content.js — single source of truth for the website
   ---------------------------------------------------------
   All editable copy lives here. To change a menu item, adjust
   the system cards, or edit the footer, change this file only.
   The components read from these exports and render the markup.

   The site represents one system: the Cambridge Interventional
   CRF radiofrequency ablation platform and its internally-cooled
   electrodes. One platform, several indications — copy is written
   on that assumption. If a second line is ever added, the arrays
   below are the place it enters the site.
   ========================================================= */

export const brand = {
  name: "Vaseo Medical",
  legalName: "Vaseo Medical Pty Ltd",
  logo: "logo.svg",
  email: "info@vaseomedical.com",
  tagline: "Specialist distributor of image-guided radiofrequency ablation.",
};

/* Primary navigation links (header + footer share this list). */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "The system", href: "#system" },
  { label: "Indications", href: "#clinical" },
  { label: "Why partner", href: "#partner" },
  { label: "Regulatory", href: "#compliance" },
  { label: "News", href: "news.html" },
];

/* Words shown in the scrolling marquee under the hero. */
export const marqueeWords = [
  "Radiofrequency ablation",
  "Thyroid nodules",
  "Uterine fibroids",
  "Liver & pancreas",
  "Osteoid osteoma",
  "Internally-cooled electrodes",
];

/* What we supply, shown as cards in the "The system" section.
   One technology, split into the three things a unit actually
   orders: the capital equipment, the sterile electrodes, and the
   support around them. Adding an entry adds a card; `href` turns
   the card into a link to a detail page. */
export const products = [
  {
    index: "01",
    name: "Internally-cooled RF electrodes",
    category: "Sterile single-use · 18 gauge",
    description:
      "Non-expanding, internally-cooled electrodes with a sharp tip, echogenic steerable shaft and depth marks. Five active tip lengths from 5 to 20 mm, each on a 7 cm or 12 cm shaft, so lesion size and depth decide the configuration.",
    tags: ["5–20 mm tips", "7 & 12 cm shafts", "Echogenic"],
    href: "crf-ablation-system.html",
    linkLabel: "Everything about the system",
  },
  {
    index: "02",
    name: "CRF generator, pump & footswitch",
    category: "Capital equipment · Cambridge Interventional",
    description:
      "A 370 W radiofrequency generator with real-time audiovisual feedback, an automatically synchronised cooling pump and a hands-free footswitch — so the operator stays on the patient and the ultrasound image rather than on the console.",
    tags: ["370 W", "Auto-synced pump", "Footswitch"],
    href: "crf-ablation-system.html#system",
    linkLabel: "How the system works",
  },
  {
    index: "03",
    name: "Training & case support",
    category: "Included with supply",
    description:
      "Structured onboarding for clinical and nursing teams, hands-on support for early cases, funding guidance and stock held against your list — the part of a one-system portfolio that a catalogue distributor cannot offer.",
    tags: ["Onboarding", "In-theatre support", "Reimbursement"],
  },
];

/* Downloadable documents shown on the CRF product page
   (crf-ablation-system.html), rendered by <resource-list>.

   `file` is a path relative to the site root; drop new PDFs in docs/
   and add an entry here. `size` is shown next to the link so a visitor
   knows what they are about to download — update it when a file is
   replaced (`du -h docs/<file>` gives the number).

   These are manufacturer materials for healthcare professionals:
   keep the `meta` line pointing at the document code and revision so
   the version on the site can be traced back to the source. */
export const resources = [
  {
    title: "CRF System — Thyroid Radiofrequency Ablation",
    summary:
      "Generator, cooled electrode range and ablation-size reference for moving-shot ablation of thyroid nodules.",
    meta: "Cambridge Interventional · MK-000010 Rev A",
    file: "docs/crf-system-thyroid-rfa-brochure.pdf",
    size: "PDF · 1.5 MB",
  },
  {
    title: "CRF System — Myoma Radiofrequency Ablation",
    summary:
      "System overview, procedure steps and a case report for transvaginal RFA of uterine fibroids.",
    meta: "Cambridge Interventional · MK-000021 Rev A",
    file: "docs/crf-system-myoma-rfa-brochure.pdf",
    size: "PDF · 2.4 MB",
  },
];

/* Indications, shown on the home page as short pointers only.
   The home page stays an overview: the full clinical prose, the
   electrode sizes and the manufacturer's heritage all live one
   click deeper, on crf-ablation-system.html. Keep these to a
   sentence or two — if a row starts growing, it belongs there
   instead. */
export const clinicalAreas = [
  {
    marker: "A",
    title: "Benign thyroid nodules",
    body: "Ultrasound-guided, moving-shot ablation under local anaesthetic — a day-case alternative to hemithyroidectomy that leaves the gland and thyroid function intact.",
  },
  {
    marker: "B",
    title: "Uterine fibroids",
    body: "Fibroids located individually under ultrasound and heated from within: uterus-sparing, and an alternative to hysterectomy or myomectomy in suitable patients.",
  },
  {
    marker: "C",
    title: "Liver, pancreas and bone",
    body: "The same generator and electrode range reach liver and pancreatic lesions and osteoid osteoma in bone. Ask us where a given application stands in Australia.",
  },
];

/* Reasons to partner, shown in the dark "Why partner" section. */
export const partnerPoints = [
  {
    title: "One system, known end to end.",
    body: "RF ablation is all we supply, so every conversation is with someone who knows the generator, the electrode range and the procedure.",
  },
  {
    title: "Support in the room.",
    body: "Structured onboarding for clinical and nursing teams and hands-on support for your early moving-shot cases.",
  },
  {
    title: "Reimbursement know-how.",
    body: "Deep experience navigating funding and reimbursement frameworks for novel device indications.",
  },
  {
    title: "Electrodes on the shelf.",
    body: "The full tip and shaft range held locally, so the configuration you plan for is the one available when the case is scheduled.",
  },
];

/* Optional LinkedIn embed shown above the news list on news.html.
   Leave it empty to hide the embed entirely.

   To show a post: open it on LinkedIn, click the "..." menu, choose
   "Embed this post", and copy the src URL out of the iframe. It must
   be the full URL including the post id, e.g.
     https://www.linkedin.com/embed/feed/update/urn:li:share:7123456789
   A URL without that trailing urn: part is a dead link (LinkedIn
   returns 404) and the embed is skipped. */
export const linkedinEmbedUrl = "";

/* News / announcements, newest first. Shown on news.html. */
export const newsItems = [
  {
    date: "2026-05-20",
    label: "Company",
    title: "Vaseo Medical is now operating in Australia.",
    body: "Our Australian operation is live, extending the focused European model of clinician-led support to hospitals and specialists across the country. We are introducing the CRF radiofrequency ablation system to endocrine, gynaecology, interventional radiology and orthopaedic teams from our Gold Coast base.",
  },
  {
    date: "2026-04-08",
    label: "Product",
    title: "We represent the Cambridge Interventional CRF system in Australia.",
    body: "Vaseo Medical is the Australian distributor for the Cambridge Interventional CRF radiofrequency ablation system and its internally-cooled electrode range — one platform for image-guided, minimally invasive ablation, from benign thyroid nodules and uterine fibroids to liver, pancreatic and bone lesions. Availability and permitted indications remain subject to Australian regulatory registration.",
  },
  {
    date: "2026-03-02",
    label: "Education",
    title: "Moving-shot training programme in development.",
    body: "We are building a structured onboarding and case-support programme around the moving-shot technique, for the clinical and nursing teams introducing thyroid or fibroid ablation to their unit. Express your interest through the contact form and a specialist will be in touch.",
  },
];

/* Footer link columns. */
export const footerColumns = [
  {
    heading: "The system",
    links: [
      { label: "CRF ablation system", href: "crf-ablation-system.html" },
      { label: "Electrode range", href: "crf-ablation-system.html#electrodes" },
      { label: "Indications", href: "#clinical" },
      { label: "Brochures", href: "crf-ablation-system.html#documentation" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Why partner", href: "#partner" },
      { label: "Regulatory", href: "#compliance" },
      { label: "News", href: "news.html" },
      { label: "Contact", href: "#contact" },
    ],
  },
];
