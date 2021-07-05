require('dotenv').config();

export default {
  env: process.env.NODE_ENV,
  appEnv: 'test',
  port: 4000,
  bu: 'cds',
  debugRequest: process.env.DEBUG_REQUEST,
  requestLog: process.env.REQUEST_LOG,
  redisUrl: process.env.REDIS_URL,
  jwt: {
    secret: 'JWT_SECRET',
    expire: process.env.JWT_EXPIRATION_MINUTES,
  },
  magento: {
    base_url: process.env.MAGENTO_BASE_URL,
    token: process.env.MAGENTO_TOKEN,
    secret: process.env.MAGENTO_ORDER_SECRET,
  },
  dataLake: {
    base_url: process.env.DATALAKE_URL,
    token: process.env.DATALAKE_TOKEN,
  },
  google: {
    key: process.env.GOOGLE_API_KEY,
  },
  cms: {
    base_url: process.env.CMS_URL,
  },
  extension: {
    base_url: process.env.EXTENSION_URL,
    requestUsage: process.env.REQUEST_USAGE_EXTENSION,
  },
  catalogService: {
    base_url: process.env.CATALOG_SERVICE_BASE_URL,
    base_url_alternate: process.env.CATALOG_SERVICE_BASE_URL_ALTERNATE,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    project: process.env.SENTRY_PROJECT,
  },
  prime: {
    base_url: 'MOCK',
    token: 'MOCK_TOKEN',
  },
  consentService: {
    base_url: process.env.CONSENT_SERVICE_BASE_URL,
    api_key: process.env.CONSENT_SERVICE_API_KEY,
    channel: process.env.CONSENT_SERVICE_CHANNEL,
  },
  requestUsageToken: 'TOKEN_TEST',
  firebase: {
    apiKey: 'MOCK_FIREBASE_API_KEY',
    authDomain: 'MOCK_FIREBASE_AUTH_DOMAIN',
    projectId: 'MOCK_FIREBASE_PROJECT_ID',
  },
  camp: {
    base_url: process.env.CAMP_BASE_URL,
    host: process.env.CAMP_HOST,
    access_key: process.env.CAMP_AWS_ACCESS_KEY,
    secret_key: process.env.CAMP_AWS_SECRET_KEY,
    region: 'region',
    service: 'service',
    apiKey: process.env.CAMP_API_KEY,
  },
  elasticSearch: {
    base_url: process.env.ELASTIC_SEARCH_URL,
  },
  t1Passport: {
    base_url: process.env.T1PASSPORT_URL,
    aws_params_path: '/falcon/cds/nonprod/t1/',
  },
  timoutLimit: +process.env.REQUEST_TIMEOUT_LIMIT || 0,
  t1Redeem: {
    noVerifyPointLimit: +process.env.T1REDEEM_NO_VERIFY_POINT_LIMIT || 4000,
  },
  instagram: {
    base_url: process.env.IG_URL,
    aws_params_path: process.env.IG_AWS_PARAMS_PATH,
    token: 'token'
  }
};
