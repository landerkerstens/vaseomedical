/* =========================================================
   <clinical-list> — the lettered clinical-area rows
   ---------------------------------------------------------
   Renders one row per clinical area from the content data.
   ========================================================= */

import { Component, define } from "../lib/component.js?v=202609091659";
import { clinicalAreas } from "../site-content.js?v=202609091659";

class ClinicalList extends Component {
  render() {
    const rows = clinicalAreas
      .map(
        (area) => `
        <div class="crow">
          <div class="crow__num">${area.marker}</div>
          <div class="crow__title"><h3>${area.title}</h3></div>
          <div class="crow__body"><p>${area.body}</p></div>
        </div>`
      )
      .join("");

    return `<div class="clinical__rows">${rows}</div>`;
  }
}

define("clinical-list", ClinicalList);
