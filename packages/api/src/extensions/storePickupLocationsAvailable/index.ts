import { IQueryResolvers, IStorePickupLocationsAvailable } from '../../types/graphql';
import { ResolverContext } from '../../types';
import typeDef from './types.graphql';
import StoreModel from '../../transform/store.model';

const Query: IQueryResolvers<ResolverContext> = {
  async storePickupLocationsAvailable(
    _,
    { sku, filter, limit, offset },
    { dataSources, storeCode },
  ): Promise<IStorePickupLocationsAvailable[]> {
    let pickupLocations = await dataSources.magento.storePickUp.getStorePickupLocationsAvailable(sku, storeCode);
    if (!pickupLocations || pickupLocations.length === 0) return [];

    if (filter && (filter.keyword || (filter.location?.lat && filter.location?.lng))) {
      pickupLocations = await dataSources.shippingUseCase.getDistanceNearestPickupLocations(
        pickupLocations,
        filter,
        limit,
        offset,
      );
    } else {
      const end = limit ? (offset ?? 0) + limit : undefined;
      pickupLocations = pickupLocations.slice(offset, end);
    }

    return pickupLocations.map(store => StoreModel.transformPickUpLocation(store));
  },
};

const resolver = {
  Query,
};

export { typeDef, resolver };
