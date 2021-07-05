import { ICustomAttributesInput } from '../../../types/graphql';

export interface WishlistItem {
  wishlist_item_id?: number;
  wishlist_id?: number;
  product_id: number;
  store_id: number;
  added_at?: Date;
  description?: string;
  qty: string;
  sku?: string;
  product_name?: string;
  custom_attributes?: ICustomAttributesInput[];
}

export interface Wishlist {
  wishlist_id?: number;
  customer_id: number;
  name: string;
  sharing_code?: string;
  updated_at?: Date;
  visibility?: number;
  shared?: number;
  items: WishlistItem[];
}
