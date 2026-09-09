/* =========================================================
   site-content.js — single source of truth for the website
   ---------------------------------------------------------
   All editable copy lives here. To change a menu item, add a
   product, or adjust the footer, edit this file only. The
   components read from these exports and render the markup.
   ========================================================= */

export const brand = {
  name: "Vaseo Medical",
  legalName: "Vaseo Medical Pty Ltd",
  logo: "logo.svg",
  email: "info@vaseomedical.com",
  tagline: "Specialist distributor of endoscopy and ablation technologies.",
};

/* Primary navigation links (header + footer share this list). */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Clinical areas", href: "#clinical" },
  { label: "Why partner", href: "#partner" },
  { label: "Regulatory", href: "#compliance" },
  { label: "News", href: "news.html" },
];

/* Words shown in the scrolling marquee under the hero. */
export const marqueeWords = [
  "Radiofrequency ablation",
  "AI-assisted endoscopy",
  "Thyroid & fibroid",
  "Minimally invasive",
];

/* Product / device families shown in the Portfolio section. */
export const products = [
  {
    index: "01",
    name: "CRF Ablation System",
    category: "Radiofrequency ablation · Cambridge Interventional",
    description:
      "The Cambridge Interventional CRF generator, pump and internally-cooled electrodes for image-guided, non-surgical treatment of benign thyroid nodules and uterine fibroids — a minimally invasive alternative to surgery in suitable patients.",
    tags: ["RFA", "Thyroid", "Fibroid"],
    href: "crf-ablation-system.html",
    linkLabel: "System, indications & brochures",
  },
  {
    index: "02",
    name: "AI Endoscopy & Reporting",
    category: "AI-assisted endoscopy",
    description:
      "An AI-assisted endoscopy platform pairing real-time detection support with structured, automated reporting to streamline the procedure and the record that follows it.",
    tags: ["AI detection", "Reporting", "Workflow"],
  },
  {
    index: "03",
    name: "Coming soon",
    category: "In development",
    description:
      "A next-generation device developed in-house is on the way. We will share more as it approaches clinical introduction — register your interest to be among the first to hear.",
    tags: ["In development", "Innovation"],
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

/* Clinical areas where the technologies are used. */
export const clinicalAreas = [
  {
    marker: "A",
    title: "Interventional ablation",
    body: "Image-guided radiofrequency ablation for benign thyroid nodules and uterine fibroids, offering a non-surgical, minimally invasive alternative for suitable patients.",
  },
  {
    marker: "B",
    title: "AI-assisted endoscopy",
    body: "Real-time detection support paired with structured, automated reporting, helping clinicians work more consistently and capture the record as the procedure unfolds.",
  },
  {
    marker: "C",
    title: "Therapeutic endoscopy",
    body: "A focused range of devices for the GI tract, supported by hands-on clinical guidance — with a next-generation, in-house developed technology in the pipeline.",
  },
];

/* Reasons to partner, shown in the dark "Why partner" section. */
export const partnerPoints = [
  {
    title: "Procedural expertise.",
    body: "Our specialists understand the clinical workflow around every device we supply.",
  },
  {
    title: "Reimbursement know-how.",
    body: "Deep experience navigating funding and reimbursement frameworks for novel device indications.",
  },
  {
    title: "Responsive logistics.",
    body: "Reliable stock and rapid response so devices are available when the case is scheduled.",
  },
  {
    title: "Training and education.",
    body: "Structured onboarding and ongoing education for clinical and nursing teams.",
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
    body: "Our Australian operation is live, extending the focused European model of clinician-led support to hospitals and specialists across the country. We are introducing our therapeutic endoscopy and ablation portfolio to gastroenterology, surgical and interventional teams.",
  },
  {
    date: "2026-04-08",
    label: "Portfolio",
    title: "The CRF ablation system joins our Australian range.",
    body: "We are adding the Cambridge Interventional CRF radiofrequency ablation system to the portfolio we represent locally, supporting non-surgical treatment of benign thyroid nodules and uterine fibroids. Availability and indications remain subject to Australian regulatory registration.",
  },
  {
    date: "2026-03-02",
    label: "Education",
    title: "Hands-on training programme in development.",
    body: "We are building a structured onboarding and case-support programme for the clinical and nursing teams who will use our portfolio. Express your interest through the contact form and a specialist will be in touch.",
  },
];

/* Footer link columns. */
export const footerColumns = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "#about" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Clinical areas", href: "#clinical" },
      { label: "CRF ablation system", href: "crf-ablation-system.html" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Why partner", href: "#partner" },
      { label: "Regulatory", href: "#compliance" },
      { label: "News", href: "news.html" },
      { label: "Contact", href: "#contact" },
    ],
  },
];
