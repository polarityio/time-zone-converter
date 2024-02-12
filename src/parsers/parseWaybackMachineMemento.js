const { DateTime } = require('luxon');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseWaybackMachineMemento = (value, options) => {
  const formattedTime = DateTime.fromFormat(
    value.slice(0, -3).concat('+0'),
    'yyyyMMddHHmmssZ'
  );

  let data = getTimeZonesForThisDateTime(formattedTime, options);
  data.details.type = 'Wayback Machine Memento';
  return data;
};

module.exports = { parseWaybackMachineMemento };
