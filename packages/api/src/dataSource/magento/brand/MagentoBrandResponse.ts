export interface MDCBrand {
  id: string;
  brand_id: string;
  name: string;
  image_url: string;
  content_css: string;
  parent_category: string;
  url: string;
}

export interface MDCBrandDetail {
  brand_id: number;
  attribute_id: number;
  attribute_code: string;
  option_id: number;
  name: string;
  website_ids: number[];
  url_key: string;
  logo: string;
  is_featured: boolean;
  content: MDCBrandDetailContent[];
  meta_title: string;
  meta_description: string;
  description: string;
  brand_additional_products: MDCBrandDetailBrandAdditionalProduct[];
  extension_attributes: MDCBrandDetailExtensionAttribute;
}

export interface MDCBrandDetailContent {
  brand_id: number;
  store_id: number;
  meta_title: string;
  meta_description: string;
  description: string;
}

export interface MDCBrandDetailBrandAdditionalProduct {
  product_id: number;
  position: number;
}

export interface MDCBrandDetailExtensionAttribute {
  parent_category: number;
  menu_css: string;
  content_css: string;
  brand_image_url: string;
  position: number;
  is_official: boolean;
  product_collections: MDCBrandDetailProductCollection[];
  product_count: number;
  product_name_special: boolean;
  hide_product_original_price: boolean;
  hide_t1c_redeemable_amount: boolean;
  allow_product_review: boolean;
  banners: any;
  disable_new_arrival_section: boolean;
  disable_best_seller_section: boolean;
}

export interface MDCBrandDetailProductCollection {
  brand_collection_id: number;
  brand_id: number;
  url: string;
  content: string;
  identification: string;
  name: string;
  description: string;
  brand_collection_products: MDCBrandDetailBrandAdditionalProduct;
  position: number;
  deep_link: string;
  is_official: boolean;
  collection_products_textarea: string;
}
