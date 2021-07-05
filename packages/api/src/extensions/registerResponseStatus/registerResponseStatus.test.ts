import { resolver } from './index';

describe('cartWithParent', () => {
  const registerError = resolver.Register.error as Function;

  it('register error should run properly', async () => {
    const data = null;
    const message = '';
    const result = await registerError({ data, message });
    expect(result).toEqual({ message: '' });
  });

  it('register error should run properly with data', async () => {
    const data = 1;
    const message = '';
    const result = await registerError({ data, message });
    expect(result).toEqual(null);
  });
});
