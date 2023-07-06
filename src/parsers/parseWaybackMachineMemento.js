const { DateTime } = require('luxon');

const parseWaybackMachineMemento = (value) => ({
  time: DateTime.fromFormat(value.slice(0, -3), 'yyyyMMddHHmmss').toISO(),
  timezone: 'UTC'
});

module.exports = { parseWaybackMachineMemento };
