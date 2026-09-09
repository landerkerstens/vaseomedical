/* =========================================================
   <portfolio-grid> — the device card grid + footnote
   ---------------------------------------------------------
   Renders the cards container and trademark note, then
   composes one <product-card> per product from the content
   data. The section heading stays in the HTML so it remains
   crawlable and the #portfolio anchor works without scripts.
   ========================================================= */

import { Component, define } from "../lib/component.js";
import { products } from "../site-content.js";

class PortfolioGrid extends Component {
  render() {
    return `
      <div class="cards"></div>
      <p class="portfolio__note">
        Trademarks are the property of their respective manufacturers.
        Vaseo Medical Pty Ltd is the Australian distributor for the
        Cambridge Interventional CRF ablation system.
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
