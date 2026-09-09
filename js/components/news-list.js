/* =========================================================
   <news-list> — dated news entries + optional LinkedIn post
   ---------------------------------------------------------
   Renders one row per entry in `newsItems`. When
   `linkedinEmbedUrl` in site-content.js points at a real post
   it is embedded above the list; an empty or incomplete URL is
   skipped so the page never shows a dead iframe. Used on
   news.html.
   ========================================================= */

import { Component, define } from "../lib/component.js?v=202609091701";
import { linkedinEmbedUrl, newsItems } from "../site-content.js?v=202609091701";

/* LinkedIn's embed URL only resolves with a post id appended;
   the bare .../embed/feed/update/ path returns a 404. */
const VALID_EMBED = /^https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:/;

const DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

class NewsList extends Component {
  render() {
    return this.renderEmbed() + this.renderList();
  }

  renderEmbed() {
    if (!VALID_EMBED.test(linkedinEmbedUrl)) return "";

    return `
      <div class="news__embed reveal">
        <iframe
          class="news__embed-frame"
          src="${linkedinEmbedUrl}"
          title="Latest LinkedIn post from Vaseo Medical"
          frameborder="0"
          allowfullscreen
          loading="lazy"></iframe>
      </div>`;
  }

  renderList() {
    const items = newsItems
      .map((item) => {
        const readable = DATE_FORMAT.format(new Date(`${item.date}T00:00:00`));
        return `
        <article class="news-item">
          <div class="news-item__meta">
            <time datetime="${item.date}">${readable}</time>
            <span class="news-item__tag">${item.label}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>`;
      })
      .join("");

    return `<div class="news__list">${items}</div>`;
  }
}

define("news-list", NewsList);
