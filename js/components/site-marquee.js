/* =========================================================
   <site-marquee> — scrolling keyword band
   ---------------------------------------------------------
   Builds one "unit" of keywords from the content data and
   renders it twice so the CSS animation (translateX -50%)
   loops seamlessly. Editing the word list in site-content.js
   is all that is needed; the duplication is automatic.
   ========================================================= */

import { Component, define } from "../lib/component.js?v=202609091701";
import { marqueeWords } from "../site-content.js?v=202609091701";

class SiteMarquee extends Component {
  render() {
    const unit = marqueeWords
      .map((word) => `<span>${word}</span><span>&bull;</span>`)
      .join("");

    return `
      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">${unit}${unit}</div>
      </div>
    `;
  }
}

define("site-marquee", SiteMarquee);
