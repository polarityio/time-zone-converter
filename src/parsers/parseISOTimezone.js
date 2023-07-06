const { DateTime } = require('luxon');
const { TIMEZONES } = require('../constants');

const parseISOTimezone = (value) => {
  const timezoneMatch = value.match(/([A-Z]{3,4})$/);
  const timezone = timezoneMatch ? timezoneMatch[0] : 'UTC';
  const timezoneName = TIMEZONES.find((tz) => tz.abbreviation === timezone);

  if (!timezoneName) {
    throw new Error(`Invalid timezone abbreviation: ${timezone}`);
  }

  const withoutTimezone = value.substring(0, value.length - timezone.length).trim();

  const checkSecondsRegex = /\d{2}:\d{2}:\d{2}$/;
  const formatString = `yyyy-MM-dd 'T' HH:mm${
    checkSecondsRegex.test(withoutTimezone) ? ':ss' : ''
  }`;

  const formattedTimeWithZone = DateTime.fromFormat(withoutTimezone, formatString, {
    zone: timezoneName.value
  }).toISO({ includeOffset: false });

  return {
    time: formattedTimeWithZone,
    timezone: timezoneName.value
  };
};

module.exports = { parseISOTimezone };
