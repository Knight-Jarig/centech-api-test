export class TransformationError extends Error {
  constructor(errors) {
    const message = errors
      .flat()
      .map(err => {
        return `${err.target.constructor.name}: ${Object.values(err.constraints).join(', ')}`;
      })
      .join(', ');
    super(message);
    this.name = 'TransformationError';
  }
}
