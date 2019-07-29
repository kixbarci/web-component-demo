import { LitElement, html } from "lit-element";

class LeActions extends LitElement {

  static get properties() {
    return { approved: { type: Boolean, reflect: true } };
  }

  constructor() {
    super();
    this.approved = false;
  }

  publishApproval(e) {
    this.approved = e;
    let event = new CustomEvent('approval-change', {
      detail: { approved: this.approved }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div>
        <button id="approveBtn" @click=${() => this.publishApproval(true)}>Approve</button>
        <button id="rejectBtn" @click=${() => this.publishApproval(false)}>Reject</button>
      </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define('le-actions', LeActions);