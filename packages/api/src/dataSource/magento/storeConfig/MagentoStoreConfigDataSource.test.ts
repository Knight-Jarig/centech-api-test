import { MagentoStoreConfigDataSource } from './MagentoStoreConfigDataSource';

class MagentoStoreConfigDataSourceTest extends MagentoStoreConfigDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoStoreConfigDataSource', () => {
  const magentoStoreConfig = new MagentoStoreConfigDataSourceTest();

  it(`should call find with expect params`, async () => {
    jest.spyOn(magentoStoreConfig, 'get').mockReturnValue(Promise.resolve([]) as any);

    await magentoStoreConfig.find();
    expect(magentoStoreConfig.get).toBeCalled();
  });

  it(`should call findOne with expect params`, async () => {
    jest.spyOn(magentoStoreConfig, 'find').mockReturnValue(Promise.resolve([]) as any);

    await magentoStoreConfig.findOne('cds_th');
    expect(magentoStoreConfig.get).toBeCalled();
  });
});
