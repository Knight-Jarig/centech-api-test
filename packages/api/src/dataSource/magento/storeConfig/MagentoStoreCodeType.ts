export interface StoreConfigExtensionAttributes {
  social_facebook_app_id: string;
  social_facebook_app_secret: string;
}

export interface StoreConfig {
  id: number;
  code: string;
  website_id: number;
  locale: string;
  base_currency_code: string;
  default_display_currency_code: string;
  timezone: string;
  weight_unit: string;
  base_url: string;
  base_link_url: string;
  base_static_url: string;
  base_media_url: string;
  secure_base_url: string;
  secure_base_link_url: string;
  secure_base_static_url: string;
  secure_base_media_url: string;
  extension_attributes: StoreConfigExtensionAttributes;
}
