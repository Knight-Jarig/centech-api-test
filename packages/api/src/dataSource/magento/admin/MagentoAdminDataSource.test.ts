import { MagentoAdminDataSource } from './MagentoAdminDataSource';

class MagentoAdminDataSourceTest extends MagentoAdminDataSource {
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

describe('MagentoAdminDataSource', () => {
  const magentoAdmin = new MagentoAdminDataSourceTest();

  const params = {};

  it(`restoreShippingAssignment should run properly`, async () => {
    magentoAdmin.initialize({
      context: { token: '1' },
    });
    const cartId = '1';
    const path = `/V1/carts/${cartId}/restore-shipping-assignment`;
    const init = {
      headers: {
        Authorization: `Bearer ${magentoAdmin.context.token}`,
      },
    };
    jest.spyOn(magentoAdmin, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoAdmin.restoreShippingAssignment(cartId);
    expect(magentoAdmin.get).toBeCalledWith(path, params, init);
  });

  it(`requestAdminToken should run properly`, async () => {
    const username = 'username';
    const password = 'password';
    const path = `/V1/integration/admin/token`;
    jest.spyOn(magentoAdmin, 'post').mockReturnValue(Promise.resolve({}) as any);
    await magentoAdmin.requestAdminToken(username, password);
    expect(magentoAdmin.post).toBeCalledWith(path, { username, password });
  });
});
