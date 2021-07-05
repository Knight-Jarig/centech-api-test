import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { MDCStoreConfig } from '../types/mdc-store-config';
import {
  IV2CartInput,
  IV2Cart as ICart,
  IV2CartMini as ICartMini,
  IV2StorePickUpInput,
  IV2DeleteGiftWrappingInput,
  IV2AddCouponResponse,
  IV2DeleteCouponResponse,
  IV2CartChangeQuantityResponse,
  IV2CartChangeGiftWrappingResponse,
  IV2CartDeleteGiftWrappingResponse,
  IV2CartAddGiftWrappingInput,
  IV2CartAddGiftWrappingResponse,
  IV2ListStorePickUp,
  IResponseMessage,
  IV2AddCartItemInput as IAddCartItem,
  IV2AddCartItemResponse as IAddCartItemResponse,
  IV2CartGiftWrapping,
  IV2CartGiftWrappingInput,
} from '../../../types/graphql';
import { MDCCart, MDCCartTotal, MDCCartMini } from '../../../dataSource/magento/cart/MagentoCartResponse';
import { MDCGiftMessage } from '../types/mdc-type';
import { ProductUseCase } from '../products/ProductUseCase';
import {
  transformCart,
  transformCartMini,
  transformStorePickUp,
  buildPayloadFilterGroup,
  buildPayloadAddCartItem,
  transformAddCartItem,
  transformCartGiftWrapping,
} from './CartTransformer';
import { IPayloadGetStoreListFilter } from '../../../schema/cart/cartResolverType';
import difference from 'lodash/difference';
import { ApplicationError } from '../../../error/ApplicationError';
import { PayloadAddCartItem as IPayloadAddCartItem } from './Cart';

export interface CartUseCaseOptions {
  magento: MagentoDataSource;
  productUseCase: ProductUseCase;
}

export interface ChangeQtyInput {
  itemId: number;
  quantity: number;
  cartId: number;
  guestId?: string;
}

export interface addCouponInput {
  coupon: string;
  guestId?: string;
}

export interface deleteCartItemInput {
  itemId: number;
  guestId?: string;
}

export interface deleteCouponInput {
  guestId?: string;
}

export class CartUseCase {
  private store?: MDCStoreConfig;
  private locale = 'en';
  private role: 'member' | 'guest' = 'guest';
  private token: string;

  private magento: MagentoDataSource;
  private productUseCase: ProductUseCase;

  constructor({ magento, productUseCase }: CartUseCaseOptions) {
    this.magento = magento;
    this.productUseCase = productUseCase;
  }

  initialize(config): void {
    this.store = config.context.store;
    this.locale = config.context.locale;
    this.role = config.context.role;
    this.token = config.context.authToken;
  }

  async getCart(input: IV2CartInput): Promise<ICart> {
    let guestId = input?.guestId || '';
    let cart, cartTotal;
    try {
      [cart, cartTotal] = await Promise.all([this.dataSource.getCart(guestId), this.dataSource.getCartTotal(guestId)]);
    } catch {
      guestId = await this.dataSource.createCart();
      cart = await this.dataSource.getCart(guestId);
      cartTotal = await this.dataSource.getCartTotal(guestId);
    }

    const cartItems = cart?.items ?? [];
    const cartItemSkus = cartItems.map(item => item.sku);
    const parentSkus = cartItems.map(item => item.extension_attributes.parent_sku).filter(sku => sku);
    const skuAll = [...cartItemSkus, ...parentSkus];
    let products = [];

    if (skuAll.length > 0) {
      products = await this.productUseCase.findBySkusNew(skuAll);

      const missingSKUs = difference(
        skuAll,
        products.map(({ sku }) => sku),
      ).join(',');

      if (missingSKUs.length > 0) {
        console.warn('[Cart] Cannot find product with SKU: ' + missingSKUs);
      }
    }
    if (guestId === '') {
      guestId = null;
    }
    const cartResponse = transformCart(cart, cartTotal, products);
    cartResponse.guestId = guestId;
    return cartResponse;
  }

  async getPromotionCardName(guestId?): Promise<string> {
    const paymentInformation = await this.dataSource.getPromotionCardName(guestId);
    const promotionCardName = paymentInformation.extension_attributes.p2c2p_credit_card_promotions[0].card_name;
    return promotionCardName;
  }

  async getCartMini(input: IV2CartInput): Promise<ICartMini> {
    let guestId = input?.guestId || '';
    let cartMini;
    try {
      cartMini = await this.dataSource.getCartMini(guestId);
    } catch {
      guestId = await this.dataSource.createCart();
      cartMini = await this.dataSource.getCartMini(guestId);
    }

    const cartMiniResponse = transformCartMini(cartMini);
    if (guestId === '') {
      guestId = null;
    }
    cartMiniResponse.guestId = guestId;
    return cartMiniResponse;
  }

  async getGiftMessage(): Promise<string | null> {
    const response = await this.dataSource.giftMessage();

    if (Array.isArray(response)) return null;

    return response.message;
  }

  async getGiftWrappingMessage(input: IV2CartGiftWrappingInput): Promise<IV2CartGiftWrapping> {
    const response = await this.dataSource.giftMessage(input?.guestId);

    if (Array.isArray(response)) return null;

    return transformCartGiftWrapping(response);
  }

  async getStorePickUp(input: IV2StorePickUpInput): Promise<IV2ListStorePickUp> {
    const payload = buildPayloadFilterGroup(input?.filters);

    const response = input?.guestId
      ? await this.dataSource.getStorePickUp(payload, input.guestId)
      : await this.dataSource.getStorePickUp(payload);

    return transformStorePickUp(response);
  }

  async changeQTY(input: ChangeQtyInput): Promise<IV2CartChangeQuantityResponse> {
    const cartItem = {
      quote_id: this.role === 'member' ? input.cartId : input.guestId,
      qty: input.quantity,
      item_id: input.itemId,
    };
    await this.dataSource.editCartItem(input.itemId, cartItem, input.guestId);
    return { status: true };
  }

  async addCoupon(input: addCouponInput): Promise<IV2AddCouponResponse> {
    try {
      await this.dataSource.addCoupon(input.coupon, input.guestId);
      return {
        status: true,
        message: 'success',
      };
    } catch (e) {
      e.extensions.response.body.status = false;
      throw ApplicationError.create(e);
    }
  }

  async addGiftWrapMessage(input: IV2CartAddGiftWrappingInput): Promise<IV2CartAddGiftWrappingResponse> {
    await this.dataSource.addGiftWrapMessage(input.guestId, input.message?.trim() || 'N/A');
    return { status: true };
  }

  async deleteGiftWrapping(input: IV2DeleteGiftWrappingInput): Promise<IV2CartDeleteGiftWrappingResponse> {
    await this.dataSource.deleteGiftWrapMessage(input?.guestId);
    return { status: true };
  }

  async changeGiftWrapMessage(input: IV2CartAddGiftWrappingInput): Promise<IV2CartChangeGiftWrappingResponse> {
    await this.dataSource.addGiftWrapMessage(input.guestId, input.message?.trim() || 'N/A');
    return { status: true };
  }

  async deleteCartItem(input: deleteCartItemInput): Promise<IResponseMessage> {
    const result = await this.dataSource.deleteCartItem(input.itemId, input.guestId);
    return {
      status: !!result,
    };
  }

  async deleteCoupon(input?: deleteCouponInput): Promise<IV2DeleteCouponResponse> {
    try {
      await this.dataSource.deleteCoupon(input?.guestId || '');
      return {
        status: true,
        message: 'success',
      };
    } catch (e) {
      e.extensions.response.body.status = false;
      throw ApplicationError.create(e);
    }
  }

  async addCartItem(input: IAddCartItem): Promise<IAddCartItemResponse> {
    let cartId = input.guestId;

    if (!cartId) {
      const cart = await this.dataSource.getCart();
      cartId = `${cart.id}`;
    }
    const payload = buildPayloadAddCartItem(input, cartId);
    const response = await this.dataSource.addCartItem(payload, cartId);
    const parentSkus = response?.extension_attributes?.parent_sku ? [response.extension_attributes.parent_sku] : [];
    const skuAll = [response.sku, ...parentSkus];
    const products = await this.productUseCase.findBySkusNew(skuAll);

    return transformAddCartItem(response, products);
  }

  private get dataSource(): {
    getCart(guestId?: string): Promise<MDCCart>;
    getCartMini(guestId?: string): Promise<MDCCartMini>;
    getCartTotal(guestId?: string): Promise<MDCCartTotal>;
    giftMessage(guestId?: string): Promise<MDCGiftMessage | []>;
    getStorePickUp(payload: IPayloadGetStoreListFilter, guestId?: string);
    addCoupon(coupon: string, cartId?: string): Promise<boolean>;
    deleteCoupon(guestId?: string): Promise<boolean>;
    editCartItem(itemId: number, cartItem, guestId?: string);
    deleteGiftWrapMessage(cartId: string): Promise<boolean>;
    addGiftWrapMessage(cartId: string, message: string): Promise<boolean>;
    deleteCartItem(itemId: number, guestId?: string);
    createCart();
    addCartItem(payload: IPayloadAddCartItem, guestId?: string);
    getPromotionCardName(guestId?: string);
  } {
    const sources = {
      member: {
        getCart: () => this.magento.cart.getCartMine(this.store.code),
        getCartMini: () => this.magento.cart.getCartMineMini(),
        getCartTotal: () => this.magento.cart.getCartMineTotals(this.store.code),
        giftMessage: () => this.magento.cart.getGiftMessage(this.store.code),
        getStorePickUp: (payload: IPayloadGetStoreListFilter) =>
          this.magento.cart.getStoreList(payload, this.store.code),
        addCoupon: (coupon: string) => this.magento.cart.addCoupon(coupon),
        deleteCartItem: (itemId: number) => this.magento.cart.deleteCartMineItem(itemId),
        deleteCoupon: () => this.magento.cart.deleteCoupon(),
        editCartItem: (itemId: number, cartItem, guestId?: string) => this.magento.cart.editCartItem(itemId, cartItem),
        deleteGiftWrapMessage: () => this.magento.cart.deleteGiftWrapMessage(),
        addGiftWrapMessage: (cartId: string, message: string) => this.magento.cart.addGiftWrapMessage(message),
        createCart: () => this.magento.cart.createCartMine(this.token, this.store.code),
        addCartItem: (payload: IPayloadAddCartItem) => this.magento.cart.addCartMineItem(payload),
        getPromotionCardName: () => this.magento.cart.getPaymentInformation(this.store.code),
      },
      guest: {
        getCart: (guestId: string) => {
          if (!guestId) throw new Error("GuestId doesn't exist");
          return this.magento.cartGuest.getCartGuest(guestId, this.store.code);
        },
        getCartMini: (guestId: string) => {
          if (!guestId) throw new Error("GuestId doesn't exist");
          return this.magento.cartGuest.getCartGuestMini(guestId);
        },
        getCartTotal: (guestId: string) => {
          if (!guestId) throw new Error("GuestId doesn't exist");
          return this.magento.cartGuest.getCartGuestTotals(guestId, this.store.code);
        },
        giftMessage: (guestId: string) => this.magento.cartGuest.getGiftMessage(guestId, this.store.code),
        getStorePickUp: (payload: IPayloadGetStoreListFilter, guestId: string) =>
          this.magento.cartGuest.getStoreList(guestId, payload, this.store.code),
        deleteCartItem: (itemId: number, guestId?: string) =>
          this.magento.cartGuest.deleteCartGuestItem(guestId, itemId),
        addCoupon: (coupon: string, guestId: string) => this.magento.cartGuest.addCoupon(guestId, coupon),
        deleteCoupon: (guestId: string) => this.magento.cartGuest.deleteCoupon(guestId),
        editCartItem: (itemId: number, cartItem, guestId?: string) =>
          this.magento.cartGuest.editCartItem(guestId, itemId, cartItem),
        deleteGiftWrapMessage: (cartId: string) => this.magento.cartGuest.deleteGiftWrapMessage(cartId),
        addGiftWrapMessage: (cartId: string, message: string) =>
          this.magento.cartGuest.addGiftWrapMessage(cartId, message),
        createCart: () => this.magento.cartGuest.createCartGuest(this.store.code),
        addCartItem: (payload: IPayloadAddCartItem, guestId?: string) =>
          this.magento.cartGuest.addCartGuestItem(guestId, payload),
        getPromotionCardName: (guestId?: string) => this.magento.cartGuest.getPaymentInformation(guestId, this.store.code),
      },
    };

    return sources[this.role];
  }
}
