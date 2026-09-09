/* =========================================================
   <partner-list> — the "Why partner with us" bullet list
   ---------------------------------------------------------
   Renders the partner points from the content data as the
   second column of the partner grid.
   ========================================================= */

import { Component, define } from "../lib/component.js?v=202609091654";
import { partnerPoints } from "../site-content.js?v=202609091654";

class PartnerList extends Component {
  render() {
    const items = partnerPoints
      .map(
        (point) =>
          `<li><strong>${point.title}</strong> ${point.body}</li>`
      )
      .join("");

    return `<ul class="partner__list">${items}</ul>`;
  }
}

define("partner-list", PartnerList);
