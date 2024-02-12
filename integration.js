'use strict';
const { createTimezonesFromOptions } = require('./src/lookup');
const { getLogger, setLogger } = require('./src/logger');
const { validateOptions } = require('./src/validateOptions');

function doLookup(entities, options, cb) {
  getLogger().trace({entities}, 'doLookup');
  let lookupResults = [];

  entities.forEach((entity) => {
    const data = createTimezonesFromOptions(entity, options);

    if (data) {
      lookupResults.push({
        entity,
        data
      });
    }
  });

  cb(null, lookupResults);
}

module.exports = {
  startup: setLogger,
  doLookup,
  validateOptions
};
