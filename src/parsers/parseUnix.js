const { DateTime } = require('luxon');
const { parseInt } = require('lodash/fp');

const parseUnix = (value) => ({
  time: DateTime.fromSeconds(parseInt(value, 10)).toISO(),
  timezone: 'UTC'
});

module.exports = { parseUnix };
