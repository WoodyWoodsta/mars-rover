/* scroll-switcher.es6 */

class ScrollSwitcher extends Polymer.Element {
  static get is() { return 'scroll-switcher'; }

  static get config() {
    return {
      properties: {
        viewing: {
          type: String,
          value: 'top',
          reflectToAttribute: true,
          observer: '_onViewingChanged',
        },

        mousePos: {
          type: Object,
          value: {
            x: 0,
            y: 0,
          },
          observer: '_onMousePosChanged',
        },

        mouseInside: {
          type: Boolean,
          value: false,
          observer: '_onMouseInsideChanged',
        },

        pageDimensions: {
          type: Object,
          value: {
            width: 0,
            height: 0,
          },
        },

        onTheChevron: {
          type: Boolean,
          reflectToAttribute: true,
          value: false,
          computed: '_computeOnTheChevron(mousePos)',
        },
      },
    };
  }

  // === Lifecycle ===
  connectedCallback() {
    super.connectedCallback();

    this.$.ironResizableRelay.addEventListener('iron-resize-relay', this._onIronResize.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.$.ironResizableRelay.removeEventListener('iron-resize-relay', this._onIronResize.bind(this));
  }

  // === Private ===
  _recalcPageDimensions() {
    this.pageDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this._onMousePosChanged();
    this._onMouseInsideChanged();
  }

  _onViewingChanged() {
    console.log('Viewing changed!');
  }

  _onMouseMove(event) {
    this.mousePos = {
      x: event.x,
      y: event.y,
    };
  }

  _onMousePosChanged(newValue = { x: this.mousePos.x, y: this.mousePos.y }) {
    this.updateStyles({ '--horizontal-offset': `${(newValue.x - (this.pageDimensions.width / 2)) / 15}px` });
    this.updateStyles({ '--vertical-offset': `${(newValue.y - (this.pageDimensions.height / 2)) / 15}px` });
  }

  _onIronResize() {
    this._recalcPageDimensions();
  }

  _onMouseInsideChanged(newValue = this.mouseInside) {
    if (!newValue) {
      this.mousePos = {
        x: this.pageDimensions.width / 2,
        y: this.pageDimensions.height / 2,
      };
    }
  }

  _onMouseEnter() {
    this.mouseInside = true;
  }

  _onMouseLeave() {
    this.mouseInside = false;
  }

  _computeOnTheChevron(newValue) {
    const proximityX = (newValue.x - (this.pageDimensions.width / 2)) / this.pageDimensions.width;
    const proximityY = 1 - (newValue.y / this.pageDimensions.height);

    return ((proximityX < 0.1 && proximityX > -0.1) && proximityY < 0.15);
  }
}

customElements.define(ScrollSwitcher.is, ScrollSwitcher);
