const { DateTime } = require('luxon');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseISO8601 = (value, options) => {
  let formattedTime = DateTime.fromISO(
    value,
    value.endsWith('Z') ? { zone: 'utc' } : { setZone: true }
  );

  let data = getTimeZonesForThisDateTime(formattedTime, options);
  data.details.type = 'ISO-8601';
  return data;
};

module.exports = { parseISO8601 };
