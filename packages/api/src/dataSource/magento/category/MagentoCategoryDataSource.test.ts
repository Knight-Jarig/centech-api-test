import { MagentoCategoryDataSource } from './MagentoCategoryDataSource';
import cache from '../../../configs/cache';

class MagentoCategoryDataSourceTest extends MagentoCategoryDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoCategoryDataSource', () => {
  const magentoCategory = new MagentoCategoryDataSourceTest();

  describe(`category page`, () => {
    const storeCode = 'cds_th';

    it(`should run MagentoCategoryDataSource which call get function with expect params`, async () => {
      const path = `${storeCode}/V1/categories`;
      const params = null;
      const init = {
        cacheOptions: { ttl: cache.CategoryAPI.all },
      };

      jest.spyOn(magentoCategory, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoCategory.all(storeCode);
      expect(magentoCategory.get).toBeCalledWith(path, params, init);
    });

    it(`should run MagentoCategoryDataSource which call find function with expect params`, async () => {
      const path = `${storeCode}/V1/category/flat`;
      const params = null;
      const init = {
        cacheOptions: { ttl: cache.CategoryAPI.all },
      };

      jest.spyOn(magentoCategory, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoCategory.find(storeCode);
      expect(magentoCategory.get).toBeCalledWith(path, params, init);
    });

    it(`should run MagentoCategoryDataSource which call findOne function with expect params`, async () => {
      const id = 1;
      const path = `${storeCode}/V1/categories/${id}`;
      const params = null;
      const init = {
        cacheOptions: { ttl: cache.CategoryAPI.all },
      };

      jest.spyOn(magentoCategory, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoCategory.findOne({ id, storeCode });
      expect(magentoCategory.get).toBeCalledWith(path, params, init);
    });
  });
});
