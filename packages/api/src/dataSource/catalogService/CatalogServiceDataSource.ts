import DataLoader from 'dataloader';
import { GraphQLDataSource } from '../GraphQLDataSource';
import configs from '../../configs/vars';
import { DataSource } from 'apollo-datasource';
import {
  FIND_BY_URL_KEY,
  findByIds,
  findBySkus,
  findProductDetailByIds,
  findProductDetailBySkus,
  LEGACY_SEARCH,
  LEGACY_SEARCH_AGGREGATION,
  SEARCH,
  SEARCH_PRODUCT_DETAIL,
  SUGGEST_SEARCH,
} from './query';
import { ResolverContext } from '../../types';
import {
  CSFindByUrlKey,
  CSInFilterOption,
  CSProduct,
  CSProductResult,
  CSQueryFindByIdOrSkuArgs,
  CSQuerySearchArgs,
  CSQuerySuggestSearchArgs,
  CSSearch,
} from './cs-graphql';
import cache from '../../configs/cache';
import { DocumentNode } from 'graphql';

const ALTERNATE = 'alternate';

export class CatalogServiceDataSource extends GraphQLDataSource implements DataSource {
  context: ResolverContext;

  private idDataloader = this.createDataloader(CSInFilterOption.Id);
  private skuDataloader = this.createDataloader(CSInFilterOption.Sku);
  private productDetailSKUDataloader = this.createProductDetailSKUDataloader(CSInFilterOption.Sku);
  private productDetailIdDataloader = this.createProductDetailSKUDataloader(CSInFilterOption.Id);
  private productDetailIdDataloaderNew = this.createSKUsOrIDsDataloader(findProductDetailByIds, 'id');
  private productDetailSKUDataloaderNew = this.createSKUsOrIDsDataloader(findProductDetailBySkus, 'sku');
  private idDataloaderNew = this.createSKUsOrIDsDataloader(findByIds, 'id');
  private skuDataloaderNew = this.createSKUsOrIDsDataloader(findBySkus, 'sku');
  private urlKeyDataloader = new DataLoader<string, CSProduct>(
    (urlKeys: readonly string[]) => {
      return Promise.all(
        urlKeys.map(url =>
          this.query(
            FIND_BY_URL_KEY,
            {
              query: FIND_BY_URL_KEY,
              variables: { url, locale: this.context.locale },
            },
            { cacheOptions: { ttl: cache.CatalogService.urlKey } },
          ).then(result => {
            return result.data?.findByUrlKey.product;
          }),
        ),
      ).then(products => {
        const byKey = (products ?? []).reduce((memo, product) => {
          if (!product) return memo;
          return {
            ...memo,
            [product.url_key.toLowerCase()]: product,
          };
        }, {});

        return urlKeys.map(key => byKey[key.toLowerCase()]);
      });
    },
    { batch: false },
  );

  initialize(config) {
    super.initialize(config);
  }

  get baseURL() {
    let url;
    if (this.context.headers['x-intent-alias'] === ALTERNATE) {
      url = configs.catalogService.base_url_alternate || configs.catalogService.base_url;
    } else {
      url = configs.catalogService.base_url;
    }

    if (this.context.headers['x-force-debug-cs-response'] === '1') {
      url += '?debug';
    }
    return url;
  }

  willSendRequest(request) {
    request.headers = {
      ...request.headers,
      'x-intent-alias': this.context.headers['x-intent-alias'],
      'x-request-id': this.context.requestId,
    };
  }

  async findProductDetailBySKU(sku: string): Promise<CSProduct> {
    const product = await this.productDetailSKUDataloader.load(sku);

    return product;
  }

  async findBySku(sku: string): Promise<CSProduct> {
    const product = await this.skuDataloader.load(sku.toUpperCase());

    return product;
  }

  async findBySkus(skus: string[]): Promise<CSProduct[]> {
    const product = await this.skuDataloader.loadMany(skus.map(sku => sku.toUpperCase()));

    return product;
  }

  async findBySkuNew(sku: string): Promise<CSProduct> {
    const product = await this.skuDataloaderNew.load(sku.toUpperCase());

    return product;
  }

  async findBySkusNew(skus: string[]): Promise<CSProduct[]> {
    const product = await this.skuDataloaderNew.loadMany(skus.map(sku => sku.toUpperCase()));

    return product;
  }

  async findById(id: string): Promise<CSProduct> {
    return this.idDataloader.load(id);
  }

  async findByIds(ids: string[]): Promise<CSProduct[]> {
    return this.idDataloader.loadMany(ids);
  }

  async findDetailByIds(ids: string[]): Promise<CSProduct[]> {
    return this.productDetailIdDataloader.loadMany(ids);
  }

  async findByIdNew(id: string): Promise<CSProduct> {
    return this.idDataloaderNew.load(id);
  }

  async findByIdsNew(ids: string[]): Promise<CSProduct[]> {
    return this.idDataloaderNew.loadMany(ids);
  }

  async findProductDetailByIdNew(id: string): Promise<CSProduct> {
    return this.productDetailIdDataloaderNew.load(id);
  }

  async findProductDetailBySkuNew(sku: string): Promise<CSProduct> {
    return this.productDetailSKUDataloaderNew.load(sku);
  }

  async search(variables: CSQuerySearchArgs): Promise<CSSearch> {
    const response = await this.query(
      SEARCH,
      { query: SEARCH, variables },
      { cacheOptions: { ttl: cache.CatalogService.find } },
    );

    ((response.data?.search as CSSearch) ?? { products: [] }).products
      .flatMap(product => product.configurable_products ?? [])
      .forEach(product => {
        this.idDataloader.prime(product.id.toString(), product);
        this.skuDataloaderNew.prime(product.sku.toUpperCase(), product);
        this.skuDataloader.prime(product.sku.toUpperCase(), product);
      });

    ((response.data?.search as CSSearch) ?? { products: [] }).products.forEach(product => {
      this.idDataloader.prime(product.id.toString(), product);
      this.skuDataloaderNew.prime(product.sku.toUpperCase(), product);
      this.skuDataloader.prime(product.sku.toUpperCase(), product);
    });
    return (
      response.data?.search ?? {
        products: [],
        total: 0,
        aggregations: [],
        category_aggregations: [],
      }
    );
  }

  async searchProductDetail(variables: CSQuerySearchArgs): Promise<CSSearch> {
    const response = await this.query(
      SEARCH_PRODUCT_DETAIL,
      { query: SEARCH_PRODUCT_DETAIL, variables },
      { cacheOptions: { ttl: cache.CatalogService.find } },
    );

    ((response.data?.search as CSSearch) ?? { products: [] }).products
      .flatMap(product => product.configurable_products ?? [])
      .forEach(product => {
        this.idDataloader.prime(product.id.toString(), product);
        this.skuDataloaderNew.prime(product.sku.toUpperCase(), product);
        this.skuDataloader.prime(product.sku.toUpperCase(), product);
      });

    ((response.data?.search as CSSearch) ?? { products: [] }).products.forEach(product => {
      this.idDataloader.prime(product.id.toString(), product);
      this.skuDataloaderNew.prime(product.sku.toUpperCase(), product);
      this.skuDataloader.prime(product.sku.toUpperCase(), product);
    });
    return (
      response.data?.search ?? {
        products: [],
        total: 0,
        aggregations: [],
        category_aggregations: [],
      }
    );
  }

  async findByUrl(variables: { url: string; locale: string }): Promise<CSFindByUrlKey> {
    const product = await this.urlKeyDataloader.load(variables.url);

    if (product?.configurable_products) {
      product.configurable_products.forEach(configurableProduct => {
        this.idDataloader.prime(product.id.toString(), configurableProduct);
        this.skuDataloaderNew.prime(product.sku.toUpperCase(), configurableProduct);
        this.skuDataloader.prime(product.sku.toUpperCase(), configurableProduct);
      });
    }

    return {
      product,
    };
  }

  async legacySearch(variables: CSQuerySearchArgs): Promise<any> {
    const response = await this.query(
      LEGACY_SEARCH,
      { query: LEGACY_SEARCH, variables },
      { cacheOptions: { ttl: cache.CatalogService.find } },
    );

    const { store, locale, keyword, filter } = variables;
    await this.getPreFilterAggregation(store, locale, keyword, filter, 'SEARCH', LEGACY_SEARCH_AGGREGATION, response);

    return response.data?.search;
  }

  async suggestSearch(variables: CSQuerySuggestSearchArgs) {
    const response = await this.query(
      SUGGEST_SEARCH,
      { query: SUGGEST_SEARCH, variables },
      { cacheOptions: { ttl: cache.CatalogService.suggestSearch } },
    );

    return (
      response.data?.suggestSearch ?? {
        products: [],
        categories: [],
      }
    );
  }

  private async getPreFilterAggregation(
    store: string,
    locale: string,
    keyword: string,
    filter: any,
    func: string,
    QUERY_GQL: any,
    response: any,
  ) {
    if (filter && response.data?.search?.aggregations) {
      if (preFilterAggregationConfig[store] && preFilterAggregationConfig[store][func]) {
        let numFound = 0;
        let foundKey = '';

        filterTypes.forEach(filterType => {
          const filters = filter[filterType];
          if (filters) {
            let newFilters = filters;
            filters.forEach(filterObj => {
              const key = filterObj.filterBy;
              if (preFilterAggregationConfig[store][func].includes(key)) {
                newFilters = newFilters.filter(obj => obj.filterBy != key);
                numFound++;
                foundKey = key;
              }
            });
            filter[filterType] = newFilters;
          }
        });

        if (numFound == 1) {
          const pagination = {
            size: 0,
            offset: 0,
          };
          const AGGR_VARIABLES = {
            store,
            locale,
            keyword,
            sort: null,
            pagination,
            filter,
          };
          const AGGR_RESPONSE = await this.query(
            QUERY_GQL,
            { query: QUERY_GQL, variables: AGGR_VARIABLES },
            { cacheOptions: { ttl: cache.CatalogService.find } },
          );

          if (AGGR_RESPONSE.data?.search) {
            AGGR_RESPONSE.data.search.aggregations.forEach(preAggrObj => {
              if (preAggrObj.field.includes(foundKey.toLowerCase())) {
                for (let i = 0; i < response.data.search.aggregations.length; i++) {
                  if (response.data.search.aggregations[i].field == preAggrObj.field) {
                    response.data.search.aggregations[i] = preAggrObj;
                  }
                }
              }
            });
          }
        }
      }
    }
    return response;
  }

  private findBySKUsOrIDs = async (query, variables) => {
    const response = await this.query(
      query,
      { query, variables },
      { cacheOptions: { ttl: cache.CatalogService.find } },
    );

    ((response.data?.products as CSProductResult) ?? { products: [] }).products
      .flatMap(product => product.configurable_products ?? [])
      .forEach(product => {
        this.idDataloader.prime(product.id.toString(), product);
        this.skuDataloader.prime(product.sku.toUpperCase(), product);
        this.skuDataloaderNew.prime(product.sku.toUpperCase(), product);
      });

    return response.data?.products ?? [];
  };

  private createDataloader(filterBy: CSInFilterOption) {
    return new DataLoader(async (params: string[]) => {
      const args: CSQuerySearchArgs = {
        store: this.context.bu,
        locale: this.context.locale,
        // pagination: { offset: 0, size: params.length },
        pagination: { offset: 0, size: 60 },
        filter: {
          inFilters: [{ filterBy, filterValues: params }],
        },
      };
      const { products } = await this.search(args);
      const productByCriteria = (products ?? []).reduce(
        (all, product) => ({ ...all, [product[filterBy.toLowerCase()]]: product }),
        {},
      );
      return params.map(param => productByCriteria[param]);
    });
  }

  private createProductDetailSKUDataloader(filterBy: CSInFilterOption) {
    return new DataLoader(async (params: string[]) => {
      const args: CSQuerySearchArgs = {
        store: this.context.bu,
        locale: this.context.locale,
        pagination: { offset: 0, size: 60 },
        filter: {
          inFilters: [{ filterBy, filterValues: params }],
        },
      };
      const { products } = await this.searchProductDetail(args);
      const productByCriteria = (products ?? []).reduce(
        (all, product) => ({ ...all, [product[filterBy.toLowerCase()]]: product }),
        {},
      );
      return params.map(param => productByCriteria[param]);
    });
  }

  private createSKUsOrIDsDataloader(query: DocumentNode, key: string) {
    return new DataLoader(async (params: string[]) => {
      const args: CSQueryFindByIdOrSkuArgs = {
        store: this.context.bu,
        locale: this.context.locale,
        pagination: {
          offset: 0,
          size: params.length,
        },
        values: params,
      };

      const { products } = await this.findBySKUsOrIDs(query, args);

      const productByCriteria = (products ?? []).reduce((all, product) => {
        const value = {};
        const productKey = product[key] && `${product[key]}`.toLowerCase();
        if (product) value[productKey] = product;
        return {
          ...all,
          ...value,
        };
      }, {});

      return params.map(param => {
        return productByCriteria[`${param}`.toLowerCase()] || null;
      });
    });
  }
}

const filterTypes = ['exactFilters', 'inFilters', 'rangeFilters'];

const preFilterAggregationConfig = {
  cds: {
    SEARCH: ['BRAND_NAME', 'COLOR_GROUP_NAME', 'PRICE'],
  },
  rbs: {
    SEARCH: ['BRAND_NAME', 'COLOR_GROUP_NAME', 'PRICE'],
  },
};
