export interface CustomAttribute {
  attribute_code: string;
  value: string;
}

interface MarketPlaceInfo {
  payment_workflow: string;
  scored: string;
  shipping_zone_code: string;
  marketplace_product_type: string;
}

export interface OrderItemExtensionAttributes {
  marketplace_info: MarketPlaceInfo;
  custom_attributes: CustomAttribute[];
}

export interface OrderItem {
  amount_refunded: number;
  applied_rule_ids: string;
  base_amount_refunded: number;
  base_discount_amount: number;
  base_discount_invoiced: number;
  base_discount_tax_compensation_amount: number;
  base_original_price: number;
  base_price: number;
  base_price_incl_tax: number;
  base_row_invoiced: number;
  base_row_total: number;
  base_row_total_incl_tax: number;
  base_tax_amount: number;
  base_tax_invoiced: number;
  base_weee_tax_applied_amount: number;
  base_weee_tax_applied_row_amnt: number;
  base_weee_tax_disposition: number;
  base_weee_tax_row_disposition: number;
  created_at: string;
  discount_amount: number;
  discount_invoiced: number;
  discount_percent: number;
  free_shipping: number;
  discount_tax_compensation_amount: number;
  is_qty_decimal: number;
  is_virtual: number;
  item_id: number;
  name: string;
  no_discount: number;
  order_id: number;
  original_price: number;
  price: number;
  price_incl_tax: number;
  product_id: number;
  product_type: string;
  qty_canceled: number;
  qty_invoiced: number;
  qty_ordered: number;
  qty_refunded: number;
  qty_returned: number;
  qty_shipped: number;
  quote_item_id: number;
  row_invoiced: number;
  row_total: number;
  row_total_incl_tax: number;
  row_weight: number;
  sku: string;
  store_id: number;
  tax_amount: number;
  tax_invoiced: number;
  tax_percent: number;
  updated_at: string;
  weee_tax_applied: string;
  weee_tax_applied_amount: number;
  weee_tax_applied_row_amount: number;
  weee_tax_disposition: number;
  weee_tax_row_disposition: number;
  extension_attributes: OrderItemExtensionAttributes;
}

export interface BillingAddressExtensionAttributes {
  custom_attributes: CustomAttribute[];
}

export interface BillingAddress {
  address_type: string;
  city: string;
  country_id: string;
  email: string;
  entity_id: number;
  firstname: string;
  lastname: string;
  parent_id: number;
  postcode: string;
  region: string;
  region_code: string;
  region_id: number;
  street: string[];
  telephone: string;
  extension_attributes: BillingAddressExtensionAttributes;
}

export interface Payment {
  account_status?: any;
  additional_information: string[];
  amount_authorized: number;
  amount_ordered: number;
  base_amount_authorized: number;
  base_amount_ordered: number;
  base_shipping_amount: number;
  cc_exp_year: string;
  cc_last4?: any;
  cc_ss_start_month: string;
  cc_ss_start_year: string;
  entity_id: number;
  last_trans_id: string;
  method: string;
  parent_id: number;
  shipping_amount: number;
}

export interface StatusHistory {
  comment: string;
  created_at: string;
  entity_id: number;
  entity_name: string;
  is_customer_notified?: number;
  is_visible_on_front: number;
  parent_id: number;
  status: string;
}

export interface AddressExtensionAttributes {
  custom_attributes: CustomAttribute[];
}

export interface Address {
  address_type: string;
  city: string;
  country_id: string;
  email: string;
  entity_id: number;
  firstname: string;
  lastname: string;
  parent_id: number;
  postcode: string;
  region: string;
  region_code: string;
  region_id: number;
  street: string[];
  telephone: string;
  extension_attributes: AddressExtensionAttributes;
}

export interface Total {
  base_shipping_amount: number;
  base_shipping_discount_amount: number;
  base_shipping_discount_tax_compensation_amnt: number;
  base_shipping_incl_tax: number;
  base_shipping_tax_amount: number;
  shipping_amount: number;
  shipping_discount_amount: number;
  shipping_discount_tax_compensation_amount: number;
  shipping_incl_tax: number;
  shipping_tax_amount: number;
}

export interface Shipping {
  address: Address;
  method: string;
  total: Total;
}

export interface ShippingAssignmentItem {
  amount_refunded: number;
  applied_rule_ids: string;
  base_amount_refunded: number;
  base_discount_amount: number;
  base_discount_invoiced: number;
  base_discount_tax_compensation_amount: number;
  base_original_price: number;
  base_price: number;
  base_price_incl_tax: number;
  base_row_invoiced: number;
  base_row_total: number;
  base_row_total_incl_tax: number;
  base_tax_amount: number;
  base_tax_invoiced: number;
  base_weee_tax_applied_amount: number;
  base_weee_tax_applied_row_amnt: number;
  base_weee_tax_disposition: number;
  base_weee_tax_row_disposition: number;
  created_at: string;
  discount_amount: number;
  discount_invoiced: number;
  discount_percent: number;
  free_shipping: number;
  discount_tax_compensation_amount: number;
  is_qty_decimal: number;
  is_virtual: number;
  item_id: number;
  name: string;
  no_discount: number;
  order_id: number;
  original_price: number;
  price: number;
  price_incl_tax: number;
  product_id: number;
  product_type: string;
  qty_canceled: number;
  qty_invoiced: number;
  qty_ordered: number;
  qty_refunded: number;
  qty_returned: number;
  qty_shipped: number;
  quote_item_id: number;
  row_invoiced: number;
  row_total: number;
  row_total_incl_tax: number;
  row_weight: number;
  sku: string;
  store_id: number;
  tax_amount: number;
  tax_invoiced: number;
  tax_percent: number;
  updated_at: string;
  weee_tax_applied: string;
  weee_tax_applied_amount: number;
  weee_tax_applied_row_amount: number;
  weee_tax_disposition: number;
  weee_tax_row_disposition: number;
}

export interface ShippingAssignment {
  shipping: Shipping;
  items: ShippingAssignmentItem[];
}

export interface PaymentAdditionalInfo {
  key: string;
  value: string;
}

export interface AppliedTax {
  code: string;
  title: string;
  percent: number;
  amount: number;
  base_amount: number;
}

export interface AppliedTaxItem {
  code: string;
  title: string;
  percent: number;
  amount: number;
  base_amount: number;
}

export interface ItemAppliedTax {
  type: string;
  applied_taxes: AppliedTaxItem[];
  item_id?: number;
}

export interface MDCOrderT1CRedeem {
  points_redeem: string;
  points_total: string;
  discount_amount: string;
  discount_amount_formatted: string;
}

export interface MDCOrderCouponsApplied {
  sales_rule_id: string;
  quote_id: string;
  order_id: string;
  coupon_code: string;
  coupon_amount_base: string;
  discount_amount: string;
}

export interface OrderExtensionAttributes {
  order_children_items: any;
  order_children_ids: any;
  shipping_assignments: ShippingAssignment[];
  payment_additional_info: PaymentAdditionalInfo[];
  applied_taxes: AppliedTax[];
  item_applied_taxes: ItemAppliedTax[];
  converting_from_quote: boolean;
  gift_cards: any[];
  base_gift_cards_amount: number;
  gift_cards_amount: number;
  gw_base_price: string;
  gw_price: string;
  gw_items_base_price: string;
  gw_items_price: string;
  gw_card_base_price: string;
  gw_card_price: string;
  mom_status_reason: string;
  payment_method_label: string;
  base_surcharge_fee_amount: number;
  surcharge_fee_amount: number;
  order_status: string;
  p2c2p_promotion_code: string;
  shipping_method_label: string;
  delivery_status: string;
  gw_id: string;
  gw_price_incl_tax: string;
  credit_card_on_top_discount_amount: number;
  t1c_redeem: MDCOrderT1CRedeem;
  coupons_applied: MDCOrderCouponsApplied[];
  pickup_code?: string;
}

export interface MagentoOrder {
  applied_rule_ids: string;
  base_currency_code: string;
  base_discount_amount: number;
  base_grand_total: number;
  base_discount_tax_compensation_amount: number;
  base_shipping_amount: number;
  base_shipping_discount_amount: number;
  base_shipping_discount_tax_compensation_amnt: number;
  base_shipping_incl_tax: number;
  base_shipping_tax_amount: number;
  base_subtotal: number;
  base_subtotal_incl_tax: number;
  base_tax_amount: number;
  base_total_due: number;
  base_to_global_rate: number;
  base_to_order_rate: number;
  billing_address_id: number;
  created_at: string;
  customer_email: string;
  customer_firstname: string;
  customer_group_id: number;
  customer_id: number;
  customer_is_guest: number;
  customer_lastname: string;
  customer_note_notify: number;
  discount_amount: number;
  entity_id: number;
  global_currency_code: string;
  grand_total: number;
  discount_tax_compensation_amount: number;
  increment_id: string;
  is_virtual: number;
  order_currency_code: string;
  protect_code: string;
  quote_id: number;
  remote_ip: string;
  shipping_amount: number;
  shipping_description: string;
  shipping_discount_amount: number;
  shipping_discount_tax_compensation_amount: number;
  shipping_incl_tax: number;
  shipping_tax_amount: number;
  state: string;
  status: string;
  store_currency_code: string;
  store_id: number;
  store_name: string;
  store_to_base_rate: number;
  store_to_order_rate: number;
  subtotal: number;
  subtotal_incl_tax: number;
  tax_amount: number;
  total_due: number;
  total_item_count: number;
  total_qty_ordered: number;
  updated_at: string;
  weight: number;
  x_forwarded_for: string;
  items: OrderItem[];
  billing_address: BillingAddress;
  payment: Payment;
  status_histories: StatusHistory[];
  extension_attributes: OrderExtensionAttributes;
}

export interface Filter {
  field: string;
  value: string;
  condition_type: string;
}

export interface FilterGroup {
  filters: Filter[];
}

export interface SearchCriteria {
  filter_groups: FilterGroup[];
}

export interface MagentoSearchOrderResponse {
  items: MagentoOrder[];
  search_criteria: SearchCriteria;
  total_count: number;
}

interface MDCOrderPackageStatusItemProduct {
  sku: string;
}

export interface MDCOrderPackageStatusItem {
  status: string;
  product: MDCOrderPackageStatusItemProduct;
  item_id: string;
  qty: number;
}

export interface MDCOrderPackageStatusResponse {
  items: MDCOrderPackageStatusItem[];
  sold_by: string;
  shipment_provider: string;
  ref_number: string;
  status: string;
  track_url: string;
  track_number: string;
}
