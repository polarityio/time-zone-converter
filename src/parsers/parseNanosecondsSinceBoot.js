const parseNanosecondsSinceBoot = (value) => {
  const nanoseconds = value.match(/(\d+)\s?ns/)[1];

  return {
    time: nanoseconds,
    timezone: 'NA'
  };
};

module.exports = { parseNanosecondsSinceBoot };
