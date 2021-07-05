import { MagentoBrandDataSource } from './MagentoBrandDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';
import { IConditionType } from '../../../types/graphql';

class MagentoBrandDataSourceTest extends MagentoBrandDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
}

describe('MagentoBrandDataSource', () => {
  const magentoBrand = new MagentoBrandDataSourceTest();
  const storeCode = 'cds_th';

  describe(`find brands`, () => {
    it(`should call brand find with expect params`, async () => {
      const params = {
        filterGroups: [],
        page: 1,
        size: 20,
        sortOrders: [],
      };
      const searchCriteria = searchCriteriaBuilder(params);
      const path = `${storeCode}/V1/brands?${searchCriteria}`;

      jest.spyOn(magentoBrand, 'get').mockReturnValue(Promise.resolve({}) as any);
      const findParams = {
        ...params,
        storeCode,
      };
      await magentoBrand.find(findParams);
      expect(magentoBrand.get).toBeCalledWith(path, null, {
        cacheOptions: { ttl: 0 },
      });
    });

    it(`should call brand findOne with expect params`, async () => {
      const brandId = '1';
      const path = `${storeCode}/V1/brands/${brandId}`;

      jest.spyOn(magentoBrand, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoBrand.findOne({ storeCode, brandId });
      expect(magentoBrand.get).toBeCalledWith(path, null, {
        cacheOptions: { ttl: 0 },
      });
    });
  });
});
