import { MagentoFlashDealsDataSource } from './MagentoFlashDealsDataSource';
import cache from '../../../configs/cache';

class MagentoFlashDealsDataSourceTest extends MagentoFlashDealsDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoFlashDealsDataSource', () => {
  const MagentoFlashDeals = new MagentoFlashDealsDataSourceTest();
  it(`should call MagentoFlashDeals with expect params`, async () => {
    const path = `/V1/flash-deals/active-category/`;
    jest.spyOn(MagentoFlashDeals, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoFlashDeals.activeCategory();
    expect(MagentoFlashDeals.get).toBeCalledWith(path, null, {
      cacheOptions: { ttl: cache.FlashDealAPI.list },
    });
  });
});
