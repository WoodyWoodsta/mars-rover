;

(function () {
  'use strict';

  /* scroll-switcher.es6 */

  class ScrollSwitcher extends Polymer.Element {
    static get is() {
      return 'scroll-switcher';
    }

    static get config() {
      return {
        properties: {
          viewing: {
            type: String,
            value: 'top',
            observer: '_onViewingChanged'
          },

          mousePos: {
            type: Object,
            value: {
              x: 0,
              y: 0
            },
            observer: '_onMousePosChanged'
          },

          mouseInside: {
            type: Boolean,
            value: false,
            observer: '_onMouseInsideChanged'
          },

          pageDimensions: {
            type: Object,
            value: {
              width: 0,
              height: 0
            }
          }
        }
      };
    }

    // === Lifecycle ===
    connectedCallback() {
      super.connectedCallback();

      this.addEventListener('mousemove', this._onMouseMove);
      this.addEventListener('mouseenter', this._onMouseEnter);
      this.addEventListener('mouseleave', this._onMouseLeave);
      this.$.ironResizableRelay.addEventListener('iron-resize-relay', this._onIronResize.bind(this));
    }

    disconnectedCallback() {
      super.disconnectedCallback();

      this.removeEventListener('mousemove', this._onMouseMove);
      this.addEventListener('mouseenter', this._onMouseEnter);
      this.addEventListener('mouseleave', this._onMouseLeave);
      this.$.ironResizableRelay.removeEventListener('iron-resize-relay', this._onIronResize.bind(this));
    }

    // === Private ===
    _recalcPageDimensions() {
      this.pageDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
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
        y: event.y
      };
    }

    _onMousePosChanged() {
      var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: this.mousePos.x, y: this.mousePos.y };

      this.updateStyles({ '--horizontal-offset': (newValue.x - this.pageDimensions.width / 2) / 15 + 'px' });
      this.updateStyles({ '--vertical-offset': (newValue.y - this.pageDimensions.height / 2) / 15 + 'px' });
    }

    _onIronResize() {
      this._recalcPageDimensions();
    }

    _onMouseInsideChanged() {
      var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.mouseInside;

      if (!newValue) {
        this.mousePos = {
          x: this.pageDimensions.width / 2,
          y: this.pageDimensions.height / 2
        };
      }
    }

    _onMouseEnter() {
      this.mouseInside = true;
    }

    _onMouseLeave() {
      this.mouseInside = false;
    }
  }

  customElements.define(ScrollSwitcher.is, ScrollSwitcher);
})();