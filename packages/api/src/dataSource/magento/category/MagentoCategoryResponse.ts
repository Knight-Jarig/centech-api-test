export interface MagentoCategory {
  id: number;
  parent_id: number;
  name: string;
  is_active: true;
  position: number;
  level: number;
  product_count: number;
  children_data: MagentoCategory[];
}

export interface MagentoCategoryFlat {
  entity_id: string;
  parent_id: string;
  name: string;
  is_active: string;
  position: string;
  level: string;
  updated_at: string;
  created_at: string;
  path: string;
  available_sort_by: null;
  include_in_menu: string;
  product_count: number;
  children: null;
  children_count: string;
  url_key: string;
  url_path: string;
  virtual_category_root: null;
  image_icon_tablet?: string | 'false';
  image_mobile: 'false' | null;
  image?: string;
  icon?: string;
  display_mode?: string;
}

export interface MagentoCategoryCustomAttribute {
  attribute_code: string;
  value: string;
  label?: string;
  name: string;
}

export type MagentoCategoryExtensionAttributes = Record<string, any[]>;

export type MagentoCategoryAllResponse = MagentoCategory;

export interface MagentoCategoryFindOneResponse {
  id: number;
  parent_id: number;
  name: string;
  is_active: true;
  position: number;
  level: number;
  children: string;
  created_at: string;
  updated_at: string;
  path: string;
  available_sort_by: [];
  include_in_menu: true;
  extension_attributes: MagentoCategoryExtensionAttributes;
  custom_attributes: MagentoCategoryCustomAttribute[];
}

export interface MagentoCategoryFindResponse {
  items: MagentoCategoryFlat[];

  search_criteria: null;
  total_count: number;
}
