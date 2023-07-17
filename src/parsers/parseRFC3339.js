const { DateTime } = require('luxon');
const { checkSecondsRegex, getTimeZonesForThisDateTime } = require('./utils');

const parseRFC3339 = (value, options, isDetailed) => {
  const valueWithoutZ = value.endsWith('Z')
    ? value.substring(0, value.length - 1)
    : value;

  const formatString = `yyyy-MM-dd HH:mm${
    checkSecondsRegex.test(valueWithoutZ) ? ':ss' : ''
  }`;

  const formattedTime = DateTime.fromFormat(valueWithoutZ, formatString, { zone: 'utc' });

  return getTimeZonesForThisDateTime(formattedTime, options, isDetailed);
};

module.exports = { parseRFC3339 };
