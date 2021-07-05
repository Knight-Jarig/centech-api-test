import { ResolverContext } from '../../types';
import { IBanner, IQueryResolvers } from '../../types/graphql';
import { shuffleSlides, sortingBanners } from './bannerUtils';

const Query: IQueryResolvers<ResolverContext> = {
  async banner(_source, { input: { filterGroups, page, size, sortOrders } }, { dataSources }): Promise<IBanner[]> {
    const getBanner = await dataSources.magento.banner.find({
      filterGroups,
      page,
      size,
      sortOrders: sortOrders as any,
    });

    return getBanner.map(banner => {
      if (banner?.is_random_order_image == true) {

        return shuffleSlides(banner);
      } else {
        
        return sortingBanners(banner);
      }
    })
  },
};

export default {
  Query,
};
