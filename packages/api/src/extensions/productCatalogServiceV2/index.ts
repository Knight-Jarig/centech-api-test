import uniq from 'lodash/uniq';
import {
  IConfigurableProductOptionsResolvers,
  IProductLinkResolvers,
  IProductResolvers,
  IProductType,
  IQueryResolvers,
  IResolvers,
} from '../../types/graphql';
import { ResolverContext } from '../../types';
import {
  CSInFilterOption,
  CSPagination,
  CSProduct,
  CSQuerySearchArgs,
} from '../../dataSource/catalogService/cs-graphql';
import productModel from '../../transform/product.model';
import typeDef from './types.graphql';
import { getShippingMethods, sortProductOptionValues } from '../schemaV2/transformer/cs2-transformer';
import config from '../../configs/vars';
import { ApplicationError } from '../../error/ApplicationError';
import * as Sentry from '@sentry/node';

const ProductLink: IProductLinkResolvers<ResolverContext> = {
  async product({ linked_product_sku }, _, { dataSources }) {
    const product = await dataSources.catalogService.findBySku(linked_product_sku);

    if (!product) {
      return;
    }

    return transform(product);
  },
};

const ConfigurableProductOptions: IConfigurableProductOptionsResolvers<ResolverContext> = {
  values({ values }) {
    return sortProductOptionValues({ values, key: 'extension_attributes.label' });
  },
};

const Product: IProductResolvers<ResolverContext> = {
  async configurable_product_items({ extension_attributes, type_id }, _, { dataSources }) {
    if (type_id !== IProductType.Configurable || extension_attributes.configurable_product_links?.length === 0) {
      return [];
    }

    const productIds = extension_attributes.configurable_product_links?.map(link => link.toString());

    const result = await dataSources.catalogService.findDetailByIds(productIds);

    return result.filter(product => !!product && !(product instanceof Error)).map(transform);
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async product(_source, { url }, { dataSources, locale }) {
    const result = await dataSources.catalogService.findByUrl({ url, locale });

    if (!result.product) {
      return;
    }

    return transform(result.product);
  },
  async productById(_, { id }, { dataSources }) {
    const product = await dataSources.catalogService.findProductDetailByIdNew(id);

    if (!product) {
      return null;
    }

    return transform(product);
  },
  async productSearch(_source, { filter }, { dataSources, bu, locale }) {
    const { page, size, filterGroups, sortOrders = [] } = filter;

    const pagination: CSPagination = { size, offset: (page - 1) * size };

    const args: CSQuerySearchArgs = {
      store: bu,
      locale,
      filter_groups: filterGroups
        .flatMap(({ filters }) => filters)
        .map(({ field, value, conditionType: operator }) => ({ field, value, operator })),
      pagination,
    };

    if (sortOrders[0]) {
      args.sort_orders = {
        field: sortOrders[0].field as any,
        order: sortOrders[0].direction as any,
      };
    }

    const result = await dataSources.catalogService.search(args);

    return {
      total_count: result.total,
      products: result.products.map(transform),
      filters: result.aggregations?.map(agg => ({
        name: agg.label,
        attribute_code: agg.field,
        items: agg.buckets?.map(bucket => ({ label: bucket.key, value: bucket.key, count: bucket.doc_count })),
        position: agg.position,
      })),
    };
  },
  async search(_source, args, { dataSources }) {
    if (args.pagination) {
      const size = parseInt(args.pagination.size);
      const offset = parseInt(args.pagination.offset);
      const maxPageSize = config.maxPageSize;
      if (isNaN(size) || isNaN(offset)) {
        throw new ApplicationError(`Size and Offset should be Integer`);
      } else if (size <= 0 || offset < 0) {
        throw new ApplicationError(`Size should more than 1 and Offset should more than 0`);
      } else if (size > maxPageSize) {
        if (config.sentry.dsn) {
          Sentry.captureException(`Size in request greater than MAX_SIZE_PAGE : ${args.pagination.size}`);
        }
        args.pagination.size = maxPageSize;
        args.pagination.offset = offset;
      } else {
        args.pagination.size = size;
        args.pagination.offset = offset;
      }
    }

    const result = await search(dataSources, args);
    return result;
  },
  async productRecommendationByUser(_source, { customerId, limit }, context) {
    const { dataSources, store, locale, customerToken, bu } = context;
    let userId = customerId || '00000'; // for guest
    // find user's id when user is member role
    if (!customerId && customerToken) {
      const customer = await dataSources.magento.customer.getCustomer(store.code);
      userId = customer.id;
    }

    const size = limit || 20;
    const productRecommendation = await dataSources.dataLakeRecommendation.productRecommendationByUser(locale, userId);
    const skus = productRecommendation?.[0]?.data[0]?.item?.map(sku => sku.trim()) || [];

    const args: CSQuerySearchArgs = {
      store: bu,
      locale,
      pagination: { offset: 0, size },
      filter: {
        inFilters: [
          {
            filterBy: CSInFilterOption.Visibility,
            filterValues: ['2', '4'],
          },
          {
            filterBy: CSInFilterOption.Sku,
            filterValues: skus.slice(0, size),
          },
        ],
      },
    };

    const result = await search(dataSources, args);
    const { products } = result;

    return {
      ...result,
      products: sortProductBySkuArray(skus, products),
    };
  },
  async productAssociationBySku(_source, { sku, limit }, context) {
    const { dataSources, locale, bu } = context;

    const size = limit || 20;
    const productRecommendation = await dataSources.dataLakeRecommendation.productRecommendationBySku(locale, sku);
    const skus =
      productRecommendation?.reduce((acc, cur) => {
        if (cur.id === 2) {
          acc = cur.data.find(productData => productData.code === 'product_asso')?.item?.map(itemSku => itemSku.trim());
        }
        return acc;
      }, []) || [];

    const args: CSQuerySearchArgs = {
      store: bu,
      locale,
      pagination: { offset: 0, size },
      filter: {
        inFilters: [
          {
            filterBy: CSInFilterOption.Visibility,
            filterValues: ['2', '4'],
          },
          {
            filterBy: CSInFilterOption.Sku,
            filterValues: skus.slice(0, size),
          },
        ],
      },
    };

    const result = await search(dataSources, args);
    const { products } = result;

    return {
      ...result,
      products: sortProductBySkuArray(skus, products),
    };
  },
};

const resolver: IResolvers = {
  ProductLink,
  ConfigurableProductOptions,
  Product,
  Query,
};

export { typeDef, resolver };

function transform(product) {
  const result = mapRoot(product);
  result.extension_attributes = mapExtensionAttributes(product);
  result.custom_attributes_option = mapCustomAttributesOptions(product);
  result.custom_attributes = mapCustomAttributes(product);

  return result;
}

const mapRoot = pickAndOmitMutate.bind(null, [
  'id',
  'attribute_set_id',
  'sku',
  'name',
  'price',
  'breadcrumbs',
  'status',
  'visibility',
  'type_id',
  'created_at',
  'updated_at',
  'product_links',
  'options',
  'media_gallery_entries',
  'tier_prices',
  'image',
  'small_image',
  'thumbnail',
  'url_key',
  'description',
  'short_description',
  'special_price',
  'special_from_date',
  'special_to_date',
  'meta_title',
  'meta_keyword',
  'meta_description',
  'custom_attributes',
  'custom_attributes_option',
  'extension_attributes',
  'configurable_product_items',
  'price_min',
  'price_max',
  'sale_price_min',
  'sale_price_max',
  'tags',
  'product_tags',
  'marketplace',
  'isReview',
  'online_salable',
  'offline_salable',
]);

function mapExtensionAttributes(response) {
  const keys = [
    'ispu_salable',
    'free_shipping_amount',
    'category_links',
    'category_paths',
    'stock_item',
    'overall_rating',
    'specification_attributes',
    'brand',
    't1c_redeemable_points',
    't1c_earn_points_estimate',
    ['extension_attributes_installment_plans', 'installment_plans'],
    'cc_promotions',
    'salable',
    'seller_url_key',
    'configurable_product_links',
    'configurable_product_options',
    'size_map',
    'size_maps',
    'suggest_promotions',
  ];

  const reviews = mapExtensionAttributesReviews(response);
  const overlay = mapExtensionAttributesOverlay(response);
  const { brand } = mapExtensionAttributesBrand(response);
  const stock_item = mapExtensionAttributesStockItem(response);
  const result = pickAndOmitMutate(keys, response);

  return {
    ...result,
    brand,
    stock_item,
    ...overlay,
    reviews,
  };
}

function mapExtensionAttributesReviews(product) {
  const { reviews } = pickAndOmitMutate(['reviews'], product);

  return (
    reviews?.map(review => ({
      ...review,
      rating_items: review.rating_items?.[0],
      images: (review?.extension_attributes?.images ?? []).map(image => ({ path: image })),
    })) ?? []
  );
}

function mapExtensionAttributesOverlay(product) {
  const { overlay } = pickAndOmitMutate(['overlay'], product);

  return overlay ? Object.keys(overlay).reduce((all, key) => ({ ...all, [`overlay_${key}`]: overlay[key] }), {}) : null;
}

const mapExtensionAttributesBrand = pickAndOmitMutate.bind(null, ['brand']);

const mapExtensionAttributesStockItem = pickAndOmitMutate.bind(null, [
  'qty',
  'is_in_stock',
  'use_config_min_qty',
  'min_qty',
  'use_config_min_sale_qty',
  'min_sale_qty',
  'use_config_max_sale_qty',
  'max_sale_qty',
  'item_id',
  'product_id',
  'stock_id',
  'is_qty_decimal',
  'backorders',
  'use_config_backorders',
  'low_stock_date',
  'notify_stock_qty',
  'use_config_notify_stock_qty',
  'manage_stock',
  'use_config_manage_stock',
  'stock_status_changed_auto',
  'qty_increments',
  'use_config_qty_increments',
  'enable_qty_increments',
  'use_config_enable_qty_increments',
  'is_decimal_divided',
  'show_default_notification_message',
]);

const mapCustomAttributesOptions = pickAndOmitMutate.bind(null, [
  ['marketplace_product_type_option', 'marketplace_product_type'],
  ['marketplace_seller_option', 'marketplace_seller'],
  ['color_shade_name', 'color_shade'],
  'size',
  'installment_plans',
]);

function mapCustomAttributes(response: CSProduct) {
  const keys: (string | string[])[] = [
    ['flash_deal', 'flash_deal_enable'],
    ['promo_tag', 'promo_name_tag'],
    ['only_at_tag', 'only_central_tag'],
    ['new_tag', 'new'],
    ['collection', 'franchise'],
    ['marketplace_product_type_option', 'marketplace_product_type'],
    ['marketplace_seller_option', 'marketplace_seller'],
    ['color_shade_name', 'color_shade'],
  ].concat(Object.keys(response));

  const {
    shipping_delivery_methods,
    type_id,
    online_salable,
    offline_salable,
    configurable_products,
  } = pickAndOmitMutate(
    ['shipping_delivery_methods', 'type_id', 'online_salable', 'offline_salable', 'configurable_products'],
    response,
  );

  const shipping_method_flags = getShippingMethods({
    type_id,
    shipping_delivery_methods,
    online_salable,
    offline_salable,
    configurable_products,
  });

  const shipping_methods = uniq(
    (shipping_delivery_methods ?? []).map(({ shipping_method_code }) => shipping_method_code),
  ).join(',');
  const delivery_methods = uniq(
    (shipping_delivery_methods ?? []).map(({ delivery_method_code }) => delivery_method_code),
  ).join(',');

  const result = pickAndOmitMutate(keys, response);

  return {
    ...result,
    shipping_methods,
    delivery_methods,
    shipping_method_flags,
  };
}

function pickAndOmitMutate(keys: (string | string[])[], source) {
  const result: any = {};

  for (const key of keys) {
    const [from, to] = [].concat(key);

    result[to || from] = source[from];
    delete source[from];
  }

  return result;
}

export async function search(dataSources, args) {
  const result = (await dataSources.catalogService.legacySearch(args)) || {};

  result.products = await Promise.all(
    result.products?.map(async product => {
      const overlays = await dataSources.magento.product.getSaleRuleOverlays(product.id);

      let configurable_products = {};
      let configurable_product_options = null;
      const shipping_method_flags = getShippingMethods(product);

      if (product.type_id === 'configurable') {
        configurable_products = {
          configurable_products: await Promise.all(
            product.configurable_products?.map(async simpleProduct => {
              const overlaysSimple = await dataSources.magento.product.getSaleRuleOverlays(simpleProduct.id);

              return {
                ...simpleProduct,
                cart_price_rule_overlays: overlaysSimple?.map(productModel.transformPriceRuleOverlay) ?? [],
              };
            }) || [],
          ),
        };

        if (product.configurable_product_options && product.configurable_product_options.length > 0) {
          configurable_product_options = product.configurable_product_options.map(option => {
            return {
              ...option,
              values: sortProductOptionValues({ values: option.values, key: 'extension_attributes.label' }),
            };
          });
        }
      }

      return {
        ...product,
        ...configurable_products,
        configurable_product_options,
        shipping_method_flags,
        cart_price_rule_overlays: overlays?.map(productModel.transformPriceRuleOverlay) ?? [],
      };
    }) || [],
  );

  return result;
}

function sortProductBySkuArray(skus: string[], products) {
  const sortProducts = [...products].sort((a, b) => {
    return skus.indexOf(`${a.sku}`.toUpperCase()) - skus.indexOf(`${b.sku}`.toUpperCase());
  });

  return sortProducts;
}
