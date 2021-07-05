export interface MDCCustomAttribute {
  attribute_code: string;
  value: any;
  label?: string;
  name: string;
}

export interface MDCCustomer {
  email?: any;
  firstname?: any;
  lastname?: any;
}

export interface MDCBillingAddress {
  id: number;
  region?: any;
  region_id?: any;
  region_code?: any;
  country_id?: any;
  street: string[];
  telephone?: any;
  postcode?: any;
  city?: any;
  firstname?: any;
  lastname?: any;
  email?: any;
  same_as_billing: number;
  save_in_address_book: number;
  custom_attributes: MDCCustomAttribute[];
}

export interface MDCCurrency {
  global_currency_code: string;
  base_currency_code: string;
  store_currency_code: string;
  quote_currency_code: string;
  store_to_base_rate: number;
  store_to_quote_rate: number;
  base_to_global_rate: number;
  base_to_quote_rate: number;
}

export interface MDCPromotionOffers {
  discounts?: any;
  freebies?: any;
  applicable_coupons?: any;
}

export interface MDCFreeShippingOffer {
  message: string;
}

export interface MDCCartExtensionAttributes {
  shipping_assignments: any[];
  free_items?: any[];
  free_items_added?: any[];
  order_id: string;
  promotion_offers: MDCPromotionOffers;
  is_payment_promotion_locked: string;
  free_shipping_offer: MDCFreeShippingOffer;
  is_pre_order?: boolean;
  pwb_standard_pre_order_message?: string;
}

export interface MDCCartItem {
  item_id: number;
  sku: string;
  qty: number;
  name: string;
  price: number;
  product_type: string;
  quote_id: string;
  extension_attributes: MDCCartItemExtensionAttribute;
}

export interface MDCCartItemExtensionAttribute {
  free_items?: MDCCartItemFreeItem[];
  free_items_added?: MDCCartItemFreeItemAdded[];
  line_items?: MDCCartItemLineItem[];
  error_infos: any;
  parent_sku?: string;
  configurable_product_labels?: string[];
}

export interface MDCCartItemFreeItem {
  sku: string;
  qty: number;
  cart_id: string;
  sales_rule_id: number;
  sales_rule_action_type: number;
  sales_rule_action_apply: string;
  super_attribute: any;
}

export interface MDCCartItemFreeItemAdded {
  quote_id: number;
  item_id: number;
  sku: string;
  sales_rule_id: number;
  qty: number;
  intent_qty: number;
  for_item_id: number;
  associated_item_id: number;
}

export interface MDCCartItemLineItem {
  entity_id: number;
  quote_id: number;
  line_id: number;
  line_number: number;
}

export interface MDCCart {
  id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_virtual: boolean;
  items: MDCCartItem[];
  items_count: number;
  items_qty: number;
  customer: MDCCustomer;
  billing_address: MDCBillingAddress;
  reserved_order_id: string;
  orig_order_id: number;
  currency: MDCCurrency;
  customer_is_guest: boolean;
  customer_note_notify: boolean;
  customer_tax_class_id: number;
  store_id: number;
  extension_attributes: MDCCartExtensionAttributes;
}

export interface MDCSalesRule {
  quote_id: number;
  quote_item_id: number;
  rule_id: number;
  discount_amount: number;
  order: number;
  priority_order: number;
  coupon_code?: any;
  discount_tax: number;
  calculation_base_price: number;
  address_id: number;
}

export interface MDCItemExtensionAttributes {
  sales_rules: MDCSalesRule[];
  sku: string;
}

export interface MDCCartTotalItem {
  item_id: number;
  price: number;
  base_price: number;
  qty: number;
  row_total: number;
  base_row_total: number;
  row_total_with_discount: number;
  tax_amount: number;
  base_tax_amount: number;
  tax_percent: number;
  discount_amount: number;
  base_discount_amount: number;
  discount_percent: number;
  price_incl_tax: number;
  base_price_incl_tax: number;
  row_total_incl_tax: number;
  base_row_total_incl_tax: number;
  options: string;
  weee_tax_applied_amount: number;
  weee_tax_applied: string;
  extension_attributes: MDCItemExtensionAttributes;
  name: string;
}

export interface Rate {
  percent: string;
  title: string;
}

export interface TaxGrandtotalDetail {
  amount: number;
  rates: Rate[];
  group_id: number;
}

export interface MDCTotalSegmentExtensionAttributes {
  gw_order_id?: string;
  gw_item_ids?: any[];
  gw_price?: string;
  gw_base_price?: string;
  gw_items_price?: string;
  gw_items_base_price?: string;
  gw_card_price?: string;
  gw_card_base_price?: string;
  gw_base_tax_amount?: string;
  gw_tax_amount?: string;
  gw_price_incl_tax?: string;
  gw_base_price_incl_tax?: string;
  tax_grandtotal_details?: TaxGrandtotalDetail[];
}

export interface MDCTotalSegment {
  code: string;
  title: string;
  value: any;
  extension_attributes?: MDCTotalSegmentExtensionAttributes;
  area?: string;
}

interface MDCCartTotalExtensionAttributesCartSummary {
  other_discount: number;
  other_discount_incl_tax: number;
  other_discount_tax: number;
  t1c_discount: number;
  t1c_discount_incl_tax: number;
  t1c_discount_tax: number;
  coupon_discount: number;
  coupon_discount_incl_tax: number;
  coupon_discount_tax: number;
  total_save: number;
  total_save_incl_tax: number;
  subtotal: number;
  subtotal_incl_tax: number;
  grand_total: number;
  tax_amount: number;
  normal_shipping_fee: number;
  special_shipping_fee: number;
  t1c_items_price_redemption: number;
  t1c_normal_shipping_redemption: number;
  t1c_special_shipping_redemption: number;
  total_shipping_fee: number;
  total_shipping_fee_incl_tax: number;
}

export interface MDCCartTotalExtensionAttributes {
  reward_points_balance: number;
  reward_currency_amount: number;
  base_reward_currency_amount: number;
  amrule_discount_breakdown?: any[];
  base_surcharge_fee_amount?: number;
  surcharge_fee_amount?: number;
  t1c_earn_points_estimate: string;
  t1c_forgot_password_url: string;
  cart_id: string;
  total_without_shipping_fee?: number;
  cart_summary?: MDCCartTotalExtensionAttributesCartSummary;
}

export interface MDCEstimateShippingMethods {
  method: string;
  method_caption: string;
  method_code: string;
  fastest_method: string;
  fastest_method_caption: string;
  free_method: string;
  free_method_cost: string;
  shipping_method: MDCShippingMethods[];
  is_allow_split_order: boolean;
}

export interface MDCShippingMethods {
  carrier_code: string;
  method_code: string;
  carrier_title: string;
  method_title: string;
  caption: string;
  amount: number;
  base_amount: number;
  available: boolean;
  error_message: string;
  price_excl_tax: number;
  price_incl_tax: number;
  extension_attributes: MDCShippingMethodExtension;
}

interface MDCShippingMethodExtension {
  pickup_locations: MDCPickupLocation[];
  pickup_stores_location: MDCPickupStoresLocation[];
  gmap_api_key: string;
  shipping_slot_list: MDCShippingSlotItem[];
  messages: MDCShippingMethodExtensionMessage[];
  is_pre_order: boolean;
  delivery_time_label: MDCShippingMethodExtensionDeliveryTimeLabel;
}

interface MDCPickupStoresLocationAddress {
  street_number: string;
  building: string;
  soi: string;
  street: string;
  district: string;
  district_id: number;
  sub_district: string;
  sub_district_id: number;
  region: string;
  region_id: string;
  post_code: string;
  contact_number: string;
  country_code: string;
  city: string;
  latitude: string;
  longitude: string;
}

interface MDCPickupStoresLocationAllocatedCapacity {
  allocated_capacity: number;
}

interface MDCPickupStoresLocationOpeningHours {
  day: string;
  open: string;
  close: string;
}

interface MDCPickupStoresLocationStorePickup {
  store_id: number;
  stock_id: number;
  allow_ispu: boolean;
  allow_sts: string;
}
interface MDCPickupStoresLocationSalableItems {
  sku: string;
  qty: number;
}

interface MDCPickupStoresLocationAdditionalTextVariable {
  total_available: number;
  total_ordered: number;
}

interface MDCPickupStoresLocationAdditionalTextExtensionAttributes {
  additional_text_variable: MDCPickupStoresLocationAdditionalTextVariable;
}

export interface MDCPickupStoresLocationAdditionalText {
  method_code: string;
  method_label_code: string;
  time_value: number;
  time_unit: string;
  date_time: string;
  extension_attributes: MDCPickupStoresLocationAdditionalTextExtensionAttributes;
}

interface MDCPickupStoresLocationExtensionAttributes {
  opening_hours: [MDCPickupStoresLocationOpeningHours];
  image: string;
  stock_id: number;
  allow_pick_at_store: boolean;
  display_as_store_information: boolean;
  store_pickup: MDCPickupStoresLocationStorePickup;
  salable_items: [MDCPickupStoresLocationSalableItems];
  additional_text: MDCPickupStoresLocationAdditionalText;
  cut_off_time: string;
  stock_status_code: string;
  stock_status_label: string;
}

export interface MDCPickupStoresLocation {
  id: number;
  name: string;
  store_code: string;
  is_active: boolean;
  address: MDCPickupStoresLocationAddress;
  extension_attributes: MDCPickupStoresLocationExtensionAttributes;
}

interface MDCShippingMethodExtensionDeliveryTimeLabel {
  method_type: string;
  method_label: string;
  min_lead_time: string;
  max_lead_time: string;
  time_label: string;
}

interface MDCShippingMethodExtensionMessage {
  message_code: string;
  message: string;
  pre_render_message: string;
}

interface MDCPickupLocation {
  id: string;
  code: string;
  name: string;
  display_order: string;
  address_line1: string;
  district: string;
  province: string;
  region_id: string;
  postal_code: string;
  lat: string;
  long: string;
  pickup_fee: string;
  pos_handling_fee: string;
  opening_hours: string[];
  extension_attributes: MDCPickupLocationExtension;
}

interface MDCPickupLocationExtension {
  additional_address_info: MDCAdditionalAddressInfo;
  available_services: string[];
}

interface MDCAdditionalAddressInfo {
  subdistrict: string;
  subdistrict_id: string;
  district: string;
  district_id: string;
  region_id: string;
  region_name: string;
}

interface MDCShippingSlotItem {
  id: number;
  date_time_from: string;
  date_time_to: string;
  extension_attributes: MDCShippingSlotItemExtensionAttributes;
}

interface MDCShippingSlotItemExtensionAttributes {
  day_slot_id: number;
}

export interface MDCCartTotal {
  coupon_code?: string;
  grand_total: number;
  base_grand_total: number;
  subtotal: number;
  base_subtotal: number;
  discount_amount: number;
  base_discount_amount: number;
  subtotal_with_discount: number;
  base_subtotal_with_discount: number;
  shipping_amount: number;
  base_shipping_amount: number;
  shipping_discount_amount: number;
  base_shipping_discount_amount: number;
  tax_amount: number;
  base_tax_amount: number;
  weee_tax_applied_amount?: any;
  shipping_tax_amount: number;
  base_shipping_tax_amount: number;
  subtotal_incl_tax: number;
  base_subtotal_incl_tax?: number;
  shipping_incl_tax: number;
  base_shipping_incl_tax: number;
  base_currency_code: string;
  quote_currency_code: string;
  items_qty: number;
  items: MDCCartTotalItem[];
  total_segments: MDCTotalSegment[];
  extension_attributes: MDCCartTotalExtensionAttributes;
}

interface MDCPaymentMethods {
  code: string;
  title: string;
}

export interface MDCShippingInfomation {
  payment_methods: [MDCPaymentMethods];
  totals: MDCCartTotal;
}

interface MDCLineItems {
  entity_id: string;
  line_id: string;
  line_number: string;
}

export interface MDCPackageOptionProduct {
  product_id: number;
  item_id: number;
  sku: string;
  qty_available_current_sku: number;
  line_items: [MDCLineItems];
}

interface MDCQtyData {
  total_qty_available_in_package: number;
  total_qty_for_current_package: number;
  total_qty_ordered_in_cart: number;
}

interface MDCMethodLabels {
  label: string;
  date_time: string;
}

interface MDCMethodData {
  carrier_title: string;
  method_title: string;
  carrier_code: string;
  method_code: string;
  method_labels: MDCMethodLabels;
}

export interface MDCPackageOption {
  product: [MDCPackageOptionProduct];
  delivery_method: string;
  stock_id: string;
  is_package_available: boolean;
  has_sub_package: boolean;
  qty_data: MDCQtyData;
  method_data: MDCMethodData;
  sub_package: [MDCPackageOption];
}

export interface MDCCartMini {
  id: string;
  items_count: string;
  items_qty: string;
  message: string;
}

export interface MDCAddCartItemResponse {
  item_id: number;
  sku: string;
  qty: number;
  name: string;
  price: number;
  product_type: string;
  quote_id: string;
  product_option: MDCAddCartItemProductOption;
  extension_attributes: MDCAddCartItemExtensionAttributes;
}
interface MDCAddCartItemProductOption {
  extension_attributes: ProductOptionExtensionAttributes;
}
interface ProductOptionExtensionAttributes {
  configurable_item_options: ConfigurableItemOptions[];
}
export interface ConfigurableItemOptions {
  option_id: string;
  option_value: number;
}

interface MDCAddCartItemExtensionAttributes {
  line_items: any;
  configurable_product_labels: string[];
  error_infos: any;
  parent_sku: string;
}
export interface T1InitiateResponse {
  next_process: string;
  request_id: string;
}

export interface T1VerifyResponse {
  next_process: string;
  request_id: string;
}
