import {
  IV2Brand as IBrand,
  IV2Breadcrumb as IBreadcrumb,
  IV2Category as ICategory,
  IV2ConfigurableOption as IConfigurableOption,
  IV2ConfigurableOptionType as IConfigurableOptionType,
  IV2ConfigurableOptionType,
  IV2ConfigurableOptionValue as IConfigurableOptionValue,
  IV2ConfigurableProduct as IConfigurableProduct,
  IV2ConfigurableProductChild as IConfigurableProductChild,
  IV2DateRange as IDateRange,
  IV2Discount as IDiscount,
  IV2Flashdeal as IFlashdeal,
  IV2InstallmentPlan as IInstallmentPlan,
  IV2Media as IMedia,
  IV2MediaType as IMediaType,
  IV2PaymentMethod as IPaymentMethod,
  IV2Preorder as IPreorder,
  IV2PriceSummary as IPriceSummary,
  IV2ProductFlag as IProductFlag,
  IV2ProductOption as IProductOption,
  IV2ProductSearchFilterCategoryResultOption as IProductSearchFilterCategoryResultOption,
  IV2Promotion as IPromotion,
  IV2PurchaseLimit as IPurchaseLimit,
  IV2Rating as IRating,
  IV2Review as IReview,
  IV2Seller as Seller,
  IV2ShippingMethod as IShippingMethod,
  IV2SimpleProduct as ISimpleProduct,
  IV2The1Redemption as IThe1Redemption,
  IV2ProductLabelOption as ILabelOption,
} from '../../../types/graphql';
import { DateTime } from 'luxon';
import {
  CSCategory,
  CSCategoryAggregation,
  CSConfigurableProductOption,
  CSConfigurableProductOptionValue,
  CSProduct,
  CSSuggestPromotion,
} from '../../../dataSource/catalogService/cs-graphql';
import { MDCStoreConfig } from '../types/mdc-store-config';
import { max, maxBy, min, minBy, uniq, uniqBy } from '../utils';
import { filterOutShippingDeliveryMethods } from '../../../utils/delivery.utils';
import { getProductLinks } from './shared-transformer';
import config from '../../../configs/vars';
import { clothingSizeConfig } from '../../../configs/sort';
import { whiteListMainCategory } from '../../../configs/category';
import get from 'lodash/get';
import set from 'lodash/set';

const isConfigurableProduct = type => type === 'configurable';
const hasChildren = children => children && children.length > 0;

export function getPriceSummary(product: CSProduct, children?: IConfigurableProductChild[]): IPriceSummary {
  const original = product.price;
  const discount = getDiscount(product);
  const final = discount ? product.special_price : original;

  if (hasChildren(children)) {
    return children
      .map(child => child.product.priceSummary)
      .reduce((minimum, price) => (minimum.final > price.final ? price : minimum), children[0].product.priceSummary);
  }
  return {
    original,
    final,
    discount,
  };
}

function getPriceRange(children: IConfigurableProductChild[], priceSummary) {
  const priceSummaries = hasChildren(children) ? children.map(({ product }) => product.priceSummary) : [priceSummary];
  const originals = priceSummaries.map(({ original }) => original);
  const finals = priceSummaries.map(({ final }) => final);
  const discount: IDiscount[] = priceSummaries.map(price => price.discount).filter(Boolean) as IDiscount[];

  return {
    original: uniq([min(originals), max(originals)]),
    final: uniq([min(finals), max(finals)]),
    discount: uniqBy(
      [minBy(discount, ({ amount }) => amount), maxBy(discount, ({ amount }) => amount)].filter(Boolean),
      ({ amount }) => amount,
    ),
  };
}

export function getSpecialPriceDateRange(product: CSProduct): IDateRange | null {
  const from = parseDateTime(product.special_from_date);
  const to = parseDateTime(product.special_to_date);

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
  return now < to;
}

export function getDiscount(product: CSProduct): IDiscount | null {
  const effectiveDateRange = getSpecialPriceDateRange(product);
  const isEffective = effectiveDateRange === null || isBetweenDateRange(effectiveDateRange);
  const specialPrice = product.special_price;

  const original = product.price;
  if (original === 0) return null;

  const amount = product.price - specialPrice;
  const percentage = Math.round((amount / original) * 100);
  const hasSpecialPrice = !!+specialPrice;

  if (!hasSpecialPrice || !isEffective) {
    return null;
  }

  return {
    amount,
    percentage,
    effectiveDateRange,
  };
}

export function getBrand({ brand }: CSProduct): IBrand | null {
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
  product: CSProduct,
  store: MDCStoreConfig,
  children: IConfigurableProductChild[],
): IMedia[] {
  if (!product.media_gallery_entries || product.media_gallery_entries.length === 0) {
    const hasMediaGallery = child => child.product?.mediaGallery && child.product?.mediaGallery.length > 0;

    return children?.find(hasMediaGallery)?.product.mediaGallery || [];
  }
  const mediaGalleryImage = mapMediaGalleryImage(product, store);
  const mediaGalleryVideo = mapMediaGalleryVideo(product);

  return [...mediaGalleryVideo, ...mediaGalleryImage];
}

function mapMediaGalleryImage(
  { media_gallery_entries, name }: CSProduct,
  { secure_base_media_url }: MDCStoreConfig,
): IMedia[] {
  return (
    media_gallery_entries
      ?.filter(({ file }) => file)
      .map(({ id, media_type, types, file }) => ({
        id: id.toString(),
        title: name,
        url: `${secure_base_media_url}catalog/product${file}`,
        type: mdcMediaTypeMapper[media_type],
        types,
        storeId: '',
        provider: '',
        description: '',
        metadata: '',
      })) || []
  );
}

function mapMediaGalleryVideo({ media_gallery_entries_video }: CSProduct): IMedia[] {
  return (
    media_gallery_entries_video
      ?.filter(({ url }) => url)
      .map(({ id, store_id, url, title, provider, description, metadata }) => ({
        id: id.toString(),
        title,
        url,
        type: IMediaType.Video,
        types: [],
        storeId: store_id,
        provider,
        description,
        metadata,
      })) || []
  );
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

export function getBreadcrumbs({ breadcrumbs }: CSProduct): IBreadcrumb[] {
  return (
    breadcrumbs?.map(({ category_id, name, url, level }) => ({
      id: category_id.toString(),
      title: name ?? '',
      urlKey: url!,
      level: +level,
    })) ?? []
  );
}

export function getCategories({ categories }: CSProduct): ICategory[] {
  return (
    categories?.map(({ id, name }) => ({
      id: id?.toString(),
      name: name ?? '',
    })) ?? []
  );
}

export function getInstallmentPlans({ extension_attributes_installment_plans }: CSProduct): IInstallmentPlan[] {
  if (!extension_attributes_installment_plans) {
    return [];
  }
  const now = DateTime.utc();

  return extension_attributes_installment_plans
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

export function getThe1Redemtion({
  t1c_earn_points_estimate,
  t1c_redeemable_points,
}: CSProduct): IThe1Redemption | null {
  const redeemPoint = t1c_redeemable_points?.reduce((sum, point) => sum + point, 0);
  const earnPoint = t1c_earn_points_estimate?.reduce((sum, point) => sum + point, 0);

  if (!redeemPoint && !earnPoint) {
    return null;
  }

  return { earnPoint, redeemPoint };
}

export function getOverlayImageUrl({ overlay }: CSProduct, { secure_base_media_url }: MDCStoreConfig): string | null {
  if (!overlay) return null;

  const { image, status, mobile_status, start_date, end_date } = overlay;

  const now = DateTime.utc();
  const startDate = parseDateTime(start_date) ?? now;
  const endDate = parseDateTime(end_date) ?? DateTime.utc().plus({ day: 1 });
  const isBetween = startDate <= now && now <= endDate;
  const isDisabled = status !== '1' && mobile_status !== '1';

  if (isDisabled || !isBetween) {
    return null;
  }

  return secure_base_media_url + image;
}

export function getSeller({ marketplace, marketplace_seller_option }: CSProduct): Seller {
  if (!marketplace || !marketplace_seller_option) {
    const sellerNameConfig = {
      cds: 'Central Department Store',
      default: 'N/A',
    };

    return { id: config.bu, name: sellerNameConfig[config.bu] ?? sellerNameConfig.default };
  }

  const id = marketplace.seller;
  const name = marketplace_seller_option;

  return {
    id,
    name,
  };
}

export function getReviews({ reviews }: CSProduct, { secure_base_media_url }: MDCStoreConfig): IReview[] {
  return (reviews ?? []).map(review => {
    const imageUrls = review.extension_attributes.images.map(image => `${secure_base_media_url}${image}`);

    return {
      id: review.review_id.toString(),
      title: review.title || '',
      detail: review.detail || '',
      imageUrls,
      createdAt: DateTime.fromSQL(review.created_at ?? '', {
        zone: 'utc+7',
      }).toUTC(),
      reviewer: {
        name: review.nickname,
        email: review.extension_attributes.email ?? 'N/A',
        provinceId: review.region_id?.toString(),
      },
      rating: review.rating_items[0]?.rating ?? 0,
    };
  });
}

/*
export function getPreorder({ preorder_shipping_date }: CSProduct): IPreorder | null {
  const shippingDateTime = parseDateTime(preorder_shipping_date);

  if (!shippingDateTime) return null;

  return { shippingDateTime };
}
*/

export function getPreorder({ preorder_shipping_date, product_sell_type }: CSProduct): IPreorder | null {
  const shippingDateTime = parseDateTime(preorder_shipping_date);
  if (!shippingDateTime || !product_sell_type) return null;

  const now = DateTime.utc();
  if (shippingDateTime < now) return null;

  return { shippingDateTime };
}

export function getIsGiftWrappingAvailable({ allow_gift_wrapping }: CSProduct): boolean {
  return allow_gift_wrapping === '1';
}

function getPromotionEffectiveDateRange({ start_datetime, end_datetime }: CSSuggestPromotion): IDateRange {
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

export function getPromotions({ suggest_promotions }: CSProduct): IPromotion[] {
  return (suggest_promotions ?? []).map(promotion => ({
    id: promotion.promotion_name,
    title: promotion.promotion_name,
    description: promotion.full_condition,
    effectiveDateRange: getPromotionEffectiveDateRange(promotion),
  }));
}

export function getFlashdeal({
  flash_deal,
  flash_deal_from,
  flash_deal_to,
  flash_deal_qty,
  flash_deal_sold_qty,
}: CSProduct): IFlashdeal | null {
  const isEnabled = flash_deal !== '1';

  if (isEnabled) return null;

  const raw = {
    effectiveDateRange: {
      from: flash_deal_from ?? '',
      to: flash_deal_to ?? '',
    },
    quantity: {
      sale: flash_deal_qty ?? '0',
      sold: flash_deal_sold_qty ?? '0',
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
  const available = Math.max(0, sale - sold);

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

export function getRating({ overall_rating }: CSProduct): IRating | null {
  if (!overall_rating) return null;
  const average = overall_rating.rating;
  if (!average) return null;

  return {
    totalVoteCount: overall_rating.total_vote,
    average: average || 0,
    fiveStar: overall_rating?.five_star || 0,
    fourStar: overall_rating?.four_star || 0,
    threeStar: overall_rating?.three_star || 0,
    twoStar: overall_rating?.two_star || 0,
    oneStar: overall_rating?.one_star || 0,
    roundedRating: overall_rating?.rounded_rating || 0,
  };
}

export function getThumbnailUrl(
  product: CSProduct,
  { secure_base_media_url }: MDCStoreConfig,
  children?: IConfigurableProductChild[],
): string {
  const findThumbnailUrl = mediaGalleries => {
    let mediaGallery = mediaGalleries?.find(entry => entry.types?.includes('thumbnail') && entry.file);

    if (!mediaGallery) {
      mediaGallery = mediaGalleries?.find(entry => entry.file);
    }

    return mediaGallery?.file;
  };

  let url = findThumbnailUrl(product.media_gallery_entries);

  if (!url && hasChildren(children)) {
    const skuChildren = children.map(child => child.product?.sku).filter(sku => sku);
    const productChildren = product.configurable_products?.filter(product => skuChildren.includes(product?.sku));

    const mediaGalleries = productChildren
      .map(product => product?.media_gallery_entries)
      .filter(mediaGallery => mediaGallery)
      .flat();
    url = mediaGalleries.length <= 0 ? null : findThumbnailUrl(mediaGalleries);
  }

  return url ? `${secure_base_media_url}catalog/product${url}` : null;
}

export function getFlags(
  {
    new_tag,
    only_at_tag,
    online_exclusive_tag,
    marketplace,
    allow_gift_wrapping,
    allow_return,
    allow_express,
    is_in_stock,
    categories,
    product_type,
    preorder_shipping_date,
    product_sell_type,
    type_id,
    online_salable,
    offline_salable,
    brand,
  }: CSProduct,
  children?: IConfigurableProductChild[],
): IProductFlag[] {
  const isNew = new_tag === '1';
  const isOnlyAtCentral = only_at_tag === '1';
  const isOnlineExclusive = online_exclusive_tag === '1';
  const isFromMarketplace = marketplace?.product_type === 'marketplace';
  const isGiftWrappingAvailable = allow_gift_wrapping === '1';
  const isInStock = is_in_stock;
  const isBeauty = !!categories?.find(category => {
    const categoryName = (category.name ?? '').toLowerCase();
    return categoryName === 'beauty';
  });
  const isAllowReturn = allow_return === '1';
  const isAllowExpress = allow_express === '1';

  const preorder = getPreorder({ preorder_shipping_date, product_sell_type });
  const isPreOrder = !!preorder?.shippingDateTime;

  const isByOrder = (product_type || '').toLowerCase() === 'by order';
  const isShowProductOriginalPrice = !brand?.extension_attributes?.hide_product_original_price;

  const flags = [
    { enabled: isNew, value: IProductFlag.New },
    { enabled: isOnlyAtCentral, value: IProductFlag.OnlyAtCentral },
    { enabled: isOnlineExclusive, value: IProductFlag.OnlineExclusive },
    { enabled: isFromMarketplace, value: IProductFlag.Marketplace },
    { enabled: isGiftWrappingAvailable, value: IProductFlag.GiftWrapping },
    { enabled: isInStock, value: IProductFlag.InStock },
    { enabled: isBeauty, value: IProductFlag.Beauty },
    { enabled: isAllowReturn, value: IProductFlag.AllowReturn },
    { enabled: isAllowExpress, value: IProductFlag.AllowExpress },
    { enabled: isPreOrder, value: IProductFlag.PreOrder },
    { enabled: isByOrder, value: IProductFlag.ByOrder },
    { enabled: online_salable, value: IProductFlag.OnlineSalable },
    { enabled: offline_salable, value: IProductFlag.OfflineSalable },
    { enabled: isShowProductOriginalPrice, value: IProductFlag.ShowProductOriginalPrice },
  ];

  if (isConfigurableProduct(type_id) && !hasChildren(children)) {
    return flags.filter(({ enabled, value }) => value !== IProductFlag.InStock && enabled).map(({ value }) => value);
  }
  return flags.filter(({ enabled }) => enabled).map(({ value }) => value);
}

export function getPurchaseLimit({ min_sale_qty = 1, max_sale_qty, manage_stock }: CSProduct): IPurchaseLimit {
  const quantity = {
    min: min_sale_qty,
    max: manage_stock ? 999 : max_sale_qty,
  };

  return {
    quantity,
  };
}

const shippingMapper = {
  pickupatstore_pickupatstore: IShippingMethod.StandardPickUp,
  storepickup_ispu: IShippingMethod.TwoHoursPickUp,
  cds_standard: IShippingMethod.StandardDelivery,
  cds_same_day: IShippingMethod.SameDayDelivery,
  cds_next_day: IShippingMethod.NextDayDelivery,
  grab_ship_from_store: IShippingMethod.ThreeHoursDelivery,
  rbs_standard: IShippingMethod.StandardDelivery,
  rbs_same_day: IShippingMethod.SameDayDelivery,
  rbs_next_day: IShippingMethod.NextDayDelivery,
};

export function getShippingMethods({
  type_id,
  shipping_delivery_methods,
  online_salable,
  offline_salable,
  configurable_products,
}: CSProduct): IShippingMethod[] {
  let shippingDeliveryMethods = shipping_delivery_methods || [];
  let isOnlineSalable = online_salable;
  let isOfflineSalable = offline_salable;

  if (isConfigurableProduct(type_id) && hasChildren(configurable_products)) {
    isOnlineSalable = !!configurable_products.find(o => o.online_salable);
    isOfflineSalable = !!configurable_products.find(o => o.offline_salable);
    shippingDeliveryMethods = [
      ...shippingDeliveryMethods,
      ...configurable_products.flatMap(o => o.shipping_delivery_methods || []),
    ];
  }

  if (!isOnlineSalable) {
    shippingDeliveryMethods = filterOutShippingDeliveryMethods('online', shippingDeliveryMethods);
  }

  if (!isOfflineSalable) {
    shippingDeliveryMethods = filterOutShippingDeliveryMethods('offline', shippingDeliveryMethods);
  }

  return uniq(
    shippingDeliveryMethods
      .map(({ shipping_method_code }) => shipping_method_code)
      .map(code => shippingMapper[code])
      .filter(Boolean),
  );
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

export function getPaymentMethods({ payment_methods }: CSProduct): IPaymentMethod[] {
  return uniq(
    (payment_methods ?? '')
      .split(',')
      .map(method => paymentMapper[method])
      .filter(Boolean),
  );
}

export function checkWhiteListMainCategory(category: CSCategoryAggregation): boolean {
  return whiteListMainCategory ? whiteListMainCategory.includes(category.url_key) : true;
}

export function transformHierarchySubCategoriesByCategoryId(
  categories: CSCategoryAggregation[],
  baseCategoryId: string,
): IProductSearchFilterCategoryResultOption[] {
  return (categories ?? [])
    .filter(category => category.parent_id === baseCategoryId)
    .filter(category => (category.level === '2' ? this.checkWhiteListMainCategory(category) : true))
    .map(category => this.getHierarchyCategory(category, categories));
}

export function transformHierarchyCategories(
  categories: CSCategoryAggregation[],
): IProductSearchFilterCategoryResultOption[] {
  if (categories.length === 0) return [];

  return categories
    .filter(category => category.level === '2' && this.checkWhiteListMainCategory(category))
    .map(category => this.getHierarchyCategory(category, categories));
}

export function transformHierarchyCategoriesChildren(
  categories: CSCategoryAggregation[],
  parentId: string,
  level: string,
): IProductSearchFilterCategoryResultOption[] {
  const maxLevel = maxBy(categories, category => +category.level)?.level;
  if (!maxLevel || +maxLevel < +level) return [];

  return categories
    .filter(category => category.parent_id === parentId)
    .map(category => this.getHierarchyCategory(category, categories));
}

export function getHierarchyCategory(
  { id, name, doc_count, level, url_path }: CSCategoryAggregation,
  categories: CSCategoryAggregation[],
): IProductSearchFilterCategoryResultOption {
  return {
    id: id,
    label: name ?? '',
    level,
    productCount: doc_count,
    urlPath: url_path,
    children: this.transformHierarchyCategoriesChildren(categories, id, level),
  };
}

const valueKeyMap: Record<IConfigurableOptionType, keyof IConfigurableOptionValue> = {
  [IConfigurableOptionType.SwatchColor]: 'colorCode',
  [IConfigurableOptionType.SwatchImage]: 'url',
  [IConfigurableOptionType.SwatchText]: 'label',
};

export function transformConfigurableOptionValue(
  { value_index, extension_attributes }: CSConfigurableProductOptionValue,
  { secure_base_media_url }: MDCStoreConfig,
): IConfigurableOptionValue {
  let type = extension_attributes.frontend_type.toUpperCase() as IConfigurableOptionType;
  let key = valueKeyMap[type];

  if (!key) {
    // set default type
    type = IConfigurableOptionType.SwatchText;
    key = valueKeyMap[type];
  }

  const value =
    type === IV2ConfigurableOptionType.SwatchImage
      ? `${secure_base_media_url}attribute/swatch${extension_attributes.frontend_value}`
      : extension_attributes.frontend_value;

  return {
    id: value_index.toString(),
    type,
    [key]: value,
    label: extension_attributes.label,
    productIds: extension_attributes.products.map(productId => productId.toString()),
  };
}

export function transformConfigurableOption(
  { attribute_id, label, values }: CSConfigurableProductOption,
  store: MDCStoreConfig,
): IConfigurableOption {
  return {
    id: attribute_id,
    label: label,
    attributeCode: '',
    values: (values ?? []).map(value => transformConfigurableOptionValue(value, store)),
  };
}

function getConfigurableProductOptions(configurable_product_options, store): IConfigurableOption[] {
  const options = configurable_product_options?.map(option => transformConfigurableOption(option, store!)) ?? [];

  const sortingOrder = {
    SWATCH_COLOR: 1,
    SWATCH_IMAGE: 2,
  };

  const majorTypes = options
    .filter(option => {
      return !!sortingOrder[option.values?.[0]?.type];
    })
    .sort((a, b) => (sortingOrder[a.values[0].type] < sortingOrder[b.values[0].type] ? -1 : 1));

  const otherTypes = options
    .filter(option => {
      return !!!sortingOrder[option.values?.[0]?.type];
    })
    .sort((a, b) => (a.values?.[0]?.type < b.values?.[0]?.type ? -1 : 1));

  return [...majorTypes, ...otherTypes];
}

function getProductChildren(
  { configurable_products, configurable_product_options }: CSProduct,
  store,
): IConfigurableProductChild[] {
  if (!configurable_products || configurable_products?.length === 0) return [];
  const options = getConfigurableProductOptions(configurable_product_options, store);

  const childOptionByProductId = options
    .flatMap(option =>
      option.values.map(value => ({
        option: { id: option.id, label: option.label },
        value,
      })),
    )
    .flatMap(({ option, value }) => value.productIds.map(productId => ({ productId, option, value })))
    .reduce((all, { option, value, productId }) => {
      const list = all[productId] ?? [];

      return { ...all, [productId]: list.concat({ ...option, value, attributeCode: '' }) };
    }, {} as Record<string, IProductOption[]>);

  const sortedProducts = [...configurable_products].sort((a, b) => {
    const getPercentage = obj => getPriceSummary(obj)?.discount?.percentage || 0;
    const getTime = obj => new Date(obj.created_at).getTime();
    const percentageA = getPercentage(a);
    const percentageB = getPercentage(b);
    const createdAtA = getTime(a);
    const createdAtB = getTime(b);

    return percentageB - percentageA || createdAtB - createdAtA;
  });

  return sortedProducts
    .map(product => ({
      options: childOptionByProductId[product.id],
      product: transformProduct(product as any, store),
    }))
    .filter(product => product.options?.length > 0);
}

function getLabelOptions(product: CSProduct): ILabelOption[] {
  const keys = ['color', 'color_shade_name', 'size'];
  const labelOptions = [];
  keys.forEach(key => {
    const labelValue = product[key];
    if (labelValue) {
      const label = {
        id: key,
        label: labelValue,
      };
      labelOptions.push(label);
    }
  });

  return labelOptions;
}

export function transformProduct(product: CSProduct, store: MDCStoreConfig): ISimpleProduct | IConfigurableProduct {
  const children = isConfigurableProduct(product.type_id) ? getProductChildren(product, store) : [];
  const priceSummary = getPriceSummary(product, children);
  const priceRange = isConfigurableProduct(product.type_id) ? getPriceRange(children, priceSummary) : [];
  const brand = getBrand(product);
  const mediaGallery: IMedia[] = getMediaGallery(product, store, children);
  const breadcrumbs: IBreadcrumb[] = getBreadcrumbs(product);
  const categories: ICategory[] = getCategories(product);
  const installmentPlans = getInstallmentPlans(product);
  const the1Redemption = getThe1Redemtion(product);
  const overlayImageUrl = getOverlayImageUrl(product, store);
  const seller = getSeller(product);
  const preorder = getPreorder(product);
  const promotions = getPromotions(product);
  const flashdeal = getFlashdeal(product);
  const reviews = getReviews(product, store);
  const rating = getRating(product);
  const description = product.description ?? '';
  const shortDescription = product.short_description ?? '';
  const thumbnailUrl = getThumbnailUrl(product, store, children);
  const flags = getFlags(product, children);
  const purchaseLimit = getPurchaseLimit(product);
  const shippingMethods = getShippingMethods(product);
  const paymentMethods = getPaymentMethods(product);
  const links = getProductLinks(product.product_links);
  const options = getConfigurableProductOptions(product.configurable_product_options, store);
  const urlKey = product.url_key ?? 'N/A';
  const labelOptions = getLabelOptions(product);

  return {
    id: product.id.toString(),
    name: product.name!,
    type: product.type_id as any,
    sku: product.sku!,
    urlKey,
    createdAt: DateTime.fromFormat(product.created_at, 'yyyy-MM-dd HH:mm:ss', {
      zone: 'utc+7',
    }).toUTC(),
    promotionTag: product.promo_tag,
    collectionName: product.collection,
    priceSummary,
    brand,
    mediaGallery,
    breadcrumbs,
    categories,
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
    labelOptions,
    options,
    ...(isConfigurableProduct(product.type_id)
      ? {
          children,
          priceRange,
        }
      : []),
  };
}

export function transformCategory(category: CSCategory) {
  const { id, name, parent_id: parentId, url_path: urlPath, is_gtm: isGtm } = category;

  return {
    id,
    name,
    parentId,
    urlPath,
    isGtm,
  };
}

export function sortProductOptionValues({ values, key }) {
  if (!values || values.length <= 0) {
    return [];
  }

  const getValueByKeyUpperCase = (obj, path) => get(obj, path, '').toUpperCase();

  const trimValues = values.map(value => {
    const trimValue = get(value, key, '').trim();
    return set(value, key, trimValue);
  });

  const clothingSizes = trimValues.filter(value => clothingSizeConfig.includes(getValueByKeyUpperCase(value, key)));
  const optionValues = trimValues.filter(value => !clothingSizeConfig.includes(getValueByKeyUpperCase(value, key)));

  if (clothingSizes.length > 0) {
    clothingSizes.sort(
      (a, b) =>
        clothingSizeConfig.indexOf(getValueByKeyUpperCase(a, key)) -
        clothingSizeConfig.indexOf(getValueByKeyUpperCase(b, key)),
    );
  }

  if (optionValues.length > 0) {
    optionValues.sort((a, b) => {
      return get(a, key).localeCompare(get(b, key), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
  }

  return [...clothingSizes, ...optionValues];
}

export function getPrioritySortFilterOptionByAlphabet(data) {
  const alphabetRegex = /^[a-zA-Z]/;
  const thaiAlphabetRegex = /^[ก-์]/;
  const digitRegex = /^\d/;
  const symbolRegex = /^[^\w\s]/;

  // sort by alphabet, thai alphabet, digit and symbol
  return (
    +alphabetRegex.test(data) * 1 ||
    +thaiAlphabetRegex.test(data) * 5 ||
    +digitRegex.test(data) * 10 ||
    +symbolRegex.test(data) * 100
  );
}

export function sortFilterOptionByAlphabet(filters) {
  const sortArray = (a, b) => {
    const dataA = a.label;
    const dataB = b.label;
    const scoreA = getPrioritySortFilterOptionByAlphabet(dataA);
    const scoreB = getPrioritySortFilterOptionByAlphabet(dataB);

    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }

    return dataA === dataB ? 0 : dataA > dataB ? 1 : -1;
  };

  return filters.sort(sortArray);
}
