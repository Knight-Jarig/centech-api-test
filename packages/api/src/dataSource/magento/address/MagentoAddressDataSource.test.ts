import { MagentoAddressDataSource } from './MagentoAddressDataSource';
import { address } from './__mocks__/address';

class MagentoAddressDataSourceTest extends MagentoAddressDataSource {
  get = () => jest.fn() as any;
  post = () => jest.fn() as any;
  put = () => jest.fn() as any;
  delete = () => jest.fn() as any;
}

describe('MagentoAddressDataSource', () => {
  const magentoAddress = new MagentoAddressDataSourceTest();

  const params = { address };
  const init = {
    cacheOptions: { ttl: 0 },
  };

  it(`createMagentoAddress should run properly`, async () => {
    const path = `/V1/customers/addresses`;
    jest.spyOn(magentoAddress, 'post').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.createMagentoAddress(address);
    expect(magentoAddress.post).toBeCalledWith(path, params);
  });

  it(`updateMagentoAddress should run properly`, async () => {
    const path = `/V1/customers/addresses/${address.id}`;
    jest.spyOn(magentoAddress, 'put').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.updateMagentoAddress(address);
    expect(magentoAddress.put).toBeCalledWith(path, params);
  });

  it(`getMagentoAddress should run properly`, async () => {
    const addressId = address.id;
    const path = `/V1/customers/addresses/${addressId}`;
    const params = null;
    jest.spyOn(magentoAddress, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.getMagentoAddress(addressId);
    expect(magentoAddress.get).toBeCalledWith(path, params, init);
  });

  it(`deleteMagentoAddress should run properly`, async () => {
    const addressId = address.id;
    const path = `/V1/addresses/${addressId}`;
    jest.spyOn(magentoAddress, 'delete').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.deleteMagentoAddress(addressId);
    expect(magentoAddress.delete).toBeCalledWith(path);
  });
});
