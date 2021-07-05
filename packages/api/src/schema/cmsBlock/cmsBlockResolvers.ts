import { ResolverContext } from '../../types';
import { ICmsBlock, IQueryResolvers } from '../../types/graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async cmsBlocks(_source, { input: { filterGroups, page, size, sortOrders } }, { dataSources }): Promise<ICmsBlock[]> {
    return await dataSources.magento.cmsBlock.find({
      filterGroups,
      page,
      size,
      sortOrders,
    });
  },
  async cmsBlock(_source, { id }, { dataSources }): Promise<ICmsBlock> {
    return await dataSources.magento.cmsBlock.findOne(id);
  },
  async cmsBlockByIdentifier(_source, { identifier, store_id }, { dataSources }) {
    const filterByidentifier = [
      {
        filters: [{ field: 'identifier', value: identifier }],
      },
      {
        filters: [{ field: 'store_id', value: store_id }],
      },
      {
        filters: [{ field: 'is_active', value: '1' }],
      },
    ];
    const result = await dataSources.magento.cmsBlock.find({
      filterGroups: filterByidentifier,
      page: 1,
      size: 0,
      sortOrders: [],
    });

    return result[0];
  },
};

export default {
  Query,
};
