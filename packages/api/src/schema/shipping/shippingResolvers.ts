import { ResolverContext } from '../../types';
import {
  IEstimateShippingMethods,
  IMutationResolvers,
  IPickupStoreLocationFilter,
  IQueryResolvers,
  IResponseMessage,
  IShippingMethodExtensionResolvers,
  IShippingMethods,
} from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';

function sortNearestLocations(locations, lat, lng) {
  function dist(data) {
    return (
      (data.address.latitude - lat) * (data.address.latitude - lat) +
      (data.address.longitude - lng) * (data.address.longitude - lng)
    );
  }

  locations.sort((a, b) => {
    return dist(a) - dist(b);
  });
}

const Mutation: IMutationResolvers<ResolverContext> = {
  async estimateShippingMethods(
    _source,
    { isGuest, cartId, input },
    { dataSources, storeCode },
  ): Promise<IShippingMethods[]> {
    if (!isGuest) {
      if (cartId) {
        return await dataSources.magento.cartId.estimateShippingMethods(input, cartId, storeCode);
      }
      return await dataSources.magento.cart.estimateShippingMethods(input, storeCode);
    } else {
      return await dataSources.magento.cartGuest.estimateShippingMethods(input, cartId, storeCode);
    }
  },
  async setShippingInformation(
    _source,
    { isGuest, cartId, input },
    { dataSources, customerToken, storeCode },
  ): Promise<IResponseMessage> {
    try {
      const shouldSetShippingByCustomer = !isGuest && !cartId;
      const shouldSetShippingByGuest = isGuest && cartId;
      const shouldSetShippingById = !isGuest && cartId;

      if (shouldSetShippingByCustomer) {
        await dataSources.magento.cart.setShippingInformation(input);
      }

      if (shouldSetShippingByGuest) {
        await dataSources.magento.cartGuest.setShippingInformation(input, cartId);
      }

      if (shouldSetShippingById) {
        if (customerToken) {
          // customer case
          const cart = await dataSources.magento.cartId.getCartByID(storeCode, cartId);
          const customer = await dataSources.magento.customer.getCustomer(storeCode);
          const isCartIdAllowToSetShipping = +customer.id === +cart.customer.id;

          if (isCartIdAllowToSetShipping) {
            await dataSources.magento.cartId.setShippingInformation(input, cartId);
          } else {
            throw new ApplicationError('no permission');
          }
        } else {
          // guest case
          const cart = await dataSources.magento.cartId.getCartByID(storeCode, cartId);
          const isCartIdAllowToSetShippingForGuest = cart.customer && cart.customer.email === null;

          if (isCartIdAllowToSetShippingForGuest) {
            await dataSources.magento.cartId.setShippingInformation(input, cartId);
          } else {
            throw new ApplicationError('no permission');
          }
        }
      }

      return {
        message: 'success',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
  async setShippingSlotHdl(_source, { isGuest, cartId, input }, { dataSources }): Promise<IResponseMessage> {
    if (!isGuest) {
      if (cartId) {
        await dataSources.magento.cartId.setShippingSlotHdl(input, cartId);
      } else {
        await dataSources.magento.cart.setShippingSlotHdl(input);
      }
    } else {
      await dataSources.magento.cartGuest.setShippingSlotHdl(input, cartId);
    }

    return {
      message: 'success',
    };
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async estimateShippingMethods(
    _source,
    { isGuest, cartId, input },
    { dataSources, storeCode },
  ): Promise<IEstimateShippingMethods[]> {
    if (!isGuest) {
      return await dataSources.magento.cart.estimateShippingMethodsV3(input, storeCode);
    } else {
      return await dataSources.magento.cartGuest.estimateShippingMethodsV3(input, cartId, storeCode);
    }
  },
  async estimateShippingMethodsV4(
    _source,
    { isGuest, cartId, input },
    { dataSources, storeCode },
  ): Promise<IEstimateShippingMethods[]> {
    if (!isGuest) {
      return await dataSources.magento.cart.estimateShippingMethodsV4(input, storeCode);
    } else {
      return await dataSources.magento.cartGuest.estimateShippingMethodsV4(input, cartId, storeCode);
    }
  },
};

const ShippingMethodExtension: IShippingMethodExtensionResolvers = {
  async pickup_stores_location(
    { pickup_stores_location: pickupLocations },
    { filter, limit, offset }: { filter: IPickupStoreLocationFilter; limit: number; offset: number },
    { dataSources },
  ) {
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

    return pickupLocations;
  },
};

export default {
  Mutation,
  Query,
  ShippingMethodExtension,
};
