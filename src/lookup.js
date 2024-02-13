const {
  parseWaybackMachineMemento,
  parseUnix,
  parseISOTimezone,
  parseISO8601,
  parseRFC3339,
  parseNanosecondsSinceBoot
} = require('./parsers');

const customTypes = new Set([
  'custom.isoTimezone',
  'custom.iso8601',
  'custom.unixTimestamp',
  'custom.rfc3339',
  'custom.waybackMachineMementoTimestamp',
  'custom.nanosecondsSinceBoot'
]);

const TYPE_BY_DATE_FORMAT_FUNC = {
  'custom.waybackMachineMementoTimestamp': parseWaybackMachineMemento,
  'custom.unixTimestamp': parseUnix,
  'custom.isoTimezone': parseISOTimezone,
  'custom.iso8601': parseISO8601,
  'custom.rfc3339': parseRFC3339,
  'custom.nanosecondsSinceBoot': parseNanosecondsSinceBoot
};

const createTimezonesFromOptions = (entity, options, useDetails) => {
  const type = entity.types.find((type) => customTypes.has(type));

  if (type) {
    return TYPE_BY_DATE_FORMAT_FUNC[type](entity.value, options, useDetails);
  }
};

module.exports = {
  createTimezonesFromOptions
};
