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

  Logger.info({ match }, 'Nanosecond Match');
  if (Array.isArray(match) && match.length > 0) {
    nanoseconds = match[1];
  }

  if (nanoseconds) {
    Logger.info({ nanoseconds }, 'Nanoseconds');

    const now = DateTime.now().toUTC();

    const bootTime = now.minus(parseInt(nanoseconds, 10) / 1000);

    const formattedNanoseconds = convertNanosecondsIntoFormattedString(nanoseconds);

    Logger.info({ bootTime, formattedNanoseconds }, 'BootTime');

    let data = getTimeZonesForThisDateTime(bootTime, options);
    data.summary = [formattedNanoseconds];
    data.details.time = bootTime.toFormat(options.dateFormatString);
    data.details.type = 'Nanoseconds';
    data.details.nanoseconds = formattedNanoseconds;

    return data;
    // return {
    //   summary: [formattedNanoseconds],
    //   details: {)
    //     time: bootTime.toFormat(options.dateFormatString,
    //     nanoseconds: formattedNanoseconds,
    //     type: 'Nanoseconds'
    //   }
    // };
  }
};

module.exports = { parseNanosecondsSinceBoot };
