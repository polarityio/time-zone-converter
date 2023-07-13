const { DateTime } = require('luxon');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseISO8601 = (value, options, isDetailed) => {
  let formattedTime = DateTime.fromISO(
    value,
    value.endsWith('Z') ? { zone: 'utc' } : { setZone: true }
  );

  return getTimeZonesForThisDateTime(formattedTime, options, isDetailed);
};

module.exports = { parseISO8601 };
