import { ResolverContext } from '../../types';
import transform from '../../transform/category';
import split from 'lodash/split';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import { ICategory, ICategoryFlat, ICategoryResolvers, IQueryResolvers } from '../../types/graphql';
import { buildCategoriesTree, transformMagentoCategory } from './categoriesUtils';
import cache from '../../configs/cache';

const setCache = async (key,value, redisClient, ttl) => {
  await redisClient.set(key, JSON.stringify(value), { ttl });
}

const getCache = async (key, redisClient) => {
  const cachedData =  await redisClient.get(key);
  if(cachedData) {
    return JSON.parse(cachedData);
  }
}

const getCategory = async (source, { id }, { dataSources, storeCode }) => {
  const category = await dataSources.magento.category.findOne({ id, storeCode });

  const categoryPath = category?.path;
  if (categoryPath) {
    const sliceCatePath = split(categoryPath, '/');
    sliceCatePath.shift();
    sliceCatePath.shift();
    category.path = await Promise.all(
      map(sliceCatePath, async cateId => {
        const categoryDetail = await dataSources.magento.category.findOne({
          storeCode,
          id: cateId,
        });
        return transform.category(categoryDetail);
      }),
    );
  }
  return transform.category(category);
};

const Query: IQueryResolvers<ResolverContext> = {
  async category(_source, { id }, { dataSources, storeCode }): Promise<ICategory> {
    return getCategory(_source, { id }, { dataSources, storeCode });
  },
  async categories(_source, _, { dataSources, storeCode }): Promise<ICategoryFlat[]> {
    const { items = [] } = await dataSources.magento.category.find(storeCode);
    const transformedCategory = items.map(transformMagentoCategory);
    const orderedCategories = orderBy(transformedCategory, ['position'], ['asc']);

    return orderedCategories;
  },
  async categoriesTree(_source, _, { dataSources, storeCode, redisClient }): Promise<ICategoryFlat[]> {
    const cacheKey = cache.Categories.categoriesTree.key;
    const ttl = cache.Categories.categoriesTree.ttl;
    const cachedData = await getCache(cacheKey, redisClient);
    if(cachedData) {
      return cachedData;
    }
    const { items } = await dataSources.magento.category.find(storeCode);
    const transformedCategory = items.map(transformMagentoCategory);
    const orderedCategories = orderBy(transformedCategory, ['position'], ['asc']);
    const categoriesTree = buildCategoriesTree(orderedCategories);

    setCache(cacheKey,categoriesTree, redisClient, ttl);

    return categoriesTree;
  },
};


const Category: ICategoryResolvers = {
  async sub_category({ children }, _, { dataSources, storeCode }) {
    const { items: categoryFlat = [] } = await dataSources.magento.category.find(storeCode);

    if (!children) return [];

    const subcategoryIds = children.split(',');

    return categoryFlat
      ?.filter(({ entity_id }) => subcategoryIds.includes(entity_id))
      ?.map(item =>
        transform.category({
          ...item,
          id: item.entity_id,
        }),
      ) as any;
  },
};

export default {
  Query,
  Category,
};
