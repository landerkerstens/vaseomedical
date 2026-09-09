/* =========================================================
   <site-header> — sticky navigation bar
   ---------------------------------------------------------
   Renders the brand, primary navigation and the contact CTA
   from the shared content data, and manages the mobile menu
   toggle (open / close, ARIA state, close-on-link-click).
   ========================================================= */

import { Component, define, homeHref, resolveHref } from "../lib/component.js?v=202609091659";
import { brand, navLinks } from "../site-content.js?v=202609091659";

class SiteHeader extends Component {
  render() {
    const links = navLinks
      .map((link) => `<a href="${resolveHref(link.href)}">${link.label}</a>`)
      .join("");

    const contactHref = resolveHref("#contact");

    return `
      <header class="nav" id="top">
        <div class="nav__inner">
          <a href="${homeHref()}" class="brand" aria-label="${brand.name} home">
            <img class="brand__logo" src="${brand.logo}" alt="${brand.name}"
                 width="392" height="123" />
          </a>

          <nav class="nav__links" aria-label="Primary">
            ${links}
            <a href="${contactHref}" class="btn btn--solid nav__cta-mobile">Contact us</a>
          </nav>


          <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    `;
  }

  afterRender() {
    const toggle = this.querySelector(".nav__toggle");
    const links = this.querySelector(".nav__links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the mobile menu whenever a link inside it is followed.
    links.querySelectorAll("a").forEach((anchor) => {
      anchor.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

define("site-header", SiteHeader);
