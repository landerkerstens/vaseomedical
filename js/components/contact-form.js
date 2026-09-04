/* =========================================================
   <contact-form> — enquiry form with client-side validation
   ---------------------------------------------------------
   Renders the form markup and encapsulates its validation.
   There is no backend yet, so a valid submission is handed to
   the visitor's own mail client via mailto: rather than being
   dropped. Swap that call for a fetch() to a real endpoint
   when one exists.
   ========================================================= */

import { Component, define, mailtoLink } from "../lib/component.js";
import { brand } from "../site-content.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ContactForm extends Component {
  render() {
    return `
      <form class="contact__form" novalidate>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" autocomplete="name" required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" autocomplete="email" required />
        </div>
        <div class="field">
          <label for="org">Organisation</label>
          <input type="text" id="org" name="org" autocomplete="organization" />
        </div>
        <div class="field">
          <label for="message">How can we help?</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn--solid btn--full">Send enquiry</button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </form>
    `;
  }

  afterRender() {
    const form = this.querySelector("form");
    const status = this.querySelector(".form__status");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const validEmail = EMAIL_PATTERN.test(email);

      if (!name || !validEmail || !message) {
        status.textContent =
          "Please complete your name, a valid email and a message.";
        status.className = "form__status err";
        return;
      }

      const org = form.elements.org.value.trim();
      window.location.href = mailtoLink(brand.email, `Website enquiry from ${name}`, [
        ["Name", name],
        ["Email", email],
        ["Organisation", org || "—"],
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
