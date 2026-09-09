/* =========================================================
   <reimbursement-check> — "explore the possibilities" enquiry
   ---------------------------------------------------------
   Renders a button that opens a modal with a short form. The
   people who open it are clinicians, not manufacturers, so it
   asks the three things we actually need in order to answer:
   where they are, how to reach them, and what they want to
   treat. Our team comes back on regulatory status, funding and
   what a first case involves.

   There is no backend yet, so a valid submission is handed to
   the visitor's own mail client via mailto: rather than being
   dropped — the form promises a reply, so it has to actually
   reach someone. The sender's name comes with their email, which
   is why the form does not ask for it a second time.

   The tag, file and CSS class names still read "reimbursement"
   from an earlier version of this block; they are internal only.
   ========================================================= */

import { Component, define, mailtoLink } from "../lib/component.js";
import { brand } from "../site-content.js";

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

class ReimbursementCheck extends Component {
  render() {
    const options = INDICATIONS.map(
      (indication) => `<option value="${indication}">${indication}</option>`
    ).join("");

    return `
      <button type="button" class="btn btn--solid reimbursement__trigger">
        Explore the possibilities with us
      </button>

      <div class="reimbursement__overlay" hidden>
        <div class="reimbursement__dialog" role="dialog" aria-modal="true" aria-labelledby="reimbursement-title">
          <button type="button" class="reimbursement__close" aria-label="Close">&times;</button>
          <p class="eyebrow">Enquiry</p>
          <h3 id="reimbursement-title">Explore the possibilities with our team</h3>
          <p class="reimbursement__intro">Tell us where you are and what you would like to treat. We will come back to you on the regulatory status in Australia, the funding routes available and what a first case would involve.</p>

          <form class="reimbursement__form" novalidate>
            <div class="field">
              <label for="rc-org">Hospital or company</label>
              <input type="text" id="rc-org" name="org" autocomplete="organization" required />
            </div>
            <div class="field">
              <label for="rc-email">Email address</label>
              <input type="email" id="rc-email" name="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="rc-indication">Intended indication</label>
              <select id="rc-indication" name="indication" required>
                <option value="" selected disabled>Select an indication</option>
                ${options}
              </select>
            </div>
            <div class="field">
              <label for="rc-notes">Anything else we should know? <span class="field__optional">Optional</span></label>
              <textarea id="rc-notes" name="notes" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn--solid btn--full">Send enquiry</button>
            <p class="form__status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    `;
  }

  afterRender() {
    const trigger = this.querySelector(".reimbursement__trigger");
    const overlay = this.querySelector(".reimbursement__overlay");
    const dialog = this.querySelector(".reimbursement__dialog");
    const closeBtn = this.querySelector(".reimbursement__close");
    const form = this.querySelector("form");
    const status = this.querySelector(".form__status");

    const open = () => {
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      dialog.querySelector("input").focus();
    };

    const close = () => {
      overlay.hidden = true;
      document.body.style.overflow = "";
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

      const org = form.elements.org.value.trim();
      const email = form.elements.email.value.trim();
      const indication = form.elements.indication.value;
      const notes = form.elements.notes.value.trim();

      if (!org || !email || !indication) {
        status.textContent =
          "Please give us your hospital or company, your email and the indication.";
        status.className = "form__status err";
        return;
      }

      if (!EMAIL_PATTERN.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.className = "form__status err";
        return;
      }

      window.location.href = mailtoLink(
        brand.email,
        `Enquiry — ${org}`,
        [
          ["Hospital / company", org],
          ["Email", email],
          ["Intended indication", indication],
          ["Notes", notes || "—"],
        ]
      );

      status.textContent =
        "Thank you. Your email client is opening — send the message and a " +
        "specialist will be in touch.";
      status.className = "form__status ok";
      form.reset();
    });
  }
}

define("reimbursement-check", ReimbursementCheck);
