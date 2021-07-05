import { ResolverContext } from '../../types';
import cartModel from '../../transform/cart.model';
import merge from 'lodash/merge';
import productModel from '../../transform/product.model';
import {
  IAddCouponResponse,
  IAddToCartResponse,
  IBurnPointResponse,
  ICart,
  ICartInterface,
  ICartItemResolvers,
  IDeleteCouponResponse,
  IDeleteItemStatus,
  IDeletePointResponse,
  IEditCartItemResponse,
  IFreeItemAddedResolvers,
  IFreeItemResolvers,
  IMutationResolvers,
  IProduct,
  IQueryResolvers,
  IResponseMessage,
  ITheOneAccountInfo,
  IListStorePickUp,
} from '../../types/graphql';
import { CoreAPIDataSources } from '../../dataSource';
import { ApplicationError } from '../../error/ApplicationError';
import { IPayloadGetStoreListFilter } from './cartResolverType';
import { buildPayloadFilterGroup } from './cartTransformer';

const FreeItem: IFreeItemResolvers<ResolverContext> = {
  product: getProductBySku,
};

const FreeItemAdded: IFreeItemAddedResolvers<ResolverContext> = {
  product: getProductBySku,
};

const CartItem: ICartItemResolvers<ResolverContext> = {
  product: getProductBySku,
  total_price({ row_total_incl_tax, discount_amount }) {
    return row_total_incl_tax - discount_amount;
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async cart(_source, { isGuest, cartId }, { dataSources, storeCode, bu, customerToken }): Promise<ICartInterface> {
    const isInValidCustomer = !isGuest && !customerToken;
    if (isInValidCustomer) throw new ApplicationError('no customerToken');

    const cart = isGuest
      ? await getCartGuestWrapper(cartId, dataSources, storeCode, bu)
      : await getCartMineWrapper(dataSources, storeCode);

    return cartModel.transform(cart);
  },
  async cartMini(_source, { isGuest, cartId }, { dataSources, storeCode }): Promise<ICartInterface> {
    const operations = {
      guest: {
        getCart: async () => {
          if (!cartId) throw new ApplicationError('cart id not exist.');
          const miniCart = await dataSources.magento.cartGuest.getCartGuestMini(cartId);
          return {
            ...miniCart,
            guest_id: cartId,
          };
        },
        createCart: async () => {
          const newGuestCartId = await dataSources.magento.cartGuest.createCartGuest(storeCode);
          const miniCart = await dataSources.magento.cartGuest.getCartGuestMini(newGuestCartId);
          return {
            ...miniCart,
            guest_id: newGuestCartId,
          };
        },
      },
      customer: {
        getCart: () => dataSources.magento.cart.getCartMineMini(),
        createCart: async () => {
          const newCartId = await dataSources.magento.cart.createCartMine(null, storeCode);
          const miniCart = await dataSources.magento.cartId.getCartByID(storeCode, newCartId);
          return miniCart;
        },
      },
    };

    const role = isGuest ? 'guest' : 'customer';
    const { getCart, createCart } = operations[role];
    const cart = await getCartMini(getCart, createCart);

    return cartModel.transform(cart);
  },
  async shippingSlotInfoHdl(_source, { cartId, address }, { dataSources }) {
    const data = await dataSources.magento.cartId.getShippingSlotInfoHdl(address, cartId);
    return data;
  },
  async storePickUp(
    _source,
    { isGuest, cartId, filters: filtersGroups },
    { dataSources, customerToken, storeCode },
  ): Promise<IListStorePickUp> {
    const payload: IPayloadGetStoreListFilter = buildPayloadFilterGroup(filtersGroups);

    if (isGuest) {
      if (cartId) {
        return await dataSources.magento.cartGuest.getStoreList(cartId, payload, storeCode);
      } else {
        throw new ApplicationError('no cartId');
      }
    } else {
      if (customerToken) {
        return await dataSources.magento.cart.getStoreList(payload, storeCode);
      } else {
        throw new ApplicationError('no customerToken');
      }
    }
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async editCartItem(_source, { id, isGuest, item_id, input }, { dataSources }): Promise<IEditCartItemResponse> {
    return isGuest
      ? await dataSources.magento.cartGuest.editCartItem(id, item_id, input)
      : await dataSources.magento.cart.editCartItem(item_id, input);
  },
  async addCartItem(_source, { isGuest, cartId, input }, { dataSources, storeCode }): Promise<IAddToCartResponse> {
    let qouteIdFromCart = null;

    // add logic to able add to cart when cart data not exist.
    if (!isGuest && !input.quote_id) {
      const cart = await getCartMineWrapper(dataSources, storeCode);
      qouteIdFromCart = cart.id;
    }

    const inputParam = {
      ...input,
      quote_id: input.quote_id ? input.quote_id : qouteIdFromCart,
    };

    return isGuest
      ? await dataSources.magento.cartGuest.addCartGuestItem(cartId, inputParam)
      : await dataSources.magento.cart.addCartMineItem(inputParam);
  },
  async deleteCartItem(_source, { guest, item_id }, { dataSources, customerToken }): Promise<IDeleteItemStatus> {
    const data =
      guest || !customerToken
        ? await dataSources.magento.cartGuest.deleteCartGuestItem(guest, item_id)
        : await dataSources.magento.cart.deleteCartMineItem(item_id);
    return {
      success: data === true,
      message: data === true ? 'success' : data,
    };
  },
  async addCoupon(_source, { coupon, isGuest, cartId }, { dataSources }): Promise<IAddCouponResponse> {
    const data = isGuest
      ? await dataSources.magento.cartGuest.addCoupon(cartId, coupon)
      : await dataSources.magento.cart.addCoupon(coupon);

    const couponType = typeof data === 'string' ? 'multi' : 'single';
    const couponList = coupon.split(',');
    const validCouponByType = {
      multi: () => data.split(','),
      single: () => couponList,
    };
    const validCoupon = validCouponByType[couponType]();
    const invalidCoupon = couponList.filter(couponCode => !validCoupon.includes(couponCode));

    return {
      message: data ? 'success' : 'error',
      valid_coupon: validCoupon,
      invalid_coupon: invalidCoupon,
    };
  },
  async deleteCoupon(_source, { isGuest, cartId }, { dataSources }): Promise<IDeleteCouponResponse> {
    const data = isGuest
      ? await dataSources.magento.cartGuest.deleteCoupon(cartId)
      : await dataSources.magento.cart.deleteCoupon();

    return {
      message: data ? 'success' : 'error',
    };
  },
  async loginT1(_source, { input, isGuest, guestToken }, { dataSources }): Promise<ITheOneAccountInfo> {
    const { email, password } = input;
    let response = {};

    try {
      if (isGuest) {
        response = await dataSources.magento.cartGuest.loginT1GuestCart(guestToken, {
          email,
          password,
        });
      } else {
        response = await dataSources.magento.cart.loginT1({ email, password });
      }
    } catch (e) {
      throw ApplicationError.create(e);
    }

    if (!response) throw new ApplicationError('can not login');
    return response;
  },
  async burnPoint(_source, { points, isGuest, cartId }, { dataSources, storeCode }): Promise<IBurnPointResponse> {
    const data = isGuest
      ? await dataSources.magento.cartGuest.burnPoint(points, cartId, storeCode)
      : await dataSources.magento.cart.burnPoint(points, storeCode);
    return {
      message: data?.message,
      all_item_applied_t1c_rule: !!data?.all_items_applied_t1c_rule,
    };
  },
  async deletePoint(_source, { isGuest, cartId }, { dataSources }): Promise<IDeletePointResponse> {
    const data = isGuest
      ? await dataSources.magento.cartGuest.deletePoint(cartId)
      : await dataSources.magento.cart.deletePoint();
    return {
      message: data ? 'success' : 'error',
    };
  },

  async addGiftWrapMessage(_source, { input }, { dataSources }): Promise<IResponseMessage> {
    const data = input.isGuest
      ? await dataSources.magento.cartGuest.addGiftWrapMessage(input.cartId, input.message)
      : await dataSources.magento.cart.addGiftWrapMessage(input.message);
    return {
      message: data ? 'success' : 'error',
    };
  },

  async deleteGiftWrapMessage(_source, { input }, { dataSources }): Promise<IResponseMessage> {
    const data = input.isGuest
      ? await dataSources.magento.cartGuest.deleteGiftWrapMessage(input.cartId)
      : await dataSources.magento.cart.deleteGiftWrapMessage();
    return {
      message: data ? 'success' : 'error',
    };
  },
  async restoreShippingAssignment(_source, { input }, { dataSources }): Promise<IResponseMessage> {
    const data = await dataSources.magento.admin.restoreShippingAssignment(input.cartId);
    return {
      message: data === true ? 'success' : 'error',
    };
  },
};

async function getCartMini(getCart: () => Promise<ICart>, createCart: () => Promise<ICart>) {
  try {
    const miniCart = await getCart();

    if (!miniCart.id) {
      throw new ApplicationError('no active cart');
    }

    return miniCart;
  } catch (error) {
    return createCart();
  }
}

async function getCartMineWrapper(dataSources: CoreAPIDataSources, storeCode: string) {
  try {
    const [cart, totals] = await Promise.all([
      dataSources.magento.cart.getCartMine(storeCode),
      dataSources.magento.cart.getCartMineTotals(storeCode),
    ]);
    return {
      ...cart,
      totals,
      items: merge(cart.items, totals.items),
    };
  } catch (error) {
    const cartId = await dataSources.magento.cart.createCartMine(null, storeCode);
    const cart = await dataSources.magento.cartId.getCartByID(storeCode, cartId);
    const totals = await dataSources.magento.cartId.getCartTotalsByID(storeCode, cartId);
    return {
      ...cart,
      totals,
      items: merge(cart.items, totals.items),
    };
  }
}

async function getCartGuestWrapper(
  guest: string | undefined,
  dataSources: CoreAPIDataSources,
  storeCode: string,
  bu: string,
) {
  try {
    if (!guest) {
      throw new ApplicationError('no guest id');
    }

    const [cart, totals] = await Promise.all([
      dataSources.magento.cartGuest.getCartGuest(guest, storeCode),
      dataSources.magento.cartGuest.getCartGuestTotals(guest, storeCode),
    ]);
    return {
      ...cart,
      totals,
      items: merge(cart.items, totals.items),
      guest_id: guest,
    };
  } catch (error) {
    let newGuestId: string;
    if (bu === 'pwb') {
      newGuestId = await dataSources.magento.cartGuest.restoreCartGuest(storeCode, guest);
    } else {
      newGuestId = await dataSources.magento.cartGuest.createCartGuest(storeCode);
    }
    const [cart, totals] = await Promise.all([
      dataSources.magento.cartGuest.getCartGuest(newGuestId, storeCode),
      dataSources.magento.cartGuest.getCartGuestTotals(newGuestId, storeCode),
    ]);
    return {
      ...cart,
      totals,
      items: merge(cart.items, totals.items),
      guest_id: newGuestId,
    };
  }
}

async function getProductBySku({ sku }, _, { dataSources, storeCode }: ResolverContext): Promise<IProduct> {
  const product = await dataSources.magento.product.findBySku({
    storeCode,
    sku,
  });

  return productModel.transform(product);
}

export default {
  CartItem,
  FreeItem,
  FreeItemAdded,
  Query,
  Mutation,
};
