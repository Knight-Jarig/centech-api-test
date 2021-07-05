import { typeDef, resolver } from './index';

const mockDataSources = {
  cart: {
    updateStore: () => new Promise(resolve => resolve(true)),
    editCartItem: () => new Promise(resolve => resolve(true)),
  },
  cartGuest: {
    updateStore: () => new Promise(resolve => resolve(true)),
    editCartItem: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  magento: {
    cart: mockDataSources.cart,
    cartGuest: mockDataSources.cartGuest,
  },
};

describe('cartWithLineItem', () => {
  const editCartItem = resolver.Mutation.editCartItem as Function;

  const _source = {};
  const params = {
    isGuest: true,
    input: {
      quote_id: '1',
      extension_attributes: {
        allocated_store_id: '1',
        quote_item_group: [],
      },
    },
  };
  const dataSources = dataSourcesOrder;
  const storeCode = 'cds_th';

  it('cartWithLineItem should run properly with guest status', async () => {
    const { input: editCartItemInput } = params;
    const {
      quote_id,
      extension_attributes: { allocated_store_id, quote_item_group },
    } = editCartItemInput;
    const updateStoreInput = {
      updateData: {
        cart_id: quote_id,
        quote_item_group,
        extension_attributes: {
          allocated_store_id,
        },
      },
    };
    jest.spyOn(dataSources.magento.cartGuest, 'updateStore').mockReturnValue(Promise.resolve([]));
    jest.spyOn(dataSources.magento.cartGuest, 'editCartItem').mockReturnValue(Promise.resolve([]));
    await editCartItem(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.cartGuest.updateStore).toBeCalledWith(updateStoreInput, storeCode);
  });

  it('cartWithLineItem should run properly with not guest status', async () => {
    params.isGuest = false;
    const { input: editCartItemInput } = params;
    const {
      quote_id,
      extension_attributes: { allocated_store_id, quote_item_group },
    } = editCartItemInput;
    const updateStoreInput = {
      updateData: {
        cart_id: quote_id,
        quote_item_group,
        extension_attributes: {
          allocated_store_id,
        },
      },
    };
    jest.spyOn(dataSources.magento.cart, 'updateStore').mockReturnValue(Promise.resolve([]));
    jest.spyOn(dataSources.magento.cart, 'editCartItem').mockReturnValue(Promise.resolve([]));
    await editCartItem(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.cart.updateStore).toBeCalledWith(updateStoreInput, storeCode);
  });
});
