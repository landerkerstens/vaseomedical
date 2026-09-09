/* =========================================================
   <contact-form> — the site's single enquiry form
   ---------------------------------------------------------
   Renders one black button; the form itself opens in a dialog
   over the page. Every kind of enquiry arrives here: evaluating
   the system, choosing an electrode configuration, asking where
   an indication stands with the TGA, or booking a case. There is
   deliberately no second form anywhere on the site — one form,
   one inbox.

   The indication picker is optional: it gives a clinical
   enquiry somewhere precise to land without turning a general
   question into a form-filling exercise.

   There is no backend yet, so a valid submission is handed to
   the visitor's own mail client via mailto: rather than being
   dropped. Swap that call for a fetch() to a real endpoint
   when one exists; the validation around it does not change.
   ========================================================= */

import { Component, define, mailtoLink } from "../lib/component.js?v=202609091701";
import { brand } from "../site-content.js?v=202609091701";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Kept in step with the indications on the home page and the
   clinical applications on the product page. "Something else"
   stays last so the list never turns anyone away. */
const INDICATIONS = [
  "Benign thyroid nodules",
  "Uterine fibroids",
  "Liver lesions",
  "Pancreatic lesions",
  "Osteoid osteoma",
  "Something else / not yet decided",
];

class ContactForm extends Component {
  render() {
    const options = INDICATIONS.map(
      (indication) => `<option value="${indication}">${indication}</option>`
    ).join("");

    return `
      <button type="button" class="btn btn--solid enquiry__trigger">
        Send us an enquiry
      </button>

      <div class="enquiry__overlay" hidden>
        <div class="enquiry__dialog" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
          <button type="button" class="enquiry__close" aria-label="Close">&times;</button>
          <p class="eyebrow">Contact</p>
          <h3 id="enquiry-title">Talk to our team</h3>
          <p class="enquiry__intro">Tell us what you are looking at and a specialist will respond. If your question is about a particular indication, picking it below gets you to the right person faster.</p>

          <form class="contact__form" novalidate>
        <div class="field__row">
          <div class="field">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" autocomplete="name" required />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" autocomplete="email" required />
          </div>
        </div>
        <div class="field">
          <label for="org">Hospital or company</label>
          <input type="text" id="org" name="org" autocomplete="organization" required />
        </div>
        <div class="field">
          <label for="indication">Intended indication <span class="field__optional">Optional</span></label>
          <select id="indication" name="indication">
            <option value="" selected>Select if relevant</option>
            ${options}
          </select>
        </div>
        <div class="field">
          <label for="message">How can we help?</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
            <button type="submit" class="btn btn--solid btn--full">Send enquiry</button>
            <p class="form__status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    `;
  }

  afterRender() {
    const form = this.querySelector("form");
    const status = this.querySelector(".form__status");
    const trigger = this.querySelector(".enquiry__trigger");
    const overlay = this.querySelector(".enquiry__overlay");
    const dialog = this.querySelector(".enquiry__dialog");
    const closeBtn = this.querySelector(".enquiry__close");

    const open = () => {
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      dialog.querySelector("input").focus();
    };

    // Focus goes back to the button that opened the dialog, so a keyboard
    // user is not dropped at the top of the document on close.
    const close = () => {
      overlay.hidden = true;
      document.body.style.overflow = "";
      trigger.focus();
    };

    trigger.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !overlay.hidden) close();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const org = form.elements.org.value.trim();
      const message = form.elements.message.value.trim();

      if (!name || !email || !org || !message) {
        status.textContent =
          "Please complete your name, email, hospital or company and a message.";
        status.className = "form__status err";
        return;
      }

      if (!EMAIL_PATTERN.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.className = "form__status err";
        return;
      }

      const indication = form.elements.indication.value;
      window.location.href = mailtoLink(brand.email, `Enquiry from ${org}`, [
        ["Name", name],
        ["Email", email],
        ["Hospital / company", org],
        ["Intended indication", indication || "—"],
        ["Message", message],
      ]);

      status.textContent =
        `Thank you. Your email client is opening so you can send this to ${brand.email}.`;
      status.className = "form__status ok";
      form.reset();
    });
  }
}

define("contact-form", ContactForm);
