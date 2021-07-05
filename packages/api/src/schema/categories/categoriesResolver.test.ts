import CategoriesResolvers from './categoriesResolvers';
import cache from '../../configs/cache';
import { mockFindCategoriesTree } from './__mocks__/categories';
const mockDataSources = {
  category: {
    all: () => {
      return new Promise(resolve => resolve(true));
    },
    find: () => {
      return new Promise(resolve => resolve(true));
    },
    findOne: () => {
      return new Promise(resolve => resolve(true));
    },
  },
};

const mockRedisClient = {
  redisClient: {
    get: jest.fn().mockReturnValue(Promise.resolve(null)),
    set: jest.fn().mockReturnValue(Promise.resolve()),
  }
}

const dataSourcesCategory = {
  magento: {
    category: mockDataSources.category,
  },
};


describe('CategoriesResolver', () => {
  const queryCategory = CategoriesResolvers.Query.category as Function;
  const queryCategories = CategoriesResolvers.Query.categories as Function;
  const queryCategoriesTree = CategoriesResolvers.Query.categoriesTree as Function;
  const sub_category = CategoriesResolvers.Category.sub_category as Function;

  const _source = {};
  const id = 1;
  const dataSources = dataSourcesCategory;
  const storeCode = 'cds_th';
  const redisClient = mockRedisClient.redisClient;

  it('Query category', async () => {
    jest
      .spyOn(dataSources.magento.category, 'findOne')
      .mockReturnValue(Promise.resolve({ path: 'https://www.central.co.th/th/adidas' }));
    await queryCategory(_source, { id }, { dataSources, storeCode });
    expect(dataSources.magento.category.findOne).toBeCalledWith({ id, storeCode });
  });

  it('Query categories', async () => {
    jest.spyOn(dataSources.magento.category, 'find').mockReturnValue(Promise.resolve([]));
    await queryCategories(_source, null, { dataSources, storeCode });
    expect(dataSources.magento.category.find).toBeCalledWith(storeCode);
  });

  it('Query categoriesTree with cache has not been set yet', async () => {
    const cacheKey = cache.Categories.categoriesTree.key;
    const ttl = cache.Categories.categoriesTree.ttl;
    jest.spyOn(dataSources.magento.category, 'find').mockReturnValue(Promise.resolve({ items: [] }));
    const result = await queryCategoriesTree(_source, null, { dataSources, storeCode, redisClient });
    expect(dataSources.magento.category.find).toBeCalledWith(storeCode);
    expect(redisClient.get).toBeCalledWith(cacheKey);
    expect(redisClient.set).toBeCalledWith(cacheKey,'[]',{ttl:ttl});
    expect(result).toEqual([]);
  });

  it('Query categoriesTree with cache has been already set', async () => {
    const cacheKey = cache.Categories.categoriesTree.key;
    jest.spyOn(dataSources.magento.category, 'find').mockReturnValue(Promise.resolve({ items: [] }));
    jest.spyOn(redisClient, 'get').mockReturnValue(Promise.resolve(JSON.stringify(mockFindCategoriesTree)))
    const result = await queryCategoriesTree(_source, null, { dataSources, storeCode, redisClient });
    expect(dataSources.magento.category.find).toBeCalledWith(storeCode);
    expect(redisClient.get).toBeCalledWith(cacheKey);
    expect(result).toEqual(mockFindCategoriesTree);

  });

  it('Test sub_category', async () => {
    jest.spyOn(dataSources.magento.category, 'find').mockReturnValue(Promise.resolve({ items: [] }));
    await sub_category(_source, null, { dataSources, storeCode });
    expect(dataSources.magento.category.find).toBeCalledWith(storeCode);
  });

  it('Test sub_category with children param', async () => {
    jest.spyOn(dataSources.magento.category, 'find').mockReturnValue(Promise.resolve({ items: [{ entity_id: 'a' }] }));
    await sub_category({ children: 'a,b' }, null, { dataSources, storeCode });
    expect(dataSources.magento.category.find).toBeCalledWith(storeCode);
  });
});
