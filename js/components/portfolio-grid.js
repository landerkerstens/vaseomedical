/* =========================================================
   <portfolio-grid> — the "what we supply" card grid + footnote
   ---------------------------------------------------------
   Renders the cards container and trademark note, then
   composes one <product-card> per entry in `products` from the
   content data. The section heading stays in the HTML so it
   remains crawlable and the #system anchor works without
   scripts.
   ========================================================= */

import { Component, define } from "../lib/component.js?v=202609091701";
import { products } from "../site-content.js?v=202609091701";

class PortfolioGrid extends Component {
  render() {
    return `
      <div class="cards"></div>
      <p class="portfolio__note">
        The CRF system is manufactured by Cambridge Interventional LLC and
        distributed in Australia by Vaseo Medical Pty Ltd. Trademarks are the
        property of their respective manufacturers.
      </p>
    `;
  }

  afterRender() {
    const grid = this.querySelector(".cards");
    products.forEach((product) => {
      const card = document.createElement("product-card");
      card.product = product; // assign data before insertion
      grid.append(card);
    });
  }
}

define("portfolio-grid", PortfolioGrid);
