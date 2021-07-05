/** Use cms api version 2 **/
import typeDef from './types.graphql';
import { ICmsMobileItemInterfaceResolvers, IQueryResolvers, IViewType } from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';

const CMSMobileItemInterface: ICmsMobileItemInterfaceResolvers = {
  __resolveType(source) {
    switch (source.viewType.toUpperCase()) {
      case IViewType.Text.toUpperCase():
        return 'CMSMobileItemText';
      case IViewType.Image.toUpperCase():
        return 'CMSMobileItemImage';
      case IViewType.Banner.toUpperCase():
        return 'CMSMobileItemBanner';
      case IViewType.OneColumnHorizontalCarousel.toUpperCase():
        return 'CMSMobileItemOneColumnHorizontalCarousel';
      case IViewType.Divider.toUpperCase():
        return 'CMSMobileItemDivider';
      case IViewType.Video.toUpperCase():
        return 'CMSMobileItemVideo';
      case IViewType.Header.toUpperCase():
        return 'CMSMobileItemHeader';
      case IViewType.Button.toUpperCase():
        return 'CMSMobileItemButton';
      case IViewType.Product.toUpperCase():
        return 'CMSMobileItemProduct';
      case IViewType.ProductScroll.toUpperCase():
        return 'CMSMobileItemProductScroll';
      case IViewType.TwoColumnVerticalCarousel.toUpperCase():
        return 'CMSMobileItemTwoColumnVerticalCarousel';
      case IViewType.ImageLabel.toUpperCase():
        return 'CMSMobileItemImageLabel';
      case IViewType.CategoryBar.toUpperCase():
        return 'CMSMobileItemCategoryBar';
      case IViewType.SectionTitle.toUpperCase():
        return 'CMSMobileItemSectionTitle';
      case IViewType.VideoSelector.toUpperCase():
        return 'CMSMobileItemVideoSelector';
      case IViewType.VideoItem.toUpperCase():
        return 'CMSMobileItemVideoItem';
    }
  },
};

const Query: IQueryResolvers = {
  async cms(_source, { filter: { identifier, url_key } }, { dataSources, storeCode }) {
    try {
      return await dataSources.cms.getCmsV2({ identifier, url_key, storeCode });
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
  async cmsMobile(_source, { filter: { identifier, url_key } }, { dataSources, storeCode }) {
    try {
      const result = await dataSources.cms.getCmsV2Mobile({ identifier, url_key, storeCode });
      if (result.status !== 'successful') throw new ApplicationError('Fetch CMS failed!');
      return {
        ...result,
        cms_list: result.cms_list.map(item => ({
          ...item,
          viewType: IViewType?.[item.viewType],
          items: item.items
            ? item.items?.map(it => ({
                ...it,
                viewType: IViewType?.[it?.viewType],
              }))
            : null,
          data: item.data
            ? {
                ...item.data,
                viewType: IViewType?.[item.data?.viewType],
              }
            : null,
        })),
      };
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
};
const resolver = {
  Query,
  CMSMobileItemInterface,
};

export { typeDef, resolver };
