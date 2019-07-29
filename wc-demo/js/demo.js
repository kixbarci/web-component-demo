(function () {

  const demoTemplate = document.createElement('template');
  demoTemplate.innerHTML = `
    <style> 
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
    </style>
    <h1></h1> 
    <wc-actions></wc-actions>
    `;

  class WcDemoComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(demoTemplate.content.cloneNode(true));
    }

    connectedCallback() {
      this._header = this.shadowRoot.querySelector("h1");
      this._actions = this.shadowRoot.querySelector("wc-actions");
      this._onApprovedChange = this._onApprovedChange.bind(this);
      this._actions.addEventListener("approved-change", this._onApprovedChange);
      this._updateHeader();
    }

    disconnectedCallback() {
      this._actions.removeEventListener("approved-change", this._onApprovedChange);
    }

    _onApprovedChange(event) {
      this._updateHeader(event.detail.approved);
    }

    _updateHeader(approved) {
      const status = approved === undefined ? "Pending" : approved ? "Approved" : "Rejected";
      this._header.innerHTML = `Status: <span class=${status.toLowerCase()}>${status}</span>`;
    }
  }

  customElements.define('wc-demo', WcDemoComponent);

})();