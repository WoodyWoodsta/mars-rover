/* site-shell.es6 */

class SiteShell extends Polymer.Element {
  static get is() { return 'site-shell'; }

  static get config() {
    return {
      properties: {
        loaded: {
          type: Boolean,
          value: false,
        },
      },
    };
  }

  // === Lifecycle ===
  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('mousemove', this._onMouseMove);
    this.addEventListener('mouseenter', this._onMouseEnter);
    this.addEventListener('mouseleave', this._onMouseLeave);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('mousemove', this._onMouseMove);
    this.removeEventListener('mouseenter', this._onMouseEnter);
    this.removeEventListener('mouseleave', this._onMouseLeave);
  }

  // === Private ===
  _onMouseMove(event) {
    this.$.scrollSwitcher._onMouseMove(event);
  }

  _onMouseEnter(event) {
    this.$.scrollSwitcher._onMouseEnter(event);
  }

  _onMouseLeave(event) {
    this.$.scrollSwitcher._onMouseLeave(event);
  }
}

customElements.define(SiteShell.is, SiteShell);
