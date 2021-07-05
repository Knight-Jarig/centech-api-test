import { CatalogServiceDataSource } from './CatalogServiceDataSource';
import { findProductDetailBySkus } from './query';
import cache from '../../configs/cache';
import configs from '../../configs/vars';
import { CSInFilterOption } from './cs-graphql';

class CatalogServiceDataSourceTest extends CatalogServiceDataSource {
  query() {
    return jest.fn() as any;
  }
}

describe(`CatalogServiceDataSource`, () => {
  const catalogService = new CatalogServiceDataSourceTest();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`findProductDetailBySkuNew`, () => {
    it(`findProductDetailBySkuNew`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'SKU';
      const variables = { store: 'cds', pagination: { offset: 0, size: 1 }, values: [skuCode] };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            products: { products: [] },
          },
        }) as any,
      );
      await catalogService.findProductDetailBySkuNew(skuCode);
      expect(catalogService.baseURL).toBe('url');
      expect(catalogService.query).toBeCalledWith(
        expect.objectContaining(findProductDetailBySkus),
        expect.objectContaining({ variables }),
        expect.objectContaining({ cacheOptions: { ttl: cache.CatalogService.find } }),
      );
    });

    it(`findProductDetailBySkuNew force elastic request`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'alternate',
            'x-force-debug-cs-response': '1',
          },
        },
      });
      const skuCode = 'SKU';
      configs.catalogService.base_url_alternate = 'url_alternate';

      await catalogService.findProductDetailBySkuNew(skuCode);
      expect(catalogService.baseURL).toBe('url_alternate?debug');
    });

    it(`findProductDetailBySkuNew alternateUrl`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'alternate',
          },
        },
      });
      const skuCode = 'SKU';
      configs.catalogService.base_url_alternate = 'url_alternate';

      await catalogService.findProductDetailBySkuNew(skuCode);
      expect(catalogService.baseURL).toBe('url_alternate');
    });
  });

  describe('findProductDetailBySKU', () => {
    it(`findProductDetailBySKU should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'SKU';
      const product = { sku: 'SKU' };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'searchProductDetail').mockReturnValue(
        Promise.resolve({
          products: [product],
          total: 0,
          aggregations: [],
          category_aggregations: [],
        }) as any,
      );

      const result = await catalogService.findProductDetailBySKU(skuCode);
      expect(result).toEqual(product);
    });
  });

  describe('findBySku', () => {
    it(`findBySku should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'SKU';
      const product = { sku: 'SKU' };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'search').mockReturnValue(
        Promise.resolve({
          products: [product],
          total: 0,
          aggregations: [],
          category_aggregations: [],
        }) as any,
      );

      const result = await catalogService.findBySku(skuCode);
      expect(result).toEqual(product);
    });
  });

  describe('findBySkus', () => {
    it(`findBySkus should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'SKU';
      const product = { sku: 'SKU' };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'search').mockReturnValue(
        Promise.resolve({
          products: [product],
          total: 0,
          aggregations: [],
          category_aggregations: [],
        }) as any,
      );

      const result = await catalogService.findBySkus([skuCode]);
      expect(result).toEqual([product]);
    });
  });

  describe('findBySkuNew', () => {
    it(`findBySkuNew should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'SKU';
      const product = { id: '123', sku: 'SKU', configurable_products: [] };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            products: { products: [product] },
            total: 0,
            aggregations: [],
            category_aggregations: [],
          },
        }) as any,
      );

      const result = await catalogService.findBySkuNew(skuCode);
      expect(result).toEqual(product);
    });
  });

  describe('findBySkusNew', () => {
    it(`findBySkusNew should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'SKU';
      const product = { id: '123', sku: 'SKU', configurable_products: [] };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            products: { products: [product] },
            total: 0,
            aggregations: [],
            category_aggregations: [],
          },
        }) as any,
      );

      const result = await catalogService.findBySkusNew([skuCode]);
      expect(result).toEqual([product]);
    });
  });

  describe('findById', () => {
    it(`findById should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'ID';
      const product = { id: 'ID', sku: 'SKU' };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'search').mockReturnValue(
        Promise.resolve({
          products: [product],
          total: 0,
          aggregations: [],
          category_aggregations: [],
        }) as any,
      );

      const result = await catalogService.findById(skuCode);
      expect(result).toEqual(product);
    });
  });

  describe('findByIds', () => {
    it(`findByIds should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'ID';
      const product = { id: 'ID', sku: 'SKU' };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'search').mockReturnValue(
        Promise.resolve({
          products: [product],
          total: 0,
          aggregations: [],
          category_aggregations: [],
        }) as any,
      );

      const result = await catalogService.findByIds([skuCode]);
      expect(result).toEqual([product]);
    });
  });

  describe('findDetailByIds', () => {
    it(`findDetailByIds should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'ID';
      const product = { id: 'ID', sku: 'SKU' };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'searchProductDetail').mockReturnValue(
        Promise.resolve({
          products: [product],
          total: 0,
          aggregations: [],
          category_aggregations: [],
        }) as any,
      );

      const result = await catalogService.findDetailByIds([skuCode]);
      expect(result).toEqual([product]);
    });
  });

  describe('findByIdNew', () => {
    it(`findByIdNew should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'ID';
      const product = { id: 'ID', sku: 'SKU', configurable_products: [] };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            products: { products: [product] },
            total: 0,
            aggregations: [],
            category_aggregations: [],
          },
        }) as any,
      );

      const result = await catalogService.findByIdNew(skuCode);
      expect(result).toEqual(product);
    });
  });

  describe('findByIdsNew', () => {
    it(`findByIdsNew should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'ID';
      const product = { id: 'ID', sku: 'SKU', configurable_products: [] };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            products: { products: [product] },
            total: 0,
            aggregations: [],
            category_aggregations: [],
          },
        }) as any,
      );

      const result = await catalogService.findByIdsNew([skuCode]);
      expect(result).toEqual([product]);
    });
  });

  describe('findProductDetailByIdNew', () => {
    it(`findProductDetailByIdNew should run properly`, async () => {
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers: {
            'x-intent-alias': 'not-alternate',
          },
        },
      });
      const skuCode = 'ID';
      const product = { id: 'ID', sku: 'SKU', configurable_products: [{ id: '1234', sku: 'sku' }] };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            products: { products: [product] },
            total: 0,
            aggregations: [],
            category_aggregations: [],
          },
        }) as any,
      );

      const result = await catalogService.findProductDetailByIdNew(skuCode);
      expect(result).toEqual(product);
    });
  });

  describe('search', () => {
    it(`search should run properly`, async () => {
      const args = { store: 'CDS', locale: 'TH' };
      const product = { id: 'ID', sku: 'SKU', configurable_products: [] };
      const search = {
        total: 0,
        aggregations: [],
        category_aggregations: [],
      };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            search: {
              ...search,
              products: { products: [product] },
            },
          },
        }) as any,
      );

      const result = await catalogService.search(args);
      const expected = { ...search, products: [{ id: 'ID', sku: 'SKU' }] };
      expect(result).toEqual(expected);
    });
  });

  describe('searchProductDetail', () => {
    it(`searchProductDetail should run properly`, async () => {
      const args = { store: 'CDS', locale: 'TH' };
      const product = { id: 'ID', sku: 'SKU', configurable_products: [] };
      const search = {
        total: 0,
        aggregations: [],
        category_aggregations: [],
      };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            search: {
              ...search,
              products: { products: [product] },
            },
          },
        }) as any,
      );

      const result = await catalogService.searchProductDetail(args);
      const expected = { ...search, products: [{ id: 'ID', sku: 'SKU' }] };
      expect(result).toEqual(expected);
    });
  });

  describe('findByUrl', () => {
    it(`findByUrl should run properly`, async () => {
      const args = { url: 'url_key', locale: 'TH' };
      const product = { id: 'ID', sku: 'SKU', url_key: 'url_key', configurable_products: ['a'] };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            findByUrlKey: {
              product,
            },
          },
        }) as any,
      );

      const result = await catalogService.findByUrl(args);
      expect(result).toEqual({ product });
    });
  });

  describe('legacySearch', () => {
    it(`legacySearch should run properly`, async () => {
      const args = { store: 'cds', locale: 'TH', filter: { inFilters: [{ filterBy: CSInFilterOption.BrandName }] } };
      const product = { id: 'ID', sku: 'SKU', url_key: 'url_key', configurable_products: ['a'] };
      const search = {
        total: 0,
        aggregations: [{ field: ['brand_name'] }],
        category_aggregations: [],
      };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            search: {
              ...search,
              product,
            },
          },
        }) as any,
      );

      const result = await catalogService.legacySearch(args);
      expect(result).toEqual({ ...search, product });
    });
  });

  describe('suggestSearch', () => {
    it(`suggestSearch should run properly`, async () => {
      const args = { store: 'cds', locale: 'TH', keyword: 'keyword', product_size: 1, category_size: 1 };
      const product = { id: 'ID', sku: 'SKU', url_key: 'url_key', configurable_products: ['a'] };
      const search = {
        total: 0,
        aggregations: [{ field: ['brand_name'] }],
        category_aggregations: [],
      };
      configs.catalogService.base_url = 'url';

      jest.spyOn(catalogService, 'query').mockReturnValue(
        Promise.resolve({
          data: {
            suggestSearch: {
              ...search,
              product,
            },
          },
        }) as any,
      );

      const result = await catalogService.suggestSearch(args);
      expect(result).toEqual({ ...search, product });
    });
  });

  describe('willSendRequest', () => {
    it(`willSendRequest should run properly`, async () => {
      const headers = {
        'x-intent-alias': 'not-alternate',
        'x-request-id': '1',
      };
      catalogService.initialize({
        context: {
          bu: 'cds',
          headers,
          requestId: '1',
        },
      });
      const request = {
        headers,
      };
      await catalogService.willSendRequest(request);
      expect(request.headers).toEqual(headers);
    });
  });
});
