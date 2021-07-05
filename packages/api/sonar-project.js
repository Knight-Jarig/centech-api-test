const { version } = require('./package.json');
const scanner = require('sonarqube-scanner');

const BITBUCKET_BRANCH = process.env.BITBUCKET_BRANCH;
const BITBUCKET_PR_ID = process.env.BITBUCKET_PR_ID;
const BITBUCKET_PR_DESTINATION_BRANCH = process.env.BITBUCKET_PR_DESTINATION_BRANCH;

const isPR = !!BITBUCKET_PR_ID;

scanner(
  {
    serverUrl: 'https://sonarqube.central.tech',
    token: '98a40e136b0e34ca4bd1b9bc7e63fdfbb510b36c',
    options: {
      'sonar.projectKey': 'centech-api',
      'sonar.projectName': 'centech-api',
      'sonar.projectVersion': `${version}`,

      'sonar.sources': 'src',
      'sonar.exclusions': 'src/**/*.test.ts,src/extensions/schemaV2/**/__mocks__/*,src/configs/**',
      'sonar.cpd.exclusions': 'src/**/__mocks__/*,src/extensions/schemaV2/**/__mocks__/*,src/configs/**',
      'sonar.test.inclusions': 'src/**/*.test.ts',
      'sonar.coverage.exclusions':
        'src/**/__mocks__/*,src/**/*.test.ts,coverage/lcov-report/*,src/extensions/schemaV2/**/__mocks__/*,src/configs/**',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      ...(isPR
        ? {
            'sonar.pullrequest.key': BITBUCKET_PR_ID,
            'sonar.pullrequest.branch': BITBUCKET_BRANCH,
            'sonar.pullrequest.base': BITBUCKET_PR_DESTINATION_BRANCH,
          }
        : {}),
    },
  },
  () => process.exit(),
);
