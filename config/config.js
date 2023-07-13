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
      regex: /(\d{4})(-\d{2}){2}T(\d{2}:){2}\d{2}(\.\d{2})?(Z?)([\+\-]{1}\d{2}:\d{2})?/
    },
    {
      key: 'UnixTimestamp',
      regex: /\b\d{10}(?!\w)/
    },
    {
      key: 'RFC-3339',
      regex: /(\d{4})(-\d{2}){2} (\d{2}:){2}\d{2}(\.\d{2})?(Z?)([\+\-]{1}\d{2}:\d{2})?/
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
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: ''
  },
  logging: {
    level: 'trace' //trace, debug, info, warn, error, fatal
  },
  options: [
    {
      key: 'dateFormatString',
      name: 'Date Format String',
      description:
        'The format string to use when displaying the date. See https://moment.github.io/luxon/#/formatting?id=table-of-tokens for more details.',
      default: 'yyyy-MM-dd HH:mm:ss ZZZZ',
      type: 'text',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'summaryTagTimeZones',
      name: 'Summary Tag Timezones',
      description: 'The timezones to display in the summary tag. (Default: EST)',
      default: [
        {
          value: 'America/New_York',
          display: 'Eastern Standard Time (EST)'
        }
      ],
      type: 'select',
      options: [
        { display: 'International Date Line West (IDLW)', value: 'Etc/GMT+12' },
        { display: 'Nome Time (NT)', value: 'America/Nome' },
        { display: 'Hawaii-Aleutian Standard Time (HST)', value: 'Pacific/Honolulu' },
        { display: 'Alaska Standard Time (AKST)', value: 'America/Anchorage' },
        { display: 'Pacific Standard Time (PST)', value: 'America/Los_Angeles' },
        { display: 'Mountain Standard Time (MST)', value: 'America/Denver' },
        { display: 'Central Standard Time (CST)', value: 'America/Chicago' },
        { display: 'Eastern Standard Time (EST)', value: 'America/New_York' },
        { display: 'Atlantic Standard Time (AST)', value: 'America/Halifax' },
        { display: 'Newfoundland Standard Time (NST)', value: 'America/St_Johns' },
        { display: 'Greenwich Mean Time (GMT)', value: 'Etc/GMT' },
        { display: 'Central European Time (CET)', value: 'Europe/Paris' },
        { display: 'Eastern European Time (EET)', value: 'Europe/Athens' },
        { display: 'Moscow Standard Time (MSK)', value: 'Europe/Moscow' },
        { display: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
        { display: 'Western Indonesian Time (WIB)', value: 'Asia/Jakarta' },
        { display: 'Hong Kong Time (HKT)', value: 'Asia/Hong_Kong' },
        { display: 'Japan Standard Time (JST)', value: 'Asia/Tokyo' },
        { display: 'Australian Eastern Standard Time (AEST)', value: 'Australia/Sydney' },
        { display: 'Australian Western Standard Time (AWST)', value: 'Australia/Perth' },
        { display: 'UTC (UTC)', value: 'UTC' }
      ],
      multiple: true,
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'detailsTimeZones',
      name: 'Details Time Zones',
      description: 'The timezones to display in the details section. (Default: ALL).',
      default: [
        { display: 'International Date Line West (IDLW)', value: 'Etc/GMT+12' },
        { display: 'Nome Time (NT)', value: 'America/Nome' },
        { display: 'Hawaii-Aleutian Standard Time (HST)', value: 'Pacific/Honolulu' },
        { display: 'Alaska Standard Time (AKST)', value: 'America/Anchorage' },
        { display: 'Pacific Standard Time (PST)', value: 'America/Los_Angeles' },
        { display: 'Mountain Standard Time (MST)', value: 'America/Denver' },
        { display: 'Central Standard Time (CST)', value: 'America/Chicago' },
        { display: 'Eastern Standard Time (EST)', value: 'America/New_York' },
        { display: 'Atlantic Standard Time (AST)', value: 'America/Halifax' },
        { display: 'Newfoundland Standard Time (NST)', value: 'America/St_Johns' },
        { display: 'Greenwich Mean Time (GMT)', value: 'Etc/GMT' },
        { display: 'Central European Time (CET)', value: 'Europe/Paris' },
        { display: 'Eastern European Time (EET)', value: 'Europe/Athens' },
        { display: 'Moscow Standard Time (MSK)', value: 'Europe/Moscow' },
        { display: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
        { display: 'Western Indonesian Time (WIB)', value: 'Asia/Jakarta' },
        { display: 'Hong Kong Time (HKT)', value: 'Asia/Hong_Kong' },
        { display: 'Japan Standard Time (JST)', value: 'Asia/Tokyo' },
        { display: 'Australian Eastern Standard Time (AEST)', value: 'Australia/Sydney' },
        { display: 'Australian Western Standard Time (AWST)', value: 'Australia/Perth' },
        { display: 'UTC (UTC)', value: 'UTC' }
      ],
      type: 'select',
      options: [
        { display: 'International Date Line West (IDLW)', value: 'Etc/GMT+12' },
        { display: 'Nome Time (NT)', value: 'America/Nome' },
        { display: 'Hawaii-Aleutian Standard Time (HST)', value: 'Pacific/Honolulu' },
        { display: 'Alaska Standard Time (AKST)', value: 'America/Anchorage' },
        { display: 'Pacific Standard Time (PST)', value: 'America/Los_Angeles' },
        { display: 'Mountain Standard Time (MST)', value: 'America/Denver' },
        { display: 'Central Standard Time (CST)', value: 'America/Chicago' },
        { display: 'Eastern Standard Time (EST)', value: 'America/New_York' },
        { display: 'Atlantic Standard Time (AST)', value: 'America/Halifax' },
        { display: 'Newfoundland Standard Time (NST)', value: 'America/St_Johns' },
        { display: 'Greenwich Mean Time (GMT)', value: 'Etc/GMT' },
        { display: 'Central European Time (CET)', value: 'Europe/Paris' },
        { display: 'Eastern European Time (EET)', value: 'Europe/Athens' },
        { display: 'Moscow Standard Time (MSK)', value: 'Europe/Moscow' },
        { display: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
        { display: 'Western Indonesian Time (WIB)', value: 'Asia/Jakarta' },
        { display: 'Hong Kong Time (HKT)', value: 'Asia/Hong_Kong' },
        { display: 'Japan Standard Time (JST)', value: 'Asia/Tokyo' },
        { display: 'Australian Eastern Standard Time (AEST)', value: 'Australia/Sydney' },
        { display: 'Australian Western Standard Time (AWST)', value: 'Australia/Perth' },
        { display: 'UTC (UTC)', value: 'UTC' }
      ],
      multiple: true,
      userCanEdit: true,
      adminOnly: false
    }
  ]
};
