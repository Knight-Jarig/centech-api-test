import typeDef from './types.graphql';
import { IPaymentInformations, IQueryResolvers } from '../../types/graphql';

const Query: IQueryResolvers = {
  async paymentInformations(
    _source,
    { cartId, isGuest, company_id = 0 },
    { dataSources, storeCode },
  ): Promise<IPaymentInformations> {
    const result = isGuest
      ? await dataSources.magento.cartGuest.getPaymentInformationOFM(cartId, storeCode, company_id)
      : await dataSources.magento.cart.getPaymentInformationOFM(storeCode, company_id);

    return {
      ...result,
      extension_attributes: {
        ...result.extension_attributes,
        is_payment_promotion_locked: result.extension_attributes?.is_payment_promotion_locked === '1',
      },
    };
  },
};

const resolver = {
  Query,
};

export { typeDef, resolver };
