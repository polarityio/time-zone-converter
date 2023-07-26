const {
  parseWaybackMachineMemento,
  parseUnix,
  parseISOTimezone,
  parseISO8601,
  parseRFC3339,
  parseNanosecondsSinceBoot
} = require('./parsers');

const TYPE_BY_DATE_FORMAT_FUNC = {
  'custom.WaybackMachineMementoTimestamp': parseWaybackMachineMemento,
  'custom.UnixTimestamp': parseUnix,
  'custom.ISO-Timezone': parseISOTimezone,
  'custom.ISO-8601': parseISO8601,
  'custom.RFC-3339': parseRFC3339,
  'custom.NanosecondsSinceBoot': parseNanosecondsSinceBoot
};

const createTimezonesFromOptions = (entity, options, useDetails) => {
  const type = entity.types[0];

  return TYPE_BY_DATE_FORMAT_FUNC[type](entity.value, options, useDetails);
};

module.exports = {
  createTimezonesFromOptions
};
