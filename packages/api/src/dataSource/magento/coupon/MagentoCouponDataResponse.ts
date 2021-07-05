export interface Condition3 {
  condition_type: string;
  operator: string;
  attribute_name: string;
  value: string;
}

export interface Condition2 {
  condition_type: string;
  conditions: Condition3[];
  aggregator_type: string;
  operator: string;
  value: string;
  attribute_name: string;
}

export interface Condition {
  condition_type: string;
  conditions: Condition2[];
  aggregator_type: string;
  operator?: any;
  value: string;
}

export interface ActionCondition {
  condition_type: string;
  aggregator_type: string;
  operator?: any;
  value: string;
}

export interface AmpromoRule {
  sku: string;
  type: number;
  after_product_banner_show_gift_images: number;
  top_banner_show_gift_images: number;
  minimal_items_price: number;
  apply_tax: number;
  apply_shipping: number;
}

export interface Amrules {
  promo_cats: string;
  promo_skus: string;
  apply_discount_to: string;
  eachm: string;
  priceselector: number;
  nqty: string;
  max_discount: string;
  skip_rule: number;
}

export interface T1cSpecialRate {
  entity_id: number;
  salesrule_id: number;
  redemption_rate: number;
  maximum_point_rate: number;
}

export interface ExtensionAttributes {
  reward_points_delta: number;
  ampromo_rule: AmpromoRule;
  amrules: Amrules;
  t1c_special_rate: T1cSpecialRate;
}

export interface MagentoCouponRuleData {
  rule_id: number;
  name: string;
  store_labels: any[];
  description: string;
  website_ids: number[];
  customer_group_ids: number[];
  from_date: string;
  uses_per_customer: number;
  is_active: boolean;
  condition: Condition;
  action_condition: ActionCondition;
  stop_rules_processing: boolean;
  is_advanced: boolean;
  sort_order: number;
  simple_action: string;
  discount_amount: number;
  discount_step: number;
  apply_to_shipping: boolean;
  times_used: number;
  is_rss: boolean;
  coupon_type: string;
  use_auto_generation: boolean;
  uses_per_coupon: number;
  extension_attributes: ExtensionAttributes;
}

export interface MagentoCouponRule {
  rule: MagentoCouponRuleData;
  remaining_count?: any;
  current_coupon: string;
  time_used: number;
}

export interface MagentoCouponAssignCouponResponse {
  campaign_id: number;
  customer_id: number;
  rule_id: number;
}

export interface MagentoCouponCouponListResponse {
  rule: MagentoCouponRule[];
}

export interface MagentoCouponCustomerCouponListResponse {
  rule: MagentoCouponRule[];
  current_coupon: string;
  remaining_count: number;
  time_used: number;
}

export interface MagentoCouponAssignCouponCampaignInput {
  campaignId: string;
  email: string;
  phone: string;
  ruleId: string;
  storeCode: string;
}

export interface MagentoCouponCouponCampaignListResponse {
  rule: MagentoCouponRuleData;
  remaining_count: number;
  coupon_image: string;
}

export interface MagentoCouponAssignCouponCampaignResponse {
  success: boolean;
  errors: string[];
}
