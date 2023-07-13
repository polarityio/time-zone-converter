const { DateTime } = require('luxon');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseRFC3339 = (value, options, isDetailed) => {
  let formattedTime;
  let timezone;

  const valueWithoutZ = value.endsWith('Z')
    ? value.substring(0, value.length - 1)
    : value;
  if (value.endsWith('Z')) {
    value = value.substring(0, value.length - 1);
  }

  const checkSecondsRegex = /\d{2}:\d{2}:\d{2}$/;
  const formatString = `yyyy-MM-dd HH:mm${checkSecondsRegex.test(value) ? ':ss' : ''}`;

  formattedTime = DateTime.fromFormat(value, formatString, { zone: 'utc' });

  return getTimeZonesForThisDateTime(formattedTime, options, isDetailed);
};

module.exports = { parseRFC3339 };
