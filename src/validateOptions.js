const { DateTime } = require('luxon');
const { get, isEmpty } = require('lodash/fp');
const reduce = require('lodash/fp/reduce').convert({ cap: false });

const validateOptions = async (options, callback) => {
  const stringOptionsErrorMessages = {
    dateFormatString: '* Required'
  };

  const stringValidationErrors = validateStringOptions(
    stringOptionsErrorMessages,
    options
  );

  const formattedDate = DateTime.now().toFormat(options.dateFormatString.value);
  const dateValidationErrors =
    formattedDate === 'Invalid DateTime'
      ? { key: 'dateFormatString', message: '* Invalid Date Format String' }
      : [];

  const summaryTagOrDetailsTimeZones = options.summaryTagTimeZones.value.concat(
    options.detailsTimeZones.value
  );
  const timezonesValidationErrors =
    summaryTagOrDetailsTimeZones.length === 0
      ? [
          { key: 'summaryTagTimeZones', message: '* At least one timezone is required' },
          { key: 'detailsTimeZones', message: '* At least one timezone is required' }
        ]
      : [];

  const errors = stringValidationErrors
    .concat(dateValidationErrors)
    .concat(timezonesValidationErrors);

  callback(null, errors);
};

const validateStringOptions = (stringOptionsErrorMessages, options, otherErrors = []) =>
  reduce((agg, message, optionName) => {
    const optionValue = get([optionName, 'value'], options);
    const isString = typeof optionValue === 'string';
    const isEmptyString = isString && isEmpty(optionValue);

    return !isString || isEmptyString
      ? agg.concat({
          key: optionName,
          message
        })
      : agg;
  }, otherErrors)(stringOptionsErrorMessages);

module.exports = { validateOptions };
