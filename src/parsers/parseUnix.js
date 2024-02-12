const { DateTime } = require('luxon');
const { parseInt } = require('lodash/fp');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseUnix = (value, options) => {
  const formattedTime = DateTime.fromSeconds(parseInt(10, value), { zone: 'utc' });

  let data = getTimeZonesForThisDateTime(formattedTime, options);
  data.details.type = 'Unix Timestamp';
  return data;
};

module.exports = { parseUnix };
