import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import cache from '../../../configs/cache';
import {
  MagentoCouponAssignCouponCampaignInput,
  MagentoCouponAssignCouponCampaignResponse,
  MagentoCouponAssignCouponResponse,
  MagentoCouponCouponCampaignListResponse,
  MagentoCouponCouponListResponse,
  MagentoCouponCustomerCouponListResponse,
} from './MagentoCouponDataResponse';

export class MagentoCouponDataSource extends BaseRESTDataSource {
  couponList(params): Promise<MagentoCouponCouponListResponse> {
    const { campaignId, page, batch } = params;
    return this.get(
      `/V1/central-coupon-landingpage/rule/${campaignId}`,
      { page, batch },
      {
        cacheOptions: { ttl: cache.CouponAPI.list },
      },
    );
  }

  couponCampaignList(campaignName: string): Promise<MagentoCouponCouponCampaignListResponse[]> {
    return this.get(`/V1/promo-campaign/rule/${campaignName}`, null, {
      cacheOptions: { ttl: cache.CouponAPI.list },
    });
  }

  customerCouponList(params): Promise<MagentoCouponCustomerCouponListResponse> {
    const { page, batch, customer_id } = params;
    return this.get(`/V1/central-coupon-landingpage/customer/rule`, { customer_id, page, batch });
  }

  assignCoupon(input, storeCode): Promise<MagentoCouponAssignCouponResponse> {
    const params = {
      campaign_id: input.campaign_id,
      store_code: storeCode,
      customer_id: input.customer_id,
      rule_id: input.rule_id,
    };

    return this.post(`/V1/central-coupon-landingpage/claim`, params);
  }

  assignCouponCampaign(
    { campaignName, email, phone, ruleId },
    storeCode,
  ): Promise<MagentoCouponAssignCouponCampaignResponse> {
    const params: MagentoCouponAssignCouponCampaignInput = {
      campaignId: campaignName,
      email,
      phone,
      ruleId,
      storeCode,
    };

    return this.post(`/V1/promo-campaign/claim`, params);
  }
}
