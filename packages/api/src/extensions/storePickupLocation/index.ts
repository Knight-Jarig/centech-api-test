import { IPickupStoreLocation, IQueryResolvers } from '../../types/graphql';
import typeDef from './types.graphql';
import StoreModel from '../../transform/store.model';

const Query: IQueryResolvers = {
  async pickupLocations(_source, { sku }, { dataSources, storeCode }): Promise<IPickupStoreLocation[]> {
    const data = await dataSources.magento.storePickUp.getPickupLocationsBySKU(sku, storeCode);

    return (data ?? []).map(store => StoreModel.transformPickUpLocation(store));
  },
};

const resolver = {
  Query,
};

export { typeDef, resolver };
