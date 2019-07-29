(function () {

  const headerTemplate = document.createElement('template');
  headerTemplate.innerHTML = `
  <style></style>
  <div>
    <button id="approveBtn">Approve</button>
    <button id="rejectBtn">Reject</button>
  </div>
  `;

  class WcActionsComponent extends HTMLElement {
    static get observedAttributes() {
      return ["approved"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
      this._onApproveClick = this._onApproveClick.bind(this);
      this._onRejectClick = this._onRejectClick.bind(this);

      this._approveButton = this.shadowRoot.querySelector("button#approveBtn");
      this._rejectButton = this.shadowRoot.querySelector("button#rejectBtn");
    }

    connectedCallback() {
      this._approveButton.addEventListener("click", this._onApproveClick);
      this._rejectButton.addEventListener("click", this._onRejectClick);
    }

    disconnectedCallback() {
      this._approveButton.removeEventListener("click", this._onApproveClick);
      this._rejectButton.removeEventListener("click", this._onRejectClick);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "approved":
          this.dispatchEvent(new CustomEvent('approved-change', {
            detail: {
              approved: newValue === ""
            }
          }));
          break;
      }
    }

    get approved() {
      return this.hasAttribute("approved");
    }

    set approved(isApproved) {
      if (isApproved) {
        this.setAttribute("approved", "");
      } else {
        this.removeAttribute("approved");
      }
    }

    _onApproveClick(event) {
      this.approved = true;
    }
    _onRejectClick(event) {
      this.approved = false;
    }
  }

  customElements.define('wc-actions', WcActionsComponent);

})();