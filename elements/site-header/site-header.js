;

(function () {
  'use strict';

  /* site-header.es6 */

  class SiteHeader extends Polymer.Element {
    static get is() {
      return 'site-header';
    }

    static get config() {
      return {};
    }
  }

  customElements.define(SiteHeader.is, SiteHeader);
})();