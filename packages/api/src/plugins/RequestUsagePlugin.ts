import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLRequestContextWillSendResponse } from 'apollo-server-types';
import { BaseContext } from '../types';
import config from '../configs/vars';

export default class RequestUsagePlugin implements ApolloServerPlugin {
  public requestDidStart(): GraphQLRequestListener | void {
    return {
      willSendResponse({ context, response, request }: GraphQLRequestContextWillSendResponse<BaseContext>) {
        if (context.requestUsageEnable) {
          const extensions = response.extensions || (response.extensions = Object.create(null));
          extensions.requestUsage = context.requestUsage;
        }
      },
    };
  }
}
