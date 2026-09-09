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

import "./components/site-header.js?v=202609091654";
import "./components/site-marquee.js?v=202609091654";
import "./components/product-card.js?v=202609091654";
import "./components/portfolio-grid.js?v=202609091654";
import "./components/clinical-list.js?v=202609091654";
import "./components/resource-list.js?v=202609091654";
import "./components/partner-list.js?v=202609091654";
import "./components/contact-form.js?v=202609091654";
import "./components/gold-coast-map.js?v=202609091654";
import "./components/news-list.js?v=202609091654";
import "./components/site-footer.js?v=202609091654";

import { initScrollReveal } from "./behaviours/scroll-reveal.js?v=202609091654";

// Components have rendered synchronously by now; reveal can tag them.
initScrollReveal();
