import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLRequestContextDidEncounterErrors, GraphQLRequestContextExecutionDidStart } from 'apollo-server-types';
import { BaseContext } from '../types';

export default class NewrelicPlugin implements ApolloServerPlugin {
  newrelic: any;

  constructor(newrelic) {
    this.newrelic = newrelic;
  }

  public requestDidStart(): GraphQLRequestListener | void {
    return {
      executionDidStart: ({ request }: GraphQLRequestContextExecutionDidStart<BaseContext>) => {
        this.newrelic.setTransactionName(request.operationName || 'Custom');
        this.newrelic.addCustomAttribute('graphql.query', request.query);
        this.newrelic.addCustomAttribute(
          'graphql.variables',
          JSON.stringify(request.variables, (key, value) => {
            const filterFields = ['email', 'password', 'newPassword', 'encrypted_card_data'];
            if (filterFields.indexOf(key) >= 0) {
              return undefined;
            }
            return value;
          }),
        );
      },
      didEncounterErrors: ({ errors }: GraphQLRequestContextDidEncounterErrors<BaseContext>) => {
        errors.forEach(error => {
          if (error?.originalError?.name === 'ApplicationError') return;
          this.newrelic.noticeError(error);
        });
      },
    };
  }
}
