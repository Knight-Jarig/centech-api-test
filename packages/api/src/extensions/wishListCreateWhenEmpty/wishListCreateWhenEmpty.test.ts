import { resolver } from './index';

jest.mock('../../schema/wishlist/wishlistResolvers', () => {
  return {
    Query: {
      wishlists: () => ({
        items: { length: 0 },
      }),
    },
    Mutation: {
      createWishlist: () => '1',
    },
  };
});

const mockDataSources = {
  customer: {
    getCustomer: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesWishListCreateWhenEmpty = {
  magento: {
    customer: mockDataSources.customer,
  },
};

describe('wishListCreateWhenEmpty', () => {
  const wishListCreateWhenEmpty = resolver.Query.wishlists as Function;

  const _source = {};
  const dataSources = dataSourcesWishListCreateWhenEmpty;
  const context = {
    storeCode: 'CDS',
    dataSources,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('wishListCreateWhenEmpty should run properly when item equal 0', async () => {
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1' }));
    await wishListCreateWhenEmpty(null, _source, context, null);
    expect(dataSources.magento.customer.getCustomer).toBeCalledWith(context.storeCode);
  });
});
