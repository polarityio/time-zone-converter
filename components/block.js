'use strict';

polarity.export = PolarityComponent.extend({
  uniqueIdPrefix: '',
  showCopyMessage: false,
  init() {
    let array = new Uint32Array(5);
    this.set('uniqueIdPrefix', window.crypto.getRandomValues(array).join(''));

    this._super(...arguments);
  },
  details: Ember.computed.alias('block.data.details'),
  type: Ember.computed('block.entity.types', function () {
    return this.get('block.entity.types')[0];
  }),
  time: Ember.computed.alias('details.time'),
  nanoseconds: Ember.computed.alias('details.nanoseconds'),
  typeFormatted: Ember.computed('type', function () {
    const type = this.get('type');
    const typeFormatted = type.replace('custom.', '');
    return typeFormatted;
  }),
  actions: {
    copyData: function (elementId) {
      Ember.run.scheduleOnce('afterRender', this, this.copyElementToClipboard, elementId);

      Ember.run.scheduleOnce('destroy', this, this.restoreCopyState);
    }
  },
  showCopySuccessCheck: {},
  copyElementToClipboard(element) {
    const text =
      typeof element === 'string'
        ? document.getElementById(element).innerText
        : element.innerText;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.set(`showCopySuccessCheck.${element}`, true);
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.log('Error in copying text: ', err);
      }).finally(() => {
        setTimeout(() => {
          this.set(`showCopySuccessCheck.${element}`, false);
        }, 2000);
      });
  },

  restoreCopyState() {
    this.set('showCopyMessage', true);

    setTimeout(() => {
      if (!this.isDestroyed) {
        this.set('showCopyMessage', false);
      }
    }, 2000);
  }
});
