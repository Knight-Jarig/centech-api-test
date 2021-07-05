import { ResolverContext } from '../../types';
import { IQueryResolvers, IUrlRedirect, IUrlRewrite } from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';

const Query: IQueryResolvers<ResolverContext> = {
  urlRewrite: async (_source, { url }, { dataSources, storeCode }): Promise<IUrlRewrite> => {
    try {
      return await dataSources.magento.urlRewrite.find({ url, storeCode });
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
  urlRedirect: async (_source, { url }, { dataSources, storeCode }): Promise<IUrlRedirect> => {
    try {
      return await dataSources.magento.urlRewrite.redirect({ url, storeCode });
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
};

export default {
  Query,
};
