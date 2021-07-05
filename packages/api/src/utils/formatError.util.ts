import { GraphQLError } from 'graphql';
import config from '../configs/vars';

export default function (error: GraphQLError) {
  if (config.env !== 'production') {
    const e = error.originalError ?? error;
    const loggedError = new Error();
    loggedError.name = e.name;
    loggedError.message = e.message;
    loggedError.stack = e.stack;

    console.error(loggedError);
  }

  const validation = error?.extensions?.validation;
  const response = error?.extensions?.response;
  const options = error?.extensions?.options;
  const responseBody = response?.body;

  let message: string = responseBody?.message || error?.message || 'error';
  let parameters = responseBody?.parameters || {};
  if (Array.isArray(parameters)) {
    parameters = parameters.reduce((r, v, k) => ({ ...r, [k + 1]: v }), {});
  }
  Object.keys(parameters).forEach(value => {
    message = message.replace(new RegExp(`%${value}|"%${value}"`), parameters[value]);
  });

  return {
    message,
    ...(error?.extensions?.code
      ? {
          extensions: {
            code: error.extensions.code,
          },
        }
      : {}),
    ...(options ? { options: options } : {}),
    ...(validation ? { validation } : {}),
    ...(responseBody
      ? {
          response: {
            ...(typeof responseBody === 'string' ? { body: responseBody } : { body: { ...responseBody } }),
            status: response.status,
          },
        }
      : {}),
  };
}
