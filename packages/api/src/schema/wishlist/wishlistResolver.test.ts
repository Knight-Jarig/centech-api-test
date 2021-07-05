import WishlistResolvers from './wishlistResolvers';
import { ApplicationError } from '../../error/ApplicationError';

const mockDataSources = {
  wishlist: {
    getWishlist: () => new Promise(resolve => resolve(true)),
    searchWishlist: () => new Promise(resolve => resolve(true)),
    search: () => new Promise(resolve => resolve(true)),
    selectForUser: () => new Promise(resolve => resolve(true)),
    createWishlist: () => new Promise(resolve => resolve(true)),
    updateWishlist: () => new Promise(resolve => resolve(true)),
    deleteWishlist: () => new Promise(resolve => resolve(true)),
    getWishlistItem: () => new Promise(resolve => resolve(true)),
    searchWishlistItems: () => new Promise(resolve => resolve(true)),
    createWishlistItem: () => new Promise(resolve => resolve(true)),
    updateWishlistItem: () => new Promise(resolve => resolve(true)),
    deleteWishlistItem: () => new Promise(resolve => resolve(true)),
  },
  customer: {
    getCustomer: () => new Promise(resolve => resolve(true)),
  },
  product: {
    search: () => new Promise(resolve => resolve(true)),
    findBySku: () => new Promise(resolve => resolve(true)),
  },
  catalogService: {
    find: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesWishlist = {
  magento: {
    wishlist: mockDataSources.wishlist,
    customer: mockDataSources.customer,
    product: mockDataSources.product,
    catalogService: mockDataSources.catalogService,
  },
};

describe('CommomResolver', () => {
  const queryWishlists = WishlistResolvers.Query.wishlists as Function;
  const mutationCreateWishlist = WishlistResolvers.Mutation.createWishlist as Function;
  const mutationUpdateWishlist = WishlistResolvers.Mutation.updateWishlist as Function;
  const mutationDeleteWishlist = WishlistResolvers.Mutation.deleteWishlist as Function;
  const mutationCreateItemWishlist = WishlistResolvers.Mutation.createWishlistItem as Function;
  const mutationUpdateItemWishlist = WishlistResolvers.Mutation.updateWishlistItem as Function;
  const mutationDeleteItemWishlist = WishlistResolvers.Mutation.deleteWishlistItem as Function;
  const product = WishlistResolvers.WishlistItem.product as Function;

  const _source = { product_id: 1 };
  const wishlist_id = 1;
  const input = {
    customer_id: 1,
    name: 'Testname',
    items: [],
  };
  const filter = {
    filterGroups: [{ filters: [{ field: 'customer_id', value: '1' }] }],
  };
  const dataSources = dataSourcesWishlist;
  const customerToken = '1234';
  const storeCode = 'cds_th';

  it('Query wishlists', async () => {
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ get: null }));
    await queryWishlists(_source, { filter }, { dataSources, customerToken, storeCode });
    expect(dataSources.magento.customer.getCustomer).toBeCalledWith(storeCode);
  });

  it('Mutation createWishlist', async () => {
    jest.spyOn(dataSources.magento.wishlist, 'createWishlist').mockReturnValue(Promise.resolve({ wishlist_id }));
    jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve({ items: ['a'] }));
    jest.spyOn(dataSources.magento.product, 'findBySku').mockReturnValue(Promise.resolve({}));
    await mutationCreateWishlist(_source, { input }, { dataSources, storeCode });
    expect(dataSources.magento.wishlist.createWishlist).toBeCalledWith(input);
  });

  it('Mutation updateWishlist', async () => {
    const input = {
      name: 'Testname',
      visibility: false,
      items: [],
    };
    jest.spyOn(dataSources.magento.wishlist, 'updateWishlist').mockReturnValue(Promise.resolve({ wishlist_id }));
    jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve({ items: ['a'] }));
    jest.spyOn(dataSources.magento.product, 'findBySku').mockReturnValue(Promise.resolve({}));
    await mutationUpdateWishlist(_source, { input: { wishlist_id, ...input } }, { dataSources, storeCode });
    expect(dataSources.magento.wishlist.updateWishlist).toBeCalledWith(wishlist_id, input);
  });

  it('Mutation deleteWishlist', async () => {
    jest.spyOn(dataSources.magento.wishlist, 'deleteWishlist').mockReturnValue(Promise.resolve({}));
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1 }));
    jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve({ customer_id: 1 }));
    await mutationDeleteWishlist(_source, { id: wishlist_id }, { dataSources, customerToken, storeCode });
    expect(dataSources.magento.wishlist.deleteWishlist).toBeCalledWith(wishlist_id);
  });

  it('Mutation createWishlistItem', async () => {
    const input = {
      wishlist_id: undefined,
      product_id: 1,
      store_id: 1,
      qty: 1,
    };
    jest
      .spyOn(dataSources.magento.wishlist, 'createWishlistItem')
      .mockReturnValue(Promise.resolve({ items: [{ wishlist_id }] }));
    jest.spyOn(dataSources.magento.wishlist, 'createWishlist').mockReturnValue(Promise.resolve({ wishlist_id }));
    jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve({ items: ['a'] }));
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1 }));
    jest.spyOn(dataSources.magento.wishlist, 'selectForUser').mockReturnValue(Promise.resolve({ items: ['a'] }));
    await mutationCreateItemWishlist(_source, { input }, { dataSources, storeCode });
    expect(dataSources.magento.wishlist.createWishlistItem).toBeCalledWith(input);
  });

  it('Mutation updateWishlistItem', async () => {
    const wishlist_item_id = 1;
    const input = {
      product_id: 1,
      store_id: 1,
      qty: 1,
    };
    jest.spyOn(dataSources.magento.wishlist, 'updateWishlistItem').mockReturnValue(Promise.resolve([]));
    await mutationUpdateItemWishlist(_source, { input: { wishlist_item_id, ...input } }, { dataSources, storeCode });
    expect(dataSources.magento.wishlist.updateWishlistItem).toBeCalledWith(wishlist_item_id, input);
  });

  it('Mutation deleteWishlistItem', async () => {
    jest.spyOn(dataSources.magento.wishlist, 'deleteWishlistItem').mockReturnValue(Promise.resolve({}));
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1 }));
    jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve({ wishlist_id: 1 }));
    jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve({ customer_id: 1 }));
    await mutationDeleteItemWishlist(_source, { id: wishlist_id }, { dataSources, customerToken, storeCode });
    expect(dataSources.magento.wishlist.deleteWishlistItem).toBeCalledWith(wishlist_id);
  });

  it('Test WishlistItem product', async () => {
    const filter = {
      filterGroups: [
        {
          filters: [
            {
              conditionType: 'in',
              field: 'entity_id',
              value: '',
            },
          ],
        },
      ],
    };
    jest.spyOn(dataSources.magento.product, 'search').mockReturnValue(Promise.resolve({ items: [{ sku: 1 }] }));
    jest.spyOn(dataSources.magento.product, 'findBySku').mockReturnValue(Promise.resolve({ type_id: 'configurable' }));
    jest.spyOn(dataSources.magento.catalogService, 'find').mockReturnValue(Promise.resolve({ products: [] }));
    await product(_source, null, { dataSources, storeCode });
    expect(dataSources.magento.catalogService.find).toBeCalledWith(filter, storeCode);
  });
});
