'use strict';

polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  type: Ember.computed('block.entity.types', function () {
    return this.get('block.entity.types')[0];
  }),
  typeFormatted: Ember.computed('type', function () {
    const type = this.get('type');
    const typeFormatted = type.replace('custom.', '');
    return typeFormatted;
  }),
  time: Ember.computed.alias('details.time'),
  userTimezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  bootTime: Ember.computed('details.time', function () {
    const type = this.get('type');
    if (type === 'custom.NanosecondsSinceBoot') {
      const bootTime = new Date(new Date().getTime() - parseInt(this.get('details.time'), 10) / 1000000);
      return bootTime.toISOString();
    } else {
      return 'N/A';
    }
  }),
  nanosecondsFormatted: Ember.computed('details.time', function () {
    return this.getNanosecondsSinceBoot(this.get('details.time'));
  }),
  getNanosecondsSinceBoot: function (nanosecondsString) {
    let nanoseconds = parseInt(nanosecondsString, 10);
    const milliseconds = nanoseconds / 1000000;
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (days >= 2) {
      // If more than 2 days, use days
      return `${Math.round(days)} days ago`;
    } else if (hours >= 1) {
      // If more than 1 hours, use hours
      return `${Math.round(hours)} hours ago, ${Math.round(minutes % 60)} minutes ago`;
    } else if (minutes >= 1) {
      // If more than 1 minute, use minutes
      return `${Math.round(minutes)} minutes ago, ${Math.round(seconds % 60)} seconds ago`;
    } else if (seconds >= 1) {
      // If more than 1 second, use seconds
      return `${Math.round(seconds)} seconds ago, ${Math.round(milliseconds % 1000)} milliseconds ago`;
    } else if (milliseconds >= 1) {
      // If more than 1 millisecond, use milliseconds
      return `${Math.round(milliseconds)} milliseconds ago`;
    } else {
      // If less than 1 millisecond, use nanoseconds
      return `${Math.round(nanoseconds)} nanoseconds ago`;
    }
  },
  timezoneList: [
    { name: 'International Date Line West', abbreviation: 'IDLW', value: 'Etc/GMT+12' },
    { name: 'Nome Time', abbreviation: 'NT', value: 'America/Nome' },
    { name: 'Hawaii-Aleutian Standard Time', abbreviation: 'HST', value: 'Pacific/Honolulu' },
    { name: 'Alaska Standard Time', abbreviation: 'AKST', value: 'America/Anchorage' },
    { name: 'Pacific Standard Time', abbreviation: 'PST', value: 'America/Los_Angeles' },
    { name: 'Mountain Standard Time', abbreviation: 'MST', value: 'America/Denver' },
    { name: 'Central Standard Time', abbreviation: 'CST', value: 'America/Chicago' },
    { name: 'Eastern Standard Time', abbreviation: 'EST', value: 'America/New_York' },
    { name: 'Atlantic Standard Time', abbreviation: 'AST', value: 'America/Halifax' },
    { name: 'Newfoundland Standard Time', abbreviation: 'NST', value: 'America/St_Johns' },
    { name: 'Greenwich Mean Time', abbreviation: 'GMT', value: 'Etc/GMT' },
    { name: 'Central European Time', abbreviation: 'CET', value: 'Europe/Paris' },
    { name: 'Eastern European Time', abbreviation: 'EET', value: 'Europe/Athens' },
    { name: 'Moscow Standard Time', abbreviation: 'MSK', value: 'Europe/Moscow' },
    { name: 'India Standard Time', abbreviation: 'IST', value: 'Asia/Kolkata' },
    { name: 'Western Indonesian Time', abbreviation: 'WIB', value: 'Asia/Jakarta' },
    { name: 'Hong Kong Time', abbreviation: 'HKT', value: 'Asia/Hong_Kong' },
    { name: 'Japan Standard Time', abbreviation: 'JST', value: 'Asia/Tokyo' },
    { name: 'Australian Eastern Standard Time', abbreviation: 'AEST', value: 'Australia/Sydney' },
    { name: 'Australian Western Standard Time', abbreviation: 'AWST', value: 'Australia/Perth' }
  ],
  uniqueIdPrefix: '',
  showCopyMessage: false,
  init() {
    let array = new Uint32Array(5);
    this.set('uniqueIdPrefix', window.crypto.getRandomValues(array).join(''));

    this._super(...arguments);
  },
  actions: {
    copyData: function (elementId) {
      Ember.run.scheduleOnce('afterRender', this, this.copyElementToClipboard, elementId);

      Ember.run.scheduleOnce('destroy', this, this.restoreCopyState);
    }
  },
  copyElementToClipboard(element) {
    const text = typeof element === 'string' ? document.getElementById(element).innerText : element.innerText;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.log('Error in copying text: ', err);
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
