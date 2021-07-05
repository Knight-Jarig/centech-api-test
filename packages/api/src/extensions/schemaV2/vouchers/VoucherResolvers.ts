import { IQueryResolvers, IResolvers } from '../../../types/graphql';
import { ApplicationError } from '../../../error/ApplicationError';
import { transformVoucherList } from './VoucherTransform';

const Query: IQueryResolvers = {
  async v2Vouchers(_, { input = {} }, { dataSources, customerToken, storeCode }) {
    const queryParams = {};

    if (!input.userId) {
      if (customerToken) {
        const { id: customerId } = await dataSources.magento.customer.getCustomer(storeCode);
        if (!customerId) throw new ApplicationError('customer_id was not specified');
        input.userId = customerId;
      } else {
        throw new ApplicationError('no permission');
      }
    }
    if (input.filters) {
      input.filters.forEach(filter => {
        queryParams[filter.id] = filter.optionIds.join(',');
      });
    }
    if (input.sort) {
      queryParams['sort_by'] = input.sort.id;
      queryParams['order'] = input.sort.direction;
    }

    const response = await dataSources.camp.getVouchers(input, queryParams);
    return transformVoucherList(response);
  },
};

export const VoucherResolvers: IResolvers = { Query };
