const { DateTime } = require('luxon');
const { getTimeZonesForThisDateTime } = require('./utils');

const parseWaybackMachineMemento = (value, options, isDetailed) => {
  const formattedTime = DateTime.fromFormat(
    value.slice(0, -3).concat('+0'),
    'yyyyMMddHHmmssZ'
  );

  return getTimeZonesForThisDateTime(formattedTime, options, isDetailed);
};

module.exports = { parseWaybackMachineMemento };
