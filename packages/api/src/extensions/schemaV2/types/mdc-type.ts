export interface MDCRegion {
  region_id: string;
  country_id: string;
  code: string;
  default_name: string;
  sort_order: string;
  name: string;
}

export interface MDCReview {
  review_id: number;
  nickname: string;
  rating_items: {
    rating_id: number;
    rating: number;
  }[];
  created_at: string;
  title: string;
  detail: string;
  is_validate: boolean;
  extension_attributes: {
    email: string;
    images: string[];
  };
}

export interface MDCSuggestPromotion {
  rule_id: number;
  rule_is_active: boolean;
  rule_sort_order: number;
  rule_name: string;
  action_type: string;
  label: string;
  coupon_code?: any;
  start_datetime: string;
  end_datetime?: any;
  promotion_name: string;
  full_condition: string;
  short_description: string;
  display_priority: number;
}

interface ConfigurableProductOptionValuExtensionAttributes {
  label: string;
  frontend_value: string;
  frontend_type: string;
  products: number[];
}

interface ConfigurableProductOptionValue {
  value_index: number;
  extension_attributes: ConfigurableProductOptionValuExtensionAttributes;
}

interface ConfigurableProductOption {
  id: number;
  attribute_id: string;
  label: string;
  position: number;
  values: ConfigurableProductOptionValue[];
  product_id: number;
}

export interface CustomAttributesOption {
  attribute_code: string;
  value: any;
}

interface Breadcrumb {
  category_id: number;
  name: string;
  level: number;
  url: string;
}

interface CategoryLink {
  position: number;
  category_id: string;
}

interface StockItem {
  item_id: number;
  product_id: number;
  stock_id: number;
  qty: number;
  is_in_stock: boolean;
  is_qty_decimal: boolean;
  show_default_notification_message: boolean;
  use_config_min_qty: boolean;
  min_qty: number;
  use_config_min_sale_qty: number;
  min_sale_qty: number;
  use_config_max_sale_qty: boolean;
  max_sale_qty: number;
  use_config_backorders: boolean;
  backorders: number;
  use_config_notify_stock_qty: boolean;
  notify_stock_qty: number;
  use_config_qty_increments: boolean;
  qty_increments: number;
  use_config_enable_qty_inc: boolean;
  enable_qty_increments: boolean;
  use_config_manage_stock: boolean;
  manage_stock: boolean;
  low_stock_date?: any;
  is_decimal_divided: boolean;
  stock_status_changed_auto: number;
}

interface Bank {
  bank_id: string;
  name: string;
  bank_image: string;
  icon: string;
  color: string;
  active: string;
  create: string;
  update: string;
}

interface InstallmentPlan {
  installmentplan_id: string;
  name: string;
  bank_id: string;
  bank: Bank;
  currency: string;
  period: string;
  merchant_rate: string;
  customer_rate: string;
  min_amount: string;
  max_amount: string;
  valid_from: string;
  valid_until: string;
  interest_type: string;
  active: string;
  create: string;
  update: string;
}

interface OverallRating {
  rating_id?: any;
  rating?: any;
  category?: any;
  option_id?: any;
  total_vote: number;
  five_star: number;
  four_star: number;
  three_star: number;
  two_star: number;
  one_star: number;
}

interface SpecificationAttribute {
  attribute_code: string;
  label: string;
}

interface Content {
  brand_id: number;
  store_id: number;
  meta_title: string;
  meta_description: string;
  description: string;
}

interface BrandAdditionalProduct {
  product_id: number;
  position: number;
}

interface ExtensionAttributes2 {
  parent_category: number;
  position: number;
  is_official: boolean;
  product_collections: any[];
  product_count: number;
  product_name_special: boolean;
  hide_product_original_price: boolean;
  hide_t1c_redeemable_amount: boolean;
  allow_product_review: boolean;
  banners: any[];
}

interface Brand {
  brand_id: number;
  attribute_id: number;
  attribute_code: string;
  option_id: number;
  name: string;
  website_ids: number[];
  url_key: string;
  is_featured: boolean;
  content: Content[];
  meta_title: string;
  meta_description: string;
  description: string;
  brand_additional_products: BrandAdditionalProduct[];
  extension_attributes: ExtensionAttributes2;
}

interface SizeMap {
  type: string;
  size: string;
}

interface CategoryPath {
  category_id: number;
  name: string;
  level: number;
  parent_id: number;
}

interface ExtensionAttributes {
  website_ids: number[];
  category_links: CategoryLink[];
  stock_item: StockItem;
  installment_plans: InstallmentPlan[];
  overall_rating: OverallRating;
  reviews: MDCReview[];
  specification_attributes: SpecificationAttribute[];
  brand: Brand;
  size_map: any[];
  size_maps: SizeMap[];
  category_paths: CategoryPath[];
  t1c_redeemable_points: number[];
  t1c_earn_points_estimate: number[];
  overlay_image: string;
  overlay_status: string;
  overlay_mobile_status: string;
  overlay_start_date: string;
  overlay_end_date: string;
  configurable_product_options?: ConfigurableProductOption[];
  configurable_product_links?: number[];
  suggest_promotions?: MDCSuggestPromotion[];
}

export interface MDCProductLink {
  sku: string;
  link_type: string;
  linked_product_sku: string;
  linked_product_type: string;
  position: number;
}

interface VideoContent {
  media_type: string;
  video_provider: string;
  video_url: string;
  video_title: string;
  video_description: string;
  video_metadata: string;
}

interface MediaGalleryEntryExtensionAttributes {
  video_content: VideoContent;
}

interface MediaGalleryEntry {
  id: number;
  media_type: string;
  label?: any;
  position: number;
  disabled: boolean;
  types: string[];
  file: string;
  extension_attributes: MediaGalleryEntryExtensionAttributes;
}

export interface MDCCustomAttribute {
  attribute_code: string;
  value: any;
  label: string;
  name: string;
}

export interface MDCProduct {
  custom_attributes_option: CustomAttributesOption[];
  breadcrumbs: Breadcrumb[];
  id: number;
  sku: string;
  name: string;
  attribute_set_id: number;
  price: number;
  status: number;
  visibility: number;
  type_id: string;
  created_at: string;
  updated_at: string;
  extension_attributes: ExtensionAttributes;
  product_links: MDCProductLink[];
  options: any[];
  media_gallery_entries: MediaGalleryEntry[];
  tier_prices: any[];
  custom_attributes: MDCCustomAttribute[];
}

export interface MDCGiftMessage {
  gift_message_id: number;
  customer_id: number;
  sender: null;
  recipient: null;
  message?: string;
}

export interface MDCTotalSegmentsThe1 {
  quote_id: string;
  t1c_card_number: string;
  t1c_customer_id: string;
  t1c_points: string;
  t1c_points_balance: string;
  discount_amount: string;
  conversion_rate: string;
  formatted_discount_amount: string;
}
