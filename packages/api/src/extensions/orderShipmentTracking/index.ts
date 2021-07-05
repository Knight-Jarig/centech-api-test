/**
 * @title Register Response Status
 * @desc Return magento message instend of true|false in register mutation.
 **/
import { ResolverContext } from '../../types';
import { IOrderResolvers } from '../../types/graphql';

const typeDef = ``;
const Order: IOrderResolvers<ResolverContext> = {
  shipment: async (root, _, { dataSources, storeCode }) => {
    const orderId = root.increment_id.split('-').join('');
    const result = await dataSources.magento.order.shipmentTracking(orderId, storeCode);
    const resultNoDash = result?.items || [];
    if (resultNoDash.length > 0) {
      return resultNoDash;
    }
    const resultHaveDash = await dataSources.magento.order.shipmentTracking(root.increment_id, storeCode);
    return resultHaveDash?.items || [];
  },
};

const Query = {
  trackOrder: async (_source, { incrementId }, { dataSources, storeCode }) => {
    const shipment = await dataSources.magento.order.shipmentTracking(incrementId, storeCode);
    return shipment?.items || [];
  },
};
const resolver = {
  Order,
  Query,
};

export { typeDef, resolver };
