import {
  IV2Wishlist as IWishlist,
  IV2WishlistGroup as IWishlistGroup,
  IV2WishlistGroupItem as IWishlistGroupItem,
  IV2CustomAttributes,
} from '../../../types/graphql';

export function getWishlistItem(item): IWishlistGroupItem {
  return {
    id: item?.wishlist_item_id?.toString(),
    wishlistId: item.wishlist_id,
    storeId: item.store_id,
    addedAt: item.added_at,
    description: item.description,
    quantity: +item.qty,
    productId: item.product_id.toString(),
    productOptions: item.custom_attributes?.map(customAttribute => {
      return {
        attributeCode: customAttribute.attribute_code,
        value: customAttribute.value,
        name: customAttribute.name,
      };
    }),
  };
}

export function getWishlistGroup({ items }): IWishlistGroup {
  return items.map(group => ({
    id: group.wishlist_id?.toString(),
    customerId: group.customer_id,
    name: group.name,
    sharingCode: group.sharing_code,
    updatedAt: group.updated_at,
    visibility: group.visibility,
    shared: group.shared,
    items: group.items.map(getWishlistItem),
  }));
}

export function transformWishlist(wishlist): IWishlist {
  const groups = this.getWishlistGroup(wishlist);

  return {
    totalCount: wishlist.total_count,
    groups,
  };
}

export function transformCustomAttribute(customAttributes): IV2CustomAttributes[] {
  return customAttributes?.map(customAttribute => {
    return {
      attributeCode: customAttribute.attribute_code,
      value: customAttribute.value,
      name: customAttribute.name,
    };
  });
}
