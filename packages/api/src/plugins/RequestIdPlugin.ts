import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLRequestContextWillSendResponse } from 'apollo-server-types';
import { BaseContext } from '../types';

export default class RequestIdPlugin implements ApolloServerPlugin {
  public requestDidStart(): GraphQLRequestListener | void {
    return {
      willSendResponse({ context, response }: GraphQLRequestContextWillSendResponse<BaseContext>) {
        const { requestId } = context as BaseContext;
        response.http.headers.set('X-Request-Id', requestId);
      },
    };
  }
}
