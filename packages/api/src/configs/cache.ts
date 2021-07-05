import dotenv from 'dotenv';
dotenv.config();

const defaultCache = +process.env.CACHE_TIME_DEFAULT || 300;
const longCache = +process.env.CACHE_TIME_LONG || 3600;
const shortCache = +process.env.CACHE_TIME_SHORT || 60;
const catalogServiceCache = +process.env.CATALOG_SERVICE_CACHE_TIME || defaultCache;

const cmsCahce = +process.env.CACHE_TIME_CMS || longCache;

const cacheWithClientSuffix = ['V1/store/storeConfigs'];

const customPrefix = 'custom:';

export default {
  cacheWithClientSuffix,
  CaMP: {
    getVouchers: defaultCache,
  },
  CatalogService: {
    urlKey: catalogServiceCache,
    find: catalogServiceCache,
    getSearchSuggestion: catalogServiceCache,
    getSearchTrending: catalogServiceCache,
    getPreFilterAggregation: catalogServiceCache,
    suggestSearch: catalogServiceCache,
  },
  ConsentService: {
    getInfo: longCache,
  },
  CMS: {
    getCms: defaultCache,
    getCmsV2: defaultCache,
    getCmsV2Mobile: defaultCache,
  },
  CMSAPI: {
    getCmsPage: cmsCahce,
  },
  CMSBlockAPI: {
    find: cmsCahce,
    findOne: cmsCahce,
  },
  CategoryAPI: {
    all: defaultCache,
    find: defaultCache,
    findOne: defaultCache,
  },
  BannerAPI: {
    find: cmsCahce,
  },
  OrderAPI: {
    search: defaultCache,
    searchOrders: defaultCache,
    fetchOrder: defaultCache,
    fetchOrderPackageStatus: defaultCache,
  },
  ProductAPI: {
    findBySku: defaultCache,
    findByUrl: defaultCache,
    compareProducts: defaultCache,
    getOverlay: defaultCache,
    getAttributes: longCache,
  },
  PromotionAPI: {
    suggestion: defaultCache,
  },
  RegionApi: {
    getRegions: longCache,
    getRegionByPostcode: longCache,
    getDistricts: longCache,
    getSubDistricts: longCache,
  },
  StoreConfigAPI: {
    find: defaultCache,
  },
  UrlRewriteApi: {
    find: longCache,
  },
  CouponAPI: {
    list: shortCache,
  },
  DeliveryMethodAPI: {
    list: defaultCache,
  },
  DeliveryOptionAPI: {
    list: defaultCache,
  },
  FlashDealAPI: {
    list: defaultCache,
  },
  StoreLocatorAPI: {
    list: defaultCache,
    getById: defaultCache,
  },
  StorePickAPI: {
    list: shortCache,
    shipFromStoreAvailableTime: longCache,
  },
  VipAPI: {
    list: longCache,
  },
  PricingAPI: {
    getRetailerIdByPostcode: defaultCache,
    list: defaultCache,
    getPrice: defaultCache,
  },
  DatatLake: {
    search: defaultCache,
    searchSuggestionTerms: defaultCache,
    searchTrendingTerms: defaultCache,
    productRecommendationByUser: defaultCache,
    productRecommendationHomepage: defaultCache,
    productAssociationBySku: defaultCache,
    productSimilarBySku: defaultCache,
    productAssociationViewBySku: defaultCache,
  },
  ElasticSearch: {
    searchKeywordSuggestion: longCache,
  },
  T1Passport: {
    getProfile: defaultCache,
  },
  Categories: {
    categoriesTree: {
      key: customPrefix + "categoriesTree",
      ttl: defaultCache
    },
  },
  Instagram: {
    getPosts: defaultCache,
  },
};
