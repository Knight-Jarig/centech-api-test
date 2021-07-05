import { ProductUseCase } from './ProductUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import DataLakeRecommendationApi from '../../../dataSource/dataLakeRecommendationApi';
import DataLakeAppRecommendationApi from '../../../dataSource/dataLakeAppRecommendationApi';
import { Prime } from '../../../dataSource/prime';
import { transformProduct } from '../transformer/cs2-transformer';
import { getSaleRuleOverlayImageUrl } from '../transformer/mdc-transformer';
import {
  mockProductDetailCSResponse,
  mockProductDetailResult,
  mockProductDetailResponse,
  mockProductDetailResponse2,
  mockDataFindByIdOrSku,
  mockCartPriceRuleOverlays,
  mockDataFindBySKUsNew,
  mockResponseFindBySKUsNew,
  mockProductSimilarResponse,
  mockProductSimilarResult1,
  mockProductSimilarResult2,
  mockProductSimilarResult3,
  mockProductAssociationResponse1,
  mockProductAssociationResponse2,
} from './__mocks__/Products';
import {
  mockProductRecommendedCS,
  mockProductsResult,
  mockDataLakeProductRecommendationByUser,
  mockProductsResultLimit2,
  mockProductRecommendedCSLimit2,
  mockDataLakeProductSimilarAndAssociation,
  mockDataLakeAppProductRecommendationByUser,
} from './__mocks__/ProductsRecommend';
import { IV2ProductSearchFilterConditionInput } from '../../../types/graphql';
import { ApplicationError } from '../../../error/ApplicationError';
jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('../../../dataSource/catalogService');
jest.mock('../../../dataSource/prime');
jest.mock('../../../dataSource/dataLakeRecommendationApi');
jest.mock('../../../dataSource/dataLakeAppRecommendationApi');
jest.mock('../../../configs/vars.ts');

const secureBaseMediaUrl = 'secureBaseMediaUrl/';
const jsonParseStringify = value => JSON.parse(JSON.stringify(value));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Product Usecase', () => {
  const magento = new MagentoDataSource();
  const catalogService = new CatalogServiceDataSource();
  const prime = new Prime();
  const dataLakeRecommendation = new DataLakeRecommendationApi();
  const dataLakeAppRecommendation = new DataLakeAppRecommendationApi();
  const productUseCase = new ProductUseCase({
    magento,
    catalogService,
    prime,
    dataLakeRecommendation,
    dataLakeAppRecommendation,
  });

  const context = {
    bu: 'cds',
    store: {
      secure_base_media_url: secureBaseMediaUrl,
    },
    locale: 'th',
  };
  productUseCase.initialize({ context });

  it('findProductDetailBySKU: Should return error: Product not found', async () => {
    jest.spyOn(catalogService, 'findProductDetailBySkuNew').mockReturnValue(Promise.resolve(null));

    await expect(() => productUseCase.findProductDetailBySKU('SKU')).rejects.toThrow('Product not found');
  });

  it('findProductDetailBySKU: Should return product successful as minimum expect fields', async () => {
    jest
      .spyOn(catalogService, 'findProductDetailBySkuNew')
      .mockReturnValue(Promise.resolve(mockProductDetailCSResponse));

    const result = await productUseCase.findProductDetailBySKU('SKU');
    expect(result).toMatchObject(mockProductDetailResult);
  });

  it('findProductDetailById: Should return error: Product not found', async () => {
    jest.spyOn(catalogService, 'findProductDetailBySkuNew').mockReturnValue(Promise.resolve(null));

    await expect(() => productUseCase.findProductDetailById('ID')).rejects.toThrow('Product not found');
  });

  it('findProductDetailById: Should return product successful as minimum expect fields', async () => {
    jest
      .spyOn(catalogService, 'findProductDetailByIdNew')
      .mockReturnValue(Promise.resolve(mockProductDetailCSResponse));

    const result = await productUseCase.findProductDetailById('ID');
    expect(result).toMatchObject(mockProductDetailResult);
  });

  it(`should return label of filter range in en`, async () => {
    jest.spyOn(catalogService, 'findByIdNew').mockReturnValue(Promise.resolve(null));

    expect(async () => await productUseCase.findByIdNew(null)).rejects.toThrow();
  });

  it(`return data as expect`, async () => {
    jest.spyOn(catalogService, 'findByIdNew').mockReturnValue(Promise.resolve(mockDataFindByIdOrSku as any));

    const response = await productUseCase.findByIdNew('1');
    expect(response).toEqual(
      transformProduct(mockDataFindByIdOrSku as any, { secure_base_media_url: secureBaseMediaUrl } as any),
    );
  });

  it('findSimilarProduct', async () => {
    const sku = 'CDS20283674';
    jest.spyOn(productUseCase, 'search').mockReturnValue(
      Promise.resolve({
        totalCount: 0,
        filters: [],
        products: mockProductDetailResponse as any,
        sorts: [],
      }),
    );

    const mockBreadcrumb = [
      {},
      {},
      {},
      {
        id: 1234,
      },
    ];

    const result = await productUseCase.findSimilarProduct(mockBreadcrumb as any, sku);

    expect(productUseCase.search).toBeCalledWith({
      filters: [
        { condition: 'in', id: 'visibility', optionIds: ['2', '4'] },
        { condition: 'in', id: 'categories.id', optionIds: [1234] },
      ],
      limit: 11,
      page: 1,
    });
    expect(result).toEqual([mockProductDetailResult]);
  });

  it('findSimilarProduct exclude children sku', async () => {
    const sku = 'CDS20283674';
    jest.spyOn(productUseCase, 'search').mockReturnValue(
      Promise.resolve({
        totalCount: 0,
        filters: [],
        products: mockProductDetailResponse2 as any,
        sorts: [],
      }),
    );

    const mockBreadcrumb = [
      {},
      {},
      {},
      {
        id: 1234,
      },
    ];

    const childrenSkus = [
      {
        product: { sku: 'CDS15724151' },
      },
    ];

    const result = await productUseCase.findSimilarProduct(mockBreadcrumb as any, sku, childrenSkus as any);

    expect(productUseCase.search).toBeCalledWith({
      filters: [
        { condition: 'in', id: 'visibility', optionIds: ['2', '4'] },
        { condition: 'in', id: 'categories.id', optionIds: [1234] },
      ],
      limit: 11,
      page: 1,
    });
    expect(result).toEqual([mockProductDetailResult]);
  });

  it('findSimilarProduct with empty', async () => {
    const sku = 'CDS20283674';
    jest.spyOn(productUseCase, 'search').mockReturnValue(
      Promise.resolve({
        totalCount: 0,
        filters: [],
        products: [],
        sorts: [],
      }),
    );

    const result = await productUseCase.findSimilarProduct([], sku);
    expect(result).toEqual([]);
  });

  describe('findCartPriceRuleOverlay', () => {
    it('should return data as expect', async () => {
      const id = '983';

      jest.spyOn(magento.product, 'getSaleRuleOverlays').mockReturnValue(Promise.resolve(mockCartPriceRuleOverlays));

      const result = await productUseCase.findCartPriceRuleOverlay(id);
      expect(result).toEqual(getSaleRuleOverlayImageUrl(mockCartPriceRuleOverlays, context.store as any));
    });

    it('should return null when not found sale rule', async () => {
      const id = '984';
      const mockData = [];

      jest.spyOn(magento.product, 'getSaleRuleOverlays').mockReturnValue(Promise.resolve(mockData));

      const result = await productUseCase.findCartPriceRuleOverlay(id);
      expect(result).toEqual(getSaleRuleOverlayImageUrl(mockData, context.store as any));
    });
  });

  describe('findRecommendationByUser', () => {
    const page = 1;
    const customerId = '3633';
    const filters = [
      { condition: 'EQ' as any, id: 'recommended', optionIds: ['1'] },
      { condition: 'EQ' as any, id: 'status', optionIds: ['1'] },
      { condition: 'EQ' as any, id: 'is_in_stock', optionIds: ['true'] },
      { condition: 'IN' as any, id: 'visibility', optionIds: ['2', '4'] },
      { condition: 'GTE' as any, id: 'price', optionIds: ['10'] },
      { condition: 'EQ' as any, id: 'sku', optionIds: ['1234'] },
    ];
    const sort = { direction: 'DESC', id: 'recommened_sort_order' } as any;
    jest
      .spyOn(dataLakeRecommendation, 'productRecommendationByUser')
      .mockReturnValue(Promise.resolve(mockDataLakeProductRecommendationByUser));
    jest
      .spyOn(dataLakeAppRecommendation, 'productRecommendationByUser')
      .mockReturnValue(Promise.resolve(mockDataLakeAppProductRecommendationByUser));
    it('should return data as expect with arguments page and limit', async () => {
      const page = 2;
      const limit = 2;
      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 4,
          filters: [],
          products: mockProductRecommendedCSLimit2 as any,
          sorts: [],
        }),
      );
      const result = await productUseCase.findRecommendationByUser({ customerId, page, limit });
      expect(result).toEqual(mockProductsResultLimit2);
    });
    it('should return data as expect without arguments page and limit', async () => {
      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 6,
          filters: [],
          products: mockProductRecommendedCS as any,
          sorts: [],
        }),
      );
      const result = await productUseCase.findRecommendationByUser({ customerId });
      expect(result).toEqual(mockProductsResult);
    });
    it('should return data as expect without arguments limit', async () => {
      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 6,
          filters: [],
          products: mockProductRecommendedCS as any,
          sorts: [],
        }),
      );
      const result = await productUseCase.findRecommendationByUser({ customerId, page });
      expect(result).toEqual(mockProductsResult);
    });

    it('should return data as expect with filter and sorts', async () => {
      const limit = 6;
      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 6,
          filters: [],
          products: mockProductRecommendedCS as any,
          sorts: [],
        }),
      );
      const expectedFilter = [
        {
          condition: 'in',
          id: 'visibility',
          optionIds: ['2', '4'],
        },
        {
          condition: 'in',
          id: 'sku',
          optionIds: [
            'CDS26735481',
            'CDS23103283',
            'CDS23290266',
            'CDS18735444',
            'CDS17278072',
            'CDS8451903',
            'MKP0239946',
            'CDS23803220',
            'CDS16968929',
            'CDS3684511',
            'CDS21537417',
            'CDS12298600',
            'MKP0025628',
            'CDS24926973',
            'CDS18361575',
            'CDS14284212',
            'CDS18427097',
            'CDS23068711',
            'CDS21167539',
            'CDS19257532',
            'CDS3551028',
            'MKP0025624',
            'CDS12075317',
            'CDS21004155',
            'MKP0254715',
            'CDS14116568',
            'CDS13289942',
            'CDS23282421',
          ],
        },
        {
          condition: 'in',
          id: 'is_in_stock',
          optionIds: ['1'],
        },
        {
          condition: 'EQ',
          id: 'recommended',
          optionIds: ['1'],
        },
        {
          condition: 'EQ',
          id: 'status',
          optionIds: ['1'],
        },

        {
          condition: 'GTE',
          id: 'price',
          optionIds: ['10'],
        },
      ];
      const result = await productUseCase.findRecommendationByUser({ customerId, page, limit, filters, sort });
      expect(productUseCase.search).toBeCalledWith({ page, limit, filters: expectedFilter, sort });
      expect(result).toEqual(mockProductsResult);
    });

    it('should return data as expect with filter and sorts', async () => {
      const limit = 6;
      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 6,
          filters: [],
          products: mockProductRecommendedCS as any,
          sorts: [],
        }),
      );
      const expectedFilter = [
        {
          condition: 'in',
          id: 'visibility',
          optionIds: ['2', '4'],
        },
        {
          condition: 'in',
          id: 'sku',
          optionIds: ['CDS26735481'],
        },
        {
          condition: 'in',
          id: 'is_in_stock',
          optionIds: ['1'],
        },
        {
          condition: 'EQ',
          id: 'recommended',
          optionIds: ['1'],
        },
        {
          condition: 'EQ',
          id: 'status',
          optionIds: ['1'],
        },

        {
          condition: 'GTE',
          id: 'price',
          optionIds: ['10'],
        },
      ];
      const result = await productUseCase.findRecommendationByUser({
        customerId,
        page,
        limit,
        filters,
        sort,
        isViewBased: true,
      });
      expect(productUseCase.search).toBeCalledWith({ page, limit, filters: expectedFilter, sort });
      expect(dataLakeAppRecommendation.productRecommendationByUser).toHaveBeenCalled();
      expect(result).toEqual(mockProductsResult);
    });

    it('should return data as expect with filter and sorts', async () => {
      jest.spyOn(dataLakeRecommendation, 'productRecommendationByUser').mockReturnValue(Promise.resolve(null));
      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 0,
          filters: [],
          products: [] as any,
          sorts: [],
        }),
      );
      const result = await productUseCase.findRecommendationByUser({ customerId, page, filters, sort });
      expect(result).toEqual({ filters: [], products: [], sorts: [], totalCount: 0 });
    });
  });

  describe('findBySkusNew', () => {
    it('should return [] when catalog service return []', async () => {
      const mockProductsResult = [];
      jest.spyOn(catalogService, 'findBySkusNew').mockReturnValue(Promise.resolve([]));
      const result = await productUseCase.findBySkusNew([]);
      expect(result).toEqual(mockProductsResult);
    });

    it('should return [] when catalog service return null', async () => {
      const mockProductsResult = [];
      jest.spyOn(catalogService, 'findBySkusNew').mockReturnValue(Promise.resolve(null));
      const result = await productUseCase.findBySkusNew([]);
      expect(result).toEqual(mockProductsResult);
    });

    it('should return expected data when catalog service return Product', async () => {
      jest.spyOn(catalogService, 'findBySkusNew').mockReturnValue(Promise.resolve(mockDataFindBySKUsNew as any));
      const result = await productUseCase.findBySkusNew([]);

      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockResponseFindBySKUsNew));
    });
  });

  describe('search', () => {
    it('search - category filter', async () => {
      const mockCategoryAggregations = [
        {
          id: '2222',
          name: 'women',
          parent_id: '3333',
          level: '2',
          url_path: 'root/women',
          doc_count: 64,
          url_key: 'women',
        },
        {
          id: '2221',
          name: 'clothing',
          parent_id: '2222',
          level: '3',
          url_path: 'root/women/clothing',
          doc_count: 64,
          url_key: 'clothing',
        },
      ];

      jest.spyOn(catalogService, 'search').mockReturnValue(
        Promise.resolve({
          aggregations: [],
          category_aggregations: mockCategoryAggregations,
          total: 0,
          products: [],
        }),
      );

      const mockParams = {
        limit: 10,
        page: 1,
        filters: [
          {
            condition: 'eq' as IV2ProductSearchFilterConditionInput,
            id: 'status',
            optionIds: ['1'],
          },
          {
            condition: 'eq' as IV2ProductSearchFilterConditionInput,
            id: 'is_in_stock',
            optionIds: ['true'],
          },
        ],
        sort: null,
        keyword: null,
      };

      const data = await productUseCase.search(mockParams);

      const expected = {
        totalCount: 0,
        filters: [
          {
            id: 'categories.id',
            label: '',
            options: [
              {
                id: '2222',
                label: 'women',
                level: '2',
                productCount: 64,
                urlPath: 'root/women',
                children: [
                  {
                    id: '2221',
                    label: 'clothing',
                    level: '3',
                    productCount: 64,
                    urlPath: 'root/women/clothing',
                    children: [],
                  },
                ],
              },
            ],
            categoryAggregations: mockCategoryAggregations,
          },
        ],
        products: [],
        sorts: [],
      };

      expect(data).toEqual(expected);
    });
  });

  describe('findSimilarProductByDatalake', () => {
    it('should return data as expect with arguments page and limit', async () => {
      const input = {
        sku: 'CDS1235',
        limit: 3,
        page: 1,
      };

      jest
        .spyOn(dataLakeRecommendation, 'productSimilarBySku')
        .mockReturnValue(Promise.resolve(mockDataLakeProductSimilarAndAssociation));

      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 4,
          filters: [],
          products: mockProductSimilarResponse as any,
          sorts: [],
        }),
      );

      const result = await productUseCase.findSimilarProductByDatalake(input);
      expect(result).toEqual(mockProductSimilarResult1);
    });

    it('should return data as expect without arguments page and limit', async () => {
      const input = {
        sku: 'CDS1235',
      };

      jest
        .spyOn(dataLakeRecommendation, 'productSimilarBySku')
        .mockReturnValue(Promise.resolve(mockDataLakeProductSimilarAndAssociation));

      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 4,
          filters: [],
          products: mockProductSimilarResponse as any,
          sorts: [],
        }),
      );

      const result = await productUseCase.findSimilarProductByDatalake(input);
      expect(result).toEqual(mockProductSimilarResult2);
    });

    it('should return empty product', async () => {
      const input = {
        sku: 'CDS1235',
      };

      jest.spyOn(dataLakeRecommendation, 'productSimilarBySku').mockReturnValue(Promise.resolve(null));

      const result = await productUseCase.findSimilarProductByDatalake(input);
      expect(result).toEqual(mockProductSimilarResult3);
    });

    it('should throw if sku is empty string', async () => {
      const input = {
        sku: '',
      };
      jest.spyOn(dataLakeRecommendation, 'productSimilarBySku').mockReturnValue(Promise.resolve(null));
      await expect(() => productUseCase.findSimilarProductByDatalake(input)).rejects.toThrow(
        new ApplicationError('input sku is required'),
      );
    });
  });

  describe('findProductAssociationBySku', () => {
    it('should return data as expect with arguments page and limit', async () => {
      const input = {
        sku: 'CDS1235',
        limit: 3,
        page: 1,
      };

      jest
        .spyOn(dataLakeRecommendation, 'productAssociationBySku')
        .mockReturnValue(Promise.resolve(mockDataLakeProductSimilarAndAssociation));

      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 4,
          filters: [],
          products: mockProductSimilarResponse as any,
          sorts: [],
        }),
      );

      const result = await productUseCase.findProductAssociationBySku(input);
      expect(result).toEqual(mockProductAssociationResponse1);
    });

    it('should return data as expect without arguments page and limit', async () => {
      const input = {
        sku: 'CDS1235',
      };

      jest
        .spyOn(dataLakeRecommendation, 'productAssociationBySku')
        .mockReturnValue(Promise.resolve(mockDataLakeProductSimilarAndAssociation));

      jest.spyOn(productUseCase, 'search').mockReturnValue(
        Promise.resolve({
          totalCount: 4,
          filters: [],
          products: mockProductSimilarResponse as any,
          sorts: [],
        }),
      );

      const result = await productUseCase.findProductAssociationBySku(input);
      // console.log('result --> ', JSON.stringify(result));
      expect(result).toEqual(mockProductAssociationResponse2);
    });

    it('should return empty product', async () => {
      const input = {
        sku: 'CDS1235',
      };

      const mockResponse = { totalCount: 0, products: [] };

      jest.spyOn(dataLakeRecommendation, 'productAssociationBySku').mockReturnValue(Promise.resolve(null));

      const result = await productUseCase.findProductAssociationBySku(input);
      expect(result).toEqual(mockResponse);
    });

    it('should throw if sku is empty string', async () => {
      const input = {
        sku: '',
      };
      jest.spyOn(dataLakeRecommendation, 'productAssociationBySku').mockReturnValue(Promise.resolve(null));
      await expect(() => productUseCase.findProductAssociationBySku(input)).rejects.toThrow(
        new ApplicationError('input sku is required'),
      );
    });
  });

  describe('findById', () => {
    it('should throw error when catalog service return null', async () => {
      jest.spyOn(catalogService, 'findById').mockReturnValue(Promise.resolve(null));

      await expect(() => productUseCase.findById('ID')).rejects.toThrow('Product not found');
    });

    it('should return expected data when catalog service return Product', async () => {
      jest.spyOn(catalogService, 'findById').mockReturnValue(Promise.resolve(mockDataFindByIdOrSku as any));

      const result = await productUseCase.findById('ID');
      expect(result).toEqual(
        transformProduct(mockDataFindByIdOrSku as any, { secure_base_media_url: secureBaseMediaUrl } as any),
      );
    });
  });

  describe('findBySku', () => {
    it('should throw error when catalog service return null', async () => {
      jest.spyOn(catalogService, 'findBySku').mockReturnValue(Promise.resolve(null));

      await expect(() => productUseCase.findBySku('SKU')).rejects.toThrow('Product not found');
    });

    it('should return expected data when catalog service return Product', async () => {
      jest.spyOn(catalogService, 'findBySku').mockReturnValue(Promise.resolve(mockDataFindByIdOrSku as any));

      const result = await productUseCase.findBySku('SKU');
      expect(result).toEqual(
        transformProduct(mockDataFindByIdOrSku as any, { secure_base_media_url: secureBaseMediaUrl } as any),
      );
    });
  });
});
