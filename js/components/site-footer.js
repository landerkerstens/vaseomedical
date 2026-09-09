/* =========================================================
   <site-footer> — global footer
   ---------------------------------------------------------
   Renders the brand block, link columns and the legal bar
   from the shared content data, and fills in the current
   year automatically.
   ========================================================= */

import { Component, define, resolveHref } from "../lib/component.js?v=202609091701";
import { brand, footerColumns } from "../site-content.js?v=202609091701";

class SiteFooter extends Component {
  render() {
    const year = new Date().getFullYear();

    const columns = footerColumns
      .map((column) => {
        const links = column.links
          .map((link) => `<a href="${resolveHref(link.href)}">${link.label}</a>`)
          .join("");
        return `<div><h4>${column.heading}</h4>${links}</div>`;
      })
      .join("");

    return `
      <footer class="footer">
        <div class="footer__inner">
          <div class="footer__brand">
            <img class="footer__logo" src="${brand.logo}" alt="${brand.name}" />
            <p>${brand.tagline}</p>
          </div>
          <div class="footer__cols">${columns}</div>
        </div>
        <div class="footer__bar">
          <p>&copy; ${year} ${brand.legalName}. All rights reserved.</p>
          <p class="footer__legal">
            Devices supplied subject to TGA / ARTG registration.
            For healthcare professionals.
          </p>
        </div>
      </footer>
    `;
  }
}

define("site-footer", SiteFooter);
