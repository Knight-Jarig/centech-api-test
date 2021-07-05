import { ResolverContext } from '../../types';
import { IMutationResolvers, IQueryResolvers } from '../../types/graphql';
import typeDef from './types.graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async couponList(_source, { input }, { dataSources }): Promise<any> {
    return await dataSources.magento.coupon.couponList(input);
  },
  async customerCouponList(_source, { input }, { dataSources }): Promise<any> {
    return await dataSources.magento.coupon.customerCouponList(input);
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async assignCoupon(_source, { input }, { dataSources, storeCode = 'en' }): Promise<any> {
    return await dataSources.magento.coupon.assignCoupon(input, storeCode);
  },
};

const resolver = {
  Query,
  Mutation,
};

export { typeDef, resolver };
