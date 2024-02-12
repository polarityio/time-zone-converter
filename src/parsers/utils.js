const { map, parseInt } = require('lodash/fp');

const checkSecondsRegex = /\d{2}:\d{2}:\d{2}$/;

const getTimeZonesForThisDateTime = (dateTime, options) => {
  return {
    summary: options.summaryTagTimeZones.map(
      ({ display: timezoneLabel, value: timezone }) => {
        return dateTime.setZone(timezone).toFormat(options.dateFormatString);
      }
    ),
    details: {
      timezones: options.detailsTimeZones.map(
        ({ display: timezoneLabel, value: timezone }) => {
          return {
            time: dateTime.setZone(timezone).toFormat(options.dateFormatString),
            timezoneLabel
          };
        }
      )
    }
  };
};

const convertNanosecondsIntoFormattedString = (nanosecondsString) => {
  let nanoseconds = parseInt(10, nanosecondsString);
  const milliseconds = nanoseconds / 1000000;
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (days >= 2) {
    // If more than 2 days, use days
    return `${Math.round(days)} days ago`;
  } else if (hours >= 1) {
    // If more than 1 hours, use hours
    return `${Math.round(hours)} hours ago, ${Math.round(minutes % 60)} minutes ago`;
  } else if (minutes >= 1) {
    // If more than 1 minute, use minutes
    return `${Math.round(minutes)} minutes ago, ${Math.round(seconds % 60)} seconds ago`;
  } else if (seconds >= 1) {
    // If more than 1 second, use seconds
    return `${Math.round(seconds)} seconds ago, ${Math.round(
      milliseconds % 1000
    )} milliseconds ago`;
  } else if (milliseconds >= 1) {
    // If more than 1 millisecond, use milliseconds
    return `${Math.round(milliseconds)} milliseconds ago`;
  } else {
    // If less than 1 millisecond, use nanoseconds
    return `${Math.round(nanoseconds)} nanoseconds ago`;
  }
};

module.exports = {
  checkSecondsRegex,
  getTimeZonesForThisDateTime,
  convertNanosecondsIntoFormattedString
};
