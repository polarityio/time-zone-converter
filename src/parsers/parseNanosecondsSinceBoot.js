const { DateTime } = require('luxon');
const {
  convertNanosecondsIntoFormattedString,
  getTimeZonesForThisDateTime
} = require('./utils');
const { getLogger } = require('../logger');

const parseNanosecondsSinceBoot = (value, options) => {
  const Logger = getLogger();

  let nanoseconds;
  const match = value.match(/(\d+)\s?ns/);

  if (Array.isArray(match) && match.length > 0) {
    nanoseconds = match[1];
  }

  if (nanoseconds) {
    const formattedNanoseconds = convertNanosecondsIntoFormattedString(nanoseconds);

    if (nanoseconds > Number.MAX_SAFE_INTEGER) {
      return {
        summary: [formattedNanoseconds],
        details: {
          nanoseconds: formattedNanoseconds,
          type: 'Nanoseconds since boot time'
        }
      };
    } else {
      const now = DateTime.now().toUTC();

      const bootTime = now.minus(parseInt(nanoseconds, 10) / 1000);

      let data = getTimeZonesForThisDateTime(bootTime, options);
      data.summary = [formattedNanoseconds];
      data.details.time = bootTime.toFormat(options.dateFormatString);
      data.details.type = 'Nanoseconds';
      data.details.nanoseconds = formattedNanoseconds;

      return data;
    }
  }
};

module.exports = { parseNanosecondsSinceBoot };
