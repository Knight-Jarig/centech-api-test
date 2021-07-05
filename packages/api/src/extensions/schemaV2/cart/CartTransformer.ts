import {
  IV2Cart as ICart,
  IV2CartMini as ICartMini,
  IV2CartFlag as ICartFlag,
  IV2CartSeller as ICartSeller,
  IV2CartFreeItem as ICartFreeItem,
  IV2CartCouponCode as ICartCouponCode,
  IV2CartPriceBreakdown as ICartPriceBreakdown,
  IV2CartItem as ICartItem,
  IV2CartPriceBreakdownThe1Redemption as ICartPriceBreakdownThe1Redemption,
  IV2ConfigurableProduct as IConfigurableProduct,
  IV2Product as IProduct,
  IV2ConfigurableProduct as IProductConfigurable,
  IV2ProductOption as IProductOption,
  IV2Seller as ISeller,
  IV2FreeShippingOffer as IFreeShippingOffer,
  IV2SummarySection as ISummarySection,
  IV2StockInvalidFlag as IStockInvalidFlag,
  IV2StoresLocationAddress,
  IV2ListStorePickUp,
  IListStorePickUp,
  IStoreItemAddress,
  IStoreItem,
  IStoreItemExtensionAttributesAdditionalText,
  IV2StoresLocationAdditionalText,
  IV2StoreItem,
  IV2SearchConditionsSortersQuery,
  IV2SearchConditionsQuery,
  IV2SearchConditionsFiltersQuery,
  IV2AddCartItemInput as IAddCartItemInput,
  IV2AddCartItemResponse as IAddCartItemResponse,
  IV2CartGiftWrapping,
} from '../../../types/graphql';
import { IPayloadGetStoreListFilter, ISearchConditions } from '../../../schema/cart/cartResolverType';
import {
  MDCCart,
  MDCCartTotal,
  MDCCartMini,
  MDCPickupStoresLocationAdditionalText,
  MDCCartItemFreeItemAdded,
  MDCAddCartItemResponse,
  ConfigurableItemOptions,
} from '../../../dataSource/magento/cart/MagentoCartResponse';
import { getDistrict, getProvince, getSubDistrict } from '../address/AddressTransformer';
import { transformPickupStoresLocationTimeLabel } from '../shipping/ShippingTransform';
import { uniq, uniqBy } from '../utils';
import { MDCTotalSegmentsThe1, MDCGiftMessage } from '../types/mdc-type';
import config from '../../../configs/vars';
import reverse from 'lodash/reverse';
import groupBy from 'lodash/groupBy';
import { PayloadAddCartItem as IPayloadAddCartItem } from './Cart';

enum TotalSegment {
  giftwrapping = 'giftwrapping',
  discount = 'discount',
  creditCardOnTop = 'credit_card_on_top',
  shipping = 'shipping',
  amastyCouponAmount = 'amasty_coupon_amount',
  t1c = 't1c',
}

export function getCartPriceBreakdown(cartTotal: MDCCartTotal): ICartPriceBreakdown {
  const giftWrappingPrice = this.getGiftWrappingPrice(cartTotal);
  return {
    subtotal: cartTotal.base_subtotal_incl_tax || 0,
    totalWithoutShipping: cartTotal.extension_attributes.total_without_shipping_fee || 0,
    subtotalWithDiscount: cartTotal.subtotal_with_discount || 0,
    discount: cartTotal.discount_amount,
    vat: cartTotal.tax_amount,
    grandTotal: cartTotal.base_grand_total,
    giftWrapping: giftWrappingPrice,
    shipping: parseFloat(cartTotal.total_segments.find(({ code }) => code === TotalSegment.shipping)?.value ?? '0'),
    creditCardOnTop: this.getCreditCardOnTopAmount(cartTotal),
    the1Redemption: this.getThe1Redemption(cartTotal),
    totalQty: countTotalQty(cartTotal),
  };
}

function countTotalQty(cartTotal: MDCCartTotal): number {
  return cartTotal.items.filter(item => item.price > 0).length;
}

export function getOtherDiscount(cartTotal: MDCCartTotal): number {
  const coupons = this.getCouponCodes(cartTotal);
  const the1RedemptionAmount = this.getThe1Redemption(cartTotal).discount;
  const creditCardOnTopAmount = this.getCreditCardOnTopAmount(cartTotal);
  const discount = cartTotal.total_segments.find(({ code }) => code === TotalSegment.discount);

  if (discount) {
    const couponsAmount = coupons.reduce((a, b) => {
      return a + b.amount;
    }, 0);

    return discount.value + couponsAmount + the1RedemptionAmount + creditCardOnTopAmount;
  }

  return 0;
}

export function getCartFlag(cartTotal: MDCCartTotal): ICartFlag[] {
  const giftWrappingFlag = this.getGiftWrappingFlag(cartTotal);

  const flags = [{ enabled: giftWrappingFlag, value: ICartFlag.GiftWrapping }];

  return flags.filter(({ enabled }) => enabled).map(({ value }) => value);
}

export function getGiftWrappingPrice({ total_segments: totalSegments }): number {
  const giftWrappingData = totalSegments.find(({ code }) => code === TotalSegment.giftwrapping);

  return parseFloat(giftWrappingData?.extension_attributes?.gw_price || '0');
}

export function getGiftWrappingFlag({ total_segments: totalSegments }): boolean {
  const giftWrappingData = totalSegments.find(({ code }) => code === TotalSegment.giftwrapping);

  return !!giftWrappingData?.extension_attributes?.gw_order_id;
}

export function getSummarySection(cartTotal: MDCCartTotal): ISummarySection[] {
  const totalSegments = cartTotal.total_segments;
  const otherDiscountAmount = this.getOtherDiscount(cartTotal);
  const otherDiscountData = otherDiscountAmount
    ? {
        code: 'other_discount',
        title: 'other_discount',
        value: otherDiscountAmount,
      }
    : null;

  let creditCardOnTopData = totalSegments.find(({ code }) => code === TotalSegment.creditCardOnTop);
  const creditCardOnTopAmount = this.getCreditCardOnTopAmount(cartTotal);
  creditCardOnTopData = { ...creditCardOnTopData, value: creditCardOnTopAmount };

  const shippingData = totalSegments.find(({ code }) => code === TotalSegment.shipping);

  const sections = [
    ...(otherDiscountData ? [otherDiscountData] : ([] as any)),
    ...(creditCardOnTopData && creditCardOnTopAmount ? [creditCardOnTopData] : ([] as any)),
    ...(shippingData ? [shippingData] : ([] as any)),
  ];

  return sections
    .map(section => ({
      id: section.code,
      title: section.title,
      amount: section.value,
    }))
    .filter(({ amount }) => {
      return amount !== null;
    });
}

export function getCreditCardOnTopAmount({ total_segments: totalSegments }): number {
  const creditCardOnTopData = totalSegments.find(({ code }) => code === TotalSegment.creditCardOnTop);

  return parseFloat(creditCardOnTopData.value.map(item => JSON.parse(item))[0].discount_amount ?? 0);
}

export function getThe1Redemption({ total_segments: totalSegments }): ICartPriceBreakdownThe1Redemption {
  const the1RedemptionSegment = totalSegments
    .find(({ code }) => code === TotalSegment.t1c)
    .value.map(item => JSON.parse(item))[0] as MDCTotalSegmentsThe1;

  return {
    point: parseFloat(the1RedemptionSegment.t1c_points ?? '0'),
    discount: parseFloat(the1RedemptionSegment.discount_amount ?? '0'),
  };
}

export function getCouponCodes({ total_segments: totalSegments }): ICartCouponCode[] {
  const couponData = totalSegments.find(({ code }) => code === TotalSegment.amastyCouponAmount)?.value ?? [];
  const couponCodes = couponData
    .map(value => {
      const values = JSON.parse(value);
      if (!values.coupon_code) return null;

      return {
        id: values.coupon_code,
        code: values.coupon_code.toUpperCase(),
        amount: parseFloat(values.coupon_amount_base),
      };
    })
    .filter(({ id }) => id);

  return uniq(couponCodes);
}

export function getFreeShippingOffer({ extension_attributes }: MDCCart): IFreeShippingOffer {
  return { message: extension_attributes?.free_shipping_offer?.message ?? '' };
}

export function mappingProductBySKU(products: IProduct[]) {
  return products.reduce((memo, product) => {
    memo[product.sku] = product;

    return memo;
  }, {} as Record<string, IProduct>);
}

export function getPriceBreakdownById(cartTotal: MDCCartTotal) {
  return cartTotal.items
    .map(item => {
      return {
        id: item.item_id.toString(),
        subtotal: item.base_price_incl_tax,
        discount: item.base_discount_amount,
        vat: item.tax_amount,
        grandTotal: item.base_row_total_incl_tax,
      };
    })
    .reduce((memo, item) => {
      memo[item.id] = item;

      return memo;
    }, {});
}

export function getFreeItemInCart({ items: cartItems }: MDCCart, products: IProduct[]): ICartFreeItem[] {
  const freeItems = cartItems.filter(item => item.price === 0);
  const freeItemAddedSkus = cartItems.reduce((acc, cur) => {
    const skus = cur?.extension_attributes.free_items_added?.map(freeItemsAdded => freeItemsAdded.sku) || [];
    acc = [...acc, ...skus];
    return acc;
  }, []);

  const freeItemsInCart = freeItems.filter(freeItem => {
    return !freeItemAddedSkus.includes(freeItem.sku);
  });

  const productsBySku = this.mappingProductBySKU(products);
  return freeItemsInCart.map(item => ({
    id: item.item_id.toString(),
    quantity: item.qty,
    product: productsBySku[item.sku],
    productOptions: [], // simple product only
  }));
}

function getStockInvalidFlag(item: MDCCartItemFreeItemAdded): IStockInvalidFlag {
  if (item.intent_qty <= item.qty) {
    return item.qty === 0 ? IStockInvalidFlag.OutOfStock : IStockInvalidFlag.NotEnoughStock;
  }
  return null;
}

export function getItemsBySeller({ items: cartItems }, cartTotal: MDCCartTotal, products: IProduct[]): ICartSeller[] {
  const items = cartItems.filter(item => item.price !== 0);
  const freeItemsAll = cartItems.filter(item => item.price === 0);
  const productsBySku = this.mappingProductBySKU(products);
  const priceBreakdownById = this.getPriceBreakdownById(cartTotal);
  const itemsMapped = items
    .map(item => {
      const parent = (productsBySku[item.extension_attributes.parent_sku] as IConfigurableProduct) ?? null;
      const childSelected = parent?.children?.find(child => {
        return child.product.sku === item.sku;
      });

      const freeItems = freeItemsAll.filter(freeItemAll => {
        const isFreeItemInItem = item?.extension_attributes?.free_items_added?.find(
          freeItem => freeItem.sku === freeItemAll.sku,
        );

        return isFreeItemInItem;
      });

      return {
        id: item.item_id.toString(),
        quantity: item.qty,
        priceBreakdown: priceBreakdownById[item.item_id],
        product: productsBySku[item.sku],
        productOptions: childSelected?.options ?? [],
        parent,
        freeItems: freeItems.map(freeItem => ({
          id: freeItem.item_id.toString(),
          quantity: freeItem.qty,
          product: productsBySku[freeItem.sku],
          productOptions: [], // simple product only
          stockInvalid: getStockInvalidFlag(item),
        })),
        type: item.product_type,
      } as ICartItem;
    })
    .filter(item => item.product);

  const sellersProduct = groupBy(itemsMapped, item => item.product.seller.id);
  const sellers = itemsMapped.map(item => item.product.seller);
  const sellerBU = sellers.find(seller => seller.id === config.bu);

  return uniqBy([sellerBU ?? [], ...sellers] as ISeller[], seller => seller.id).map(seller => ({
    id: seller.id,
    name: seller.name,
    items: sellersProduct[seller.id],
  }));
}

export function transformCart(cart: MDCCart, cartTotal: MDCCartTotal, products: IProduct[]): ICart {
  cart.items = reverse(cart.items);
  const flags = this.getCartFlag(cartTotal);
  const priceBreakdown = this.getCartPriceBreakdown(cartTotal);
  const couponCodes = this.getCouponCodes(cartTotal);
  const summarySection = this.getSummarySection(cartTotal);
  const freeShippingOffer = this.getFreeShippingOffer(cart);
  const sellers = this.getItemsBySeller(cart, cartTotal, products);
  const freeItems = this.getFreeItemInCart(cart, products);
  return {
    id: cart.id.toString(),
    sellers,
    freeItems,
    flags,
    priceBreakdown,
    couponCodes,
    summarySection,
    freeShippingOffer,
    isPaymentPromotionLocked: !!cart.extension_attributes.is_payment_promotion_locked,
  };
}

export function transformCartMini(cartMini: MDCCartMini): ICartMini {
  return {
    id: cartMini.id?.toString(),
    itemCount: parseInt(cartMini.items_count),
    itemQuantity: parseInt(cartMini.items_qty),
  };
}

export function transformStorePickUp(response: IListStorePickUp): IV2ListStorePickUp {
  return {
    page: response.page_cur,
    total: response.page_total,
    isResultFromGoogle: response.is_result_from_google,
    storeList: response.store_list?.map(tmpStoreList => transformListStore(tmpStoreList)) || [],
  };
}

function transformListStore(store: IStoreItem): IV2StoreItem {
  return {
    id: store.id,
    name: store.name,
    code: store.store_code,
    address: transformAddress(store.address),
    distance: store.extension_attributes?.distance,
    openingHours: (store.extension_attributes as any)?.opening_hours,
    additionalText: transformAdditionalText(store.extension_attributes?.additional_text),
  };
}

function transformAddress(address: IStoreItemAddress): IV2StoresLocationAddress {
  return {
    addressLine: address?.street,
    postcode: address?.post_code,
    latitude: address?.latitude,
    longitude: address?.longitude,
    subDistrict: getSubDistrict({ subdistrict: address?.sub_district, subdistrict_id: address?.sub_district_id }),
    district: getDistrict({ district: address?.district, district_id: address?.district_id }),
    province: getProvince(address),
    countryCode: address?.country_code,
    telephone: address?.contact_number,
  };
}
function transformAdditionalText(
  additionalText: IStoreItemExtensionAttributesAdditionalText,
): IV2StoresLocationAdditionalText {
  return {
    totalAvailable: additionalText?.extension_attributes.additional_text_variable.total_available,
    totalOrdered: additionalText?.extension_attributes.additional_text_variable.total_ordered,
    timeUnit: additionalText?.time_unit,
    timeLabel: additionalText
      ? transformPickupStoresLocationTimeLabel(additionalText as MDCPickupStoresLocationAdditionalText)
      : null,
  };
}

export function buildPayloadFilterGroup(filtersGroups: IV2SearchConditionsQuery): IPayloadGetStoreListFilter {
  const payload = {} as IPayloadGetStoreListFilter;
  const searchCondition = {} as ISearchConditions;
  if (filtersGroups?.filters || filtersGroups?.sorters) {
    if (filtersGroups.filters) {
      searchCondition.filters = filtersGroups.filters as [IV2SearchConditionsFiltersQuery];
    }
    if (filtersGroups.sorters) {
      searchCondition.sorters = filtersGroups.sorters as [IV2SearchConditionsSortersQuery];
    }
    payload.searchConditions = searchCondition;
  }

  payload.page_cur = filtersGroups?.page || 1;
  if (filtersGroups?.limit) {
    payload.page_size = filtersGroups?.limit;
  }

  return payload;
}

export function buildPayloadAddCartItem(input: IAddCartItemInput, cartId: string): IPayloadAddCartItem {
  return {
    quote_id: cartId,
    qty: input.quantity,
    sku: input.sku,
    product_option: input.productOptions
      ? {
          extension_attributes: {
            configurable_item_options: input.productOptions.map(option => {
              return {
                option_id: option.id,
                option_value: option.value,
              };
            }),
          },
        }
      : null,
  };
}

export function transformAddCartItem(response: MDCAddCartItemResponse, products: IProduct[]): IAddCartItemResponse {
  const productsBySku = this.mappingProductBySKU(products);
  const parent = response?.extension_attributes?.parent_sku
    ? productsBySku[response.extension_attributes.parent_sku]
    : null;

  return {
    id: response.item_id.toString(),
    quantity: response.qty,
    product: productsBySku[response.sku],
    productOptions: mappingProductOptions(
      response?.product_option?.extension_attributes?.configurable_item_options,
      parent,
    ),
    parent,
  };
}

function mappingProductOptions(options: ConfigurableItemOptions[], product: IProductConfigurable): IProductOption[] {
  if (!options || options?.length === 0 || !product) {
    return [];
  }

  const optionsChild = product.children.map(child => {
    return { ...child.options.reduce((_, cur) => ({ ...cur }), {}) } as IProductOption;
  });

  return optionsChild.filter(option =>
    options.some(
      productOption => productOption.option_id == option.id && productOption.option_value.toString() == option.value.id,
    ),
  );
}
export function transformCartGiftWrapping(response: MDCGiftMessage): IV2CartGiftWrapping {
  return {
    giftMessageId: response.gift_message_id,
    customerId: response.customer_id,
    message: response.message === 'N/A' ? '' : response.message,
  };
}
