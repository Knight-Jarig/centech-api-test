export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CSAggregation = {
  __typename?: 'Aggregation';
  field?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  buckets?: Maybe<Array<Maybe<CSBucket>>>;
  position?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
};

export type CSBank = {
  __typename?: 'Bank';
  color?: Maybe<Scalars['String']>;
  bank_id?: Maybe<Scalars['String']>;
  bank_image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['String']>;
  create?: Maybe<Scalars['String']>;
  update?: Maybe<Scalars['String']>;
};

export type CSBrand = {
  __typename?: 'Brand';
  brand_id?: Maybe<Scalars['Int']>;
  attribute_id?: Maybe<Scalars['Int']>;
  attribute_code?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  website_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  url_key?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  is_featured?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Array<Maybe<CSBrandContent>>>;
  meta_title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  brand_additional_products?: Maybe<Array<Maybe<CSBrandAdditionalProduct>>>;
  extension_attributes?: Maybe<CSBrandDetailExtensionAttributess>;
};

export type CSBrandAdditionalProduct = {
  __typename?: 'BrandAdditionalProduct';
  product_id?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type CSBrandById = {
  __typename?: 'BrandById';
  brand?: Maybe<CSBrand>;
};

export type CSBrandContent = {
  __typename?: 'BrandContent';
  only_central?: Maybe<Scalars['Int']>;
  brand_id?: Maybe<Scalars['Int']>;
  store_id?: Maybe<Scalars['Int']>;
  meta_title?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CSBrandDetailExtensionAttributess = {
  __typename?: 'BrandDetailExtensionAttributess';
  parent_category?: Maybe<Scalars['Int']>;
  menu_css?: Maybe<Scalars['String']>;
  content_css?: Maybe<Scalars['String']>;
  brand_image_url?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  product_collections?: Maybe<Array<Maybe<Scalars['String']>>>;
  product_count?: Maybe<Scalars['Int']>;
  product_name_special?: Maybe<Scalars['Boolean']>;
  hide_product_original_price?: Maybe<Scalars['Boolean']>;
  hide_t1c_redeemable_amount?: Maybe<Scalars['Boolean']>;
  allow_product_review?: Maybe<Scalars['Boolean']>;
};

export type CSBrands = {
  __typename?: 'Brands';
  brands?: Maybe<Array<Maybe<CSBrand>>>;
};

export type CSBreadcrumb = {
  __typename?: 'Breadcrumb';
  category_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type CSBucket = {
  __typename?: 'Bucket';
  key?: Maybe<Scalars['String']>;
  doc_count?: Maybe<Scalars['Int']>;
};

export type CSCategories = {
  __typename?: 'Categories';
  categories?: Maybe<Array<Maybe<CSCategoryFull>>>;
};

export type CSCategory = {
  __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
  is_gtm?: Maybe<Scalars['Boolean']>;
};

export type CSCategoryAggregation = {
  __typename?: 'CategoryAggregation';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
  is_gtm?: Maybe<Scalars['Boolean']>;
  available_sort_by?: Maybe<Scalars['String']>;
  children?: Maybe<Scalars['String']>;
  children_count?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  include_in_menu?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  mega_cms_banner?: Maybe<Scalars['String']>;
  mega_cms_brand?: Maybe<Scalars['String']>;
  mega_cms_menu?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  product_count?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  virtual_category_root?: Maybe<Scalars['String']>;
  doc_count?: Maybe<Scalars['Int']>;
};

export type CSCategoryFull = {
  __typename?: 'CategoryFull';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
  is_gtm?: Maybe<Scalars['Boolean']>;
  available_sort_by?: Maybe<Scalars['String']>;
  children?: Maybe<Scalars['String']>;
  children_count?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  include_in_menu?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  mega_cms_banner?: Maybe<Scalars['String']>;
  mega_cms_brand?: Maybe<Scalars['String']>;
  mega_cms_menu?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  product_count?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  virtual_category_root?: Maybe<Scalars['String']>;
};

export type CSCategoryPath = {
  __typename?: 'CategoryPath';
  category_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
};

export type CSCommonFilter = {
  field?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
};

export type CSConfigurableProduct = {
  __typename?: 'ConfigurableProduct';
  id?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  breadcrumbs?: Maybe<Array<Maybe<CSBreadcrumb>>>;
  categories?: Maybe<Array<Maybe<CSCategory>>>;
  status?: Maybe<Scalars['Int']>;
  visibility?: Maybe<Scalars['String']>;
  type_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  configurable_product_links?: Maybe<Array<Maybe<Scalars['String']>>>;
  brand_id?: Maybe<Scalars['String']>;
  brand_name?: Maybe<Scalars['String']>;
  brand_url?: Maybe<Scalars['String']>;
  color_group_name?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  special_price?: Maybe<Scalars['Float']>;
  special_from_date?: Maybe<Scalars['String']>;
  special_to_date?: Maybe<Scalars['String']>;
  is_in_stock?: Maybe<Scalars['Boolean']>;
  new_tag?: Maybe<Scalars['String']>;
  only_at_tag?: Maybe<Scalars['String']>;
  promo_tag?: Maybe<Scalars['String']>;
  recommended?: Maybe<Scalars['String']>;
  flash_deal?: Maybe<Scalars['String']>;
  best_sellers?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  preorder_shipping_date?: Maybe<Scalars['String']>;
  max_sale_qty?: Maybe<Scalars['Int']>;
  min_sale_qty?: Maybe<Scalars['Int']>;
  online_exclusive_tag?: Maybe<Scalars['String']>;
  marketplace_product_type_option?: Maybe<Scalars['String']>;
  marketplace_seller_option?: Maybe<Scalars['String']>;
  flash_deal_enable?: Maybe<Scalars['String']>;
  flash_deal_qty?: Maybe<Scalars['String']>;
  flash_deal_sold_qty?: Maybe<Scalars['String']>;
  flash_deal_from?: Maybe<Scalars['String']>;
  flash_deal_to?: Maybe<Scalars['String']>;
  is_hide_original_price?: Maybe<Scalars['Boolean']>;
  is_show_special_product_name?: Maybe<Scalars['Boolean']>;
  overlay?: Maybe<CSOverlay>;
  ranking?: Maybe<Scalars['Int']>;
  flash_deal_position?: Maybe<Scalars['Int']>;
  recommened_sort_order?: Maybe<Scalars['Int']>;
  manual_boosting?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  car_seat_age?: Maybe<Scalars['String']>;
  pm25?: Maybe<Scalars['String']>;
  pacifier_size?: Maybe<Scalars['String']>;
  watt?: Maybe<Scalars['String']>;
  bottle_size?: Maybe<Scalars['String']>;
  milk_powder_formula?: Maybe<Scalars['String']>;
  milk_powder_type?: Maybe<Scalars['String']>;
  diaper_weight?: Maybe<Scalars['String']>;
  diaper_size?: Maybe<Scalars['String']>;
  age_range?: Maybe<Scalars['String']>;
  kid_diaper_type?: Maybe<Scalars['String']>;
  cordless?: Maybe<Scalars['String']>;
  anti_calc_clean?: Maybe<Scalars['String']>;
  app_connected?: Maybe<Scalars['String']>;
  inverter_type?: Maybe<Scalars['String']>;
  grill_mode?: Maybe<Scalars['String']>;
  boil_function?: Maybe<Scalars['String']>;
  ro?: Maybe<Scalars['String']>;
  wireless?: Maybe<Scalars['String']>;
  microphone?: Maybe<Scalars['String']>;
  battery_time?: Maybe<Scalars['String']>;
  btu?: Maybe<Scalars['String']>;
  capacity_lts?: Maybe<Scalars['String']>;
  capacity_grams?: Maybe<Scalars['String']>;
  digital_manual?: Maybe<Scalars['String']>;
  coffee_maker_technology?: Maybe<Scalars['String']>;
  filtrations?: Maybe<Scalars['String']>;
  battery_type?: Maybe<Scalars['String']>;
  luggage_size?: Maybe<Scalars['String']>;
  weight_kg?: Maybe<Scalars['String']>;
  racket?: Maybe<Scalars['String']>;
  necklace_size?: Maybe<Scalars['String']>;
  shoe_material?: Maybe<Scalars['String']>;
  dress_length?: Maybe<Scalars['String']>;
  density?: Maybe<Scalars['String']>;
  bracelet_size?: Maybe<Scalars['String']>;
  clothing_size?: Maybe<Scalars['String']>;
  shoe_size?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  filtration?: Maybe<Scalars['String']>;
  material_clothing?: Maybe<Scalars['String']>;
  material_general?: Maybe<Scalars['String']>;
  sets?: Maybe<Scalars['String']>;
  home_clock_type?: Maybe<Scalars['String']>;
  descaling_system?: Maybe<Scalars['String']>;
  material_dial?: Maybe<Scalars['String']>;
  fashion_heel_type?: Maybe<Scalars['String']>;
  inverter?: Maybe<Scalars['String']>;
  accessory_jewelry_type?: Maybe<Scalars['String']>;
  life_luggage_type?: Maybe<Scalars['String']>;
  fashion_neckline?: Maybe<Scalars['String']>;
  fashion_occasion?: Maybe<Scalars['String']>;
  fashion_pant_fit?: Maybe<Scalars['String']>;
  pattern?: Maybe<Scalars['String']>;
  fashion_shoes_type?: Maybe<Scalars['String']>;
  fashion_sleeves_level?: Maybe<Scalars['String']>;
  fashion_socks_type?: Maybe<Scalars['String']>;
  style_general?: Maybe<Scalars['String']>;
  fashion_swimwear_type?: Maybe<Scalars['String']>;
  fashion_underwear_type?: Maybe<Scalars['String']>;
  waterproof?: Maybe<Scalars['String']>;
  allow_cc?: Maybe<Scalars['String']>;
  allow_cod?: Maybe<Scalars['String']>;
  allow_express?: Maybe<Scalars['String']>;
  allow_gift_wrapping?: Maybe<Scalars['String']>;
  allow_installment?: Maybe<Scalars['String']>;
  allow_return?: Maybe<Scalars['String']>;
  amxnotif_hide_alert?: Maybe<Scalars['String']>;
  backorders?: Maybe<Scalars['Int']>;
  bu?: Maybe<Scalars['String']>;
  category_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  central_url_generator_flag?: Maybe<Scalars['String']>;
  cmpgn?: Maybe<Array<Maybe<Scalars['String']>>>;
  color?: Maybe<Scalars['String']>;
  color_shade_id?: Maybe<Scalars['String']>;
  color_shade_name?: Maybe<Scalars['String']>;
  content_status?: Maybe<Scalars['String']>;
  copywrite_status?: Maybe<Scalars['String']>;
  CorrelationId?: Maybe<Scalars['String']>;
  enable_qty_increments?: Maybe<Scalars['Boolean']>;
  gift_message_available?: Maybe<Scalars['String']>;
  gift_wrapping_available?: Maybe<Scalars['String']>;
  has_options?: Maybe<Scalars['String']>;
  installment_plans?: Maybe<Array<Maybe<Scalars['String']>>>;
  is_decimal_divided?: Maybe<Scalars['Boolean']>;
  is_jda?: Maybe<Scalars['String']>;
  is_limited?: Maybe<Scalars['String']>;
  is_migrated?: Maybe<Scalars['String']>;
  is_qty_decimal?: Maybe<Scalars['Boolean']>;
  is_returnable?: Maybe<Scalars['String']>;
  is_sets?: Maybe<Scalars['String']>;
  is_travel?: Maybe<Scalars['String']>;
  jda_discount_code?: Maybe<Scalars['String']>;
  low_stock_date?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  meta_keyword?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  homepage_new?: Maybe<Scalars['String']>;
  manage_stock?: Maybe<Scalars['Boolean']>;
  min_qty?: Maybe<Scalars['Int']>;
  msrp_display_actual_price_type?: Maybe<Scalars['String']>;
  notify_stock_qty?: Maybe<Scalars['Int']>;
  online_price_enabled?: Maybe<Scalars['String']>;
  options_container?: Maybe<Scalars['String']>;
  page_layout?: Maybe<Scalars['String']>;
  payment_methods?: Maybe<Scalars['String']>;
  photo_status?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['Int']>;
  product_links?: Maybe<Array<Maybe<CSProductLink>>>;
  product_sell_type?: Maybe<Scalars['String']>;
  product_status?: Maybe<Scalars['String']>;
  qty_increments?: Maybe<Scalars['Int']>;
  required_options?: Maybe<Scalars['String']>;
  sell_on_jd?: Maybe<Scalars['String']>;
  shipping_methods?: Maybe<Scalars['String']>;
  show_default_notification_message?: Maybe<Scalars['Boolean']>;
  size_type?: Maybe<Scalars['Boolean']>;
  small_image?: Maybe<Scalars['String']>;
  specification_from_date?: Maybe<Scalars['String']>;
  stock_id?: Maybe<Scalars['Int']>;
  stock_status_changed_auto?: Maybe<Scalars['Int']>;
  store?: Maybe<Scalars['String']>;
  store_local?: Maybe<Scalars['String']>;
  t1c_earn_points_estimate?: Maybe<Array<Maybe<Scalars['Int']>>>;
  t1c_redeemable_points?: Maybe<Array<Maybe<Scalars['Int']>>>;
  tax_class_id?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  use_config_backorders?: Maybe<Scalars['Boolean']>;
  use_config_enable_qty_inc?: Maybe<Scalars['Boolean']>;
  use_config_manage_stock?: Maybe<Scalars['Boolean']>;
  use_config_max_sale_qty?: Maybe<Scalars['Boolean']>;
  use_config_min_qty?: Maybe<Scalars['Boolean']>;
  use_config_min_sale_qty?: Maybe<Scalars['Int']>;
  use_config_notify_stock_qty?: Maybe<Scalars['Boolean']>;
  use_config_qty_increments?: Maybe<Scalars['Boolean']>;
  vat?: Maybe<Scalars['String']>;
  website_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  media_gallery_entries?: Maybe<Array<Maybe<CSMediaGalleryEntry>>>;
  media_gallery_entries_video?: Maybe<Array<Maybe<CSMediaGalleryEntryVideo>>>;
  marketplace?: Maybe<CSMarketplace>;
  dimension?: Maybe<CSDimension>;
  specification_attributes?: Maybe<Array<Maybe<CSEav>>>;
  description?: Maybe<Scalars['String']>;
  short_description?: Maybe<Scalars['String']>;
  extension_attributes_installment_plans?: Maybe<Array<Maybe<CSInstallmentPlan>>>;
  category_paths?: Maybe<Array<Maybe<CSCategoryPath>>>;
  overall_rating?: Maybe<CSRating>;
  reviews?: Maybe<Array<Maybe<CSReview>>>;
  brand?: Maybe<CSBrand>;
  suggest_promotions?: Maybe<Array<Maybe<CSSuggestPromotion>>>;
  shipping_delivery_methods?: Maybe<Array<Maybe<CSShippingDeliveryMethod>>>;
  online_salable?: Maybe<Scalars['Boolean']>;
  offline_salable?: Maybe<Scalars['Boolean']>;
};

export type CSConfigurableProductOption = {
  __typename?: 'ConfigurableProductOption';
  attribute_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<CSConfigurableProductOptionValue>>>;
  position?: Maybe<Scalars['Int']>;
};

export type CSConfigurableProductOptionValue = {
  __typename?: 'ConfigurableProductOptionValue';
  extension_attributes?: Maybe<CSConfigurableProductOptionValueExtensionAttribute>;
  value_index?: Maybe<Scalars['Int']>;
};

export type CSConfigurableProductOptionValueExtensionAttribute = {
  __typename?: 'ConfigurableProductOptionValueExtensionAttribute';
  frontend_type?: Maybe<Scalars['String']>;
  frontend_value?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CSDimension = {
  __typename?: 'Dimension';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  depth?: Maybe<Scalars['Float']>;
};

export type CSDynamicSort = {
  field?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  optional?: Maybe<Scalars['String']>;
};

export type CSEav = {
  __typename?: 'EAV';
  attribute_code?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CSExactFilter = {
  filterBy?: Maybe<CSExactFilterOption>;
  filterValue?: Maybe<Scalars['String']>;
};

export enum CSExactFilterOption {
  IsInStock = 'IS_IN_STOCK',
  Recommended = 'RECOMMENDED',
  FlashDeal = 'FLASH_DEAL',
  BestSellers = 'BEST_SELLERS',
  NewArrivals = 'NEW_ARRIVALS',
  Pm2_5 = 'PM2_5',
}

export type CSFilter = {
  exactFilters?: Maybe<Array<Maybe<CSExactFilter>>>;
  inFilters?: Maybe<Array<Maybe<CSInFilter>>>;
  rangeFilters?: Maybe<Array<Maybe<CSRangeFilter>>>;
};

export type CSFindBySku = {
  __typename?: 'FindBySku';
  product?: Maybe<CSProduct>;
};

export type CSFindByUrlKey = {
  __typename?: 'FindByUrlKey';
  product?: Maybe<CSProduct>;
};

export type CSInFilter = {
  filterBy?: Maybe<CSInFilterOption>;
  filterValues?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum CSInFilterOption {
  Id = 'ID',
  Sku = 'SKU',
  Category = 'CATEGORY',
  Status = 'STATUS',
  Visibility = 'VISIBILITY',
  TypeId = 'TYPE_ID',
  BrandName = 'BRAND_NAME',
  ColorGroupName = 'COLOR_GROUP_NAME',
  ConfigurableProductLinks = 'CONFIGURABLE_PRODUCT_LINKS',
  Size = 'SIZE',
  RoomSizeSqm = 'ROOM_SIZE_SQM',
  CarSeatAge = 'CAR_SEAT_AGE',
  Pm25 = 'PM25',
  PacifierSize = 'PACIFIER_SIZE',
  Watt = 'WATT',
  BottleSize = 'BOTTLE_SIZE',
  MilkPowderFormula = 'MILK_POWDER_FORMULA',
  MilkPowderType = 'MILK_POWDER_TYPE',
  DiaperWeight = 'DIAPER_WEIGHT',
  DiaperSize = 'DIAPER_SIZE',
  AgeRange = 'AGE_RANGE',
  KidDiaperType = 'KID_DIAPER_TYPE',
  Cordless = 'CORDLESS',
  AntiCalcClean = 'ANTI_CALC_CLEAN',
  AppConnected = 'APP_CONNECTED',
  InverterType = 'INVERTER_TYPE',
  GrillMode = 'GRILL_MODE',
  BoilFunction = 'BOIL_FUNCTION',
  Ro = 'RO',
  Wireless = 'WIRELESS',
  Microphone = 'MICROPHONE',
  BatteryTime = 'BATTERY_TIME',
  Btu = 'BTU',
  CapacityLts = 'CAPACITY_LTS',
  CapacityGrams = 'CAPACITY_GRAMS',
  DigitalManual = 'DIGITAL_MANUAL',
  CoffeeMakerTechnology = 'COFFEE_MAKER_TECHNOLOGY',
  Filtrations = 'FILTRATIONS',
  BatteryType = 'BATTERY_TYPE',
  LuggageSize = 'LUGGAGE_SIZE',
  WeightKg = 'WEIGHT_KG',
  Racket = 'RACKET',
  NecklaceSize = 'NECKLACE_SIZE',
  ShoeMaterial = 'SHOE_MATERIAL',
  DressLength = 'DRESS_LENGTH',
  Density = 'DENSITY',
  BraceletSize = 'BRACELET_SIZE',
  ClothingSize = 'CLOTHING_SIZE',
  ShoeSize = 'SHOE_SIZE',
  Gender = 'GENDER',
  Filtration = 'FILTRATION',
  MaterialClothing = 'MATERIAL_CLOTHING',
  MaterialGeneral = 'MATERIAL_GENERAL',
  Sets = 'SETS',
  HomeClockType = 'HOME_CLOCK_TYPE',
  DescalingSystem = 'DESCALING_SYSTEM',
  MaterialDial = 'MATERIAL_DIAL',
  FashionHeelType = 'FASHION_HEEL_TYPE',
  Inverter = 'INVERTER',
  AccessoryJewelryType = 'ACCESSORY_JEWELRY_TYPE',
  LifeLuggageType = 'LIFE_LUGGAGE_TYPE',
  FashionNeckline = 'FASHION_NECKLINE',
  FashionOccasion = 'FASHION_OCCASION',
  FashionPantFit = 'FASHION_PANT_FIT',
  Pattern = 'PATTERN',
  FashionShoesType = 'FASHION_SHOES_TYPE',
  FashionSleevesLevel = 'FASHION_SLEEVES_LEVEL',
  FashionSocksType = 'FASHION_SOCKS_TYPE',
  StyleGeneral = 'STYLE_GENERAL',
  FashionSwimwearType = 'FASHION_SWIMWEAR_TYPE',
  FashionUnderwearType = 'FASHION_UNDERWEAR_TYPE',
  Waterproof = 'WATERPROOF',
  ShippingDeliveryMethodsDeliveryMethod = 'SHIPPING_DELIVERY_METHODS_DELIVERY_METHOD',
}

export type CSInstallmentPlan = {
  __typename?: 'InstallmentPlan';
  period?: Maybe<Scalars['String']>;
  bank?: Maybe<CSBank>;
  interest_type?: Maybe<Scalars['String']>;
  min_amount?: Maybe<Scalars['String']>;
  valid_from?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['String']>;
  update?: Maybe<Scalars['String']>;
  valid_until?: Maybe<Scalars['String']>;
  bank_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  customer_rate?: Maybe<Scalars['String']>;
  installmentplan_id?: Maybe<Scalars['String']>;
  max_amount?: Maybe<Scalars['String']>;
  create?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  merchant_rate?: Maybe<Scalars['String']>;
};

export type CSMarketplace = {
  __typename?: 'Marketplace';
  seller?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  offer_id?: Maybe<Scalars['String']>;
};

export type CSMediaGalleryEntry = {
  __typename?: 'MediaGalleryEntry';
  id?: Maybe<Scalars['String']>;
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  file?: Maybe<Scalars['String']>;
  media_type?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['String']>;
};

export type CSMediaGalleryEntryVideo = {
  __typename?: 'MediaGalleryEntryVideo';
  id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export type CSOverlay = {
  __typename?: 'Overlay';
  status?: Maybe<Scalars['String']>;
  mobile_status?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type CSPagination = {
  size?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type CSProduct = {
  __typename?: 'Product';
  id?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  breadcrumbs?: Maybe<Array<Maybe<CSBreadcrumb>>>;
  categories?: Maybe<Array<Maybe<CSCategory>>>;
  status?: Maybe<Scalars['Int']>;
  visibility?: Maybe<Scalars['String']>;
  type_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  configurable_product_links?: Maybe<Array<Maybe<Scalars['String']>>>;
  configurable_products?: Maybe<Array<Maybe<CSConfigurableProduct>>>;
  configurable_product_options?: Maybe<Array<Maybe<CSConfigurableProductOption>>>;
  brand_id?: Maybe<Scalars['String']>;
  brand_name?: Maybe<Scalars['String']>;
  brand_url?: Maybe<Scalars['String']>;
  color_group_name?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  news_from_date?: Maybe<Scalars['String']>;
  special_price?: Maybe<Scalars['Float']>;
  special_from_date?: Maybe<Scalars['String']>;
  special_to_date?: Maybe<Scalars['String']>;
  is_in_stock?: Maybe<Scalars['Boolean']>;
  new_tag?: Maybe<Scalars['String']>;
  only_at_tag?: Maybe<Scalars['String']>;
  promo_tag?: Maybe<Scalars['String']>;
  recommended?: Maybe<Scalars['String']>;
  flash_deal?: Maybe<Scalars['String']>;
  best_sellers?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  preorder_shipping_date?: Maybe<Scalars['String']>;
  max_sale_qty?: Maybe<Scalars['Int']>;
  min_sale_qty?: Maybe<Scalars['Int']>;
  online_exclusive_tag?: Maybe<Scalars['String']>;
  marketplace_product_type_option?: Maybe<Scalars['String']>;
  marketplace_seller_option?: Maybe<Scalars['String']>;
  flash_deal_enable?: Maybe<Scalars['String']>;
  flash_deal_qty?: Maybe<Scalars['String']>;
  flash_deal_sold_qty?: Maybe<Scalars['String']>;
  flash_deal_from?: Maybe<Scalars['String']>;
  flash_deal_to?: Maybe<Scalars['String']>;
  is_hide_original_price?: Maybe<Scalars['Boolean']>;
  is_show_special_product_name?: Maybe<Scalars['Boolean']>;
  overlay?: Maybe<CSOverlay>;
  ranking?: Maybe<Scalars['Int']>;
  flash_deal_position?: Maybe<Scalars['Int']>;
  recommened_sort_order?: Maybe<Scalars['Int']>;
  manual_boosting?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  car_seat_age?: Maybe<Scalars['String']>;
  pm25?: Maybe<Scalars['String']>;
  pacifier_size?: Maybe<Scalars['String']>;
  watt?: Maybe<Scalars['String']>;
  bottle_size?: Maybe<Scalars['String']>;
  milk_powder_formula?: Maybe<Scalars['String']>;
  milk_powder_type?: Maybe<Scalars['String']>;
  diaper_weight?: Maybe<Scalars['String']>;
  diaper_size?: Maybe<Scalars['String']>;
  age_range?: Maybe<Scalars['String']>;
  kid_diaper_type?: Maybe<Scalars['String']>;
  cordless?: Maybe<Scalars['String']>;
  anti_calc_clean?: Maybe<Scalars['String']>;
  app_connected?: Maybe<Scalars['String']>;
  inverter_type?: Maybe<Scalars['String']>;
  grill_mode?: Maybe<Scalars['String']>;
  boil_function?: Maybe<Scalars['String']>;
  ro?: Maybe<Scalars['String']>;
  wireless?: Maybe<Scalars['String']>;
  microphone?: Maybe<Scalars['String']>;
  battery_time?: Maybe<Scalars['String']>;
  btu?: Maybe<Scalars['String']>;
  capacity_lts?: Maybe<Scalars['String']>;
  capacity_grams?: Maybe<Scalars['String']>;
  digital_manual?: Maybe<Scalars['String']>;
  coffee_maker_technology?: Maybe<Scalars['String']>;
  filtrations?: Maybe<Scalars['String']>;
  battery_type?: Maybe<Scalars['String']>;
  luggage_size?: Maybe<Scalars['String']>;
  weight_kg?: Maybe<Scalars['String']>;
  racket?: Maybe<Scalars['String']>;
  necklace_size?: Maybe<Scalars['String']>;
  shoe_material?: Maybe<Scalars['String']>;
  dress_length?: Maybe<Scalars['String']>;
  density?: Maybe<Scalars['String']>;
  bracelet_size?: Maybe<Scalars['String']>;
  clothing_size?: Maybe<Scalars['String']>;
  shoe_size?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  filtration?: Maybe<Scalars['String']>;
  material_clothing?: Maybe<Scalars['String']>;
  material_general?: Maybe<Scalars['String']>;
  sets?: Maybe<Scalars['String']>;
  home_clock_type?: Maybe<Scalars['String']>;
  descaling_system?: Maybe<Scalars['String']>;
  material_dial?: Maybe<Scalars['String']>;
  fashion_heel_type?: Maybe<Scalars['String']>;
  inverter?: Maybe<Scalars['String']>;
  accessory_jewelry_type?: Maybe<Scalars['String']>;
  life_luggage_type?: Maybe<Scalars['String']>;
  fashion_neckline?: Maybe<Scalars['String']>;
  fashion_occasion?: Maybe<Scalars['String']>;
  fashion_pant_fit?: Maybe<Scalars['String']>;
  pattern?: Maybe<Scalars['String']>;
  fashion_shoes_type?: Maybe<Scalars['String']>;
  fashion_sleeves_level?: Maybe<Scalars['String']>;
  fashion_socks_type?: Maybe<Scalars['String']>;
  style_general?: Maybe<Scalars['String']>;
  fashion_swimwear_type?: Maybe<Scalars['String']>;
  fashion_underwear_type?: Maybe<Scalars['String']>;
  waterproof?: Maybe<Scalars['String']>;
  allow_cc?: Maybe<Scalars['String']>;
  allow_cod?: Maybe<Scalars['String']>;
  allow_express?: Maybe<Scalars['String']>;
  allow_gift_wrapping?: Maybe<Scalars['String']>;
  allow_installment?: Maybe<Scalars['String']>;
  allow_return?: Maybe<Scalars['String']>;
  amxnotif_hide_alert?: Maybe<Scalars['String']>;
  backorders?: Maybe<Scalars['Int']>;
  bu?: Maybe<Scalars['String']>;
  category_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  central_url_generator_flag?: Maybe<Scalars['String']>;
  cmpgn?: Maybe<Array<Maybe<Scalars['String']>>>;
  color?: Maybe<Scalars['String']>;
  color_shade_id?: Maybe<Scalars['String']>;
  color_shade_name?: Maybe<Scalars['String']>;
  content_status?: Maybe<Scalars['String']>;
  copywrite_status?: Maybe<Scalars['String']>;
  CorrelationId?: Maybe<Scalars['String']>;
  enable_qty_increments?: Maybe<Scalars['Boolean']>;
  gift_message_available?: Maybe<Scalars['String']>;
  gift_wrapping_available?: Maybe<Scalars['String']>;
  has_options?: Maybe<Scalars['String']>;
  installment_plans?: Maybe<Array<Maybe<Scalars['String']>>>;
  is_decimal_divided?: Maybe<Scalars['Boolean']>;
  is_jda?: Maybe<Scalars['String']>;
  is_limited?: Maybe<Scalars['String']>;
  is_migrated?: Maybe<Scalars['String']>;
  is_qty_decimal?: Maybe<Scalars['Boolean']>;
  is_returnable?: Maybe<Scalars['String']>;
  is_sets?: Maybe<Scalars['String']>;
  is_travel?: Maybe<Scalars['String']>;
  jda_discount_code?: Maybe<Scalars['String']>;
  low_stock_date?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  meta_keyword?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  homepage_new?: Maybe<Scalars['String']>;
  manage_stock?: Maybe<Scalars['Boolean']>;
  min_qty?: Maybe<Scalars['Int']>;
  msrp_display_actual_price_type?: Maybe<Scalars['String']>;
  notify_stock_qty?: Maybe<Scalars['Int']>;
  online_price_enabled?: Maybe<Scalars['String']>;
  options_container?: Maybe<Scalars['String']>;
  page_layout?: Maybe<Scalars['String']>;
  payment_methods?: Maybe<Scalars['String']>;
  photo_status?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['Int']>;
  product_links?: Maybe<Array<Maybe<CSProductLink>>>;
  product_sell_type?: Maybe<Scalars['String']>;
  product_status?: Maybe<Scalars['String']>;
  qty_increments?: Maybe<Scalars['Int']>;
  required_options?: Maybe<Scalars['String']>;
  sell_on_jd?: Maybe<Scalars['String']>;
  shipping_methods?: Maybe<Scalars['String']>;
  show_default_notification_message?: Maybe<Scalars['Boolean']>;
  size_type?: Maybe<Scalars['Boolean']>;
  small_image?: Maybe<Scalars['String']>;
  specification_from_date?: Maybe<Scalars['String']>;
  stock_id?: Maybe<Scalars['Int']>;
  stock_status_changed_auto?: Maybe<Scalars['Int']>;
  store?: Maybe<Scalars['String']>;
  store_local?: Maybe<Scalars['String']>;
  t1c_earn_points_estimate?: Maybe<Array<Maybe<Scalars['Int']>>>;
  t1c_redeemable_points?: Maybe<Array<Maybe<Scalars['Int']>>>;
  tax_class_id?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  use_config_backorders?: Maybe<Scalars['Boolean']>;
  use_config_enable_qty_inc?: Maybe<Scalars['Boolean']>;
  use_config_manage_stock?: Maybe<Scalars['Boolean']>;
  use_config_max_sale_qty?: Maybe<Scalars['Boolean']>;
  use_config_min_qty?: Maybe<Scalars['Boolean']>;
  use_config_min_sale_qty?: Maybe<Scalars['Int']>;
  use_config_notify_stock_qty?: Maybe<Scalars['Boolean']>;
  use_config_qty_increments?: Maybe<Scalars['Boolean']>;
  vat?: Maybe<Scalars['String']>;
  website_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  media_gallery_entries?: Maybe<Array<Maybe<CSMediaGalleryEntry>>>;
  media_gallery_entries_video?: Maybe<Array<Maybe<CSMediaGalleryEntryVideo>>>;
  marketplace?: Maybe<CSMarketplace>;
  dimension?: Maybe<CSDimension>;
  specification_attributes?: Maybe<Array<Maybe<CSEav>>>;
  description?: Maybe<Scalars['String']>;
  short_description?: Maybe<Scalars['String']>;
  extension_attributes_installment_plans?: Maybe<Array<Maybe<CSInstallmentPlan>>>;
  category_paths?: Maybe<Array<Maybe<CSCategoryPath>>>;
  overall_rating?: Maybe<CSRating>;
  reviews?: Maybe<Array<Maybe<CSReview>>>;
  brand?: Maybe<CSBrand>;
  suggest_promotions?: Maybe<Array<Maybe<CSSuggestPromotion>>>;
  shipping_delivery_methods?: Maybe<Array<Maybe<CSShippingDeliveryMethod>>>;
  online_salable?: Maybe<Scalars['Boolean']>;
  offline_salable?: Maybe<Scalars['Boolean']>;
};

export type CSProductLink = {
  __typename?: 'ProductLink';
  link_type?: Maybe<Scalars['String']>;
  linked_product_sku?: Maybe<Scalars['String']>;
  linked_product_type?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
};

export type CSQuery = {
  __typename?: 'Query';
  search?: Maybe<CSSearch>;
  findBySku?: Maybe<CSFindBySku>;
  suggestSearch?: Maybe<CSSuggestSearch>;
  categories?: Maybe<CSCategories>;
  brands?: Maybe<CSBrands>;
  brandById?: Maybe<CSBrandById>;
  findByUrlKey?: Maybe<CSFindByUrlKey>;
};

export type CSQuerySearchArgs = {
  store: Scalars['String'];
  locale: Scalars['String'];
  keyword?: Maybe<Scalars['String']>;
  sort?: Maybe<CSSort>;
  sort_orders?: Maybe<CSDynamicSort>;
  pagination?: Maybe<CSPagination>;
  filter?: Maybe<CSFilter>;
  filter_groups?: Maybe<Array<Maybe<CSCommonFilter>>>;
};

export type CSQueryFindByIdOrSkuArgs = {
  store: Scalars['String'];
  locale: Scalars['String'];
  pagination?: Maybe<CSPagination>;
  values?: Scalars['String'][];
};

export type CSProductResult = {
  products?: Maybe<Array<Maybe<CSProduct>>>;
};

export type CSQueryFindBySkuArgs = {
  store: Scalars['String'];
  locale: Scalars['String'];
  sku: Scalars['String'];
};

export type CSQuerySuggestSearchArgs = {
  store: Scalars['String'];
  locale: Scalars['String'];
  keyword: Scalars['String'];
  product_size: Scalars['Int'];
  category_size: Scalars['Int'];
};

export type CSQueryCategoriesArgs = {
  locale: Scalars['String'];
};

export type CSQueryBrandsArgs = {
  locale: Scalars['String'];
};

export type CSQueryBrandByIdArgs = {
  locale: Scalars['String'];
  id: Scalars['String'];
};

export type CSQueryFindByUrlKeyArgs = {
  locale: Scalars['String'];
  url_key: Scalars['String'];
};

export type CSRangeFilter = {
  filterBy?: Maybe<CSRangeFilterOption>;
  minValue?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['String']>;
};

export enum CSRangeFilterOption {
  Price = 'PRICE',
}

export type CSRating = {
  __typename?: 'Rating';
  rating_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['Int']>;
  total_vote?: Maybe<Scalars['Int']>;
  five_star?: Maybe<Scalars['Int']>;
  four_star?: Maybe<Scalars['Int']>;
  three_star?: Maybe<Scalars['Int']>;
  two_star?: Maybe<Scalars['Int']>;
  one_star?: Maybe<Scalars['Int']>;
  rounded_rating?: Maybe<Scalars['Float']>;
};

export type CSReview = {
  __typename?: 'Review';
  review_id?: Maybe<Scalars['Int']>;
  nickname?: Maybe<Scalars['String']>;
  rating_items?: Maybe<Array<Maybe<CSRating>>>;
  created_at?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  is_validate?: Maybe<Scalars['Boolean']>;
  region_id?: Maybe<Scalars['Int']>;
  extension_attributes?: Maybe<CSReviewExtension>;
};

export type CSReviewExtension = {
  __typename?: 'ReviewExtension';
  email?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CSSearch = {
  __typename?: 'Search';
  total?: Maybe<Scalars['Int']>;
  products?: Maybe<Array<Maybe<CSProduct>>>;
  aggregations?: Maybe<Array<Maybe<CSAggregation>>>;
  category_aggregations?: Maybe<Array<Maybe<CSCategoryAggregation>>>;
};

export type CSShippingDeliveryMethod = {
  __typename?: 'ShippingDeliveryMethod';
  shipping_method?: Maybe<Scalars['String']>;
  delivery_method?: Maybe<Scalars['String']>;
  shipping_method_code?: Maybe<Scalars['String']>;
  delivery_method_code?: Maybe<Scalars['String']>;
};

export type CSSort = {
  sortBy?: Maybe<CSSortOption>;
  order?: Maybe<CSSortOrder>;
  skus?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum CSSortOption {
  Name = 'NAME',
  Price = 'PRICE',
  NewArrivals = 'NEW_ARRIVALS',
  Id = 'ID',
  DiscountAmount = 'DISCOUNT_AMOUNT',
  Recommended = 'RECOMMENDED',
  RecommenedSortOrder = 'RECOMMENED_SORT_ORDER',
  Ranking = 'RANKING',
  FlashDealPosition = 'FLASH_DEAL_POSITION',
  ManualSortBySku = 'MANUAL_SORT_BY_SKU',
  ManualBoosting = 'MANUAL_BOOSTING',
}

export enum CSSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type CSSuggestPromotion = {
  __typename?: 'SuggestPromotion';
  promotion_name?: Maybe<Scalars['String']>;
  full_condition?: Maybe<Scalars['String']>;
  start_datetime?: Maybe<Scalars['String']>;
  end_datetime?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  short_description?: Maybe<Scalars['String']>;
};

export type CSSuggestSearch = {
  __typename?: 'SuggestSearch';
  products?: Maybe<Array<Maybe<CSProduct>>>;
  categories?: Maybe<Array<Maybe<CSCategory>>>;
};
