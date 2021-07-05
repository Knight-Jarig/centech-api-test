import { MagentoAuthDataSource } from './MagentoAuthDataSource';

class MagentoAuthDataSourceTest extends MagentoAuthDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
  put() {
    return jest.fn() as any;
  }
}

describe('MagentoAuthDataSource', () => {
  const magentoAuth = new MagentoAuthDataSourceTest();
  const storeCode = 'cds_th';
  it(`should call getCustomerToken with expect params`, async () => {
    const path = '/V1/integration/customer/token';

    jest.spyOn(magentoAuth, 'post').mockReturnValue(Promise.resolve({}) as any);
    const params = {
      username: 'tester',
      password: 'testerpass',
    };
    await magentoAuth.getCustomerToken(params);
    expect(magentoAuth.post).toBeCalledWith(path, params);
  });

  it(`should call register with expect params`, async () => {
    const path = `/${storeCode}/V1/customers`;

    jest.spyOn(magentoAuth, 'post').mockReturnValue(Promise.resolve({}) as any);
    const params = {
      storeCode: storeCode,
      customer: {
        firstName: 'test',
        lastName: 'test',
      },
    };
    await magentoAuth.register(params);
    expect(magentoAuth.post).toBeCalledWith(path, params.customer);
  });

  it(`should call lazyRegister with expect params`, async () => {
    const path = `/V1/checkout/lazy-register`;

    jest.spyOn(magentoAuth, 'post').mockReturnValue(Promise.resolve({}) as any);
    const params = {};
    await magentoAuth.lazyRegister(params);
    expect(magentoAuth.post).toBeCalledWith(path, params);
  });

  it(`should call facebookLogin with expect params`, async () => {
    const path = `/V1/integration/customer/social_token`;

    jest.spyOn(magentoAuth, 'post').mockReturnValue(Promise.resolve({}) as any);
    const params = {
      social_id: '1',
      social_type: 'facebook',
    };
    await magentoAuth.facebookLogin(params);
    expect(magentoAuth.post).toBeCalledWith(path, params);
  });

  it(`should call socialLogin with expect params`, async () => {
    const path = `/V1/integration/customer/social_token`;

    jest.spyOn(magentoAuth, 'post').mockReturnValue(Promise.resolve({}) as any);
    const params = {
      social_id: '1',
      social_type: 'facebook',
    };
    await magentoAuth.socialLogin(params);
    expect(magentoAuth.post).toBeCalledWith(path, params);
  });

  it(`should call forgotPassword with expect params`, async () => {
    const path = `/${storeCode}/V1/customers/password`;

    jest.spyOn(magentoAuth, 'put').mockReturnValue(Promise.resolve({}) as any);
    const params = {
      email: 'test@example.com',
      storeCode: storeCode,
    };
    const expectParams = {
      email: 'test@example.com',
      template: 'email_reset',
    };
    await magentoAuth.forgotPassword(params);
    expect(magentoAuth.put).toBeCalledWith(path, expectParams);
  });

  it(`should call resetPassword with expect params`, async () => {
    const path = `/V1/customers/resetPassword`;

    jest.spyOn(magentoAuth, 'post').mockReturnValue(Promise.resolve({}) as any);
    const params = {
      email: 'test@example.com',
      newPassword: '222222',
      resetToken: 'resetTokennn',
    };
    await magentoAuth.resetPassword(params);
    expect(magentoAuth.post).toBeCalledWith(path, params);
  });
});
