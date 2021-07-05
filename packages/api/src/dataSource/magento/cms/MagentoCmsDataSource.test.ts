import { MagentoCmsDataSource } from './MagentoCmsDataSource';
import cache from '../../../configs/cache';

class MagentoCmsDataSourceTest extends MagentoCmsDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
}

describe('MagentoCmsDataSource', () => {
  const magentoCms = new MagentoCmsDataSourceTest();

  describe(`cms page`, () => {
    const storeCode = 'cds_th';
    const id = 1;

    it(`should call cmsPage with expect params`, async () => {
      const path = `${storeCode}/V1/cmsPage/${id}`;

      jest.spyOn(magentoCms, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoCms.getCmsPage(id, storeCode);
      expect(magentoCms.get).toBeCalledWith(path, null, {
        cacheOptions: { ttl: cache.CMSAPI.getCmsPage },
      });
    });
  });
});
