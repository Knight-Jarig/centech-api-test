import { ResolverContext } from '../../types';
import StoreModel from '../../transform/store.model';
import get from 'lodash/get';
import { explode } from '../../utils/attribute.utils';
import { IConditionType, IQueryResolvers, IStore, IStoreCustomAttribute, IStoreResolvers } from '../../types/graphql';

const Store: IStoreResolvers<ResolverContext> = {
  async custom_attributes(_source): Promise<IStoreCustomAttribute> {
    const exploded = explode(_source);
    return get(exploded, 'custom_attributes');
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async getStores(_source, _, { dataSources }): Promise<IStore[]> {
    const data = await dataSources.magento.storeLocator.getStores();
    return data && data.items ? data.items.map(item => StoreModel.transform(item)) : [];
  },
  getStore: async (_source, { id }, { dataSources }) => {
    if (!id) return {};
    try {
      const retailer = await dataSources.magento.storeLocator.getStoreById(id);
      return StoreModel.transform(retailer);
    } catch (e) {
      const result = await dataSources.magento.storeLocator.searchStore({
        filterGroups: [
          {
            filters: [{ field: 'is_active', value: '1', conditionType: IConditionType.Eq }],
          },
          {
            filters: [{ field: 'entity_id', value: id, conditionType: IConditionType.Eq }],
          },
        ],
      });
      if (result && result.items && result.items.length > 0) {
        return StoreModel.transform(result.items[0]);
      } else {
        return null;
      }
    }
  },
};

export default {
  Store,
  Query,
};
