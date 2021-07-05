import 'reflect-metadata';
import 'graphql-import-node';

import config from './configs/vars';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { createServer } from './index';
import { version } from './configs/version';
import morgan from 'morgan';
import helmet from 'helmet';

(async () => {
  const app = express();
  app.use(helmet.hidePoweredBy());

  if (config.requestLog) {
    app.use(morgan('common'));
  }

  if (config.sentry.dsn && config.sentry.project) {
    const sentryRelease = `${config.sentry.project}@${version}`;
    console.log('----- SentryInit -----');
    console.log(`dsn: ${config.sentry.dsn}`);
    console.log(`sentryRelease: ${sentryRelease}`);
    console.log('----------------------');
    Sentry.init({
      debug: config.appEnv === 'development',
      ignoreErrors: ['Non-Error exception captured', 'PersistedQueryNotFound'],
      dsn: config.sentry.dsn,
      serverName: config.bu,
      environment: config.appEnv,
      release: sentryRelease,
      beforeBreadcrumb(breadcrumb, hint) {
        // IGNORE newrelic request
        if (breadcrumb.type === 'http') {
          const url: string = breadcrumb.data?.url;
          const whitelistUrls = [
            config.magento.base_url,
            config.cms.base_url,
            config.catalogService.base_url,
            config.consentService.base_url,
          ].filter(item => item !== '');
          if (!whitelistUrls.some(whitelistUrl => url.includes(whitelistUrl))) {
            return null;
          }
        }
        return breadcrumb;
      },
      integrations: [new Sentry.Integrations.Http(), new Tracing.Integrations.Express({ app })],
      tracesSampleRate: config.appEnv !== 'production' ? 1.0 : 0.1,
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
  }

  app.use((req, res, next) => {
    res.set('X-Api-Version', version);
    next();
  });

  app.use(bodyParser.json({ limit: '10mb' }));

  app.use(compression());
  const server = await createServer();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: true,
      exposedHeaders: ['x-api-version'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'x-product-attr-option',
        'x-product-attr',
        'store',
        'client',
        'bu',
        'x-operation-version',
        'x-react-hooks-version',
        'x-intent-alias',
        'x-request-id',
        'device-id',
        'app-version',
        'os',
        'os-version',
        'track-sku',
        'x-force-request-usage-token',
        'x-force-request-usage-enable',
        'x-force-request-usage-response-enable',
        'cache-control',
        'x-force-debug-cs-response',
      ],
    },
  });

  app.get('/', (req, res) => {
    res.send('GET request');
  });

  app.get('/version', (req, res) => {
    res.json({ version });
  });

  app.use(Sentry.Handlers.errorHandler());

  const port = config.port;

  const expressServer = app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
  );

  expressServer.keepAliveTimeout = 61 * 2 * 1000; // ~2 min
  expressServer.headersTimeout = 65 * 2 * 1000; // ~2 min
})();
