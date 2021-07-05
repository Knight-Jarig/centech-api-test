import { MagentoBannerDataSource } from './MagentoBannerDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';
import { IConditionType } from '../../../types/graphql';

class MagentoBannerDataSourceTest extends MagentoBannerDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
}

describe('MagentoBannerDataSource', () => {
  const magentoBanner = new MagentoBannerDataSourceTest();

  describe(`find banner`, () => {
    it(`should call banner find with expect params`, async () => {
      const params = {
        filterGroups: [
          { filters: [{ field: 'name', value: 'homepage_hero_banner', conditionType: IConditionType.Eq }] },
          { filters: [{ field: 'status', value: '1', conditionType: IConditionType.Eq }] },
        ],
      };
      const searchCriteria = searchCriteriaBuilder(params);
      const path = `/V1/banners?${searchCriteria}`;

      jest.spyOn(magentoBanner, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoBanner.find(params);
      expect(magentoBanner.get).toBeCalledWith(path, null, {
        cacheOptions: { ttl: cache.BannerAPI.find },
      });
    });
  });
});
