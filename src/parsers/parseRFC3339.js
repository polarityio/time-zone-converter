const { DateTime } = require('luxon');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseRFC3339 = (value, options) => {
  const hasSeconds = /\d{2}:\d{2}:\d{2}/.test(value);
  const hasZ = /Z$/.test(value);
  const hasOffset = /[\+-]\d{2}:\d{2}$/.test(value);

  const formatString = `yyyy-MM-dd HH:mm${hasSeconds ? ':ss' : ''}${
    hasZ ? "'Z'" : hasOffset ? 'ZZ' : ''
  }`;

  const formattedTime = DateTime.fromFormat(value, formatString, {
    setZone: hasOffset || hasZ ? 'utc' : false
  });

  let data = getTimeZonesForThisDateTime(formattedTime, options);
  data.details.type = 'RFC-3339';
  return data;
};

module.exports = { parseRFC3339 };
