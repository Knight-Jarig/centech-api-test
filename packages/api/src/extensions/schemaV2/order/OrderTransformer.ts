import { DateTime } from 'luxon';
import { MDCStoreConfig } from '../types/mdc-store-config';
import {
  MagentoOrder as MDCOrder,
  OrderItem as MDCOrderItem,
  MDCOrderPackageStatusResponse as MDCOrderPackageStatus,
  MDCOrderPackageStatusItem,
  MDCOrderCouponsApplied,
  MDCOrderT1CRedeem,
} from '../../../dataSource/magento/order/MagentoOrderTypes';
import {
  IV2Order as IOrder,
  IFilterGroups,
  IV2OrderPackages,
  IV2OrderOtherCanceledItem,
  ISortOrder,
  IV2FilterInput as IFilterInput,
  IV2SortInput as ISortInput,
  IV2OrderItemGroupBySeller as IOrderItemGroupBySeller,
  IV2OrderPayment as IOrderPayment,
  IV2CouponCode as ICouponCode,
  IV2OrderPaymentThe1Redemption as IOrderPaymentThe1Redemption,
  IV2OrderShipping as IOrderShipping,
  IV2OrderAddress as IOrderAddress,
  IV2OrderItemOptions as IOrderItemOptions,
  IV2OrderItem as IOrderItem,
  IV2OrderPackages as IOrderPackages,
  IV2OrderOtherCanceledItem as IOrderOtherCanceledItem,
} from '../../../types/graphql';
import { getAddress } from '../address/AddressTransformer';

enum OrderCustomAttributes {
  brandName = 'brand_name',
  size = 'size',
  color = 'color',
  image = 'image',
}

export function mapInputSorts(sorts: ISortInput[]): ISortOrder[] {
  return sorts?.map(sort => ({
    field: sort.id,
    direction: sort.direction as any,
  }));
}

export function mapInputFilters(filters: IFilterInput[]): IFilterGroups[] {
  return filters.reduce((acc, cur) => {
    const mapFilters = cur.optionIds.map(value => ({
      field: cur.id,
      value,
      conditionType: cur.condition?.toLowerCase(),
    }));

    return [
      ...acc,
      {
        filters: mapFilters,
      },
    ];
  }, []);
}

function getOrderCustomAttributesValueByCode(item: MDCOrderItem, code: string): string {
  return (
    (item?.extension_attributes?.custom_attributes || []).find(customAttr => customAttr.attribute_code === code)
      ?.value || ''
  );
}

function getOrderProductOptions(orderItem: MDCOrderItem): IOrderItemOptions[] {
  const options = [OrderCustomAttributes.size, OrderCustomAttributes.color];

  return orderItem?.extension_attributes?.custom_attributes
    ?.filter(customAttr => options.includes(customAttr.attribute_code as any))
    .map(customAttr => ({
      attributeCode: customAttr.attribute_code,
      value: customAttr.value,
    }));
}

function getOrderProduct(
  packageItem: MDCOrderPackageStatusItem,
  packageStatus: MDCOrderPackageStatus,
  orderItems: MDCOrderItem[],
  { secure_base_media_url }: MDCStoreConfig,
): IOrderItem {
  const orderItem = orderItems.find(
    item => `${item.item_id}` === `${packageItem.item_id}` && item.sku === packageItem.product.sku
  );
  const imagePath = getOrderCustomAttributesValueByCode(orderItem, OrderCustomAttributes.image);
  return {
    sku: orderItem.sku,
    name: orderItem.name,
    itemId: `${orderItem.item_id}`,
    thumbnailUrl: imagePath ? `${secure_base_media_url}catalog/product${imagePath}` : '',
    brandName: getOrderCustomAttributesValueByCode(orderItem, OrderCustomAttributes.brandName),
    options: getOrderProductOptions(orderItem),
    quantity: +packageItem.qty,
    price: orderItem.row_total_incl_tax,
    status: packageItem.status || packageStatus.status,
    marketplaceType: orderItem?.extension_attributes?.marketplace_info?.marketplace_product_type?.toUpperCase()
  };
}

const getOtherCanceledItem = (
  packageStatus: MDCOrderPackageStatus,
  orderItems: MDCOrderItem[],
  store: MDCStoreConfig,
  orderStatus: string,
): IOrderOtherCanceledItem => {
  return {
    status: packageStatus.status || `${orderStatus}`,
    items: packageStatus.items.map(item => getOrderProduct(item, packageStatus, orderItems, store)),
  };
};

const getPackageItem = (
  packageStatus: MDCOrderPackageStatus,
  orderItems: MDCOrderItem[],
  store: MDCStoreConfig,
): IOrderPackages => {
  const items = packageStatus.items.map(item => getOrderProduct(item, packageStatus, orderItems, store));

  return {
    status: packageStatus.status,
    trackNumber: packageStatus.track_number,
    trackURL: packageStatus.track_url,
    shipmentProvider: packageStatus.shipment_provider,
    refNumber: packageStatus.ref_number,
    items,
    isMarketplaceInfo: !!items.find(item => item.marketplaceType)
  };
};


const getPackageItemGroupBySeller = (
  acc: any,
  cur: any,
  order: MDCOrder,
  store: MDCStoreConfig
  ): any => {
    const existSellerIndex = acc.findIndex(itemGroup => {
      return cur.sold_by ? itemGroup.sellerName === cur.sold_by : itemGroup.sellerName === null;
    });
    const otherItem = !cur.status ? getOtherCanceledItem(cur, order.items, store, order?.extension_attributes?.order_status) : null;
    const canceledItem = cur.status === 'canceled' ? getOtherCanceledItem(cur, order.items, store, order.extension_attributes.order_status) : null;
    const allPackage = cur.status && cur.status !== 'canceled' ? getPackageItem(cur, order.items, store) : null;

    return {
      existSellerIndex,
      otherItem,
      canceledItem,
      allPackage
    }
}

const configAccOnItemsGroupBySeller = (
  acc: any,
  existSellerIndex: number, 
  allPackage: IV2OrderPackages, 
  otherItem: IV2OrderOtherCanceledItem, 
  canceledItem: IV2OrderOtherCanceledItem
  ): any => {
  const existPackage = (itemGroup: IOrderItemGroupBySeller) => itemGroup?.packages || [];
  acc[existSellerIndex] = {
    ...acc[existSellerIndex],
    ...(allPackage ? { packages: [...existPackage(acc[existSellerIndex]), allPackage] } : []),
    ...(otherItem ? { otherItem } : []),
    ...(canceledItem ? { canceledItem } : []),
  }
  return acc;
}

const sortSellerName = (a, b) => {
  if (a.sellerName === b.sellerName) return 0;
  else if (a.sellerName === null) return -1;
  else if (b.sellerName === null) return 1;
  else return a.sellerName < b.sellerName ? -1 : 1;
};

const sortByItemStatus = (a, b) => (a.status < b.status ? 1 : (parseInt(a.item_id) - parseInt(b.item_id)));

const findDropShip = (cur: any, order: MDCOrder): boolean => {
  return cur.items.some(
    packageItem =>
      !!order.items.find(orderItem => {
        return (
          `${orderItem.item_id}` === `${packageItem.item_id}` &&
          !!cur.status &&
          orderItem?.extension_attributes?.marketplace_info?.marketplace_product_type === 'dropship'
        );
      }),
  );
}

export function getItemsGroupBySeller(
  packages: MDCOrderPackageStatus[],
  order: MDCOrder,
  store: MDCStoreConfig,
): IOrderItemGroupBySeller[] {
  return packages.reduce((acc, cur) => {

    const isDropShip = findDropShip(cur, order);

    if (isDropShip) {
      cur = {
        ...cur,
        sold_by: ''
      }
    }

    cur.items.sort(sortByItemStatus);
    
    const { existSellerIndex, otherItem, canceledItem, allPackage} = getPackageItemGroupBySeller(acc, cur, order, store);

    if (existSellerIndex > -1) {
      return configAccOnItemsGroupBySeller(acc, existSellerIndex, allPackage, otherItem, canceledItem);
    }

    const result = [
      ...acc,
      {
        sellerName: cur.sold_by || null,
        packages: allPackage ? [allPackage] : null,
        otherItem,
        canceledItem,
      },
    ];
    return result.sort(sortSellerName);
  }, []);
}

function getCouponCodes(couponsApplied: MDCOrderCouponsApplied[]): ICouponCode[] {
  return (
    couponsApplied?.map(coupon => ({
      id: coupon.coupon_code,
      code: coupon.coupon_code.toUpperCase(),
      amount: +coupon.coupon_amount_base || +coupon.discount_amount,
    })) || null
  );
}

function getOtherDiscount(
  allDiscount: number,
  couponCodes: ICouponCode[],
  t1cRedeem: IOrderPaymentThe1Redemption,
  creditCardOnTop,
): number {
  if (!allDiscount) return null;

  const couponDiscount =
    (couponCodes &&
      couponCodes.reduce((acc, cur) => {
        acc = acc + cur.amount;
        return acc;
      }, 0)) ||
    0;
  const creditCardOnTopDiscount = creditCardOnTop || 0;
  const t1cDiscount = t1cRedeem?.discount || 0;
  const result = allDiscount - couponDiscount - t1cDiscount - creditCardOnTopDiscount;

  return parseFloat(result.toFixed(2)) || null;
}

function getThe1Redemption(t1cRedeem: MDCOrderT1CRedeem): IOrderPaymentThe1Redemption {
  return t1cRedeem
    ? {
        point: parseFloat(t1cRedeem.points_redeem),
        discount: parseFloat(t1cRedeem.discount_amount),
      }
    : null;
}

function getPayment(order: MDCOrder): IOrderPayment {
  const couponsApplied = order?.extension_attributes?.coupons_applied;
  const the1Redemption = getThe1Redemption(order?.extension_attributes?.t1c_redeem);
  const creditCardOnTop = order?.extension_attributes?.credit_card_on_top_discount_amount;
  const couponCodes = getCouponCodes(couponsApplied);
  const discount = Math.abs(order.discount_amount);
  const hasGiftWrap = !!order.extension_attributes.gw_id;

  return {
    methodLabel: order?.extension_attributes?.payment_method_label,
    methodCode: order?.payment?.method,
    subtotal: order.subtotal_incl_tax,
    grandTotal: order.grand_total,
    discount,
    the1Redemption,
    creditCardOnTop,
    hasGiftWrap,
    giftWrapping: hasGiftWrap ? parseFloat(order?.extension_attributes?.gw_price_incl_tax) : null,
    otherDiscount: getOtherDiscount(discount, couponCodes, the1Redemption, creditCardOnTop),
    couponCodes,
    shippingCost: order.shipping_incl_tax,
  };
}

function getShipping(order: MDCOrder): IOrderShipping {
  return {
    description: order?.shipping_description,
    methodLabel: order?.extension_attributes?.shipping_method_label,
    methodCode: order?.extension_attributes?.shipping_assignments[0]?.shipping.method,
    shippingAddress: getAddress<IOrderAddress>(
      order?.extension_attributes?.shipping_assignments[0]?.shipping.address,
    ) as IOrderAddress,
    billingAddress: getAddress<IOrderAddress>(order?.billing_address) as IOrderAddress,
  };
}
export function transformOrder(order: MDCOrder): IOrder {
  const { order_status: orderStatus, delivery_status: deliveryStatus } = order?.extension_attributes || {};
  const createdAt = DateTime.fromFormat(order.created_at, 'yyyy-MM-dd HH:mm:ss', {
    zone: 'utc+0',
  }).toUTC();

  return {
    customerFirstName: order?.customer_firstname,
    customerLastName: order?.customer_lastname,
    customerEmail: order?.customer_email,
    pickupCode: order?.extension_attributes?.pickup_code,
    createdAt,
    incrementId: order.increment_id,
    orderStatus,
    deliveryStatus,
    itemsGroupBySeller: null,
    payment: getPayment(order),
    shipping: getShipping(order),
  };
}
