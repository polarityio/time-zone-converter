const { TIMEZONES } = require('./constants');
const { DateTime } = require('luxon');

const { getLogger } = require('./logger');
const { parseInt } = require('lodash/fp');

const createDetails = (entity, options) => {
  const logger = getLogger();
  let { value, displayValue } = entity;
  const type = entity.types[0];

  if (type === 'custom.WaybackMachineMementoTimestamp') {
    // Use regex to extract the timestamp from the entity value
    const timestampMatch = value.match(/(\d+)\[a]/);
    const timestamp = timestampMatch ? timestampMatch[1] : '';
    return {
      time: DateTime.fromFormat(timestamp, 'yyyyMMddHHmmss').toISO(),
      timezone: 'UTC'
    };
  } else if (type === 'custom.UnixTimestamp') {
    return {
      time: DateTime.fromSeconds(parseInt(10, value)).toISO(),
      timezone: 'UTC'
    };
  } else if (type === 'custom.ISO-Timezone') {
    const timezoneMatch = displayValue.match(/([A-Z]{3,4})$/);
    const timezone = timezoneMatch ? timezoneMatch[1] : 'UTC';
    timezoneName = TIMEZONES.find((tz) => tz.abbreviation === timezone);

    if (!timezoneName) {
      throw new Error(`Invalid timezone abbreviation: ${timezone}`);
    }

    const withoutTimezone = displayValue.substring(0, displayValue.length - timezone.length).trim();

    // Regular Expression to Check for presence of seconds
    let formatString;
    const checkSecondsRegex = /\d{2}:\d{2}:\d{2}$/;
    if (checkSecondsRegex.test(withoutTimezone)) {
      // When Second is present in string
      formatString = "yyyy-MM-dd 'T' HH:mm:ss";
    } else {
      // When Second is not present in string
      formatString = "yyyy-MM-dd 'T' HH:mm";
    }

    const formattedTime = DateTime.fromFormat(withoutTimezone, formatString).setZone(timezoneName.value);
    return {
      time: formattedTime,
      timezone: timezoneName.value
    };
  } else if (type === 'custom.ISO-8601') {
    let formattedTime;
    if (value.endsWith('Z')) {
      formattedTime = DateTime.fromISO(value, { zone: 'utc' });
    } else {
      formattedTime = DateTime.fromISO(value, { setZone: true });
    }
    return {
      time: formattedTime,
      timezone: formattedTime.zoneName
    };
  } else if (type === 'custom.RFC-3339') {
    let formattedTime;
    let timezone;
    let formatString;

    if (value.endsWith('Z')) {
      const valueWithoutZ = value.substring(0, value.length - 1);
      timezone = 'UTC';
      value = valueWithoutZ;
    }
    // Regular Expression to Check for presence of seconds
    const checkSecondsRegex = /\d{2}:\d{2}:\d{2}$/;
    if (checkSecondsRegex.test(value)) {
      // When Second is present in string
      formatString = 'yyyy-MM-dd HH:mm:ss';
    } else {
      // When Second is not present in string
      formatString = 'yyyy-MM-dd HH:mm';
    }
    formattedTime = DateTime.fromFormat(value, formatString, { setZone: true });
    timezone = formattedTime.zoneName;

    return {
      time: formattedTime,
      timezone: timezone
    };
  } else if (type === 'custom.NanosecondsSinceBoot') {
    const nanoseconds = value.match(/(\d+)\s?ns/)[1];

    return {
      time: nanoseconds,
      timezone: 'NA'
    };
  }
};

module.exports = createDetails;
