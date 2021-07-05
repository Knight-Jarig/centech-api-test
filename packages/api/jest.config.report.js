require('dotenv').config();
const jestConfig = require('./jest.config');
const { version } = require('./package.json');
const isReport = process.env.RP_TOKEN && process.env.RP_ENDPOINT;
const reporters = isReport
  ? [
      'default',
      [
        '@reportportal/agent-js-jest',
        {
          token: process.env.RP_TOKEN,
          endpoint: process.env.RP_ENDPOINT,
          project: 'core-api',
          launch: 'CORE-API', // Can override with `RP_LAUNCH` in env
          attributes: [
            {
              key: 'Version',
              value: version,
            },
          ],
        },
      ],
    ]
  : null;

module.exports = {
  ...jestConfig,
  reporters,
};
