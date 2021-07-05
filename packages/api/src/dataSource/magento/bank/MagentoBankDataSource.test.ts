import { MagentoBankDataSource } from './MagentoBankDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';

class MagentoBankDataSourceTest extends MagentoBankDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoBankDataSource', () => {
  const magentoBank = new MagentoBankDataSourceTest();
  it(`should call find with expect params`, async () => {
    const args = {
      page: 1,
      size: 1,
      filterGroups: [],
      sortOrders: [],
    };
    const params = null;
    const searchCriteria = searchCriteriaBuilder(args);
    const path = `/V1/banks?${searchCriteria}`;

    jest.spyOn(magentoBank, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoBank.find(args);
    expect(magentoBank.get).toBeCalledWith(path, params, {
      cacheOptions: { ttl: 0 },
    });
  });
});
