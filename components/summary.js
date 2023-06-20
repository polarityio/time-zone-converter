'use strict';
import moment from 'moment';

polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  time: Ember.computed.alias('details.time'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  now: Ember.computed(function () {
    // Get the current date/time in the timezone of the user
    const timezone = this.get('timezone');

    // Convert the entity time to the timezone of the user
    const time = moment(this.get('time')).tz(timezone);
    return time;
  })
});
