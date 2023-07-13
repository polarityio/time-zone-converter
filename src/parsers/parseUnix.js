const { DateTime } = require('luxon');
const { parseInt } = require('lodash/fp');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseUnix = (value, options, isDetailed) => {
  const formattedTime = DateTime.fromSeconds(parseInt(10, value), { zone: 'utc' });
  return getTimeZonesForThisDateTime(formattedTime, options, isDetailed);
};

module.exports = { parseUnix };
