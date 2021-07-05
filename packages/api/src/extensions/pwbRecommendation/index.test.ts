import { resolver as PWBRecommendationResolver } from './index';
import { createDataSources } from '../../dataSource';
import {
  mockCatalogServiceProductResponse1,
  mockProductAssociationBySkuResponse1,
  mockPWBProductAssociationBySkuResult1,
  mockCatalogServiceProductResponse2,
  mockProductAssociationBySkuResponse2,
  mockPWBProductAssociationBySkuResult2,
  mockProductSimilarBySkuResponse1,
  mockPWBProductSimilarBySkuResult1,
  mockCatalogServiceProductResponse3,
  mockProductSimilarBySkuResponse2,
  mockProductAssociationViewBySkuResponse1,
  mockCatalogServiceProductResponse4,
  mockPWBProductAssociationViewBySkuResult1,
  mockPWBProductAssociationViewBySkuResult2,
  mockProductAssociationViewBySkuResponse2,
} from './__mocks__/pwbRecommendation';

jest.mock('../../dataSource');

describe('pwbRecommendation Resolvers', () => {
  const dataSources = createDataSources();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Query pwbProductAssociationBySku', () => {
    const pwbProductAssociationBySku = PWBRecommendationResolver.Query.pwbProductAssociationBySku as Function;

    it(`pwbProductAssociationBySku: should return expect product`, async () => {
      const input = {
        limit: 2,
        page: 1,
        sku: '246173',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productAssociationBySku')
        .mockReturnValue(Promise.resolve(mockProductAssociationBySkuResponse1));

      jest
        .spyOn(dataSources.magento.catalogService, 'find')
        .mockReturnValue(Promise.resolve(mockCatalogServiceProductResponse1) as any);

      const result = await pwbProductAssociationBySku(null, { input }, { dataSources });

      expect(result).toMatchObject(mockPWBProductAssociationBySkuResult1);
    });

    it(`pwbProductAssociationBySku: should return product null`, async () => {
      const input = {
        limit: 2,
        page: 1,
        sku: '246173',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productAssociationBySku')
        .mockReturnValue(Promise.resolve(mockProductAssociationBySkuResponse2));

      jest
        .spyOn(dataSources.magento.catalogService, 'find')
        .mockReturnValue(Promise.resolve(mockCatalogServiceProductResponse2) as any);

      const result = await pwbProductAssociationBySku(null, { input }, { dataSources });

      expect(result).toMatchObject(mockPWBProductAssociationBySkuResult2);
    });

    it(`pwbProductAssociationBySku: should return product and response null`, async () => {
      const input = {
        sku: '246173',
      };

      jest.spyOn(dataSources.dataLakeRecommendation, 'productAssociationBySku').mockReturnValue(Promise.resolve(null));

      jest.spyOn(dataSources.magento.catalogService, 'find').mockReturnValue(Promise.resolve(null) as any);

      const result = await pwbProductAssociationBySku(null, { input }, { dataSources });

      expect(result).toMatchObject({
        products: null,
      });
    });
  });

  describe('Query pwbProductSimilarBySku', () => {
    const pwbProductSimilarBySku = PWBRecommendationResolver.Query.pwbProductSimilarBySku as Function;

    it(`pwbProductSimilarBySku: should return expect product`, async () => {
      const input = {
        limit: 2,
        page: 2,
        sku: '246173',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productSimilarBySku')
        .mockReturnValue(Promise.resolve(mockProductSimilarBySkuResponse1));

      jest
        .spyOn(dataSources.magento.catalogService, 'find')
        .mockReturnValue(Promise.resolve(mockCatalogServiceProductResponse3) as any);

      const result = await pwbProductSimilarBySku(null, { input }, { dataSources });

      expect(result).toMatchObject(mockPWBProductSimilarBySkuResult1);
    });

    it(`pwbProductSimilarBySku: should return product null`, async () => {
      const input = {
        sku: '246173',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productSimilarBySku')
        .mockReturnValue(Promise.resolve(mockProductSimilarBySkuResponse2));

      jest
        .spyOn(dataSources.magento.catalogService, 'find')
        .mockReturnValue(Promise.resolve(mockCatalogServiceProductResponse2) as any);

      const result = await pwbProductSimilarBySku(null, { input }, { dataSources });

      expect(result).toMatchObject(mockPWBProductAssociationBySkuResult2);
    });

    it(`pwbProductSimilarBySku: should return product response null when error`, async () => {
      const input = {
        sku: '246173',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productSimilarBySku')
        .mockReturnValue(Promise.resolve(mockProductSimilarBySkuResponse1));

      jest.spyOn(dataSources.magento.catalogService, 'find').mockImplementation(() => {
        throw new Error();
      });

      const result = await pwbProductSimilarBySku(null, { input }, { dataSources });

      expect(result).toMatchObject({
        products: null,
      });
    });
  });

  describe('Query pwbProductAssociationViewBySku', () => {
    const pwbProductAssociationViewBySku = PWBRecommendationResolver.Query.pwbProductAssociationViewBySku as Function;

    it(`pwbProductAssociationViewBySku: should return expect product`, async () => {
      const input = {
        limit: 2,
        page: 2,
        sku: '217350',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productAssociationViewBySku')
        .mockReturnValue(Promise.resolve(mockProductAssociationViewBySkuResponse1));

      jest
        .spyOn(dataSources.magento.catalogService, 'find')
        .mockReturnValue(Promise.resolve(mockCatalogServiceProductResponse4) as any);

      const result = await pwbProductAssociationViewBySku(null, { input }, { dataSources });

      expect(result).toMatchObject(mockPWBProductAssociationViewBySkuResult1);
    });

    it(`pwbProductAssociationViewBySku: should return product null`, async () => {
      const input = {
        sku: '217350',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productAssociationViewBySku')
        .mockReturnValue(Promise.resolve(mockProductAssociationViewBySkuResponse2));

      const result = await pwbProductAssociationViewBySku(null, { input }, { dataSources });

      expect(result).toMatchObject(mockPWBProductAssociationViewBySkuResult2);
    });

    it(`pwbProductAssociationViewBySku: should return product response null when error`, async () => {
      const input = {
        sku: '217350',
      };

      jest
        .spyOn(dataSources.dataLakeRecommendation, 'productAssociationViewBySku')
        .mockReturnValue(Promise.resolve(mockProductSimilarBySkuResponse1));

      jest.spyOn(dataSources.magento.catalogService, 'find').mockImplementation(() => {
        throw new Error();
      });

      const result = await pwbProductAssociationViewBySku(null, { input }, { dataSources });

      expect(result).toMatchObject({
        products: null,
      });
    });
  });
});
