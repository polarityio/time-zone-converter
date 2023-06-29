'use strict';

polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  type: Ember.computed('block.entity.types', function () {
    return this.get('block.entity.types')[0];
  }),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  time: Ember.computed.alias('details.time', 'type', 'timezone', function () {
    const time = this.get('details.time');
    const type = this.get('type');
    const timezone = this.get('timezone');

    if (type === 'custom.ISO-Timezone') {
      console.log('ISO-Timezone', time);
      return this.getTimeInTimezone(time, 'yyyy-MM-dd HH:mm:ss', timezone);
    } else if (type === 'custom.nanoTime') {
      const nanoTimeMatch = time.match(/(\d+)(?:[ ][n][s])/);
      const nanoTime = nanoTimeMatch ? nanoTimeMatch[1] : '';
      return parseInt(nanoTime, 10); // Convert nanoTime to an integer
    } else if (type === 'custom.WaybackMachineMementoTimestamp') {
      return this.getTimeInTimezone(time, 'yyyyMMddHHmmss', 'UTC');
    } else {
      return time;
    }
  })
});
