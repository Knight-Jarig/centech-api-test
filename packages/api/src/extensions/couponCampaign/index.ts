import { ResolverContext } from '../../types';
import { ICouponCampaignResponseResolvers, IMutationResolvers, IQueryResolvers } from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';
import typeDef from './types.graphql';

const CouponCampaignResponse: ICouponCampaignResponseResolvers<ResolverContext> = {
  async coupon_image({ coupon_image }, _, { dataSources, storeCode, store }) {
    const { secure_base_media_url: base_media_url } = store;

    const pattern = /^((http|https):\/\/)/;
    if (pattern.test(coupon_image)) {
      return coupon_image;
    }

    const regex = /^\/media\//;
    const couponImage = (coupon_image ?? '').replace(regex, '');

    return `${base_media_url}${couponImage}`;
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async couponCampaignList(_, { campaignName }, { dataSources }): Promise<any> {
    return await dataSources.magento.coupon.couponCampaignList(campaignName);
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async assignCouponCampaign(_, { input }, { dataSources, storeCode, locale }) {
    const response = await dataSources.magento.coupon.assignCouponCampaign(input, storeCode);

    if (!response.success) {
      const errorMessageConfig = {
        1: {
          en: 'Phone or email is already used.',
          th: 'มีการใช้เบอร์โทรศัพท์หรืออีเมลนี้แล้ว',
        },
        2: {
          en: 'Coupon is out of stock.',
          th: 'คูปองนี้หมดแล้ว',
        },
        default: {
          en: 'Cannot get this coupon.',
          th: 'ไม่สามารถรับคูปองนี้ได้',
        },
      };

      const [error] = response.errors;
      throw new ApplicationError(errorMessageConfig[error]?.[locale] ?? errorMessageConfig.default[locale]);
    }

    return response;
  },
};

const resolver = {
  Query,
  Mutation,
  CouponCampaignResponse,
};

export { typeDef, resolver };
