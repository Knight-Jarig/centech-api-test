/**
 * @title order package status
 * @desc get the order package status, shipment_provider, tracking number and sold by on marketplace
 **/
import { IOrderResolvers } from '../../types/graphql';

const typeDef = ``;

const Order: IOrderResolvers = {
  extension_attributes: async (_source, _, { dataSources, storeCode }) => {
    const incrementId = _source.increment_id;
    const extension_attributes = _source.extension_attributes;
    let packageStatus;
    try {
      packageStatus = await dataSources.magento.order.fetchOrderPackageStatus(incrementId, storeCode);
      return {
        ...extension_attributes,
        order_package_status:
          packageStatus &&
          packageStatus.map(val => ({
            shipment_provider: val.shipment_provider,
            status: val.status,
            track_url: val.track_url,
            track_number: val.track_number,
            sold_by: val.sold_by,
          })),
      };
    } catch (error) {
      return extension_attributes;
    }
  },
};

const resolver = {
  Order,
};

export { typeDef, resolver };
