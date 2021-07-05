import * as Sentry from '@sentry/node';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { BaseContext } from '../types';
import { GraphQLRequestContextDidEncounterErrors, GraphQLRequestContextDidResolveOperation } from 'apollo-server-types';

class CustomError extends Error {
  constructor(error, name?, message?) {
    super(error.message);
    this.name = name || error.name || this.constructor.name;
    this.message = message || error.message;
    this.stack = error.stack;
  }
}

export default class SentryPlugin implements ApolloServerPlugin {
  public requestDidStart(): GraphQLRequestListener | void {
    return {
      didEncounterErrors: ({ errors, context }: GraphQLRequestContextDidEncounterErrors<BaseContext>) => {
        Sentry.withScope(scope => {
          scope.setExtra('referer', context.referer);
          scope.setExtra('storeCode', context.storeCode);
          scope.setTag('request_id', context.requestId);
          let errorMessage = '';

          if (context?.requestUsage) {
            const requestUsage = context.requestUsage.map(reqUsed => ({
              ...reqUsed,
              request: {
                ...reqUsed.request,
                body: reqUsed.request.body || null,
                headers: reqUsed.request.headers || null,
              },
              ttl: reqUsed.ttl ?? null,
            }));
            requestUsage.forEach((item, key) => {
              const itemResponse = {
                ...item.response,
                ...(item.response?.data ? { data: JSON.stringify(item.response.data) } : {}),
              };

              scope.setExtra(`requestUsage[${key}][request]`, item.request);
              scope.setExtra(`requestUsage[${key}][response]`, itemResponse);
              scope.setExtra(`requestUsage[${key}][ttl]`, item.ttl);

              errorMessage = errorMessage || (item.response?.data as any)?.message;
            });
          }

          errors.forEach(error => {
            if (error?.originalError?.name === 'ApplicationError') return;
            if (error.path || error.name !== 'GraphQLError') {
              const fingerprint = error?.extensions?.fingerprint;
              const errorName = error?.path?.[0] || error?.name;
              const errorData = new CustomError(error, `[${errorName}] ${error.message}`, errorMessage);
              const errorPath = String(error?.path?.map(path => (typeof path === 'number' ? '[]' : path)) || []);

              scope.setExtras({
                path: error.path,
              });
              scope.setFingerprint(['{{ default }}', errorPath, ...(fingerprint ? [fingerprint] : [])]);
              Sentry.captureException(errorData);
            } else {
              scope.setExtras({});
              Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
            }
          });
        });
      },
      didResolveOperation: (requestContext: GraphQLRequestContextDidResolveOperation<BaseContext>) => {
        const operationName = requestContext.operationName || 'Custom';
        const transaction = Sentry.getCurrentHub().getScope().getTransaction();
        transaction.setName(operationName);

        Sentry.configureScope(scope => {
          scope.setSpan(transaction);
        });
      },
    };
  }
}
