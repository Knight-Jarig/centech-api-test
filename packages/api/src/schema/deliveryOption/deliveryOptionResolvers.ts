import { ResolverContext } from '../../types';
import { IDeliveryOptionItem, IQueryResolvers } from '../../types/graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async deliveryOptions(_source, { sku, postcode }, { dataSources, storeCode }): Promise<IDeliveryOptionItem[]> {
    return dataSources.magento.deliveryOption.getDeliveryOptions({ storeCode, sku, postcode });
  },
};

export default {
  Query,
};
