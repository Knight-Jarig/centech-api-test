import { MagentoCustomerDataSource } from './MagentoCustomerDataSource';

class MagentoCustomerDataSourceTest extends MagentoCustomerDataSource {
  get() {
    return jest.fn() as any;
  }
  put() {
    return jest.fn() as any;
  }
}

describe('MagentoCustomerDataSource', () => {
  const magentoCustomer = new MagentoCustomerDataSourceTest();

  const params = null;
  const storeCode = 'cds_th';
  const init = { cacheOptions: { ttl: 0 } };

  it(`getCustomer should run properly`, async () => {
    const path = `${storeCode}/V1/customers/me`;
    jest.spyOn(magentoCustomer, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoCustomer.getCustomer(storeCode);
    expect(magentoCustomer.get).toBeCalledWith(path, params, init);
  });

  it(`getCustomer should run properly with mdcToken`, async () => {
    magentoCustomer.initialize({
      context: {
        customerToken: undefined,
      },
    });
    const mdcToken = '1234';
    const path = `${storeCode}/V1/customers/me`;
    jest.spyOn(magentoCustomer, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoCustomer.getCustomer(storeCode, mdcToken);
    expect(magentoCustomer.get).toBeCalledWith(path, params, init);
  });

  it(`update should run properly`, async () => {
    const path = `/V1/customers/me`;
    jest.spyOn(magentoCustomer, 'put').mockReturnValue(Promise.resolve({}) as any);
    await magentoCustomer.update(params);
    expect(magentoCustomer.put).toBeCalledWith(path, params);
  });

  it(`changePassword should run properly`, async () => {
    const input = {
      currentPassword: '1',
      newPassword: '2',
    };
    const path = `/V1/customers/me/password`;
    jest.spyOn(magentoCustomer, 'put').mockReturnValue(Promise.resolve({}) as any);
    await magentoCustomer.changePassword(input);
    expect(magentoCustomer.put).toBeCalledWith(path, input);
  });

  it(`willSendRequest should run properly`, async () => {
    magentoCustomer.initialize({
      context: {
        token: '1',
        client: 'cds',
      },
    });
    const request = {
      headers: {
        set: jest.fn((name, value) => (request.headers[name] = value)),
        has: jest.fn(),
      },
    };
    await magentoCustomer.willSendRequest(request);
    expect(request.headers.set).toBeCalled();
  });
});
