/* =========================================================
   Component — lightweight base class for custom elements
   ---------------------------------------------------------
   Every UI block on the site extends this class. A subclass
   only has to implement render() (returns an HTML string) and,
   optionally, afterRender() to wire up behaviour or inject
   nested components.

   Components render into their own light DOM so the global
   stylesheet keeps applying unchanged. They are declared as
   `display: contents` in styles.css, which means the wrapper
   element adds no box of its own: the rendered markup behaves
   exactly as if it were written directly in the page.
   ========================================================= */

export class Component extends HTMLElement {
  connectedCallback() {
    if (this._mounted) return; // guard against re-entry on re-insertion
    this._mounted = true;
    this.innerHTML = this.render();
    this.afterRender();
  }

  /** Return the component's HTML as a string. Override in subclasses. */
  render() {
    return "";
  }

  /** Run imperative setup after the markup is in the DOM. Optional. */
  afterRender() {}
}

/**
 * Register a custom element once. Calling define twice for the
 * same tag throws, so we guard against accidental double imports.
 */
export function define(tagName, ComponentClass) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ComponentClass);
  }
}

/**
 * Resolve a navigation href against the current page. An in-page
 * anchor (e.g. "#about") only works on the page that actually
 * contains that section. On other pages (like news.html) we send
 * the user to the matching section on the home page instead.
 * Hrefs to other documents are returned unchanged.
 */
export function resolveHref(href) {
  if (href.startsWith("#") && !document.getElementById(href.slice(1))) {
    return `index.html${href}`;
  }
  return href;
}

/**
 * Where the logo should point. Every page carries the header's
 * own #top anchor, so resolveHref cannot tell the home page from
 * the others: on news.html "#top" would just scroll to the top of
 * that page instead of going home. Decide on the URL instead.
 */
export function homeHref() {
  const path = window.location.pathname;
  const onHome = path.endsWith("/") || path.endsWith("/index.html");
  return onHome ? "#top" : "index.html";
}

/**
 * Build a mailto: URL from a subject and a list of [label, value]
 * pairs. Neither form has a backend yet, so a valid submission hands
 * the enquiry to the visitor's own mail client instead of dropping it.
 * Replace the callers with a fetch() to a real endpoint when there is
 * one; the validation around them does not need to change.
 */
export function mailtoLink(to, subject, fields) {
  const body = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
