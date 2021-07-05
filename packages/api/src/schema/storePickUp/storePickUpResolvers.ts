import { ResolverContext } from '../../types';
import StoreModel from '../../transform/store.model';
import {
  IIsSalable,
  IPickUpStore,
  IPickUpStoreMulti,
  IQueryResolvers,
  IShipFromStoreAvailableTime,
  IStore,
} from '../../types/graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async get2hrsPickUpStores(_source, { sku }, { dataSources, storeCode }): Promise<IPickUpStore[]> {
    const data = await dataSources.magento.storePickUp.get2hrsPickUpStores(sku, storeCode);
    return data
      ? data.map(item => {
          return { source_item: item.source_item, store: StoreModel.transform(item.store) };
        })
      : [];
  },
  async getAllActive2hrsPickUpStores(_source, { sku }, { dataSources, storeCode }): Promise<IPickUpStore[]> {
    const data = await dataSources.magento.storePickUp.getAllActive2hrsPickUpStores(sku, storeCode);
    return data
      ? data.map(item => {
          return { source_item: item.source_item, store: StoreModel.transform(item.store) };
        })
      : [];
  },
  async getMulti2hrsPickUpStores(_source, { skus }, { dataSources, storeCode }): Promise<IPickUpStoreMulti[]> {
    return await Promise.all(
      skus.map(async sku => {
        try {
          const data = await dataSources.magento.storePickUp.get2hrsPickUpStores(sku, storeCode);
          return {
            sku: sku,
            data:
              data &&
              data.map(item => ({
                source_item: item.source_item,
                store: StoreModel.transform(item.store),
              })),
          };
        } catch (error) {
          return {
            sku: sku,
            data: [],
          };
        }
      }),
    );
  },
  async getClickNCollectPickUpStores(_source, { cartId }, { dataSources, storeCode }): Promise<IStore[]> {
    const data = await dataSources.magento.storePickUp.getClickNCollectPickUpStores(storeCode, cartId);
    return data ? data.map(item => StoreModel.transform(item.store)) : [];
  },
  async getStatusActivePickupStore(_source, { sku }, { dataSources, storeCode }): Promise<IIsSalable> {
    const data = await dataSources.magento.storePickUp.getStatusActivePickupStore(sku, storeCode);
    return { status: data ? data : false };
  },
  async getShipFromStoreAvailableTime(_source, param, { dataSources }): Promise<IShipFromStoreAvailableTime> {
    const data = await dataSources.magento.storePickUp.getShipFromStoreAvailableTime();
    return data;
  },
};

export default {
  Query,
};
