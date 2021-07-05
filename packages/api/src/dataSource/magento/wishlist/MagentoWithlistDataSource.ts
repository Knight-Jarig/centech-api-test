import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { Wishlist, WishlistItem } from './MagentoWithlistParams';
import { IFilters } from '../../../types/graphql';

export class MagentoWishlistDataSource extends BaseRESTDataSource {
  /* wishlist functions */

  async getWishlist(wishlistId: number) {
    return this.get(`/V1/wishlist/${wishlistId}`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  async searchWishlist(filters: Array<any>) {
    const searchCriteria = searchCriteriaBuilder({
      filterGroups: [{ filters }],
    });
    return this.get(`/V1/wishlists?${searchCriteria}`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  async search(filters) {
    const searchCriteria = searchCriteriaBuilder(filters);
    return this.get(`/V1/wishlists?${searchCriteria}`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  async selectForUser(customerId: number) {
    const filters = [{ field: 'customer_id', value: customerId }];
    return this.searchWishlist(filters);
  }

  async createWishlist(wishlist: Wishlist) {
    return this.put('/V1/wishlist', { wishlistData: wishlist });
  }

  async updateWishlist(wishlistId: number, wishlist: Wishlist) {
    return this.post(`/V1/wishlist/${wishlistId}`, { wishlistData: wishlist });
  }

  async deleteWishlist(wishlistId: number) {
    return this.delete(`/V1/wishlist/${wishlistId}`);
  }

  /* wishlist item functions */

  async getWishlistItem(wishlistItemId: number) {
    return this.get(`V1/wishlist-item/${wishlistItemId}`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  async searchWishlistItems(filters: IFilters[], page = 1, size = 20) {
    const searchCriteria = searchCriteriaBuilder({
      filterGroups: [{ filters }],
      size,
      page,
    });
    return this.get(`/V1/wishlist-items?${searchCriteria}`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  async createWishlistItem(wishlistItem: WishlistItem) {
    return this.put('/V1/wishlist-item', { itemData: wishlistItem });
  }

  async updateWishlistItem(wishlistItemId: number, wishlistItem: WishlistItem) {
    return this.post(`/V1/wishlist-item/${wishlistItemId}`, { itemData: wishlistItem });
  }

  async deleteWishlistItem(wishlistItemId: number) {
    return this.delete(`/V1/wishlist-item/${wishlistItemId}`);
  }
}
