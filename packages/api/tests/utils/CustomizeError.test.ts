import { CustomizeError } from '../../src/error/CustomizeError';

describe('Customize Error', () => {
  it('Should return the customize error ', () => {
    const t = () => {
      throw new CustomizeError('Customize error message', 'CUSTOM_ERROR_CODE', {
        body: {
          error: {
            code: 'CUSTOM_ERROR_CODE',
            description: 'This is the description of custom error',
            name: 'CUSTOM_ERROR_CODE',
          },
        },
        status: 400,
      });
    };
    expect(t).toThrow(CustomizeError);
  });

  it('Should return the customize error ', () => {
    const t = () => {
      throw new CustomizeError('Customize error message');
    };
    expect(t).toThrow(CustomizeError);
  });
});
