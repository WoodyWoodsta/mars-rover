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
}

customElements.define(SiteShell.is, SiteShell);
