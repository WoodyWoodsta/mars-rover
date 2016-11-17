/* iron-resizable-relay.es6 */
Polymer({
  is: 'iron-resizable-relay',

  behaviors: [Polymer.IronResizableBehavior],

  listeners: {
    'iron-resize': '_onIronResize',
  },

  // === Private ===
  _onIronResize(event) {
    // Simply relay the detail
    this.dispatchEvent(new CustomEvent('iron-resize-relay', event.detail), { bubbles: true });
  },
});
