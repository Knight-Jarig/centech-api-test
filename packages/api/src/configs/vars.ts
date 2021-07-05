import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  appEnv: process.env.APP_ENV,
  port: +process.env.PORT || 4000,
  bu: `${process.env.BU}`.toLowerCase(),
  debugRequest: process.env.DEBUG_REQUEST,
  requestLog: process.env.REQUEST_LOG,
  redisUrl: process.env.REDIS_URL,
  redisUrlReadWrite: process.env.REDIS_URL_READ_WRITE,
  redisUrlReadOnly: process.env.REDIS_URL_READ_ONLY,
  useRedisCluster: process.env.USE_REDIS_CLUSTER || 0,
  redisClusterUrl: process.env.REDIS_CLUSTER_URL || '',
  newrelic: {
    apolloPluginDisable: +process.env.NEW_RELIC_APOLLO_PLUGIN_DISABLE || 0,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
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
    recommendation_url: process.env.DATALAKE_RECOMMENDATION_URL,
    recommendation_token: process.env.DATALAKE_RECOMMENDATION_TOKEN,
    app_recommendation_url: process.env.DATALAKE_APP_RECOMMENDATION_URL,
    app_recommendation_token: process.env.DATALAKE_APP_RECOMMENDATION_TOKEN,
  },
  prime: {
    base_url: process.env.PRIME_BASE_URL,
    token: process.env.PRIME_TOKEN,
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
  consentService: {
    base_url: process.env.CONSENT_SERVICE_BASE_URL,
    api_key: process.env.CONSENT_SERVICE_API_KEY,
    channel: process.env.CONSENT_SERVICE_CHANNEL,
  },
  introspection: !['production', 'uat', 'lte'].includes(`${process.env.APP_ENV}`.toLowerCase()),
  requestUsageToken: process.env.REQUEST_USAGE_TOKEN || process.env.MAGENTO_TOKEN,
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE) || 200,
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  camp: {
    base_url: process.env.CAMP_BASE_URL,
    host: process.env.CAMP_HOST,
    accessKey: process.env.CAMP_AWS_ACCESS_KEY,
    secretKey: process.env.CAMP_AWS_SECRET_KEY,
    region: process.env.CAMP_AWS_REGION,
    service: process.env.CAMP_AWS_SERVICE,
    apiKey: process.env.CAMP_API_KEY,
  },
  elasticSearch: {
    base_url: process.env.ELASTIC_SEARCH_URL,
  },
  t1Passport: {
    base_url: process.env.T1PASSPORT_URL,
    member_service: process.env.T1PASSPORT_MEMBER_SERVICE,
    auth_service: process.env.T1PASSPORT_AUTH_SERVICE,
    host: process.env.T1PASSPORT_HOST,
    accessKey: process.env.T1PASSPORT_AWS_ACCESS_KEY,
    secretKey: process.env.T1PASSPORT_AWS_SECRET_KEY,
    region: process.env.T1PASSPORT_AWS_REGION,
    service: process.env.T1PASSPORT_AWS_SERVICE,
    apiKey: process.env.T1PASSPORT_TOKEN,
    aws_params_path: process.env.T1PASSPORT_AWS_PARAMS_PATH,
  },
  timoutLimit: +process.env.REQUEST_TIMEOUT_LIMIT || 0,
  redlock: {
    disable: +process.env.REDLOCK_DISABLE,
    config: {
      driftFactor: +process.env.REDLOCK_DRIFT_FACTOR ?? 0.01,
      retryCount: +process.env.REDLOCK_RETRY_COUNT ?? -1,
      retryDelay: +process.env.REDLOCK_RETRY_DELAY ?? 200,
      retryJitter: +process.env.REDLOCK_RETRY_JITTER ?? 200,
    },
    catalogServiceLockTTL: +process.env.REDLOCK_CATALOG_SERVICE || 60000,
  },
  responseCachePluginDisable: +process.env.RESPONSE_CACHE_PLUGIN_DISABLE,
  similarDisable: +process.env.SIMILAR_DISABLE,
  t1Redeem: {
    noVerifyPointLimit: +process.env.T1REDEEM_NO_VERIFY_POINT_LIMIT || 4000,
  },
  instagram: {
    base_url: process.env.IG_URL,
    aws_params_path: process.env.IG_AWS_PARAMS_PATH,
    token: process.env.IG_TOKEN_LOCAL || '',
  },
};
