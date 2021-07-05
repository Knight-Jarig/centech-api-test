/**
 * @title Price per store
 * @desc get price of product buy store
 **/
import { IConditionType, IProductStorePrice, IResolvers, IStore } from '../../types/graphql';
import typeDef from './types.graphql';
import StoreModel from '../../transform/store.model';
import { CoreAPIDataSources } from '../../dataSource';

function transformPricePerStore(item) {
  const product: IProductStorePrice = {
    entity_id: item.entity_id,
    id: item.product_id,
    sku: item.product_sku,
    price: item.price,
    special_price: item.special_price,
    configurable_product_items: [],
  };

  const childrenProducts = item?.extension_attributes?.child_product_pps || [];
  const configurable_product_items = childrenProducts.map(value => ({
    ...product,
    price: value.price,
    special_price: value.special_price,
  }));

  return {
    ...product,
    configurable_product_items,
  };
}

async function getPricePerStore({ sku, retailerId }, dataSources) {
  if (retailerId) {
    const item = await dataSources.magento.pricePerStore.getPricingPerStoreGetPrice({ sku, retailer_id: retailerId });
    return transformPricePerStore(item);
  } else {
    return null;
  }
}

async function findRetailerById({ id }: { id: number }, dataSources: CoreAPIDataSources): Promise<IStore> {
  const retailer = await dataSources.magento.storeLocator.searchStore({
    filterGroups: [
      {
        filters: [{ field: 'is_active', value: '1', conditionType: IConditionType.Eq }],
      },
      {
        filters: [{ field: 'entity_id', value: id.toString(), conditionType: IConditionType.Eq }],
      },
    ],
  });

  return retailer.items?.map(StoreModel.transform)[0];
}

const resolver: IResolvers = {
  Query: {
    async pricePerStore(_, { input: { sku, retailerId } }, { dataSources }): Promise<IProductStorePrice> {
      return getPricePerStore({ sku, retailerId }, dataSources);
    },
    async retailerByPostcode(_, { input: { postcode } }, { dataSources }): Promise<IStore> {
      const id = await dataSources.magento.pricePerStore.getRetailerIdByPostcode(postcode);

      return findRetailerById({ id }, dataSources);
    },
    async retailerById(_, { input: { id } }, { dataSources }): Promise<IStore> {
      return findRetailerById({ id }, dataSources);
    },
  },
};

export { typeDef, resolver };
