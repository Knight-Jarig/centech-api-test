import { IV2Reward, IV2RewardResponse } from '../../../types/graphql';

export const transformRewardList = (vouchers): IV2RewardResponse => {
  return {
    from: vouchers.from,
    to: vouchers.to,
    currentPage: vouchers.current_page,
    total: vouchers.total,
    perPage: vouchers.per_page,
    lastPage: vouchers.last_page,
    data: vouchers.data?.map(transformReward) || [],
  };
};

export const transformReward = (reward): IV2Reward => {
  return {
    id: reward.id,
    rewardType: reward.reward_type,
    status: reward.status,
    name: reward.name,
    displayName: reward.display_name,
    shortDescription: reward.short_description,
    termsCondition: reward.terms_condition,
    couponConditionDescription: reward.coupon_condition_description,
    voucherCodeType: reward.voucher_code_type,
    description: reward.description,
    image: reward.image,
    tags: reward.tags,
    category: reward.category,
    voucherQuota: reward.voucher_quota_qty,
    voucherCustomerLimit:  reward.voucher_customer_limit_qty,
    isRequiredCitizenId: reward.is_required_citizen_id,
  };
};
