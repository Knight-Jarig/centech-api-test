export class CustomizeError extends Error {
  public name = 'CustomizeError';
  public response: any;
  public code: any;
  public options: any;

  constructor(message: string, code = '', options = null) {
    super(message);
    this.options = options;
    this.code = code;
  }

  // Apollo Helper
  private get extensions() {
    return { code: this.code, response: this.options };
  }
}
