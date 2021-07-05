import { resolver } from '.';
import { createDataSources } from '../../dataSource';
import {
  mockGetSaleRuleOverlaysResponse,
  mockLegacySearchResponse1,
  mockLegacySearchResponse2,
  mockLegacySearchResponse3,
  mockLegacySearchResponse4,
  mockPayloadLegacySearchSkus1,
  mockPayloadLegacySearchSkus2,
  mockProductRecommendationByUserDataLakeResponse,
  mockSearchResult1,
  mockShippingMethodFlagsResult,
  mockProductRecommendationBySkuDataLakeResponse1,
  mockProductRecommendationBySkuDataLakeResponse2,
  mockProductRecommendationBySkuDataLakeResponse3,
  mockFindProductDetailByIdNewResponse1,
  mockFindProductDetailByIdNewResult1,
  mockProductRecommendationBySkuCSResponse,
  mockProductRecommendationBySkuResult,
  mockProductRecommendationByUserCSResponse,
  mockProductRecommendationByUserResult,
} from './__mocks__/productCatalogServiceV2';

jest.mock('../../dataSource');

describe('ProductCatalogServiceV2', () => {
  describe('Query: productRecommendationByUser', () => {
    const productRecommendationByUser = resolver.Query.productRecommendationByUser as Function;
    function runProductRecommendationByUser(context) {
      it('If search return null products should return []', async () => {
        const result = await productRecommendationByUser(null, {}, context);

        expect(result).toEqual({
          products: [],
        });
      });

      it('Should call catalogService.legacySearch with expect args', async () => {
        jest
          .spyOn(context.dataSources.dataLakeRecommendation, 'productRecommendationByUser')
          .mockReturnValue(Promise.resolve(mockProductRecommendationByUserDataLakeResponse));

        await productRecommendationByUser(null, {}, context);
        expect(context.dataSources.catalogService.legacySearch).toBeCalledWith(
          expect.objectContaining(mockPayloadLegacySearchSkus1),
        );
      });

      it('Should sort products by skus which return from datalake response', async () => {
        jest
          .spyOn(context.dataSources.dataLakeRecommendation, 'productRecommendationBySku')
          .mockReturnValue(Promise.resolve(mockProductRecommendationByUserDataLakeResponse));

        jest
          .spyOn(context.dataSources.catalogService, 'legacySearch')
          .mockReturnValue(Promise.resolve(mockProductRecommendationByUserCSResponse));

        const result = await productRecommendationByUser(null, {}, context);
        expect(result).toMatchObject(mockProductRecommendationByUserResult);
      });
    }
    describe('Guest', () => {
      const context = {
        dataSources: createDataSources(),
        store: 'cds_th',
        locale: 'th',
        bu: 'cds',
      };
      runProductRecommendationByUser({
        ...context,
        customerToken: '',
      });
    });

    describe('Member', () => {
      const context = {
        dataSources: createDataSources(),
        store: 'cds_th',
        locale: 'th',
        bu: 'cds',
      };
      const userId = '3333';

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(
        Promise.resolve({
          id: userId,
        }),
      );

      runProductRecommendationByUser({
        ...context,
        customerToken: '1232',
      });

      it('userId should not empty', async () => {
        expect(context.dataSources.dataLakeRecommendation.productRecommendationByUser).toBeCalledWith(
          context.locale,
          userId,
        );
      });
    });
  });

  describe('Query: productAssociationBySku', () => {
    const context = {
      dataSources: createDataSources(),
      store: 'cds_en',
      locale: 'en',
      bu: 'cds',
    };
    const productAssociationBySku = resolver.Query.productAssociationBySku as Function;

    it('If search return null products should return []', async () => {
      const result = await productAssociationBySku(null, {}, context);

      expect(result).toEqual({
        products: [],
      });
    });

    it('Should call catalogService.legacySearch with expect args', async () => {
      jest
        .spyOn(context.dataSources.dataLakeRecommendation, 'productRecommendationBySku')
        .mockReturnValue(Promise.resolve(mockProductRecommendationBySkuDataLakeResponse1));

      await productAssociationBySku(null, {}, context);
      expect(context.dataSources.catalogService.legacySearch).toBeCalledWith(
        expect.objectContaining(mockPayloadLegacySearchSkus1),
      );
    });

    it("If productRecommendation result didn't return id = 2, Skus will be []", async () => {
      jest
        .spyOn(context.dataSources.dataLakeRecommendation, 'productRecommendationBySku')
        .mockReturnValue(Promise.resolve(mockProductRecommendationBySkuDataLakeResponse2));

      await productAssociationBySku(null, {}, context);
      expect(context.dataSources.catalogService.legacySearch).toBeCalledWith(
        expect.objectContaining(mockPayloadLegacySearchSkus2),
      );
    });

    it("If productRecommendation result didn't return data.code = product_asso, Skus will be []", async () => {
      jest
        .spyOn(context.dataSources.dataLakeRecommendation, 'productRecommendationBySku')
        .mockReturnValue(Promise.resolve(mockProductRecommendationBySkuDataLakeResponse3));

      await productAssociationBySku(null, {}, context);
      expect(context.dataSources.catalogService.legacySearch).toBeCalledWith(
        expect.objectContaining(mockPayloadLegacySearchSkus2),
      );
    });

    it('Should sort products by skus which return from datalake response', async () => {
      jest
        .spyOn(context.dataSources.dataLakeRecommendation, 'productRecommendationBySku')
        .mockReturnValue(Promise.resolve(mockProductRecommendationBySkuDataLakeResponse1));

      jest
        .spyOn(context.dataSources.catalogService, 'legacySearch')
        .mockReturnValue(Promise.resolve(mockProductRecommendationBySkuCSResponse));

      const result = await productAssociationBySku(null, {}, context);
      expect(result).toMatchObject(mockProductRecommendationBySkuResult);
    });
  });

  describe('Query: search', () => {
    const context = {
      dataSources: createDataSources(),
    };
    const search = resolver.Query.search as Function;
    it('If result from legacySearch is null, product should return []', async () => {
      const result = await search(null, {}, context);
      expect(result).toEqual({
        products: [],
      });
    });

    it('If result from legacySearch is null, product should return []', async () => {
      expect(async () => await search(null, { pagination: { size: null, offset: null } }, context)).rejects.toThrow();
    });

    it('If result from legacySearch is null, product should return []', async () => {
      expect(async () => await search(null, { pagination: { size: 1, offset: null } }, context)).rejects.toThrow();
    });

    it('If result from legacySearch is null, product should return []', async () => {
      expect(async () => await search(null, { pagination: { size: 1, offset: -1 } }, context)).rejects.toThrow();
    });

    it('If result from legacySearch is null, product should return []', async () => {
      const result = await search(null, { pagination: { size: 201, offset: 0 } }, context);
      expect(result).toEqual({
        products: [],
      });
    });

    it('If result from legacySearch is null, product should return []', async () => {
      const result = await search(null, { pagination: { size: 2, offset: 0 } }, context);
      expect(result).toEqual({
        products: [],
      });
    });

    it('result should return data as expect', async () => {
      jest
        .spyOn(context.dataSources.catalogService, 'legacySearch')
        .mockReturnValue(Promise.resolve(mockLegacySearchResponse1));

      jest
        .spyOn(context.dataSources.magento.product, 'getSaleRuleOverlays')
        .mockReturnValue(Promise.resolve(mockGetSaleRuleOverlaysResponse));
      const result = await search(null, {}, context);
      expect(result).toEqual(mockSearchResult1);
    });

    it('result should return shipping_method_flags = []', async () => {
      jest
        .spyOn(context.dataSources.catalogService, 'legacySearch')
        .mockReturnValue(Promise.resolve(mockLegacySearchResponse2));

      const result = await search(null, {}, context);
      expect(result.products[0].shipping_method_flags).toEqual([]);
    });

    it('result should return contain shipping_method_flags data', async () => {
      jest
        .spyOn(context.dataSources.catalogService, 'legacySearch')
        .mockReturnValue(Promise.resolve(mockLegacySearchResponse3));

      const result = await search(null, {}, context);
      expect(result.products[0].shipping_method_flags).toEqual(mockShippingMethodFlagsResult);
    });

    it('result should return contain shipping_method_flags data on rbs', async () => {
      jest
        .spyOn(context.dataSources.catalogService, 'legacySearch')
        .mockReturnValue(Promise.resolve(mockLegacySearchResponse4));

      const result = await search(null, {}, context);
      expect(result.products[0].shipping_method_flags).toEqual(mockShippingMethodFlagsResult);
    });

    it('result should return empty cart_price_rule_overlays data', async () => {
      jest
        .spyOn(context.dataSources.catalogService, 'legacySearch')
        .mockReturnValue(Promise.resolve(mockLegacySearchResponse1));

      jest.spyOn(context.dataSources.magento.product, 'getSaleRuleOverlays').mockReturnValue(Promise.resolve(null));
      const result = await search(null, {}, context);
      expect(result.products[0].cart_price_rule_overlays).toEqual([]);
    });
  });

  describe('Query: productById', () => {
    const context = {
      dataSources: createDataSources(),
      store: 'cds_en',
      locale: 'en',
      bu: 'cds',
    };
    const productById = resolver.Query.productById as Function;

    it('result should return data as expect', async () => {
      jest
        .spyOn(context.dataSources.catalogService, 'findProductDetailByIdNew')
        .mockReturnValue(Promise.resolve(mockFindProductDetailByIdNewResponse1));

      const id = '7121';
      const result = await productById(null, { id }, context);

      expect(result).toEqual(mockFindProductDetailByIdNewResult1);
    });

    it('result should return null when product not found', async () => {
      jest.spyOn(context.dataSources.catalogService, 'findProductDetailByIdNew').mockReturnValue(Promise.resolve(null));

      const id = '1111';
      const result = await productById(null, { id }, context);

      expect(result).toEqual(null);
    });
  });

  describe(`ConfigurableProductOptions`, () => {
    const getValues = resolver.ConfigurableProductOptions.values as Function;

    it(`should return values sort label by clothing size`, async () => {
      const data = [
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'XL',
            label: 'XL',
            products: ['179406'],
          },
        },
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'M',
            label: 'M',
            products: ['179406'],
          },
        },
        {
          value_index: 3868,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'S',
            label: 'S',
            products: ['179406'],
          },
        },
      ];

      const result = [
        {
          value_index: 3868,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'S',
            label: 'S',
            products: ['179406'],
          },
        },
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'M',
            label: 'M',
            products: ['179406'],
          },
        },
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'XL',
            label: 'XL',
            products: ['179406'],
          },
        },
      ];

      const values = await getValues({ values: data });
      expect(values).toEqual(result);
    });

    it(`should return values sort label by name ASC`, async () => {
      const data = [
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'Orange',
            label: 'Orange',
            products: ['179406'],
          },
        },
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'White',
            label: 'White',
            products: ['179406'],
          },
        },
        {
          value_index: 3868,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'Gray',
            label: 'Gray',
            products: ['179406'],
          },
        },
      ];

      const result = [
        {
          value_index: 3868,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'Gray',
            label: 'Gray',
            products: ['179406'],
          },
        },
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'Orange',
            label: 'Orange',
            products: ['179406'],
          },
        },
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'White',
            label: 'White',
            products: ['179406'],
          },
        },
      ];

      const values = await getValues({ values: data });
      expect(values).toEqual(result);
    });

    it(`should return values sort label by value ASC in number case`, async () => {
      const data = [
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: '11',
            label: '11',
            products: ['179406'],
          },
        },
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: '1',
            label: '1',
            products: ['179406'],
          },
        },
        {
          value_index: 3868,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: '8',
            label: '8',
            products: ['179406'],
          },
        },
      ];

      const result = [
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: '1',
            label: '1',
            products: ['179406'],
          },
        },
        {
          value_index: 3868,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: '8',
            label: '8',
            products: ['179406'],
          },
        },
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: '11',
            label: '11',
            products: ['179406'],
          },
        },
      ];

      const values = await getValues({ values: data });
      expect(values).toEqual(result);
    });

    it(`should return values which sort and trim label`, async () => {
      const data = [
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'XL',
            label: 'XL',
            products: ['179406'],
          },
        },
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'M',
            label: 'M ',
            products: ['179406'],
          },
        },
      ];

      const result = [
        {
          value_index: 3863,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'M',
            label: 'M',
            products: ['179406'],
          },
        },
        {
          value_index: 3861,
          extension_attributes: {
            frontend_type: 'swatch_text',
            frontend_value: 'XL',
            label: 'XL',
            products: ['179406'],
          },
        },
      ];

      const values = await getValues({ values: data });
      expect(values).toEqual(result);
    });
  });
});
