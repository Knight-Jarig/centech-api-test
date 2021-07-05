import uniq from 'lodash/uniq';
import { ResolverContext } from '../../types';
import {
  IQueryResolvers,
  IResolvers,
  IProductAssociationBySkuResponse,
  IProductSimilarBySkuResponse,
  IProductAssociationViewBySkuResponse,
} from '../../types/graphql';
import typeDef from './types.graphql';
import productModel from '../../transform/product.model';
import { getProductsByPagination } from '../../utils/product.utils';

const Query: IQueryResolvers<ResolverContext> = {
  async productRecommendationBySku(_source, { sku }, context) {
    const { dataSources, locale, storeCode } = context;
    const productRecommendation = await dataSources.dataLakeRecommendation.productRecommendationBySku(locale, sku);
    const similarSameProductsSkus = productRecommendation?.[0]?.data?.[0]?.item || [];
    const similarDiffProductsSkus = productRecommendation?.[0]?.data?.[1]?.item || [];
    const alsoProductsSkus = productRecommendation?.[1]?.data?.[0]?.item || [];
    const skus = uniq([...similarSameProductsSkus, ...similarDiffProductsSkus, ...alsoProductsSkus]);
    if (!skus.length) {
      return {
        response: productRecommendation,
        products: null,
      };
    }
    const searchCriteria = buildSearchCriteria(skus);

    try {
      const productSearch = await dataSources.magento.catalogService.find(searchCriteria, storeCode || 'en');
      const products = (productSearch?.products || []).map(item => productModel.transform(item));
      const alsoViews = products.filter(item => alsoProductsSkus.includes(item.sku));
      const sameBrands = products.filter(item => similarSameProductsSkus.includes(item.sku));
      const diffBrands = products.filter(item => similarDiffProductsSkus.includes(item.sku));
      const dataProducts = {
        alsoViews,
        sameBrands,
        diffBrands,
      };
      return {
        response: productRecommendation,
        products: dataProducts,
      };
    } catch (e) {
      return {
        response: productRecommendation,
        products: null,
      };
    }
  },
  async homepageRecommendationByUserId(_source, { customerId }, context) {
    const { dataSources, store, locale, customerToken } = context;
    let userId = customerId || '0000'; // for guest
    // find user's id when user is member role
    if (!customerId && customerToken) {
      const customer = await dataSources.magento.customer.getCustomer(store.code);
      userId = customer.id;
    }

    const homepageRecommendation = await dataSources.dataLakeRecommendation.productRecommendationByUser(locale, userId);
    return homepageRecommendation;
  },
  async pwbProductAssociationBySku(_source, { input }, context): Promise<IProductAssociationBySkuResponse> {
    const { dataSources, locale, storeCode } = context;
    const { sku, limit = 0, page = 1 } = input;
    const productAssociation = await dataSources.dataLakeRecommendation.productAssociationBySku(locale, sku);

    const skus = trimAndFilterInputSku(sku, productAssociation?.data[0]?.item || []);
    const limitSkus = skus.slice(0, 50);

    if (!limitSkus.length) {
      return {
        products: null,
        totalCount: 0,
      };
    }
    const searchCriteria = buildSearchCriteria(limitSkus, 1, limitSkus.length);

    try {
      const productSearch = await dataSources.magento.catalogService.find(searchCriteria, storeCode);

      return getProductData(productSearch, limitSkus, page, limit);
    } catch (e) {
      return {
        products: null,
        totalCount: 0,
      };
    }
  },
  async pwbProductSimilarBySku(_source, { input }, context): Promise<IProductSimilarBySkuResponse> {
    const { dataSources, locale, storeCode } = context;
    const { sku, limit = 0, page = 1 } = input;
    const productSimilar = await dataSources.dataLakeRecommendation.productSimilarBySku(locale, sku);

    const skuSameBrand = productSimilar?.data?.find(dataItem => dataItem.code === 'same_brand')?.item || [];
    const skuDiffBrand = productSimilar?.data?.find(dataItem => dataItem.code === 'diff_brand')?.item || [];
    const skuFiller = productSimilar?.filler || [];

    const skus = trimAndFilterInputSku(sku, [...skuSameBrand, ...skuDiffBrand, ...skuFiller]);
    const limitSkus = skus.slice(0, 50);

    if (!limitSkus.length) {
      return {
        products: null,
        totalCount: 0,
      };
    }

    const searchCriteria = buildSearchCriteria(limitSkus, 1, limitSkus.length);

    try {
      const productSearch = await dataSources.magento.catalogService.find(searchCriteria, storeCode);

      return getProductData(productSearch, limitSkus, page, limit);
    } catch (e) {
      return {
        products: null,
        totalCount: 0,
      };
    }
  },
  async pwbProductAssociationViewBySku(_source, { input }, context): Promise<IProductAssociationViewBySkuResponse> {
    const { dataSources, locale, storeCode } = context;
    const { sku, limit = 0, page = 1 } = input;
    const productAssociationView = await dataSources.dataLakeRecommendation.productAssociationViewBySku(locale, sku);

    const skuAssoView =
      productAssociationView?.data?.find(dataItem => dataItem.code === 'product_asso_view')?.item || [];
    const skuFiller = productAssociationView?.filler || [];

    const skus = trimAndFilterInputSku(sku, [...skuAssoView, ...skuFiller]);
    const limitSkus = skus.slice(0, 50);

    if (!limitSkus.length) {
      return {
        products: null,
        totalCount: 0,
      };
    }

    const searchCriteria = buildSearchCriteria(limitSkus, 1, limitSkus.length);

    try {
      const productSearch = await dataSources.magento.catalogService.find(searchCriteria, storeCode);

      return getProductData(productSearch, limitSkus, page, limit);
    } catch (e) {
      return {
        products: null,
        totalCount: 0,
      };
    }
  },
};

const buildSearchCriteria = (skus: string[], page?: number, limit?: number) => {
  const filterGroups: any = [
    { filters: [{ field: 'status', value: '1' }] },
    { filters: [{ field: 'visibility', value: '4' }] },
    {
      filters: [
        {
          field: 'expr-p',
          value: "(stock.salable=1 OR (stock.ispu_salable=1 AND shipping_methods='storepickup_ispu'))",
        },
      ],
    },
    {
      filters: [
        {
          field: 'sku',
          value: skus.join(','),
          conditionType: 'in',
        },
      ],
    },
  ];

  return {
    filterGroups,
    page: page || 1,
    size: limit || 0,
    sortOrders: [],
  };
};

const sortProductAndFilterBySkuArray = (products, skus) => {
  return skus.reduce((acc, cur) => {
    const productData = products.find(product => `${product?.sku}`.toLowerCase() === `${cur}`.toLowerCase());
    acc = [...acc, ...(productData ? [productData] : [])];

    return acc;
  }, []);
};

const trimAndFilterInputSku = (inputSku: string, skus: string[]) => {
  const trimSkus = skus.map(mapSku => mapSku.trim());
  return uniq(trimSkus).filter(datalakeSku => `${datalakeSku}`.toLowerCase() !== `${inputSku}`.toLowerCase());
};

const getProductData = (productSearch, skus: string[], page: number, limit: number) => {
  const products = (productSearch?.products || []).map(item => productModel.transform(item));
  const totalCount = productSearch?.total_count || 0;

  const allData = sortProductAndFilterBySkuArray(products, skus);

  return {
    products: !!limit ? getProductsByPagination(allData, page, limit) : allData,
    totalCount,
  };
};

const resolver: IResolvers = {
  Query,
};

export { typeDef, resolver };
