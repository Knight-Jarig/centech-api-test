import { ResolverContext } from '../../types';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import pick from 'lodash/pick';
import productModel from '../../transform/product.model';
import {
  ICompareProducts,
  IConditionType,
  IProduct,
  IProductLinkResolvers,
  IProductResolvers,
  IProductSearch,
  IProductType,
  IQueryResolvers,
  ISearchSuggestionLists,
  ITermItem,
  IStockItem,
} from '../../types/graphql';
import { findMinMaxPrice } from './productsUtils';
import { customAttributes } from '../../utils/transformer';
import { ApplicationError } from '../../error/ApplicationError';

const ProductLink: IProductLinkResolvers<ResolverContext> = {
  async product(_source, _, { dataSources, storeCode }) {
    const linkedSku = _source.linked_product_sku;
    if (!linkedSku) return null;
    try {
      const product = await dataSources.magento.product.findBySku({
        storeCode,
        sku: linkedSku,
      });
      return productModel.transform(product);
    } catch (error) {
      return null;
    }
  },
};

function getAttributes(_source: IProduct, key: 'custom_attributes' | 'custom_attributes_option') {
  return Array.isArray(_source[key]) ? customAttributes(_source[key]) : _source[key];
}

const Product: IProductResolvers<ResolverContext> = {
  custom_attributes(_source, { filter }, { productCustomAttributes }) {
    const attributes = getAttributes(_source, 'custom_attributes');
    const keys = filter ?? productCustomAttributes?.split(',')?.map(arg => arg.trim());

    return keys ? pick(attributes, keys) : attributes;
  },
  custom_attributes_option(_source, { filter }, { productCustomAttributesOption }) {
    const attributes = getAttributes(_source, 'custom_attributes_option');
    const keys = filter ?? productCustomAttributesOption?.split(',')?.map(arg => arg.trim());

    return keys ? pick(attributes, keys) : attributes;
  },
  async price_min({ configurable_product_items, type_id, special_price, price }) {
    const isConfigurable = type_id === 'configurable';
    if (!isConfigurable) return special_price || price;
    const { price_min } = findMinMaxPrice(configurable_product_items);

    return price_min;
  },
  async price_max({ configurable_product_items, type_id, price, special_price }) {
    const isConfigurable = type_id === 'configurable';
    if (!isConfigurable) return special_price || price;
    const { price_max } = findMinMaxPrice(configurable_product_items);

    return price_max;
  },
  async sale_price_min({ configurable_product_items, type_id, special_price, price }) {
    const isConfigurable = type_id === 'configurable';
    if (!isConfigurable) return special_price || price;
    const { sale_price_min } = findMinMaxPrice(configurable_product_items);

    return sale_price_min;
  },
  async sale_price_max({ configurable_product_items, type_id, price, special_price }) {
    const isConfigurable = type_id === 'configurable';
    if (!isConfigurable) return special_price || price;
    const { sale_price_max } = findMinMaxPrice(configurable_product_items);

    return sale_price_max;
  },
  image({ image, type_id, configurable_product_items }) {
    const isConfigurable = type_id === 'configurable';
    const isNoImageSelect = image === 'no_selection';
    const isImageEmpty = image === '';
    const hasImage = !isNoImageSelect && !isImageEmpty;

    if (hasImage || !isConfigurable) {
      return image;
    }

    return get(
      find(configurable_product_items, item => !!item.image),
      'image',
      '',
    );
  },
  media_gallery_entries({ media_gallery_entries, type_id, configurable_product_items }) {
    const isConfigurable = type_id === 'configurable';
    const hasMedia = gallery => gallery && gallery.length > 0;

    if (hasMedia(media_gallery_entries) || !isConfigurable) {
      return media_gallery_entries;
    }

    const productWithMediaGallery = configurable_product_items?.find(configProductItem =>
      hasMedia(configProductItem.media_gallery_entries),
    );
    const availableMediaGallery = productWithMediaGallery?.media_gallery_entries || [];

    return availableMediaGallery;
  },
  product_tags({ custom_attributes, type_id, configurable_product_items }) {
    const isConfigurable = type_id === 'configurable';
    const productTags = custom_attributes?.product_tags || '';

    if (productTags || !isConfigurable) {
      return productTags;
    }

    const productHasTags = find(configurable_product_items, item => !!item?.custom_attributes?.product_tags);
    const availableTags = productHasTags?.custom_attributes?.product_tags || '';

    return availableTags;
  },
  type_id: ({ type_id }) => type_id || IProductType.Unknown,
};

const Query: IQueryResolvers<ResolverContext> = {
  async compareProducts(_source, { input: { sku } }, { dataSources, storeCode }): Promise<ICompareProducts[]> {
    return await dataSources.magento.product.compareProducts({
      storeCode: storeCode,
      sku: sku.join(','),
    });
  },
  async productBySku(
    _source,
    { sku, storeCode: storeCodeInput },
    { dataSources, storeCode: storeCodeContext },
  ): Promise<IProduct> {
    const storeCodeSelector = storeCodeInput ? storeCodeInput : storeCodeContext;
    const product = await dataSources.magento.product.findBySku({ storeCode: storeCodeSelector, sku });

    if (product.type_id === 'configurable') {
      const configurableProductChildren = get(product, 'extension_attributes.configurable_product_links', []);
      const filter = {
        filterGroups: [
          {
            filters: [
              { field: 'entity_id', value: configurableProductChildren.toString(), conditionType: IConditionType.In },
            ],
          },
        ],
      };

      const { products } = await dataSources.magento.catalogService.find(filter, storeCodeContext);
      product.configurable_product_items = map(products, currentProduct => productModel.transform(currentProduct));
    }

    return productModel.transform(product);
  },
  async product(
    _source,
    { url, storeCode: storeCodeInput },
    { dataSources, storeCode: storeCodeContext },
  ): Promise<IProduct> {
    if (!url) throw new ApplicationError('url must not be empty');

    const storeCodeSelector = storeCodeInput ? storeCodeInput : storeCodeContext;
    const product = await dataSources.magento.product.findByUrl({ url, storeCode: storeCodeSelector });

    if (product.type_id === 'configurable') {
      const configurableProductChildren = get(product, 'extension_attributes.configurable_product_links', []);
      const filter = {
        filterGroups: [
          {
            filters: [
              { field: 'entity_id', value: configurableProductChildren.toString(), conditionType: IConditionType.In },
            ],
          },
        ],
      };

      const { products } = await dataSources.magento.catalogService.find(filter, storeCodeContext);
      product.configurable_product_items = map(products, current => productModel.transform(current));
    }

    return productModel.transform(product);
  },
  async productSearch(
    _source,
    { filter, storeCode: storeCodeInput },
    { dataSources, storeCode: storeCodeContext },
  ): Promise<IProductSearch> {
    const storeCodeSelector = storeCodeInput ? storeCodeInput : storeCodeContext;

    const result = await dataSources.magento.catalogService.find(filter, storeCodeSelector);

    return {
      ...result,
      products: result.products.map(item => productModel.transform(item)),
    };
  },
  async searchTrending(_source, data, { dataSources, storeCode }): Promise<ITermItem[]> {
    return dataSources.magento.catalogService.getSearchTrending(storeCode);
  },
  async searchSuggestion(_source, { searchTermsInput }, { dataSources }): Promise<ISearchSuggestionLists> {
    const { productsSize, termsSize, storeCode, keyword } = searchTermsInput;
    const data = await dataSources.magento.catalogService.getSearchSuggestion({
      storeCode,
      keyword,
    });
    return {
      products: get(data, 'products', []).slice(0, productsSize),
      terms: get(data, 'terms', []).slice(0, termsSize),
      categories: get(data, 'categories', []),
    };
  },
  async stockItem(_source, { sku }, { dataSources, storeCode }): Promise<IStockItem> {
    return dataSources.magento.product.getStockItem(storeCode, sku);
  },
};

export default {
  ProductLink,
  Product,
  Query,
};
