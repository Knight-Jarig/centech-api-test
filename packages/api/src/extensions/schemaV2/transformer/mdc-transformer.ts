import {
  IV2Brand as IBrand,
  IV2Breadcrumb as IBreadcrumb,
  IV2DateRange as IDateRange,
  IV2Discount as IDiscount,
  IV2Flashdeal as IFlashdeal,
  IV2InstallmentPlan as IInstallmentPlan,
  IV2Media as IMedia,
  IV2MediaType as IMediaType,
  IV2PaymentMethod as IPaymentMethod,
  IV2Preorder as IPreorder,
  IV2PriceSummary as IPriceSummary,
  IV2Product as IProduct,
  IV2ProductFlag as IProductFlag,
  IV2ProductFlag,
  IV2Promotion as IPromotion,
  IV2PurchaseLimit as IPurchaseLimit,
  IV2Rating as IRating,
  IV2Review as IReview,
  IV2Seller as Seller,
  IV2ShippingMethod as IShippingMethod,
  IV2The1Redemption as IThe1Redemption,
} from '../../../types/graphql';
import { MagentoProductSaleRuleOverlay } from '../../../dataSource/magento/product/MagentoProductParams';
import { DateTime } from 'luxon';
import { CustomAttributesOption, MDCProduct, MDCSuggestPromotion } from '../types/mdc-type';
import { MDCStoreConfig } from '../types/mdc-store-config';
import { uniq } from '../utils';
import { getProductLinks } from './shared-transformer';
import minBy from 'lodash/minBy';

export function getSaleRuleOverlayImageUrl(
  overlays: MagentoProductSaleRuleOverlay[],
  { secure_base_media_url }: MDCStoreConfig,
): string | null {
  if (!overlays) return null;

  const overlay = minBy(overlays, 'display_priority');

  return overlay?.overlay_image ? secure_base_media_url + overlay.overlay_image : null;
}

export function getPriceSummary(product: MDCProduct): IPriceSummary {
  const original = product.price;
  const discount = getDiscount(product);
  const final = discount ? find<number>('special_price', product.custom_attributes)! : original;

  return {
    original,
    final,
    discount,
  };
}

export function getSpecialPriceDateRange(product: MDCProduct): IDateRange | null {
  const from = parseDateTime(find<string>('special_from_date', product.custom_attributes!)!);
  const to = parseDateTime(find<string>('special_to_date', product.custom_attributes!)!);

  if (from !== null || to !== null) {
    return {
      from,
      to,
    };
  }

  return null;
}

export function isBetweenDateRange({ from, to }: IDateRange): boolean {
  const now = DateTime.utc();

  if (from && to) return to > now && now > from;
  if (from) return now > from;
  if (to) return now < to;

  return false;
}

export function getDiscount(product: MDCProduct): IDiscount | null {
  const effectiveDateRange = getSpecialPriceDateRange(product);
  const isEffective = Boolean(effectiveDateRange && isBetweenDateRange(effectiveDateRange));
  const specialPrice = parseFloat(find<any>('special_price', product.custom_attributes));

  const original = product.price;
  if (original === 0) return null;

  const amount = product.price - specialPrice;
  const percentage = Math.round((amount / original) * 100);

  const hasSpecialPrice = !Number.isNaN(specialPrice);

  if (!hasSpecialPrice || !effectiveDateRange || !isEffective) {
    return null;
  }

  return {
    amount,
    percentage,
    effectiveDateRange,
  };
}

export function getBrand({ extension_attributes }: MDCProduct): IBrand | null {
  const { brand } = extension_attributes;

  if (!brand) {
    return null;
  }

  const id = brand.brand_id?.toString();
  const name = brand.name;
  const urlKey = brand.url_key;

  if (!id || !name || !urlKey) {
    return null;
  }

  return {
    id,
    name,
    urlKey,
  };
}

export function getMediaGallery(
  { media_gallery_entries, name }: MDCProduct,
  { secure_base_media_url }: MDCStoreConfig,
): IMedia[] {
  return media_gallery_entries.map(({ id, extension_attributes, media_type, file }) => ({
    id: id.toString(),
    title: extension_attributes?.video_content.video_title ?? name,
    url: extension_attributes?.video_content.video_url ?? `${secure_base_media_url}catalog/product${file}`,
    type: mdcMediaTypeMapper[media_type],
  }));
}

export const mdcMediaTypeMapper: Record<string, IMediaType> = {
  image: IMediaType.Image,
  ['external-video']: IMediaType.Video,
};

export function parseDateTime(text?: string): DateTime | null {
  if (!text) return null;

  const dateTime = DateTime.fromFormat(text, 'yyyy-MM-dd HH:mm:ss', {
    zone: 'utc+0',
  }).toUTC();

  if (!dateTime.isValid) return null;

  return dateTime;
}

export function getBreadcrumbs({ breadcrumbs }: MDCProduct): IBreadcrumb[] {
  return (
    breadcrumbs?.map(({ category_id, name, url, level }) => ({
      id: category_id.toString(),
      title: name!,
      urlKey: url!,
      level: +level,
    })) ?? []
  );
}

export function getInstallmentPlans({ extension_attributes }: MDCProduct): IInstallmentPlan[] {
  if (!extension_attributes.installment_plans) {
    return [];
  }
  const now = DateTime.utc();

  return extension_attributes.installment_plans
    .filter(plan => plan.active === '1')
    .map(plan => ({
      id: plan.installmentplan_id.toString(),
      title: plan.name,
      period: parseFloat(plan.period),
      interestRate: parseFloat(plan.customer_rate),
      bank: {
        id: plan.bank.bank_id,
        name: plan.bank.name,
        imageUrl: plan.bank.icon,
      },
      validDateRange: {
        from: parseDateTime(plan.valid_from)!,
        to: parseDateTime(plan.valid_until)!,
      },
      amountRange: {
        min: parseFloat(plan.min_amount)!,
        max: parseFloat(plan.max_amount)!,
      },
    }))
    .filter(plan => plan.validDateRange.to > now && now > plan.validDateRange.from);
}

export function getThe1Redemtion({ extension_attributes }: MDCProduct): IThe1Redemption | null {
  const redeemPoint = extension_attributes.t1c_redeemable_points?.reduce((sum, point) => sum + point, 0);
  const earnPoint = extension_attributes.t1c_earn_points_estimate?.reduce((sum, point) => sum + point, 0);

  if (!redeemPoint && !earnPoint) {
    return null;
  }

  return { earnPoint, redeemPoint };
}

export function getOverlayImageUrl(
  { extension_attributes }: MDCProduct,
  { secure_base_media_url }: MDCStoreConfig,
): string | null {
  const {
    overlay_image,
    overlay_status,
    overlay_mobile_status,
    overlay_start_date,
    overlay_end_date,
  } = extension_attributes;

  const now = DateTime.utc();
  const startDate = parseDateTime(overlay_start_date) ?? now;
  const endDate = parseDateTime(overlay_end_date) ?? DateTime.utc().plus({ day: 1 });
  const isBetween = startDate <= now && now <= endDate;
  const isDisabled = overlay_status !== '1' && overlay_mobile_status !== '1';

  if (isDisabled || !isBetween) {
    return null;
  }

  return secure_base_media_url + overlay_image;
}

export function getSeller({ custom_attributes, custom_attributes_option }: MDCProduct): Seller {
  const id = find<string>('marketplace_seller', custom_attributes) ?? 'N/A';
  const name = find<string>('marketplace_seller', custom_attributes_option) ?? 'N/A';

  return {
    id,
    name,
  };
}

export function getReviews({ extension_attributes }: MDCProduct): IReview[] {
  return extension_attributes.reviews?.map(review => {
    return {
      id: review.review_id.toString(),
      title: review.title || '',
      detail: review.detail || '',
      imageUrls: review.extension_attributes.images,
      reviewer: {
        name: review.nickname,
        email: review.extension_attributes.email ?? 'N/A',
      },
      rating: review.rating_items[0].rating,
      createdAt: DateTime.fromFormat(review.created_at ?? '', 'yyyy-MM-dd HH:mm:ss', {
        zone: 'utc+7',
      }).toUTC(),
    };
  });
}

export function getPreorder({ custom_attributes }: MDCProduct): IPreorder | null {
  const shippingDateTime = parseDateTime(find<string>('preorder_shipping_date', custom_attributes));

  if (!shippingDateTime) return null;

  return { shippingDateTime };
}

export function find<T>(key: string, attrs: CustomAttributesOption[]): T | null | undefined {
  return attrs.find(attr => attr.attribute_code === key)?.value;
}

export function getIsGiftWrappingAvailable({ custom_attributes }: MDCProduct): boolean {
  return find<string>('allow_gift_wrapping', custom_attributes) === '1';
}

export function getPromotionEffectiveDateRange({ start_datetime, end_datetime }: MDCSuggestPromotion): IDateRange {
  const from = DateTime.fromFormat(start_datetime ?? '', 'yyyy-MM-dd', {
    zone: 'utc+7',
  }).toUTC();
  const to = DateTime.fromFormat(end_datetime ?? '', 'yyyy-MM-dd', {
    zone: 'utc+7',
  }).toUTC();

  return {
    from: from.isValid ? from : null,
    to: to.isValid ? to : null,
  };
}

export function getPromotions({ extension_attributes }: MDCProduct): IPromotion[] {
  return (
    extension_attributes.suggest_promotions?.map(promotion => ({
      id: promotion.rule_id.toString(),
      title: promotion.promotion_name,
      description: promotion.full_condition,
      effectiveDateRange: getPromotionEffectiveDateRange(promotion),
    })) ?? []
  );
}

export function getFlashdeal({ custom_attributes }: MDCProduct): IFlashdeal | null {
  const isEnabled = find<string>('flash_deal_enable', custom_attributes) !== '1';

  if (isEnabled) return null;

  const raw = {
    effectiveDateRange: {
      from: find<string>('flash_deal_from', custom_attributes) ?? '',
      to: find<string>('flash_deal_to', custom_attributes) ?? '',
    },
    quantity: {
      sale: find<string>('flash_deal_qty', custom_attributes) ?? '0',
      sold: find<string>('flash_deal_sold_qty', custom_attributes) ?? '0',
    },
  };

  const from = DateTime.fromFormat(raw.effectiveDateRange.from, 'yyyy-MM-dd HH:mm:ss', {
    zone: 'utc+0',
  }).toUTC();
  const to = DateTime.fromFormat(raw.effectiveDateRange.to, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc+0' }).toUTC();

  const effectiveDateRange = {
    from,
    to,
  };

  const sale = parseInt(raw.quantity.sale);
  const sold = parseInt(raw.quantity.sold);
  const available = sale - sold;

  const quantity = {
    sale,
    sold,
    available,
  };

  return {
    effectiveDateRange,
    quantity,
  };
}

export function getRating({ extension_attributes }: MDCProduct): IRating | null {
  if (!extension_attributes.overall_rating) return null;
  const average = extension_attributes.overall_rating.rating;
  if (!average) return null;

  return {
    totalVoteCount: extension_attributes.overall_rating.total_vote,
    average: parseFloat(average) || 0,
  };
}

export function getThumbnailUrl(
  { media_gallery_entries }: MDCProduct,
  { secure_base_media_url }: MDCStoreConfig,
): string {
  const atEntry = media_gallery_entries.find(entry => entry.types.includes('thumbnail')) ?? media_gallery_entries[0];

  return `${secure_base_media_url}catalog/product${atEntry.file}`;
}

export function getFlags(product: MDCProduct): IProductFlag[] {
  const isNew = find<string>('new', product.custom_attributes) === '1';
  const isOnlyAtCentral = find<string>('only_central_tag', product.custom_attributes) === '1';
  const isOnlineExclusive = find<string>('online_exclusive_tag', product.custom_attributes) === '1';
  const isFromMarketplace = find<string>('marketplace_product_type', product.custom_attributes) === 'marketplace';
  const isGiftWrappingAvailable = getIsGiftWrappingAvailable(product);
  const isInStock = !!product.extension_attributes.stock_item.is_in_stock;
  const isBeauty = !!product.extension_attributes?.category_paths?.find(category => {
    const categoryName = (category.name ?? '').toLowerCase();
    return categoryName === 'women' || categoryName === 'beauty';
  });

  return [
    { enabled: isNew, value: IProductFlag.New },
    { enabled: isOnlyAtCentral, value: IProductFlag.OnlyAtCentral },
    { enabled: isOnlineExclusive, value: IProductFlag.OnlineExclusive },
    { enabled: isFromMarketplace, value: IProductFlag.Marketplace },
    { enabled: isGiftWrappingAvailable, value: IProductFlag.GiftWrapping },
    { enabled: isInStock, value: IV2ProductFlag.InStock },
    { enabled: isBeauty, value: IProductFlag.Beauty },
  ]
    .filter(({ enabled }) => enabled)
    .map(({ value }) => value);
}

export function getPurchaseLimit(product: MDCProduct): IPurchaseLimit {
  const { stock_item } = product.extension_attributes;
  const { min_sale_qty: min = 1, max_sale_qty: max } = stock_item;

  const quantity = {
    min,
    max: stock_item.manage_stock ? 999 : max,
  };

  return {
    quantity,
  };
}

export function getShippingMethods({ custom_attributes }: MDCProduct): IShippingMethod[] {
  return [];
}

const paymentMapper = {
  cashondelivery: IPaymentMethod.CashOnDelivery,
  fullpaymentredirect: IPaymentMethod.FullPayment,
  payment_service_fullpayment: IPaymentMethod.FullPayment,
  p2c2p_123: IPaymentMethod.BankTransfer,
  payment_service_bank_transfer: IPaymentMethod.BankTransfer,
  p2c2p_ipp: IPaymentMethod.Installment,
  payment_service_installment: IPaymentMethod.Installment,
  payatstore: IPaymentMethod.PayAtStore,
};

export function getPaymentMethods({ custom_attributes }: MDCProduct): IPaymentMethod[] {
  const paymentMethods = (find<string>('payment_methods', custom_attributes) ?? '').split(',');

  return uniq(paymentMethods.map(method => paymentMethods[method]).filter(Boolean));
}

export function transformProduct(product: MDCProduct, store: MDCStoreConfig): IProduct {
  const priceSummary = getPriceSummary(product);
  const brand = getBrand(product);
  const mediaGallery: IMedia[] = getMediaGallery(product, store);
  const breadcrumbs: IBreadcrumb[] = getBreadcrumbs(product);
  const installmentPlans = getInstallmentPlans(product);
  const the1Redemption = getThe1Redemtion(product);
  const overlayImageUrl = getOverlayImageUrl(product, store);

  const seller = getSeller(product);
  const preorder = getPreorder(product);
  const promotions = getPromotions(product);
  const flashdeal = getFlashdeal(product);
  const reviews = getReviews(product);
  const rating = getRating(product);
  const description = find<string>('description', product.custom_attributes);
  const shortDescription = find<string>('short_description', product.custom_attributes);
  const thumbnailUrl = getThumbnailUrl(product, store);
  const flags = getFlags(product);
  const purchaseLimit = getPurchaseLimit(product);
  const shippingMethods = getShippingMethods(product);
  const paymentMethods = getPaymentMethods(product);
  const links = getProductLinks(product.product_links);

  const result: IProduct = {
    id: product.id.toString(),
    name: product.name!,
    type: product.type_id as any,
    sku: product.sku!,
    urlKey: product.custom_attributes.find(({ attribute_code }) => attribute_code === 'url_key')!.value,
    priceSummary,
    brand,
    mediaGallery,
    breadcrumbs,
    installmentPlans,
    the1Redemption,
    overlayImageUrl,
    seller,
    preorder,
    promotions,
    flashdeal,
    reviews,
    rating,
    shortDescription,
    description,
    thumbnailUrl,
    flags,
    purchaseLimit,
    shippingMethods,
    paymentMethods,
    links,
  } as any;

  return result;
}
