module.exports = {
  name: 'Time Zone Converter',
  acronym: 'TZONE',
  defaultColor: 'light-gray',
  description: 'Converts timestamps into any Time Zone',
  customTypes: [
    {
      key: 'ISO-Timezone',
      regex: /\d{4}-\d{2}-\d{2}\sT\s\d{2}:\d{2}\s*[A-Z]{3,4}/
    },
    {
      key: 'ISO-8601',
      regex: /(\d{4})(-\d{2}){2}T(\d{2}:){2}\d{2}(Z?)/
    },
    {
      key: 'UnixTimestamp',
      regex: /\b\d{10}(?!\w)/
    },
    {
      key: 'RFC-3339',
      regex: /(\d{4})(-\d{2}){2} (\d{2}:){2}\d{2}(Z?)/
    },
    {
      key: 'WaybackMachineMementoTimestamp',
      regex: /\d{14}\[a]/
    },
    {
      key: 'NanosecondsSinceBoot',
      regex: /\d+(?:[ ][n][s])/
    }
  ],
  styles: ['./styles/styles.less'],
  block: {
    component: {
      file: './components/block.js'
    },
    template: {
      file: './templates/block.hbs'
    }
  },
  summary: {
    component: {
      file: './components/summary.js'
    },
    template: {
      file: './templates/summary.hbs'
    }
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: ""
  },
  logging: {
    level: 'trace' //trace, debug, info, warn, error, fatal
  },
  options: [
    {
      key: 'showSummaryInLocalTimezone',
      name: 'Show Time in Your Local Timezone',
      description:
        'If checked, the integration will display the time in your local timezone as a summary tag.  The default is to display the time in UTC',
      default: false,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    }
  ]
};
