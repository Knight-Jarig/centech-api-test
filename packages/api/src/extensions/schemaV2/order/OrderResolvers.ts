import { ResolverContext } from '../../../types';
import {
  IQueryResolvers,
  IResolvers,
  IV2OrderResolvers,
  IV2Order as IOrder,
  IV2OrderResult as IOrderResult,
} from '../../../types/graphql';

import { getItemsGroupBySeller } from './OrderTransformer';

const Order: IV2OrderResolvers = {
  async itemsGroupBySeller({ incrementId }, _, { dataSources, store }) {
    const { packages, orders } = await dataSources.orderUseCase.fetchOrderPackage(incrementId);
    if (orders.length === 1) return getItemsGroupBySeller(packages, orders[0], store);
    const foundOrder = orders.find(order => (order.increment_id === incrementId));
    return getItemsGroupBySeller(packages, foundOrder, store);
  }
};

const Query: IQueryResolvers<ResolverContext> = {
  async v2Order(_, { input }, { dataSources }): Promise<IOrder> {
    return  dataSources.orderUseCase.getOrder(input);
  },
  async v2Orders(_, { input }, { dataSources }): Promise<IOrderResult> {
    return  dataSources.orderUseCase.getOrders(input);
  },
};

export const OrderResolvers: IResolvers = {
  Query,
  V2Order: Order,
};
