import { IQueryResolvers, IResolvers, IV2BrandResolvers } from '../../../types/graphql';
import { ResolverContext } from '../../../types';

const V2Brand: IV2BrandResolvers = {
  imageUrl: async (root, _, { dataSources, storeCode, store }) => {
    const { secure_base_media_url: baseMediaUrl } = storeCode
      ? store
      : (await dataSources.magento.storeConfig.find())[0];

    return root.imageUrl ? `${baseMediaUrl}aw_sbb/brand/${root.imageUrl}` : null;
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async v2BrandSearch(_source, { input }, { dataSources }) {
    const { filterGroups, page, size, sortOrders } = input;

    const brands = await dataSources.brandUseCase.find({
      filterGroups,
      page,
      size,
      sortOrders,
    });

    return brands;
  },
  async v2BrandById(_source, { id }, { dataSources }) {
    const brandId = id || '';

    const brand = await dataSources.brandUseCase.findOne({ brandId });
    if (!brand.brand_id) {
      return {} as any;
    }
    return {
      id: `${brand.brand_id}`,
      name: brand?.name,
      imageUrl: brand?.extension_attributes?.brand_image_url,
      contentCss: brand?.extension_attributes?.menu_css,
      logo: brand?.logo,
      description: brand?.description,
      urlKey: brand?.url_key,
    };
  },
};

export const BrandResolvers: IResolvers = {
  Query,
  V2Brand,
};
