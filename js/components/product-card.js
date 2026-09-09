/* =========================================================
   <product-card> — a single device card
   ---------------------------------------------------------
   A reusable, data-driven card. The parent assigns a product
   object to the `.product` property before insertion, e.g.

       const card = document.createElement("product-card");
       card.product = { index, name, category, description, tags };
       grid.append(card);

   A product with an `href` renders as a link to its own
   detail page and gains a "read more" cue; one without stays
   an inert <article>. Both share the .card styling, so the
   grid looks the same either way.

   Because the element is `display: contents`, the rendered
   card becomes a direct child of the grid, inheriting the
   existing card layout and hover styles.
   ========================================================= */

import { Component, define, resolveHref } from "../lib/component.js?v=202609091701";

class ProductCard extends Component {
  render() {
    const product = this.product;
    if (!product) return "";

    const tags = (product.tags || [])
      .map((tag) => `<li>${tag}</li>`)
      .join("");

    const body = `
      <div class="card__index">${product.index}</div>
      <h3>${product.name}</h3>
      <p class="card__cat">${product.category}</p>
      <p>${product.description}</p>
      <ul class="card__tags">${tags}</ul>
    `;

    if (!product.href) {
      return `<article class="card">${body}</article>`;
    }

    return `
      <a class="card card--link" href="${resolveHref(product.href)}">
        ${body}
        <p class="card__more">${product.linkLabel || "Read more"} <span aria-hidden="true">&rarr;</span></p>
      </a>
    `;
  }
}

define("product-card", ProductCard);
