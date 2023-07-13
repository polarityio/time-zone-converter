const { getLogger } = require('./logger');

const { parseWaybackMachineMemento } = require('./parsers/parseWaybackMachineMemento');
const { parseUnix } = require('./parsers/parseUnix');
const { parseISOTimezone } = require('./parsers/parseISOTimezone');
const { parseISO8601 } = require('./parsers/parseISO8601');
const { parseRFC3339 } = require('./parsers/parseRFC3339');
const { parseNanosecondsSinceBoot } = require('./parsers/parseNanosecondsSinceBoot');

const TYPE_BY_DATE_FORMAT_FUNC = {
  'custom.WaybackMachineMementoTimestamp': parseWaybackMachineMemento,
  'custom.UnixTimestamp': parseUnix,
  'custom.ISO-Timezone': parseISOTimezone,
  'custom.ISO-8601': parseISO8601,
  'custom.RFC-3339': parseRFC3339,
  'custom.NanosecondsSinceBoot': parseNanosecondsSinceBoot
};

const createTimezonesFromOptions = (entity, options, useDetails) => {
  const logger = getLogger();
  let { value } = entity;
  const type = entity.types[0];

  return TYPE_BY_DATE_FORMAT_FUNC[type](value, options, useDetails);
};

module.exports = {
  createTimezonesFromOptions
};