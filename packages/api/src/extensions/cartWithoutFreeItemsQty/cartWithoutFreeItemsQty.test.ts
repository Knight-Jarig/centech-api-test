import { typeDef, resolver } from './index';

describe('cartWithoutFreeItemsQty', () => {
  const cartItemsQty = resolver.Cart.items_qty as Function;
  const cartMiniItemsQty = resolver.CartMini.items_qty as Function;

  it('cartWithoutFreeItemsQty should run properly', async () => {
    const items_qty = 1;
    const extension_attributes = {
      free_items_qty: 0,
    };
    const result = await cartItemsQty({ items_qty, extension_attributes });
    expect(result).toEqual(1);
  });

  it('cartWithoutFreeItemsQty should run properly', async () => {
    const items_qty = 1;
    const extension_attributes = {
      free_items_qty: 0,
    };
    const result = await cartMiniItemsQty({ items_qty, extension_attributes });
    expect(result).toEqual(1);
  });
});
