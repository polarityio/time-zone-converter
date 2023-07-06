const { DateTime } = require('luxon');

const parseISO8601 = (value) => {
  let formattedTime = DateTime.fromISO(
    value,
    value.endsWith('Z') ? { zone: 'utc' } : { setZone: true }
  );

  return {
    time: formattedTime,
    timezone: formattedTime.zoneName
  };
};

module.exports = { parseISO8601 };
