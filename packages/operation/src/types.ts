export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  DateTime: any;
  PageSize: any;
};

export type IAcceptConsentInput = {
  cartId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  accept_consents: Array<IConsentType>;
};

export type IAddCouponResponse = {
  __typename?: 'AddCouponResponse';
  message?: Maybe<Scalars['String']>;
  valid_coupon: Array<Scalars['String']>;
  invalid_coupon: Array<Scalars['String']>;
};

export type IAddGiftWrapMessageInput = {
  isGuest: Scalars['Boolean'];
  cartId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type IAdditionalAddressInfo = {
  __typename?: 'AdditionalAddressInfo';
  subdistrict?: Maybe<Scalars['String']>;
  subdistrict_id?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  region_name?: Maybe<Scalars['String']>;
};

export type IAddressInput = {
  customer_id?: Maybe<Scalars['Int']>;
  customer_address_id?: Maybe<Scalars['Int']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  vat_id?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  default_billing?: Maybe<Scalars['Boolean']>;
  default_shipping?: Maybe<Scalars['Boolean']>;
  region_code?: Maybe<Scalars['String']>;
  same_as_billing?: Maybe<Scalars['Int']>;
  save_in_address_book?: Maybe<Scalars['Int']>;
  custom_attributes?: Maybe<IAddressInputCustomAttributes>;
};

export type IAddressInputCustomAttributes = {
  address_line?: Maybe<Scalars['String']>;
  address_name?: Maybe<Scalars['String']>;
  branch_id?: Maybe<Scalars['String']>;
  customer_address_type?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  moo?: Maybe<Scalars['String']>;
  village_name?: Maybe<Scalars['String']>;
  road?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  subdistrict_id?: Maybe<Scalars['String']>;
  subdistrict?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  building_type?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  full_tax_request?: Maybe<Scalars['String']>;
  full_tax_type?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  company_id?: Maybe<Scalars['String']>;
  address_line2?: Maybe<Scalars['String']>;
  branch_code?: Maybe<Scalars['String']>;
  location_name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
};

export enum IAddressType {
  Shipping = 'SHIPPING',
  Billing = 'BILLING',
}

export type IAddToCartExtension = {
  allocated_store_id?: Maybe<Scalars['Int']>;
  pickup_store?: Maybe<IPickupStoreInput>;
  quote_item_group: IQuoteItemGroup;
  shipping_assignment?: Maybe<IAddToCartShippingAssignMent>;
};

export type IAddToCartInput = {
  quote_id?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  product_option?: Maybe<IProductConfigurableOption>;
  extension_attributes?: Maybe<IAddToCartExtension>;
};

export type IAddToCartResponse = {
  __typename?: 'AddToCartResponse';
  item_id?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IAddToCartResponseExtensionAttribute>;
};

export type IAddToCartResponseExtensionAttribute = {
  __typename?: 'AddToCartResponseExtensionAttribute';
  quote_id_to_update?: Maybe<Scalars['Int']>;
};

export type IAddToCartShippingAssignMent = {
  shipping_method?: Maybe<Scalars['String']>;
  store_code?: Maybe<Scalars['String']>;
};

export type IAmPromotionRule = {
  __typename?: 'AmPromotionRule';
  sku?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
  after_product_banner_show_gift_images?: Maybe<Scalars['Int']>;
  top_banner_show_gift_images?: Maybe<Scalars['Int']>;
  minimal_items_price?: Maybe<Scalars['Int']>;
  apply_tax?: Maybe<Scalars['Int']>;
  apply_shipping?: Maybe<Scalars['Int']>;
};

export type IAmRule = {
  __typename?: 'AmRule';
  promo_cats?: Maybe<Scalars['String']>;
  promo_skus?: Maybe<Scalars['String']>;
  apply_discount_to?: Maybe<Scalars['String']>;
  eachm?: Maybe<Scalars['String']>;
  priceselector?: Maybe<Scalars['Int']>;
  nqty?: Maybe<Scalars['String']>;
  max_discount?: Maybe<Scalars['String']>;
  skip_rule?: Maybe<Scalars['String']>;
};

export type IApplicableRulesPromotion = {
  __typename?: 'applicableRulesPromotion';
  rule_id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<Scalars['JSON']>;
};

export type IAssignCouponCampaignInput = {
  campaignName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  ruleId: Scalars['String'];
};

export type IAssignCouponCampaignResponse = {
  __typename?: 'AssignCouponCampaignResponse';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IAssignCouponInput = {
  campaign_id: Scalars['Int'];
  customer_id?: Maybe<Scalars['Int']>;
  rule_id?: Maybe<Scalars['Int']>;
};

export type IAssignCouponResponse = {
  __typename?: 'AssignCouponResponse';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IBank = {
  __typename?: 'Bank';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type IBanner = {
  __typename?: 'banner';
  id: Scalars['ID'];
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  sort_order?: Maybe<Scalars['String']>;
  page_type?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  product_condition?: Maybe<Scalars['String']>;
  category_ids?: Maybe<Scalars['String']>;
  animation_effect?: Maybe<Scalars['Int']>;
  pause_time_between_transitions?: Maybe<Scalars['Int']>;
  slide_transition_speed?: Maybe<Scalars['Int']>;
  is_stop_animation_mouse_on_banner?: Maybe<Scalars['Boolean']>;
  display_arrows?: Maybe<Scalars['Boolean']>;
  display_bullets?: Maybe<Scalars['Boolean']>;
  is_random_order_image?: Maybe<Scalars['Boolean']>;
  slide_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  slide_position?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IExtensionAttributes>;
};

export type IBannerProperty = {
  __typename?: 'BannerProperty';
  itemDeeplink?: Maybe<Scalars['String']>;
  showBullet?: Maybe<Scalars['Boolean']>;
};

export type IBase64Image = {
  image?: Maybe<Scalars['String']>;
  image_type?: Maybe<Scalars['String']>;
};

export type IBillingAddress = {
  __typename?: 'BillingAddress';
  address_type?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  region_code?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  extension_attributes?: Maybe<IBillingAddressExtensionAttributes>;
  custom_attributes?: Maybe<Scalars['JSON']>;
};

export type IBillingAddressCustomAttributesArgs = {
  filter?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IBillingAddressExtensionAttributes = {
  __typename?: 'BillingAddressExtensionAttributes';
  custom_attributes?: Maybe<Array<Maybe<ICustomAttributes>>>;
};

export type IBinLookup = {
  __typename?: 'BinLookup';
  bank_id?: Maybe<Scalars['String']>;
  promo_codes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IBrand = {
  __typename?: 'Brand';
  brand_id: Scalars['ID'];
  name: Scalars['String'];
  url_key?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IBrandExtensionAttributes>;
};

export type IBrandAdditionalProduct = {
  __typename?: 'BrandAdditionalProduct';
  product_id?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type IBrandContent = {
  __typename?: 'BrandContent';
  brand_id?: Maybe<Scalars['Int']>;
  store_id?: Maybe<Scalars['Int']>;
  meta_title?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type IBrandDetail = {
  __typename?: 'BrandDetail';
  brand_id: Scalars['ID'];
  attribute_id?: Maybe<Scalars['Int']>;
  attribute_code?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  website_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  url_key?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  is_featured?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Array<Maybe<IBrandContent>>>;
  meta_title?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  brand_additional_products?: Maybe<Array<Maybe<IBrandAdditionalProduct>>>;
  extension_attributes?: Maybe<IBrandDetailExtensionAttributess>;
};

export type IBrandDetailExtensionAttributess = {
  __typename?: 'BrandDetailExtensionAttributess';
  parent_category?: Maybe<Scalars['Int']>;
  menu_css?: Maybe<Scalars['String']>;
  content_css?: Maybe<Scalars['String']>;
  brand_image_url?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  product_collections?: Maybe<Array<Maybe<IBrandProductCollection>>>;
  product_count?: Maybe<Scalars['Int']>;
  product_name_special?: Maybe<Scalars['Boolean']>;
  hide_product_original_price?: Maybe<Scalars['Boolean']>;
  hide_t1c_redeemable_amount?: Maybe<Scalars['Boolean']>;
  allow_product_review?: Maybe<Scalars['Boolean']>;
  banners?: Maybe<Scalars['JSON']>;
  sort_orders?: Maybe<Array<IBrandSortOrders>>;
};

export type IBrandExtensionAttributes = {
  __typename?: 'BrandExtensionAttributes';
  only_central?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  product_count?: Maybe<Scalars['Int']>;
};

export type IBrandProductCollection = {
  __typename?: 'BrandProductCollection';
  brand_collection_id: Scalars['ID'];
  brand_id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  identification?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  brand_collection_products?: Maybe<Array<Maybe<IBrandAdditionalProduct>>>;
  position?: Maybe<Scalars['Int']>;
  deep_link?: Maybe<Scalars['String']>;
  is_official?: Maybe<Scalars['Boolean']>;
  collection_products_textarea?: Maybe<Scalars['String']>;
};

export type IBrandSortOrders = {
  __typename?: 'BrandSortOrders';
  field: Scalars['String'];
  direction: Scalars['String'];
};

export type IBreadcrumbs = {
  __typename?: 'Breadcrumbs';
  category_id: Scalars['ID'];
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type IBtsOrderStatus = {
  __typename?: 'BtsOrderStatus';
  seller_id?: Maybe<Scalars['Int']>;
  seller_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type IBundlePromotion = {
  __typename?: 'BundlePromotion';
  products?: Maybe<Array<Maybe<IBundleSkuList>>>;
  rule_id?: Maybe<Scalars['Int']>;
  simple_action?: Maybe<Scalars['String']>;
  coupon_code?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  from_date?: Maybe<Scalars['String']>;
  to_date?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_qty?: Maybe<Scalars['Int']>;
  discount_step?: Maybe<Scalars['Int']>;
  total_price_with_discount?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
  total_discount_amount?: Maybe<Scalars['Float']>;
};

export type IBundleSkuList = {
  __typename?: 'BundleSkuList';
  sku?: Maybe<Scalars['String']>;
};

export type IBurnPointResponse = {
  __typename?: 'BurnPointResponse';
  message?: Maybe<Scalars['String']>;
};

export type IButtonProperty = {
  __typename?: 'ButtonProperty';
  text?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

export type IButtonStyle = {
  __typename?: 'ButtonStyle';
  cornerRadius?: Maybe<Scalars['Float']>;
  backgroundColor?: Maybe<Scalars['String']>;
  iconGravity?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  outline?: Maybe<Scalars['Int']>;
  outlineColor?: Maybe<Scalars['String']>;
  textSize?: Maybe<Scalars['Float']>;
  marginRight?: Maybe<Scalars['Int']>;
  marginLeft?: Maybe<Scalars['Int']>;
};

export type ICard = {
  __typename?: 'Card';
  id: Scalars['ID'];
  type: ICardType;
  masked_number: Scalars['String'];
  is_default: Scalars['Boolean'];
  expiry_month: Scalars['Int'];
  expiry_year: Scalars['Int'];
  bank_id?: Maybe<Scalars['String']>;
  bank_name?: Maybe<Scalars['String']>;
  promo_codes?: Maybe<Array<Maybe<Scalars['String']>>>;
  bank?: Maybe<IBank>;
  created_at?: Maybe<Scalars['DateTime']>;
};

export type ICardInput = {
  encrypted_card_data: Scalars['String'];
  is_store_card: Scalars['Boolean'];
  cardholder_name: Scalars['String'];
  expiry_month: Scalars['Int'];
  expiry_year: Scalars['Int'];
};

export type ICardSort = {
  id: ICardSortIdEnum;
  direction: ISortDirection;
};

export enum ICardSortIdEnum {
  Id = 'ID',
  CreatedAt = 'CREATED_AT',
}

export enum ICardType {
  Visa = 'Visa',
  MasterCard = 'MasterCard',
  Amex = 'AMEX',
  Jcb = 'JCB',
  UnionPay = 'UnionPay',
  Others = 'Others',
}

export type ICart = ICartInterface & {
  __typename?: 'Cart';
  id?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<ICartItem>>>;
  items_count?: Maybe<Scalars['Int']>;
  items_qty?: Maybe<Scalars['Int']>;
  billing_address?: Maybe<ICartBillingAddress>;
  extension_attributes?: Maybe<ICartExtensionAttributes>;
  totals?: Maybe<ICartTotals>;
  guest_id?: Maybe<Scalars['String']>;
  has_gift_wrap: Scalars['Boolean'];
};

export type ICartBillingAddress = {
  __typename?: 'CartBillingAddress';
  id?: Maybe<Scalars['Float']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  region_code?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  telephone?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  vat_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  same_as_billing?: Maybe<Scalars['Float']>;
  save_in_address_book?: Maybe<Scalars['Float']>;
  customer_id?: Maybe<Scalars['Int']>;
  customer_address_id?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<ICartBillingAddressExtensionAttributes>;
  custom_attributes?: Maybe<ICartBillingAddressCustomAttributes>;
};

export type ICartBillingAddressCustomAttributes = {
  __typename?: 'CartBillingAddressCustomAttributes';
  address_line?: Maybe<Scalars['String']>;
  address_name?: Maybe<Scalars['String']>;
  branch_id?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  customer_address_type?: Maybe<Scalars['String']>;
  subdistrict?: Maybe<Scalars['String']>;
  subdistrict_id?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  full_tax_request?: Maybe<Scalars['String']>;
  full_tax_type?: Maybe<Scalars['String']>;
  company_id?: Maybe<Scalars['String']>;
  address_line2?: Maybe<Scalars['String']>;
  branch_code?: Maybe<Scalars['String']>;
};

export type ICartBillingAddressExtensionAttributes = {
  __typename?: 'CartBillingAddressExtensionAttributes';
  full_tax_request?: Maybe<Scalars['String']>;
};

export type ICartExtensionAttributes = {
  __typename?: 'CartExtensionAttributes';
  free_items?: Maybe<Array<Maybe<IFreeItem>>>;
  free_items_added?: Maybe<Array<Maybe<IFreeItemAdded>>>;
  free_shipping_offer?: Maybe<IFreeShippingOffer>;
  shipping_assignments?: Maybe<Array<Maybe<ICartExtensionAttributesShippingAssigments>>>;
  order_id?: Maybe<Scalars['String']>;
  /** [PWB] - Check Cart Merge */
  is_split_quote?: Maybe<Scalars['Int']>;
  /** [PWB] - List of child cart */
  children?: Maybe<Array<Maybe<ICart>>>;
  /** [PWB] - Store object when select shipping with store type */
  retailer?: Maybe<IStore>;
  /** [SSP] - Free Item Count */
  free_items_qty?: Maybe<Scalars['Int']>;
  /** [PWB] - Check is it pre-order or not */
  is_pre_order?: Maybe<Scalars['Boolean']>;
  pwb_standard_pre_order_message?: Maybe<Scalars['String']>;
};

export type ICartExtensionAttributesShippingAssigments = {
  __typename?: 'CartExtensionAttributesShippingAssigments';
  shipping?: Maybe<IShippingAssigmentsShipping>;
  items?: Maybe<Array<Maybe<IProduct>>>;
};

export type ICartInterface = {
  id?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<ICartItem>>>;
  items_count?: Maybe<Scalars['Int']>;
  items_qty?: Maybe<Scalars['Int']>;
  billing_address?: Maybe<ICartBillingAddress>;
  extension_attributes?: Maybe<ICartExtensionAttributes>;
  totals?: Maybe<ICartTotals>;
  guest_id?: Maybe<Scalars['String']>;
  has_gift_wrap: Scalars['Boolean'];
};

export type ICartItem = {
  __typename?: 'CartItem';
  base_price_incl_tax?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_percent?: Maybe<Scalars['Float']>;
  extension_attributes?: Maybe<ICartItemExtensionAttributes>;
  item_id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  options: Array<ICartItemOption>;
  parent?: Maybe<IProduct>;
  price: Scalars['Float'];
  price_incl_tax?: Maybe<Scalars['Float']>;
  product?: Maybe<IProduct>;
  product_type?: Maybe<Scalars['String']>;
  qty: Scalars['Float'];
  quote_id?: Maybe<Scalars['String']>;
  row_total?: Maybe<Scalars['Float']>;
  row_total_incl_tax?: Maybe<Scalars['Float']>;
  row_total_with_discount?: Maybe<Scalars['Float']>;
  sku: Scalars['String'];
  tax_amount?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

export type ICartItemExtensionAttributes = {
  __typename?: 'CartItemExtensionAttributes';
  allocated_store_id: Scalars['Int'];
  configurable_product_labels?: Maybe<Array<Maybe<Scalars['String']>>>;
  free_items?: Maybe<Array<Maybe<IFreeItem>>>;
  free_items_added?: Maybe<Array<Maybe<IFreeItemAdded>>>;
  line_items?: Maybe<Array<Maybe<ICartLineItems>>>;
  parent_quote_item_id?: Maybe<Scalars['String']>;
  parent_sku?: Maybe<Scalars['String']>;
  quote_item_group: Scalars['String'];
  salable_quantity?: Maybe<Scalars['Int']>;
  shipping_assignment?: Maybe<ICartItemShippingAssignment>;
};

export type ICartItemOption = {
  __typename?: 'CartItemOption';
  value: Scalars['String'];
  label: Scalars['String'];
};

export type ICartItemShippingAssignment = {
  __typename?: 'CartItemShippingAssignment';
  shipping_method?: Maybe<Scalars['String']>;
};

export type ICartLineItemExtensionAttribute = {
  __typename?: 'CartLineItemExtensionAttribute';
  estimated_lead_times?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  lead_time?: Maybe<Scalars['JSON']>;
  shipping_information?: Maybe<Scalars['JSON']>;
};

export type ICartLineItems = {
  __typename?: 'CartLineItems';
  entity_id: Scalars['ID'];
  quote_id: Scalars['Int'];
  line_id: Scalars['Int'];
  line_number: Scalars['Int'];
  extension_attributes?: Maybe<ICartLineItemExtensionAttribute>;
};

export type ICartMini = ICartInterface & {
  __typename?: 'CartMini';
  id?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<ICartItem>>>;
  items_count?: Maybe<Scalars['Int']>;
  items_qty?: Maybe<Scalars['Int']>;
  billing_address?: Maybe<ICartBillingAddress>;
  extension_attributes?: Maybe<ICartExtensionAttributes>;
  totals?: Maybe<ICartTotals>;
  guest_id?: Maybe<Scalars['String']>;
  has_gift_wrap: Scalars['Boolean'];
};

export type ICartTotals = {
  __typename?: 'CartTotals';
  grand_total?: Maybe<Scalars['Float']>;
  base_grand_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  subtotal_with_discount?: Maybe<Scalars['Float']>;
  shipping_amount?: Maybe<Scalars['Float']>;
  shipping_discount_amount?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  shipping_tax_amount?: Maybe<Scalars['Float']>;
  subtotal_incl_tax?: Maybe<Scalars['Float']>;
  shipping_incl_tax?: Maybe<Scalars['Float']>;
  extension_attributes?: Maybe<ICartTotalsExtensionAttributes>;
  total_segments?: Maybe<Array<Maybe<ITotalSegment>>>;
  coupon_code?: Maybe<Scalars['String']>;
};

export type ICartTotalsExtensionAttributes = {
  __typename?: 'CartTotalsExtensionAttributes';
  t1c_earn_points_estimate?: Maybe<Scalars['String']>;
  t1c_forgot_password_url?: Maybe<Scalars['String']>;
  reward_points_balance?: Maybe<Scalars['Float']>;
  reward_currency_amount?: Maybe<Scalars['Float']>;
  surcharge?: Maybe<Scalars['String']>;
  t1c_maximum_redeemable_points?: Maybe<Scalars['Int']>;
  cart_summary?: Maybe<ICartTotalsExtensionAttributesCartSummary>;
};

export type ICartTotalsExtensionAttributesCartSummary = {
  __typename?: 'CartTotalsExtensionAttributesCartSummary';
  other_discount?: Maybe<Scalars['Float']>;
  other_discount_incl_tax?: Maybe<Scalars['Float']>;
  other_discount_tax?: Maybe<Scalars['Float']>;
  t1c_discount?: Maybe<Scalars['Float']>;
  t1c_discount_incl_tax?: Maybe<Scalars['Float']>;
  t1c_discount_tax?: Maybe<Scalars['Float']>;
  coupon_discount?: Maybe<Scalars['Float']>;
  coupon_discount_incl_tax?: Maybe<Scalars['Float']>;
  coupon_discount_tax?: Maybe<Scalars['Float']>;
  total_save?: Maybe<Scalars['Float']>;
  total_save_incl_tax?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  total_shipping_fee?: Maybe<Scalars['Float']>;
  total_shipping_fee_incl_tax?: Maybe<Scalars['Float']>;
};

/** Category */
export type ICategory = {
  __typename?: 'Category';
  id: Scalars['ID'];
  parent_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  children?: Maybe<Scalars['String']>;
  sub_category?: Maybe<Array<Maybe<ICategory>>>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  include_in_menu?: Maybe<Scalars['Boolean']>;
  meta_title?: Maybe<Scalars['String']>;
  meta_keywords?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  children_count?: Maybe<Scalars['Int']>;
  url_key?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
  path?: Maybe<Array<Maybe<ICategory>>>;
  is_virtual_category?: Maybe<Scalars['String']>;
  virtual_category_root?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  display_mode?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  product_count?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<Scalars['JSON']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
  /** extension catalogServiceFilterbyFlashDeal */
  is_hide_display_price?: Maybe<Scalars['Boolean']>;
};

export type ICategoryBarProperty = {
  __typename?: 'CategoryBarProperty';
  parentCategoryId?: Maybe<Scalars['String']>;
};

export type ICategoryFlat = {
  __typename?: 'CategoryFlat';
  id: Scalars['ID'];
  entity_id: Scalars['String'];
  parent_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  include_in_menu?: Maybe<Scalars['String']>;
  product_count?: Maybe<Scalars['Int']>;
  children?: Maybe<Scalars['String']>;
  children_count?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
  virtual_category_root?: Maybe<Scalars['String']>;
  image_icon_tablet?: Maybe<Scalars['String']>;
  image_mobile?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  mega_cms_brand?: Maybe<Scalars['String']>;
  mega_cms_banner?: Maybe<Scalars['String']>;
  mega_cms_menu?: Maybe<Scalars['String']>;
  display_mode?: Maybe<Scalars['String']>;
  segment_information?: Maybe<Scalars['String']>;
  children_data?: Maybe<Array<Maybe<ICategoryFlat>>>;
};

export type ICategoryItem = {
  __typename?: 'CategoryItem';
  breadcrumb?: Maybe<Array<Maybe<Scalars['String']>>>;
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ICategoryPath = {
  __typename?: 'CategoryPath';
  category_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
};

export type ICentralSaleRuleMaxDiscountRule = {
  __typename?: 'CentralSaleRuleMaxDiscountRule';
  entity_id?: Maybe<Scalars['Int']>;
  rule_id?: Maybe<Scalars['Int']>;
  max_discount_amount?: Maybe<Scalars['Int']>;
};

export type IChangePasswordInput = {
  currentPassword?: Maybe<Scalars['String']>;
  newPassword?: Maybe<Scalars['String']>;
};

export type IChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  message?: Maybe<Scalars['String']>;
};

export type IClearCacheBySkuInput = {
  sku: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type IClearCacheBySkuResponse = {
  __typename?: 'ClearCacheBySkuResponse';
  isSuccess?: Maybe<Scalars['Boolean']>;
};

export type ICmsBlock = {
  __typename?: 'CmsBlock';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  creation_time?: Maybe<Scalars['String']>;
  update_time?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type ICmsContent = {
  __typename?: 'CmsContent';
  status?: Maybe<Scalars['String']>;
  cms_list?: Maybe<Array<Maybe<ICmsItem>>>;
};

export type ICmsContentDetail = {
  __typename?: 'CmsContentDetail';
  meta?: Maybe<Scalars['JSON']>;
  instagram?: Maybe<Scalars['JSON']>;
  js?: Maybe<Scalars['String']>;
  css?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
};

export type ICmsContentObject = {
  __typename?: 'CmsContentObject';
  css?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
  files?: Maybe<ICmsFiles>;
  meta?: Maybe<Scalars['JSON']>;
  lang_code?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  contents?: Maybe<Scalars['JSON']>;
};

export type ICmsFiles = {
  __typename?: 'CmsFiles';
  js?: Maybe<Scalars['String']>;
  css?: Maybe<Scalars['String']>;
};

export type ICmsFilterInput = {
  identifier?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
};

export type ICmsItem = {
  __typename?: 'CmsItem';
  identifier?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  languages?: Maybe<ICmsLanguageField>;
  contents?: Maybe<ICmsContentDetail>;
  page_layout?: Maybe<Scalars['String']>;
  custom_field?: Maybe<Scalars['JSON']>;
  layout_type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ID']>;
};

export type ICmsLanguageField = {
  __typename?: 'CmsLanguageField';
  en?: Maybe<ICmsContentObject>;
  th?: Maybe<ICmsContentObject>;
};

export type ICmsMobileContent = {
  __typename?: 'CMSMobileContent';
  status?: Maybe<Scalars['String']>;
  cms_list?: Maybe<Array<Maybe<ICmsMobileItemInterface>>>;
};

export type ICmsMobileFilterInput = {
  identifier?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
};

export type ICmsMobileItemBanner = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemBanner';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IBannerProperty>;
  items?: Maybe<Array<Maybe<ICmsMobileItemInterface>>>;
  data?: Maybe<ICmsMobileItemInterface>;
};

export type ICmsMobileItemButton = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemButton';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IButtonProperty>;
  styles?: Maybe<IButtonStyle>;
};

export type ICmsMobileItemCategoryBar = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemCategoryBar';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<ICategoryBarProperty>;
};

export type ICmsMobileItemDivider = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemDivider';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  styles?: Maybe<IDividerStyle>;
};

export type ICmsMobileItemHeader = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemHeader';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IHeaderProperty>;
};

export type ICmsMobileItemImage = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemImage';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IImageProperty>;
};

export type ICmsMobileItemImageLabel = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemImageLabel';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IImageLabelProperty>;
  styles?: Maybe<IImageLabelStyle>;
};

export type ICmsMobileItemInterface = {
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
};

export type ICmsMobileItemOneColumnHorizontalCarousel = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemOneColumnHorizontalCarousel';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IOneColumnHorizontalCarouselProperty>;
  items?: Maybe<Array<Maybe<ICmsMobileItemInterface>>>;
  data?: Maybe<ICmsMobileItemInterface>;
};

export type ICmsMobileItemProduct = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemProduct';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IProductProperty>;
  styles?: Maybe<IProductStyle>;
};

export type ICmsMobileItemProductScroll = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemProductScroll';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IProductScrollProperty>;
  items?: Maybe<Array<Maybe<ICmsMobileItemInterface>>>;
  data?: Maybe<ICmsMobileItemInterface>;
};

export type ICmsMobileItemSectionTitle = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemSectionTitle';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<ISectionTitleProperty>;
  styles?: Maybe<ISectionTitleStyle>;
};

export type ICmsMobileItemText = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemText';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<ITextProperty>;
  styles?: Maybe<ITextStyle>;
};

export type ICmsMobileItemTwoColumnVerticalCarousel = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemTwoColumnVerticalCarousel';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<ITwoColumnVerticalCarouselProperty>;
  data?: Maybe<ICmsMobileItemInterface>;
  items?: Maybe<Array<Maybe<ICmsMobileItemInterface>>>;
};

export type ICmsMobileItemVideo = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemVideo';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IVideoProperty>;
  styles?: Maybe<IVideoStyle>;
};

export type ICmsMobileItemVideoItem = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemVideoItem';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  properties?: Maybe<IVideoItemProperty>;
};

export type ICmsMobileItemVideoSelector = ICmsMobileItemInterface & {
  __typename?: 'CMSMobileItemVideoSelector';
  viewType?: Maybe<Scalars['String']>;
  deeplink?: Maybe<Scalars['String']>;
  styles?: Maybe<ICmsMobileItemVideoSelectorStyle>;
  items?: Maybe<Array<Maybe<ICmsMobileItemInterface>>>;
};

export type ICmsMobileItemVideoSelectorStyle = {
  __typename?: 'CMSMobileItemVideoSelectorStyle';
  autoplay?: Maybe<Scalars['Boolean']>;
};

export type ICmsPage = {
  __typename?: 'CmsPage';
  id: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  page_layout?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  meta_keywords?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  content_heading?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  creation_time?: Maybe<Scalars['String']>;
  update_time?: Maybe<Scalars['String']>;
  sort_order?: Maybe<Scalars['String']>;
  layout_update_xml?: Maybe<Scalars['String']>;
  custom_theme?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type ICompareProductInput = {
  sku?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ICompareProducts = {
  __typename?: 'CompareProducts';
  attribute_code?: Maybe<Scalars['String']>;
  attribute_label?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<ICompareProductsItem>>>;
};

export type ICompareProductsItem = {
  __typename?: 'CompareProductsItem';
  sku?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export enum IConditionType {
  Eq = 'eq',
  Finset = 'finset',
  From = 'from',
  Gt = 'gt',
  Gteq = 'gteq',
  In = 'in',
  Like = 'like',
  Lt = 'lt',
  Lteq = 'lteq',
  Moreq = 'moreq',
  Neq = 'neq',
  Nin = 'nin',
  Notnull = 'notnull',
  Null = 'NULL',
  To = 'to',
}

export type IConfigExtensionAttribute = {
  __typename?: 'ConfigExtensionAttribute';
  social_facebook_app_id?: Maybe<Scalars['String']>;
  google_tag_manager_key?: Maybe<Scalars['String']>;
  google_tag_manager_cookies?: Maybe<Array<Maybe<IGoogleTagManagerCookieExtensionAttribute>>>;
  review_image_upload?: Maybe<IConfigReviewImageUpload>;
};

export type IConfigReviewImageUpload = {
  __typename?: 'ConfigReviewImageUpload';
  max_number_of_file_upload?: Maybe<Scalars['Int']>;
  max_size_upload?: Maybe<Scalars['Float']>;
  allow_extensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  folder_upload?: Maybe<Scalars['String']>;
};

export type IConfigurableProductOptions = {
  __typename?: 'ConfigurableProductOptions';
  id?: Maybe<Scalars['Int']>;
  attribute_id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  values?: Maybe<Array<Maybe<IProductOptionsValues>>>;
};

export type IConsent = {
  __typename?: 'Consent';
  marketing: Scalars['String'];
  privacy_policy: Scalars['String'];
  version: Scalars['String'];
};

export enum IConsentType {
  Privacy = 'PRIVACY',
  Marketing = 'MARKETING',
}

export type IContactUsInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
};

export type IContactUsResponse = {
  __typename?: 'ContactUsResponse';
  success?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type ICoordinate = {
  __typename?: 'Coordinate';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type ICouponCampaignResponse = {
  __typename?: 'CouponCampaignResponse';
  rule: ICouponRuleData;
  remaining_count: Scalars['Int'];
  coupon_image: Scalars['String'];
};

export type ICouponDiscount = {
  __typename?: 'CouponDiscount';
  discount_amount?: Maybe<Scalars['Float']>;
  discount_amount_formatted?: Maybe<Scalars['String']>;
  coupon_code?: Maybe<Scalars['String']>;
};

export type ICouponInput = {
  campaignId: Scalars['Int'];
  page: Scalars['Int'];
  batch: Scalars['Int'];
};

export type ICouponResponse = {
  __typename?: 'CouponResponse';
  rules?: Maybe<Array<Maybe<ICouponRule>>>;
  current_page: Scalars['Int'];
  total_page: Scalars['Int'];
  total_count: Scalars['Int'];
};

export type ICouponRule = {
  __typename?: 'CouponRule';
  rule?: Maybe<ICouponRuleData>;
  current_coupon?: Maybe<Scalars['String']>;
  remaining_count?: Maybe<Scalars['Int']>;
  coupon_expiration_date?: Maybe<Scalars['String']>;
  time_used?: Maybe<Scalars['Int']>;
};

export type ICouponRuleActionCondition = {
  __typename?: 'CouponRuleActionCondition';
  condition_type?: Maybe<Scalars['String']>;
  aggregator_type?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ICouponRuleCondition = {
  __typename?: 'CouponRuleCondition';
  condition_type?: Maybe<Scalars['String']>;
  conditions?: Maybe<Array<Maybe<ICouponRuleConditionData>>>;
  aggregator_type?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ICouponRuleConditionData = {
  __typename?: 'CouponRuleConditionData';
  condition_type?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  attribute_name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ICouponRuleData = {
  __typename?: 'CouponRuleData';
  rule_id: Scalars['ID'];
  name: Scalars['String'];
  store_labels?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  website_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  customer_group_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  from_date?: Maybe<Scalars['String']>;
  to_date?: Maybe<Scalars['String']>;
  uses_per_customer?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  condition?: Maybe<ICouponRuleCondition>;
  action_condition?: Maybe<ICouponRuleActionCondition>;
  stop_rules_processing?: Maybe<Scalars['Boolean']>;
  is_advanced?: Maybe<Scalars['Boolean']>;
  sort_order?: Maybe<Scalars['Int']>;
  simple_action?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Int']>;
  discount_step?: Maybe<Scalars['Int']>;
  apply_to_shipping?: Maybe<Scalars['Boolean']>;
  times_used?: Maybe<Scalars['Int']>;
  is_rss?: Maybe<Scalars['Boolean']>;
  coupon_type?: Maybe<Scalars['String']>;
  use_auto_generation?: Maybe<Scalars['Boolean']>;
  uses_per_coupon?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<ICouponRuleExtendsionAttributes>;
  promotion_mdid?: Maybe<Scalars['Int']>;
};

export type ICouponRuleExtendsionAttributes = {
  __typename?: 'CouponRuleExtendsionAttributes';
  term_and_condition?: Maybe<Scalars['String']>;
  coupon_image?: Maybe<Scalars['String']>;
  reward_points_delta?: Maybe<Scalars['Int']>;
  ampromo_rule?: Maybe<IAmPromotionRule>;
  amrules?: Maybe<IAmRule>;
  t1c_special_rate?: Maybe<IT1cSpecialRate>;
  central_salesrulemaxdiscount_rule?: Maybe<ICentralSaleRuleMaxDiscountRule>;
  discount_code?: Maybe<Scalars['String']>;
  promotion_mdid?: Maybe<Scalars['String']>;
};

export type ICreateCustomerAddress = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  telephone: Scalars['String'];
  building?: Maybe<Scalars['String']>;
  address_line: Scalars['String'];
  subdistrict: IPlaceInput;
  district: IPlaceInput;
  province: IPlaceInput;
  postcode: Scalars['String'];
  address_name?: Maybe<Scalars['String']>;
  customer_address_type: IAddressType;
  full_tax_type?: Maybe<ITaxType>;
  vat_id?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  branch_id?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  is_default_billing?: Maybe<Scalars['Boolean']>;
  is_default_shipping?: Maybe<Scalars['Boolean']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
  /** deprecated, for backword compatability only */
  street?: Maybe<Array<Scalars['String']>>;
  /** deprecated, for backword compatability only */
  city?: Maybe<Scalars['String']>;
};

export type ICreateWishlistInput = {
  name?: Maybe<Scalars['String']>;
  customer_id: Scalars['Int'];
  items: Array<Maybe<IItemInput>>;
};

export type ICreateWishlistItemInput = {
  wishlist_id?: Maybe<Scalars['Int']>;
  product_id: Scalars['Int'];
  store_id?: Maybe<Scalars['Int']>;
  qty?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<Array<Maybe<ICustomAttributesInput>>>;
};

export type ICreditCardPromotion = {
  __typename?: 'CreditCardPromotion';
  title?: Maybe<Scalars['String']>;
  promotion_id?: Maybe<Scalars['Int']>;
  bank_icon?: Maybe<Scalars['String']>;
  bank_color?: Maybe<Scalars['String']>;
  rule_id?: Maybe<Scalars['Int']>;
  simple_action?: Maybe<Scalars['String']>;
  coupon_code?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  from_date?: Maybe<Scalars['String']>;
  to_date?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_qty?: Maybe<Scalars['Int']>;
  discount_step?: Maybe<Scalars['Int']>;
};

export type ICustomAttributes = {
  __typename?: 'CustomAttributes';
  attribute_code?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ICustomAttributesInput = {
  attribute_code?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ICustomer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  group_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  created_in?: Maybe<Scalars['String']>;
  default_billing?: Maybe<Scalars['String']>;
  default_shipping?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  gender?: Maybe<IGender>;
  /** @deprecated Use `tax_id` instead */
  taxvat?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['Int']>;
  website_id?: Maybe<Scalars['Int']>;
  addresses: Array<ICustomerAddress>;
  disable_auto_group_change?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<ICustomerExtensionAttributes>;
  custom_attributes?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  is_subscribed: Scalars['Boolean'];
  phone?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  t1c_no?: Maybe<Scalars['String']>;
  t1c_phone?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  need_reaccept_consents: Scalars['Boolean'];
};

export type ICustomerAddress = {
  __typename?: 'CustomerAddress';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  telephone: Scalars['String'];
  building?: Maybe<Scalars['String']>;
  address_line: Scalars['String'];
  subdistrict: IPlace;
  district: IPlace;
  province: IPlace;
  postcode: Scalars['String'];
  address_name?: Maybe<Scalars['String']>;
  customer_address_type: IAddressType;
  full_tax_type?: Maybe<ITaxType>;
  vat_id?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  branch_id?: Maybe<Scalars['String']>;
  country_id: Scalars['String'];
  is_default_billing: Scalars['Boolean'];
  is_default_shipping: Scalars['Boolean'];
  city?: Maybe<Scalars['String']>;
  /** @deprecated Use `province.id` instead */
  region_id?: Maybe<Scalars['String']>;
  /** @deprecated Use `province` instead */
  region?: Maybe<IRegion>;
  /** @deprecated Use `parent.id` instead */
  customer_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use `is_default_billing` instead */
  default_billing?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use `is_default_shipping` instead */
  default_shipping?: Maybe<Scalars['Boolean']>;
  /** @deprecated This field is for compatibility with CustomerAddress only */
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** @deprecated All mandatory field is moved to the Address, only use this field when you have special requirement for address */
  custom_attributes?: Maybe<Scalars['JSON']>;
};

export type ICustomerAddressCustomAttributesInput = {
  tel_mobile?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  subdistrict_id?: Maybe<Scalars['String']>;
  subdistrict?: Maybe<Scalars['String']>;
  customer_address_type?: Maybe<Scalars['String']>;
  address_name?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  address_line?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
};

export type ICustomerAddressCustomAttributesResult = {
  __typename?: 'CustomerAddressCustomAttributesResult';
  tel_mobile?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  subdistrict_id?: Maybe<Scalars['String']>;
  subdistrict?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  customer_address_type?: Maybe<Scalars['String']>;
  address_name?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  address_line?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
};

export type ICustomerAddressResult = {
  __typename?: 'CustomerAddressResult';
  id?: Maybe<Scalars['Int']>;
  customer_id?: Maybe<Scalars['Int']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  vat_id?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  default_billing?: Maybe<Scalars['Boolean']>;
  default_shipping?: Maybe<Scalars['Boolean']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
};

export type ICustomerCouponInput = {
  campaignId: Scalars['Int'];
  customer_id?: Maybe<Scalars['Int']>;
  page: Scalars['Int'];
  batch: Scalars['Int'];
};

export type ICustomerExtensionAttributes = {
  __typename?: 'CustomerExtensionAttributes';
  is_subscribed?: Maybe<Scalars['Boolean']>;
};

export type IDeleteCouponResponse = {
  __typename?: 'DeleteCouponResponse';
  message?: Maybe<Scalars['String']>;
};

export type IDeleteCustomerAddress = {
  address_id?: Maybe<Scalars['Int']>;
};

export type IDeleteCustomerAddressResult = {
  __typename?: 'DeleteCustomerAddressResult';
  is_success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type IDeleteGiftWrapMessageInput = {
  isGuest: Scalars['Boolean'];
  cartId?: Maybe<Scalars['String']>;
};

export type IDeleteImageInput = {
  path: Scalars['String'];
};

export type IDeleteItemStatus = {
  __typename?: 'DeleteItemStatus';
  success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type IDeletePointResponse = {
  __typename?: 'DeletePointResponse';
  message?: Maybe<Scalars['String']>;
};

export type IDeliveryOptionItem = {
  __typename?: 'DeliveryOptionItem';
  shipping_method?: Maybe<Scalars['String']>;
  delivery_lead_time_message?: Maybe<Scalars['String']>;
  delivery_free_message?: Maybe<Scalars['String']>;
  shipping_fee?: Maybe<Scalars['String']>;
  shipping_method_label?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IDeliveryOptionItemExtensionAttributes>;
  is_out_of_service?: Maybe<Scalars['Boolean']>;
};

export type IDeliveryOptionItemExtensionAttributes = {
  __typename?: 'DeliveryOptionItemExtensionAttributes';
  is_pre_order?: Maybe<Scalars['Boolean']>;
};

export type IDeliveryStatusHistory = {
  __typename?: 'DeliveryStatusHistory';
  status?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
};

export type IDistrict = {
  __typename?: 'District';
  district_id?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  region_code?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  default_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  subdistrict?: Maybe<Array<Maybe<ISubDistrict>>>;
};

export type IDividerStyle = {
  __typename?: 'DividerStyle';
  height?: Maybe<Scalars['Int']>;
  color?: Maybe<Scalars['String']>;
  marginLeft?: Maybe<Scalars['Int']>;
  marginRight?: Maybe<Scalars['Int']>;
};

export type IEditCartItemExtensionAttribute = {
  allocated_store_id: Scalars['Int'];
  pickup_store?: Maybe<IPickupStoreInput>;
  quote_item_group: IQuoteItemGroup;
  shipping_assignment?: Maybe<IEditCartItemShippingAssignment>;
};

export type IEditCartItemInput = {
  qty: Scalars['Int'];
  quote_id: Scalars['String'];
  extension_attributes?: Maybe<IEditCartItemExtensionAttribute>;
};

export type IEditCartItemResponse = {
  __typename?: 'EditCartItemResponse';
  item_id?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  product_type?: Maybe<Scalars['String']>;
  quote_id?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<Scalars['JSON']>;
};

export type IEditCartItemShippingAssignment = {
  shipping_method?: Maybe<Scalars['String']>;
};

export type IEditCustomerAddress = {
  id: Scalars['ID'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  address_line?: Maybe<Scalars['String']>;
  subdistrict: IPlaceInput;
  district: IPlaceInput;
  province?: Maybe<IPlaceInput>;
  postcode?: Maybe<Scalars['String']>;
  address_name?: Maybe<Scalars['String']>;
  customer_address_type: IAddressType;
  full_tax_type?: Maybe<ITaxType>;
  vat_id?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  branch_id?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  is_default_billing?: Maybe<Scalars['Boolean']>;
  is_default_shipping?: Maybe<Scalars['Boolean']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
  /** deprecated, for backword compatability only */
  street?: Maybe<Array<Scalars['String']>>;
  /** deprecated, for backword compatability only */
  city?: Maybe<Scalars['String']>;
};

export type IEstimateShippingInput = {
  customer_id?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  region_id: Scalars['Int'];
  country_id: Scalars['String'];
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  telephone?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  default_shipping?: Maybe<Scalars['Boolean']>;
  custom_attributes?: Maybe<Array<Maybe<ICustomAttributesInput>>>;
};

export type IEstimateShippingMethods = {
  __typename?: 'EstimateShippingMethods';
  method?: Maybe<Scalars['String']>;
  method_caption?: Maybe<Scalars['String']>;
  method_code?: Maybe<Scalars['String']>;
  fastest_method?: Maybe<Scalars['String']>;
  fastest_method_caption?: Maybe<Scalars['String']>;
  free_method?: Maybe<Scalars['String']>;
  free_method_cost?: Maybe<Scalars['String']>;
  shipping_method?: Maybe<Array<Maybe<IShippingMethods>>>;
};

export type IExtensionAttributes = {
  __typename?: 'extensionAttributes';
  image_dir?: Maybe<Scalars['String']>;
  slides?: Maybe<Array<Maybe<ISlides>>>;
};

export type IFilterGroups = {
  filters?: Maybe<Array<Maybe<IFilters>>>;
};

export type IFilters = {
  field: Scalars['String'];
  value: Scalars['String'];
  conditionType?: Maybe<IConditionType>;
};

export type IFiltersQuery = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filterGroups?: Maybe<Array<Maybe<IFilterGroups>>>;
  sortOrders?: Maybe<Array<Maybe<ISortOrder>>>;
};

export enum IFiltersQueryField {
  Input = 'input',
}

export enum IFiltersQueryName {
  StoreFinder = 'store_finder',
}

export type IFiltersQueryValues = {
  field: IFiltersQueryField;
  value: Scalars['String'];
};

export type IFilterVouchers = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  filters?: Maybe<Array<Maybe<IVoucherListFilter>>>;
  sort?: Maybe<IVoucherListSort>;
  userId?: Maybe<Scalars['String']>;
};

export type IFreeItem = {
  __typename?: 'FreeItem';
  sku?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
  cart_id?: Maybe<Scalars['String']>;
  sales_rule_id?: Maybe<Scalars['Int']>;
  sales_rule_action_type?: Maybe<Scalars['Int']>;
  sales_rule_action_apply?: Maybe<Scalars['String']>;
  product?: Maybe<IProduct>;
};

export type IFreeItemAdded = {
  __typename?: 'FreeItemAdded';
  quote_id?: Maybe<Scalars['Int']>;
  item_id?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  sales_rule_id?: Maybe<Scalars['Int']>;
  qty?: Maybe<Scalars['Int']>;
  intent_qty?: Maybe<Scalars['Int']>;
  for_item_id?: Maybe<Scalars['Int']>;
  associated_item_id?: Maybe<Scalars['Int']>;
  product?: Maybe<IProduct>;
};

export type IFreeItemProduct = {
  __typename?: 'FreeItemProduct';
  sku?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
};

export type IFreeItemPromotion = {
  __typename?: 'FreeItemPromotion';
  freebies?: Maybe<Array<Maybe<IFreeItemProduct>>>;
  rule_id?: Maybe<Scalars['Int']>;
  simple_action?: Maybe<Scalars['String']>;
  coupon_code?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  from_date?: Maybe<Scalars['String']>;
  to_date?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_qty?: Maybe<Scalars['Int']>;
  discount_step?: Maybe<Scalars['Int']>;
};

export type IFreeShippingOffer = {
  __typename?: 'FreeShippingOffer';
  message?: Maybe<Scalars['String']>;
};

export enum IGender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export type IGetCustomerAddress = {
  address_id: Scalars['String'];
};

export type IGetRetailerByIdInput = {
  id: Scalars['Int'];
};

export type IGetRetailerByPostcodeInput = {
  postcode: Scalars['String'];
};

export type IGoogleTagManagerCookieExtensionAttribute = {
  __typename?: 'GoogleTagManagerCookieExtensionAttribute';
  identifier?: Maybe<Scalars['String']>;
  experiment_id?: Maybe<Scalars['String']>;
  cookie_variant_id?: Maybe<Scalars['String']>;
  request_header_value?: Maybe<Scalars['String']>;
};

export type IGuestCartResponse = {
  __typename?: 'GuestCartResponse';
  id: Scalars['ID'];
};

export type IHeaderProperty = {
  __typename?: 'HeaderProperty';
  text?: Maybe<Scalars['String']>;
  viewAll?: Maybe<Scalars['Boolean']>;
};

export type IImageLabelProperty = {
  __typename?: 'ImageLabelProperty';
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type IImageLabelStyle = {
  __typename?: 'ImageLabelStyle';
  backgroundColor?: Maybe<Scalars['String']>;
};

export type IImagePath = {
  __typename?: 'ImagePath';
  path: Scalars['String'];
};

export type IImageProperty = {
  __typename?: 'ImageProperty';
  url?: Maybe<Scalars['String']>;
};

export type IInputImagePath = {
  path: Scalars['String'];
};

export type IInstallmentBank = {
  __typename?: 'InstallmentBank';
  bank_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  bank_image?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['String']>;
  create?: Maybe<Scalars['String']>;
  update?: Maybe<Scalars['String']>;
};

export type IInstallmentPlan = IInstallmentPlanInterface & {
  __typename?: 'InstallmentPlan';
  installmentplan_id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  bank_id?: Maybe<Scalars['Int']>;
  bank?: Maybe<IInstallmentBank>;
  currency?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  merchant_rate?: Maybe<Scalars['String']>;
  customer_rate?: Maybe<Scalars['String']>;
  interest_type?: Maybe<Scalars['String']>;
  installment_type?: Maybe<Scalars['String']>;
  min_amount?: Maybe<Scalars['String']>;
  max_amount?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['String']>;
  valid_from?: Maybe<Scalars['String']>;
  valid_until?: Maybe<Scalars['String']>;
  create?: Maybe<Scalars['String']>;
};

export type IInstallmentPlanInterface = {
  installmentplan_id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  bank_id?: Maybe<Scalars['Int']>;
  bank?: Maybe<IInstallmentBank>;
  currency?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  merchant_rate?: Maybe<Scalars['String']>;
  customer_rate?: Maybe<Scalars['String']>;
  interest_type?: Maybe<Scalars['String']>;
  installment_type?: Maybe<Scalars['String']>;
  min_amount?: Maybe<Scalars['String']>;
  max_amount?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['String']>;
  valid_from?: Maybe<Scalars['String']>;
  valid_until?: Maybe<Scalars['String']>;
  create?: Maybe<Scalars['String']>;
};

export type IIsSalable = {
  __typename?: 'IsSalable';
  status?: Maybe<Scalars['Boolean']>;
};

export type IItemInput = {
  product_id: Scalars['Int'];
  store_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  qty: Scalars['String'];
};

export type ILazyRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  is_subscribed?: Maybe<Scalars['Boolean']>;
  storeId?: Maybe<Scalars['Int']>;
  orderId: Scalars['Int'];
  accept_consents?: Maybe<Array<IConsentType>>;
};

export type IListStorePickUp = {
  __typename?: 'ListStorePickUp';
  page_cur?: Maybe<Scalars['Int']>;
  page_total?: Maybe<Scalars['Int']>;
  is_result_from_google?: Maybe<Scalars['Boolean']>;
  store_list?: Maybe<Array<Maybe<IStoreItem>>>;
};

export type ILoginInput = {
  guestToken?: Maybe<Scalars['String']>;
  guest_token?: Maybe<Scalars['String']>;
  isReplaceCart?: Maybe<Scalars['Boolean']>;
  is_jwt?: Maybe<Scalars['Boolean']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ILoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
};

export type ILoginT1CInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type IMarketplaceInfo = {
  __typename?: 'MarketplaceInfo';
  seller_info?: Maybe<ISellerInfo>;
};

export type IMarketPlaceSeller = {
  __typename?: 'MarketPlaceSeller';
  /** seller name (product.custom_attributes_option[attribute_code = 'marketplace_seller']) */
  seller_id?: Maybe<Scalars['ID']>;
  seller?: Maybe<Scalars['String']>;
  seller_url_key?: Maybe<Scalars['String']>;
};

export type IMediaGalleryEntry = {
  __typename?: 'MediaGalleryEntry';
  disabled?: Maybe<Scalars['Boolean']>;
  file?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  media_type?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  extension_attributes?: Maybe<IMediaGalleryExtension>;
};

export type IMediaGalleryExtension = {
  __typename?: 'MediaGalleryExtension';
  video_content?: Maybe<IVideoContent>;
};

export type IMetadata = {
  __typename?: 'Metadata';
  row_id?: Maybe<Scalars['ID']>;
  entity_id?: Maybe<Scalars['ID']>;
  attribute_set_id?: Maybe<Scalars['ID']>;
  parent_id?: Maybe<Scalars['ID']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  children_count?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
  product_count?: Maybe<Scalars['String']>;
  is_anchor?: Maybe<Scalars['String']>;
};

export type IMultipleInfoInput = {
  cart_id?: Maybe<Scalars['String']>;
  payment_method: IPaymentMethodInput;
  billing_address?: Maybe<IAddressInput>;
};

export type IMultipleInformationFormat = {
  payment_information?: Maybe<Array<Scalars['JSON']>>;
};

export type IMutation = {
  __typename?: 'Mutation';
  addCartItem?: Maybe<IAddToCartResponse>;
  addCoupon?: Maybe<IAddCouponResponse>;
  addCustomerAddress?: Maybe<ICustomerAddress>;
  addGiftWrapMessage?: Maybe<IResponseMessage>;
  addReview?: Maybe<IReviewResponse>;
  assignCoupon?: Maybe<IAssignCouponResponse>;
  assignCouponCampaign?: Maybe<IAssignCouponCampaignResponse>;
  burnPoint?: Maybe<IBurnPointResponse>;
  changePassword?: Maybe<IChangePasswordResponse>;
  clearCacheBySku?: Maybe<IClearCacheBySkuResponse>;
  consent?: Maybe<ICustomer>;
  contactUs?: Maybe<IContactUsResponse>;
  createCard: ICard;
  createWishlist?: Maybe<IWishlist>;
  createWishlistItem?: Maybe<IWishlistItem>;
  deleteCard?: Maybe<Scalars['Boolean']>;
  deleteCartItem?: Maybe<IDeleteItemStatus>;
  deleteCoupon?: Maybe<IDeleteCouponResponse>;
  deleteCustomerAddress?: Maybe<IDeleteCustomerAddressResult>;
  deleteGiftWrapMessage?: Maybe<IResponseMessage>;
  deletePoint?: Maybe<IDeletePointResponse>;
  deleteReviewImage?: Maybe<Scalars['Boolean']>;
  deleteWishlist?: Maybe<Array<Maybe<Scalars['String']>>>;
  deleteWishlistItem?: Maybe<Array<Maybe<Scalars['String']>>>;
  editCartItem?: Maybe<IEditCartItemResponse>;
  editCustomerAddress?: Maybe<ICustomerAddress>;
  estimateShippingMethods?: Maybe<Array<Maybe<IShippingMethods>>>;
  facebookLogin?: Maybe<ILoginResponse>;
  forgotPassword?: Maybe<IResponseMessage>;
  hello: Scalars['String'];
  lazyRegister?: Maybe<IRegister>;
  login?: Maybe<ILoginResponse>;
  loginT1?: Maybe<ITheOneAccountInfo>;
  newsletter?: Maybe<Scalars['String']>;
  register?: Maybe<IRegister>;
  repayment: ISetPaymentInfoResponse;
  resetPassword?: Maybe<IResponseMessage>;
  restoreShippingAssignment?: Maybe<IResponseMessage>;
  setDefaultCard: ICard;
  setPaymentInformation?: Maybe<ISetPaymentInfoResponse>;
  setShippingInformation?: Maybe<IResponseMessage>;
  setShippingSlotHdl?: Maybe<IResponseMessage>;
  socialLogin?: Maybe<ILoginResponse>;
  subscribe?: Maybe<ISubscribe>;
  updateCustomer?: Maybe<ICustomer>;
  updateMultiplePaymentInformation?: Maybe<ISetMultiPaymentResponse>;
  updatePaymentInformation?: Maybe<ISetPaymentInfoResponse>;
  updateWishlist?: Maybe<IWishlist>;
  updateWishlistItem?: Maybe<IWishlistItem>;
  uploadReviewImage?: Maybe<IUploadImageResponse>;
  v2AddReview: IResponseMessage;
  v2CartAddCoupon?: Maybe<IV2AddCouponResponse>;
  v2CartAddGiftWrapping?: Maybe<IV2CartAddGiftWrappingResponse>;
  v2CartChangeGiftWrapping?: Maybe<IV2CartChangeGiftWrappingResponse>;
  v2CartChangeQuantity?: Maybe<IV2CartChangeQuantityResponse>;
  v2CartDeleteCoupon?: Maybe<IV2DeleteCouponResponse>;
  v2CartDeleteGiftWrapping?: Maybe<IV2CartDeleteGiftWrappingResponse>;
  v2CreateWishListItem?: Maybe<IV2WishlistGroupItem>;
  v2DeleteCartItem?: Maybe<IResponseMessage>;
  v2DeleteWishListItem?: Maybe<IV2DeleteResponseStatus>;
  v2SetShippingInformation?: Maybe<IResponseMessage>;
  v2SetValidatePin?: Maybe<IResponseMessage>;
  vipInterest?: Maybe<IVipInterestResponse>;
  vipNeedAssistance?: Maybe<IVipNeedAssistanceResponse>;
  vipValidate?: Maybe<IVipValidateResponse>;
};

export type IMutationAddCartItemArgs = {
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IAddToCartInput;
  cartId?: Maybe<Scalars['String']>;
};

export type IMutationAddCouponArgs = {
  coupon?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
};

export type IMutationAddCustomerAddressArgs = {
  input?: Maybe<ICreateCustomerAddress>;
};

export type IMutationAddGiftWrapMessageArgs = {
  input: IAddGiftWrapMessageInput;
};

export type IMutationAddReviewArgs = {
  storeCode?: Maybe<Scalars['String']>;
  input: IReviewInput;
};

export type IMutationAssignCouponArgs = {
  input: IAssignCouponInput;
};

export type IMutationAssignCouponCampaignArgs = {
  input: IAssignCouponCampaignInput;
};

export type IMutationBurnPointArgs = {
  points: Scalars['Float'];
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
};

export type IMutationChangePasswordArgs = {
  input?: Maybe<IChangePasswordInput>;
};

export type IMutationClearCacheBySkuArgs = {
  input?: Maybe<IClearCacheBySkuInput>;
};

export type IMutationConsentArgs = {
  input: IAcceptConsentInput;
};

export type IMutationContactUsArgs = {
  storeCode?: Maybe<Scalars['String']>;
  input: IContactUsInput;
};

export type IMutationCreateCardArgs = {
  cardInput: ICardInput;
  setDefault: Scalars['Boolean'];
};

export type IMutationCreateWishlistArgs = {
  input?: Maybe<ICreateWishlistInput>;
};

export type IMutationCreateWishlistItemArgs = {
  input?: Maybe<ICreateWishlistItemInput>;
  customer_id?: Maybe<Scalars['Int']>;
};

export type IMutationDeleteCardArgs = {
  cardId: Scalars['String'];
};

export type IMutationDeleteCartItemArgs = {
  guest?: Maybe<Scalars['String']>;
  item_id: Scalars['String'];
};

export type IMutationDeleteCouponArgs = {
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
};

export type IMutationDeleteCustomerAddressArgs = {
  input?: Maybe<IDeleteCustomerAddress>;
};

export type IMutationDeleteGiftWrapMessageArgs = {
  input: IDeleteGiftWrapMessageInput;
};

export type IMutationDeletePointArgs = {
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
};

export type IMutationDeleteReviewImageArgs = {
  input: IDeleteImageInput;
};

export type IMutationDeleteWishlistArgs = {
  id: Scalars['Int'];
};

export type IMutationDeleteWishlistItemArgs = {
  id: Scalars['Int'];
};

export type IMutationEditCartItemArgs = {
  id?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  item_id: Scalars['String'];
  input: IEditCartItemInput;
};

export type IMutationEditCustomerAddressArgs = {
  input?: Maybe<IEditCustomerAddress>;
};

export type IMutationEstimateShippingMethodsArgs = {
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IEstimateShippingInput;
};

export type IMutationFacebookLoginArgs = {
  social_id: Scalars['String'];
  customerToken?: Maybe<Scalars['String']>;
};

export type IMutationForgotPasswordArgs = {
  storeCode?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

export type IMutationLazyRegisterArgs = {
  input: ILazyRegisterInput;
};

export type IMutationLoginArgs = {
  input: ILoginInput;
};

export type IMutationLoginT1Args = {
  input?: Maybe<ILoginT1CInput>;
  isGuest?: Maybe<Scalars['Boolean']>;
  guestToken?: Maybe<Scalars['String']>;
};

export type IMutationNewsletterArgs = {
  email: Scalars['String'];
  optional?: Maybe<INewsletterOptional>;
};

export type IMutationRegisterArgs = {
  input: IRegisterInput;
};

export type IMutationRepaymentArgs = {
  incrementId: Scalars['String'];
  card?: Maybe<ICardInput>;
  saved_card?: Maybe<ISavedCardInput>;
};

export type IMutationResetPasswordArgs = {
  input?: Maybe<IResetPasswordInput>;
};

export type IMutationRestoreShippingAssignmentArgs = {
  input: IRestoreShippingAssignmentInput;
};

export type IMutationSetDefaultCardArgs = {
  cardId: Scalars['String'];
};

export type IMutationSetPaymentInformationArgs = {
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IPaymentInformationInput;
};

export type IMutationSetShippingInformationArgs = {
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: ISetShippingInformationInput;
};

export type IMutationSetShippingSlotHdlArgs = {
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: ISetShippingSlotHdlInput;
};

export type IMutationSocialLoginArgs = {
  input: ISocialLoginInput;
};

export type IMutationSubscribeArgs = {
  email: Scalars['String'];
};

export type IMutationUpdateCustomerArgs = {
  input?: Maybe<IUpdateInputCustomer>;
};

export type IMutationUpdateMultiplePaymentInformationArgs = {
  input: IMultipleInformationFormat;
};

export type IMutationUpdatePaymentInformationArgs = {
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IPaymentInformationInput;
};

export type IMutationUpdateWishlistArgs = {
  input?: Maybe<IUpdateWishlistInput>;
};

export type IMutationUpdateWishlistItemArgs = {
  input?: Maybe<IUpdateWishlistItemInput>;
};

export type IMutationUploadReviewImageArgs = {
  input: IUploadImageInput;
};

export type IMutationV2AddReviewArgs = {
  input?: Maybe<IV2ReviewInput>;
};

export type IMutationV2CartAddCouponArgs = {
  input: IV2AddCouponInput;
};

export type IMutationV2CartAddGiftWrappingArgs = {
  input: IV2CartAddGiftWrappingInput;
};

export type IMutationV2CartChangeGiftWrappingArgs = {
  input: IV2CartAddGiftWrappingInput;
};

export type IMutationV2CartChangeQuantityArgs = {
  input: IV2ChangeQtyInput;
};

export type IMutationV2CartDeleteCouponArgs = {
  input?: Maybe<IV2DeleteCouponInput>;
};

export type IMutationV2CartDeleteGiftWrappingArgs = {
  input?: Maybe<IV2DeleteGiftWrappingInput>;
};

export type IMutationV2CreateWishListItemArgs = {
  input?: Maybe<IV2CreateWishListInput>;
};

export type IMutationV2DeleteCartItemArgs = {
  input: IV2DeleteCartItemInput;
};

export type IMutationV2DeleteWishListItemArgs = {
  id: Scalars['Int'];
};

export type IMutationV2SetShippingInformationArgs = {
  cartId?: Maybe<Scalars['String']>;
  input: IV2SetShippingInformationInput;
};

export type IMutationV2SetValidatePinArgs = {
  cartId?: Maybe<Scalars['String']>;
  input: IV2SetValidatePinInput;
};

export type IMutationVipInterestArgs = {
  input: IVipInterestInput;
};

export type IMutationVipNeedAssistanceArgs = {
  input: IVipNeedAssistanceInput;
};

export type IMutationVipValidateArgs = {
  input: IVipValidateInput;
};

export type INewsletter = {
  __typename?: 'Newsletter';
  result?: Maybe<Scalars['String']>;
};

export type INewsletterOptional = {
  gender?: Maybe<IGender>;
};

export type IOneColumnHorizontalCarouselProperty = {
  __typename?: 'OneColumnHorizontalCarouselProperty';
  title?: Maybe<Scalars['String']>;
  maxItemsSize?: Maybe<Scalars['Int']>;
  minimumVisible?: Maybe<Scalars['Int']>;
};

export type IOpenHourExtension = {
  __typename?: 'OpenHourExtension';
  start_time?: Maybe<Scalars['String']>;
  end_time?: Maybe<Scalars['String']>;
};

export type IOrder = {
  __typename?: 'Order';
  billing_address?: Maybe<IBillingAddress>;
  children?: Maybe<Array<IOrder>>;
  coupon_code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  customer_email?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_description?: Maybe<Scalars['String']>;
  entity_id?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<IOrderExtensionAttributes>;
  grand_total?: Maybe<Scalars['Float']>;
  increment_id?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<IOrderItem>>>;
  order_currency_code?: Maybe<Scalars['String']>;
  payment?: Maybe<IPayment>;
  promotion_code?: Maybe<Scalars['String']>;
  shipment?: Maybe<Array<IShipmentTrackingItem>>;
  shipping_description?: Maybe<Scalars['String']>;
  shipping_incl_tax?: Maybe<Scalars['Float']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  status_histories?: Maybe<Array<Maybe<IStatusHistories>>>;
  subtotal?: Maybe<Scalars['Float']>;
  subtotal_incl_tax?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  total_due?: Maybe<Scalars['Float']>;
};

export type IOrderExtensionAttributes = {
  __typename?: 'OrderExtensionAttributes';
  shipping_assignments?: Maybe<Array<Maybe<IShippingAssignment>>>;
  payment_method_label?: Maybe<Scalars['String']>;
  order_status?: Maybe<Scalars['String']>;
  delivery_status_history?: Maybe<Array<Maybe<IDeliveryStatusHistory>>>;
  mom_status_reason?: Maybe<Scalars['String']>;
  retailer?: Maybe<IStore>;
  shipping_slot?: Maybe<IShippingSlot>;
  t1c_redeem?: Maybe<IT1cRedeem>;
  t1c_earn_card_number?: Maybe<Scalars['String']>;
  t1c_earn_points_estimate?: Maybe<Scalars['String']>;
  t1c_earn_conversion_rate?: Maybe<Scalars['String']>;
  gift_cards_amount?: Maybe<Scalars['Int']>;
  order_children_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** @deprecated Use Extenstions orderWithOrderChildrenItems with field `Order.children` instead */
  order_children_items?: Maybe<Array<Maybe<IOrder>>>;
  coupon?: Maybe<ICouponDiscount>;
  keep_at_store_hours?: Maybe<Scalars['Int']>;
  shipping_method_label?: Maybe<Scalars['String']>;
  order_package_status?: Maybe<Array<Maybe<IOrderPackageStatus>>>;
  bts_order_status?: Maybe<Array<IBtsOrderStatus>>;
  pre_order_message?: Maybe<Scalars['String']>;
  is_pre_order?: Maybe<Scalars['Boolean']>;
};

export type IOrderFilter = {
  field?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type IOrderItem = {
  __typename?: 'OrderItem';
  product_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['Int']>;
  qty_ordered?: Maybe<Scalars['Float']>;
  qty_canceled?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  price_incl_tax?: Maybe<Scalars['Float']>;
  row_total?: Maybe<Scalars['Float']>;
  row_total_incl_tax?: Maybe<Scalars['Float']>;
  tax_amount?: Maybe<Scalars['Float']>;
  tax_canceled?: Maybe<Scalars['Float']>;
  base_discount_amount?: Maybe<Scalars['Float']>;
  base_discount_invoiced?: Maybe<Scalars['Float']>;
  base_discount_tax_compensation_amount?: Maybe<Scalars['Float']>;
  base_original_price?: Maybe<Scalars['Float']>;
  base_price?: Maybe<Scalars['Float']>;
  base_price_incl_tax?: Maybe<Scalars['Float']>;
  base_row_invoiced?: Maybe<Scalars['Float']>;
  base_row_total?: Maybe<Scalars['Float']>;
  base_row_total_incl_tax?: Maybe<Scalars['Float']>;
  base_tax_amount?: Maybe<Scalars['Float']>;
  base_tax_invoiced?: Maybe<Scalars['Float']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_invoiced?: Maybe<Scalars['Float']>;
  discount_percent?: Maybe<Scalars['Float']>;
  discount_tax_compensation_amount?: Maybe<Scalars['Float']>;
  discount_tax_compensation_canceled?: Maybe<Scalars['Float']>;
  original_price?: Maybe<Scalars['Float']>;
  store_code?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  small_image?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<IProductsCustomAttributes>;
  product?: Maybe<IProduct>;
  extension_attributes?: Maybe<IOrderItemExtensionAttributes>;
};

export type IOrderItemExtensionAttributes = {
  __typename?: 'OrderItemExtensionAttributes';
  line_items?: Maybe<Array<IOrderLineItem>>;
  marketplace_info?: Maybe<IMarketplaceInfo>;
};

export type IOrderLineItem = {
  __typename?: 'OrderLineItem';
  entity_id?: Maybe<Scalars['Int']>;
  order_id?: Maybe<Scalars['Int']>;
  line_id?: Maybe<Scalars['Int']>;
  line_number?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<IOrderLineItemExtensionAttributes>;
};

export type IOrderLineItemExtensionAttributes = {
  __typename?: 'OrderLineItemExtensionAttributes';
  status: Scalars['String'];
  package_id?: Maybe<Scalars['String']>;
  carrier?: Maybe<Scalars['String']>;
  tracking_number?: Maybe<Scalars['String']>;
  tracking_link?: Maybe<Scalars['String']>;
};

export type IOrderPackageStatus = {
  __typename?: 'OrderPackageStatus';
  shipment_provider?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  track_url?: Maybe<Scalars['String']>;
  track_number?: Maybe<Scalars['String']>;
  sold_by?: Maybe<Scalars['String']>;
};

export type IOrders = {
  __typename?: 'Orders';
  items?: Maybe<Array<Maybe<IOrder>>>;
  total_count?: Maybe<Scalars['Int']>;
};

export type IOrderSearchCriteria = {
  filters?: Maybe<Array<Maybe<IOrderFilter>>>;
  sortOrders?: Maybe<Array<Maybe<IOrderSort>>>;
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type IOrderSearchResult = {
  __typename?: 'OrderSearchResult';
  orders?: Maybe<Array<Maybe<IOrder>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type IOrderSort = {
  field?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
};

export type IP2c2pCreditCardPromotion = {
  __typename?: 'P2c2pCreditCardPromotion';
  promotion_id?: Maybe<Scalars['String']>;
  bank?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  card_image?: Maybe<Scalars['String']>;
  card_type?: Maybe<Scalars['String']>;
  card_name?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  promotion_code?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  ipp_plan?: Maybe<Scalars['String']>;
  bank_color?: Maybe<Scalars['String']>;
  bank_icon?: Maybe<Scalars['String']>;
  simple_action?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['String']>;
};

export type IP2c2pPaymentAgent = {
  __typename?: 'P2c2pPaymentAgent';
  agent_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  channel?: Maybe<Scalars['String']>;
  agent_image?: Maybe<Scalars['String']>;
};

export type IP2c2pPaymentOption = {
  __typename?: 'P2c2pPaymentOption';
  payment?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type IPayment = {
  __typename?: 'Payment';
  method?: Maybe<Scalars['String']>;
};

export type IPaymentDolfinDetail = {
  __typename?: 'PaymentDolfinDetail';
  qrValue?: Maybe<Scalars['String']>;
  qrCodeImage?: Maybe<Scalars['String']>;
};

export type IPaymentDolfinResponse = {
  __typename?: 'PaymentDolfinResponse';
  isSuccess?: Maybe<Scalars['Boolean']>;
  incrementId?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  failReason?: Maybe<Scalars['Int']>;
  detail?: Maybe<IPaymentDolfinDetail>;
};

export type IPaymentExtensionAttributes = {
  __typename?: 'PaymentExtensionAttributes';
  is_payment_promotion_locked: Scalars['Boolean'];
  company_credit_available?: Maybe<Scalars['Boolean']>;
  company_credit_message?: Maybe<Scalars['String']>;
  p2c2p_payment_options?: Maybe<Array<Maybe<IP2c2pPaymentOption>>>;
  p2c2p_installment_unavailable_message?: Maybe<Scalars['String']>;
  p2c2p_payment_agents?: Maybe<Array<Maybe<IP2c2pPaymentAgent>>>;
  p2c2p_credit_card_promotions?: Maybe<Array<Maybe<IP2c2pCreditCardPromotion>>>;
  surcharge?: Maybe<Scalars['String']>;
};

export type IPaymentFormPayload = {
  __typename?: 'PaymentFormPayload';
  paymentRequest: Scalars['String'];
};

export type IPaymentInformationInput = {
  accept_consents?: Maybe<Array<IConsentType>>;
  billing_address?: Maybe<IAddressInput>;
  card?: Maybe<ICardInput>;
  email?: Maybe<Scalars['String']>;
  payment_method: IPaymentMethodInput;
  payment_service_methods?: Maybe<IPaymentServiceKey>;
  remark?: Maybe<Scalars['String']>;
  saved_card?: Maybe<ISavedCardInput>;
  substitution?: Maybe<Scalars['String']>;
};

export type IPaymentInformations = {
  __typename?: 'PaymentInformations';
  payment_methods?: Maybe<Array<Maybe<IPaymentMethod>>>;
  extension_attributes?: Maybe<IPaymentExtensionAttributes>;
  installment_plans?: Maybe<Array<IPaymentServiceInstallPlans>>;
};

export type IPaymentMethod = {
  __typename?: 'PaymentMethod';
  code?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type IPaymentMethodExtensionAttributesInput = {
  admin_username?: Maybe<Scalars['String']>;
  apm_agent_code?: Maybe<Scalars['String']>;
  apm_channel_code?: Maybe<Scalars['String']>;
  approval_email?: Maybe<Scalars['String']>;
  approval_message?: Maybe<Scalars['String']>;
  card_code?: Maybe<Scalars['String']>;
  card_issuer?: Maybe<Scalars['String']>;
  channel?: Maybe<Scalars['String']>;
  company_id?: Maybe<Scalars['Int']>;
  customer_email?: Maybe<Scalars['String']>;
  customer_name?: Maybe<Scalars['String']>;
  customer_phone?: Maybe<Scalars['String']>;
  gcl_id?: Maybe<Scalars['String']>;
  ofm_need_callback?: Maybe<Scalars['Int']>;
  ofm_po_filename?: Maybe<Scalars['String']>;
  ofm_po_no?: Maybe<Scalars['String']>;
  ofm_po_ref?: Maybe<Scalars['String']>;
  promotion_id?: Maybe<Scalars['String']>;
  request_tax_invoice?: Maybe<Scalars['Boolean']>;
  t1c_earn_card_number?: Maybe<Scalars['String']>;
  utm_campaign?: Maybe<Scalars['String']>;
  utm_content?: Maybe<Scalars['String']>;
  utm_medium?: Maybe<Scalars['String']>;
  utm_source?: Maybe<Scalars['String']>;
};

export type IPaymentMethodInput = {
  extension_attributes?: Maybe<IPaymentMethodExtensionAttributesInput>;
  installment_plan_id?: Maybe<Scalars['String']>;
  method: Scalars['String'];
};

export type IPaymentOffileDetail = {
  __typename?: 'PaymentOffileDetail';
  orderId?: Maybe<Scalars['String']>;
  paymentCode?: Maybe<Scalars['String']>;
  referenceCode?: Maybe<Scalars['String']>;
  agentpaymentCode?: Maybe<Scalars['String']>;
  paymentExpiry?: Maybe<Scalars['String']>;
  instructionUrl?: Maybe<Scalars['String']>;
  barcodeValue?: Maybe<Scalars['String']>;
  barcodeImage?: Maybe<Scalars['String']>;
  qrCodeImage?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  currencyCode?: Maybe<Scalars['String']>;
  merchantName?: Maybe<Scalars['String']>;
  amountString?: Maybe<Scalars['String']>;
};

export type IPaymentOfflineResponse = {
  __typename?: 'PaymentOfflineResponse';
  isSuccess?: Maybe<Scalars['Boolean']>;
  responseCode?: Maybe<Scalars['String']>;
  detail?: Maybe<IPaymentOffileDetail>;
  key?: Maybe<Scalars['String']>;
};

export type IPaymentRequestForm = {
  __typename?: 'PaymentRequestForm';
  url: Scalars['String'];
  payload: IPaymentFormPayload;
};

export type IPaymentServiceInstallPlans = IInstallmentPlanInterface & {
  __typename?: 'PaymentServiceInstallPlans';
  installmentplan_id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  bank_id?: Maybe<Scalars['Int']>;
  bank?: Maybe<IInstallmentBank>;
  currency?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  merchant_rate?: Maybe<Scalars['String']>;
  customer_rate?: Maybe<Scalars['String']>;
  interest_type?: Maybe<Scalars['String']>;
  installment_type?: Maybe<Scalars['String']>;
  min_amount?: Maybe<Scalars['String']>;
  max_amount?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['String']>;
  valid_from?: Maybe<Scalars['String']>;
  valid_until?: Maybe<Scalars['String']>;
  create?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IPaymentServiceInstallPlansExtensionAttributes>;
};

export type IPaymentServiceInstallPlansExtensionAttributes = {
  __typename?: 'PaymentServiceInstallPlansExtensionAttributes';
  p2c2p_ipp_amount_per_month?: Maybe<Scalars['String']>;
};

export enum IPaymentServiceKey {
  PaymentServiceFullpayment = 'payment_service_fullpayment',
  PaymentServiceInstallment = 'payment_service_installment',
  PaymentServiceBankTransfer = 'payment_service_bank_transfer',
  PaymentServiceDolfin = 'payment_service_dolfin',
}

export type IPaymentStatusResponse = {
  __typename?: 'PaymentStatusResponse';
  is_success: Scalars['Boolean'];
  response_code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
};

export type IPickupLocation = {
  __typename?: 'PickupLocation';
  id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  display_order?: Maybe<Scalars['String']>;
  address_line1?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  long?: Maybe<Scalars['String']>;
  pickup_fee?: Maybe<Scalars['String']>;
  pos_handling_fee?: Maybe<Scalars['String']>;
  opening_hours?: Maybe<Array<Maybe<Scalars['String']>>>;
  extension_attributes?: Maybe<IPickupLocationExtension>;
};

export type IPickupLocationExtension = {
  __typename?: 'PickupLocationExtension';
  additional_address_info?: Maybe<IAdditionalAddressInfo>;
  available_services?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IPickUpStore = {
  __typename?: 'PickUpStore';
  source_item?: Maybe<IPickUpStoreSourceItem>;
  store?: Maybe<IStore>;
};

export type IPickupStoreInput = {
  store_id: Scalars['ID'];
};

export type IPickupStoreLocation = {
  __typename?: 'PickupStoreLocation';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  storeCode?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  address?: Maybe<IPickupStoreLocationAddress>;
  openingHours?: Maybe<Array<Maybe<IPickupStoreLocationOpeningHour>>>;
  image?: Maybe<Scalars['String']>;
  allowPickAtStore?: Maybe<Scalars['Boolean']>;
  isDisplayAsStoreInformation?: Maybe<Scalars['Boolean']>;
  salableItems?: Maybe<Array<Maybe<IPickupStoreLocationSalableItem>>>;
  storePickup?: Maybe<IPickupStoreLocationStorePickup>;
  additionalText?: Maybe<IPickupStoreLocationAdditionalText>;
  cutOffTime?: Maybe<Scalars['String']>;
};

export type IPickupStoreLocationAdditionalText = {
  __typename?: 'PickupStoreLocationAdditionalText';
  methodCode?: Maybe<Scalars['String']>;
  methodLabelCode?: Maybe<Scalars['String']>;
  timeValue?: Maybe<Scalars['Int']>;
  timeUnit?: Maybe<Scalars['String']>;
  datetime?: Maybe<Scalars['String']>;
  totalAvailable?: Maybe<Scalars['Int']>;
  totalOrdered?: Maybe<Scalars['Int']>;
};

export type IPickupStoreLocationAddress = {
  __typename?: 'PickupStoreLocationAddress';
  streetNumber?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['Int']>;
  subDistrict?: Maybe<Scalars['String']>;
  subDistrictId?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  regionId?: Maybe<Scalars['Int']>;
  postcode?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
};

export type IPickupStoreLocationFilter = {
  keyword?: Maybe<Scalars['String']>;
  location?: Maybe<IPickupStoreLocationFilterLatLng>;
  input?: Maybe<IEstimateShippingInput>;
};

export type IPickupStoreLocationFilterLatLng = {
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type IPickupStoreLocationOpeningHour = {
  __typename?: 'PickupStoreLocationOpeningHour';
  day?: Maybe<Scalars['String']>;
  openTime?: Maybe<Scalars['String']>;
  closeTime?: Maybe<Scalars['String']>;
};

export type IPickupStoreLocationSalableItem = {
  __typename?: 'PickupStoreLocationSalableItem';
  sku?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
};

export type IPickupStoreLocationStorePickup = {
  __typename?: 'PickupStoreLocationStorePickup';
  stockId?: Maybe<Scalars['Int']>;
  allowIspu?: Maybe<Scalars['Boolean']>;
  allowSts?: Maybe<Scalars['Boolean']>;
};

export type IPickUpStoreMulti = {
  __typename?: 'PickUpStoreMulti';
  sku?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Maybe<IPickUpStore>>>;
};

export type IPickupStoresLocation = {
  __typename?: 'PickupStoresLocation';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  store_code?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  address?: Maybe<IPickupStoresLocationAddress>;
  extension_attributes?: Maybe<IPickupStoresLocationExtensionAttributes>;
  distance?: Maybe<IPickupStoresLocationDistance>;
};

export type IPickupStoresLocationAdditionalText = {
  __typename?: 'PickupStoresLocationAdditionalText';
  method_code?: Maybe<Scalars['String']>;
  method_label_code?: Maybe<Scalars['String']>;
  time_value?: Maybe<Scalars['Int']>;
  time_unit?: Maybe<Scalars['String']>;
  date_time?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IPickupStoresLocationAdditionalTextExtensionAttributes>;
};

export type IPickupStoresLocationAdditionalTextExtensionAttributes = {
  __typename?: 'PickupStoresLocationAdditionalTextExtensionAttributes';
  additional_text_variable?: Maybe<IPickupStoresLocationAdditionalTextVariable>;
};

export type IPickupStoresLocationAdditionalTextVariable = {
  __typename?: 'PickupStoresLocationAdditionalTextVariable';
  total_available?: Maybe<Scalars['Int']>;
  total_ordered?: Maybe<Scalars['Int']>;
};

export type IPickupStoresLocationAddress = {
  __typename?: 'PickupStoresLocationAddress';
  street_number?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['Int']>;
  sub_district?: Maybe<Scalars['String']>;
  sub_district_id?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  post_code?: Maybe<Scalars['String']>;
  contact_number?: Maybe<Scalars['String']>;
  country_code?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
};

export type IPickupStoresLocationDistance = {
  __typename?: 'PickupStoresLocationDistance';
  text?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type IPickupStoresLocationExtensionAttributes = {
  __typename?: 'PickupStoresLocationExtensionAttributes';
  opening_hours?: Maybe<Array<Maybe<IPickupStoresLocationOpeningHours>>>;
  store_pickup?: Maybe<IPickupStoresLocationStorePickup>;
  stock_id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  allow_pick_at_store?: Maybe<Scalars['Boolean']>;
  display_as_store_information?: Maybe<Scalars['Boolean']>;
  salable_items?: Maybe<Array<Maybe<IPickupStoresLocationSalableItems>>>;
  additional_text?: Maybe<IPickupStoresLocationAdditionalText>;
  cut_off_time?: Maybe<Scalars['String']>;
};

export type IPickupStoresLocationOpeningHours = {
  __typename?: 'PickupStoresLocationOpeningHours';
  day?: Maybe<Scalars['String']>;
  open?: Maybe<Scalars['String']>;
  close?: Maybe<Scalars['String']>;
};

export type IPickupStoresLocationSalableItems = {
  __typename?: 'PickupStoresLocationSalableItems';
  sku?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
};

export type IPickupStoresLocationStorePickup = {
  __typename?: 'PickupStoresLocationStorePickup';
  stock_id?: Maybe<Scalars['Int']>;
  allow_ispu?: Maybe<Scalars['Boolean']>;
  allow_sts?: Maybe<Scalars['String']>;
};

export type IPickUpStoreSourceItem = {
  __typename?: 'PickUpStoreSourceItem';
  sku?: Maybe<Scalars['String']>;
  source_code?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
};

export type IPlace = {
  __typename?: 'Place';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type IPlaceInput = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type IPostcodeResult = {
  __typename?: 'PostcodeResult';
  postcode?: Maybe<Scalars['String']>;
};

export type IPricePerStoreInput = {
  sku: Scalars['String'];
  retailerId: Scalars['Int'];
};

export type IProduct = {
  __typename?: 'Product';
  id?: Maybe<Scalars['String']>;
  attribute_set_id?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  breadcrumbs?: Maybe<Array<Maybe<IBreadcrumbs>>>;
  status?: Maybe<Scalars['Int']>;
  visibility?: Maybe<Scalars['Int']>;
  type_id?: Maybe<IProductType>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  product_links?: Maybe<Array<Maybe<IProductLink>>>;
  options?: Maybe<Array<Maybe<IProductOption>>>;
  media_gallery_entries?: Maybe<Array<Maybe<IMediaGalleryEntry>>>;
  tier_prices?: Maybe<Array<Maybe<IProductsTierPrices>>>;
  image?: Maybe<Scalars['String']>;
  small_image?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  short_description?: Maybe<Scalars['String']>;
  special_price?: Maybe<Scalars['Float']>;
  special_from_date?: Maybe<Scalars['String']>;
  special_to_date?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  meta_keyword?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  marketplace_product_type_option?: Maybe<Scalars['String']>;
  marketplace_seller_option?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
  custom_attributes_option?: Maybe<Scalars['JSON']>;
  extension_attributes?: Maybe<IProductsExtensionAttributes>;
  cart_price_rule_overlays?: Maybe<Array<IProductsCartPriceRuleOverlay>>;
  /** configurable product children */
  configurable_product_items?: Maybe<Array<Maybe<IProduct>>>;
  /** min price of configurable children */
  price_min?: Maybe<Scalars['Float']>;
  /** max price of configurable children */
  price_max?: Maybe<Scalars['Float']>;
  /** min sale price calculate from special price and price */
  sale_price_min?: Maybe<Scalars['Float']>;
  /** max sale price calculate from special price and price */
  sale_price_max?: Maybe<Scalars['Float']>;
  /** tags (product.custom_attributes.product_tags) */
  product_tags?: Maybe<Scalars['String']>;
  /** metket place feature */
  marketplace?: Maybe<IMarketPlaceSeller>;
  isReview?: Maybe<Scalars['Boolean']>;
  online_salable?: Maybe<Scalars['Boolean']>;
  offline_salable?: Maybe<Scalars['Boolean']>;
};

export type IProductCustomAttributesArgs = {
  filter?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IProductCustomAttributesOptionArgs = {
  filter?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IProductConfigurableItemOption = {
  option_id?: Maybe<Scalars['ID']>;
  option_value?: Maybe<Scalars['Int']>;
};

export type IProductConfigurableOption = {
  extension_attributes?: Maybe<IProductOptionExtension>;
};

export type IProductItem = {
  __typename?: 'ProductItem';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  brand_name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  final_price?: Maybe<Scalars['Float']>;
  original_price?: Maybe<Scalars['Float']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
};

export type IProductLink = {
  __typename?: 'ProductLink';
  sku?: Maybe<Scalars['String']>;
  link_type?: Maybe<IProductLinkType>;
  linked_product_sku?: Maybe<Scalars['String']>;
  linked_product_type?: Maybe<IProductType>;
  position?: Maybe<Scalars['Int']>;
  product?: Maybe<IProduct>;
};

export enum IProductLinkType {
  Related = 'related',
  Crosssell = 'crosssell',
  Upsell = 'upsell',
}

export type IProductOption = {
  __typename?: 'ProductOption';
  value?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type IProductOptionExtension = {
  configurable_item_options?: Maybe<Array<Maybe<IProductConfigurableItemOption>>>;
};

export type IProductOptionsExtensionAttributes = {
  __typename?: 'ProductOptionsExtensionAttributes';
  label?: Maybe<Scalars['String']>;
  frontend_value?: Maybe<Scalars['String']>;
  frontend_type?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type IProductOptionsValues = {
  __typename?: 'ProductOptionsValues';
  value_index?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<IProductOptionsExtensionAttributes>;
};

export type IProductProperty = {
  __typename?: 'ProductProperty';
  sku?: Maybe<Scalars['String']>;
};

export type IProductsCartPriceRuleOverlay = {
  __typename?: 'ProductsCartPriceRuleOverlay';
  id: Scalars['ID'];
  overlay_image?: Maybe<Scalars['String']>;
  display_priority?: Maybe<Scalars['Int']>;
};

export type IProductsCategory = {
  __typename?: 'ProductsCategory';
  category_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
  is_parent?: Maybe<Scalars['Boolean']>;
};

export type IProductsCcPromotionAttributes = {
  __typename?: 'ProductsCcPromotionAttributes';
  discount?: Maybe<Scalars['Float']>;
  bank_icon?: Maybe<Scalars['String']>;
  bank_color?: Maybe<Scalars['String']>;
  sales_rule_id?: Maybe<Scalars['String']>;
  promotion_id?: Maybe<Scalars['String']>;
};

export type IProductScrollProperty = {
  __typename?: 'ProductScrollProperty';
  maxItemsSize?: Maybe<Scalars['Int']>;
  minimumVisible?: Maybe<Scalars['Int']>;
};

export type IProductsCustomAttributes = {
  __typename?: 'ProductsCustomAttributes';
  brand_name?: Maybe<Scalars['String']>;
  free_gift?: Maybe<Scalars['String']>;
  free_delivery?: Maybe<Scalars['String']>;
  free_text_flag?: Maybe<Scalars['String']>;
  free_text_on_top?: Maybe<Scalars['String']>;
  badge?: Maybe<Scalars['String']>;
  show_badge?: Maybe<Scalars['String']>;
  free_installation?: Maybe<Scalars['String']>;
  product_tags?: Maybe<Scalars['String']>;
  related_to?: Maybe<Scalars['String']>;
  home_branch?: Maybe<Scalars['String']>;
  attached_pdf_file?: Maybe<Scalars['String']>;
  barcode?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  shipping_methods?: Maybe<Scalars['String']>;
  payment_methods?: Maybe<Scalars['String']>;
};

export type IProductSearch = {
  __typename?: 'ProductSearch';
  filters?: Maybe<Array<Maybe<IProductsFilter>>>;
  products?: Maybe<Array<Maybe<IProduct>>>;
  sorting?: Maybe<Array<Maybe<IProductsSorting>>>;
  total_count?: Maybe<Scalars['Int']>;
};

export type IProductsExtensionAttributes = {
  __typename?: 'ProductsExtensionAttributes';
  ispu_salable?: Maybe<Scalars['Boolean']>;
  free_shipping_amount?: Maybe<Scalars['String']>;
  category_links?: Maybe<Array<Maybe<Scalars['String']>>>;
  category_paths?: Maybe<Array<Maybe<ICategoryPath>>>;
  stock_item?: Maybe<IStockItem>;
  overall_rating?: Maybe<IProductsExtensionAttributesOverallRating>;
  reviews?: Maybe<Array<Maybe<IProductsExtensionAttributesReviews>>>;
  specification_attributes?: Maybe<Array<Maybe<IProductsSpecialAttributes>>>;
  brand?: Maybe<IProductsExtensionAttributesBrand>;
  t1c_redeemable_points?: Maybe<Array<Maybe<Scalars['String']>>>;
  t1c_earn_points_estimate?: Maybe<Array<Maybe<Scalars['String']>>>;
  installment_plans?: Maybe<Array<Maybe<IInstallmentPlan>>>;
  cc_promotions?: Maybe<Array<Maybe<IProductsCcPromotionAttributes>>>;
  salable?: Maybe<Scalars['Boolean']>;
  seller_url_key?: Maybe<Scalars['String']>;
  overlays?: Maybe<Array<Maybe<IProductsExtensionAttributesOverlay>>>;
  configurable_product_links?: Maybe<Array<Maybe<Scalars['String']>>>;
  configurable_product_options?: Maybe<Array<Maybe<IConfigurableProductOptions>>>;
  size_map?: Maybe<IProductSizeMap>;
  size_maps?: Maybe<Array<Maybe<IProductSizeMap>>>;
  suggest_promotions?: Maybe<Array<IProductsExtensionAttributesSuggestPromotions>>;
  flash_sale_price?: Maybe<Array<Maybe<IProductsExtensionAttributesFlashSalePrice>>>;
};

export type IProductsExtensionAttributesBrand = {
  __typename?: 'ProductsExtensionAttributesBrand';
  meta_title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  website_ids?: Maybe<Array<Maybe<Scalars['String']>>>;
  extension_attributes?: Maybe<IProductsExtensionAttributesBrandExtensionAttributes>;
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
  brand_id?: Maybe<Scalars['Int']>;
  url_key?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  brand_additional_products?: Maybe<Array<Maybe<Scalars['String']>>>;
  attribute_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['Int']>;
  is_featured?: Maybe<Scalars['String']>;
  attribute_code?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
};

export type IProductsExtensionAttributesBrandExtensionAttributes = {
  __typename?: 'ProductsExtensionAttributesBrandExtensionAttributes';
  product_name_special?: Maybe<Scalars['Boolean']>;
  hide_product_original_price?: Maybe<Scalars['Boolean']>;
  hide_t1c_redeemable_amount?: Maybe<Scalars['Boolean']>;
  allow_product_review?: Maybe<Scalars['Boolean']>;
  product_count?: Maybe<Scalars['Int']>;
  parent_category?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  banners?: Maybe<Array<Maybe<Scalars['String']>>>;
  product_collections?: Maybe<Array<Maybe<Scalars['String']>>>;
  menu_css?: Maybe<Scalars['String']>;
  content_css?: Maybe<Scalars['String']>;
  brand_image_url?: Maybe<Scalars['String']>;
};

export type IProductsExtensionAttributesFlashSalePrice = {
  __typename?: 'ProductsExtensionAttributesFlashSalePrice';
  start_date: Scalars['String'];
  end_date: Scalars['String'];
  special_price: Scalars['String'];
};

export type IProductsExtensionAttributesOverallRating = {
  __typename?: 'ProductsExtensionAttributesOverallRating';
  total_vote?: Maybe<Scalars['Int']>;
  one_star?: Maybe<Scalars['Int']>;
  four_star?: Maybe<Scalars['Int']>;
  five_star?: Maybe<Scalars['Int']>;
  three_star?: Maybe<Scalars['Int']>;
  two_star?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  rounded_rating?: Maybe<Scalars['Float']>;
};

export type IProductsExtensionAttributesOverlay = {
  __typename?: 'ProductsExtensionAttributesOverlay';
  overlay_image?: Maybe<Scalars['String']>;
  overlay_status?: Maybe<Scalars['String']>;
  mobile_overlay_status?: Maybe<Scalars['String']>;
  overlay_start_date?: Maybe<Scalars['String']>;
  overlay_end_date?: Maybe<Scalars['String']>;
  overlay_position?: Maybe<Scalars['String']>;
};

export type IProductsExtensionAttributesReviews = {
  __typename?: 'ProductsExtensionAttributesReviews';
  nickname?: Maybe<Scalars['String']>;
  rating_items?: Maybe<IProductsRatingItems>;
  created_at?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  is_validate?: Maybe<Scalars['Boolean']>;
  images?: Maybe<Array<IImagePath>>;
  region_id?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<IProductsExtensionAttributesReviewsExtensionAttributes>;
};

export type IProductsExtensionAttributesReviewsExtensionAttributes = {
  __typename?: 'ProductsExtensionAttributesReviewsExtensionAttributes';
  review_images?: Maybe<Array<Scalars['String']>>;
  region_id?: Maybe<Scalars['Int']>;
};

export type IProductsExtensionAttributesSuggestPromotions = {
  __typename?: 'ProductsExtensionAttributesSuggestPromotions';
  promotion_name: Scalars['String'];
  full_condition: Scalars['String'];
  start_datetime?: Maybe<Scalars['String']>;
  end_datetime?: Maybe<Scalars['String']>;
};

export type IProductsFilter = {
  __typename?: 'ProductsFilter';
  name?: Maybe<Scalars['String']>;
  attribute_code?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<IProductsFilterItems>>>;
  position?: Maybe<Scalars['Int']>;
};

export type IProductsFilterItems = {
  __typename?: 'ProductsFilterItems';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  custom_attributes?: Maybe<IProductsFilterItemsAttributes>;
};

export type IProductsFilterItemsAttributes = {
  __typename?: 'ProductsFilterItemsAttributes';
  level?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  url_key?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
};

export type IProductSizeMap = {
  __typename?: 'ProductSizeMap';
  type?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
};

export type IProductsRatingItems = {
  __typename?: 'ProductsRatingItems';
  rating_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['String']>;
};

export type IProductsSorting = {
  __typename?: 'ProductsSorting';
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IProductsSpecialAttributes = {
  __typename?: 'ProductsSpecialAttributes';
  label?: Maybe<Scalars['String']>;
  attribute_code?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
};

export type IProductsStock = {
  __typename?: 'ProductsStock';
  qty?: Maybe<Scalars['Int']>;
  is_in_stock?: Maybe<Scalars['String']>;
};

export type IProductsStockItem = {
  __typename?: 'ProductsStockItem';
  qty?: Maybe<Scalars['Int']>;
  is_in_stock?: Maybe<Scalars['String']>;
  min_qty?: Maybe<Scalars['Int']>;
  min_sale_qty?: Maybe<Scalars['Int']>;
  use_config_max_sale_qty?: Maybe<Scalars['String']>;
  max_sale_qty?: Maybe<Scalars['Int']>;
};

export type IProductsTierPrices = {
  __typename?: 'ProductsTierPrices';
  price?: Maybe<Scalars['Int']>;
  original_price?: Maybe<Scalars['Int']>;
  customer_group_id?: Maybe<Scalars['Int']>;
  is_discount?: Maybe<Scalars['Boolean']>;
};

export type IProductStorePrice = {
  __typename?: 'ProductStorePrice';
  entity_id: Scalars['ID'];
  id: Scalars['Int'];
  sku: Scalars['String'];
  price: Scalars['Float'];
  special_price?: Maybe<Scalars['Float']>;
  configurable_product_items?: Maybe<Array<Maybe<IProductStorePrice>>>;
};

export type IProductStyle = {
  __typename?: 'ProductStyle';
  titleColor?: Maybe<Scalars['String']>;
};

export enum IProductType {
  Simple = 'simple',
  Configurable = 'configurable',
  Grouped = 'grouped',
  Virtual = 'virtual',
  Bundle = 'bundle',
  Downloadable = 'downloadable',
  Giftcard = 'giftcard',
  Unknown = 'unknown',
}

export type IProductUrlKeyQuery = {
  url: Scalars['String'];
};

export type IPromotionSuggestion = {
  __typename?: 'PromotionSuggestion';
  sku?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IPromotionSuggestionExtensionAttribute>;
};

export type IPromotionSuggestionExtensionAttribute = {
  __typename?: 'PromotionSuggestionExtensionAttribute';
  free_items?: Maybe<Array<Maybe<IFreeItemPromotion>>>;
  bundles?: Maybe<Array<Maybe<IBundlePromotion>>>;
  credit_card_promotions?: Maybe<Array<Maybe<ICreditCardPromotion>>>;
  credit_card_installment_promotions?: Maybe<Array<Maybe<ICreditCardPromotion>>>;
  t1c?: Maybe<Array<Maybe<IT1CPromotion>>>;
  all_applicable_rules?: Maybe<Array<Maybe<IApplicableRulesPromotion>>>;
  tier_price?: Maybe<Array<Maybe<ITierPricePromotion>>>;
};

export type IQuery = {
  __typename?: 'Query';
  banner?: Maybe<Array<Maybe<IBanner>>>;
  binLookup: IBinLookup;
  brandDetail?: Maybe<IBrandDetail>;
  brands?: Maybe<Array<Maybe<IBrand>>>;
  cards: Array<ICard>;
  cart?: Maybe<ICart>;
  cartMini?: Maybe<ICartMini>;
  categories?: Maybe<Array<Maybe<ICategoryFlat>>>;
  categoriesTree?: Maybe<Array<Maybe<ICategoryFlat>>>;
  category?: Maybe<ICategory>;
  cms?: Maybe<ICmsContent>;
  cmsBlock?: Maybe<ICmsBlock>;
  cmsBlockByIdentifier?: Maybe<ICmsBlock>;
  cmsBlocks?: Maybe<Array<Maybe<ICmsBlock>>>;
  cmsMobile?: Maybe<ICmsMobileContent>;
  cmsPage?: Maybe<ICmsPage>;
  compareProducts?: Maybe<Array<Maybe<ICompareProducts>>>;
  consentInfo?: Maybe<IConsent>;
  couponCampaignList?: Maybe<Array<Maybe<ICouponCampaignResponse>>>;
  couponList?: Maybe<ICouponResponse>;
  customer?: Maybe<ICustomer>;
  customerCouponList?: Maybe<ICouponResponse>;
  deliveryOptions?: Maybe<Array<Maybe<IDeliveryOptionItem>>>;
  districts?: Maybe<Array<Maybe<IDistrict>>>;
  estimateShippingMethods?: Maybe<Array<Maybe<IEstimateShippingMethods>>>;
  estimateShippingMethodsV4?: Maybe<Array<Maybe<IEstimateShippingMethods>>>;
  /** [PWB] - Query available store for 2hr pick up shipping method */
  get2hrsPickUpStores?: Maybe<Array<Maybe<IPickUpStore>>>;
  getAddress?: Maybe<ICustomerAddressResult>;
  /** [PWB] - Query all active store for 2hr pick up shipping method */
  getAllActive2hrsPickUpStores?: Maybe<Array<Maybe<IPickUpStore>>>;
  /** [PWB] - Query available store for click and collect shipping method */
  getClickNCollectPickUpStores?: Maybe<Array<Maybe<IStore>>>;
  /** [PWB] - Query available store with multiple sku for 2hr pick up shipping method */
  getMulti2hrsPickUpStores?: Maybe<Array<Maybe<IPickUpStoreMulti>>>;
  /** [PWB] - Query get available time of ship from store (3hr) shipping method */
  getShipFromStoreAvailableTime?: Maybe<IShipFromStoreAvailableTime>;
  /** [PWB] - Query check active status store */
  getStatusActivePickupStore?: Maybe<IIsSalable>;
  getStore?: Maybe<IStore>;
  /** [PWB] - Query store (deprecated) */
  getStores?: Maybe<Array<Maybe<IStore>>>;
  hello: Scalars['String'];
  homepageRecommendationByUserId?: Maybe<Scalars['JSON']>;
  listAddresses?: Maybe<Array<Maybe<ICustomerAddressResult>>>;
  order?: Maybe<IOrder>;
  orderByEmail?: Maybe<IOrder>;
  orderByIncrementId?: Maybe<IOrder>;
  orders?: Maybe<IOrders>;
  paymentInformations?: Maybe<IPaymentInformations>;
  paymentOffline: IPaymentOffileDetail;
  paymentStatus: IPaymentStatusResponse;
  pickupLocations?: Maybe<Array<Maybe<IPickupStoreLocation>>>;
  postcodeByLatLng?: Maybe<IPostcodeResult>;
  pricePerStore?: Maybe<IProductStorePrice>;
  product?: Maybe<IProduct>;
  productAssociationBySku?: Maybe<Scalars['JSON']>;
  productById?: Maybe<IProduct>;
  productBySku?: Maybe<IProduct>;
  productRecommendationBySku?: Maybe<Scalars['JSON']>;
  productRecommendationByUser?: Maybe<Scalars['JSON']>;
  productSearch?: Maybe<IProductSearch>;
  /** [PWB] - Search Promotion by search criteria */
  promotionSuggestion?: Maybe<Array<Maybe<IPromotionSuggestion>>>;
  ratingOptions?: Maybe<Array<Maybe<IRatingOptions>>>;
  regionByPostCode?: Maybe<IRegionByPostCode>;
  regions?: Maybe<Array<Maybe<IRegions>>>;
  retailerById?: Maybe<IStore>;
  retailerByPostcode?: Maybe<IStore>;
  search?: Maybe<Scalars['JSON']>;
  searchSuggestion?: Maybe<ISearchSuggestionLists>;
  searchTrending?: Maybe<Array<Maybe<ITermItem>>>;
  shippingSlotInfoHdl?: Maybe<Array<Maybe<ISlotInfo>>>;
  stockItem?: Maybe<IStockItem>;
  storeConfigs?: Maybe<Array<Maybe<IStoreConfig>>>;
  storePickUp?: Maybe<IListStorePickUp>;
  storePickupLocationsAvailable?: Maybe<Array<Maybe<IStorePickupLocationsAvailable>>>;
  storeWithStockLevel: Array<Maybe<IStoreWithStockLevel>>;
  subDistricts?: Maybe<Array<Maybe<ISubDistrict>>>;
  trackOrder?: Maybe<Array<IShipmentTrackingItem>>;
  urlRedirect?: Maybe<IUrlRedirect>;
  urlRewrite?: Maybe<IUrlRewrite>;
  v2Addresses?: Maybe<Array<Maybe<IV2Address>>>;
  v2BrandById?: Maybe<IV2Brand>;
  v2BrandSearch?: Maybe<Array<Maybe<IV2Brand>>>;
  v2Cart: IV2Cart;
  v2CartMini: IV2CartMini;
  v2Categories?: Maybe<Array<Maybe<IV2Category>>>;
  v2ConnectT1Profile?: Maybe<IV2T1ProfileData>;
  v2Customer?: Maybe<IV2Customer>;
  v2DeleteT1Profile?: Maybe<Scalars['Boolean']>;
  v2DeliveryOptionByPostcode: Array<IV2DeliveryOptionByPostcode>;
  v2DeliveryPackageOptions?: Maybe<Array<Maybe<IV2PackageOption>>>;
  v2EstimateShippingMethods?: Maybe<Array<Maybe<IV2EstimateShippingMethod>>>;
  v2GetT1CustomerProfile?: Maybe<IV2GetT1ProfileResponse>;
  v2InventoryStockBySkus?: Maybe<Array<IV2InventoryStock>>;
  v2Order?: Maybe<IV2Order>;
  v2Orders: IV2OrderResult;
  v2PackageOptions?: Maybe<Array<Maybe<IV2PackageOption>>>;
  v2ProductById: IV2Product;
  v2ProductBySKU: IV2Product;
  v2ProductByUrlKey: IV2Product;
  v2ProductRecommendationByUser?: Maybe<IV2ProductRecommendResult>;
  v2ProductSearch: IV2ProductSearchResult;
  v2StorePickUp?: Maybe<IV2ListStorePickUp>;
  v2SuggestKeywordSearch: Array<Scalars['String']>;
  v2SuggestSearch: IV2SuggestSearchResult;
  v2TrendSearch: IV2TrendSearchResult;
  v2Vouchers?: Maybe<IVouchers>;
  v2Wishlists?: Maybe<IV2Wishlist>;
  version: Scalars['String'];
  vipList?: Maybe<IVipListResponse>;
  vipWithToken?: Maybe<IVipValidateResponse>;
  wishlists?: Maybe<IWishlists>;
};

export type IQueryBannerArgs = {
  input?: Maybe<IFiltersQuery>;
};

export type IQueryBinLookupArgs = {
  bin: Scalars['String'];
};

export type IQueryBrandDetailArgs = {
  brandId?: Maybe<Scalars['Int']>;
};

export type IQueryBrandsArgs = {
  input?: Maybe<IFiltersQuery>;
};

export type IQueryCardsArgs = {
  sort?: Maybe<ICardSort>;
};

export type IQueryCartArgs = {
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
};

export type IQueryCartMiniArgs = {
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
};

export type IQueryCategoriesArgs = {
  storeCode?: Maybe<Scalars['String']>;
};

export type IQueryCategoryArgs = {
  storeCode?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type IQueryCmsArgs = {
  filter?: Maybe<ICmsFilterInput>;
};

export type IQueryCmsBlockArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type IQueryCmsBlockByIdentifierArgs = {
  identifier: Scalars['String'];
  store_id: Scalars['String'];
};

export type IQueryCmsBlocksArgs = {
  input?: Maybe<IFiltersQuery>;
};

export type IQueryCmsMobileArgs = {
  filter?: Maybe<ICmsMobileFilterInput>;
};

export type IQueryCmsPageArgs = {
  id: Scalars['Int'];
};

export type IQueryCompareProductsArgs = {
  input?: Maybe<ICompareProductInput>;
};

export type IQueryCouponCampaignListArgs = {
  campaignName: Scalars['String'];
};

export type IQueryCouponListArgs = {
  input: ICouponInput;
};

export type IQueryCustomerCouponListArgs = {
  input: ICustomerCouponInput;
};

export type IQueryDeliveryOptionsArgs = {
  storeCode: Scalars['String'];
  sku: Scalars['String'];
  postcode?: Maybe<Scalars['String']>;
};

export type IQueryDistrictsArgs = {
  storeCode?: Maybe<Scalars['String']>;
  input?: Maybe<IRegionId>;
};

export type IQueryEstimateShippingMethodsArgs = {
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IEstimateShippingInput;
};

export type IQueryEstimateShippingMethodsV4Args = {
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IEstimateShippingInput;
};

export type IQueryGet2hrsPickUpStoresArgs = {
  sku?: Maybe<Scalars['String']>;
};

export type IQueryGetAddressArgs = {
  input: IGetCustomerAddress;
};

export type IQueryGetAllActive2hrsPickUpStoresArgs = {
  sku?: Maybe<Scalars['String']>;
};

export type IQueryGetClickNCollectPickUpStoresArgs = {
  cartId?: Maybe<Scalars['String']>;
};

export type IQueryGetMulti2hrsPickUpStoresArgs = {
  skus?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IQueryGetStatusActivePickupStoreArgs = {
  sku?: Maybe<Scalars['String']>;
};

export type IQueryGetStoreArgs = {
  id: Scalars['ID'];
};

export type IQueryHomepageRecommendationByUserIdArgs = {
  customerId?: Maybe<Scalars['String']>;
};

export type IQueryListAddressesArgs = {
  storeCode?: Maybe<Scalars['String']>;
};

export type IQueryOrderArgs = {
  orderId: Scalars['Int'];
};

export type IQueryOrderByEmailArgs = {
  incrementId: Scalars['String'];
  email: Scalars['String'];
};

export type IQueryOrderByIncrementIdArgs = {
  incrementId: Scalars['String'];
  key?: Maybe<Scalars['String']>;
};

export type IQueryOrdersArgs = {
  filter: IFiltersQuery;
};

export type IQueryPaymentInformationsArgs = {
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
  childrenIds?: Maybe<Array<Scalars['String']>>;
  company_id?: Maybe<Scalars['Int']>;
};

export type IQueryPaymentOfflineArgs = {
  incrementId: Scalars['String'];
  key: Scalars['String'];
};

export type IQueryPaymentStatusArgs = {
  incrementId: Scalars['String'];
  key: Scalars['String'];
  paymentServiceKey: IPaymentServiceKey;
};

export type IQueryPickupLocationsArgs = {
  sku: Scalars['String'];
};

export type IQueryPostcodeByLatLngArgs = {
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type IQueryPricePerStoreArgs = {
  input: IPricePerStoreInput;
};

export type IQueryProductArgs = {
  url?: Maybe<Scalars['String']>;
  storeCode?: Maybe<Scalars['String']>;
};

export type IQueryProductAssociationBySkuArgs = {
  sku?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type IQueryProductByIdArgs = {
  id: Scalars['String'];
};

export type IQueryProductBySkuArgs = {
  sku: Scalars['String'];
  storeCode?: Maybe<Scalars['String']>;
};

export type IQueryProductRecommendationBySkuArgs = {
  sku?: Maybe<Scalars['String']>;
};

export type IQueryProductRecommendationByUserArgs = {
  customerId?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type IQueryProductSearchArgs = {
  filter?: Maybe<IFiltersQuery>;
  storeCode?: Maybe<Scalars['String']>;
};

export type IQueryPromotionSuggestionArgs = {
  filter?: Maybe<IFiltersQuery>;
};

export type IQueryRegionByPostCodeArgs = {
  storeCode?: Maybe<Scalars['String']>;
  input?: Maybe<IRegionPostCode>;
};

export type IQueryRegionsArgs = {
  storeCode?: Maybe<Scalars['String']>;
};

export type IQueryRetailerByIdArgs = {
  input: IGetRetailerByIdInput;
};

export type IQueryRetailerByPostcodeArgs = {
  input: IGetRetailerByPostcodeInput;
};

export type IQuerySearchArgs = {
  store: Scalars['String'];
  locale: Scalars['String'];
  keyword?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['JSON']>;
  pagination?: Maybe<Scalars['JSON']>;
  filter?: Maybe<Scalars['JSON']>;
};

export type IQuerySearchSuggestionArgs = {
  searchTermsInput?: Maybe<ISearchTermsInput>;
};

export type IQuerySearchTrendingArgs = {
  storeCode?: Maybe<Scalars['String']>;
};

export type IQueryShippingSlotInfoHdlArgs = {
  cartId: Scalars['String'];
  address: IShippingSlotHdlInput;
};

export type IQueryStockItemArgs = {
  sku: Scalars['String'];
};

export type IQueryStorePickUpArgs = {
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
  filters?: Maybe<ISearchConditionsQuery>;
};

export type IQueryStorePickupLocationsAvailableArgs = {
  sku: Scalars['String'];
  filter?: Maybe<IPickupStoreLocationFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type IQueryStoreWithStockLevelArgs = {
  sku: Scalars['String'];
};

export type IQuerySubDistrictsArgs = {
  storeCode?: Maybe<Scalars['String']>;
  input?: Maybe<ISubRegionId>;
};

export type IQueryTrackOrderArgs = {
  incrementId: Scalars['String'];
};

export type IQueryUrlRedirectArgs = {
  url?: Maybe<Scalars['String']>;
};

export type IQueryUrlRewriteArgs = {
  url?: Maybe<Scalars['String']>;
};

export type IQueryV2BrandByIdArgs = {
  id: Scalars['ID'];
};

export type IQueryV2BrandSearchArgs = {
  input: IFiltersQuery;
};

export type IQueryV2CartArgs = {
  input?: Maybe<IV2CartInput>;
};

export type IQueryV2CartMiniArgs = {
  input?: Maybe<IV2CartInput>;
};

export type IQueryV2ConnectT1ProfileArgs = {
  t1Token: Scalars['String'];
};

export type IQueryV2DeliveryOptionByPostcodeArgs = {
  input: IV2DeliveryOptionByPostcodeInput;
};

export type IQueryV2DeliveryPackageOptionsArgs = {
  cartId?: Maybe<Scalars['String']>;
  input: IV2DeliveryPackageOptionInput;
};

export type IQueryV2EstimateShippingMethodsArgs = {
  guestId?: Maybe<Scalars['String']>;
  input: IV2EstimateShippingInput;
  version?: Maybe<Scalars['Int']>;
};

export type IQueryV2GetT1CustomerProfileArgs = {
  t1Token?: Maybe<Scalars['String']>;
};

export type IQueryV2InventoryStockBySkusArgs = {
  skus: Array<Scalars['String']>;
};

export type IQueryV2OrderArgs = {
  input: IV2OrderInput;
};

export type IQueryV2OrdersArgs = {
  input: IV2OrderFilterQueryInput;
};

export type IQueryV2PackageOptionsArgs = {
  cartId?: Maybe<Scalars['String']>;
  storeId: Scalars['String'];
};

export type IQueryV2ProductByIdArgs = {
  id: Scalars['String'];
};

export type IQueryV2ProductBySkuArgs = {
  sku: Scalars['String'];
};

export type IQueryV2ProductByUrlKeyArgs = {
  urlKey: Scalars['String'];
};

export type IQueryV2ProductRecommendationByUserArgs = {
  input?: Maybe<IV2ProductRecommendInput>;
};

export type IQueryV2ProductSearchArgs = {
  input: IV2ProductSearchInput;
};

export type IQueryV2StorePickUpArgs = {
  input?: Maybe<IV2StorePickUpInput>;
};

export type IQueryV2SuggestKeywordSearchArgs = {
  input?: Maybe<IV2SuggestKeywordInput>;
};

export type IQueryV2SuggestSearchArgs = {
  input?: Maybe<IV2SuggestSearchInput>;
};

export type IQueryV2TrendSearchArgs = {
  size?: Maybe<Scalars['Int']>;
};

export type IQueryV2VouchersArgs = {
  input?: Maybe<IFilterVouchers>;
};

export type IQueryV2WishlistsArgs = {
  input?: Maybe<IV2WishlistInput>;
};

export type IQueryVipWithTokenArgs = {
  token: Scalars['String'];
};

export type IQueryWishlistsArgs = {
  filter: IFiltersQuery;
};

export enum IQuoteItemGroup {
  Standard = 'standard',
  Storepickup = 'storepickup',
}

export type IRatingItem = {
  rating_id: Scalars['Int'];
  rating: Scalars['Int'];
  option_id: Scalars['Int'];
};

export type IRatingOptions = {
  __typename?: 'RatingOptions';
  option_id?: Maybe<Scalars['Int']>;
  rating_id?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  rating_code?: Maybe<Scalars['String']>;
};

export type IRegion = {
  __typename?: 'Region';
  region_code?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
};

export type IRegionByPostCode = {
  __typename?: 'RegionByPostCode';
  region_id?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  default_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sort_order?: Maybe<Scalars['String']>;
  district?: Maybe<Array<Maybe<IDistrict>>>;
};

export type IRegionId = {
  regionId?: Maybe<Scalars['String']>;
};

export type IRegionPostCode = {
  postcode?: Maybe<Scalars['String']>;
};

export type IRegions = {
  __typename?: 'Regions';
  region_id?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  default_name?: Maybe<Scalars['String']>;
  sort_order?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IRegister = {
  __typename?: 'Register';
  data?: Maybe<ICustomer>;
  error?: Maybe<IResponseMessage>;
  message?: Maybe<Scalars['String']>;
};

export type IRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  is_subscribed?: Maybe<Scalars['Boolean']>;
  storeId?: Maybe<Scalars['Int']>;
  dob?: Maybe<Scalars['String']>;
  gender?: Maybe<IGender>;
  tax_id?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  t1c_no?: Maybe<Scalars['String']>;
  t1c_phone?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
  accept_consents?: Maybe<Array<IConsentType>>;
};

export type IResetPasswordInput = {
  newPassword: Scalars['String'];
  email: Scalars['String'];
  resetToken: Scalars['String'];
};

export type IResponseMessage = {
  __typename?: 'ResponseMessage';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type IRestoreShippingAssignmentInput = {
  isGuest: Scalars['Boolean'];
  cartId?: Maybe<Scalars['String']>;
};

export type IReviewInput = {
  nickname?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  rating_items: IRatingItem;
  sku: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  customer_id?: Maybe<Scalars['String']>;
  images?: Maybe<Array<IInputImagePath>>;
};

export type IReviewResponse = {
  __typename?: 'ReviewResponse';
  success?: Maybe<Scalars['String']>;
};

export type IReward = {
  __typename?: 'Reward';
  id?: Maybe<Scalars['Int']>;
  rewardType?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
  termsCondition?: Maybe<Scalars['String']>;
  couponConditionDescription?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  voucherCodeType?: Maybe<Scalars['String']>;
};

export type ISavedCardInput = {
  card_id: Scalars['String'];
  encrypted_card_data?: Maybe<Scalars['String']>;
};

export type ISearchConditionsFiltersQuery = {
  name: IFiltersQueryName;
  values: Array<Maybe<IFiltersQueryValues>>;
};

export type ISearchConditionsQuery = {
  page: Scalars['Int'];
  limit: Scalars['Int'];
  filters?: Maybe<Array<Maybe<ISearchConditionsFiltersQuery>>>;
  sorters?: Maybe<Array<Maybe<ISearchConditionsSortersQuery>>>;
};

export type ISearchConditionsSortersQuery = {
  name: ISortersQueryName;
  values: Array<Maybe<ISortersQueryValues>>;
};

export type ISearchSuggestionLists = {
  __typename?: 'SearchSuggestionLists';
  products?: Maybe<Array<Maybe<IProductItem>>>;
  terms?: Maybe<Array<Maybe<ITermItem>>>;
  categories?: Maybe<Array<Maybe<ICategoryItem>>>;
};

export type ISearchTermsInput = {
  storeCode?: Maybe<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
  productsSize?: Maybe<Scalars['Int']>;
  termsSize?: Maybe<Scalars['Int']>;
};

export type ISectionTitleProperty = {
  __typename?: 'SectionTitleProperty';
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  viewAll?: Maybe<Scalars['Boolean']>;
};

export type ISectionTitleStyle = {
  __typename?: 'SectionTitleStyle';
  showLines?: Maybe<Scalars['Boolean']>;
  textSize?: Maybe<Scalars['Float']>;
};

export type ISellerInfo = {
  __typename?: 'SellerInfo';
  entity_id: Scalars['ID'];
  name: Scalars['String'];
  mirakl_seller_id: Scalars['String'];
  url_key?: Maybe<Scalars['String']>;
};

export type ISetMultiPaymentResponse = {
  __typename?: 'SetMultiPaymentResponse';
  statusPayment?: Maybe<Scalars['Boolean']>;
};

export type ISetPaymentInfoResponse = {
  __typename?: 'SetPaymentInfoResponse';
  message?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['JSON']>;
  payment_dolfin?: Maybe<IPaymentDolfinResponse>;
  payment_offline?: Maybe<IPaymentOfflineResponse>;
  redirect_url?: Maybe<Scalars['String']>;
  request_form?: Maybe<IPaymentRequestForm>;
};

export type ISetShippingInformationInput = {
  shipping_address?: Maybe<IAddressInput>;
  billing_address?: Maybe<IAddressInput>;
  shipping_method_code?: Maybe<Scalars['String']>;
  shipping_carrier_code?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<ISetShippingInformationInputExtensionAttributes>;
};

export type ISetShippingInformationInputExtensionAttributes = {
  pickup_store?: Maybe<ISetShippingInformationInputExtensionAttributesPickupStore>;
};

export type ISetShippingInformationInputExtensionAttributesPickupStore = {
  store_id: Scalars['ID'];
};

export type ISetShippingSlotHdlInput = {
  date_time_from?: Maybe<Scalars['String']>;
  date_time_to?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IShippingSlotItemExtensionAttributesInput>;
};

export type IShipFromStoreAvailableTime = {
  __typename?: 'ShipFromStoreAvailableTime';
  available_from?: Maybe<Scalars['String']>;
  available_to?: Maybe<Scalars['String']>;
};

export type IShipmentTrackingItem = {
  __typename?: 'ShipmentTrackingItem';
  con_no?: Maybe<Scalars['String']>;
  status_code?: Maybe<Scalars['String']>;
  status_desc?: Maybe<Scalars['String']>;
  status_date?: Maybe<Scalars['String']>;
  update_date?: Maybe<Scalars['String']>;
  ref_no?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type IShipping = {
  __typename?: 'Shipping';
  address?: Maybe<IShippingAddress>;
  method?: Maybe<Scalars['String']>;
};

export type IShippingAddress = {
  __typename?: 'ShippingAddress';
  address_type?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  region_code?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  telephone?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<Scalars['JSON']>;
};

export type IShippingAddressCustomAttributesArgs = {
  filter?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IShippingAssigmentsShipping = {
  __typename?: 'ShippingAssigmentsShipping';
  address?: Maybe<ICartBillingAddress>;
  method?: Maybe<Scalars['String']>;
};

export type IShippingAssignment = {
  __typename?: 'ShippingAssignment';
  shipping?: Maybe<IShipping>;
  items?: Maybe<Array<Maybe<IShippingItems>>>;
};

export type IShippingItems = {
  __typename?: 'ShippingItems';
  store_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
};

export type IShippingMethodExtension = {
  __typename?: 'ShippingMethodExtension';
  pickup_locations?: Maybe<Array<Maybe<IPickupLocation>>>;
  pickup_stores_location?: Maybe<Array<Maybe<IPickupStoresLocation>>>;
  gmap_api_key?: Maybe<Scalars['String']>;
  shipping_slot_list?: Maybe<Array<Maybe<IShippingSlotItem>>>;
  messages?: Maybe<Array<Maybe<IShippingMethodExtensionMessage>>>;
  is_pre_order?: Maybe<Scalars['Boolean']>;
  delivery_time_label?: Maybe<IShippingMethodExtensionDeliveryTimeLabel>;
};

export type IShippingMethodExtensionPickupStoresLocationArgs = {
  filter?: Maybe<IPickupStoreLocationFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type IShippingMethodExtensionDeliveryTimeLabel = {
  __typename?: 'ShippingMethodExtensionDeliveryTimeLabel';
  method_type?: Maybe<Scalars['String']>;
  method_label?: Maybe<Scalars['String']>;
  min_lead_time?: Maybe<Scalars['String']>;
  max_lead_time?: Maybe<Scalars['String']>;
  time_label?: Maybe<Scalars['String']>;
};

export type IShippingMethodExtensionMessage = {
  __typename?: 'ShippingMethodExtensionMessage';
  message_code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  pre_render_message?: Maybe<Scalars['String']>;
};

export type IShippingMethods = {
  __typename?: 'ShippingMethods';
  carrier_code?: Maybe<Scalars['String']>;
  method_code?: Maybe<Scalars['String']>;
  carrier_title?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  method_title?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  base_amount?: Maybe<Scalars['Int']>;
  available?: Maybe<Scalars['Boolean']>;
  error_message?: Maybe<Scalars['String']>;
  price_excl_tax?: Maybe<Scalars['Int']>;
  price_incl_tax?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<IShippingMethodExtension>;
};

export type IShippingSlot = {
  __typename?: 'ShippingSlot';
  id?: Maybe<Scalars['Int']>;
  date_time_from?: Maybe<Scalars['String']>;
  date_time_to?: Maybe<Scalars['String']>;
};

export type IShippingSlotHdlInput = {
  customer_id?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  country_id: Scalars['String'];
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  telephone?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  default_shipping?: Maybe<Scalars['Boolean']>;
  vat_id?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<ISlotHdlCustomAttributesInput>;
};

export type IShippingSlotItem = {
  __typename?: 'ShippingSlotItem';
  id?: Maybe<Scalars['Int']>;
  date_time_from?: Maybe<Scalars['String']>;
  date_time_to?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IShippingSlotItemExtensionAttributes>;
};

export type IShippingSlotItemExtensionAttributes = {
  __typename?: 'ShippingSlotItemExtensionAttributes';
  day_slot_id?: Maybe<Scalars['Int']>;
};

export type IShippingSlotItemExtensionAttributesInput = {
  day_slot_id?: Maybe<Scalars['Int']>;
};

export type ISlides = {
  __typename?: 'slides';
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  store_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  customer_group_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  display_from?: Maybe<Scalars['String']>;
  display_to?: Maybe<Scalars['String']>;
  img_type?: Maybe<Scalars['String']>;
  img_file?: Maybe<Scalars['String']>;
  img_url?: Maybe<Scalars['String']>;
  img_title?: Maybe<Scalars['String']>;
  img_alt?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  is_open_url_in_new_window?: Maybe<Scalars['Boolean']>;
  is_add_nofollow_to_url?: Maybe<Scalars['Boolean']>;
  banner_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  extension_attributes?: Maybe<ISubExtensionAttributes>;
};

export type ISlotHdlCustomAttributesInput = {
  tel_mobile?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  subdistrict?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
  subdistrict_id?: Maybe<Scalars['String']>;
  postcode_id?: Maybe<Scalars['String']>;
};

export type ISlotInfo = {
  __typename?: 'SlotInfo';
  id?: Maybe<Scalars['String']>;
  date_time_from: Scalars['String'];
  date_time_to: Scalars['String'];
  extension_attributes?: Maybe<ISlotInfoExtensionAttributes>;
};

export type ISlotInfoExtensionAttributes = {
  __typename?: 'SlotInfoExtensionAttributes';
  day_slot_id: Scalars['Int'];
};

export type ISocialLoginInput = {
  guest_token?: Maybe<Scalars['String']>;
  isReplaceCart?: Maybe<Scalars['Boolean']>;
  is_jwt: Scalars['Boolean'];
  provider: ISocialLoginInputProvider;
  token: Scalars['String'];
};

export enum ISocialLoginInputProvider {
  Facebook = 'facebook',
}

export enum ISortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum ISortersQueryField {
  Latitude = 'latitude',
  Longitude = 'longitude',
}

export enum ISortersQueryName {
  CustomerLocation = 'customer_location',
}

export type ISortersQueryValues = {
  field: ISortersQueryField;
  value: Scalars['String'];
};

export type ISortOrder = {
  field?: Maybe<Scalars['String']>;
  direction?: Maybe<ISortDirection>;
};

export type IStatusHistories = {
  __typename?: 'StatusHistories';
  created_at?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type IStockItem = {
  __typename?: 'StockItem';
  qty?: Maybe<Scalars['Int']>;
  is_in_stock?: Maybe<Scalars['Boolean']>;
  use_config_min_qty?: Maybe<Scalars['Boolean']>;
  min_qty?: Maybe<Scalars['Int']>;
  use_config_min_sale_qty?: Maybe<Scalars['Boolean']>;
  min_sale_qty?: Maybe<Scalars['Int']>;
  use_config_max_sale_qty?: Maybe<Scalars['Boolean']>;
  max_sale_qty?: Maybe<Scalars['Int']>;
  item_id?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['Int']>;
  stock_id?: Maybe<Scalars['Int']>;
  is_qty_decimal?: Maybe<Scalars['Boolean']>;
  backorders?: Maybe<Scalars['Int']>;
  use_config_backorders?: Maybe<Scalars['Boolean']>;
  low_stock_date?: Maybe<Scalars['String']>;
  notify_stock_qty?: Maybe<Scalars['Int']>;
  use_config_notify_stock_qty?: Maybe<Scalars['Boolean']>;
  manage_stock?: Maybe<Scalars['Boolean']>;
  use_config_manage_stock?: Maybe<Scalars['Boolean']>;
  stock_status_changed_auto?: Maybe<Scalars['Int']>;
  qty_increments?: Maybe<Scalars['Int']>;
  use_config_qty_increments?: Maybe<Scalars['Boolean']>;
  enable_qty_increments?: Maybe<Scalars['Boolean']>;
  use_config_enable_qty_increments?: Maybe<Scalars['Boolean']>;
  is_decimal_divided?: Maybe<Scalars['Boolean']>;
  show_default_notification_message?: Maybe<Scalars['Boolean']>;
};

export enum IStockLevelStatus {
  FullStock = 'FULL_STOCK',
  MediumStock = 'MEDIUM_STOCK',
  OutOfStock = 'OUT_OF_STOCK',
}

export type IStore = IStoreInterface & {
  __typename?: 'Store';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  seller_code?: Maybe<Scalars['String']>;
  attribute_set_name?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<IStoreCustomAttribute>;
  extension_attributes?: Maybe<IStoreExtensionAttribute>;
};

export type IStoreAddress = {
  __typename?: 'StoreAddress';
  id?: Maybe<Scalars['Int']>;
  retailer_id?: Maybe<Scalars['Int']>;
  coordinates?: Maybe<ICoordinate>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  country_id?: Maybe<Scalars['String']>;
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  postcode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

export type IStoreConfig = {
  __typename?: 'StoreConfig';
  id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  website_id?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  base_currency_code?: Maybe<Scalars['String']>;
  default_display_currency_code?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  weight_unit?: Maybe<Scalars['String']>;
  base_url?: Maybe<Scalars['String']>;
  base_link_url?: Maybe<Scalars['String']>;
  base_static_url?: Maybe<Scalars['String']>;
  base_media_url?: Maybe<Scalars['String']>;
  secure_base_url?: Maybe<Scalars['String']>;
  secure_base_link_url?: Maybe<Scalars['String']>;
  secure_base_static_url?: Maybe<Scalars['String']>;
  secure_base_media_url?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IConfigExtensionAttribute>;
};

export type IStoreCustomAttribute = {
  __typename?: 'StoreCustomAttribute';
  url_key?: Maybe<Scalars['String']>;
  show_contact_form?: Maybe<Scalars['String']>;
  inventory_source?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  contact_fax?: Maybe<Scalars['String']>;
  min_lead_time?: Maybe<Scalars['String']>;
  max_lead_time?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
};

export type IStoreExtensionAttribute = {
  __typename?: 'StoreExtensionAttribute';
  address?: Maybe<IStoreAddress>;
  opening_hours?: Maybe<Array<Maybe<Array<Maybe<IOpenHourExtension>>>>>;
  special_opening_hours?: Maybe<Array<Maybe<Scalars['String']>>>;
  ispu_promise_delivery?: Maybe<Scalars['String']>;
  stock_low_indicator_threshold?: Maybe<Scalars['Int']>;
};

export type IStoreInterface = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  seller_code?: Maybe<Scalars['String']>;
  attribute_set_name?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<IStoreCustomAttribute>;
  extension_attributes?: Maybe<IStoreExtensionAttribute>;
};

export type IStoreItem = {
  __typename?: 'StoreItem';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  store_code?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  address?: Maybe<IStoreItemAddress>;
  extension_attributes?: Maybe<IStoreItemExtensionAttributes>;
};

export type IStoreItemAddress = {
  __typename?: 'StoreItemAddress';
  street_number?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['Int']>;
  sub_district?: Maybe<Scalars['String']>;
  sub_district_id?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  post_code?: Maybe<Scalars['String']>;
  contact_number?: Maybe<Scalars['String']>;
  country_code?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
};

export type IStoreItemExtensionAttributes = {
  __typename?: 'StoreItemExtensionAttributes';
  distance?: Maybe<Scalars['String']>;
  allocated_capacity?: Maybe<IStoreItemExtensionAttributesAllocatedCapacity>;
  opening_hours?: Maybe<Array<Maybe<IStoreItemExtensionAttributesOpeningHours>>>;
  image?: Maybe<Scalars['String']>;
  allow_pick_at_store?: Maybe<Scalars['Boolean']>;
  display_as_store_information?: Maybe<Scalars['Boolean']>;
  store_pickup?: Maybe<IStoreItemExtensionAttributesStorePickUp>;
  stock_id?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  salable_items?: Maybe<Array<Maybe<IPickupStoreLocationSalableItem>>>;
  store_delivery?: Maybe<IStoreItemExtensionAttributesStoreDelivery>;
  additional_text?: Maybe<IStoreItemExtensionAttributesAdditionalText>;
  cut_off_time?: Maybe<Scalars['String']>;
};

export type IStoreItemExtensionAttributesAdditionalText = {
  __typename?: 'StoreItemExtensionAttributesAdditionalText';
  method_code?: Maybe<Scalars['String']>;
  method_label_code?: Maybe<Scalars['String']>;
  time_value?: Maybe<Scalars['Int']>;
  time_unit?: Maybe<Scalars['String']>;
  date_time?: Maybe<Scalars['String']>;
  extension_attributes?: Maybe<IStoreItemExtensionAttributesAdditionalTextExtensionAttributes>;
};

export type IStoreItemExtensionAttributesAdditionalTextExtensionAttributes = {
  __typename?: 'StoreItemExtensionAttributesAdditionalTextExtensionAttributes';
  additional_text_variable?: Maybe<IStoreItemExtensionAttributesAdditionalTextExtensionAttributesAdditionalTextVariable>;
};

export type IStoreItemExtensionAttributesAdditionalTextExtensionAttributesAdditionalTextVariable = {
  __typename?: 'StoreItemExtensionAttributesAdditionalTextExtensionAttributesAdditionalTextVariable';
  total_available?: Maybe<Scalars['Int']>;
  total_ordered?: Maybe<Scalars['Int']>;
};

export type IStoreItemExtensionAttributesAllocatedCapacity = {
  __typename?: 'StoreItemExtensionAttributesAllocatedCapacity';
  allocated_capacity?: Maybe<Scalars['Int']>;
};

export type IStoreItemExtensionAttributesOpeningHours = {
  __typename?: 'StoreItemExtensionAttributesOpeningHours';
  day?: Maybe<Scalars['String']>;
  open?: Maybe<Scalars['String']>;
  close?: Maybe<Scalars['String']>;
};

export type IStoreItemExtensionAttributesStoreDelivery = {
  __typename?: 'StoreItemExtensionAttributesStoreDelivery';
  stock_id?: Maybe<Scalars['Int']>;
  allow_ship_from_store?: Maybe<Scalars['Boolean']>;
};

export type IStoreItemExtensionAttributesStorePickUp = {
  __typename?: 'StoreItemExtensionAttributesStorePickUp';
  store_id?: Maybe<Scalars['Int']>;
  stock_id?: Maybe<Scalars['Int']>;
  allow_ispu?: Maybe<Scalars['Boolean']>;
  allow_sts?: Maybe<Scalars['Boolean']>;
};

export type IStorePickupLocationsAvailable = {
  __typename?: 'StorePickupLocationsAvailable';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  storeCode?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  address?: Maybe<IPickupStoreLocationAddress>;
  openingHours?: Maybe<Array<Maybe<IPickupStoreLocationOpeningHour>>>;
  image?: Maybe<Scalars['String']>;
  allowPickAtStore?: Maybe<Scalars['Boolean']>;
  isDisplayAsStoreInformation?: Maybe<Scalars['Boolean']>;
  storePickup?: Maybe<IPickupStoreLocationStorePickup>;
  stockStatusCode?: Maybe<Scalars['String']>;
  stockStatusLabel?: Maybe<Scalars['String']>;
  distance?: Maybe<IPickupStoresLocationDistance>;
};

export type IStoreWithStockLevel = IStoreInterface & {
  __typename?: 'StoreWithStockLevel';
  /** `id` is Store.id-Product.sku */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  seller_code?: Maybe<Scalars['String']>;
  attribute_set_name?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<IStoreCustomAttribute>;
  extension_attributes?: Maybe<IStoreExtensionAttribute>;
  stock_level: IStockLevelStatus;
  stock_quantity: Scalars['Int'];
};

export type ISubDistrict = {
  __typename?: 'SubDistrict';
  subdistrict_id?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
  district_code?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  default_name?: Maybe<Scalars['String']>;
  zip_code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ISubExtensionAttributes = {
  __typename?: 'subExtensionAttributes';
  cms_content?: Maybe<Scalars['String']>;
  cms_position?: Maybe<Scalars['String']>;
};

export type ISubRegionId = {
  regionId?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['String']>;
};

export type ISubscribe = {
  __typename?: 'Subscribe';
  success?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type IT1CPromotion = {
  __typename?: 'T1CPromotion';
  redemption_rate?: Maybe<Scalars['Float']>;
  maximum_point_rate?: Maybe<Scalars['Int']>;
  redeemable_points?: Maybe<Array<Maybe<Scalars['Float']>>>;
  redeemable_amounts?: Maybe<Array<Maybe<Scalars['Float']>>>;
  rule_id?: Maybe<Scalars['Int']>;
  simple_action?: Maybe<Scalars['String']>;
  coupon_code?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
  from_date?: Maybe<Scalars['String']>;
  to_date?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Float']>;
  discount_qty?: Maybe<Scalars['Int']>;
  discount_step?: Maybe<Scalars['Int']>;
};

export type IT1cRedeem = {
  __typename?: 'T1cRedeem';
  t1_cnumber?: Maybe<Scalars['String']>;
  points_redeem?: Maybe<Scalars['String']>;
  points_total?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['String']>;
  discount_amount_formatted?: Maybe<Scalars['String']>;
};

export type IT1cSpecialRate = {
  __typename?: 'T1cSpecialRate';
  entity_id?: Maybe<Scalars['Int']>;
  salesrule_id?: Maybe<Scalars['Int']>;
  redemption_rate?: Maybe<Scalars['Int']>;
  maximum_point_rate?: Maybe<Scalars['Int']>;
};

export enum ITaxType {
  Personal = 'PERSONAL',
  Company = 'COMPANY',
}

export type ITermItem = {
  __typename?: 'TermItem';
  text?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  frequency?: Maybe<Scalars['Int']>;
};

export type ITextProperty = {
  __typename?: 'TextProperty';
  text?: Maybe<Scalars['String']>;
};

export type ITextStyle = {
  __typename?: 'TextStyle';
  textSize?: Maybe<Scalars['Float']>;
  textColor?: Maybe<Scalars['String']>;
  textAlignment?: Maybe<Scalars['String']>;
};

export type ITheOneAccountInfo = {
  __typename?: 'TheOneAccountInfo';
  points?: Maybe<Scalars['Int']>;
  points_used?: Maybe<Scalars['Int']>;
  card_no?: Maybe<Scalars['Float']>;
  conversion_rate?: Maybe<Scalars['Int']>;
  min_allowed_points?: Maybe<Scalars['Int']>;
  max_allowed_points?: Maybe<Scalars['Int']>;
};

export type ITierPricePromotion = {
  __typename?: 'TierPricePromotion';
  id: Scalars['ID'];
  name: Scalars['String'];
  amount: Scalars['Float'];
  extension_attributes: ITierPricePromotionExtension;
  type: ITierPricePromotionType;
};

export type ITierPricePromotionExtension = {
  __typename?: 'TierPricePromotionExtension';
  qty_from?: Maybe<Scalars['Int']>;
  qty_to?: Maybe<Scalars['Int']>;
  applicable_store_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export enum ITierPricePromotionType {
  FixedAmount = 'fixed_amount',
  SpecialPrice = 'special_price',
  PercentAmount = 'percent_amount',
}

export type ITotalSegment = {
  __typename?: 'TotalSegment';
  code?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  extension_attributes?: Maybe<Scalars['JSON']>;
};

export type ITwoColumnVerticalCarouselProperty = {
  __typename?: 'TwoColumnVerticalCarouselProperty';
  title?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type IUpdateCustomerAddressesRegion = {
  __typename?: 'UpdateCustomerAddressesRegion';
  region_code?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
};

export type IUpdateCustomerExtensionAttributes = {
  is_subscribed?: Maybe<Scalars['Boolean']>;
};

export type IUpdateInputCustomer = {
  id?: Maybe<Scalars['ID']>;
  group_id?: Maybe<Scalars['ID']>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  created_in?: Maybe<Scalars['String']>;
  default_billing?: Maybe<Scalars['String']>;
  default_shipping?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  gender?: Maybe<IGender>;
  taxvat?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['Int']>;
  website_id?: Maybe<Scalars['Int']>;
  addresses?: Maybe<Scalars['JSON']>;
  disable_auto_group_change?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<IUpdateCustomerExtensionAttributes>;
  custom_attributes?: Maybe<Scalars['JSON']>;
  is_subscribed?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  tax_id?: Maybe<Scalars['String']>;
  t1c_no?: Maybe<Scalars['String']>;
  t1c_phone?: Maybe<Scalars['String']>;
  language: Scalars['String'];
};

export type IUpdateWishlistInput = {
  wishlist_id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<IItemInput>>>;
  visibility?: Maybe<Scalars['Int']>;
};

export type IUpdateWishlistItemInput = {
  wishlist_item_id: Scalars['Int'];
  product_id?: Maybe<Scalars['Int']>;
  store_id?: Maybe<Scalars['Int']>;
  qty?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<Array<Maybe<ICustomAttributesInput>>>;
};

export type IUploadImageInput = {
  base64Image?: Maybe<Array<Maybe<IBase64Image>>>;
};

export type IUploadImageResponse = {
  __typename?: 'UploadImageResponse';
  error?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<IUploadImageResponseItem>>>;
};

export type IUploadImageResponseItem = {
  __typename?: 'UploadImageResponseItem';
  error?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type IUrlRedirect = {
  __typename?: 'UrlRedirect';
  target_path?: Maybe<Scalars['String']>;
  redirect_type?: Maybe<Scalars['Int']>;
};

export type IUrlRewrite = {
  __typename?: 'UrlRewrite';
  entity_type?: Maybe<Scalars['String']>;
  entity_id?: Maybe<Scalars['Int']>;
  request_path?: Maybe<Scalars['String']>;
  target_path?: Maybe<Scalars['String']>;
  redirect_type?: Maybe<Scalars['Int']>;
  store_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<IMetadata>>>;
};

export type IV2AddCouponInput = {
  coupon: Scalars['String'];
  guestId?: Maybe<Scalars['String']>;
};

export type IV2AddCouponResponse = {
  __typename?: 'V2AddCouponResponse';
  status: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type IV2Address = {
  id: Scalars['ID'];
  customerId?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  postcode: Scalars['String'];
  countryId: Scalars['ID'];
  company?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['ID']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']>;
  isDefaultBilling?: Maybe<Scalars['Boolean']>;
  subDistrict: IV2Place;
  district: IV2Place;
  province?: Maybe<IV2Province>;
  customerAddressType: Scalars['String'];
  isFullTaxRequest?: Maybe<Scalars['Boolean']>;
};

export type IV2AddressCds = IV2Address & {
  __typename?: 'V2AddressCDS';
  id: Scalars['ID'];
  customerId?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  postcode: Scalars['String'];
  countryId: Scalars['ID'];
  company?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['ID']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']>;
  isDefaultBilling?: Maybe<Scalars['Boolean']>;
  subDistrict: IV2Place;
  district: IV2Place;
  province?: Maybe<IV2Province>;
  customerAddressType: Scalars['String'];
  isFullTaxRequest?: Maybe<Scalars['Boolean']>;
  addressLine?: Maybe<Scalars['String']>;
  addressName?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  branchId?: Maybe<Scalars['String']>;
  fullTaxType?: Maybe<IV2TaxType>;
};

export type IV2AddressPwb = IV2Address & {
  __typename?: 'V2AddressPWB';
  id: Scalars['ID'];
  customerId?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  postcode: Scalars['String'];
  countryId: Scalars['ID'];
  company?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['ID']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']>;
  isDefaultBilling?: Maybe<Scalars['Boolean']>;
  subDistrict: IV2Place;
  district: IV2Place;
  province?: Maybe<IV2Province>;
  customerAddressType: Scalars['String'];
  isFullTaxRequest?: Maybe<Scalars['Boolean']>;
  addressLine?: Maybe<Scalars['String']>;
  addressName?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  houseNo?: Maybe<Scalars['String']>;
  telMobile?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  fullTaxType?: Maybe<IV2TaxType>;
};

export type IV2AddressTops = IV2Address & {
  __typename?: 'V2AddressTOPS';
  id: Scalars['ID'];
  customerId?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  postcode: Scalars['String'];
  countryId: Scalars['ID'];
  company?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['ID']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']>;
  isDefaultBilling?: Maybe<Scalars['Boolean']>;
  subDistrict: IV2Place;
  district: IV2Place;
  province?: Maybe<IV2Province>;
  customerAddressType: Scalars['String'];
  isFullTaxRequest?: Maybe<Scalars['Boolean']>;
  addressLine?: Maybe<Scalars['String']>;
  addressName?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  branchId?: Maybe<Scalars['String']>;
  fullTaxType?: Maybe<IV2TaxType>;
  remark?: Maybe<Scalars['String']>;
  houseNo?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  villageName?: Maybe<Scalars['String']>;
  road?: Maybe<Scalars['String']>;
  buildingType?: Maybe<Scalars['String']>;
  moo?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
};

export enum IV2AddressType {
  Shipping = 'SHIPPING',
  Billing = 'BILLING',
}

export type IV2AmountRange = {
  __typename?: 'V2AmountRange';
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type IV2Bank = {
  __typename?: 'V2Bank';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
};

export type IV2Brand = {
  __typename?: 'V2Brand';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  contentCss?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  urlKey: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type IV2Breadcrumb = {
  __typename?: 'V2Breadcrumb';
  id: Scalars['ID'];
  title: Scalars['String'];
  urlKey: Scalars['String'];
  level: Scalars['Int'];
};

export type IV2Cart = {
  __typename?: 'V2Cart';
  id: Scalars['String'];
  flags: Array<IV2CartFlag>;
  couponCodes: Array<IV2CartCouponCode>;
  priceBreakdown: IV2CartPriceBreakdown;
  sellers: Array<IV2CartSeller>;
  freeShippingOffer?: Maybe<IV2FreeShippingOffer>;
  freeItems: Array<IV2CartFreeItem>;
  summarySection: Array<IV2SummarySection>;
  guestId?: Maybe<Scalars['String']>;
};

export type IV2CartAddGiftWrappingInput = {
  guestId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type IV2CartAddGiftWrappingResponse = {
  __typename?: 'V2CartAddGiftWrappingResponse';
  status: Scalars['Boolean'];
};

export type IV2CartChangeGiftWrappingResponse = {
  __typename?: 'V2CartChangeGiftWrappingResponse';
  status: Scalars['Boolean'];
};

export type IV2CartChangeQuantityResponse = {
  __typename?: 'V2CartChangeQuantityResponse';
  status: Scalars['Boolean'];
};

export type IV2CartCouponCode = {
  __typename?: 'V2CartCouponCode';
  id: Scalars['String'];
  code: Scalars['String'];
  amount: Scalars['Float'];
};

export type IV2CartDeleteGiftWrappingResponse = {
  __typename?: 'V2CartDeleteGiftWrappingResponse';
  status: Scalars['Boolean'];
};

export enum IV2CartFlag {
  GiftWrapping = 'GIFT_WRAPPING',
}

export type IV2CartFreeItem = {
  __typename?: 'V2CartFreeItem';
  id: Scalars['String'];
  quantity: Scalars['Int'];
  product: IV2Product;
  productOptions?: Maybe<Array<IV2ProductOption>>;
  stockInvalid?: Maybe<IV2StockInvalidFlag>;
};

export type IV2CartInput = {
  guestId?: Maybe<Scalars['String']>;
};

export type IV2CartItem = {
  __typename?: 'V2CartItem';
  id: Scalars['String'];
  quantity: Scalars['Int'];
  priceBreakdown: IV2CartItemPriceBreakdown;
  product: IV2Product;
  productOptions: Array<IV2ProductOption>;
  parent?: Maybe<IV2Product>;
  freeItems: Array<IV2CartFreeItem>;
};

export type IV2CartItemPriceBreakdown = {
  __typename?: 'V2CartItemPriceBreakdown';
  subtotal: Scalars['Float'];
  discount: Scalars['Float'];
  vat: Scalars['Float'];
  grandTotal: Scalars['Float'];
};

export type IV2CartMini = {
  __typename?: 'V2CartMini';
  id: Scalars['String'];
  itemCount?: Maybe<Scalars['Int']>;
  itemQuantity?: Maybe<Scalars['Int']>;
  guestId?: Maybe<Scalars['String']>;
};

export type IV2CartPriceBreakdown = {
  __typename?: 'V2CartPriceBreakdown';
  subtotal: Scalars['Float'];
  discount: Scalars['Float'];
  giftWrapping: Scalars['Float'];
  shipping: Scalars['Float'];
  vat: Scalars['Float'];
  creditCardOnTop: Scalars['Float'];
  the1Redemption: IV2CartPriceBreakdownThe1Redemption;
  grandTotal: Scalars['Float'];
  totalQty: Scalars['Int'];
};

export type IV2CartPriceBreakdownThe1Redemption = {
  __typename?: 'V2CartPriceBreakdownThe1Redemption';
  point: Scalars['Float'];
  discount: Scalars['Float'];
};

export type IV2CartSeller = {
  __typename?: 'V2CartSeller';
  id: Scalars['String'];
  name: Scalars['String'];
  items: Array<IV2CartItem>;
};

export type IV2Category = {
  __typename?: 'V2Category';
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  includeInMenu?: Maybe<Scalars['String']>;
  productCount?: Maybe<Scalars['Int']>;
  children?: Maybe<Scalars['String']>;
  childrenCount?: Maybe<Scalars['Int']>;
  urlKey?: Maybe<Scalars['String']>;
  urlPath?: Maybe<Scalars['String']>;
  virtualCategoryRoot?: Maybe<Scalars['String']>;
  megaCmsBrand?: Maybe<Scalars['String']>;
  megaCmsBanner?: Maybe<Scalars['String']>;
  megaCmsMenu?: Maybe<Scalars['String']>;
  childrenData?: Maybe<Array<Maybe<IV2Category>>>;
};

export type IV2ChangePasswordInput = {
  currentPassword?: Maybe<Scalars['String']>;
  newPassword?: Maybe<Scalars['String']>;
};

export type IV2ChangePasswordResponse = {
  __typename?: 'V2ChangePasswordResponse';
  message?: Maybe<Scalars['String']>;
};

export type IV2ChangeQtyInput = {
  guestId?: Maybe<Scalars['String']>;
  cartId: Scalars['Int'];
  itemId: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type IV2ConfigurableOption = {
  __typename?: 'V2ConfigurableOption';
  id: Scalars['ID'];
  label: Scalars['String'];
  attributeCode: Scalars['String'];
  values: Array<IV2ConfigurableOptionValue>;
};

export enum IV2ConfigurableOptionType {
  SwatchText = 'SWATCH_TEXT',
  SwatchColor = 'SWATCH_COLOR',
  SwatchImage = 'SWATCH_IMAGE',
}

export type IV2ConfigurableOptionValue = {
  __typename?: 'V2ConfigurableOptionValue';
  id: Scalars['ID'];
  type: IV2ConfigurableOptionType;
  label?: Maybe<Scalars['String']>;
  colorCode?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type IV2ConfigurableProduct = IV2Product & {
  __typename?: 'V2ConfigurableProduct';
  id: Scalars['ID'];
  brand?: Maybe<IV2Brand>;
  breadcrumbs: Array<IV2Breadcrumb>;
  mediaGallery: Array<IV2Media>;
  name: Scalars['String'];
  urlKey: Scalars['String'];
  priceSummary: IV2PriceSummary;
  priceRange: IV2ConfigurableProductPriceRange;
  sku: Scalars['String'];
  type: IV2ProductType;
  installmentPlans: Array<IV2InstallmentPlan>;
  the1Redemption?: Maybe<IV2The1Redemption>;
  overlayImageUrl?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  purchaseLimit?: Maybe<IV2PurchaseLimit>;
  shippingMethods: Array<IV2ShippingMethod>;
  paymentMethods: Array<IV2PaymentMethod>;
  options: Array<IV2ConfigurableOption>;
  children: Array<IV2ConfigurableProductChild>;
  badge?: Maybe<Scalars['String']>;
  preorder?: Maybe<IV2Preorder>;
  flashdeal?: Maybe<IV2Flashdeal>;
  rating?: Maybe<IV2Rating>;
  flags: Array<IV2ProductFlag>;
  seller: IV2Seller;
  promotions: Array<IV2Promotion>;
  promotionTag?: Maybe<Scalars['String']>;
  reviews: Array<IV2Review>;
  links: IV2ProductLinks;
  createdAt?: Maybe<Scalars['DateTime']>;
  collectionName?: Maybe<Scalars['String']>;
  labelOptions?: Maybe<Array<Maybe<IV2ProductLabelOption>>>;
};

export type IV2ConfigurableProductChild = {
  __typename?: 'V2ConfigurableProductChild';
  options: Array<IV2ProductOption>;
  product: IV2Product;
};

export type IV2ConfigurableProductPriceRange = {
  __typename?: 'V2ConfigurableProductPriceRange';
  original: Array<Scalars['Float']>;
  final: Array<Scalars['Float']>;
  discount?: Maybe<Array<IV2Discount>>;
};

export type IV2CouponCode = {
  __typename?: 'V2CouponCode';
  id: Scalars['String'];
  code: Scalars['String'];
  amount: Scalars['Float'];
};

export type IV2CreateWishListInput = {
  id: Scalars['ID'];
  productId: Scalars['ID'];
  storeId?: Maybe<Scalars['Int']>;
  customAttributes?: Maybe<Array<Maybe<IV2WishlistItemProductOptionInput>>>;
  quantity?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type IV2CustomAttributes = {
  __typename?: 'V2CustomAttributes';
  attributeCode?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IV2Customer = {
  __typename?: 'V2Customer';
  id: Scalars['ID'];
  groupId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  createdIn?: Maybe<Scalars['String']>;
  defaultBilling?: Maybe<Scalars['String']>;
  defaultShipping?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  gender?: Maybe<IV2Gender>;
  /** @deprecated Use `taxId` instead */
  taxvat?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['Int']>;
  websiteId?: Maybe<Scalars['Int']>;
  addresses: Array<IV2CustomerAddress>;
  disableAutoGroupChange?: Maybe<Scalars['Int']>;
  extensionAttributes?: Maybe<IV2CustomerExtensionAttributes>;
  customAttributes?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  isSubscribed: Scalars['Boolean'];
  phone?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  t1cNo?: Maybe<Scalars['String']>;
  t1cPhone?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  needReacceptConsents: Scalars['Boolean'];
};

export type IV2CustomerAddress = {
  __typename?: 'V2CustomerAddress';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  telephone: Scalars['String'];
  building?: Maybe<Scalars['String']>;
  addressLine: Scalars['String'];
  subdistrict: IV2Place;
  district: IV2Place;
  province: IV2Place;
  postcode: Scalars['String'];
  addressName?: Maybe<Scalars['String']>;
  customerAddressType: IV2AddressType;
  fullTaxType?: Maybe<IV2TaxType>;
  vatId?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  branchId?: Maybe<Scalars['String']>;
  countryId: Scalars['String'];
  isDefaultBilling: Scalars['Boolean'];
  isDefaultShipping: Scalars['Boolean'];
  city?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['Int']>;
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IV2CustomerExtensionAttributes = {
  __typename?: 'V2CustomerExtensionAttributes';
  isSubscribed?: Maybe<Scalars['Boolean']>;
};

export type IV2DateRange = {
  __typename?: 'V2DateRange';
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type IV2DeleteCartItem = {
  __typename?: 'V2DeleteCartItem';
  success: Scalars['Boolean'];
};

export type IV2DeleteCartItemInput = {
  itemId: Scalars['Int'];
  guestId?: Maybe<Scalars['String']>;
};

export type IV2DeleteCouponInput = {
  guestId?: Maybe<Scalars['String']>;
};

export type IV2DeleteCouponResponse = {
  __typename?: 'V2DeleteCouponResponse';
  status: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type IV2DeleteGiftWrappingInput = {
  guestId?: Maybe<Scalars['String']>;
};

export type IV2DeleteResponseStatus = {
  __typename?: 'V2DeleteResponseStatus';
  status?: Maybe<Scalars['Boolean']>;
};

export type IV2DeliveryOptionByPostcode = {
  __typename?: 'V2DeliveryOptionByPostcode';
  title: Scalars['String'];
  postcode?: Maybe<Scalars['String']>;
  methods: Array<IV2DeliveryOptionByPostcodeDeliveryMethod>;
};

export type IV2DeliveryOptionByPostcodeDeliveryMethod = {
  __typename?: 'V2DeliveryOptionByPostcodeDeliveryMethod';
  method?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  leadTimes?: Maybe<Scalars['String']>;
  freeLabel?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['String']>;
};

export type IV2DeliveryOptionByPostcodeInput = {
  sku: Scalars['String'];
  postcode?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
};

export type IV2DeliveryPackageOptionInput = {
  method_code: Scalars['String'];
};

export type IV2DeliveryShippingMethod = {
  __typename?: 'V2DeliveryShippingMethod';
  title?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export enum IV2Direction {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type IV2Discount = {
  __typename?: 'V2Discount';
  amount: Scalars['Float'];
  percentage: Scalars['Float'];
  effectiveDateRange?: Maybe<IV2DateRange>;
};

export type IV2EstimateShippingInput = {
  postcode?: Maybe<Scalars['String']>;
  countryId?: Maybe<Scalars['ID']>;
  regionId?: Maybe<Scalars['Int']>;
};

export type IV2EstimateShippingMethod = {
  __typename?: 'V2EstimateShippingMethod';
  deliveryMethod?: Maybe<IV2DeliveryShippingMethod>;
  shippingMethods?: Maybe<Array<Maybe<IV2ShippingMethods>>>;
  isAllowSplitOrder?: Maybe<Scalars['Boolean']>;
};

export type IV2ExtensionAttributesInput = {
  pickup_store?: Maybe<IV2PickupStoreInput>;
  pickup_location_id?: Maybe<Scalars['ID']>;
};

export type IV2FilterInput = {
  id: Scalars['String'];
  optionIds: Array<Scalars['String']>;
  condition: IV2FilterInputCondition;
};

export enum IV2FilterInputCondition {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  In = 'IN',
  Like = 'LIKE',
  Finset = 'FINSET',
  From = 'FROM',
  To = 'TO',
  Moreq = 'MOREQ',
  Neq = 'NEQ',
  Nin = 'NIN',
  Notnull = 'NOTNULL',
  Null = 'NULL',
}

export type IV2FilterQueryInput = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  filters?: Maybe<Array<Maybe<IV2FilterInput>>>;
  sorts?: Maybe<Array<IV2SortInput>>;
};

export enum IV2FiltersQueryField {
  Input = 'input',
}

export enum IV2FiltersQueryName {
  StoreFinder = 'store_finder',
}

export type IV2FiltersQueryValues = {
  field: IV2FiltersQueryField;
  value: Scalars['String'];
};

export type IV2Flashdeal = {
  __typename?: 'V2Flashdeal';
  effectiveDateRange: IV2DateRange;
  quantity: IV2FlashdealQuantity;
};

export type IV2FlashdealQuantity = {
  __typename?: 'V2FlashdealQuantity';
  sale: Scalars['Int'];
  available: Scalars['Int'];
  sold: Scalars['Int'];
};

export type IV2FreeShippingOffer = {
  __typename?: 'V2FreeShippingOffer';
  message?: Maybe<Scalars['String']>;
};

export enum IV2Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export type IV2GetT1ProfileResponse = {
  __typename?: 'V2GetT1ProfileResponse';
  mdcMatch?: Maybe<Scalars['Boolean']>;
  t1Profile?: Maybe<IV2T1ProfileData>;
  mdcProfile?: Maybe<IV2Customer>;
};

export type IV2InstallmentPlan = {
  __typename?: 'V2InstallmentPlan';
  id: Scalars['ID'];
  title: Scalars['String'];
  period: Scalars['Int'];
  interestRate: Scalars['Float'];
  validDateRange: IV2DateRange;
  amountRange: IV2AmountRange;
  bank: IV2Bank;
};

export type IV2InventoryStock = {
  __typename?: 'V2InventoryStock';
  sku: Scalars['String'];
  quantity: Scalars['Int'];
};

export type IV2LineItems = {
  __typename?: 'V2LineItems';
  entity_id?: Maybe<Scalars['ID']>;
  line_id: Scalars['ID'];
  line_number?: Maybe<Scalars['String']>;
};

export type IV2LineItemsInput = {
  line_id: Scalars['ID'];
  line_number?: Maybe<Scalars['String']>;
};

export type IV2ListStorePickUp = {
  __typename?: 'V2ListStorePickUp';
  page?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  isResultFromGoogle?: Maybe<Scalars['Boolean']>;
  storeList?: Maybe<Array<Maybe<IV2StoreItem>>>;
};

export type IV2Media = {
  __typename?: 'V2Media';
  id: Scalars['ID'];
  type: IV2MediaType;
  url: Scalars['String'];
  title: Scalars['String'];
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  storeId?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export enum IV2MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export type IV2MethodData = {
  __typename?: 'V2MethodData';
  carrier_title?: Maybe<Scalars['String']>;
  method_title?: Maybe<Scalars['String']>;
  carrier_code?: Maybe<Scalars['String']>;
  method_code?: Maybe<Scalars['String']>;
  method_labels?: Maybe<IV2MethodLabels>;
};

export type IV2MethodLabels = {
  __typename?: 'V2MethodLabels';
  label?: Maybe<Scalars['String']>;
  date_time?: Maybe<Scalars['String']>;
  time_label?: Maybe<Scalars['String']>;
};

export type IV2Order = {
  __typename?: 'V2Order';
  customerFirstName?: Maybe<Scalars['String']>;
  customerLastName?: Maybe<Scalars['String']>;
  customerEmail?: Maybe<Scalars['String']>;
  pickupCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  incrementId: Scalars['String'];
  orderStatus?: Maybe<Scalars['String']>;
  deliveryStatus?: Maybe<Scalars['String']>;
  payment?: Maybe<IV2OrderPayment>;
  shipping?: Maybe<IV2OrderShipping>;
  itemsGroupBySeller?: Maybe<Array<Maybe<IV2OrderItemGroupBySeller>>>;
};

export type IV2OrderAddress = {
  __typename?: 'V2OrderAddress';
  id?: Maybe<Scalars['ID']>;
  customerId?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  postcode: Scalars['String'];
  countryId: Scalars['ID'];
  company?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['ID']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']>;
  isDefaultBilling?: Maybe<Scalars['Boolean']>;
  subDistrict?: Maybe<IV2Place>;
  district?: Maybe<IV2Place>;
  province?: Maybe<IV2Province>;
  customerAddressType: Scalars['String'];
  isFullTaxRequest?: Maybe<Scalars['Boolean']>;
  addressLine?: Maybe<Scalars['String']>;
  addressName?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  branchId?: Maybe<Scalars['String']>;
  fullTaxType?: Maybe<IV2TaxType>;
};

export type IV2OrderFilterQueryInput = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  filters?: Maybe<Array<Maybe<IV2FilterInput>>>;
  sorts?: Maybe<Array<IV2SortInput>>;
};

export type IV2OrderInput = {
  incrementId: Scalars['String'];
  email?: Maybe<Scalars['String']>;
};

export type IV2OrderItem = {
  __typename?: 'V2OrderItem';
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  brandName?: Maybe<Scalars['String']>;
  options?: Maybe<Array<IV2OrderItemOptions>>;
  quantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  marketplaceType?: Maybe<Scalars['String']>;
};

export type IV2OrderItemGroupBySeller = {
  __typename?: 'V2OrderItemGroupBySeller';
  sellerName?: Maybe<Scalars['String']>;
  packages?: Maybe<Array<Maybe<IV2OrderPackages>>>;
  otherItem?: Maybe<IV2OrderOtherCanceledItem>;
  canceledItem?: Maybe<IV2OrderOtherCanceledItem>;
};

export type IV2OrderItemOptions = {
  __typename?: 'V2OrderItemOptions';
  attributeCode?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type IV2OrderOtherCanceledItem = {
  __typename?: 'V2OrderOtherCanceledItem';
  status?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<IV2OrderItem>>>;
};

export type IV2OrderPackages = {
  __typename?: 'V2OrderPackages';
  status?: Maybe<Scalars['String']>;
  trackNumber?: Maybe<Scalars['String']>;
  trackURL?: Maybe<Scalars['String']>;
  shipmentProvider?: Maybe<Scalars['String']>;
  refNumber?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<IV2OrderItem>>>;
  isMarketplaceInfo?: Maybe<Scalars['Boolean']>;
};

export type IV2OrderPayment = {
  __typename?: 'V2OrderPayment';
  methodLabel?: Maybe<Scalars['String']>;
  methodCode?: Maybe<Scalars['String']>;
  subtotal: Scalars['Float'];
  grandTotal: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  the1Redemption?: Maybe<IV2OrderPaymentThe1Redemption>;
  creditCardOnTop?: Maybe<Scalars['Float']>;
  hasGiftWrap: Scalars['Boolean'];
  giftWrapping?: Maybe<Scalars['Float']>;
  otherDiscount?: Maybe<Scalars['Float']>;
  couponCodes?: Maybe<Array<Maybe<IV2CouponCode>>>;
  shippingCost?: Maybe<Scalars['Float']>;
};

export type IV2OrderPaymentThe1Redemption = {
  __typename?: 'V2OrderPaymentThe1Redemption';
  point: Scalars['Float'];
  discount: Scalars['Float'];
};

export type IV2OrderResult = {
  __typename?: 'V2OrderResult';
  orders?: Maybe<Array<Maybe<IV2Order>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type IV2OrderShipping = {
  __typename?: 'V2OrderShipping';
  description?: Maybe<Scalars['String']>;
  methodLabel: Scalars['String'];
  methodCode: Scalars['String'];
  shippingAddress: IV2OrderAddress;
  billingAddress?: Maybe<IV2OrderAddress>;
};

export type IV2PackageInput = {
  line_items: Array<IV2LineItemsInput>;
  stock_id: Scalars['ID'];
  carrier_code: Scalars['String'];
  method_code: Scalars['String'];
  sub_package?: Maybe<IV2SubPackageInput>;
};

export type IV2PackageOption = {
  __typename?: 'V2PackageOption';
  product?: Maybe<Array<Maybe<IV2PackageOptionProduct>>>;
  line_items?: Maybe<Array<Maybe<IV2LineItems>>>;
  delivery_method?: Maybe<Scalars['String']>;
  stock_id?: Maybe<Scalars['ID']>;
  is_package_available?: Maybe<Scalars['Boolean']>;
  has_sub_package?: Maybe<Scalars['Boolean']>;
  qty_data?: Maybe<IV2QtyData>;
  method_data?: Maybe<IV2MethodData>;
  sub_package: Array<IV2SubPackage>;
};

export type IV2PackageOptionProduct = {
  __typename?: 'V2PackageOptionProduct';
  detail?: Maybe<IV2Product>;
  product_id: Scalars['ID'];
  item_id: Scalars['ID'];
  sku?: Maybe<Scalars['String']>;
  qty_available_current_sku?: Maybe<Scalars['Int']>;
};

export enum IV2PaymentMethod {
  CashOnDelivery = 'CASH_ON_DELIVERY',
  FullPayment = 'FULL_PAYMENT',
  Installment = 'INSTALLMENT',
  BankTransfer = 'BANK_TRANSFER',
  PayAtStore = 'PAY_AT_STORE',
  LinePay = 'LINE_PAY',
}

export type IV2PickupStoreInput = {
  store_id?: Maybe<Scalars['ID']>;
  pickup_store_id?: Maybe<Scalars['ID']>;
  receiver_name?: Maybe<Scalars['String']>;
  receiver_phone?: Maybe<Scalars['String']>;
};

export type IV2PickupStoresLocationDistance = {
  __typename?: 'V2PickupStoresLocationDistance';
  text?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type IV2Place = {
  __typename?: 'V2Place';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IV2PlaceInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IV2Preorder = {
  __typename?: 'V2Preorder';
  shippingDateTime: Scalars['DateTime'];
};

export type IV2PriceSummary = {
  __typename?: 'V2PriceSummary';
  original: Scalars['Float'];
  final: Scalars['Float'];
  discount?: Maybe<IV2Discount>;
};

export type IV2Product = {
  id: Scalars['ID'];
  brand?: Maybe<IV2Brand>;
  breadcrumbs: Array<IV2Breadcrumb>;
  mediaGallery: Array<IV2Media>;
  urlKey: Scalars['String'];
  name: Scalars['String'];
  priceSummary: IV2PriceSummary;
  sku: Scalars['String'];
  type: IV2ProductType;
  overlayImageUrl?: Maybe<Scalars['String']>;
  installmentPlans: Array<IV2InstallmentPlan>;
  the1Redemption?: Maybe<IV2The1Redemption>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  purchaseLimit?: Maybe<IV2PurchaseLimit>;
  shippingMethods: Array<IV2ShippingMethod>;
  paymentMethods: Array<IV2PaymentMethod>;
  badge?: Maybe<Scalars['String']>;
  flags: Array<IV2ProductFlag>;
  seller: IV2Seller;
  preorder?: Maybe<IV2Preorder>;
  promotions: Array<IV2Promotion>;
  promotionTag?: Maybe<Scalars['String']>;
  flashdeal?: Maybe<IV2Flashdeal>;
  reviews: Array<IV2Review>;
  rating?: Maybe<IV2Rating>;
  links: IV2ProductLinks;
  createdAt?: Maybe<Scalars['DateTime']>;
  collectionName?: Maybe<Scalars['String']>;
  labelOptions?: Maybe<Array<Maybe<IV2ProductLabelOption>>>;
};

export enum IV2ProductFlag {
  New = 'NEW',
  Marketplace = 'MARKETPLACE',
  OnlineExclusive = 'ONLINE_EXCLUSIVE',
  GiftWrapping = 'GIFT_WRAPPING',
  InStock = 'IN_STOCK',
  OnlyAtCentral = 'ONLY_AT_CENTRAL',
  Beauty = 'BEAUTY',
  AllowReturn = 'ALLOW_RETURN',
  AllowExpress = 'ALLOW_EXPRESS',
  PreOrder = 'PRE_ORDER',
  ByOrder = 'BY_ORDER',
  OnlineSalable = 'ONLINE_SALABLE',
  OfflineSalable = 'OFFLINE_SALABLE',
  ShowProductOriginalPrice = 'SHOW_PRODUCT_ORIGINAL_PRICE',
}

export type IV2ProductLabelOption = {
  __typename?: 'V2ProductLabelOption';
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type IV2ProductLinks = {
  __typename?: 'V2ProductLinks';
  related: Array<IV2Product>;
  upSell: Array<IV2Product>;
  crossSell: Array<IV2Product>;
  similar: Array<IV2Product>;
};

export type IV2ProductOption = {
  __typename?: 'V2ProductOption';
  id: Scalars['ID'];
  label: Scalars['String'];
  attributeCode: Scalars['String'];
  value: IV2ConfigurableOptionValue;
};

export type IV2ProductRecommendInput = {
  customerId?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type IV2ProductRecommendResult = {
  __typename?: 'V2ProductRecommendResult';
  totalCount: Scalars['Int'];
  products: Array<IV2Product>;
};

export type IV2ProductSearchFilterCategoryResult = IV2ProductSearchFilterResult & {
  __typename?: 'V2ProductSearchFilterCategoryResult';
  id: Scalars['String'];
  label: Scalars['String'];
  options: Array<IV2ProductSearchFilterCategoryResultOption>;
};

export type IV2ProductSearchFilterCategoryResultOption = {
  __typename?: 'V2ProductSearchFilterCategoryResultOption';
  id: Scalars['String'];
  label: Scalars['String'];
  productCount: Scalars['Int'];
  children: Array<IV2ProductSearchFilterCategoryResultOption>;
};

export enum IV2ProductSearchFilterConditionInput {
  Eq = 'EQ',
  In = 'IN',
  Gte = 'GTE',
  Lte = 'LTE',
}

export type IV2ProductSearchFilterInput = {
  id: Scalars['String'];
  optionIds: Array<Scalars['String']>;
  condition: IV2ProductSearchFilterConditionInput;
};

export type IV2ProductSearchFilterNormalResult = IV2ProductSearchFilterResult & {
  __typename?: 'V2ProductSearchFilterNormalResult';
  id: Scalars['String'];
  label: Scalars['String'];
  options: Array<IV2ProductSearchFilterNormalResultOption>;
};

export type IV2ProductSearchFilterNormalResultOption = {
  __typename?: 'V2ProductSearchFilterNormalResultOption';
  id: Scalars['String'];
  label: Scalars['String'];
  productCount: Scalars['Int'];
};

export type IV2ProductSearchFilterRangeResult = IV2ProductSearchFilterResult & {
  __typename?: 'V2ProductSearchFilterRangeResult';
  id: Scalars['String'];
  label: Scalars['String'];
  options: Array<IV2ProductSearchFilterRangeResultOption>;
};

export type IV2ProductSearchFilterRangeResultOption = {
  __typename?: 'V2ProductSearchFilterRangeResultOption';
  id: Scalars['String'];
  label: Scalars['String'];
  value: Scalars['Float'];
};

export type IV2ProductSearchFilterResult = {
  id: Scalars['String'];
  label: Scalars['String'];
};

export type IV2ProductSearchFilterResultUnion =
  | IV2ProductSearchFilterNormalResult
  | IV2ProductSearchFilterRangeResult
  | IV2ProductSearchFilterCategoryResult;

export type IV2ProductSearchInput = {
  page: Scalars['Int'];
  limit: Scalars['Int'];
  filters: Array<Maybe<IV2ProductSearchFilterInput>>;
  sort?: Maybe<IV2ProductSearchSortInput>;
  keyword?: Maybe<Scalars['String']>;
};

export type IV2ProductSearchResult = {
  __typename?: 'V2ProductSearchResult';
  totalCount: Scalars['Int'];
  filters?: Maybe<Array<IV2ProductSearchFilterResultUnion>>;
  products: Array<IV2Product>;
  sorts: Array<IV2ProductSearchSortResult>;
};

export type IV2ProductSearchSortInput = {
  id: Scalars['String'];
  direction: IV2Direction;
};

export type IV2ProductSearchSortResult = {
  __typename?: 'V2ProductSearchSortResult';
  id: Scalars['String'];
  label: Scalars['String'];
  direction: IV2Direction;
};

export enum IV2ProductType {
  Simple = 'SIMPLE',
  Configurable = 'CONFIGURABLE',
  Bundle = 'BUNDLE',
  Virtual = 'VIRTUAL',
}

export type IV2Promotion = {
  __typename?: 'V2Promotion';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  effectiveDateRange: IV2DateRange;
};

export type IV2Province = {
  __typename?: 'V2Province';
  id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IV2ProvinceInput = {
  id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IV2PurchaseLimit = {
  __typename?: 'V2PurchaseLimit';
  quantity: IV2AmountRange;
};

export type IV2QtyData = {
  __typename?: 'V2QtyData';
  total_qty_available_in_package?: Maybe<Scalars['Int']>;
  total_qty_for_current_package?: Maybe<Scalars['Int']>;
  total_qty_ordered_in_cart?: Maybe<Scalars['Int']>;
};

export type IV2Rating = {
  __typename?: 'V2Rating';
  average: Scalars['Float'];
  totalVoteCount: Scalars['Int'];
};

export type IV2RatingOptionInput = {
  optionId?: Maybe<Scalars['Int']>;
  ratingId?: Maybe<Scalars['Int']>;
};

export type IV2Region = {
  __typename?: 'V2Region';
  regionCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  regionId?: Maybe<Scalars['Int']>;
};

export type IV2Review = {
  __typename?: 'V2Review';
  id: Scalars['ID'];
  title: Scalars['String'];
  detail: Scalars['String'];
  imageUrls: Array<Scalars['String']>;
  reviewer: IV2Reviewer;
  rating: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type IV2Reviewer = {
  __typename?: 'V2Reviewer';
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  province?: Maybe<IPlace>;
};

export type IV2ReviewInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  province?: Maybe<IV2ReviewProvinceInput>;
  title: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  ratingOption: IV2RatingOptionInput;
  sku: Scalars['String'];
  imageUrls?: Maybe<Array<Scalars['String']>>;
};

export type IV2ReviewProvinceInput = {
  id?: Maybe<Scalars['String']>;
};

export type IV2SearchConditionsFiltersQuery = {
  name: IV2FiltersQueryName;
  values: Array<Maybe<IV2FiltersQueryValues>>;
};

export type IV2SearchConditionsQuery = {
  page: Scalars['Int'];
  limit: Scalars['Int'];
  filters?: Maybe<Array<Maybe<IV2SearchConditionsFiltersQuery>>>;
  sorters?: Maybe<Array<Maybe<IV2SearchConditionsSortersQuery>>>;
};

export type IV2SearchConditionsSortersQuery = {
  name: ISortersQueryName;
  values: Array<Maybe<ISortersQueryValues>>;
};

export type IV2Seller = {
  __typename?: 'V2Seller';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type IV2SetShippingInformationInput = {
  package?: Maybe<IV2PackageInput>;
  billing_address: IV2ShippingAddressInput;
  shipping_address: IV2ShippingAddressInput;
  extension_attributes?: Maybe<IV2ExtensionAttributesInput>;
  carrier_code?: Maybe<Scalars['String']>;
  method_code?: Maybe<Scalars['String']>;
};

export type IV2SetValidatePinInput = {
  latitude: Scalars['String'];
  longitude: Scalars['String'];
};

export type IV2ShippingAddressInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  vat_id?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['ID']>;
  region?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  default_billing?: Maybe<Scalars['Boolean']>;
  default_shipping?: Maybe<Scalars['Boolean']>;
  region_code?: Maybe<Scalars['String']>;
  same_as_billing?: Maybe<Scalars['Int']>;
  save_in_address_book?: Maybe<Scalars['Int']>;
  customer_id?: Maybe<Scalars['Int']>;
  address_id?: Maybe<Scalars['ID']>;
  address_name?: Maybe<Scalars['String']>;
  address_line?: Maybe<Scalars['String']>;
  customer_address_type?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['ID']>;
  subdistrict?: Maybe<Scalars['String']>;
  subdistrict_id?: Maybe<Scalars['ID']>;
  remark?: Maybe<Scalars['String']>;
  billing_type?: Maybe<Scalars['String']>;
  branch_id?: Maybe<Scalars['ID']>;
  full_tax_request?: Maybe<Scalars['String']>;
  full_tax_type?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<IAddressInputCustomAttributes>;
};

export enum IV2ShippingMethod {
  StandardPickUp = 'STANDARD_PICK_UP',
  TwoHoursPickUp = 'TWO_HOURS_PICK_UP',
  StandardDelivery = 'STANDARD_DELIVERY',
  SameDayDelivery = 'SAME_DAY_DELIVERY',
  NextDayDelivery = 'NEXT_DAY_DELIVERY',
  ThreeHoursDelivery = 'THREE_HOURS_DELIVERY',
}

export type IV2ShippingMethodCarrier = {
  __typename?: 'V2ShippingMethodCarrier';
  title?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type IV2ShippingMethodDeliveryTimeLabel = {
  __typename?: 'V2ShippingMethodDeliveryTimeLabel';
  methodLabel?: Maybe<Scalars['String']>;
  timeLabel?: Maybe<Scalars['String']>;
  minLeadTime?: Maybe<Scalars['DateTime']>;
  maxLeadTime?: Maybe<Scalars['DateTime']>;
};

export type IV2ShippingMethods = {
  __typename?: 'V2ShippingMethods';
  carrier?: Maybe<IV2ShippingMethodCarrier>;
  method?: Maybe<IV2DeliveryShippingMethod>;
  amount?: Maybe<Scalars['Float']>;
  deliveryTimeLabel?: Maybe<IV2ShippingMethodDeliveryTimeLabel>;
  pickupStoresLocations?: Maybe<Array<Maybe<IV2StoresLocation>>>;
};

export type IV2SimpleProduct = IV2Product & {
  __typename?: 'V2SimpleProduct';
  id: Scalars['ID'];
  brand?: Maybe<IV2Brand>;
  breadcrumbs: Array<IV2Breadcrumb>;
  urlKey: Scalars['String'];
  mediaGallery: Array<IV2Media>;
  name: Scalars['String'];
  priceSummary: IV2PriceSummary;
  sku: Scalars['String'];
  type: IV2ProductType;
  installmentPlans: Array<IV2InstallmentPlan>;
  the1Redemption?: Maybe<IV2The1Redemption>;
  overlayImageUrl?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  purchaseLimit?: Maybe<IV2PurchaseLimit>;
  shippingMethods: Array<IV2ShippingMethod>;
  paymentMethods: Array<IV2PaymentMethod>;
  badge?: Maybe<Scalars['String']>;
  flags: Array<IV2ProductFlag>;
  seller: IV2Seller;
  preorder?: Maybe<IV2Preorder>;
  promotions: Array<IV2Promotion>;
  promotionTag?: Maybe<Scalars['String']>;
  flashdeal?: Maybe<IV2Flashdeal>;
  reviews: Array<IV2Review>;
  rating?: Maybe<IV2Rating>;
  links: IV2ProductLinks;
  createdAt?: Maybe<Scalars['DateTime']>;
  collectionName?: Maybe<Scalars['String']>;
  labelOptions?: Maybe<Array<Maybe<IV2ProductLabelOption>>>;
  inventoryStock?: Maybe<IV2InventoryStock>;
};

export enum IV2SortersQueryField {
  Latitude = 'latitude',
  Longitude = 'longitude',
}

export enum IV2SortersQueryName {
  CustomerLocation = 'customer_location',
}

export type IV2SortersQueryValues = {
  field: IV2SortersQueryField;
  value: Scalars['String'];
};

export type IV2SortInput = {
  id: Scalars['String'];
  direction: IV2Direction;
};

export enum IV2StockInvalidFlag {
  OutOfStock = 'OUT_OF_STOCK',
  NotEnoughStock = 'NOT_ENOUGH_STOCK',
}

export type IV2StoreItem = {
  __typename?: 'V2StoreItem';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  address?: Maybe<IV2StoresLocationAddress>;
  distance?: Maybe<Scalars['String']>;
  openingHours?: Maybe<Array<Maybe<IV2StoresLocationOpeningHour>>>;
  additionalText?: Maybe<IV2StoresLocationAdditionalText>;
};

export type IV2StorePickUpInput = {
  guestId?: Maybe<Scalars['String']>;
  filters?: Maybe<IV2SearchConditionsQuery>;
};

export type IV2StoresLocation = {
  __typename?: 'V2StoresLocation';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  address?: Maybe<IV2StoresLocationAddress>;
  additionalText?: Maybe<IV2StoresLocationAdditionalText>;
  openingHours?: Maybe<Array<Maybe<IV2StoresLocationOpeningHour>>>;
  salableItems?: Maybe<Array<Maybe<IV2StoresLocationSalableItems>>>;
  cutOffTime?: Maybe<Scalars['String']>;
  stockStatusCode?: Maybe<Scalars['String']>;
  stockStatusLabel?: Maybe<Scalars['String']>;
};

export type IV2StoresLocationAdditionalText = {
  __typename?: 'V2StoresLocationAdditionalText';
  totalAvailable?: Maybe<Scalars['Int']>;
  totalOrdered?: Maybe<Scalars['Int']>;
  timeUnit?: Maybe<Scalars['String']>;
  timeLabel?: Maybe<Scalars['String']>;
  timeValue?: Maybe<Scalars['Int']>;
  dateTime?: Maybe<Scalars['DateTime']>;
};

export type IV2StoresLocationAddress = {
  __typename?: 'V2StoresLocationAddress';
  addressLine?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  subDistrict?: Maybe<IV2Place>;
  district?: Maybe<IV2Place>;
  province?: Maybe<IV2Province>;
  countryCode?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
};

export type IV2StoresLocationOpeningHour = {
  __typename?: 'V2StoresLocationOpeningHour';
  day?: Maybe<Scalars['String']>;
  open?: Maybe<Scalars['String']>;
  close?: Maybe<Scalars['String']>;
};

export type IV2StoresLocationSalableItems = {
  __typename?: 'V2StoresLocationSalableItems';
  sku?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['Int']>;
};

export type IV2SubPackage = {
  __typename?: 'V2SubPackage';
  product?: Maybe<Array<Maybe<IV2PackageOptionProduct>>>;
  line_items?: Maybe<Array<Maybe<IV2LineItems>>>;
  delivery_method?: Maybe<Scalars['String']>;
  stock_id: Scalars['ID'];
  is_package_available?: Maybe<Scalars['Boolean']>;
  has_sub_package?: Maybe<Scalars['Boolean']>;
  qty_data?: Maybe<IV2QtyData>;
  method_data?: Maybe<IV2MethodData>;
};

export type IV2SubPackageInput = {
  line_items: Array<IV2LineItemsInput>;
  stock_id: Scalars['ID'];
  carrier_code: Scalars['String'];
  method_code: Scalars['String'];
};

export type IV2SuggestKeywordInput = {
  keyword: Scalars['String'];
  size?: Maybe<Scalars['Int']>;
};

export type IV2SuggestSearchCategory = {
  __typename?: 'V2SuggestSearchCategory';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  urlPath?: Maybe<Scalars['String']>;
  isGtm?: Maybe<Scalars['Boolean']>;
};

export type IV2SuggestSearchInput = {
  keyword: Scalars['String'];
  productSize?: Maybe<Scalars['Int']>;
  categorySize?: Maybe<Scalars['Int']>;
  suggestionTermSize?: Maybe<Scalars['Int']>;
};

export type IV2SuggestSearchResult = {
  __typename?: 'V2SuggestSearchResult';
  products: Array<IV2Product>;
  categories: Array<IV2SuggestSearchCategory>;
  suggestionTerms: Array<Scalars['String']>;
};

export type IV2SuggestSearchResultSuggestionTermsArgs = {
  input?: Maybe<IV2SuggestSearchInput>;
};

export type IV2SummarySection = {
  __typename?: 'V2SummarySection';
  id: Scalars['String'];
  title: Scalars['String'];
  amount: Scalars['Float'];
};

export type IV2T1AddressInterface = {
  __typename?: 'V2T1AddressInterface';
  addressType?: Maybe<Scalars['String']>;
  typeOfHousing?: Maybe<Scalars['String']>;
  homeNo?: Maybe<Scalars['String']>;
  villageOrBuilding?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  moo?: Maybe<Scalars['String']>;
  soi?: Maybe<Scalars['String']>;
  yak?: Maybe<Scalars['String']>;
  road?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  subDistrict?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

export type IV2T1Card = {
  __typename?: 'V2T1Card';
  cardNo?: Maybe<Scalars['String']>;
  pointsBalance?: Maybe<Scalars['Int']>;
  pointsExpiryThisYear?: Maybe<Scalars['Int']>;
};

export type IV2T1DataForm = {
  __typename?: 'V2T1DataForm';
  customer?: Maybe<IV2T1DataFormCustomer>;
};

export type IV2T1DataFormCustomer = {
  __typename?: 'V2T1DataFormCustomer';
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  website_id?: Maybe<Scalars['Int']>;
  custom_attributes?: Maybe<Array<Maybe<IV2T1DataFormCustomerCustomAttributes>>>;
};

export type IV2T1DataFormCustomerCustomAttributes = {
  __typename?: 'V2T1DataFormCustomerCustomAttributes';
  attribute_code?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type IV2T1MdcProfileResponse = {
  __typename?: 'V2T1MdcProfileResponse';
  data?: Maybe<IV2Customer>;
  success?: Maybe<Scalars['Boolean']>;
  msg?: Maybe<Scalars['String']>;
};

export type IV2T1NameInterface = {
  __typename?: 'V2T1NameInterface';
  en?: Maybe<Scalars['String']>;
  th?: Maybe<Scalars['String']>;
};

export type IV2T1OnlineEmail = {
  __typename?: 'V2T1OnlineEmail';
  value?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type IV2T1OnlineMobile = {
  __typename?: 'V2T1OnlineMobile';
  country?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type IV2T1ProfileData = {
  __typename?: 'V2T1ProfileData';
  accountType?: Maybe<Scalars['String']>;
  address?: Maybe<Array<Maybe<IV2T1AddressInterface>>>;
  cards?: Maybe<Array<Maybe<IV2T1Card>>>;
  dateOfBirth?: Maybe<Scalars['String']>;
  employeeBUShortCode?: Maybe<Scalars['String']>;
  employeeID?: Maybe<Scalars['String']>;
  firstName?: Maybe<IV2T1NameInterface>;
  gender?: Maybe<Scalars['String']>;
  isStaff?: Maybe<Scalars['String']>;
  lastName?: Maybe<IV2T1NameInterface>;
  memberLanguagePref?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  style?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<IV2T1NameInterface>;
  svoc?: Maybe<Scalars['JSON']>;
  svocError?: Maybe<Scalars['String']>;
  segments?: Maybe<Array<Maybe<IV2T1Segment>>>;
  imageProfile?: Maybe<Scalars['String']>;
  consentDate?: Maybe<Scalars['String']>;
  userAccountID?: Maybe<Scalars['String']>;
  onlineEmail?: Maybe<IV2T1OnlineEmail>;
  onlineMobile?: Maybe<IV2T1OnlineMobile>;
  consentFlag?: Maybe<Scalars['String']>;
  consentVersion?: Maybe<Scalars['String']>;
  dcsConsentVersion?: Maybe<Scalars['String']>;
};

export type IV2T1ProfileResponse = {
  __typename?: 'V2T1ProfileResponse';
  data?: Maybe<IV2T1ProfileData>;
  success?: Maybe<Scalars['Boolean']>;
  msg?: Maybe<Scalars['String']>;
};

export type IV2T1Segment = {
  __typename?: 'V2T1Segment';
  segmentLevelID?: Maybe<Scalars['String']>;
  segmentLevel?: Maybe<Scalars['String']>;
  segmentLevelLongDesc?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
};

export enum IV2TaxType {
  Personal = 'PERSONAL',
  Company = 'COMPANY',
}

export type IV2The1Redemption = {
  __typename?: 'V2The1Redemption';
  earnPoint: Scalars['Int'];
  redeemPoint: Scalars['Int'];
};

export type IV2TrendSearchResult = {
  __typename?: 'V2TrendSearchResult';
  trendingTerms: Array<Scalars['String']>;
};

export type IV2UpdateCustomerExtensionAttributes = {
  isSubscribed?: Maybe<Scalars['Boolean']>;
};

export type IV2UpdateInputCustomer = {
  id?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  createdIn?: Maybe<Scalars['String']>;
  defaultBilling?: Maybe<Scalars['String']>;
  defaultShipping?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  gender?: Maybe<IV2Gender>;
  taxvat?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['Int']>;
  websiteId?: Maybe<Scalars['Int']>;
  addresses?: Maybe<Scalars['JSON']>;
  disableAutoGroupChange?: Maybe<Scalars['Int']>;
  extensionAttributes?: Maybe<IV2UpdateCustomerExtensionAttributes>;
  customAttributes?: Maybe<Scalars['JSON']>;
  isSubscribed?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  t1cNo?: Maybe<Scalars['String']>;
  t1cPhone?: Maybe<Scalars['String']>;
  language: Scalars['String'];
};

export type IV2Wishlist = {
  __typename?: 'V2Wishlist';
  groups?: Maybe<Array<Maybe<IV2WishlistGroup>>>;
  totalCount: Scalars['Int'];
};

export type IV2WishlistFilterInput = {
  id: Scalars['String'];
  optionIds: Array<Scalars['String']>;
  condition: IV2WishlistFilterInputCondition;
};

export enum IV2WishlistFilterInputCondition {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  In = 'IN',
  Like = 'LIKE',
  Finset = 'FINSET',
  From = 'FROM',
  Moreq = 'MOREQ',
  Neq = 'NEQ',
  Nin = 'NIN',
  Notnull = 'NOTNULL',
  Null = 'NULL',
}

export type IV2WishlistGroup = {
  __typename?: 'V2WishlistGroup';
  id: Scalars['ID'];
  customerId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  sharingCode?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['Int']>;
  shared?: Maybe<Scalars['Int']>;
  items?: Maybe<IV2WishlistGroupListItem>;
};

export type IV2WishlistGroupItemsArgs = {
  input?: Maybe<IV2WishlistItemFilterInput>;
};

export type IV2WishlistGroupItem = {
  __typename?: 'V2WishlistGroupItem';
  id: Scalars['ID'];
  wishlistId: Scalars['Int'];
  storeId?: Maybe<Scalars['Int']>;
  addedAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  product?: Maybe<IV2Product>;
  productId?: Maybe<Scalars['String']>;
  parent?: Maybe<IV2Product>;
  productOptions?: Maybe<Array<Maybe<IV2CustomAttributes>>>;
};

export type IV2WishlistGroupListItem = {
  __typename?: 'V2WishlistGroupListItem';
  data?: Maybe<Array<Maybe<IV2WishlistGroupItem>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type IV2WishlistInput = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  filters?: Maybe<Array<Maybe<IV2WishlistFilterInput>>>;
  sorts?: Maybe<Array<IV2WishlistSortInput>>;
};

export type IV2WishlistItemFilterInput = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type IV2WishlistItemProductOptionInput = {
  value?: Maybe<Scalars['String']>;
  attributeCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IV2WishlistSortInput = {
  id: Scalars['String'];
  direction: IV2Direction;
};

export type IVideoContent = {
  __typename?: 'VideoContent';
  media_type?: Maybe<Scalars['String']>;
  video_provider?: Maybe<Scalars['String']>;
  video_url?: Maybe<Scalars['String']>;
  video_title?: Maybe<Scalars['String']>;
  video_description?: Maybe<Scalars['String']>;
  video_metadata?: Maybe<Scalars['String']>;
};

export type IVideoItemProperty = {
  __typename?: 'VideoItemProperty';
  videoId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type IVideoProperty = {
  __typename?: 'VideoProperty';
  videoId?: Maybe<Scalars['String']>;
};

export type IVideoStyle = {
  __typename?: 'VideoStyle';
  autoplay?: Maybe<Scalars['Boolean']>;
};

export enum IViewType {
  Text = 'TEXT',
  Image = 'IMAGE',
  Banner = 'BANNER',
  OneColumnHorizontalCarousel = 'ONE_COLUMN_HORIZONTAL_CAROUSEL',
  TwoColumnVerticalCarousel = 'TWO_COLUMN_VERTICAL_CAROUSEL',
  Divider = 'DIVIDER',
  Video = 'VIDEO',
  Header = 'HEADER',
  Button = 'BUTTON',
  Product = 'PRODUCT',
  ProductScroll = 'PRODUCT_SCROLL',
  ImageLabel = 'IMAGE_LABEL',
  CategoryBar = 'CATEGORY_BAR',
  SectionTitle = 'SECTION_TITLE',
  VideoSelector = 'VIDEO_SELECTOR',
  VideoItem = 'VIDEO_ITEM',
}

export type IVipInterestInput = {
  url: Scalars['String'];
  t1No: Scalars['String'];
  ids: Scalars['String'];
};

export type IVipInterestResponse = {
  __typename?: 'VipInterestResponse';
  status?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ids?: Maybe<Scalars['String']>;
  need_assistance?: Maybe<Scalars['Int']>;
};

export type IVipListResponse = {
  __typename?: 'VipListResponse';
  status?: Maybe<Scalars['Boolean']>;
  urls?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IVipNeedAssistanceInput = {
  url: Scalars['String'];
  t1No: Scalars['String'];
};

export type IVipNeedAssistanceResponse = {
  __typename?: 'VipNeedAssistanceResponse';
  status?: Maybe<Scalars['Boolean']>;
  urls?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IVipValidateInput = {
  url: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  t1No: Scalars['String'];
};

export type IVipValidateResponse = {
  __typename?: 'VipValidateResponse';
  status?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ids?: Maybe<Scalars['String']>;
  need_assistance?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
  t1No?: Maybe<Scalars['String']>;
};

export type IVoucherDetail = {
  __typename?: 'VoucherDetail';
  voucherCode?: Maybe<Scalars['String']>;
  voucherKey?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  reservedExpiresAt?: Maybe<Scalars['String']>;
  voucherStartsAt?: Maybe<Scalars['String']>;
  voucherExpiresAt?: Maybe<Scalars['String']>;
  issuedAt?: Maybe<Scalars['String']>;
  reward?: Maybe<IReward>;
};

export type IVoucherListFilter = {
  id: IVoucherListFilterId;
  optionIds: Array<Maybe<Scalars['String']>>;
};

export enum IVoucherListFilterId {
  RewardName = 'reward_name',
  RewardId = 'reward_id',
  RewardType = 'reward_type',
  CampaignId = 'campaign_id',
  State = 'state',
  RewardTags = 'reward_tags',
  Lang = 'lang',
  CategoryIds = 'category_ids',
}

export type IVoucherListSort = {
  id: IVoucherListSortId;
  direction: IV2Direction;
};

export enum IVoucherListSortId {
  Id = 'id',
  State = 'state',
  RewardName = 'reward_name',
  RewardDisplayName = 'reward_display_name',
  VoucherExpiresAt = 'voucher_expires_at',
  IssuedAt = 'issued_at',
  ReservedExpiresAt = 'reserved_expires_at',
}

export type IVouchers = {
  __typename?: 'Vouchers';
  total?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  lastPage?: Maybe<Scalars['Int']>;
  from?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<IVoucherDetail>>>;
};

export type IWishlist = {
  __typename?: 'Wishlist';
  wishlist_id: Scalars['Int'];
  customer_id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  sharing_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['Int']>;
  shared?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Maybe<IWishlistItem>>>;
};

export type IWishlistFilterInput = {
  field?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type IWishlistItem = {
  __typename?: 'WishlistItem';
  wishlist_item_id: Scalars['Int'];
  wishlist_id: Scalars['Int'];
  product_id?: Maybe<Scalars['Int']>;
  store_id?: Maybe<Scalars['Int']>;
  added_at?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  qty?: Maybe<Scalars['String']>;
  product_name?: Maybe<Scalars['String']>;
  product?: Maybe<IProduct>;
  sku?: Maybe<Scalars['String']>;
  custom_attributes?: Maybe<Array<Maybe<ICustomAttributes>>>;
};

export type IWishlistItemSearchResult = {
  __typename?: 'WishlistItemSearchResult';
  items?: Maybe<Array<Maybe<IWishlistItem>>>;
  total_count?: Maybe<Scalars['Int']>;
};

export type IWishlists = {
  __typename?: 'Wishlists';
  items?: Maybe<Array<Maybe<IWishlist>>>;
  total_count?: Maybe<Scalars['Int']>;
};

export type IWishlistSearchResult = {
  __typename?: 'WishlistSearchResult';
  items?: Maybe<Array<Maybe<IWishlist>>>;
};

export type IAddressFragmentFragment = {
  __typename?: 'CustomerAddress';
  id: string;
  firstname: string;
  lastname: string;
  telephone: string;
  building?: Maybe<string>;
  address_line: string;
  postcode: string;
  address_name?: Maybe<string>;
  customer_address_type: IAddressType;
  full_tax_type?: Maybe<ITaxType>;
  vat_id?: Maybe<string>;
  company?: Maybe<string>;
  branch_id?: Maybe<string>;
  country_id: string;
  is_default_billing: boolean;
  is_default_shipping: boolean;
  city?: Maybe<string>;
  region_id?: Maybe<string>;
  customer_id?: Maybe<number>;
  default_billing?: Maybe<boolean>;
  default_shipping?: Maybe<boolean>;
  street?: Maybe<Array<Maybe<string>>>;
  custom_attributes?: Maybe<any>;
  subdistrict: { __typename?: 'Place'; id: string; name: string };
  district: { __typename?: 'Place'; id: string; name: string };
  province: { __typename?: 'Place'; id: string; name: string };
  region?: Maybe<{ __typename?: 'Region'; region_id?: Maybe<number>; region?: Maybe<string>; region_code?: Maybe<string> }>;
};

export type ICardFragmentFragment = {
  __typename?: 'Card';
  id: string;
  type: ICardType;
  masked_number: string;
  is_default: boolean;
  expiry_month: number;
  expiry_year: number;
  bank_id?: Maybe<string>;
  bank?: Maybe<{
    __typename?: 'Bank';
    name?: Maybe<string>;
    image?: Maybe<string>;
    icon?: Maybe<string>;
    color?: Maybe<string>;
    id: string;
    active?: Maybe<boolean>;
  }>;
};

type ICartFragmentCartFragment = {
  __typename: 'Cart';
  id?: Maybe<string>;
  items_count?: Maybe<number>;
  items_qty?: Maybe<number>;
  guest_id?: Maybe<string>;
};

type ICartFragmentCartMiniFragment = {
  __typename: 'CartMini';
  id?: Maybe<string>;
  items_count?: Maybe<number>;
  items_qty?: Maybe<number>;
  guest_id?: Maybe<string>;
};

export type ICartFragmentFragment = ICartFragmentCartFragment | ICartFragmentCartMiniFragment;

export type ICategoriesFragmentFragment = {
  __typename?: 'CategoryFlat';
  entity_id: string;
  parent_id?: Maybe<string>;
  name?: Maybe<string>;
  is_active?: Maybe<string>;
  position?: Maybe<number>;
  level?: Maybe<string>;
  path?: Maybe<string>;
  include_in_menu?: Maybe<string>;
  product_count?: Maybe<number>;
  children?: Maybe<string>;
  children_count?: Maybe<string>;
  url_key?: Maybe<string>;
  url_path?: Maybe<string>;
  virtual_category_root?: Maybe<string>;
  segment_information?: Maybe<string>;
  image_icon_tablet?: Maybe<string>;
  image_mobile?: Maybe<string>;
  image?: Maybe<string>;
  icon?: Maybe<string>;
};

export type ICouponFragmentFragment = {
  __typename?: 'CouponResponse';
  rules?: Maybe<
    Array<
      Maybe<{
        __typename?: 'CouponRule';
        current_coupon?: Maybe<string>;
        remaining_count?: Maybe<number>;
        coupon_expiration_date?: Maybe<string>;
        time_used?: Maybe<number>;
        rule?: Maybe<{ __typename?: 'CouponRuleData' } & ICouponRuleFragmentFragment>;
      }>
    >
  >;
};

export type ICouponRuleFragmentFragment = {
  __typename?: 'CouponRuleData';
  rule_id: string;
  name: string;
  store_labels?: Maybe<Array<Maybe<string>>>;
  description?: Maybe<string>;
  website_ids?: Maybe<Array<Maybe<number>>>;
  customer_group_ids?: Maybe<Array<Maybe<number>>>;
  from_date?: Maybe<string>;
  to_date?: Maybe<string>;
  uses_per_customer?: Maybe<number>;
  is_active?: Maybe<boolean>;
  stop_rules_processing?: Maybe<boolean>;
  is_advanced?: Maybe<boolean>;
  sort_order?: Maybe<number>;
  simple_action?: Maybe<string>;
  discount_amount?: Maybe<number>;
  discount_step?: Maybe<number>;
  apply_to_shipping?: Maybe<boolean>;
  times_used?: Maybe<number>;
  is_rss?: Maybe<boolean>;
  coupon_type?: Maybe<string>;
  use_auto_generation?: Maybe<boolean>;
  uses_per_coupon?: Maybe<number>;
  promotion_mdid?: Maybe<number>;
  condition?: Maybe<{
    __typename?: 'CouponRuleCondition';
    condition_type?: Maybe<string>;
    aggregator_type?: Maybe<string>;
    operator?: Maybe<string>;
    value?: Maybe<string>;
    conditions?: Maybe<
      Array<
        Maybe<{
          __typename?: 'CouponRuleConditionData';
          condition_type?: Maybe<string>;
          operator?: Maybe<string>;
          attribute_name?: Maybe<string>;
          value?: Maybe<string>;
        }>
      >
    >;
  }>;
  action_condition?: Maybe<{
    __typename?: 'CouponRuleActionCondition';
    condition_type?: Maybe<string>;
    aggregator_type?: Maybe<string>;
    operator?: Maybe<string>;
    value?: Maybe<string>;
  }>;
  extension_attributes?: Maybe<{
    __typename?: 'CouponRuleExtendsionAttributes';
    term_and_condition?: Maybe<string>;
    coupon_image?: Maybe<string>;
    reward_points_delta?: Maybe<number>;
    discount_code?: Maybe<string>;
    promotion_mdid?: Maybe<string>;
    ampromo_rule?: Maybe<{
      __typename?: 'AmPromotionRule';
      sku?: Maybe<string>;
      type?: Maybe<number>;
      after_product_banner_show_gift_images?: Maybe<number>;
      top_banner_show_gift_images?: Maybe<number>;
      minimal_items_price?: Maybe<number>;
      apply_tax?: Maybe<number>;
      apply_shipping?: Maybe<number>;
    }>;
    amrules?: Maybe<{
      __typename?: 'AmRule';
      promo_cats?: Maybe<string>;
      promo_skus?: Maybe<string>;
      apply_discount_to?: Maybe<string>;
      eachm?: Maybe<string>;
      priceselector?: Maybe<number>;
      nqty?: Maybe<string>;
      max_discount?: Maybe<string>;
      skip_rule?: Maybe<string>;
    }>;
    t1c_special_rate?: Maybe<{
      __typename?: 'T1cSpecialRate';
      entity_id?: Maybe<number>;
      salesrule_id?: Maybe<number>;
      redemption_rate?: Maybe<number>;
      maximum_point_rate?: Maybe<number>;
    }>;
    central_salesrulemaxdiscount_rule?: Maybe<{
      __typename?: 'CentralSaleRuleMaxDiscountRule';
      entity_id?: Maybe<number>;
      rule_id?: Maybe<number>;
      max_discount_amount?: Maybe<number>;
    }>;
  }>;
};

type IInstallmentPlansFragmentInstallmentPlanFragment = {
  __typename?: 'InstallmentPlan';
  installmentplan_id: string;
  name?: Maybe<string>;
  bank_id?: Maybe<number>;
  currency?: Maybe<string>;
  period?: Maybe<string>;
  merchant_rate?: Maybe<string>;
  customer_rate?: Maybe<string>;
  interest_type?: Maybe<string>;
  installment_type?: Maybe<string>;
  min_amount?: Maybe<string>;
  max_amount?: Maybe<string>;
  active?: Maybe<string>;
  valid_from?: Maybe<string>;
  valid_until?: Maybe<string>;
  create?: Maybe<string>;
  bank?: Maybe<{
    __typename?: 'InstallmentBank';
    bank_id?: Maybe<string>;
    bank_image?: Maybe<string>;
    icon?: Maybe<string>;
    active?: Maybe<string>;
    color?: Maybe<string>;
    name?: Maybe<string>;
  }>;
};

type IInstallmentPlansFragmentPaymentServiceInstallPlansFragment = {
  __typename?: 'PaymentServiceInstallPlans';
  installmentplan_id: string;
  name?: Maybe<string>;
  bank_id?: Maybe<number>;
  currency?: Maybe<string>;
  period?: Maybe<string>;
  merchant_rate?: Maybe<string>;
  customer_rate?: Maybe<string>;
  interest_type?: Maybe<string>;
  installment_type?: Maybe<string>;
  min_amount?: Maybe<string>;
  max_amount?: Maybe<string>;
  active?: Maybe<string>;
  valid_from?: Maybe<string>;
  valid_until?: Maybe<string>;
  create?: Maybe<string>;
  bank?: Maybe<{
    __typename?: 'InstallmentBank';
    bank_id?: Maybe<string>;
    bank_image?: Maybe<string>;
    icon?: Maybe<string>;
    active?: Maybe<string>;
    color?: Maybe<string>;
    name?: Maybe<string>;
  }>;
};

export type IInstallmentPlansFragmentFragment =
  | IInstallmentPlansFragmentInstallmentPlanFragment
  | IInstallmentPlansFragmentPaymentServiceInstallPlansFragment;

export type IMarketPlaceSellerFragmentFragment = {
  __typename?: 'MarketPlaceSeller';
  seller_id?: Maybe<string>;
  seller?: Maybe<string>;
  seller_url_key?: Maybe<string>;
};

export type IOrderFragmentFragment = {
  __typename?: 'Order';
  entity_id?: Maybe<number>;
  increment_id?: Maybe<string>;
  customer_email?: Maybe<string>;
  order_currency_code?: Maybe<string>;
  total_due?: Maybe<number>;
  created_at?: Maybe<string>;
  shipping_description?: Maybe<string>;
  state?: Maybe<string>;
  status?: Maybe<string>;
  coupon_code?: Maybe<string>;
  promotion_code?: Maybe<string>;
  subtotal_incl_tax?: Maybe<number>;
  subtotal?: Maybe<number>;
  tax_amount?: Maybe<number>;
  grand_total?: Maybe<number>;
  discount_amount?: Maybe<number>;
  discount_description?: Maybe<string>;
  shipping_incl_tax?: Maybe<number>;
  items?: Maybe<
    Array<
      Maybe<{
        __typename?: 'OrderItem';
        product_id?: Maybe<number>;
        name?: Maybe<string>;
        sku?: Maybe<string>;
        store_id?: Maybe<number>;
        qty_ordered?: Maybe<number>;
        qty_canceled?: Maybe<number>;
        price?: Maybe<number>;
        price_incl_tax?: Maybe<number>;
        row_total?: Maybe<number>;
        row_total_incl_tax?: Maybe<number>;
        tax_amount?: Maybe<number>;
        tax_canceled?: Maybe<number>;
        base_discount_amount?: Maybe<number>;
        base_discount_invoiced?: Maybe<number>;
        base_discount_tax_compensation_amount?: Maybe<number>;
        base_original_price?: Maybe<number>;
        base_price?: Maybe<number>;
        base_price_incl_tax?: Maybe<number>;
        base_row_invoiced?: Maybe<number>;
        base_row_total?: Maybe<number>;
        base_row_total_incl_tax?: Maybe<number>;
        base_tax_amount?: Maybe<number>;
        base_tax_invoiced?: Maybe<number>;
        discount_amount?: Maybe<number>;
        discount_invoiced?: Maybe<number>;
        discount_percent?: Maybe<number>;
        discount_tax_compensation_amount?: Maybe<number>;
        discount_tax_compensation_canceled?: Maybe<number>;
        original_price?: Maybe<number>;
        store_code?: Maybe<string>;
        url_key?: Maybe<string>;
        image?: Maybe<string>;
        small_image?: Maybe<string>;
        thumbnail?: Maybe<string>;
        custom_attributes?: Maybe<{ __typename?: 'ProductsCustomAttributes'; brand_name?: Maybe<string> }>;
        product?: Maybe<{ __typename?: 'Product' } & IProductFragmentFragment>;
        extension_attributes?: Maybe<{ __typename?: 'OrderItemExtensionAttributes' } & IOrderLineItemFragmentFragment>;
      }>
    >
  >;
  payment?: Maybe<{ __typename?: 'Payment'; method?: Maybe<string> }>;
  status_histories?: Maybe<
    Array<Maybe<{ __typename?: 'StatusHistories'; created_at?: Maybe<string>; comment?: Maybe<string>; status?: Maybe<string> }>>
  >;
  billing_address?: Maybe<{
    __typename?: 'BillingAddress';
    address_type?: Maybe<string>;
    company?: Maybe<string>;
    firstname?: Maybe<string>;
    lastname?: Maybe<string>;
    telephone?: Maybe<string>;
    email?: Maybe<string>;
    prefix?: Maybe<string>;
    country_id?: Maybe<string>;
    city?: Maybe<string>;
    postcode?: Maybe<string>;
    region?: Maybe<string>;
    region_code?: Maybe<string>;
    region_id?: Maybe<string>;
    street?: Maybe<Array<Maybe<string>>>;
    custom_attributes?: Maybe<any>;
    extension_attributes?: Maybe<{
      __typename?: 'BillingAddressExtensionAttributes';
      custom_attributes?: Maybe<Array<Maybe<{ __typename?: 'CustomAttributes'; attribute_code?: Maybe<string>; value?: Maybe<string> }>>>;
    }>;
  }>;
  extension_attributes?: Maybe<{
    __typename?: 'OrderExtensionAttributes';
    order_children_ids?: Maybe<Array<Maybe<number>>>;
    payment_method_label?: Maybe<string>;
    keep_at_store_hours?: Maybe<number>;
    order_status?: Maybe<string>;
    mom_status_reason?: Maybe<string>;
    gift_cards_amount?: Maybe<number>;
    shipping_assignments?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ShippingAssignment';
          shipping?: Maybe<{
            __typename?: 'Shipping';
            method?: Maybe<string>;
            address?: Maybe<{
              __typename?: 'ShippingAddress';
              address_type?: Maybe<string>;
              city?: Maybe<string>;
              company?: Maybe<string>;
              country_id?: Maybe<string>;
              email?: Maybe<string>;
              firstname?: Maybe<string>;
              lastname?: Maybe<string>;
              postcode?: Maybe<string>;
              prefix?: Maybe<string>;
              region?: Maybe<string>;
              region_code?: Maybe<string>;
              region_id?: Maybe<string>;
              street?: Maybe<Array<Maybe<string>>>;
              telephone?: Maybe<string>;
              custom_attributes?: Maybe<any>;
            }>;
          }>;
          items?: Maybe<
            Array<
              Maybe<{
                __typename?: 'ShippingItems';
                store_id?: Maybe<string>;
                name?: Maybe<string>;
                product_type?: Maybe<string>;
                sku?: Maybe<string>;
              }>
            >
          >;
        }>
      >
    >;
    retailer?: Maybe<{
      __typename?: 'Store';
      id?: Maybe<string>;
      name?: Maybe<string>;
      is_active?: Maybe<boolean>;
      seller_code?: Maybe<string>;
      attribute_set_name?: Maybe<string>;
      custom_attributes?: Maybe<{
        __typename?: 'StoreCustomAttribute';
        url_key?: Maybe<string>;
        show_contact_form?: Maybe<string>;
        inventory_source?: Maybe<string>;
        contact_phone?: Maybe<string>;
        contact_fax?: Maybe<string>;
        min_lead_time?: Maybe<string>;
        max_lead_time?: Maybe<string>;
      }>;
      extension_attributes?: Maybe<{
        __typename?: 'StoreExtensionAttribute';
        special_opening_hours?: Maybe<Array<Maybe<string>>>;
        address?: Maybe<{
          __typename?: 'StoreAddress';
          id?: Maybe<number>;
          retailer_id?: Maybe<number>;
          region?: Maybe<string>;
          region_id?: Maybe<number>;
          country_id?: Maybe<string>;
          street?: Maybe<Array<Maybe<string>>>;
          postcode?: Maybe<string>;
          city?: Maybe<string>;
          coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
        }>;
        opening_hours?: Maybe<Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>>;
      }>;
    }>;
    delivery_status_history?: Maybe<
      Array<Maybe<{ __typename?: 'DeliveryStatusHistory'; status?: Maybe<string>; created_at?: Maybe<string>; reason?: Maybe<string> }>>
    >;
    shipping_slot?: Maybe<{ __typename?: 'ShippingSlot'; date_time_from?: Maybe<string>; date_time_to?: Maybe<string> }>;
    t1c_redeem?: Maybe<{
      __typename?: 'T1cRedeem';
      t1_cnumber?: Maybe<string>;
      points_redeem?: Maybe<string>;
      points_total?: Maybe<string>;
      discount_amount?: Maybe<string>;
      discount_amount_formatted?: Maybe<string>;
    }>;
    coupon?: Maybe<{
      __typename?: 'CouponDiscount';
      discount_amount?: Maybe<number>;
      discount_amount_formatted?: Maybe<string>;
      coupon_code?: Maybe<string>;
    }>;
    bts_order_status?: Maybe<
      Array<{ __typename?: 'BtsOrderStatus'; seller_id?: Maybe<number>; seller_name?: Maybe<string>; status?: Maybe<string> }>
    >;
  }>;
};

export type IOrderLineItemFragmentFragment = {
  __typename?: 'OrderItemExtensionAttributes';
  line_items?: Maybe<
    Array<{
      __typename?: 'OrderLineItem';
      entity_id?: Maybe<number>;
      order_id?: Maybe<number>;
      line_id?: Maybe<number>;
      line_number?: Maybe<number>;
      extension_attributes?: Maybe<{
        __typename?: 'OrderLineItemExtensionAttributes';
        status: string;
        package_id?: Maybe<string>;
        carrier?: Maybe<string>;
        tracking_number?: Maybe<string>;
        tracking_link?: Maybe<string>;
      }>;
    }>
  >;
  marketplace_info?: Maybe<{
    __typename?: 'MarketplaceInfo';
    seller_info?: Maybe<{ __typename?: 'SellerInfo'; name: string; mirakl_seller_id: string; url_key?: Maybe<string> }>;
  }>;
};

export type IPackageOptionFragmentFragment = {
  __typename?: 'V2PackageOption';
  delivery_method?: Maybe<string>;
  stock_id?: Maybe<string>;
  is_package_available?: Maybe<boolean>;
  has_sub_package?: Maybe<boolean>;
  product?: Maybe<
    Array<
      Maybe<{
        __typename?: 'V2PackageOptionProduct';
        item_id: string;
        qty_available_current_sku?: Maybe<number>;
        detail?: Maybe<
          | {
              __typename?: 'V2ConfigurableProduct';
              id: string;
              sku: string;
              name: string;
              thumbnailUrl?: Maybe<string>;
              urlKey: string;
              brand?: Maybe<{ __typename?: 'V2Brand'; name: string; urlKey: string }>;
            }
          | {
              __typename?: 'V2SimpleProduct';
              id: string;
              sku: string;
              name: string;
              thumbnailUrl?: Maybe<string>;
              urlKey: string;
              brand?: Maybe<{ __typename?: 'V2Brand'; name: string; urlKey: string }>;
            }
        >;
      }>
    >
  >;
  line_items?: Maybe<Array<Maybe<{ __typename?: 'V2LineItems'; line_id: string; line_number?: Maybe<string> }>>>;
  qty_data?: Maybe<{
    __typename?: 'V2QtyData';
    total_qty_available_in_package?: Maybe<number>;
    total_qty_for_current_package?: Maybe<number>;
    total_qty_ordered_in_cart?: Maybe<number>;
  }>;
  method_data?: Maybe<{
    __typename?: 'V2MethodData';
    carrier_title?: Maybe<string>;
    method_title?: Maybe<string>;
    carrier_code?: Maybe<string>;
    method_code?: Maybe<string>;
    method_labels?: Maybe<{ __typename?: 'V2MethodLabels'; label?: Maybe<string>; date_time?: Maybe<string>; time_label?: Maybe<string> }>;
  }>;
  sub_package: Array<{
    __typename?: 'V2SubPackage';
    delivery_method?: Maybe<string>;
    stock_id: string;
    is_package_available?: Maybe<boolean>;
    has_sub_package?: Maybe<boolean>;
    product?: Maybe<
      Array<
        Maybe<{
          __typename?: 'V2PackageOptionProduct';
          item_id: string;
          qty_available_current_sku?: Maybe<number>;
          detail?: Maybe<
            | {
                __typename?: 'V2ConfigurableProduct';
                id: string;
                sku: string;
                name: string;
                thumbnailUrl?: Maybe<string>;
                urlKey: string;
                brand?: Maybe<{ __typename?: 'V2Brand'; name: string; urlKey: string }>;
              }
            | {
                __typename?: 'V2SimpleProduct';
                id: string;
                sku: string;
                name: string;
                thumbnailUrl?: Maybe<string>;
                urlKey: string;
                brand?: Maybe<{ __typename?: 'V2Brand'; name: string; urlKey: string }>;
              }
          >;
        }>
      >
    >;
    line_items?: Maybe<Array<Maybe<{ __typename?: 'V2LineItems'; line_id: string; line_number?: Maybe<string> }>>>;
    qty_data?: Maybe<{
      __typename?: 'V2QtyData';
      total_qty_available_in_package?: Maybe<number>;
      total_qty_for_current_package?: Maybe<number>;
      total_qty_ordered_in_cart?: Maybe<number>;
    }>;
    method_data?: Maybe<{
      __typename?: 'V2MethodData';
      carrier_title?: Maybe<string>;
      method_title?: Maybe<string>;
      carrier_code?: Maybe<string>;
      method_code?: Maybe<string>;
      method_labels?: Maybe<{ __typename?: 'V2MethodLabels'; label?: Maybe<string>; date_time?: Maybe<string>; time_label?: Maybe<string> }>;
    }>;
  }>;
};

export type IPickUpLocationAddressFragmentFragment = {
  __typename?: 'PickupStoreLocationAddress';
  streetNumber?: Maybe<string>;
  building?: Maybe<string>;
  soi?: Maybe<string>;
  street?: Maybe<string>;
  district?: Maybe<string>;
  districtId?: Maybe<number>;
  subDistrict?: Maybe<string>;
  subDistrictId?: Maybe<number>;
  region?: Maybe<string>;
  regionId?: Maybe<number>;
  postcode?: Maybe<string>;
  contactNumber?: Maybe<string>;
  countryCode?: Maybe<string>;
  city?: Maybe<string>;
  latitude?: Maybe<string>;
  longitude?: Maybe<string>;
};

export type IProductBrandFragmentFragment = {
  __typename?: 'ProductsExtensionAttributesBrand';
  brand_id?: Maybe<number>;
  name?: Maybe<string>;
  url_key?: Maybe<string>;
  logo?: Maybe<string>;
  extension_attributes?: Maybe<{
    __typename?: 'ProductsExtensionAttributesBrandExtensionAttributes';
    parent_category?: Maybe<number>;
    menu_css?: Maybe<string>;
    hide_t1c_redeemable_amount?: Maybe<boolean>;
    hide_product_original_price?: Maybe<boolean>;
    product_name_special?: Maybe<boolean>;
  }>;
};

export type IProductFragmentFragment = {
  __typename?: 'Product';
  id?: Maybe<string>;
  name?: Maybe<string>;
  url_key?: Maybe<string>;
  sku?: Maybe<string>;
  product_tags?: Maybe<string>;
  visibility?: Maybe<number>;
  status?: Maybe<number>;
  type_id?: Maybe<IProductType>;
  image?: Maybe<string>;
  marketplace_product_type_option?: Maybe<string>;
  marketplace_seller_option?: Maybe<string>;
  small_image?: Maybe<string>;
  thumbnail?: Maybe<string>;
  description?: Maybe<string>;
  short_description?: Maybe<string>;
  price?: Maybe<number>;
  price_min?: Maybe<number>;
  price_max?: Maybe<number>;
  sale_price_min?: Maybe<number>;
  sale_price_max?: Maybe<number>;
  special_price?: Maybe<number>;
  special_from_date?: Maybe<string>;
  special_to_date?: Maybe<string>;
  meta_title?: Maybe<string>;
  meta_keyword?: Maybe<string>;
  meta_description?: Maybe<string>;
  custom_attributes?: Maybe<any>;
  custom_attributes_option?: Maybe<any>;
  isReview?: Maybe<boolean>;
  breadcrumbs?: Maybe<
    Array<Maybe<{ __typename?: 'Breadcrumbs'; category_id: string; level?: Maybe<number>; name?: Maybe<string>; url?: Maybe<string> }>>
  >;
  media_gallery_entries?: Maybe<
    Array<
      Maybe<{
        __typename?: 'MediaGalleryEntry';
        file?: Maybe<string>;
        id?: Maybe<number>;
        label?: Maybe<string>;
        media_type?: Maybe<string>;
        disabled?: Maybe<boolean>;
        extension_attributes?: Maybe<{
          __typename?: 'MediaGalleryExtension';
          video_content?: Maybe<{
            __typename?: 'VideoContent';
            media_type?: Maybe<string>;
            video_provider?: Maybe<string>;
            video_url?: Maybe<string>;
            video_title?: Maybe<string>;
            video_description?: Maybe<string>;
            video_metadata?: Maybe<string>;
          }>;
        }>;
      }>
    >
  >;
  extension_attributes?: Maybe<{
    __typename?: 'ProductsExtensionAttributes';
    free_shipping_amount?: Maybe<string>;
    t1c_redeemable_points?: Maybe<Array<Maybe<string>>>;
    salable?: Maybe<boolean>;
    ispu_salable?: Maybe<boolean>;
    seller_url_key?: Maybe<string>;
    configurable_product_links?: Maybe<Array<Maybe<string>>>;
    suggest_promotions?: Maybe<
      Array<{
        __typename?: 'ProductsExtensionAttributesSuggestPromotions';
        promotion_name: string;
        full_condition: string;
        start_datetime?: Maybe<string>;
        end_datetime?: Maybe<string>;
      }>
    >;
    brand?: Maybe<{ __typename?: 'ProductsExtensionAttributesBrand' } & IProductBrandFragmentFragment>;
    stock_item?: Maybe<{
      __typename?: 'StockItem';
      qty?: Maybe<number>;
      is_in_stock?: Maybe<boolean>;
      min_sale_qty?: Maybe<number>;
      max_sale_qty?: Maybe<number>;
    }>;
    installment_plans?: Maybe<Array<Maybe<{ __typename?: 'InstallmentPlan' } & IInstallmentPlansFragmentInstallmentPlanFragment>>>;
    specification_attributes?: Maybe<
      Array<Maybe<{ __typename?: 'ProductsSpecialAttributes'; attribute_code?: Maybe<string>; label?: Maybe<string>; value?: Maybe<any> }>>
    >;
    overall_rating?: Maybe<{
      __typename?: 'ProductsExtensionAttributesOverallRating';
      rating?: Maybe<number>;
      total_vote?: Maybe<number>;
      five_star?: Maybe<number>;
      four_star?: Maybe<number>;
      three_star?: Maybe<number>;
      two_star?: Maybe<number>;
      one_star?: Maybe<number>;
      rounded_rating?: Maybe<number>;
    }>;
    reviews?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ProductsExtensionAttributesReviews';
          nickname?: Maybe<string>;
          created_at?: Maybe<string>;
          title?: Maybe<string>;
          detail?: Maybe<string>;
          is_validate?: Maybe<boolean>;
          region_id?: Maybe<number>;
          rating_items?: Maybe<{ __typename?: 'ProductsRatingItems'; rating_id?: Maybe<number>; rating?: Maybe<number>; category?: Maybe<string> }>;
          images?: Maybe<Array<{ __typename?: 'ImagePath'; path: string }>>;
        }>
      >
    >;
    cc_promotions?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ProductsCcPromotionAttributes';
          discount?: Maybe<number>;
          bank_icon?: Maybe<string>;
          bank_color?: Maybe<string>;
          sales_rule_id?: Maybe<string>;
          promotion_id?: Maybe<string>;
        }>
      >
    >;
    category_paths?: Maybe<
      Array<
        Maybe<{ __typename?: 'CategoryPath'; category_id?: Maybe<number>; name?: Maybe<string>; level?: Maybe<number>; parent_id?: Maybe<number> }>
      >
    >;
    overlays?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ProductsExtensionAttributesOverlay';
          overlay_image?: Maybe<string>;
          overlay_status?: Maybe<string>;
          mobile_overlay_status?: Maybe<string>;
          overlay_start_date?: Maybe<string>;
          overlay_end_date?: Maybe<string>;
          overlay_position?: Maybe<string>;
        }>
      >
    >;
    size_map?: Maybe<{ __typename?: 'ProductSizeMap'; size?: Maybe<string>; type?: Maybe<string> }>;
    size_maps?: Maybe<Array<Maybe<{ __typename?: 'ProductSizeMap'; size?: Maybe<string>; type?: Maybe<string> }>>>;
    configurable_product_options?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ConfigurableProductOptions';
          id?: Maybe<number>;
          attribute_id?: Maybe<string>;
          label?: Maybe<string>;
          position?: Maybe<number>;
          values?: Maybe<
            Array<
              Maybe<{
                __typename?: 'ProductOptionsValues';
                value_index?: Maybe<number>;
                extension_attributes?: Maybe<{
                  __typename?: 'ProductOptionsExtensionAttributes';
                  label?: Maybe<string>;
                  frontend_value?: Maybe<string>;
                  frontend_type?: Maybe<string>;
                  products?: Maybe<Array<Maybe<number>>>;
                }>;
              }>
            >
          >;
        }>
      >
    >;
  }>;
  marketplace?: Maybe<{ __typename?: 'MarketPlaceSeller' } & IMarketPlaceSellerFragmentFragment>;
  cart_price_rule_overlays?: Maybe<
    Array<{ __typename?: 'ProductsCartPriceRuleOverlay'; id: string; overlay_image?: Maybe<string>; display_priority?: Maybe<number> }>
  >;
};

export type IProductStorePriceFragmentFragment = {
  __typename?: 'ProductStorePrice';
  entity_id: string;
  id: number;
  price: number;
  sku: string;
  special_price?: Maybe<number>;
  configurable_product_items?: Maybe<
    Array<Maybe<{ __typename?: 'ProductStorePrice'; entity_id: string; id: number; price: number; sku: string; special_price?: Maybe<number> }>>
  >;
};

export type IStoreConfigFragmentFragment = {
  __typename?: 'StoreConfig';
  id?: Maybe<string>;
  code?: Maybe<string>;
  website_id?: Maybe<number>;
  locale?: Maybe<string>;
  base_url?: Maybe<string>;
  base_media_url?: Maybe<string>;
  extension_attributes?: Maybe<{
    __typename?: 'ConfigExtensionAttribute';
    google_tag_manager_key?: Maybe<string>;
    social_facebook_app_id?: Maybe<string>;
    google_tag_manager_cookies?: Maybe<
      Array<
        Maybe<{
          __typename?: 'GoogleTagManagerCookieExtensionAttribute';
          identifier?: Maybe<string>;
          experiment_id?: Maybe<string>;
          cookie_variant_id?: Maybe<string>;
          request_header_value?: Maybe<string>;
        }>
      >
    >;
    review_image_upload?: Maybe<{
      __typename?: 'ConfigReviewImageUpload';
      max_number_of_file_upload?: Maybe<number>;
      max_size_upload?: Maybe<number>;
      allow_extensions?: Maybe<Array<Maybe<string>>>;
      folder_upload?: Maybe<string>;
    }>;
  }>;
};

type IStoreFragmentStoreFragment = {
  __typename?: 'Store';
  id?: Maybe<string>;
  name?: Maybe<string>;
  is_active?: Maybe<boolean>;
  seller_code?: Maybe<string>;
  attribute_set_name?: Maybe<string>;
  custom_attributes?: Maybe<{
    __typename?: 'StoreCustomAttribute';
    url_key?: Maybe<string>;
    show_contact_form?: Maybe<string>;
    inventory_source?: Maybe<string>;
    contact_phone?: Maybe<string>;
    contact_fax?: Maybe<string>;
    logo?: Maybe<string>;
  }>;
  extension_attributes?: Maybe<{
    __typename?: 'StoreExtensionAttribute';
    special_opening_hours?: Maybe<Array<Maybe<string>>>;
    address?: Maybe<{
      __typename?: 'StoreAddress';
      id?: Maybe<number>;
      retailer_id?: Maybe<number>;
      region?: Maybe<string>;
      region_id?: Maybe<number>;
      country_id?: Maybe<string>;
      street?: Maybe<Array<Maybe<string>>>;
      postcode?: Maybe<string>;
      city?: Maybe<string>;
      coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
    }>;
    opening_hours?: Maybe<Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>>;
  }>;
};

type IStoreFragmentStoreWithStockLevelFragment = {
  __typename?: 'StoreWithStockLevel';
  id?: Maybe<string>;
  name?: Maybe<string>;
  is_active?: Maybe<boolean>;
  seller_code?: Maybe<string>;
  attribute_set_name?: Maybe<string>;
  custom_attributes?: Maybe<{
    __typename?: 'StoreCustomAttribute';
    url_key?: Maybe<string>;
    show_contact_form?: Maybe<string>;
    inventory_source?: Maybe<string>;
    contact_phone?: Maybe<string>;
    contact_fax?: Maybe<string>;
    logo?: Maybe<string>;
  }>;
  extension_attributes?: Maybe<{
    __typename?: 'StoreExtensionAttribute';
    special_opening_hours?: Maybe<Array<Maybe<string>>>;
    address?: Maybe<{
      __typename?: 'StoreAddress';
      id?: Maybe<number>;
      retailer_id?: Maybe<number>;
      region?: Maybe<string>;
      region_id?: Maybe<number>;
      country_id?: Maybe<string>;
      street?: Maybe<Array<Maybe<string>>>;
      postcode?: Maybe<string>;
      city?: Maybe<string>;
      coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
    }>;
    opening_hours?: Maybe<Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>>;
  }>;
};

export type IStoreFragmentFragment = IStoreFragmentStoreFragment | IStoreFragmentStoreWithStockLevelFragment;

export type IAddCustomerAddressMutationVariables = Exact<{
  input?: Maybe<ICreateCustomerAddress>;
}>;

export type IAddCustomerAddressMutation = {
  __typename?: 'Mutation';
  addCustomerAddress?: Maybe<{ __typename?: 'CustomerAddress' } & IAddressFragmentFragment>;
};

export type IDeleteCustomerAddressMutationVariables = Exact<{
  addressId?: Maybe<Scalars['Int']>;
}>;

export type IDeleteCustomerAddressMutation = {
  __typename?: 'Mutation';
  deleteCustomerAddress?: Maybe<{ __typename?: 'DeleteCustomerAddressResult'; is_success?: Maybe<boolean> }>;
};

export type IEditCustomerAddressMutationVariables = Exact<{
  input?: Maybe<IEditCustomerAddress>;
}>;

export type IEditCustomerAddressMutation = {
  __typename?: 'Mutation';
  editCustomerAddress?: Maybe<{ __typename?: 'CustomerAddress' } & IAddressFragmentFragment>;
};

export type IAssignCouponMutationVariables = Exact<{
  input: IAssignCouponInput;
}>;

export type IAssignCouponMutation = {
  __typename?: 'Mutation';
  assignCoupon?: Maybe<{ __typename?: 'AssignCouponResponse'; success: boolean; errors?: Maybe<Array<Maybe<string>>> }>;
};

export type IAssignCouponCampaignMutationVariables = Exact<{
  input: IAssignCouponCampaignInput;
}>;

export type IAssignCouponCampaignMutation = {
  __typename?: 'Mutation';
  assignCouponCampaign?: Maybe<{ __typename?: 'AssignCouponCampaignResponse'; success: boolean; errors?: Maybe<Array<Maybe<string>>> }>;
};

export type IFacebookLoginMutationVariables = Exact<{
  social_id: Scalars['String'];
  customerToken?: Maybe<Scalars['String']>;
}>;

export type IFacebookLoginMutation = { __typename?: 'Mutation'; facebookLogin?: Maybe<{ __typename?: 'LoginResponse'; token?: Maybe<string> }> };

export type IForgotPasswordMutationVariables = Exact<{
  storeCode?: Maybe<Scalars['String']>;
  email: Scalars['String'];
}>;

export type IForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword?: Maybe<{ __typename?: 'ResponseMessage'; message?: Maybe<string> }>;
};

export type ILoginMutationMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  guestToken?: Maybe<Scalars['String']>;
  is_jwt?: Maybe<Scalars['Boolean']>;
}>;

export type ILoginMutationMutation = { __typename?: 'Mutation'; login?: Maybe<{ __typename?: 'LoginResponse'; token?: Maybe<string> }> };

export type IResetPasswordMutationVariables = Exact<{
  input: IResetPasswordInput;
}>;

export type IResetPasswordMutation = { __typename?: 'Mutation'; resetPassword?: Maybe<{ __typename?: 'ResponseMessage'; message?: Maybe<string> }> };

export type ISocialLoginMutationVariables = Exact<{
  input: ISocialLoginInput;
}>;

export type ISocialLoginMutation = { __typename?: 'Mutation'; socialLogin?: Maybe<{ __typename?: 'LoginResponse'; token?: Maybe<string> }> };

export type IAddCartItemMutationVariables = Exact<{
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
  input: IAddToCartInput;
}>;

export type IAddCartItemMutation = {
  __typename?: 'Mutation';
  addCartItem?: Maybe<{
    __typename?: 'AddToCartResponse';
    item_id?: Maybe<number>;
    sku?: Maybe<string>;
    qty?: Maybe<number>;
    extension_attributes?: Maybe<{ __typename?: 'AddToCartResponseExtensionAttribute'; quote_id_to_update?: Maybe<number> }>;
  }>;
};

export type IAddCouponResponseMutationVariables = Exact<{
  coupon?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
}>;

export type IAddCouponResponseMutation = {
  __typename?: 'Mutation';
  addCoupon?: Maybe<{ __typename?: 'AddCouponResponse'; message?: Maybe<string>; valid_coupon: Array<string>; invalid_coupon: Array<string> }>;
};

export type IAddGiftWrapMessageMutationVariables = Exact<{
  input: IAddGiftWrapMessageInput;
}>;

export type IAddGiftWrapMessageMutation = {
  __typename?: 'Mutation';
  addGiftWrapMessage?: Maybe<{ __typename?: 'ResponseMessage'; message?: Maybe<string> }>;
};

export type IDeleteCartItemMutationVariables = Exact<{
  item_id: Scalars['String'];
  guest?: Maybe<Scalars['String']>;
}>;

export type IDeleteCartItemMutation = {
  __typename?: 'Mutation';
  deleteCartItem?: Maybe<{ __typename?: 'DeleteItemStatus'; success?: Maybe<boolean>; message?: Maybe<string> }>;
};

export type IDeleteCouponResponseMutationVariables = Exact<{
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
}>;

export type IDeleteCouponResponseMutation = {
  __typename?: 'Mutation';
  deleteCoupon?: Maybe<{ __typename?: 'DeleteCouponResponse'; message?: Maybe<string> }>;
};

export type IDeleteGiftWrapMessageMutationVariables = Exact<{
  input: IDeleteGiftWrapMessageInput;
}>;

export type IDeleteGiftWrapMessageMutation = {
  __typename?: 'Mutation';
  deleteGiftWrapMessage?: Maybe<{ __typename?: 'ResponseMessage'; message?: Maybe<string> }>;
};

export type IEditCartItemMutationVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  item_id: Scalars['String'];
  input: IEditCartItemInput;
}>;

export type IEditCartItemMutation = {
  __typename?: 'Mutation';
  editCartItem?: Maybe<{
    __typename?: 'EditCartItemResponse';
    item_id?: Maybe<number>;
    sku?: Maybe<string>;
    qty?: Maybe<number>;
    name?: Maybe<string>;
    price?: Maybe<number>;
    product_type?: Maybe<string>;
    quote_id?: Maybe<string>;
  }>;
};

export type IRestoreShippingAssignmentMutationVariables = Exact<{
  input: IRestoreShippingAssignmentInput;
}>;

export type IRestoreShippingAssignmentMutation = {
  __typename?: 'Mutation';
  restoreShippingAssignment?: Maybe<{ __typename?: 'ResponseMessage'; message?: Maybe<string> }>;
};

export type IEstimateShippingMethodsMutationVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IEstimateShippingInput;
}>;

export type IEstimateShippingMethodsMutation = {
  __typename?: 'Mutation';
  estimateShippingMethods?: Maybe<
    Array<
      Maybe<{
        __typename?: 'ShippingMethods';
        carrier_code?: Maybe<string>;
        method_code?: Maybe<string>;
        carrier_title?: Maybe<string>;
        method_title?: Maybe<string>;
        available?: Maybe<boolean>;
        price_excl_tax?: Maybe<number>;
        price_incl_tax?: Maybe<number>;
        amount?: Maybe<number>;
        base_amount?: Maybe<number>;
        extension_attributes?: Maybe<{
          __typename?: 'ShippingMethodExtension';
          is_pre_order?: Maybe<boolean>;
          shipping_slot_list?: Maybe<
            Array<
              Maybe<{
                __typename?: 'ShippingSlotItem';
                id?: Maybe<number>;
                date_time_from?: Maybe<string>;
                date_time_to?: Maybe<string>;
                extension_attributes?: Maybe<{ __typename?: 'ShippingSlotItemExtensionAttributes'; day_slot_id?: Maybe<number> }>;
              }>
            >
          >;
          messages?: Maybe<
            Array<
              Maybe<{
                __typename?: 'ShippingMethodExtensionMessage';
                message_code?: Maybe<string>;
                message?: Maybe<string>;
                pre_render_message?: Maybe<string>;
              }>
            >
          >;
        }>;
      }>
    >
  >;
};

export type ISetPaymentInformationMutationVariables = Exact<{
  input: IPaymentInformationInput;
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
}>;

export type ISetPaymentInformationMutation = {
  __typename?: 'Mutation';
  setPaymentInformation?: Maybe<{
    __typename?: 'SetPaymentInfoResponse';
    message?: Maybe<string>;
    order?: Maybe<any>;
    redirect_url?: Maybe<string>;
    payment_offline?: Maybe<{
      __typename?: 'PaymentOfflineResponse';
      key?: Maybe<string>;
      detail?: Maybe<{ __typename?: 'PaymentOffileDetail'; orderId?: Maybe<string> }>;
    }>;
    request_form?: Maybe<{ __typename?: 'PaymentRequestForm'; url: string; payload: { __typename?: 'PaymentFormPayload'; paymentRequest: string } }>;
  }>;
};

export type ISetShippingInformationMutationVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: ISetShippingInformationInput;
}>;

export type ISetShippingInformationMutation = {
  __typename?: 'Mutation';
  setShippingInformation?: Maybe<{ __typename?: 'ResponseMessage'; message?: Maybe<string> }>;
};

export type ISetShippingSlotHdlMutationVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: ISetShippingSlotHdlInput;
}>;

export type ISetShippingSlotHdlMutation = {
  __typename?: 'Mutation';
  setShippingSlotHdl?: Maybe<{ __typename?: 'ResponseMessage'; message?: Maybe<string> }>;
};

export type IUpdateMultiplePaymentInformationMutationVariables = Exact<{
  input: IMultipleInformationFormat;
}>;

export type IUpdateMultiplePaymentInformationMutation = {
  __typename?: 'Mutation';
  updateMultiplePaymentInformation?: Maybe<{ __typename?: 'SetMultiPaymentResponse'; statusPayment?: Maybe<boolean> }>;
};

export type IUpdatePaymentInformationMutationVariables = Exact<{
  input: IPaymentInformationInput;
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
}>;

export type IUpdatePaymentInformationMutation = {
  __typename?: 'Mutation';
  updatePaymentInformation?: Maybe<{ __typename?: 'SetPaymentInfoResponse'; message?: Maybe<string>; order?: Maybe<any> }>;
};

export type IV2SetShippingInformationMutationVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  input: IV2SetShippingInformationInput;
}>;

export type IV2SetShippingInformationMutation = {
  __typename?: 'Mutation';
  v2SetShippingInformation?: Maybe<{ __typename?: 'ResponseMessage'; status?: Maybe<boolean> }>;
};

export type IV2SetValidatePinMutationVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  input: IV2SetValidatePinInput;
}>;

export type IV2SetValidatePinMutation = {
  __typename?: 'Mutation';
  v2SetValidatePin?: Maybe<{ __typename?: 'ResponseMessage'; status?: Maybe<boolean> }>;
};

export type IConsentMutationVariables = Exact<{
  input: IAcceptConsentInput;
}>;

export type IConsentMutation = {
  __typename?: 'Mutation';
  consent?: Maybe<{ __typename?: 'Customer'; id: string; email?: Maybe<string>; need_reaccept_consents: boolean }>;
};

export type IContactUsMutationVariables = Exact<{
  contact: IContactUsInput;
  storeCode?: Maybe<Scalars['String']>;
}>;

export type IContactUsMutation = {
  __typename?: 'Mutation';
  contactUs?: Maybe<{ __typename?: 'ContactUsResponse'; success?: Maybe<string>; message?: Maybe<string> }>;
};

export type ICreateCardMutationVariables = Exact<{
  cardInput: ICardInput;
  setDefault: Scalars['Boolean'];
}>;

export type ICreateCardMutation = { __typename?: 'Mutation'; createCard: { __typename?: 'Card' } & ICardFragmentFragment };

export type IChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;

export type IChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<{ __typename?: 'ChangePasswordResponse'; message?: Maybe<string> }>;
};

export type ILazyRegisterMutationVariables = Exact<{
  input: ILazyRegisterInput;
}>;

export type ILazyRegisterMutation = { __typename?: 'Mutation'; lazyRegister?: Maybe<{ __typename?: 'Register'; message?: Maybe<string> }> };

export type IRegisterMutationVariables = Exact<{
  input: IRegisterInput;
}>;

export type IRegisterMutation = { __typename?: 'Mutation'; register?: Maybe<{ __typename?: 'Register'; message?: Maybe<string> }> };

export type IUpdateCustomerMutationVariables = Exact<{
  input?: Maybe<IUpdateInputCustomer>;
}>;

export type IUpdateCustomerMutation = { __typename?: 'Mutation'; updateCustomer?: Maybe<{ __typename?: 'Customer'; id: string }> };

export type IDeleteCardMutationVariables = Exact<{
  cardId: Scalars['String'];
}>;

export type IDeleteCardMutation = { __typename?: 'Mutation'; deleteCard?: Maybe<boolean> };

export type IDeleteReviewImageMutationVariables = Exact<{
  input: IDeleteImageInput;
}>;

export type IDeleteReviewImageMutation = { __typename?: 'Mutation'; deleteReviewImage?: Maybe<boolean> };

export type INewsletterMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type INewsletterMutation = { __typename?: 'Mutation'; newsletter?: Maybe<string> };

export type INewsletterManualMutationVariables = Exact<{
  email: Scalars['String'];
  gender: IGender;
}>;

export type INewsletterManualMutation = { __typename?: 'Mutation'; newsletter?: Maybe<string> };

export type ISubscribeMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ISubscribeMutation = {
  __typename?: 'Mutation';
  subscribe?: Maybe<{ __typename?: 'Subscribe'; success?: Maybe<string>; message?: Maybe<string> }>;
};

export type IRepaymentMutationVariables = Exact<{
  card?: Maybe<ICardInput>;
  saved_card?: Maybe<ISavedCardInput>;
  incrementId: Scalars['String'];
}>;

export type IRepaymentMutation = {
  __typename?: 'Mutation';
  repayment: {
    __typename?: 'SetPaymentInfoResponse';
    order?: Maybe<any>;
    message?: Maybe<string>;
    request_form?: Maybe<{ __typename?: 'PaymentRequestForm'; url: string; payload: { __typename?: 'PaymentFormPayload'; paymentRequest: string } }>;
  };
};

export type IReviewMutationVariables = Exact<{
  input: IReviewInput;
  storeCode?: Maybe<Scalars['String']>;
}>;

export type IReviewMutation = { __typename?: 'Mutation'; addReview?: Maybe<{ __typename?: 'ReviewResponse'; success?: Maybe<string> }> };

export type ISetDefaultCardMutationVariables = Exact<{
  cardId: Scalars['String'];
}>;

export type ISetDefaultCardMutation = { __typename?: 'Mutation'; setDefaultCard: { __typename?: 'Card' } & ICardFragmentFragment };

export type IBurnPointMutationVariables = Exact<{
  points: Scalars['Float'];
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
}>;

export type IBurnPointMutation = { __typename?: 'Mutation'; burnPoint?: Maybe<{ __typename?: 'BurnPointResponse'; message?: Maybe<string> }> };

export type IDeletePointMutationVariables = Exact<{
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
}>;

export type IDeletePointMutation = { __typename?: 'Mutation'; deletePoint?: Maybe<{ __typename?: 'DeletePointResponse'; message?: Maybe<string> }> };

export type ILoginT1MutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  isGuest?: Maybe<Scalars['Boolean']>;
  guestToken?: Maybe<Scalars['String']>;
}>;

export type ILoginT1Mutation = {
  __typename?: 'Mutation';
  loginT1?: Maybe<{
    __typename?: 'TheOneAccountInfo';
    points?: Maybe<number>;
    points_used?: Maybe<number>;
    card_no?: Maybe<number>;
    conversion_rate?: Maybe<number>;
    min_allowed_points?: Maybe<number>;
    max_allowed_points?: Maybe<number>;
  }>;
};

export type IUploadReviewImageMutationVariables = Exact<{
  input: IUploadImageInput;
}>;

export type IUploadReviewImageMutation = {
  __typename?: 'Mutation';
  uploadReviewImage?: Maybe<{
    __typename?: 'UploadImageResponse';
    error?: Maybe<boolean>;
    items?: Maybe<Array<Maybe<{ __typename?: 'UploadImageResponseItem'; error?: Maybe<boolean>; message?: Maybe<string>; path?: Maybe<string> }>>>;
  }>;
};

export type IVipInterestMutationVariables = Exact<{
  input: IVipInterestInput;
}>;

export type IVipInterestMutation = {
  __typename?: 'Mutation';
  vipInterest?: Maybe<{
    __typename?: 'VipInterestResponse';
    status?: Maybe<boolean>;
    email?: Maybe<string>;
    phone?: Maybe<string>;
    name?: Maybe<string>;
    ids?: Maybe<string>;
    need_assistance?: Maybe<number>;
  }>;
};

export type IVipNeedAssistanceMutationVariables = Exact<{
  input: IVipNeedAssistanceInput;
}>;

export type IVipNeedAssistanceMutation = {
  __typename?: 'Mutation';
  vipNeedAssistance?: Maybe<{ __typename?: 'VipNeedAssistanceResponse'; status?: Maybe<boolean>; urls?: Maybe<Array<Maybe<string>>> }>;
};

export type IVipValidateMutationVariables = Exact<{
  input: IVipValidateInput;
}>;

export type IVipValidateMutation = {
  __typename?: 'Mutation';
  vipValidate?: Maybe<{
    __typename?: 'VipValidateResponse';
    status?: Maybe<boolean>;
    url?: Maybe<string>;
    email?: Maybe<string>;
    phone?: Maybe<string>;
    name?: Maybe<string>;
    ids?: Maybe<string>;
    need_assistance?: Maybe<number>;
    token?: Maybe<string>;
    t1No?: Maybe<string>;
  }>;
};

export type ICreateWishlistMutationVariables = Exact<{
  input: ICreateWishlistInput;
}>;

export type ICreateWishlistMutation = {
  __typename?: 'Mutation';
  createWishlist?: Maybe<{
    __typename?: 'Wishlist';
    wishlist_id: number;
    customer_id: number;
    items?: Maybe<
      Array<
        Maybe<{
          __typename?: 'WishlistItem';
          wishlist_item_id: number;
          product_name?: Maybe<string>;
          product_id?: Maybe<number>;
          qty?: Maybe<string>;
          store_id?: Maybe<number>;
          description?: Maybe<string>;
        }>
      >
    >;
  }>;
};

export type ICreateWishlistItemMutationVariables = Exact<{
  input: ICreateWishlistItemInput;
  customerId?: Maybe<Scalars['Int']>;
}>;

export type ICreateWishlistItemMutation = {
  __typename?: 'Mutation';
  createWishlistItem?: Maybe<{
    __typename?: 'WishlistItem';
    wishlist_item_id: number;
    product_name?: Maybe<string>;
    product_id?: Maybe<number>;
    qty?: Maybe<string>;
    store_id?: Maybe<number>;
    custom_attributes?: Maybe<
      Array<Maybe<{ __typename?: 'CustomAttributes'; attribute_code?: Maybe<string>; name?: Maybe<string>; value?: Maybe<string> }>>
    >;
  }>;
};

export type IDeleteWishlistMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type IDeleteWishlistMutation = { __typename?: 'Mutation'; deleteWishlist?: Maybe<Array<Maybe<string>>> };

export type IDeleteWishlistItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type IDeleteWishlistItemMutation = { __typename?: 'Mutation'; deleteWishlistItem?: Maybe<Array<Maybe<string>>> };

export type IUpdateWishlistMutationVariables = Exact<{
  input: IUpdateWishlistInput;
}>;

export type IUpdateWishlistMutation = {
  __typename?: 'Mutation';
  updateWishlist?: Maybe<{
    __typename?: 'Wishlist';
    wishlist_id: number;
    customer_id: number;
    items?: Maybe<
      Array<
        Maybe<{
          __typename?: 'WishlistItem';
          wishlist_item_id: number;
          product_name?: Maybe<string>;
          product_id?: Maybe<number>;
          qty?: Maybe<string>;
          store_id?: Maybe<number>;
          description?: Maybe<string>;
        }>
      >
    >;
  }>;
};

export type IUpdateWishlistItemMutationVariables = Exact<{
  input: IUpdateWishlistItemInput;
}>;

export type IUpdateWishlistItemMutation = {
  __typename?: 'Mutation';
  updateWishlistItem?: Maybe<{
    __typename?: 'WishlistItem';
    wishlist_item_id: number;
    product_name?: Maybe<string>;
    product_id?: Maybe<number>;
    qty?: Maybe<string>;
    store_id?: Maybe<number>;
    custom_attributes?: Maybe<
      Array<Maybe<{ __typename?: 'CustomAttributes'; attribute_code?: Maybe<string>; name?: Maybe<string>; value?: Maybe<string> }>>
    >;
  }>;
};

export type IProductAssociationBySkuQueryVariables = Exact<{
  sku?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
}>;

export type IProductAssociationBySkuQuery = { __typename?: 'Query'; productAssociationBySku?: Maybe<any> };

export type IProductRecommendationByUserQueryVariables = Exact<{
  customerId?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
}>;

export type IProductRecommendationByUserQuery = { __typename?: 'Query'; productRecommendationByUser?: Maybe<any> };

export type IActive2hrsPickUpStoresQueryVariables = Exact<{
  sku?: Maybe<Scalars['String']>;
}>;

export type IActive2hrsPickUpStoresQuery = {
  __typename?: 'Query';
  getAllActive2hrsPickUpStores?: Maybe<
    Array<
      Maybe<{
        __typename?: 'PickUpStore';
        source_item?: Maybe<{
          __typename?: 'PickUpStoreSourceItem';
          sku?: Maybe<string>;
          quantity?: Maybe<number>;
          source_code?: Maybe<string>;
          status?: Maybe<number>;
        }>;
        store?: Maybe<{
          __typename?: 'Store';
          id?: Maybe<string>;
          name?: Maybe<string>;
          is_active?: Maybe<boolean>;
          seller_code?: Maybe<string>;
          attribute_set_name?: Maybe<string>;
          custom_attributes?: Maybe<{
            __typename?: 'StoreCustomAttribute';
            url_key?: Maybe<string>;
            show_contact_form?: Maybe<string>;
            inventory_source?: Maybe<string>;
            contact_phone?: Maybe<string>;
            contact_fax?: Maybe<string>;
          }>;
          extension_attributes?: Maybe<{
            __typename?: 'StoreExtensionAttribute';
            special_opening_hours?: Maybe<Array<Maybe<string>>>;
            ispu_promise_delivery?: Maybe<string>;
            stock_low_indicator_threshold?: Maybe<number>;
            address?: Maybe<{
              __typename?: 'StoreAddress';
              id?: Maybe<number>;
              retailer_id?: Maybe<number>;
              region_id?: Maybe<number>;
              region?: Maybe<string>;
              country_id?: Maybe<string>;
              street?: Maybe<Array<Maybe<string>>>;
              postcode?: Maybe<string>;
              city?: Maybe<string>;
              coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
            }>;
            opening_hours?: Maybe<
              Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>
            >;
          }>;
        }>;
      }>
    >
  >;
};

export type IActiveStatus2HrsPickUpStoresQueryVariables = Exact<{
  sku?: Maybe<Scalars['String']>;
}>;

export type IActiveStatus2HrsPickUpStoresQuery = {
  __typename?: 'Query';
  getStatusActivePickupStore?: Maybe<{ __typename?: 'IsSalable'; status?: Maybe<boolean> }>;
};

export type IBannerQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type IBannerQuery = {
  __typename?: 'Query';
  banner?: Maybe<
    Array<
      Maybe<{
        __typename?: 'banner';
        id: string;
        name: string;
        animation_effect?: Maybe<number>;
        pause_time_between_transitions?: Maybe<number>;
        slide_transition_speed?: Maybe<number>;
        is_stop_animation_mouse_on_banner?: Maybe<boolean>;
        display_arrows?: Maybe<boolean>;
        display_bullets?: Maybe<boolean>;
        is_random_order_image?: Maybe<boolean>;
        slide_position?: Maybe<string>;
        extension_attributes?: Maybe<{
          __typename?: 'extensionAttributes';
          image_dir?: Maybe<string>;
          slides?: Maybe<
            Array<
              Maybe<{
                __typename?: 'slides';
                id?: Maybe<number>;
                status?: Maybe<number>;
                store_ids?: Maybe<Array<Maybe<number>>>;
                img_alt?: Maybe<string>;
                img_title?: Maybe<string>;
                img_file?: Maybe<string>;
                img_url?: Maybe<string>;
                url?: Maybe<string>;
                is_open_url_in_new_window?: Maybe<boolean>;
                is_add_nofollow_to_url?: Maybe<boolean>;
                extension_attributes?: Maybe<{ __typename?: 'subExtensionAttributes'; cms_content?: Maybe<string>; cms_position?: Maybe<string> }>;
              }>
            >
          >;
        }>;
      }>
    >
  >;
};

export type IBinLookupQueryVariables = Exact<{
  bin: Scalars['String'];
}>;

export type IBinLookupQuery = {
  __typename?: 'Query';
  binLookup: { __typename?: 'BinLookup'; bank_id?: Maybe<string>; promo_codes?: Maybe<Array<Maybe<string>>> };
};

export type IBrandDetailQueryVariables = Exact<{
  brandId?: Maybe<Scalars['Int']>;
}>;

export type IBrandDetailQuery = {
  __typename?: 'Query';
  brandDetail?: Maybe<{
    __typename?: 'BrandDetail';
    brand_id: string;
    attribute_id?: Maybe<number>;
    attribute_code?: Maybe<string>;
    option_id?: Maybe<number>;
    name?: Maybe<string>;
    website_ids?: Maybe<Array<Maybe<number>>>;
    url_key?: Maybe<string>;
    logo?: Maybe<string>;
    is_featured?: Maybe<boolean>;
    meta_title?: Maybe<string>;
    meta_description?: Maybe<string>;
    description?: Maybe<string>;
    content?: Maybe<
      Array<
        Maybe<{
          __typename?: 'BrandContent';
          brand_id?: Maybe<number>;
          store_id?: Maybe<number>;
          meta_title?: Maybe<string>;
          meta_description?: Maybe<string>;
          description?: Maybe<string>;
        }>
      >
    >;
    brand_additional_products?: Maybe<Array<Maybe<{ __typename?: 'BrandAdditionalProduct'; product_id?: Maybe<number>; position?: Maybe<number> }>>>;
    extension_attributes?: Maybe<{
      __typename?: 'BrandDetailExtensionAttributess';
      parent_category?: Maybe<number>;
      menu_css?: Maybe<string>;
      content_css?: Maybe<string>;
      brand_image_url?: Maybe<string>;
      position?: Maybe<number>;
      product_count?: Maybe<number>;
      product_name_special?: Maybe<boolean>;
      hide_product_original_price?: Maybe<boolean>;
      hide_t1c_redeemable_amount?: Maybe<boolean>;
      allow_product_review?: Maybe<boolean>;
      banners?: Maybe<any>;
      product_collections?: Maybe<
        Array<
          Maybe<{
            __typename?: 'BrandProductCollection';
            brand_collection_id: string;
            brand_id?: Maybe<number>;
            url?: Maybe<string>;
            content?: Maybe<string>;
            identification?: Maybe<string>;
            name?: Maybe<string>;
            description?: Maybe<string>;
            position?: Maybe<number>;
            deep_link?: Maybe<string>;
            is_official?: Maybe<boolean>;
            collection_products_textarea?: Maybe<string>;
            brand_collection_products?: Maybe<
              Array<Maybe<{ __typename?: 'BrandAdditionalProduct'; product_id?: Maybe<number>; position?: Maybe<number> }>>
            >;
          }>
        >
      >;
      sort_orders?: Maybe<Array<{ __typename?: 'BrandSortOrders'; field: string; direction: string }>>;
    }>;
  }>;
};

export type IBrandsQueryVariables = Exact<{
  filter?: Maybe<IFilterGroups>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;

export type IBrandsQuery = {
  __typename?: 'Query';
  brands?: Maybe<
    Array<
      Maybe<{
        __typename?: 'Brand';
        brand_id: string;
        name: string;
        url_key?: Maybe<string>;
        logo?: Maybe<string>;
        meta_description?: Maybe<string>;
        meta_title?: Maybe<string>;
        extension_attributes?: Maybe<{
          __typename?: 'BrandExtensionAttributes';
          only_central?: Maybe<number>;
          position?: Maybe<number>;
          product_count?: Maybe<number>;
        }>;
      }>
    >
  >;
};

export type ICardsQueryVariables = Exact<{
  sort?: Maybe<ICardSort>;
}>;

export type ICardsQuery = { __typename?: 'Query'; cards: Array<{ __typename?: 'Card' } & ICardFragmentFragment> };

export type ICartQueryVariables = Exact<{
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
}>;

export type ICartQuery = {
  __typename?: 'Query';
  cart?: Maybe<
    {
      __typename?: 'Cart';
      has_gift_wrap: boolean;
      billing_address?: Maybe<{
        __typename?: 'CartBillingAddress';
        id?: Maybe<number>;
        region?: Maybe<string>;
        region_id?: Maybe<string>;
        region_code?: Maybe<string>;
        company?: Maybe<string>;
        country_id?: Maybe<string>;
        street?: Maybe<Array<Maybe<string>>>;
        telephone?: Maybe<string>;
        postcode?: Maybe<string>;
        city?: Maybe<string>;
        firstname?: Maybe<string>;
        lastname?: Maybe<string>;
        vat_id?: Maybe<string>;
        email?: Maybe<string>;
        same_as_billing?: Maybe<number>;
        save_in_address_book?: Maybe<number>;
        customer_id?: Maybe<number>;
        customer_address_id?: Maybe<number>;
        extension_attributes?: Maybe<{ __typename?: 'CartBillingAddressExtensionAttributes'; full_tax_request?: Maybe<string> }>;
        custom_attributes?: Maybe<{
          __typename?: 'CartBillingAddressCustomAttributes';
          address_line?: Maybe<string>;
          address_name?: Maybe<string>;
          branch_id?: Maybe<string>;
          building?: Maybe<string>;
          customer_address_type?: Maybe<string>;
          subdistrict?: Maybe<string>;
          subdistrict_id?: Maybe<string>;
          district?: Maybe<string>;
          district_id?: Maybe<string>;
          region?: Maybe<string>;
          postcode?: Maybe<string>;
          full_tax_request?: Maybe<string>;
          full_tax_type?: Maybe<string>;
          company_id?: Maybe<string>;
          address_line2?: Maybe<string>;
          branch_code?: Maybe<string>;
        }>;
      }>;
      items?: Maybe<
        Array<
          Maybe<{
            __typename?: 'CartItem';
            item_id: string;
            sku: string;
            qty: number;
            name?: Maybe<string>;
            price: number;
            product_type?: Maybe<string>;
            quote_id?: Maybe<string>;
            row_total?: Maybe<number>;
            row_total_incl_tax?: Maybe<number>;
            row_total_with_discount?: Maybe<number>;
            tax_amount?: Maybe<number>;
            discount_percent?: Maybe<number>;
            discount_amount?: Maybe<number>;
            price_incl_tax?: Maybe<number>;
            total_price?: Maybe<number>;
            extension_attributes?: Maybe<{
              __typename?: 'CartItemExtensionAttributes';
              salable_quantity?: Maybe<number>;
              configurable_product_labels?: Maybe<Array<Maybe<string>>>;
              parent_sku?: Maybe<string>;
              free_items?: Maybe<
                Array<
                  Maybe<{
                    __typename?: 'FreeItem';
                    sku?: Maybe<string>;
                    qty?: Maybe<number>;
                    cart_id?: Maybe<string>;
                    sales_rule_id?: Maybe<number>;
                    sales_rule_action_type?: Maybe<number>;
                    sales_rule_action_apply?: Maybe<string>;
                    product?: Maybe<{
                      __typename?: 'Product';
                      sku?: Maybe<string>;
                      name?: Maybe<string>;
                      image?: Maybe<string>;
                      price?: Maybe<number>;
                      special_price?: Maybe<number>;
                      extension_attributes?: Maybe<{
                        __typename?: 'ProductsExtensionAttributes';
                        salable?: Maybe<boolean>;
                        brand?: Maybe<{ __typename?: 'ProductsExtensionAttributesBrand'; name?: Maybe<string> }>;
                      }>;
                      marketplace?: Maybe<{ __typename?: 'MarketPlaceSeller' } & IMarketPlaceSellerFragmentFragment>;
                    }>;
                  }>
                >
              >;
              free_items_added?: Maybe<
                Array<
                  Maybe<{
                    __typename?: 'FreeItemAdded';
                    quote_id?: Maybe<number>;
                    item_id?: Maybe<number>;
                    sku?: Maybe<string>;
                    sales_rule_id?: Maybe<number>;
                    qty?: Maybe<number>;
                    intent_qty?: Maybe<number>;
                    for_item_id?: Maybe<number>;
                    associated_item_id?: Maybe<number>;
                    product?: Maybe<{
                      __typename?: 'Product';
                      sku?: Maybe<string>;
                      name?: Maybe<string>;
                      image?: Maybe<string>;
                      price?: Maybe<number>;
                      special_price?: Maybe<number>;
                      custom_attributes_option?: Maybe<any>;
                      extension_attributes?: Maybe<{
                        __typename?: 'ProductsExtensionAttributes';
                        salable?: Maybe<boolean>;
                        brand?: Maybe<{ __typename?: 'ProductsExtensionAttributesBrand' } & IProductBrandFragmentFragment>;
                      }>;
                      marketplace?: Maybe<{ __typename?: 'MarketPlaceSeller' } & IMarketPlaceSellerFragmentFragment>;
                    }>;
                  }>
                >
              >;
              shipping_assignment?: Maybe<{ __typename?: 'CartItemShippingAssignment'; shipping_method?: Maybe<string> }>;
            }>;
            options: Array<{ __typename?: 'CartItemOption'; label: string; value: string }>;
            product?: Maybe<{ __typename?: 'Product' } & IProductFragmentFragment>;
          }>
        >
      >;
      totals?: Maybe<{
        __typename?: 'CartTotals';
        grand_total?: Maybe<number>;
        base_grand_total?: Maybe<number>;
        subtotal?: Maybe<number>;
        discount_amount?: Maybe<number>;
        subtotal_with_discount?: Maybe<number>;
        shipping_amount?: Maybe<number>;
        shipping_discount_amount?: Maybe<number>;
        tax_amount?: Maybe<number>;
        shipping_tax_amount?: Maybe<number>;
        subtotal_incl_tax?: Maybe<number>;
        shipping_incl_tax?: Maybe<number>;
        coupon_code?: Maybe<string>;
        extension_attributes?: Maybe<{
          __typename?: 'CartTotalsExtensionAttributes';
          surcharge?: Maybe<string>;
          t1c_earn_points_estimate?: Maybe<string>;
          t1c_maximum_redeemable_points?: Maybe<number>;
          cart_summary?: Maybe<{
            __typename?: 'CartTotalsExtensionAttributesCartSummary';
            other_discount?: Maybe<number>;
            other_discount_incl_tax?: Maybe<number>;
            other_discount_tax?: Maybe<number>;
            t1c_discount?: Maybe<number>;
            t1c_discount_incl_tax?: Maybe<number>;
            t1c_discount_tax?: Maybe<number>;
            coupon_discount?: Maybe<number>;
            coupon_discount_incl_tax?: Maybe<number>;
            coupon_discount_tax?: Maybe<number>;
            total_save?: Maybe<number>;
            total_save_incl_tax?: Maybe<number>;
            tax_amount?: Maybe<number>;
            total_shipping_fee?: Maybe<number>;
            total_shipping_fee_incl_tax?: Maybe<number>;
          }>;
        }>;
        total_segments?: Maybe<
          Array<
            Maybe<{ __typename?: 'TotalSegment'; code?: Maybe<string>; title?: Maybe<string>; value?: Maybe<any>; extension_attributes?: Maybe<any> }>
          >
        >;
      }>;
      extension_attributes?: Maybe<{
        __typename?: 'CartExtensionAttributes';
        is_split_quote?: Maybe<number>;
        is_pre_order?: Maybe<boolean>;
        pwb_standard_pre_order_message?: Maybe<string>;
        order_id?: Maybe<string>;
        free_items?: Maybe<
          Array<
            Maybe<{
              __typename?: 'FreeItem';
              sku?: Maybe<string>;
              qty?: Maybe<number>;
              cart_id?: Maybe<string>;
              sales_rule_id?: Maybe<number>;
              sales_rule_action_type?: Maybe<number>;
              sales_rule_action_apply?: Maybe<string>;
              product?: Maybe<{
                __typename?: 'Product';
                sku?: Maybe<string>;
                name?: Maybe<string>;
                image?: Maybe<string>;
                price?: Maybe<number>;
                special_price?: Maybe<number>;
                extension_attributes?: Maybe<{ __typename?: 'ProductsExtensionAttributes'; salable?: Maybe<boolean> }>;
                marketplace?: Maybe<{ __typename?: 'MarketPlaceSeller' } & IMarketPlaceSellerFragmentFragment>;
              }>;
            }>
          >
        >;
        free_items_added?: Maybe<
          Array<
            Maybe<{
              __typename?: 'FreeItemAdded';
              quote_id?: Maybe<number>;
              item_id?: Maybe<number>;
              sku?: Maybe<string>;
              sales_rule_id?: Maybe<number>;
              qty?: Maybe<number>;
              intent_qty?: Maybe<number>;
              for_item_id?: Maybe<number>;
              associated_item_id?: Maybe<number>;
              product?: Maybe<{
                __typename?: 'Product';
                sku?: Maybe<string>;
                name?: Maybe<string>;
                image?: Maybe<string>;
                price?: Maybe<number>;
                special_price?: Maybe<number>;
                extension_attributes?: Maybe<{
                  __typename?: 'ProductsExtensionAttributes';
                  salable?: Maybe<boolean>;
                  brand?: Maybe<{ __typename?: 'ProductsExtensionAttributesBrand' } & IProductBrandFragmentFragment>;
                }>;
                marketplace?: Maybe<{ __typename?: 'MarketPlaceSeller' } & IMarketPlaceSellerFragmentFragment>;
              }>;
            }>
          >
        >;
        free_shipping_offer?: Maybe<{ __typename?: 'FreeShippingOffer'; message?: Maybe<string> }>;
        children?: Maybe<
          Array<
            Maybe<{
              __typename?: 'Cart';
              id?: Maybe<string>;
              items_count?: Maybe<number>;
              items_qty?: Maybe<number>;
              items?: Maybe<
                Array<
                  Maybe<{
                    __typename?: 'CartItem';
                    item_id: string;
                    sku: string;
                    qty: number;
                    name?: Maybe<string>;
                    price: number;
                    product_type?: Maybe<string>;
                    extension_attributes?: Maybe<{
                      __typename?: 'CartItemExtensionAttributes';
                      parent_quote_item_id?: Maybe<string>;
                      shipping_assignment?: Maybe<{ __typename?: 'CartItemShippingAssignment'; shipping_method?: Maybe<string> }>;
                    }>;
                  }>
                >
              >;
              extension_attributes?: Maybe<{
                __typename?: 'CartExtensionAttributes';
                shipping_assignments?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'CartExtensionAttributesShippingAssigments';
                      shipping?: Maybe<{
                        __typename?: 'ShippingAssigmentsShipping';
                        method?: Maybe<string>;
                        address?: Maybe<{
                          __typename?: 'CartBillingAddress';
                          id?: Maybe<number>;
                          region?: Maybe<string>;
                          region_id?: Maybe<string>;
                          street?: Maybe<Array<Maybe<string>>>;
                          telephone?: Maybe<string>;
                          postcode?: Maybe<string>;
                          city?: Maybe<string>;
                          firstname?: Maybe<string>;
                          lastname?: Maybe<string>;
                          email?: Maybe<string>;
                        }>;
                      }>;
                    }>
                  >
                >;
                retailer?: Maybe<{
                  __typename?: 'Store';
                  id?: Maybe<string>;
                  name?: Maybe<string>;
                  is_active?: Maybe<boolean>;
                  seller_code?: Maybe<string>;
                  attribute_set_name?: Maybe<string>;
                  custom_attributes?: Maybe<{
                    __typename?: 'StoreCustomAttribute';
                    url_key?: Maybe<string>;
                    show_contact_form?: Maybe<string>;
                    inventory_source?: Maybe<string>;
                    contact_phone?: Maybe<string>;
                    contact_fax?: Maybe<string>;
                  }>;
                  extension_attributes?: Maybe<{
                    __typename?: 'StoreExtensionAttribute';
                    special_opening_hours?: Maybe<Array<Maybe<string>>>;
                    ispu_promise_delivery?: Maybe<string>;
                    address?: Maybe<{
                      __typename?: 'StoreAddress';
                      id?: Maybe<number>;
                      retailer_id?: Maybe<number>;
                      region?: Maybe<string>;
                      region_id?: Maybe<number>;
                      country_id?: Maybe<string>;
                      street?: Maybe<Array<Maybe<string>>>;
                      postcode?: Maybe<string>;
                      city?: Maybe<string>;
                      coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
                    }>;
                    opening_hours?: Maybe<
                      Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>
                    >;
                  }>;
                }>;
              }>;
            }>
          >
        >;
        shipping_assignments?: Maybe<
          Array<
            Maybe<{
              __typename?: 'CartExtensionAttributesShippingAssigments';
              shipping?: Maybe<{
                __typename?: 'ShippingAssigmentsShipping';
                method?: Maybe<string>;
                address?: Maybe<{
                  __typename?: 'CartBillingAddress';
                  id?: Maybe<number>;
                  region?: Maybe<string>;
                  region_id?: Maybe<string>;
                  street?: Maybe<Array<Maybe<string>>>;
                  telephone?: Maybe<string>;
                  postcode?: Maybe<string>;
                  city?: Maybe<string>;
                  firstname?: Maybe<string>;
                  lastname?: Maybe<string>;
                  email?: Maybe<string>;
                  custom_attributes?: Maybe<{
                    __typename?: 'CartBillingAddressCustomAttributes';
                    address_line?: Maybe<string>;
                    building?: Maybe<string>;
                    subdistrict?: Maybe<string>;
                    district?: Maybe<string>;
                  }>;
                }>;
              }>;
            }>
          >
        >;
        retailer?: Maybe<{
          __typename?: 'Store';
          id?: Maybe<string>;
          name?: Maybe<string>;
          is_active?: Maybe<boolean>;
          seller_code?: Maybe<string>;
          attribute_set_name?: Maybe<string>;
          custom_attributes?: Maybe<{
            __typename?: 'StoreCustomAttribute';
            url_key?: Maybe<string>;
            show_contact_form?: Maybe<string>;
            inventory_source?: Maybe<string>;
            contact_phone?: Maybe<string>;
            contact_fax?: Maybe<string>;
          }>;
          extension_attributes?: Maybe<{
            __typename?: 'StoreExtensionAttribute';
            special_opening_hours?: Maybe<Array<Maybe<string>>>;
            ispu_promise_delivery?: Maybe<string>;
            address?: Maybe<{
              __typename?: 'StoreAddress';
              id?: Maybe<number>;
              retailer_id?: Maybe<number>;
              region?: Maybe<string>;
              region_id?: Maybe<number>;
              country_id?: Maybe<string>;
              street?: Maybe<Array<Maybe<string>>>;
              postcode?: Maybe<string>;
              city?: Maybe<string>;
              coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
            }>;
            opening_hours?: Maybe<
              Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>
            >;
          }>;
        }>;
      }>;
    } & ICartFragmentCartFragment
  >;
};

export type ICartMiniQueryVariables = Exact<{
  isGuest?: Maybe<Scalars['Boolean']>;
  cartId?: Maybe<Scalars['String']>;
}>;

export type ICartMiniQuery = { __typename?: 'Query'; cartMini?: Maybe<{ __typename?: 'CartMini' } & ICartFragmentCartMiniFragment> };

export type ICategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type ICategoriesQuery = {
  __typename?: 'Query';
  categories?: Maybe<
    Array<
      Maybe<{
        __typename?: 'CategoryFlat';
        entity_id: string;
        parent_id?: Maybe<string>;
        name?: Maybe<string>;
        is_active?: Maybe<string>;
        position?: Maybe<number>;
        level?: Maybe<string>;
        path?: Maybe<string>;
        include_in_menu?: Maybe<string>;
        product_count?: Maybe<number>;
        children?: Maybe<string>;
        children_count?: Maybe<string>;
        url_key?: Maybe<string>;
        url_path?: Maybe<string>;
        virtual_category_root?: Maybe<string>;
        segment_information?: Maybe<string>;
        image_icon_tablet?: Maybe<string>;
        image_mobile?: Maybe<string>;
        image?: Maybe<string>;
        icon?: Maybe<string>;
      }>
    >
  >;
};

export type ICategoriesTreeQueryVariables = Exact<{ [key: string]: never }>;

export type ICategoriesTreeQuery = {
  __typename?: 'Query';
  categoriesTree?: Maybe<
    Array<
      Maybe<
        {
          __typename?: 'CategoryFlat';
          children_data?: Maybe<
            Array<
              Maybe<
                {
                  __typename?: 'CategoryFlat';
                  children_data?: Maybe<
                    Array<
                      Maybe<
                        {
                          __typename?: 'CategoryFlat';
                          children_data?: Maybe<Array<Maybe<{ __typename?: 'CategoryFlat' } & ICategoriesFragmentFragment>>>;
                        } & ICategoriesFragmentFragment
                      >
                    >
                  >;
                } & ICategoriesFragmentFragment
              >
            >
          >;
        } & ICategoriesFragmentFragment
      >
    >
  >;
};

export type ICategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;

export type ICategoryQuery = {
  __typename?: 'Query';
  category?: Maybe<{
    __typename?: 'Category';
    id: string;
    parent_id?: Maybe<number>;
    name?: Maybe<string>;
    is_active?: Maybe<boolean>;
    position?: Maybe<number>;
    level?: Maybe<number>;
    children?: Maybe<string>;
    created_at?: Maybe<string>;
    updated_at?: Maybe<string>;
    include_in_menu?: Maybe<boolean>;
    meta_title?: Maybe<string>;
    meta_keywords?: Maybe<string>;
    meta_description?: Maybe<string>;
    children_count?: Maybe<number>;
    url_key?: Maybe<string>;
    url_path?: Maybe<string>;
    is_virtual_category?: Maybe<string>;
    virtual_category_root?: Maybe<string>;
    description?: Maybe<string>;
    extension_attributes?: Maybe<any>;
    custom_attributes?: Maybe<any>;
    is_hide_display_price?: Maybe<boolean>;
    path?: Maybe<Array<Maybe<{ __typename?: 'Category'; name?: Maybe<string>; url_key?: Maybe<string>; url_path?: Maybe<string>; id: string }>>>;
  }>;
};

export type IClickNCollectPickUpStoresQueryVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
}>;

export type IClickNCollectPickUpStoresQuery = {
  __typename?: 'Query';
  getClickNCollectPickUpStores?: Maybe<
    Array<
      Maybe<{
        __typename?: 'Store';
        id?: Maybe<string>;
        name?: Maybe<string>;
        is_active?: Maybe<boolean>;
        seller_code?: Maybe<string>;
        attribute_set_name?: Maybe<string>;
        custom_attributes?: Maybe<{
          __typename?: 'StoreCustomAttribute';
          url_key?: Maybe<string>;
          show_contact_form?: Maybe<string>;
          inventory_source?: Maybe<string>;
          contact_phone?: Maybe<string>;
          contact_fax?: Maybe<string>;
          min_lead_time?: Maybe<string>;
          max_lead_time?: Maybe<string>;
        }>;
        extension_attributes?: Maybe<{
          __typename?: 'StoreExtensionAttribute';
          special_opening_hours?: Maybe<Array<Maybe<string>>>;
          address?: Maybe<{
            __typename?: 'StoreAddress';
            id?: Maybe<number>;
            retailer_id?: Maybe<number>;
            region_id?: Maybe<number>;
            country_id?: Maybe<string>;
            street?: Maybe<Array<Maybe<string>>>;
            postcode?: Maybe<string>;
            city?: Maybe<string>;
            coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
          }>;
          opening_hours?: Maybe<
            Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>
          >;
        }>;
      }>
    >
  >;
};

export type ICmsQueryVariables = Exact<{
  filter: ICmsFilterInput;
}>;

export type ICmsQuery = {
  __typename?: 'Query';
  cms?: Maybe<{
    __typename?: 'CmsContent';
    status?: Maybe<string>;
    cms_list?: Maybe<
      Array<
        Maybe<{
          __typename?: 'CmsItem';
          _id?: Maybe<string>;
          identifier?: Maybe<string>;
          name?: Maybe<string>;
          url_key?: Maybe<string>;
          updated_at?: Maybe<string>;
          status?: Maybe<string>;
          custom_field?: Maybe<any>;
          layout_type?: Maybe<string>;
          page_layout?: Maybe<string>;
          contents?: Maybe<{
            __typename?: 'CmsContentDetail';
            css?: Maybe<string>;
            js?: Maybe<string>;
            html?: Maybe<string>;
            instagram?: Maybe<any>;
            meta?: Maybe<any>;
          }>;
          languages?: Maybe<{
            __typename?: 'CmsLanguageField';
            en?: Maybe<{
              __typename?: 'CmsContentObject';
              css?: Maybe<string>;
              html?: Maybe<string>;
              meta?: Maybe<any>;
              lang_code?: Maybe<string>;
              _id?: Maybe<string>;
              contents?: Maybe<any>;
            }>;
            th?: Maybe<{
              __typename?: 'CmsContentObject';
              css?: Maybe<string>;
              html?: Maybe<string>;
              meta?: Maybe<any>;
              lang_code?: Maybe<string>;
              _id?: Maybe<string>;
              contents?: Maybe<any>;
            }>;
          }>;
        }>
      >
    >;
  }>;
};

export type ICmsBlockByIdentifierQueryVariables = Exact<{
  identifier: Scalars['String'];
  storeId: Scalars['String'];
}>;

export type ICmsBlockByIdentifierQuery = {
  __typename?: 'Query';
  cmsBlockByIdentifier?: Maybe<{
    __typename?: 'CmsBlock';
    id: string;
    content?: Maybe<string>;
    identifier: string;
    active?: Maybe<boolean>;
    title?: Maybe<string>;
  }>;
};

export type ICmsBlocksQueryVariables = Exact<{
  identifier: Scalars['String'];
  storeId: Scalars['String'];
}>;

export type ICmsBlocksQuery = {
  __typename?: 'Query';
  cmsBlocks?: Maybe<Array<Maybe<{ __typename?: 'CmsBlock'; id: string; content?: Maybe<string>; identifier: string; active?: Maybe<boolean> }>>>;
};

export type ICmsSearchBlockQueryVariables = Exact<{
  identifier: Scalars['String'];
  storeId: Scalars['String'];
}>;

export type ICmsSearchBlockQuery = {
  __typename?: 'Query';
  cmsBlocks?: Maybe<Array<Maybe<{ __typename?: 'CmsBlock'; id: string; identifier: string; content?: Maybe<string> }>>>;
};

export type IConsentInfoQueryVariables = Exact<{ [key: string]: never }>;

export type IConsentInfoQuery = {
  __typename?: 'Query';
  consentInfo?: Maybe<{ __typename?: 'Consent'; marketing: string; privacy_policy: string; version: string }>;
};

export type ICouponCampaignListQueryVariables = Exact<{
  campaignName: Scalars['String'];
}>;

export type ICouponCampaignListQuery = {
  __typename?: 'Query';
  couponCampaignList?: Maybe<
    Array<
      Maybe<{
        __typename?: 'CouponCampaignResponse';
        remaining_count: number;
        coupon_image: string;
        rule: { __typename?: 'CouponRuleData' } & ICouponRuleFragmentFragment;
      }>
    >
  >;
};

export type ICouponListQueryVariables = Exact<{
  input: ICouponInput;
}>;

export type ICouponListQuery = { __typename?: 'Query'; couponList?: Maybe<{ __typename?: 'CouponResponse' } & ICouponFragmentFragment> };

export type ICustomerQueryVariables = Exact<{
  withConsent?: Maybe<Scalars['Boolean']>;
}>;

export type ICustomerQuery = {
  __typename?: 'Query';
  customer?: Maybe<{
    __typename?: 'Customer';
    id: string;
    group_id?: Maybe<number>;
    created_at?: Maybe<string>;
    updated_at?: Maybe<string>;
    created_in?: Maybe<string>;
    default_billing?: Maybe<string>;
    default_shipping?: Maybe<string>;
    email?: Maybe<string>;
    dob?: Maybe<string>;
    gender?: Maybe<IGender>;
    firstname?: Maybe<string>;
    lastname?: Maybe<string>;
    store_id?: Maybe<number>;
    website_id?: Maybe<number>;
    is_subscribed: boolean;
    phone?: Maybe<string>;
    tax_id?: Maybe<string>;
    t1c_no?: Maybe<string>;
    t1c_phone?: Maybe<string>;
    language?: Maybe<string>;
    custom_attributes?: Maybe<any>;
    need_reaccept_consents?: Maybe<boolean>;
    addresses: Array<{ __typename?: 'CustomerAddress' } & IAddressFragmentFragment>;
    extension_attributes?: Maybe<{ __typename?: 'CustomerExtensionAttributes'; is_subscribed?: Maybe<boolean> }>;
  }>;
};

export type ICustomerCouponListQueryVariables = Exact<{
  input: ICustomerCouponInput;
}>;

export type ICustomerCouponListQuery = {
  __typename?: 'Query';
  customerCouponList?: Maybe<
    { __typename?: 'CouponResponse'; total_page: number; total_count: number; current_page: number } & ICouponFragmentFragment
  >;
};

export type IDeliveryOptionsQueryVariables = Exact<{
  storeCode: Scalars['String'];
  sku: Scalars['String'];
  postcode?: Maybe<Scalars['String']>;
}>;

export type IDeliveryOptionsQuery = {
  __typename?: 'Query';
  deliveryOptions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DeliveryOptionItem';
        shipping_method?: Maybe<string>;
        delivery_lead_time_message?: Maybe<string>;
        delivery_free_message?: Maybe<string>;
        shipping_method_label?: Maybe<string>;
        shipping_fee?: Maybe<string>;
      }>
    >
  >;
};

export type IDistrictsByProvinceIdQueryVariables = Exact<{
  storeCode?: Maybe<Scalars['String']>;
  regionId?: Maybe<Scalars['String']>;
}>;

export type IDistrictsByProvinceIdQuery = {
  __typename?: 'Query';
  districts?: Maybe<
    Array<
      Maybe<{
        __typename?: 'District';
        district_id?: Maybe<string>;
        country_id?: Maybe<string>;
        region_id?: Maybe<string>;
        region_code?: Maybe<string>;
        code?: Maybe<string>;
        default_name?: Maybe<string>;
        name?: Maybe<string>;
      }>
    >
  >;
};

export type IEstimateShippingMethodsV3QueryVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IEstimateShippingInput;
  pickupStoresLocationLimit?: Maybe<Scalars['Int']>;
  pickupStoresLocationOffset?: Maybe<Scalars['Int']>;
  pickupStoresLocationFilterKeyword?: Maybe<Scalars['String']>;
  pickupStoresLocationFilterLocation?: Maybe<IPickupStoreLocationFilterLatLng>;
}>;

export type IEstimateShippingMethodsV3Query = {
  __typename?: 'Query';
  estimateShippingMethods?: Maybe<
    Array<
      Maybe<{
        __typename?: 'EstimateShippingMethods';
        method?: Maybe<string>;
        method_caption?: Maybe<string>;
        method_code?: Maybe<string>;
        fastest_method?: Maybe<string>;
        fastest_method_caption?: Maybe<string>;
        free_method?: Maybe<string>;
        free_method_cost?: Maybe<string>;
        shipping_method?: Maybe<
          Array<
            Maybe<{
              __typename?: 'ShippingMethods';
              carrier_code?: Maybe<string>;
              method_code?: Maybe<string>;
              carrier_title?: Maybe<string>;
              caption?: Maybe<string>;
              method_title?: Maybe<string>;
              amount?: Maybe<number>;
              base_amount?: Maybe<number>;
              available?: Maybe<boolean>;
              error_message?: Maybe<string>;
              price_excl_tax?: Maybe<number>;
              price_incl_tax?: Maybe<number>;
              extension_attributes?: Maybe<{
                __typename?: 'ShippingMethodExtension';
                gmap_api_key?: Maybe<string>;
                pickup_locations?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'PickupLocation';
                      id?: Maybe<string>;
                      code?: Maybe<string>;
                      name?: Maybe<string>;
                      display_order?: Maybe<string>;
                      address_line1?: Maybe<string>;
                      district?: Maybe<string>;
                      province?: Maybe<string>;
                      region_id?: Maybe<string>;
                      postal_code?: Maybe<string>;
                      lat?: Maybe<string>;
                      long?: Maybe<string>;
                      pickup_fee?: Maybe<string>;
                      pos_handling_fee?: Maybe<string>;
                      opening_hours?: Maybe<Array<Maybe<string>>>;
                      extension_attributes?: Maybe<{
                        __typename?: 'PickupLocationExtension';
                        available_services?: Maybe<Array<Maybe<string>>>;
                        additional_address_info?: Maybe<{
                          __typename?: 'AdditionalAddressInfo';
                          subdistrict?: Maybe<string>;
                          subdistrict_id?: Maybe<string>;
                          district?: Maybe<string>;
                          district_id?: Maybe<string>;
                          region_id?: Maybe<string>;
                          region_name?: Maybe<string>;
                        }>;
                      }>;
                    }>
                  >
                >;
                pickup_stores_location?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'PickupStoresLocation';
                      id?: Maybe<number>;
                      name?: Maybe<string>;
                      store_code?: Maybe<string>;
                      is_active?: Maybe<boolean>;
                      address?: Maybe<{
                        __typename?: 'PickupStoresLocationAddress';
                        street_number?: Maybe<string>;
                        building?: Maybe<string>;
                        soi?: Maybe<string>;
                        street?: Maybe<string>;
                        district?: Maybe<string>;
                        district_id?: Maybe<number>;
                        sub_district?: Maybe<string>;
                        sub_district_id?: Maybe<number>;
                        region?: Maybe<string>;
                        region_id?: Maybe<string>;
                        post_code?: Maybe<string>;
                        contact_number?: Maybe<string>;
                        country_code?: Maybe<string>;
                        city?: Maybe<string>;
                        latitude?: Maybe<string>;
                        longitude?: Maybe<string>;
                      }>;
                      distance?: Maybe<{ __typename?: 'PickupStoresLocationDistance'; text?: Maybe<string>; value?: Maybe<number> }>;
                      extension_attributes?: Maybe<{
                        __typename?: 'PickupStoresLocationExtensionAttributes';
                        stock_id?: Maybe<number>;
                        image?: Maybe<string>;
                        allow_pick_at_store?: Maybe<boolean>;
                        display_as_store_information?: Maybe<boolean>;
                        cut_off_time?: Maybe<string>;
                        opening_hours?: Maybe<
                          Array<
                            Maybe<{
                              __typename?: 'PickupStoresLocationOpeningHours';
                              day?: Maybe<string>;
                              open?: Maybe<string>;
                              close?: Maybe<string>;
                            }>
                          >
                        >;
                        store_pickup?: Maybe<{
                          __typename?: 'PickupStoresLocationStorePickup';
                          stock_id?: Maybe<number>;
                          allow_ispu?: Maybe<boolean>;
                          allow_sts?: Maybe<string>;
                        }>;
                        salable_items?: Maybe<
                          Array<Maybe<{ __typename?: 'PickupStoresLocationSalableItems'; sku?: Maybe<string>; qty?: Maybe<number> }>>
                        >;
                        additional_text?: Maybe<{
                          __typename?: 'PickupStoresLocationAdditionalText';
                          method_code?: Maybe<string>;
                          method_label_code?: Maybe<string>;
                          time_value?: Maybe<number>;
                          time_unit?: Maybe<string>;
                          date_time?: Maybe<string>;
                          extension_attributes?: Maybe<{
                            __typename?: 'PickupStoresLocationAdditionalTextExtensionAttributes';
                            additional_text_variable?: Maybe<{
                              __typename?: 'PickupStoresLocationAdditionalTextVariable';
                              total_ordered?: Maybe<number>;
                              total_available?: Maybe<number>;
                            }>;
                          }>;
                        }>;
                      }>;
                    }>
                  >
                >;
                shipping_slot_list?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'ShippingSlotItem';
                      id?: Maybe<number>;
                      date_time_from?: Maybe<string>;
                      date_time_to?: Maybe<string>;
                      extension_attributes?: Maybe<{ __typename?: 'ShippingSlotItemExtensionAttributes'; day_slot_id?: Maybe<number> }>;
                    }>
                  >
                >;
                messages?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'ShippingMethodExtensionMessage';
                      message_code?: Maybe<string>;
                      message?: Maybe<string>;
                      pre_render_message?: Maybe<string>;
                    }>
                  >
                >;
              }>;
            }>
          >
        >;
      }>
    >
  >;
};

export type IEstimateShippingMethodsV4QueryVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  input: IEstimateShippingInput;
  pickupStoresLocationLimit?: Maybe<Scalars['Int']>;
  pickupStoresLocationOffset?: Maybe<Scalars['Int']>;
  pickupStoresLocationFilterKeyword?: Maybe<Scalars['String']>;
  pickupStoresLocationFilterLocation?: Maybe<IPickupStoreLocationFilterLatLng>;
}>;

export type IEstimateShippingMethodsV4Query = {
  __typename?: 'Query';
  estimateShippingMethodsV4?: Maybe<
    Array<
      Maybe<{
        __typename?: 'EstimateShippingMethods';
        method?: Maybe<string>;
        method_caption?: Maybe<string>;
        method_code?: Maybe<string>;
        fastest_method?: Maybe<string>;
        fastest_method_caption?: Maybe<string>;
        free_method?: Maybe<string>;
        free_method_cost?: Maybe<string>;
        shipping_method?: Maybe<
          Array<
            Maybe<{
              __typename?: 'ShippingMethods';
              carrier_code?: Maybe<string>;
              method_code?: Maybe<string>;
              carrier_title?: Maybe<string>;
              caption?: Maybe<string>;
              method_title?: Maybe<string>;
              amount?: Maybe<number>;
              base_amount?: Maybe<number>;
              available?: Maybe<boolean>;
              error_message?: Maybe<string>;
              price_excl_tax?: Maybe<number>;
              price_incl_tax?: Maybe<number>;
              extension_attributes?: Maybe<{
                __typename?: 'ShippingMethodExtension';
                gmap_api_key?: Maybe<string>;
                pickup_locations?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'PickupLocation';
                      id?: Maybe<string>;
                      code?: Maybe<string>;
                      name?: Maybe<string>;
                      display_order?: Maybe<string>;
                      address_line1?: Maybe<string>;
                      district?: Maybe<string>;
                      province?: Maybe<string>;
                      region_id?: Maybe<string>;
                      postal_code?: Maybe<string>;
                      lat?: Maybe<string>;
                      long?: Maybe<string>;
                      pickup_fee?: Maybe<string>;
                      pos_handling_fee?: Maybe<string>;
                      opening_hours?: Maybe<Array<Maybe<string>>>;
                      extension_attributes?: Maybe<{
                        __typename?: 'PickupLocationExtension';
                        available_services?: Maybe<Array<Maybe<string>>>;
                        additional_address_info?: Maybe<{
                          __typename?: 'AdditionalAddressInfo';
                          subdistrict?: Maybe<string>;
                          subdistrict_id?: Maybe<string>;
                          district?: Maybe<string>;
                          district_id?: Maybe<string>;
                          region_id?: Maybe<string>;
                          region_name?: Maybe<string>;
                        }>;
                      }>;
                    }>
                  >
                >;
                pickup_stores_location?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'PickupStoresLocation';
                      id?: Maybe<number>;
                      name?: Maybe<string>;
                      store_code?: Maybe<string>;
                      is_active?: Maybe<boolean>;
                      address?: Maybe<{
                        __typename?: 'PickupStoresLocationAddress';
                        street_number?: Maybe<string>;
                        building?: Maybe<string>;
                        soi?: Maybe<string>;
                        street?: Maybe<string>;
                        district?: Maybe<string>;
                        district_id?: Maybe<number>;
                        sub_district?: Maybe<string>;
                        sub_district_id?: Maybe<number>;
                        region?: Maybe<string>;
                        region_id?: Maybe<string>;
                        post_code?: Maybe<string>;
                        contact_number?: Maybe<string>;
                        country_code?: Maybe<string>;
                        city?: Maybe<string>;
                        latitude?: Maybe<string>;
                        longitude?: Maybe<string>;
                      }>;
                      distance?: Maybe<{ __typename?: 'PickupStoresLocationDistance'; text?: Maybe<string>; value?: Maybe<number> }>;
                      extension_attributes?: Maybe<{
                        __typename?: 'PickupStoresLocationExtensionAttributes';
                        stock_id?: Maybe<number>;
                        image?: Maybe<string>;
                        allow_pick_at_store?: Maybe<boolean>;
                        display_as_store_information?: Maybe<boolean>;
                        cut_off_time?: Maybe<string>;
                        opening_hours?: Maybe<
                          Array<
                            Maybe<{
                              __typename?: 'PickupStoresLocationOpeningHours';
                              day?: Maybe<string>;
                              open?: Maybe<string>;
                              close?: Maybe<string>;
                            }>
                          >
                        >;
                        store_pickup?: Maybe<{
                          __typename?: 'PickupStoresLocationStorePickup';
                          stock_id?: Maybe<number>;
                          allow_ispu?: Maybe<boolean>;
                          allow_sts?: Maybe<string>;
                        }>;
                        salable_items?: Maybe<
                          Array<Maybe<{ __typename?: 'PickupStoresLocationSalableItems'; sku?: Maybe<string>; qty?: Maybe<number> }>>
                        >;
                        additional_text?: Maybe<{
                          __typename?: 'PickupStoresLocationAdditionalText';
                          method_code?: Maybe<string>;
                          method_label_code?: Maybe<string>;
                          time_value?: Maybe<number>;
                          time_unit?: Maybe<string>;
                          date_time?: Maybe<string>;
                          extension_attributes?: Maybe<{
                            __typename?: 'PickupStoresLocationAdditionalTextExtensionAttributes';
                            additional_text_variable?: Maybe<{
                              __typename?: 'PickupStoresLocationAdditionalTextVariable';
                              total_ordered?: Maybe<number>;
                              total_available?: Maybe<number>;
                            }>;
                          }>;
                        }>;
                      }>;
                    }>
                  >
                >;
                shipping_slot_list?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'ShippingSlotItem';
                      id?: Maybe<number>;
                      date_time_from?: Maybe<string>;
                      date_time_to?: Maybe<string>;
                      extension_attributes?: Maybe<{ __typename?: 'ShippingSlotItemExtensionAttributes'; day_slot_id?: Maybe<number> }>;
                    }>
                  >
                >;
                messages?: Maybe<
                  Array<
                    Maybe<{
                      __typename?: 'ShippingMethodExtensionMessage';
                      message_code?: Maybe<string>;
                      message?: Maybe<string>;
                      pre_render_message?: Maybe<string>;
                    }>
                  >
                >;
                delivery_time_label?: Maybe<{
                  __typename?: 'ShippingMethodExtensionDeliveryTimeLabel';
                  method_type?: Maybe<string>;
                  method_label?: Maybe<string>;
                  min_lead_time?: Maybe<string>;
                  max_lead_time?: Maybe<string>;
                  time_label?: Maybe<string>;
                }>;
              }>;
            }>
          >
        >;
      }>
    >
  >;
};

export type IGetAddressQueryVariables = Exact<{
  input: IGetCustomerAddress;
}>;

export type IGetAddressQuery = {
  __typename?: 'Query';
  getAddress?: Maybe<{
    __typename?: 'CustomerAddressResult';
    id?: Maybe<number>;
    customer_id?: Maybe<number>;
    firstname?: Maybe<string>;
    lastname?: Maybe<string>;
    city?: Maybe<string>;
    telephone?: Maybe<string>;
    country_id?: Maybe<string>;
    vat_id?: Maybe<string>;
    company?: Maybe<string>;
    region_id?: Maybe<string>;
    region?: Maybe<string>;
    default_billing?: Maybe<boolean>;
    default_shipping?: Maybe<boolean>;
    postcode?: Maybe<string>;
    custom_attributes?: Maybe<any>;
  }>;
};

export type IListAddressesQueryVariables = Exact<{
  storeCode?: Maybe<Scalars['String']>;
}>;

export type IListAddressesQuery = {
  __typename?: 'Query';
  listAddresses?: Maybe<
    Array<
      Maybe<{
        __typename?: 'CustomerAddressResult';
        id?: Maybe<number>;
        customer_id?: Maybe<number>;
        firstname?: Maybe<string>;
        lastname?: Maybe<string>;
        city?: Maybe<string>;
        telephone?: Maybe<string>;
        country_id?: Maybe<string>;
        vat_id?: Maybe<string>;
        company?: Maybe<string>;
        region_id?: Maybe<string>;
        region?: Maybe<string>;
        default_billing?: Maybe<boolean>;
        default_shipping?: Maybe<boolean>;
        postcode?: Maybe<string>;
        custom_attributes?: Maybe<any>;
      }>
    >
  >;
};

export type IMulti2hrsPickUpStoresQueryVariables = Exact<{
  skus?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type IMulti2hrsPickUpStoresQuery = {
  __typename?: 'Query';
  getMulti2hrsPickUpStores?: Maybe<
    Array<
      Maybe<{
        __typename?: 'PickUpStoreMulti';
        sku?: Maybe<string>;
        data?: Maybe<
          Array<
            Maybe<{
              __typename?: 'PickUpStore';
              source_item?: Maybe<{
                __typename?: 'PickUpStoreSourceItem';
                sku?: Maybe<string>;
                quantity?: Maybe<number>;
                source_code?: Maybe<string>;
                status?: Maybe<number>;
              }>;
              store?: Maybe<{
                __typename?: 'Store';
                id?: Maybe<string>;
                name?: Maybe<string>;
                is_active?: Maybe<boolean>;
                seller_code?: Maybe<string>;
                attribute_set_name?: Maybe<string>;
                custom_attributes?: Maybe<{
                  __typename?: 'StoreCustomAttribute';
                  url_key?: Maybe<string>;
                  show_contact_form?: Maybe<string>;
                  inventory_source?: Maybe<string>;
                  contact_phone?: Maybe<string>;
                  contact_fax?: Maybe<string>;
                }>;
                extension_attributes?: Maybe<{
                  __typename?: 'StoreExtensionAttribute';
                  special_opening_hours?: Maybe<Array<Maybe<string>>>;
                  ispu_promise_delivery?: Maybe<string>;
                  stock_low_indicator_threshold?: Maybe<number>;
                  address?: Maybe<{
                    __typename?: 'StoreAddress';
                    id?: Maybe<number>;
                    retailer_id?: Maybe<number>;
                    region_id?: Maybe<number>;
                    region?: Maybe<string>;
                    country_id?: Maybe<string>;
                    street?: Maybe<Array<Maybe<string>>>;
                    postcode?: Maybe<string>;
                    city?: Maybe<string>;
                    coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
                  }>;
                  opening_hours?: Maybe<
                    Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>
                  >;
                }>;
              }>;
            }>
          >
        >;
      }>
    >
  >;
};

export type IPaymentOfflineQueryVariables = Exact<{
  incrementId: Scalars['String'];
  key: Scalars['String'];
}>;

export type IPaymentOfflineQuery = {
  __typename?: 'Query';
  paymentOffline: {
    __typename?: 'PaymentOffileDetail';
    orderId?: Maybe<string>;
    paymentCode?: Maybe<string>;
    referenceCode?: Maybe<string>;
    agentpaymentCode?: Maybe<string>;
    paymentExpiry?: Maybe<string>;
    instructionUrl?: Maybe<string>;
    barcodeValue?: Maybe<string>;
    barcodeImage?: Maybe<string>;
    qrCodeImage?: Maybe<string>;
    amount?: Maybe<number>;
    currencyCode?: Maybe<string>;
    merchantName?: Maybe<string>;
    amountString?: Maybe<string>;
  };
};

export type IOrderQueryVariables = Exact<{
  orderId: Scalars['Int'];
  withShipment?: Maybe<Scalars['Boolean']>;
}>;

export type IOrderQuery = {
  __typename?: 'Query';
  order?: Maybe<
    {
      __typename?: 'Order';
      shipment?: Maybe<{
        __typename?: 'ShipmentTrackingItem';
        con_no?: Maybe<string>;
        ref_no?: Maybe<string>;
        order_id?: Maybe<string>;
        status?: Maybe<string>;
        status_code?: Maybe<string>;
        status_desc?: Maybe<string>;
        status_date?: Maybe<string>;
        update_date?: Maybe<string>;
        location?: Maybe<string>;
      }>;
    } & IOrderFragmentFragment
  >;
};

export type ITrackOrderQueryVariables = Exact<{
  incrementId: Scalars['String'];
}>;

export type ITrackOrderQuery = {
  __typename?: 'Query';
  trackOrder?: Maybe<
    Array<{
      __typename?: 'ShipmentTrackingItem';
      con_no?: Maybe<string>;
      status_code?: Maybe<string>;
      status_desc?: Maybe<string>;
      status_date?: Maybe<string>;
      update_date?: Maybe<string>;
      ref_no?: Maybe<string>;
      order_id?: Maybe<string>;
      status?: Maybe<string>;
      location?: Maybe<string>;
    }>
  >;
};

export type IOrderByEmailQueryVariables = Exact<{
  incrementId: Scalars['String'];
  email: Scalars['String'];
}>;

export type IOrderByEmailQuery = {
  __typename?: 'Query';
  orderByEmail?: Maybe<{ __typename?: 'Order'; children?: Maybe<Array<{ __typename?: 'Order' } & IOrderFragmentFragment>> } & IOrderFragmentFragment>;
};

export type IOrderByIncrementIdQueryVariables = Exact<{
  incrementId: Scalars['String'];
  key: Scalars['String'];
}>;

export type IOrderByIncrementIdQuery = {
  __typename?: 'Query';
  orderByIncrementId?: Maybe<
    { __typename?: 'Order'; children?: Maybe<Array<{ __typename?: 'Order' } & IOrderFragmentFragment>> } & IOrderFragmentFragment
  >;
};

export type IOrdersQueryVariables = Exact<{
  filter: IFiltersQuery;
}>;

export type IOrdersQuery = {
  __typename?: 'Query';
  orders?: Maybe<{
    __typename?: 'Orders';
    total_count?: Maybe<number>;
    items?: Maybe<
      Array<
        Maybe<{
          __typename?: 'Order';
          entity_id?: Maybe<number>;
          increment_id?: Maybe<string>;
          created_at?: Maybe<string>;
          shipping_description?: Maybe<string>;
          total_due?: Maybe<number>;
          order_currency_code?: Maybe<string>;
          state?: Maybe<string>;
          status?: Maybe<string>;
          subtotal_incl_tax?: Maybe<number>;
          subtotal?: Maybe<number>;
          tax_amount?: Maybe<number>;
          grand_total?: Maybe<number>;
          discount_amount?: Maybe<number>;
          shipping_incl_tax?: Maybe<number>;
          promotion_code?: Maybe<string>;
          payment?: Maybe<{ __typename?: 'Payment'; method?: Maybe<string> }>;
          items?: Maybe<
            Array<
              Maybe<{
                __typename?: 'OrderItem';
                product_id?: Maybe<number>;
                name?: Maybe<string>;
                sku?: Maybe<string>;
                store_id?: Maybe<number>;
                qty_ordered?: Maybe<number>;
                qty_canceled?: Maybe<number>;
                price?: Maybe<number>;
                price_incl_tax?: Maybe<number>;
                row_total?: Maybe<number>;
                row_total_incl_tax?: Maybe<number>;
                tax_amount?: Maybe<number>;
                tax_canceled?: Maybe<number>;
                base_discount_amount?: Maybe<number>;
                base_discount_invoiced?: Maybe<number>;
                base_discount_tax_compensation_amount?: Maybe<number>;
                base_original_price?: Maybe<number>;
                base_price?: Maybe<number>;
                base_price_incl_tax?: Maybe<number>;
                base_row_invoiced?: Maybe<number>;
                base_row_total?: Maybe<number>;
                base_row_total_incl_tax?: Maybe<number>;
                base_tax_amount?: Maybe<number>;
                base_tax_invoiced?: Maybe<number>;
                discount_amount?: Maybe<number>;
                discount_invoiced?: Maybe<number>;
                discount_percent?: Maybe<number>;
                discount_tax_compensation_amount?: Maybe<number>;
                discount_tax_compensation_canceled?: Maybe<number>;
                original_price?: Maybe<number>;
                store_code?: Maybe<string>;
                url_key?: Maybe<string>;
                image?: Maybe<string>;
                small_image?: Maybe<string>;
                thumbnail?: Maybe<string>;
                custom_attributes?: Maybe<{ __typename?: 'ProductsCustomAttributes'; brand_name?: Maybe<string> }>;
                product?: Maybe<{ __typename?: 'Product' } & IProductFragmentFragment>;
                extension_attributes?: Maybe<{ __typename?: 'OrderItemExtensionAttributes' } & IOrderLineItemFragmentFragment>;
              }>
            >
          >;
          billing_address?: Maybe<{
            __typename?: 'BillingAddress';
            address_type?: Maybe<string>;
            company?: Maybe<string>;
            firstname?: Maybe<string>;
            lastname?: Maybe<string>;
            telephone?: Maybe<string>;
            email?: Maybe<string>;
            prefix?: Maybe<string>;
            country_id?: Maybe<string>;
            city?: Maybe<string>;
            postcode?: Maybe<string>;
            region?: Maybe<string>;
            region_code?: Maybe<string>;
            region_id?: Maybe<string>;
            street?: Maybe<Array<Maybe<string>>>;
            custom_attributes?: Maybe<any>;
            extension_attributes?: Maybe<{
              __typename?: 'BillingAddressExtensionAttributes';
              custom_attributes?: Maybe<Array<Maybe<{ __typename?: 'CustomAttributes'; attribute_code?: Maybe<string>; value?: Maybe<string> }>>>;
            }>;
          }>;
          extension_attributes?: Maybe<{
            __typename?: 'OrderExtensionAttributes';
            order_children_ids?: Maybe<Array<Maybe<number>>>;
            payment_method_label?: Maybe<string>;
            keep_at_store_hours?: Maybe<number>;
            order_status?: Maybe<string>;
            mom_status_reason?: Maybe<string>;
            t1c_redeem?: Maybe<{
              __typename?: 'T1cRedeem';
              t1_cnumber?: Maybe<string>;
              points_redeem?: Maybe<string>;
              points_total?: Maybe<string>;
              discount_amount?: Maybe<string>;
              discount_amount_formatted?: Maybe<string>;
            }>;
            shipping_assignments?: Maybe<
              Array<
                Maybe<{
                  __typename?: 'ShippingAssignment';
                  shipping?: Maybe<{
                    __typename?: 'Shipping';
                    method?: Maybe<string>;
                    address?: Maybe<{
                      __typename?: 'ShippingAddress';
                      address_type?: Maybe<string>;
                      city?: Maybe<string>;
                      company?: Maybe<string>;
                      country_id?: Maybe<string>;
                      email?: Maybe<string>;
                      firstname?: Maybe<string>;
                      lastname?: Maybe<string>;
                      postcode?: Maybe<string>;
                      prefix?: Maybe<string>;
                      region?: Maybe<string>;
                      region_code?: Maybe<string>;
                      region_id?: Maybe<string>;
                      street?: Maybe<Array<Maybe<string>>>;
                      telephone?: Maybe<string>;
                      custom_attributes?: Maybe<any>;
                    }>;
                  }>;
                  items?: Maybe<
                    Array<
                      Maybe<{
                        __typename?: 'ShippingItems';
                        store_id?: Maybe<string>;
                        name?: Maybe<string>;
                        product_type?: Maybe<string>;
                        sku?: Maybe<string>;
                      }>
                    >
                  >;
                }>
              >
            >;
            retailer?: Maybe<{
              __typename?: 'Store';
              id?: Maybe<string>;
              name?: Maybe<string>;
              is_active?: Maybe<boolean>;
              seller_code?: Maybe<string>;
              attribute_set_name?: Maybe<string>;
              custom_attributes?: Maybe<{
                __typename?: 'StoreCustomAttribute';
                url_key?: Maybe<string>;
                show_contact_form?: Maybe<string>;
                inventory_source?: Maybe<string>;
                contact_phone?: Maybe<string>;
                contact_fax?: Maybe<string>;
                min_lead_time?: Maybe<string>;
                max_lead_time?: Maybe<string>;
              }>;
              extension_attributes?: Maybe<{
                __typename?: 'StoreExtensionAttribute';
                special_opening_hours?: Maybe<Array<Maybe<string>>>;
                address?: Maybe<{
                  __typename?: 'StoreAddress';
                  id?: Maybe<number>;
                  retailer_id?: Maybe<number>;
                  region?: Maybe<string>;
                  region_id?: Maybe<number>;
                  country_id?: Maybe<string>;
                  street?: Maybe<Array<Maybe<string>>>;
                  postcode?: Maybe<string>;
                  city?: Maybe<string>;
                  coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
                }>;
                opening_hours?: Maybe<
                  Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>
                >;
              }>;
            }>;
            delivery_status_history?: Maybe<
              Array<Maybe<{ __typename?: 'DeliveryStatusHistory'; status?: Maybe<string>; created_at?: Maybe<string>; reason?: Maybe<string> }>>
            >;
            shipping_slot?: Maybe<{ __typename?: 'ShippingSlot'; date_time_from?: Maybe<string>; date_time_to?: Maybe<string> }>;
            coupon?: Maybe<{
              __typename?: 'CouponDiscount';
              discount_amount?: Maybe<number>;
              discount_amount_formatted?: Maybe<string>;
              coupon_code?: Maybe<string>;
            }>;
            bts_order_status?: Maybe<
              Array<{ __typename?: 'BtsOrderStatus'; seller_id?: Maybe<number>; seller_name?: Maybe<string>; status?: Maybe<string> }>
            >;
          }>;
        }>
      >
    >;
  }>;
};

export type IPaymentMethodsQueryVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  isGuest?: Maybe<Scalars['Boolean']>;
  childrenIds?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type IPaymentMethodsQuery = {
  __typename?: 'Query';
  paymentInformations?: Maybe<{
    __typename?: 'PaymentInformations';
    payment_methods?: Maybe<Array<Maybe<{ __typename?: 'PaymentMethod'; code?: Maybe<string>; title?: Maybe<string> }>>>;
    installment_plans?: Maybe<
      Array<
        {
          __typename?: 'PaymentServiceInstallPlans';
          extension_attributes?: Maybe<{ __typename?: 'PaymentServiceInstallPlansExtensionAttributes'; p2c2p_ipp_amount_per_month?: Maybe<string> }>;
        } & IInstallmentPlansFragmentPaymentServiceInstallPlansFragment
      >
    >;
    extension_attributes?: Maybe<{
      __typename?: 'PaymentExtensionAttributes';
      is_payment_promotion_locked: boolean;
      p2c2p_installment_unavailable_message?: Maybe<string>;
      p2c2p_payment_options?: Maybe<Array<Maybe<{ __typename?: 'P2c2pPaymentOption'; payment?: Maybe<string>; code?: Maybe<string> }>>>;
      p2c2p_payment_agents?: Maybe<
        Array<
          Maybe<{
            __typename?: 'P2c2pPaymentAgent';
            agent_id?: Maybe<string>;
            name?: Maybe<string>;
            code?: Maybe<string>;
            type?: Maybe<string>;
            channel?: Maybe<string>;
            agent_image?: Maybe<string>;
          }>
        >
      >;
      p2c2p_credit_card_promotions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'P2c2pCreditCardPromotion';
            promotion_id?: Maybe<string>;
            bank?: Maybe<string>;
            description?: Maybe<string>;
            card_type?: Maybe<string>;
            card_name?: Maybe<string>;
            card_image?: Maybe<string>;
            banner?: Maybe<string>;
            promotion_code?: Maybe<string>;
            payment_method?: Maybe<string>;
            ipp_plan?: Maybe<string>;
            bank_color?: Maybe<string>;
            bank_icon?: Maybe<string>;
            simple_action?: Maybe<string>;
            discount_amount?: Maybe<string>;
          }>
        >
      >;
    }>;
  }>;
};

export type IPaymentStatusQueryVariables = Exact<{
  incrementId: Scalars['String'];
  key: Scalars['String'];
  paymentMethod: IPaymentServiceKey;
}>;

export type IPaymentStatusQuery = {
  __typename?: 'Query';
  paymentStatus: {
    __typename?: 'PaymentStatusResponse';
    is_success: boolean;
    response_code?: Maybe<string>;
    description?: Maybe<string>;
    order_id?: Maybe<string>;
    amount?: Maybe<number>;
    currency?: Maybe<string>;
    key?: Maybe<string>;
  };
};

export type IPickupLocationsQueryVariables = Exact<{
  sku: Scalars['String'];
}>;

export type IPickupLocationsQuery = {
  __typename?: 'Query';
  pickupLocations?: Maybe<
    Array<
      Maybe<{
        __typename?: 'PickupStoreLocation';
        id: string;
        name?: Maybe<string>;
        storeCode?: Maybe<string>;
        isActive?: Maybe<boolean>;
        image?: Maybe<string>;
        allowPickAtStore?: Maybe<boolean>;
        isDisplayAsStoreInformation?: Maybe<boolean>;
        cutOffTime?: Maybe<string>;
        address?: Maybe<{
          __typename?: 'PickupStoreLocationAddress';
          streetNumber?: Maybe<string>;
          building?: Maybe<string>;
          soi?: Maybe<string>;
          street?: Maybe<string>;
          district?: Maybe<string>;
          districtId?: Maybe<number>;
          subDistrict?: Maybe<string>;
          subDistrictId?: Maybe<number>;
          region?: Maybe<string>;
          regionId?: Maybe<number>;
          postcode?: Maybe<string>;
          contactNumber?: Maybe<string>;
          countryCode?: Maybe<string>;
          city?: Maybe<string>;
          latitude?: Maybe<string>;
          longitude?: Maybe<string>;
        }>;
        openingHours?: Maybe<
          Array<Maybe<{ __typename?: 'PickupStoreLocationOpeningHour'; day?: Maybe<string>; openTime?: Maybe<string>; closeTime?: Maybe<string> }>>
        >;
        salableItems?: Maybe<Array<Maybe<{ __typename?: 'PickupStoreLocationSalableItem'; sku?: Maybe<string>; qty?: Maybe<number> }>>>;
        storePickup?: Maybe<{
          __typename?: 'PickupStoreLocationStorePickup';
          stockId?: Maybe<number>;
          allowIspu?: Maybe<boolean>;
          allowSts?: Maybe<boolean>;
        }>;
        additionalText?: Maybe<{
          __typename?: 'PickupStoreLocationAdditionalText';
          methodCode?: Maybe<string>;
          methodLabelCode?: Maybe<string>;
          timeValue?: Maybe<number>;
          timeUnit?: Maybe<string>;
          datetime?: Maybe<string>;
          totalAvailable?: Maybe<number>;
          totalOrdered?: Maybe<number>;
        }>;
      }>
    >
  >;
};

export type IPostcodeByLatLngQueryVariables = Exact<{
  lat: Scalars['String'];
  lng: Scalars['String'];
}>;

export type IPostcodeByLatLngQuery = { __typename?: 'Query'; postcodeByLatLng?: Maybe<{ __typename?: 'PostcodeResult'; postcode?: Maybe<string> }> };

export type IPricePerStoreQueryVariables = Exact<{
  input: IPricePerStoreInput;
}>;

export type IPricePerStoreQuery = {
  __typename?: 'Query';
  pricePerStore?: Maybe<{ __typename?: 'ProductStorePrice' } & IProductStorePriceFragmentFragment>;
};

export type IProductQueryVariables = Exact<{
  url?: Maybe<Scalars['String']>;
}>;

export type IProductQuery = {
  __typename?: 'Query';
  product?: Maybe<
    {
      __typename?: 'Product';
      online_salable?: Maybe<boolean>;
      offline_salable?: Maybe<boolean>;
      configurable_product_items?: Maybe<
        Array<Maybe<{ __typename?: 'Product'; online_salable?: Maybe<boolean>; offline_salable?: Maybe<boolean> } & IProductFragmentFragment>>
      >;
      product_links?: Maybe<
        Array<
          Maybe<{
            __typename?: 'ProductLink';
            sku?: Maybe<string>;
            link_type?: Maybe<IProductLinkType>;
            linked_product_sku?: Maybe<string>;
            linked_product_type?: Maybe<IProductType>;
            position?: Maybe<number>;
            product?: Maybe<{ __typename?: 'Product'; online_salable?: Maybe<boolean>; offline_salable?: Maybe<boolean> } & IProductFragmentFragment>;
          }>
        >
      >;
    } & IProductFragmentFragment
  >;
};

export type IProductByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type IProductByIdQuery = {
  __typename?: 'Query';
  productById?: Maybe<
    {
      __typename?: 'Product';
      online_salable?: Maybe<boolean>;
      offline_salable?: Maybe<boolean>;
      configurable_product_items?: Maybe<
        Array<Maybe<{ __typename?: 'Product'; online_salable?: Maybe<boolean>; offline_salable?: Maybe<boolean> } & IProductFragmentFragment>>
      >;
      product_links?: Maybe<
        Array<
          Maybe<{
            __typename?: 'ProductLink';
            sku?: Maybe<string>;
            link_type?: Maybe<IProductLinkType>;
            linked_product_sku?: Maybe<string>;
            linked_product_type?: Maybe<IProductType>;
            position?: Maybe<number>;
            product?: Maybe<{ __typename?: 'Product'; online_salable?: Maybe<boolean>; offline_salable?: Maybe<boolean> } & IProductFragmentFragment>;
          }>
        >
      >;
    } & IProductFragmentFragment
  >;
};

export type IProductBySkuQueryVariables = Exact<{
  sku: Scalars['String'];
}>;

export type IProductBySkuQuery = {
  __typename?: 'Query';
  productBySku?: Maybe<
    {
      __typename?: 'Product';
      configurable_product_items?: Maybe<Array<Maybe<{ __typename?: 'Product' } & IProductFragmentFragment>>>;
      product_links?: Maybe<
        Array<
          Maybe<{
            __typename?: 'ProductLink';
            sku?: Maybe<string>;
            link_type?: Maybe<IProductLinkType>;
            linked_product_sku?: Maybe<string>;
            linked_product_type?: Maybe<IProductType>;
            position?: Maybe<number>;
            product?: Maybe<{ __typename?: 'Product' } & IProductFragmentFragment>;
          }>
        >
      >;
    } & IProductFragmentFragment
  >;
};

export type IProductSearchQueryVariables = Exact<{
  filterGroups: Array<Maybe<IFilterGroups>> | Maybe<IFilterGroups>;
  page: Scalars['Int'];
  size: Scalars['Int'];
  sortOrders?: Maybe<Array<Maybe<ISortOrder>> | Maybe<ISortOrder>>;
}>;

export type IProductSearchQuery = {
  __typename?: 'Query';
  productSearch?: Maybe<{
    __typename?: 'ProductSearch';
    total_count?: Maybe<number>;
    sorting?: Maybe<Array<Maybe<{ __typename?: 'ProductsSorting'; code?: Maybe<string>; name?: Maybe<string> }>>>;
    filters?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ProductsFilter';
          name?: Maybe<string>;
          attribute_code?: Maybe<string>;
          position?: Maybe<number>;
          items?: Maybe<
            Array<
              Maybe<{
                __typename?: 'ProductsFilterItems';
                label?: Maybe<string>;
                value?: Maybe<string>;
                count?: Maybe<number>;
                custom_attributes?: Maybe<{
                  __typename?: 'ProductsFilterItemsAttributes';
                  parent_id?: Maybe<number>;
                  url_path?: Maybe<string>;
                  level?: Maybe<number>;
                  url_key?: Maybe<string>;
                }>;
              }>
            >
          >;
        }>
      >
    >;
    products?: Maybe<
      Array<
        Maybe<{
          __typename?: 'Product';
          id?: Maybe<string>;
          name?: Maybe<string>;
          visibility?: Maybe<number>;
          url_key?: Maybe<string>;
          sku?: Maybe<string>;
          status?: Maybe<number>;
          type_id?: Maybe<IProductType>;
          image?: Maybe<string>;
          small_image?: Maybe<string>;
          thumbnail?: Maybe<string>;
          short_description?: Maybe<string>;
          price?: Maybe<number>;
          special_price?: Maybe<number>;
          special_from_date?: Maybe<string>;
          special_to_date?: Maybe<string>;
          custom_attributes?: Maybe<any>;
          custom_attributes_option?: Maybe<any>;
          breadcrumbs?: Maybe<
            Array<Maybe<{ __typename?: 'Breadcrumbs'; category_id: string; level?: Maybe<number>; name?: Maybe<string>; url?: Maybe<string> }>>
          >;
          media_gallery_entries?: Maybe<
            Array<
              Maybe<{
                __typename?: 'MediaGalleryEntry';
                file?: Maybe<string>;
                id?: Maybe<number>;
                label?: Maybe<string>;
                media_type?: Maybe<string>;
                disabled?: Maybe<boolean>;
                extension_attributes?: Maybe<{
                  __typename?: 'MediaGalleryExtension';
                  video_content?: Maybe<{
                    __typename?: 'VideoContent';
                    media_type?: Maybe<string>;
                    video_provider?: Maybe<string>;
                    video_url?: Maybe<string>;
                    video_title?: Maybe<string>;
                    video_description?: Maybe<string>;
                    video_metadata?: Maybe<string>;
                  }>;
                }>;
              }>
            >
          >;
          extension_attributes?: Maybe<{
            __typename?: 'ProductsExtensionAttributes';
            t1c_redeemable_points?: Maybe<Array<Maybe<string>>>;
            salable?: Maybe<boolean>;
            ispu_salable?: Maybe<boolean>;
            configurable_product_links?: Maybe<Array<Maybe<string>>>;
            stock_item?: Maybe<{
              __typename?: 'StockItem';
              qty?: Maybe<number>;
              is_in_stock?: Maybe<boolean>;
              min_sale_qty?: Maybe<number>;
              max_sale_qty?: Maybe<number>;
            }>;
            installment_plans?: Maybe<Array<Maybe<{ __typename?: 'InstallmentPlan' } & IInstallmentPlansFragmentInstallmentPlanFragment>>>;
            overall_rating?: Maybe<{
              __typename?: 'ProductsExtensionAttributesOverallRating';
              rating?: Maybe<number>;
              total_vote?: Maybe<number>;
              five_star?: Maybe<number>;
              four_star?: Maybe<number>;
              three_star?: Maybe<number>;
              two_star?: Maybe<number>;
              one_star?: Maybe<number>;
              rounded_rating?: Maybe<number>;
            }>;
            category_paths?: Maybe<
              Array<
                Maybe<{
                  __typename?: 'CategoryPath';
                  category_id?: Maybe<number>;
                  name?: Maybe<string>;
                  level?: Maybe<number>;
                  parent_id?: Maybe<number>;
                }>
              >
            >;
            overlays?: Maybe<
              Array<
                Maybe<{
                  __typename?: 'ProductsExtensionAttributesOverlay';
                  overlay_image?: Maybe<string>;
                  overlay_status?: Maybe<string>;
                  mobile_overlay_status?: Maybe<string>;
                  overlay_start_date?: Maybe<string>;
                  overlay_end_date?: Maybe<string>;
                  overlay_position?: Maybe<string>;
                }>
              >
            >;
            flash_sale_price?: Maybe<
              Array<Maybe<{ __typename?: 'ProductsExtensionAttributesFlashSalePrice'; start_date: string; end_date: string; special_price: string }>>
            >;
          }>;
        }>
      >
    >;
  }>;
};

export type IPromotionQueryVariables = Exact<{
  filter?: Maybe<IFiltersQuery>;
}>;

export type IPromotionQuery = {
  __typename?: 'Query';
  promotionSuggestion?: Maybe<
    Array<
      Maybe<{
        __typename?: 'PromotionSuggestion';
        sku?: Maybe<string>;
        extension_attributes?: Maybe<{
          __typename?: 'PromotionSuggestionExtensionAttribute';
          credit_card_promotions?: Maybe<
            Array<
              Maybe<{
                __typename?: 'CreditCardPromotion';
                promotion_id?: Maybe<number>;
                bank_icon?: Maybe<string>;
                bank_color?: Maybe<string>;
                simple_action?: Maybe<string>;
                is_active?: Maybe<boolean>;
                discount_amount?: Maybe<number>;
              }>
            >
          >;
          t1c?: Maybe<
            Array<
              Maybe<{
                __typename?: 'T1CPromotion';
                redemption_rate?: Maybe<number>;
                redeemable_points?: Maybe<Array<Maybe<number>>>;
                redeemable_amounts?: Maybe<Array<Maybe<number>>>;
                is_active?: Maybe<boolean>;
              }>
            >
          >;
          bundles?: Maybe<
            Array<
              Maybe<{
                __typename?: 'BundlePromotion';
                discount_amount?: Maybe<number>;
                discount_qty?: Maybe<number>;
                discount_step?: Maybe<number>;
                is_active?: Maybe<boolean>;
                total_price?: Maybe<number>;
                total_discount_amount?: Maybe<number>;
                total_price_with_discount?: Maybe<number>;
                products?: Maybe<Array<Maybe<{ __typename?: 'BundleSkuList'; sku?: Maybe<string> }>>>;
              }>
            >
          >;
          free_items?: Maybe<
            Array<
              Maybe<{
                __typename?: 'FreeItemPromotion';
                is_active?: Maybe<boolean>;
                freebies?: Maybe<Array<Maybe<{ __typename?: 'FreeItemProduct'; sku?: Maybe<string>; qty?: Maybe<number> }>>>;
              }>
            >
          >;
          all_applicable_rules?: Maybe<
            Array<
              Maybe<{
                __typename?: 'applicableRulesPromotion';
                rule_id: string;
                name?: Maybe<string>;
                description?: Maybe<string>;
                extension_attributes?: Maybe<any>;
              }>
            >
          >;
          tier_price?: Maybe<
            Array<
              Maybe<{
                __typename?: 'TierPricePromotion';
                id: string;
                name: string;
                amount: number;
                type: ITierPricePromotionType;
                extension_attributes: {
                  __typename?: 'TierPricePromotionExtension';
                  qty_from?: Maybe<number>;
                  qty_to?: Maybe<number>;
                  applicable_store_ids?: Maybe<Array<Maybe<number>>>;
                };
              }>
            >
          >;
        }>;
      }>
    >
  >;
};

export type IProvincesQueryVariables = Exact<{
  storeCode?: Maybe<Scalars['String']>;
}>;

export type IProvincesQuery = {
  __typename?: 'Query';
  regions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'Regions';
        region_id?: Maybe<string>;
        country_id?: Maybe<string>;
        code?: Maybe<string>;
        default_name?: Maybe<string>;
        sort_order?: Maybe<string>;
        name?: Maybe<string>;
      }>
    >
  >;
};

export type IRatingOptionsQueryVariables = Exact<{ [key: string]: never }>;

export type IRatingOptionsQuery = {
  __typename?: 'Query';
  ratingOptions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'RatingOptions';
        option_id?: Maybe<number>;
        rating_id?: Maybe<number>;
        code?: Maybe<number>;
        value?: Maybe<number>;
        position?: Maybe<number>;
        rating_code?: Maybe<string>;
      }>
    >
  >;
};

export type IRegionsQueryVariables = Exact<{
  storeCode?: Maybe<Scalars['String']>;
}>;

export type IRegionsQuery = {
  __typename?: 'Query';
  regions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'Regions';
        region_id?: Maybe<string>;
        country_id?: Maybe<string>;
        code?: Maybe<string>;
        default_name?: Maybe<string>;
        name?: Maybe<string>;
        sort_order?: Maybe<string>;
      }>
    >
  >;
};

export type IRegionsByPostcodeQueryVariables = Exact<{
  postcode?: Maybe<Scalars['String']>;
}>;

export type IRegionsByPostcodeQuery = {
  __typename?: 'Query';
  regionByPostCode?: Maybe<{
    __typename?: 'RegionByPostCode';
    region_id?: Maybe<string>;
    code?: Maybe<string>;
    country_id?: Maybe<string>;
    name?: Maybe<string>;
    district?: Maybe<
      Array<
        Maybe<{
          __typename?: 'District';
          district_id?: Maybe<string>;
          country_id?: Maybe<string>;
          region_id?: Maybe<string>;
          region_code?: Maybe<string>;
          code?: Maybe<string>;
          name?: Maybe<string>;
          subdistrict?: Maybe<
            Array<
              Maybe<{
                __typename?: 'SubDistrict';
                subdistrict_id?: Maybe<string>;
                code?: Maybe<string>;
                country_id?: Maybe<string>;
                district_id?: Maybe<string>;
                district_code?: Maybe<string>;
                name?: Maybe<string>;
              }>
            >
          >;
        }>
      >
    >;
  }>;
};

export type IRetailerByIdQueryVariables = Exact<{
  input: IGetRetailerByIdInput;
}>;

export type IRetailerByIdQuery = { __typename?: 'Query'; retailerById?: Maybe<{ __typename?: 'Store' } & IStoreFragmentStoreFragment> };

export type IRetailerByPostcodeQueryVariables = Exact<{
  input: IGetRetailerByPostcodeInput;
}>;

export type IRetailerByPostcodeQuery = { __typename?: 'Query'; retailerByPostcode?: Maybe<{ __typename?: 'Store' } & IStoreFragmentStoreFragment> };

export type ISearchTermsQueryVariables = Exact<{
  input?: Maybe<ISearchTermsInput>;
}>;

export type ISearchTermsQuery = {
  __typename?: 'Query';
  searchSuggestion?: Maybe<{
    __typename?: 'SearchSuggestionLists';
    products?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ProductItem';
          id?: Maybe<string>;
          title?: Maybe<string>;
          image?: Maybe<string>;
          url?: Maybe<string>;
          brand_name?: Maybe<string>;
          price?: Maybe<number>;
          count?: Maybe<number>;
          sku?: Maybe<string>;
          final_price?: Maybe<number>;
          original_price?: Maybe<number>;
          custom_attributes?: Maybe<any>;
        }>
      >
    >;
    terms?: Maybe<Array<Maybe<{ __typename?: 'TermItem'; text?: Maybe<string>; score?: Maybe<number>; frequency?: Maybe<number> }>>>;
    categories?: Maybe<
      Array<
        Maybe<{
          __typename?: 'CategoryItem';
          breadcrumb?: Maybe<Array<Maybe<string>>>;
          count?: Maybe<number>;
          id?: Maybe<number>;
          level?: Maybe<number>;
          title?: Maybe<string>;
          url?: Maybe<string>;
        }>
      >
    >;
  }>;
};

export type IShipFromStoreAvailableTimeQueryVariables = Exact<{ [key: string]: never }>;

export type IShipFromStoreAvailableTimeQuery = {
  __typename?: 'Query';
  getShipFromStoreAvailableTime?: Maybe<{ __typename?: 'ShipFromStoreAvailableTime'; available_from?: Maybe<string>; available_to?: Maybe<string> }>;
};

export type IShippingSlotInfoHdlQueryVariables = Exact<{
  cartId: Scalars['String'];
  address: IShippingSlotHdlInput;
}>;

export type IShippingSlotInfoHdlQuery = {
  __typename?: 'Query';
  shippingSlotInfoHdl?: Maybe<
    Array<
      Maybe<{
        __typename?: 'SlotInfo';
        id?: Maybe<string>;
        date_time_from: string;
        date_time_to: string;
        extension_attributes?: Maybe<{ __typename?: 'SlotInfoExtensionAttributes'; day_slot_id: number }>;
      }>
    >
  >;
};

export type IStockItemQueryVariables = Exact<{
  sku: Scalars['String'];
}>;

export type IStockItemQuery = {
  __typename?: 'Query';
  stockItem?: Maybe<{
    __typename?: 'StockItem';
    qty?: Maybe<number>;
    is_in_stock?: Maybe<boolean>;
    use_config_min_qty?: Maybe<boolean>;
    min_qty?: Maybe<number>;
    use_config_min_sale_qty?: Maybe<boolean>;
    min_sale_qty?: Maybe<number>;
    use_config_max_sale_qty?: Maybe<boolean>;
    max_sale_qty?: Maybe<number>;
    item_id?: Maybe<number>;
    product_id?: Maybe<number>;
    stock_id?: Maybe<number>;
    is_qty_decimal?: Maybe<boolean>;
    backorders?: Maybe<number>;
    use_config_backorders?: Maybe<boolean>;
    low_stock_date?: Maybe<string>;
    notify_stock_qty?: Maybe<number>;
    use_config_notify_stock_qty?: Maybe<boolean>;
    manage_stock?: Maybe<boolean>;
    use_config_manage_stock?: Maybe<boolean>;
    stock_status_changed_auto?: Maybe<number>;
    qty_increments?: Maybe<number>;
    use_config_qty_increments?: Maybe<boolean>;
    enable_qty_increments?: Maybe<boolean>;
    use_config_enable_qty_increments?: Maybe<boolean>;
    is_decimal_divided?: Maybe<boolean>;
    show_default_notification_message?: Maybe<boolean>;
  }>;
};

export type IStoreConfigsQueryVariables = Exact<{ [key: string]: never }>;

export type IStoreConfigsQuery = {
  __typename?: 'Query';
  storeConfigs?: Maybe<Array<Maybe<{ __typename?: 'StoreConfig' } & IStoreConfigFragmentFragment>>>;
};

export type IStorePickupLocationsAvailableQueryVariables = Exact<{
  sku: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  filterKeyword?: Maybe<Scalars['String']>;
  filterLocation?: Maybe<IPickupStoreLocationFilterLatLng>;
}>;

export type IStorePickupLocationsAvailableQuery = {
  __typename?: 'Query';
  storePickupLocationsAvailable?: Maybe<
    Array<
      Maybe<{
        __typename?: 'StorePickupLocationsAvailable';
        id: string;
        name?: Maybe<string>;
        storeCode?: Maybe<string>;
        isActive?: Maybe<boolean>;
        image?: Maybe<string>;
        allowPickAtStore?: Maybe<boolean>;
        isDisplayAsStoreInformation?: Maybe<boolean>;
        stockStatusCode?: Maybe<string>;
        stockStatusLabel?: Maybe<string>;
        address?: Maybe<{ __typename?: 'PickupStoreLocationAddress' } & IPickUpLocationAddressFragmentFragment>;
        openingHours?: Maybe<
          Array<Maybe<{ __typename?: 'PickupStoreLocationOpeningHour'; day?: Maybe<string>; openTime?: Maybe<string>; closeTime?: Maybe<string> }>>
        >;
        storePickup?: Maybe<{
          __typename?: 'PickupStoreLocationStorePickup';
          stockId?: Maybe<number>;
          allowIspu?: Maybe<boolean>;
          allowSts?: Maybe<boolean>;
        }>;
        distance?: Maybe<{ __typename?: 'PickupStoresLocationDistance'; text?: Maybe<string>; value?: Maybe<number> }>;
      }>
    >
  >;
};

export type IStoreWithStockLevelQueryVariables = Exact<{
  sku: Scalars['String'];
}>;

export type IStoreWithStockLevelQuery = {
  __typename?: 'Query';
  storeWithStockLevel: Array<
    Maybe<{ __typename: 'StoreWithStockLevel'; stock_level: IStockLevelStatus } & IStoreFragmentStoreWithStockLevelFragment>
  >;
};

export type IStoresQueryVariables = Exact<{ [key: string]: never }>;

export type IStoresQuery = { __typename?: 'Query'; getStores?: Maybe<Array<Maybe<{ __typename: 'Store' } & IStoreFragmentStoreFragment>>> };

export type ISubDistrictsByProvinceIdQueryVariables = Exact<{
  storeCode?: Maybe<Scalars['String']>;
  regionId?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['String']>;
}>;

export type ISubDistrictsByProvinceIdQuery = {
  __typename?: 'Query';
  subDistricts?: Maybe<
    Array<
      Maybe<{
        __typename?: 'SubDistrict';
        subdistrict_id?: Maybe<string>;
        country_id?: Maybe<string>;
        district_id?: Maybe<string>;
        district_code?: Maybe<string>;
        zip_code?: Maybe<string>;
        code?: Maybe<string>;
        default_name?: Maybe<string>;
        name?: Maybe<string>;
      }>
    >
  >;
};

export type ITrendingSuggestionsQueryVariables = Exact<{
  input: Scalars['String'];
}>;

export type ITrendingSuggestionsQuery = {
  __typename?: 'Query';
  searchTrending?: Maybe<Array<Maybe<{ __typename?: 'TermItem'; text?: Maybe<string>; score?: Maybe<number>; frequency?: Maybe<number> }>>>;
};

export type ITwoHrsPickUpStoresQueryVariables = Exact<{
  sku?: Maybe<Scalars['String']>;
}>;

export type ITwoHrsPickUpStoresQuery = {
  __typename?: 'Query';
  get2hrsPickUpStores?: Maybe<
    Array<
      Maybe<{
        __typename?: 'PickUpStore';
        source_item?: Maybe<{
          __typename?: 'PickUpStoreSourceItem';
          sku?: Maybe<string>;
          quantity?: Maybe<number>;
          source_code?: Maybe<string>;
          status?: Maybe<number>;
        }>;
        store?: Maybe<{
          __typename?: 'Store';
          id?: Maybe<string>;
          name?: Maybe<string>;
          is_active?: Maybe<boolean>;
          seller_code?: Maybe<string>;
          attribute_set_name?: Maybe<string>;
          custom_attributes?: Maybe<{
            __typename?: 'StoreCustomAttribute';
            url_key?: Maybe<string>;
            show_contact_form?: Maybe<string>;
            inventory_source?: Maybe<string>;
            contact_phone?: Maybe<string>;
            contact_fax?: Maybe<string>;
          }>;
          extension_attributes?: Maybe<{
            __typename?: 'StoreExtensionAttribute';
            special_opening_hours?: Maybe<Array<Maybe<string>>>;
            ispu_promise_delivery?: Maybe<string>;
            stock_low_indicator_threshold?: Maybe<number>;
            address?: Maybe<{
              __typename?: 'StoreAddress';
              id?: Maybe<number>;
              retailer_id?: Maybe<number>;
              region_id?: Maybe<number>;
              region?: Maybe<string>;
              country_id?: Maybe<string>;
              street?: Maybe<Array<Maybe<string>>>;
              postcode?: Maybe<string>;
              city?: Maybe<string>;
              coordinates?: Maybe<{ __typename?: 'Coordinate'; latitude?: Maybe<number>; longitude?: Maybe<number> }>;
            }>;
            opening_hours?: Maybe<
              Array<Maybe<Array<Maybe<{ __typename?: 'OpenHourExtension'; start_time?: Maybe<string>; end_time?: Maybe<string> }>>>>
            >;
          }>;
        }>;
      }>
    >
  >;
};

export type IUrlRedirectQueryVariables = Exact<{
  url: Scalars['String'];
}>;

export type IUrlRedirectQuery = {
  __typename?: 'Query';
  urlRedirect?: Maybe<{ __typename?: 'UrlRedirect'; target_path?: Maybe<string>; redirect_type?: Maybe<number> }>;
};

export type IUrlRewriteQueryVariables = Exact<{
  url: Scalars['String'];
}>;

export type IUrlRewriteQuery = {
  __typename?: 'Query';
  urlRewrite?: Maybe<{
    __typename?: 'UrlRewrite';
    description?: Maybe<string>;
    entity_id?: Maybe<number>;
    entity_type?: Maybe<string>;
    request_path?: Maybe<string>;
    target_path?: Maybe<string>;
    redirect_type?: Maybe<number>;
    store_id?: Maybe<number>;
    metadata?: Maybe<
      Array<
        Maybe<{
          __typename?: 'Metadata';
          row_id?: Maybe<string>;
          entity_id?: Maybe<string>;
          attribute_set_id?: Maybe<string>;
          parent_id?: Maybe<string>;
          path?: Maybe<string>;
          position?: Maybe<string>;
          level?: Maybe<string>;
          children_count?: Maybe<string>;
          url_path?: Maybe<string>;
          product_count?: Maybe<string>;
          is_anchor?: Maybe<string>;
        }>
      >
    >;
  }>;
};

export type IV2DeliveryOptionByPostcodeQueryVariables = Exact<{
  input: IV2DeliveryOptionByPostcodeInput;
}>;

export type IV2DeliveryOptionByPostcodeQuery = {
  __typename?: 'Query';
  v2DeliveryOptionByPostcode: Array<{
    __typename?: 'V2DeliveryOptionByPostcode';
    title: string;
    methods: Array<{
      __typename?: 'V2DeliveryOptionByPostcodeDeliveryMethod';
      method?: Maybe<string>;
      label?: Maybe<string>;
      leadTimes?: Maybe<string>;
      freeLabel?: Maybe<string>;
      sortOrder?: Maybe<string>;
    }>;
  }>;
};

export type IV2DeliveryPackageOptionsQueryVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  input: IV2DeliveryPackageOptionInput;
}>;

export type IV2DeliveryPackageOptionsQuery = {
  __typename?: 'Query';
  v2DeliveryPackageOptions?: Maybe<Array<Maybe<{ __typename?: 'V2PackageOption' } & IPackageOptionFragmentFragment>>>;
};

export type IV2PackageOptionsQueryVariables = Exact<{
  cartId?: Maybe<Scalars['String']>;
  storeId: Scalars['String'];
}>;

export type IV2PackageOptionsQuery = {
  __typename?: 'Query';
  v2PackageOptions?: Maybe<Array<Maybe<{ __typename?: 'V2PackageOption' } & IPackageOptionFragmentFragment>>>;
};

export type IV2SuggestSearchQueryVariables = Exact<{
  input?: Maybe<IV2SuggestSearchInput>;
}>;

export type IV2SuggestSearchQuery = {
  __typename?: 'Query';
  v2SuggestSearch: {
    __typename?: 'V2SuggestSearchResult';
    suggestionTerms: Array<string>;
    products: Array<
      | {
          __typename?: 'V2ConfigurableProduct';
          id: string;
          type: IV2ProductType;
          name: string;
          sku: string;
          urlKey: string;
          overlayImageUrl?: Maybe<string>;
          thumbnailUrl?: Maybe<string>;
          brand?: Maybe<{ __typename?: 'V2Brand'; id: string; name: string; urlKey: string }>;
          priceSummary: {
            __typename?: 'V2PriceSummary';
            original: number;
            final: number;
            discount?: Maybe<{
              __typename?: 'V2Discount';
              amount: number;
              percentage: number;
              effectiveDateRange?: Maybe<{ __typename?: 'V2DateRange'; from?: Maybe<any>; to?: Maybe<any> }>;
            }>;
          };
        }
      | {
          __typename?: 'V2SimpleProduct';
          id: string;
          type: IV2ProductType;
          name: string;
          sku: string;
          urlKey: string;
          overlayImageUrl?: Maybe<string>;
          thumbnailUrl?: Maybe<string>;
          brand?: Maybe<{ __typename?: 'V2Brand'; id: string; name: string; urlKey: string }>;
          priceSummary: {
            __typename?: 'V2PriceSummary';
            original: number;
            final: number;
            discount?: Maybe<{
              __typename?: 'V2Discount';
              amount: number;
              percentage: number;
              effectiveDateRange?: Maybe<{ __typename?: 'V2DateRange'; from?: Maybe<any>; to?: Maybe<any> }>;
            }>;
          };
        }
    >;
    categories: Array<{
      __typename?: 'V2SuggestSearchCategory';
      id?: Maybe<string>;
      name?: Maybe<string>;
      parentId?: Maybe<string>;
      urlPath?: Maybe<string>;
      isGtm?: Maybe<boolean>;
    }>;
  };
};

export type IV2TrendingSearchQueryVariables = Exact<{
  size?: Maybe<Scalars['Int']>;
}>;

export type IV2TrendingSearchQuery = { __typename?: 'Query'; v2TrendSearch: { __typename?: 'V2TrendSearchResult'; trendingTerms: Array<string> } };

export type IVipListQueryVariables = Exact<{ [key: string]: never }>;

export type IVipListQuery = {
  __typename?: 'Query';
  vipList?: Maybe<{ __typename?: 'VipListResponse'; status?: Maybe<boolean>; urls?: Maybe<Array<Maybe<string>>> }>;
};

export type IVipWithTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;

export type IVipWithTokenQuery = {
  __typename?: 'Query';
  vipWithToken?: Maybe<{
    __typename?: 'VipValidateResponse';
    status?: Maybe<boolean>;
    url?: Maybe<string>;
    email?: Maybe<string>;
    phone?: Maybe<string>;
    name?: Maybe<string>;
    ids?: Maybe<string>;
    need_assistance?: Maybe<number>;
    token?: Maybe<string>;
    t1No?: Maybe<string>;
  }>;
};

export type IWishListQueryVariables = Exact<{
  filter: IFiltersQuery;
  withProduct?: Maybe<Scalars['Boolean']>;
}>;

export type IWishListQuery = {
  __typename?: 'Query';
  wishlists?: Maybe<{
    __typename?: 'Wishlists';
    items?: Maybe<
      Array<
        Maybe<{
          __typename?: 'Wishlist';
          wishlist_id: number;
          items?: Maybe<
            Array<
              Maybe<{
                __typename?: 'WishlistItem';
                product_id?: Maybe<number>;
                wishlist_item_id: number;
                added_at?: Maybe<string>;
                custom_attributes?: Maybe<
                  Array<Maybe<{ __typename?: 'CustomAttributes'; attribute_code?: Maybe<string>; name?: Maybe<string>; value?: Maybe<string> }>>
                >;
                product?: Maybe<
                  {
                    __typename?: 'Product';
                    configurable_product_items?: Maybe<Array<Maybe<{ __typename?: 'Product' } & IProductFragmentFragment>>>;
                  } & IProductFragmentFragment
                >;
              }>
            >
          >;
        }>
      >
    >;
  }>;
};

export type IWithStoreConfigQueryVariables = Exact<{ [key: string]: never }>;

export type IWithStoreConfigQuery = {
  __typename?: 'Query';
  storeConfigs?: Maybe<
    Array<
      Maybe<{
        __typename?: 'StoreConfig';
        id?: Maybe<string>;
        code?: Maybe<string>;
        website_id?: Maybe<number>;
        locale?: Maybe<string>;
        base_url?: Maybe<string>;
        base_media_url?: Maybe<string>;
        extension_attributes?: Maybe<{ __typename?: 'ConfigExtensionAttribute'; google_tag_manager_key?: Maybe<string> }>;
      }>
    >
  >;
};
