/* =========================================================
   main.js — application entry point
   ---------------------------------------------------------
   Imports every component (each registers its own custom
   element on import) and then starts page-level behaviours.
   Loaded as a module, so it runs after the document is parsed
   and the custom elements upgrade immediately.

   Dependency order matters once: <product-card> is imported
   before <portfolio-grid>, which composes product cards.
   ========================================================= */

import "./components/site-header.js";
import "./components/site-marquee.js";
import "./components/product-card.js";
import "./components/portfolio-grid.js";
import "./components/clinical-list.js";
import "./components/partner-list.js";
import "./components/contact-form.js";
import "./components/gold-coast-map.js";
import "./components/reimbursement-check.js";
import "./components/news-list.js";
import "./components/site-footer.js";

import { initScrollReveal } from "./behaviours/scroll-reveal.js";

// Components have rendered synchronously by now; reveal can tag them.
initScrollReveal();
