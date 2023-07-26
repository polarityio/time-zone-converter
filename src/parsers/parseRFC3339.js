const { DateTime } = require('luxon');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseRFC3339 = (value, options, isDetailed) => {
  const hasSeconds = /\d{2}:\d{2}:\d{2}/.test(value);
  const hasZ = /Z$/.test(value);
  const hasOffset = /[\+-]\d{2}:\d{2}$/.test(value);

  const formatString = `yyyy-MM-dd HH:mm${hasSeconds ? ':ss' : ''}${
    hasZ ? "'Z'" : hasOffset ? 'ZZ' : ''
  }`;

  const formattedTime = DateTime.fromFormat(value, formatString, {
    setZone: hasOffset || hasZ ? 'utc' : false
  });

  return getTimeZonesForThisDateTime(formattedTime, options, isDetailed);
};

module.exports = { parseRFC3339 };
