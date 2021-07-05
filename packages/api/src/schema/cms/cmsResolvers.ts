import { ICmsContent, IQueryResolvers } from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';
import { cmsPageTransform } from '../../transform/cms';

const Query: IQueryResolvers = {
  async cms(_source, { filter: { identifier, url_key } }, { dataSources }): Promise<ICmsContent> {
    try {
      return await dataSources.cms.getCms({ identifier, url_key });
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
  async cmsPage(_, { id }, { dataSources, storeCode }) {
    const data = await dataSources.magento.cms.getCmsPage(id, storeCode);

    return cmsPageTransform(data);
  },
};

export default {
  Query,
};
