import { MagentoCmsBlockDataSource } from './MagentoCmsBlockDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';
class MagentoCmsBlockDataSourceTest extends MagentoCmsBlockDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoCmsBlockDataSource', () => {
  const magentoCmsBlock = new MagentoCmsBlockDataSourceTest();
  it(`should call findOne with expect params`, async () => {
    const id = 1;
    const params = null;
    const path = `V1/cmsBlock/${id}`;

    jest.spyOn(magentoCmsBlock, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoCmsBlock.findOne(id);
    expect(magentoCmsBlock.get).toBeCalledWith(path, params, {
      cacheOptions: { ttl: cache.CMSBlockAPI.findOne },
    });
  });

  it(`should call find with expect params`, async () => {
    const args = {
      page: 1,
      size: 1,
      filterGroups: [],
      sortOrders: [],
    };
    const params = null;
    const searchCriteria = searchCriteriaBuilder(args);
    const path = `V1/cmsBlock/search?${searchCriteria}`;

    jest.spyOn(magentoCmsBlock, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoCmsBlock.find(args);
    expect(magentoCmsBlock.get).toBeCalledWith(path, params, {
      cacheOptions: { ttl: cache.CMSBlockAPI.find },
    });
  });
});
