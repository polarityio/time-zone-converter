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
  ]
});
