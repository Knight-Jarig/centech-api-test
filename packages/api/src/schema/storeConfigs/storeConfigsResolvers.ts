import { ResolverContext } from '../../types';
import { IQueryResolvers, IStoreConfig } from '../../types/graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async storeConfigs(_, __, { dataSources }): Promise<IStoreConfig[]> {
    return dataSources.magento.storeConfig.find();
  },
};

export default {
  Query,
};
