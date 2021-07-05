import ApolloResponseCachePlugin from 'apollo-server-plugin-response-cache';
import { parse, OperationDefinitionNode, FieldNode } from 'graphql';

const newrelic = global?.newrelic;

export default ApolloResponseCachePlugin({
  extraCacheKeyData: requestContext => requestContext?.request?.http?.headers?.get('store') || null,
  shouldReadFromCache: requestContext => {
    if (requestContext.context.requestUsageEnable) return false;
    try {
      const { operationName } = requestContext.request;
      const obj = requestContext.request.query ? parse(requestContext.request.query) : requestContext.document;

      const operationDefinition = obj.definitions[0] as OperationDefinitionNode;
      const selection = operationDefinition.selectionSet.selections[0] as FieldNode;
      const queryName = selection.name.value;
      const shouldRead = ['v2ProductSearch', 'v2ProductById', 'search', 'categoriesTree', 'v2ProductBySku'].includes(
        queryName,
      );

      if (newrelic && shouldRead) {
        newrelic.setTransactionName(operationName + ' CACHE' || 'Custom CACHE');
        newrelic.addCustomAttribute('graphql.query', queryName);
        newrelic.addCustomAttribute('graphql.variables', JSON.stringify(requestContext.request.variables));
      }
      return shouldRead;
    } catch (e) {
      return false;
    }
  },
});
