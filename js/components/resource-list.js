/* =========================================================
   <resource-list> — downloadable manufacturer documents
   ---------------------------------------------------------
   Renders one row per entry in `resources`. Each row is a
   link straight to the PDF in docs/, opened in a new tab so
   the browser's own viewer takes over and the visitor keeps
   their place on the page. `download` is deliberately left
   off: clinicians usually want to read first, and the viewer
   still offers a save button.
   ========================================================= */

import { Component, define } from "../lib/component.js?v=202609091701";
import { resources } from "../site-content.js?v=202609091701";

class ResourceList extends Component {
  render() {
    const items = resources
      .map(
        (resource) => `
          <li>
            <a class="resource" href="${resource.file}" target="_blank" rel="noopener">
              <span class="resource__icon" aria-hidden="true">PDF</span>
              <span class="resource__body">
                <span class="resource__title">${resource.title}</span>
                <span class="resource__summary">${resource.summary}</span>
                <span class="resource__meta">${resource.meta} &middot; ${resource.size}</span>
              </span>
              <span class="resource__action" aria-hidden="true">Open &rarr;</span>
            </a>
          </li>
        `
      )
      .join("");

    return `<ul class="resources__list">${items}</ul>`;
  }
}

define("resource-list", ResourceList);
