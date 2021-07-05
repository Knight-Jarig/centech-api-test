import { ApolloError } from 'apollo-server';

export class ApplicationError extends Error {
  public name = 'ApplicationError';
  public response: any;
  public options: any;

  constructor(message: string, options = null) {
    super(message);
    if (options) {
      this.options = options;
    }
  }

  static create(e: ApolloError, options = null): ApplicationError {
    const error = new ApplicationError(e.message);
    if (e?.extensions?.response) {
      error.response = e.extensions.response;
    }

    if(options){
      error.options = options;
    }

    return error;
  }

  // Apollo Helper
  private get extensions() {
    return { response: this.response, options: this.options };
  }
}
