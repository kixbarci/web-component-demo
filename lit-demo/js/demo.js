// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';
import './actions.js';

// Extend the LitElement base class
class LeDemo extends LitElement {

  static get properties() {
    return { approved: { type: Boolean } };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      h1>span.approved {
        color: green;
      }
      h1>span.rejected {
        color: red;
      }
    `;
  }

  render() {
    const status = this.approved === undefined ? "Pending" : this.approved ? "Approved" : "Rejected";
    return html`
      <h1>Status: <span class=${status.toLowerCase()}>${status}</span></h1>
      <le-actions @approval-change=${this.onApprovedChange}></le-actions>
    `;
  }

  onApprovedChange(event) {
    this.approved = event.detail.approved;
  }

}

// Register the new element with the browser.
customElements.define('le-demo', LeDemo);
