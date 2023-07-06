const { DateTime } = require('luxon');

const parseRFC3339 = (value) => {
  let formattedTime;
  let timezone;

  const valueWithoutZ = value.endsWith('Z')
    ? value.substring(0, value.length - 1)
    : value;
  if (value.endsWith('Z')) {
    timezone = 'UTC';
    value = value.substring(0, value.length - 1);
  }

  const checkSecondsRegex = /\d{2}:\d{2}:\d{2}$/;
  const formatString = `yyyy-MM-dd HH:mm${checkSecondsRegex.test(value) ? ':ss' : ''}`;

  formattedTime = DateTime.fromFormat(value, formatString);

  return {
    time: formattedTime,
    timezone: formattedTime.zoneName
  };
};

module.exports = { parseRFC3339 };
