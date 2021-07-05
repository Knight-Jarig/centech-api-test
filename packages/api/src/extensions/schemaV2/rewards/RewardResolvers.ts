import { IQueryResolvers, IResolvers } from '../../../types/graphql';
import { transformRewardList } from './RewardTransform';

const Query: IQueryResolvers = {
  async v2Rewards(_, { input = {} }, { dataSources, customerToken, storeCode }) {
    const queryParams = {};

    if (input.filters) {
      input.filters.forEach(filter => {
        queryParams[filter.id] = filter.optionIds.join(',');
      });
    }
    if (input.sort) {
      queryParams['sort_by'] = input.sort.id;
      queryParams['order'] = input.sort.direction;
    }

    const response = await dataSources.camp.getRewards(input, queryParams);

    return transformRewardList(response);
  },
};

export const RewardResolvers: IResolvers = { Query };
