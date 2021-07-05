import { encrypt } from '../../src/utils/crypto.utils';

const mockSecret = '123456';

describe('encrypt', () => {
  it(`should return sha1`, async () => {
    const encryptText = encrypt('PWD120010000', mockSecret);
    expect(encryptText).toEqual('cb2008f061933ccd0ad006699ead21f89b54a559');
  });
});
