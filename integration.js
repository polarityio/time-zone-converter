'use strict';
const { createTimezonesFromOptions } = require('./src/lookup');
const _ = require('lodash/fp');
const { setLogger } = require('./src/logger');
const { validateOptions } = require('./src/validateOptions');

function doLookup(entities, options, cb) {
  let lookupResults = [];

  entities.forEach((entity) => {
    lookupResults.push({
      entity,
      data: {
        summary: createTimezonesFromOptions(entity, options, false),
        details: createTimezonesFromOptions(entity, options, true)
      }
    });
  });

  cb(null, lookupResults);
}

module.exports = {
  startup: setLogger,
  doLookup,
  validateOptions
};

/**
 * TODO: Option validation
 * require some detail OR Summary tag timezone
 */
