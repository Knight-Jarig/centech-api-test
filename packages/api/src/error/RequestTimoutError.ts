import { ApolloError } from 'apollo-server';

export class RequestTimoutError extends ApolloError {
  public name = 'RequestTimoutError';
}
