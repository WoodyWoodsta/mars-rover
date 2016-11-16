/* scroll-switcher.es6 */

class ScrollSwitcher extends Polymer.Element {
  static get is() { return 'scroll-switcher'; }

  static get config() {
    return {
      properties: {
        viewing: {
          type: String,
          value: 'top',
          observer: '_onViewingChanged',
        },
      },
    };
  }

  // === Private ===
  _onViewingChanged() {
    console.log('Viewing changed!');
  }
}

customElements.define(ScrollSwitcher.is, ScrollSwitcher);
