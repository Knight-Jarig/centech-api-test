import { MagentoWishlistDataSource } from './MagentoWithlistDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';

class MagentoWishlistDataSourceTest extends MagentoWishlistDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
  put() {
    return jest.fn() as any;
  }
  delete() {
    return jest.fn() as any;
  }
}

describe('MagentoWishlistDataSource', () => {
  const magentoWishlist = new MagentoWishlistDataSourceTest();

  it(`should run getWishlist properly`, async () => {
    const wishlistId = 1;

    const path = `/V1/wishlist/${wishlistId}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    jest.spyOn(magentoWishlist, 'get').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.getWishlist(wishlistId);
    expect(magentoWishlist.get).toBeCalledWith(path, params, init);
  });

  it(`should run searchWishlist properly`, async () => {
    const filters = [{ field: 'name', value: 'muji' }];
    const searchCriteria = searchCriteriaBuilder({
      filterGroups: [{ filters }],
    });

    const path = `/V1/wishlists?${searchCriteria}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    jest.spyOn(magentoWishlist, 'get').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.searchWishlist(filters);
    expect(magentoWishlist.get).toBeCalledWith(path, params, init);
  });

  it(`should run search properly`, async () => {
    const filters = {
      filterGroups: [{ filters: [{ field: 'customer_id', value: '1' }] }],
      page: 1,
      size: 1,
    };
    const searchCriteria = searchCriteriaBuilder(filters);

    const path = `/V1/wishlists?${searchCriteria}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    jest.spyOn(magentoWishlist, 'get').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.search(filters);
    expect(magentoWishlist.get).toBeCalledWith(path, params, init);
  });

  it(`should run selectForUser properly`, async () => {
    const customerId = 1;
    const filters = [{ field: 'customer_id', value: customerId.toString() }];
    const searchCriteria = searchCriteriaBuilder({
      filterGroups: [{ filters }],
    });

    const path = `/V1/wishlists?${searchCriteria}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    await magentoWishlist.selectForUser(customerId);
    expect(magentoWishlist.get).toBeCalledWith(path, params, init);
  });

  it(`should run createWishlist properly`, async () => {
    const path = `/V1/wishlist`;
    const params = {
      customer_id: 1,
      name: 'Testname',
      items: [],
    };

    jest.spyOn(magentoWishlist, 'put').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.createWishlist(params);
    expect(magentoWishlist.put).toBeCalledWith(path, { wishlistData: params });
  });

  it(`should run updateWishlist properly`, async () => {
    const wishlistId = 1;
    const path = `/V1/wishlist/${wishlistId}`;
    const params = {
      customer_id: 1,
      name: 'Testname',
      items: [],
    };

    jest.spyOn(magentoWishlist, 'post').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.updateWishlist(wishlistId, params);
    expect(magentoWishlist.post).toBeCalledWith(path, { wishlistData: params });
  });

  it(`should run deleteWishlist properly`, async () => {
    const wishlistId = 1;
    const path = `/V1/wishlist/${wishlistId}`;

    jest.spyOn(magentoWishlist, 'delete').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.deleteWishlist(wishlistId);
    expect(magentoWishlist.delete).toBeCalledWith(path);
  });

  it(`should run getWishlistItem properly`, async () => {
    const wishlistItemId = 1;

    const path = `V1/wishlist-item/${wishlistItemId}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    jest.spyOn(magentoWishlist, 'get').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.getWishlistItem(wishlistItemId);
    expect(magentoWishlist.get).toBeCalledWith(path, params, init);
  });

  it(`should run searchWishlistItems properly`, async () => {
    const filters = [{ field: 'name', value: 'muji' }];
    const page = 1;
    const size = 20;
    const searchCriteria = searchCriteriaBuilder({
      filterGroups: [{ filters }],
      size,
      page,
    });

    const path = `/V1/wishlist-items?${searchCriteria}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    jest.spyOn(magentoWishlist, 'get').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.searchWishlistItems(filters, page, size);
    expect(magentoWishlist.get).toBeCalledWith(path, params, init);
  });

  it(`should run createWishlistItem properly`, async () => {
    const path = `/V1/wishlist-item`;
    const params = {
      product_id: 1,
      store_id: 1,
      qty: '1',
    };

    jest.spyOn(magentoWishlist, 'put').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.createWishlistItem(params);
    expect(magentoWishlist.put).toBeCalledWith(path, { itemData: params });
  });

  it(`should run updateWishlistItem properly`, async () => {
    const wishlistItemId = 1;
    const path = `/V1/wishlist-item/${wishlistItemId}`;
    const params = {
      product_id: 1,
      store_id: 1,
      qty: '1',
    };

    jest.spyOn(magentoWishlist, 'post').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.updateWishlistItem(wishlistItemId, params);
    expect(magentoWishlist.post).toBeCalledWith(path, { itemData: params });
  });

  it(`should run deleteWishlistItem properly`, async () => {
    const wishlistItemId = 1;
    const path = `/V1/wishlist-item/${wishlistItemId}`;

    jest.spyOn(magentoWishlist, 'delete').mockReturnValue(Promise.resolve({}) as any);

    await magentoWishlist.deleteWishlistItem(wishlistItemId);
    expect(magentoWishlist.delete).toBeCalledWith(path);
  });
});
