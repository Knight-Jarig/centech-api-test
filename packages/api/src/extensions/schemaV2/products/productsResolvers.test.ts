import { ProductResolvers } from './ProductResolvers';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { Prime } from '../../../dataSource/prime';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import DataLakeRecommendationApi from '../../../dataSource/dataLakeRecommendationApi';
import DataLakeAppRecommendationApi from '../../../dataSource/dataLakeAppRecommendationApi';
import {
  mockFilterBrandNameOptionsTransform,
  mockFilterBrandNameOptionsResult,
  mockFilterAgeRangeOptionsTransform,
  mockFilterAgeRangeOptionsResult,
  mockFilterColorOptionsTransform,
  mockFilterColorOptionsResult,
  mockFilterRatingOptions,
  mockFilterRatingOptionsMDC,
  mockProductDetailResult,
  mockCatalogServiceSearchResponse,
} from './__mocks__/Products';
import { IV2ConfigurableOptionType } from '../../../types/graphql';
import { transformHierarchySubCategoriesByCategoryId } from '../transformer/cs2-transformer';
import { ProductUseCase } from './ProductUseCase';
import { createDataSources } from '../../../dataSource/';

jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('../../../dataSource/prime');
jest.mock('../../../dataSource/dataLakeRecommendationApi');
jest.mock('../../../dataSource/dataLakeAppRecommendationApi');

describe('Product Resolvers', () => {
  const magento = new MagentoDataSource();
  const prime = new Prime();
  const catalogService = new CatalogServiceDataSource();
  const dataLakeRecommendation = new DataLakeRecommendationApi();
  const dataLakeAppRecommendation = new DataLakeAppRecommendationApi();
  const productUseCase = new ProductUseCase({
    catalogService,
    magento,
    prime,
    dataLakeRecommendation,
    dataLakeAppRecommendation,
  });
  const dataSources = {
    magento,
    prime,
    productUseCase,
  };

  describe(`V2ConfigurableOption`, () => {
    const getValues = ProductResolvers.V2ConfigurableOption.values as Function;

    it(`should return values sort label by clothing size`, async () => {
      const data = [
        {
          id: '182',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'XL',
          productIds: ['179109'],
        },
        {
          id: '184',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'M',
          productIds: ['179109'],
        },
        {
          id: '188',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'S',
          productIds: ['179109'],
        },
      ];

      const result = [
        {
          id: '188',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'S',
          productIds: ['179109'],
        },
        {
          id: '184',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'M',
          productIds: ['179109'],
        },
        {
          id: '182',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'XL',
          productIds: ['179109'],
        },
      ];

      const values = await getValues({ values: data });
      expect(values).toEqual(result);
    });

    it(`should return values sort label by name ASC`, async () => {
      const data = [
        {
          id: '182',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'Orange',
          productIds: ['179109'],
        },
        {
          id: '184',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'White',
          productIds: ['179109'],
        },
        {
          id: '188',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'Gray',
          productIds: ['179109'],
        },
      ];

      const result = [
        {
          id: '188',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'Gray',
          productIds: ['179109'],
        },
        {
          id: '182',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'Orange',
          productIds: ['179109'],
        },
        {
          id: '184',
          type: IV2ConfigurableOptionType.SwatchText,
          label: 'White',
          productIds: ['179109'],
        },
      ];

      const values = await getValues({ values: data });
      expect(values).toEqual(result);
    });

    it(`should return values sort label by value ASC in number case`, async () => {
      const data = [
        {
          id: '182',
          type: IV2ConfigurableOptionType.SwatchText,
          label: '11',
          productIds: ['179109'],
        },
        {
          id: '184',
          type: IV2ConfigurableOptionType.SwatchText,
          label: '1',
          productIds: ['179109'],
        },
        {
          id: '188',
          type: IV2ConfigurableOptionType.SwatchText,
          label: '8',
          productIds: ['179109'],
        },
      ];

      const result = [
        {
          id: '184',
          type: IV2ConfigurableOptionType.SwatchText,
          label: '1',
          productIds: ['179109'],
        },
        {
          id: '188',
          type: IV2ConfigurableOptionType.SwatchText,
          label: '8',
          productIds: ['179109'],
        },
        {
          id: '182',
          type: IV2ConfigurableOptionType.SwatchText,
          label: '11',
          productIds: ['179109'],
        },
      ];

      const values = await getValues({ values: data });
      expect(values).toEqual(result);
    });
  });

  describe(`V2ProductSearchFilterRangeResult`, () => {
    const getLabel = ProductResolvers.V2ProductSearchFilterRangeResult.label as Function;

    it(`should return label of filter range in en`, async () => {
      const filterRangeLabel = await getLabel({ id: 'price' }, null, { locale: 'en' });
      expect(filterRangeLabel).toEqual('Price Range');
    });

    it(`should return label of filter range in th`, async () => {
      const filterRangeLabel = await getLabel({ id: 'price' }, null, { locale: 'th' });
      expect(filterRangeLabel).toEqual('ช่วงราคา');
    });
  });

  describe(`V2ProductSearchFilterNormalResult`, () => {
    const getOptions = ProductResolvers.V2ProductSearchFilterNormalResult.options as Function;
    const getLabel = ProductResolvers.V2ProductSearchFilterNormalResult.label as Function;
    it(`should return brand_name options of filter normal and sort by alphabet`, async () => {
      const filterNormalOptions = await getOptions(
        { id: 'brand_name', options: mockFilterBrandNameOptionsTransform },
        null,
        {
          locale: 'en',
        },
      );
      expect(filterNormalOptions).toEqual(mockFilterBrandNameOptionsResult);
    });

    it(`should return color options of filter normal and sort by alphabet`, async () => {
      const filterNormalOptions = await getOptions(
        { id: 'color_group_name', options: mockFilterColorOptionsTransform },
        null,
        {
          locale: 'th',
        },
      );
      expect(filterNormalOptions).toEqual(mockFilterColorOptionsResult);
    });

    it(`should return age_range options of filter normal`, async () => {
      const filterNormalOptions = await getOptions(
        { id: 'age_range', options: mockFilterAgeRangeOptionsTransform },
        null,
        {
          locale: 'en',
        },
      );
      expect(filterNormalOptions).toEqual(mockFilterAgeRangeOptionsResult);
    });

    it(`should return rating options of filter normal`, async () => {
      const filterNormalOptions = await getOptions({ id: 'rating', options: mockFilterRatingOptionsMDC }, null, {
        locale: 'en',
      });
      expect(filterNormalOptions).toEqual(mockFilterRatingOptions);
    });

    it(`should return rating label of filter normal in en`, async () => {
      const filterNormalLabel = await getLabel({ id: 'rating' }, null, { locale: 'en' });
      expect(filterNormalLabel).toEqual('Customer Rating');
    });

    it(`should return rating label of filter normal in th`, async () => {
      const filterNormalLabel = await getLabel({ id: 'rating' }, null, { locale: 'th' });
      expect(filterNormalLabel).toEqual('รีวิวจากลูกค้า');
    });

    it(`should return color_group_name label of filter normal use default_frontend_label`, async () => {
      jest.spyOn(dataSources.magento.product, 'getAttributesByAttributeCode').mockReturnValue(
        Promise.resolve({
          frontend_labels: [{ store_id: 1, label: 'Color Group' }],
          default_frontend_label: 'Color Group',
        }),
      );

      const filterNormalLabel = await getLabel({ id: 'color_group_name', options: mockFilterRatingOptionsMDC }, null, {
        dataSources,
        locale: 'en',
        store: { id: 1 },
      });

      expect(filterNormalLabel).toEqual('Color Group');
    });

    it(`should return age_range label of filter normal use default_frontend_label`, async () => {
      jest
        .spyOn(dataSources.magento.product, 'getAttributesByAttributeCode')
        .mockReturnValue(
          Promise.resolve({ frontend_labels: [{ store_id: 1, label: '' }], default_frontend_label: 'Age Range' }),
        );

      const filterNormalLabel = await getLabel({ id: 'age_range', options: mockFilterRatingOptionsMDC }, null, {
        dataSources,
        locale: 'en',
        store: { id: 1 },
      });

      expect(filterNormalLabel).toEqual('Age Range');
    });

    it(`should return label of filter normal use id and label from magento is empty`, async () => {
      jest
        .spyOn(dataSources.magento.product, 'getAttributesByAttributeCode')
        .mockReturnValue(
          Promise.resolve({ frontend_labels: [{ store_id: 1, label: '' }], default_frontend_label: '' }),
        );

      const filterNormalLabel = await getLabel({ id: 'material_general', options: mockFilterRatingOptionsMDC }, null, {
        dataSources,
        locale: 'en',
        store: { id: 1 },
      });

      expect(filterNormalLabel).toEqual('material_general');
    });

    it(`should return label of filter normal use id and not found from magento`, async () => {
      jest.spyOn(dataSources.magento.product, 'getAttributesByAttributeCode').mockReturnValue(Promise.resolve(null));

      const filterNormalLabel = await getLabel({ id: 'material_general', options: mockFilterRatingOptionsMDC }, null, {
        dataSources,
        locale: 'en',
        store: { id: 1 },
      });

      expect(filterNormalLabel).toEqual('material_general');
    });
  });

  describe(`V2ProductSearchFilterCategoryResult - lable`, () => {
    const getLabel = ProductResolvers.V2ProductSearchFilterCategoryResult.label as Function;

    it(`should return label of filter category`, async () => {
      const labelCategoty = await getLabel(null, null, { locale: 'en' });
      expect(labelCategoty).toEqual('Category');
    });
  });

  describe(`V2ProductSearchFilterCategoryResult - options`, () => {
    const getOptions = ProductResolvers.V2ProductSearchFilterCategoryResult.options as Function;

    it(`should call function transformHierarchySubCategoriesByCategoryId with expected params`, async () => {
      const mockCategoryAggregations = [];
      const baseCategoryId = '3310';
      const categoryOptions = await getOptions({ mockCategoryAggregations }, { baseCategoryId });
      expect(categoryOptions).toEqual(mockCategoryAggregations);
    });

    it(`should return options of filter category`, async () => {
      const mockOptions = [];
      const categoryOptions = await getOptions({ options: mockOptions });
      expect(categoryOptions).toEqual(mockOptions);
    });
  });

  describe(`V2SimpleProduct inventoryStock `, () => {
    const getInventoryStock = ProductResolvers.V2SimpleProduct.inventoryStock as Function;

    it(`should return inventoryStockBySku`, async () => {
      const mockData = {
        sku: 'CDS1234',
        quantity: 10,
      };
      jest.spyOn(dataSources.prime, 'getStockBySku').mockReturnValue(Promise.resolve(mockData as any));
      const info = { cacheControl: { setCacheHint: jest.fn() } };

      const result = await getInventoryStock({ sku: 'CDS1234' }, null, { dataSources }, info);
      expect(result).toEqual(mockData);
    });
  });
  describe(`v2InventoryStockBySkus`, () => {
    const v2InventoryStockBySkus = ProductResolvers.Query.v2InventoryStockBySkus as Function;

    it(`should return inventoryStockBySkus`, async () => {
      const mockData = [
        {
          sku: 'CDS1234',
          quantity: 10,
        },
        {
          sku: 'CDS9999',
          quantity: 5,
        },
      ];
      jest.spyOn(dataSources.prime, 'getStockBySkus').mockReturnValue(Promise.resolve(mockData as any));

      const stockBySku = await v2InventoryStockBySkus(null, { skus: ['CDS1234', 'CDS9999'] }, { dataSources });
      expect(stockBySku).toEqual(mockData);
    });
  });

  describe('v2ProductSearch', () => {
    const jsonParseStringify = value => JSON.parse(JSON.stringify(value));
    const v2ProductSearch = ProductResolvers.Query.v2ProductSearch as Function;
    const store = { secure_base_media_url: 'https://sit-mdc.central.co.th/media/' };
    dataSources.productUseCase.initialize({
      context: {
        store: store,
      },
    });
    const info = {
      cacheControl: { setCacheHint: input => input, cacheHint: { maxAge: 60 } },
    };
    it('Query v2ProductSearch should run properly', async () => {
      const mockData = {
        page: 1,
        limit: 1,
        filters: [
          {
            id: 'is_in_stock',
            optionIds: ['true'],
            condition: 'equal',
          },
        ],
        keyword: 'mipow',
      };
      jest.spyOn(catalogService, 'search').mockReturnValue(Promise.resolve(mockCatalogServiceSearchResponse as any));
      jest.spyOn(dataSources.productUseCase, 'search').mockReturnValue(Promise.resolve(mockData as any));

      await v2ProductSearch(null, { input: mockData }, { dataSources }, info);

      expect(dataSources.productUseCase.search).toBeCalledWith(mockData);
    });
  });

  describe(`ProductLinks similar`, () => {
    it(`should return inventoryStockBySkus`, async () => {
      const similarFunction = ProductResolvers.V2ProductLinks.similar as Function;
      jest
        .spyOn(productUseCase, 'findSimilarProduct')
        .mockReturnValue(Promise.resolve([mockProductDetailResult as any]));

      const result = await similarFunction({ breadcrumbs: [{ id: 1234 }] }, null, { dataSources });
      expect(result).toEqual([mockProductDetailResult]);
    });
  });

  describe(`SimpleProduct links resolver`, () => {
    it(`should return inventoryStockBySkus`, async () => {
      const linksFunction = ProductResolvers.V2SimpleProduct.links as Function;
      jest
        .spyOn(productUseCase, 'findSimilarProduct')
        .mockReturnValue(Promise.resolve([mockProductDetailResult as any]));
      const mockRootValue = { breadcrumbs: [{ id: 1234 }], links: { upSell: ['TEST'] } };

      const result = await linksFunction(mockRootValue);
      expect(result).toEqual({ breadcrumbs: [{ id: 1234 }], upSell: ['TEST'] });
    });
  });

  describe(`ConfigurableProduct links resolver`, () => {
    it(`should return inventoryStockBySkus`, async () => {
      const linksFunction = ProductResolvers.V2ConfigurableProduct.links as Function;
      jest
        .spyOn(productUseCase, 'findSimilarProduct')
        .mockReturnValue(Promise.resolve([mockProductDetailResult as any]));
      const mockRootValue = { breadcrumbs: [{ id: 1234 }], links: { upSell: ['TEST'] } };

      const result = await linksFunction(mockRootValue);
      expect(result).toEqual({ breadcrumbs: [{ id: 1234 }], upSell: ['TEST'] });
    });
  });

  describe(`V2Reviewer`, () => {
    const getEmail = ProductResolvers.V2Reviewer.email as Function;
    it(`should return empty string on email`, async () => {
      const response = await getEmail();
      expect(response).toEqual('');
    });
  });

  describe('V2SimpleProduct.overlayImageUrl', () => {
    const getOverlayImageUrl = ProductResolvers.V2SimpleProduct.overlayImageUrl as Function;

    it(`should return overlay from MDC`, async () => {
      const id = '123';
      const mockData = 'cart/price/rule/url';
      const mockOverlayImageUrl = 'url';

      jest.spyOn(dataSources.productUseCase, 'findCartPriceRuleOverlay').mockReturnValue(Promise.resolve(mockData));

      const result = await getOverlayImageUrl({ id, overlayImageUrl: mockOverlayImageUrl }, null, { dataSources });
      expect(result).toEqual(mockData);
    });

    it(`should return overlay from CS`, async () => {
      const id = '123';
      const mockOverlayImageUrl = 'url';

      jest.spyOn(dataSources.productUseCase, 'findCartPriceRuleOverlay').mockReturnValue(Promise.resolve(null));

      const result = await getOverlayImageUrl({ id, overlayImageUrl: mockOverlayImageUrl }, null, { dataSources });
      expect(result).toEqual(mockOverlayImageUrl);
    });

    it(`should return overlay from CS`, async () => {
      const id = '123';
      const mockOverlayImageUrl = 'url';

      jest.spyOn(dataSources.productUseCase, 'findCartPriceRuleOverlay').mockReturnValue(Promise.reject());

      const result = await getOverlayImageUrl({ id, overlayImageUrl: mockOverlayImageUrl }, null, { dataSources });
      expect(result).toEqual(mockOverlayImageUrl);
    });
  });

  describe('V2ConfigurableProduct.overlayImageUrl', () => {
    const getOverlayImageUrl = ProductResolvers.V2ConfigurableProduct.overlayImageUrl as Function;

    it(`should return overlay from MDC`, async () => {
      const id = '123';
      const mockData = 'cart/price/rule/url';
      const mockOverlayImageUrl = 'url';

      jest.spyOn(dataSources.productUseCase, 'findCartPriceRuleOverlay').mockReturnValue(Promise.resolve(mockData));

      const result = await getOverlayImageUrl({ id, overlayImageUrl: mockOverlayImageUrl }, null, { dataSources });
      expect(result).toEqual(mockData);
    });

    it(`should return overlay from CS`, async () => {
      const id = '123';
      const mockOverlayImageUrl = 'url';

      jest.spyOn(dataSources.productUseCase, 'findCartPriceRuleOverlay').mockReturnValue(Promise.resolve(null));

      const result = await getOverlayImageUrl({ id, overlayImageUrl: mockOverlayImageUrl }, null, { dataSources });
      expect(result).toEqual(mockOverlayImageUrl);
    });

    it(`should return overlay from CS`, async () => {
      const id = '123';
      const mockOverlayImageUrl = 'url';

      jest.spyOn(dataSources.productUseCase, 'findCartPriceRuleOverlay').mockReturnValue(Promise.reject());

      const result = await getOverlayImageUrl({ id, overlayImageUrl: mockOverlayImageUrl }, null, { dataSources });
      expect(result).toEqual(mockOverlayImageUrl);
    });
  });

  describe(`Query: v2ProductRecommendationByUser`, () => {
    jest.mock('../../../dataSource');
    jest.mock('../../../dataSource/dataLakeRecommendationApi');
    const dataSources = createDataSources();
    dataSources.productUseCase = {
      findRecommendationByUser: jest.fn(),
    } as any;
    dataSources.magento.customer = {
      getCustomer: jest.fn().mockReturnValue({
        id: '3633',
      }),
    } as any;
    const v2ProductRecommendationByUser = ProductResolvers.Query.v2ProductRecommendationByUser as Function;
    it(`should call successfully`, async () => {
      const input = { customerId: '3633', page: 1, limit: 3 };
      await v2ProductRecommendationByUser(null, { input }, { dataSources });
      expect(dataSources.productUseCase.findRecommendationByUser).toHaveBeenCalled();
    });
    it(`should call successfully with using customerToken`, async () => {
      const input = { page: 1, limit: 3 };
      const store = { code: 'cds_th' };
      await v2ProductRecommendationByUser(null, { input }, { dataSources, customerToken: '1234', store });
      expect(dataSources.productUseCase.findRecommendationByUser).toHaveBeenCalled();
    });
  });

  describe(`Query: v2ProductSimilarBySKU`, () => {
    const dataSources = createDataSources();
    dataSources.productUseCase = {
      findSimilarProductByDatalake: jest.fn(),
    } as any;

    const v2ProductSimilarBySKU = ProductResolvers.Query.v2ProductSimilarBySKU as Function;

    it(`should call with expect attr`, async () => {
      const input = { page: 1, limit: 3, sku: 'CDS1234' };

      await v2ProductSimilarBySKU(null, { input }, { dataSources });

      expect(dataSources.productUseCase.findSimilarProductByDatalake).toBeCalledWith(input);
    });
  });

  describe(`Query: v2ProductAssociationBySKU`, () => {
    const dataSources = createDataSources();
    dataSources.productUseCase = {
      findProductAssociationBySku: jest.fn(),
    } as any;

    const v2ProductAssociationBySKU = ProductResolvers.Query.v2ProductAssociationBySKU as Function;

    it(`should call with expect attr`, async () => {
      const input = { page: 1, limit: 3, sku: 'CDS1234' };

      await v2ProductAssociationBySKU(null, { input }, { dataSources });

      expect(dataSources.productUseCase.findProductAssociationBySku).toBeCalledWith(input);
    });
  });
});
