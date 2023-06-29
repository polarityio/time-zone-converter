'use strict';

const _ = require('lodash/fp');

function doLookup(entities, options, cb) {
  let lookupResults = [];

  entities.forEach((entityObj) => {
    lookupResults.push({
      entity: entityObj,
      data: {
        summary: [`Time: ${entityObj.value}`],
        details: {
          time: entityObj.value,
          types: entityObj.types
        }
      }
    });
  });

  cb(null, lookupResults);
}

module.exports = {
  doLookup: doLookup
};
