const { DateTime } = require('luxon');
const { parseInt } = require('lodash/fp');
const { convertNanosecondsIntoFormattedString } = require('./utils');

const parseNanosecondsSinceBoot = (value, options, useDetailsTimeZones) => {
  const nanoseconds = value.match(/(\d+)\s?ns/)[1];

  const now = DateTime.now().toUTC();

  const bootTime = now.minus(parseInt(10, nanoseconds) / 1000);

  const formattedNanoseconds = convertNanosecondsIntoFormattedString(nanoseconds);
  return useDetailsTimeZones
    ? {
        time: bootTime.toFormat(options.dateFormatString),
        nanoseconds: formattedNanoseconds
      }
    : [formattedNanoseconds];
};

module.exports = { parseNanosecondsSinceBoot };
