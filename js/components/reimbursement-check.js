/* =========================================================
   <reimbursement-check> — eligibility enquiry
   ---------------------------------------------------------
   Renders a button that opens a modal with a short form so
   clinicians/companies can check their chances of getting a
   reimbursement application approved. There is no backend yet,
   so a valid submission is handed to the visitor's own mail
   client via mailto: rather than being dropped — the form
   promises a reply, so it has to actually reach someone.
   ========================================================= */

import { Component, define, mailtoLink } from "../lib/component.js";
import { brand } from "../site-content.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ReimbursementCheck extends Component {
  render() {
    return `
      <button type="button" class="btn btn--solid reimbursement__trigger">
        Check reimbursement possibilities
      </button>

      <div class="reimbursement__overlay" hidden>
        <div class="reimbursement__dialog" role="dialog" aria-modal="true" aria-labelledby="reimbursement-title">
          <button type="button" class="reimbursement__close" aria-label="Close">&times;</button>
          <p class="eyebrow">Reimbursement</p>
          <h3 id="reimbursement-title">Check your reimbursement possibilities</h3>
          <p class="reimbursement__intro">Tell us a little about your product and we will assess the chances of approval for your reimbursement application.</p>

          <form class="reimbursement__form" novalidate>
            <div class="field">
              <label for="rc-company">Company name</label>
              <input type="text" id="rc-company" name="company" autocomplete="organization" required />
            </div>
            <div class="field">
              <label for="rc-product">Product name</label>
              <input type="text" id="rc-product" name="product" required />
            </div>
            <div class="field">
              <span class="field__legend">Does the product have CE / MDR certification?</span>
              <div class="field__choices">
                <label class="choice"><input type="radio" name="certified" value="yes" required /> Yes</label>
                <label class="choice"><input type="radio" name="certified" value="no" /> No</label>
              </div>
            </div>
            <div class="field__row">
              <div class="field">
                <label for="rc-patients">Number of patients</label>
                <input type="number" id="rc-patients" name="patients" min="0" required />
              </div>
              <div class="field">
                <label for="rc-studies">Number of studies</label>
                <input type="number" id="rc-studies" name="studies" min="0" required />
              </div>
            </div>
            <div class="field">
              <label for="rc-email">Email address</label>
              <input type="email" id="rc-email" name="email" autocomplete="email" required />
            </div>
            <button type="submit" class="btn btn--solid btn--full">Submit</button>
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

      const company = form.elements.company.value.trim();
      const product = form.elements.product.value.trim();
      const certified = form.elements.certified.value;
      const patients = form.elements.patients.value.trim();
      const studies = form.elements.studies.value.trim();
      const email = form.elements.email.value.trim();

      if (!company || !product || !certified || !patients || !studies || !email) {
        status.textContent = "Please complete every field before submitting.";
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
        `Reimbursement eligibility check — ${company}`,
        [
          ["Company", company],
          ["Product", product],
          ["CE / MDR certified", certified],
          ["Number of patients", patients],
          ["Number of studies", studies],
          ["Email", email],
        ]
      );

      status.textContent =
        "Thank you. Your email client is opening — send the message and our " +
        "regulatory department will be in touch.";
      status.className = "form__status ok";
      form.reset();
    });
  }
}

define("reimbursement-check", ReimbursementCheck);
