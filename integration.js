'use strict';
const createDetails = require('./src/createDetails');
const _ = require('lodash/fp');
const { setLogger } = require('./src/logger');

function doLookup(entities, options, cb) {
  let lookupResults = [];

  entities.forEach((entity) => {
    lookupResults.push({
      entity,
      data: {
        summary: [''],
        details: createDetails(entity, options)
      }
    });
  });

  cb(null, lookupResults);
}

module.exports = {
  startup: setLogger,
  doLookup: doLookup
};
