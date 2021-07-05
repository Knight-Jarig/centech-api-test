import { MagentoPromotionDataSource } from './MagentoPromotionDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';
class MagentoPromotionDataSourceTest extends MagentoPromotionDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoNewsletterDataSource', () => {
  const MagentoPromotion = new MagentoPromotionDataSourceTest();
  it(`should call MagentoFlashDeals with expect params`, async () => {
    const filter = {
      page: 1,
      size: 1,
      filterGroups: [],
      sortOrders: [],
    };
    const searchCriteria = searchCriteriaBuilder(filter);
    const path = `/V1/promotion-suggestion/product?${searchCriteria}`;
    jest.spyOn(MagentoPromotion, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoPromotion.suggestion(filter);
    expect(MagentoPromotion.get).toBeCalledWith(path, null, {
      cacheOptions: { ttl: cache.PromotionAPI.suggestion },
    });
  });
});
