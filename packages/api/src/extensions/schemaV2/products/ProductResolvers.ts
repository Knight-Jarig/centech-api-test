import { ResolverContext } from '../../../types';
import {
  IQueryResolvers,
  IResolvers,
  IV2ConfigurableOptionResolvers as IConfigurableOptionResolvers,
  IV2ProductLinksResolvers as IProductLinksResolvers,
  IV2ProductOptionResolvers as IProductOptionResolvers,
  IV2ProductResolvers as IProductResolvers,
  IV2SimpleProductResolvers as ISimpleProductResolvers,
  IV2ConfigurableProductResolvers as IConfigurableProductResolvers,
  IV2ProductSearchFilterCategoryResultResolvers as IProductSearchFilterCategoryResultResolvers,
  IV2ProductSearchFilterNormalResultResolvers as IProductSearchFilterNormalResultResolvers,
  IV2ProductSearchFilterRangeResultOption,
  IV2ProductSearchFilterRangeResultResolvers as IProductSearchFilterRangeResultResolvers,
  IV2ProductSearchFilterResultResolvers as IProductSearchFilterResultResolvers,
  IV2ProductSearchFilterResultUnionResolvers,
  IV2ProductSearchResultResolvers as IProductSearchResultResolvers,
  IV2ProductRecommendResultResolvers as IProductRecommendResultResolvers,
  IV2ProductType as IProductType,
  IV2ReviewerResolvers as IReviewerResolvers,
  IV2ProductLinks as IProductLinks,
  IV2ConfigurableProductChild as IConfigurableProductChild,
  IV2ProductSearchFilterCategoryResult as IProductSearchFilterCategoryResult,
} from '../../../types/graphql';
import { sortProductListConfigBU } from '../../../configs/sort';
import { attributeCodeCSToMDC, attributeLabelConfig, attributeLabelOptionsConfig } from '../../../configs/filter';
import cache from '../../../configs/cache';
import configs from '../../../configs/vars';
import {
  sortProductOptionValues,
  sortFilterOptionByAlphabet,
  transformHierarchySubCategoriesByCategoryId,
} from '../transformer/cs2-transformer';
import { CSCategoryAggregation } from '../../../dataSource/catalogService/cs-graphql';

interface IProductLinksExtend extends IProductLinks {
  sku: string;
  children?: IConfigurableProductChild[];
}

interface IProductSearchFilterCategoryResultExtend extends IProductSearchFilterCategoryResult {
  categoryAggregations?: CSCategoryAggregation[];
}

const Reviewer: IReviewerResolvers<ResolverContext> = {
  province({ provinceId }, _, { dataSources }) {
    if (!provinceId) return null;

    return dataSources.locationUseCase.findProvinceById(provinceId);
  },
  email: () => '',
};

const ProductLinks: IProductLinksResolvers<ResolverContext, IProductLinksExtend> = {
  upSell({ upSellSKUs }, _, { dataSources }) {
    return dataSources.productUseCase.findBySkus(upSellSKUs);
  },
  crossSell({ crossSellSKUs }, _, { dataSources }) {
    return dataSources.productUseCase.findBySkus(crossSellSKUs);
  },
  related({ relatedSKUs }, _, { dataSources }) {
    return dataSources.productUseCase.findBySkus(relatedSKUs);
  },
  async similar({ breadcrumbs, sku, children }, _, { dataSources }) {
    if (configs.similarDisable) return [];

    return dataSources.productUseCase.findSimilarProduct(breadcrumbs, sku, children);
  },
};

const sorts = (_, __, { locale }) => {
  return sortProductListConfigBU.map(({ key, label, orderBy, sortBy }) => ({
    key,
    id: sortBy,
    label: label?.[locale] || label.en,
    direction: orderBy,
  }));
};

const filters = root => {
  const filters = root?.filters;
  return filters?.filter(item => {
    if (item.id === 'price') {
      const options = item.options as IV2ProductSearchFilterRangeResultOption[];
      const max = options.find(({ id }) => id === 'max')?.value;
      const min = options.find(({ id }) => id === 'min')?.value;
      if (max == -1 && min == 10000000) {
        return false;
      }
    }
    return true;
  });
};

const ProductSearchResult: IProductSearchResultResolvers = {
  sorts,
  filters,
};

const ProductRecommendResult: IProductRecommendResultResolvers = {
  sorts,
  filters,
};

const Product: IProductResolvers<ResolverContext> = {
  __resolveType(source) {
    if (source.type.toUpperCase() === IProductType.Configurable) {
      return 'V2ConfigurableProduct';
    }

    return 'V2SimpleProduct';
  },
};

const SimpleProduct: ISimpleProductResolvers<ResolverContext> = {
  async inventoryStock({ sku }, _, { dataSources }, info) {
    // when query inventoryStock will not cache
    info.cacheControl.setCacheHint({ maxAge: 0 });
    try {
      return await dataSources.productUseCase.findInventoryStockBySku(sku);
    } catch (e) {
      return null;
    }
  },
  links: ({ breadcrumbs, links, sku }) => {
    return {
      ...links,
      breadcrumbs,
      sku,
    };
  },
  async overlayImageUrl({ id, overlayImageUrl }, _, { dataSources }) {
    return dataSources.productUseCase.getOverlayImageUrl(id, overlayImageUrl);
  },
};

const ConfigurableProduct: IConfigurableProductResolvers<ResolverContext> = {
  links: ({ breadcrumbs, links, sku, children }) => {
    return {
      ...links,
      breadcrumbs,
      sku,
      children,
    };
  },
  async overlayImageUrl({ id, overlayImageUrl }, _, { dataSources }) {
    return dataSources.productUseCase.getOverlayImageUrl(id, overlayImageUrl);
  },
};

const ResolveTypeFilterResult = ({ id }) => {
  switch (id.toLowerCase()) {
    case 'price':
      return 'V2ProductSearchFilterRangeResult';
    case 'categories.id':
      return 'V2ProductSearchFilterCategoryResult';
    default:
      return 'V2ProductSearchFilterNormalResult';
  }
};

const ProductSearchFilterResult: IProductSearchFilterResultResolvers<ResolverContext> = {
  __resolveType: ResolveTypeFilterResult,
};

const V2ProductSearchFilterResultUnion: IV2ProductSearchFilterResultUnionResolvers = {
  __resolveType: ResolveTypeFilterResult,
};

const ProductSearchFilterNormalResult: IProductSearchFilterNormalResultResolvers<ResolverContext> = {
  label: async ({ id: attributeCode }, _, { dataSources, store, locale }) => {
    const attributeLabelConfigMapped = attributeLabelConfig[attributeCode]?.[locale];
    if (attributeLabelConfigMapped) {
      return attributeLabelConfigMapped;
    }

    const attributeCodeMapped = attributeCodeCSToMDC[attributeCode] ?? attributeCode;
    const result = await dataSources.magento.product.getAttributesByAttributeCode(attributeCodeMapped);
    const frontend_labels: { store_id: number; label: string }[] = result?.frontend_labels;
    const frontend_label = frontend_labels?.find(({ store_id }) => store_id === store.id);

    return frontend_label?.label || result?.default_frontend_label || attributeCode;
  },
  options: ({ id, options }, _, { locale }) => {
    const optionsMapped = options.map(option => ({
      ...option,
      label: attributeLabelOptionsConfig[id]?.[option.id]?.[locale] || option.label,
    }));

    if (id === 'brand_name' || id === 'color_group_name') {
      sortFilterOptionByAlphabet(optionsMapped);
    }

    return optionsMapped;
  },
};

const ProductSearchFilterRangeResult: IProductSearchFilterRangeResultResolvers<ResolverContext> = {
  label({ id }, _args, { locale }) {
    const configLabel = {
      price: {
        en: 'Price Range',
        th: 'ช่วงราคา',
      },
    };

    return configLabel[id][locale] ?? '';
  },
};

const ProductSearchFilterCategoryResult: IProductSearchFilterCategoryResultResolvers<
  ResolverContext,
  IProductSearchFilterCategoryResultExtend
> = {
  label(_, _args, { locale }) {
    const configLabel = {
      en: 'Category',
      th: 'หมวดหมู่',
    };

    return configLabel[locale] ?? '';
  },
  options({ options, categoryAggregations }, args) {
    const baseCategoryId = args?.baseCategoryId;

    if (baseCategoryId) {
      return transformHierarchySubCategoriesByCategoryId(categoryAggregations, baseCategoryId);
    }

    return options;
  },
};

const ConfigurableOption: IConfigurableOptionResolvers<ResolverContext> = {
  label: async ({ id }, _, { dataSources, store }) => {
    const result = await dataSources.magento.product.getAttributes(id);
    const frontend_labels: { store_id: number; label: string }[] = result?.frontend_labels;
    const frontend_label = frontend_labels?.find(({ store_id }) => store_id === store.id);

    return frontend_label?.label || result?.default_frontend_label;
  },
  attributeCode: async ({ id }, _, { dataSources }) => {
    const result = await dataSources.magento.product.getAttributes(id);

    return result?.attribute_code ?? '';
  },
  values: ({ values }) => {
    return sortProductOptionValues({ values, key: 'label' });
  },
};

const ProductOption: IProductOptionResolvers<ResolverContext> = {
  attributeCode: async ({ id }, _, { dataSources }) => {
    const result = await dataSources.magento.product.getAttributes(id);

    return result?.attribute_code ?? '';
  },
};

const Query: IQueryResolvers = {
  async v2ProductSearch(_source, { input }, { dataSources }, info) {
    info.cacheControl.setCacheHint({ maxAge: cache.CatalogService.find });

    return dataSources.productUseCase.search(input);
  },
  async v2ProductByUrlKey(_source, { urlKey }, { dataSources }) {
    return dataSources.productUseCase.findByUrlKey(urlKey);
  },
  async v2ProductBySKU(_source, { sku }, { dataSources }) {
    return dataSources.productUseCase.findProductDetailBySKU(sku);
  },
  async v2ProductById(_source, { id }, { dataSources }) {
    return dataSources.productUseCase.findProductDetailById(id);
  },
  async v2InventoryStockBySkus(_, { skus }, { dataSources }) {
    return dataSources.productUseCase.findInventoryStockBySkus(skus);
  },
  async v2ProductRecommendationByUser(_, { input }, { dataSources, store, customerToken }) {
    let userId = input?.customerId || '00000';
    if (!input?.customerId && customerToken) {
      const customer = await dataSources.magento.customer.getCustomer(store.code);
      userId = customer.id;
    }
    return dataSources.productUseCase.findRecommendationByUser({
      ...input,
      customerId: userId,
    });
  },
  async v2ProductSimilarBySKU(_source, { input }, { dataSources }) {
    return dataSources.productUseCase.findSimilarProductByDatalake(input);
  },
  async v2ProductAssociationBySKU(_source, { input }, { dataSources }) {
    return dataSources.productUseCase.findProductAssociationBySku(input);
  },
};

export const ProductResolvers: IResolvers = {
  Query,
  V2ProductLinks: ProductLinks,
  V2Reviewer: Reviewer,
  V2Product: Product,
  V2SimpleProduct: SimpleProduct,
  V2ConfigurableProduct: ConfigurableProduct,
  V2ProductSearchFilterResult: ProductSearchFilterResult,
  V2ConfigurableOption: ConfigurableOption,
  V2ProductSearchResult: ProductSearchResult,
  V2ProductRecommendResult: ProductRecommendResult,
  V2ProductSearchFilterRangeResult: ProductSearchFilterRangeResult,
  V2ProductSearchFilterNormalResult: ProductSearchFilterNormalResult,
  V2ProductSearchFilterCategoryResult: ProductSearchFilterCategoryResult,
  V2ProductOption: ProductOption,
  V2ProductSearchFilterResultUnion,
  V2ProductType: {
    SIMPLE: 'simple',
    CONFIGURABLE: 'configurable',
    BUNDLE: 'bundle',
    VIRTUAL: 'virtual',
  },
  V2ProductSearchFilterConditionInput: {
    EQ: 'equal',
    IN: 'in',
    GTE: 'greaterThanInclusive',
    LTE: 'lessThanInclusive',
  },
};
