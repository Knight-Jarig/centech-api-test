import { BrandResolvers } from './BrandResolvers';
import { BrandUseCase } from './BrandUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';

jest.mock('../../../dataSource');
jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Brand Resolvers', () => {
  const magento = new MagentoDataSource();
  const catalogService = new CatalogServiceDataSource();
  const brandUseCase = new BrandUseCase({ catalogService, magento });
  brandUseCase.initialize({
    context: {
      store: 'cds',
    },
  });
  const dataSources = {
    magento,
    brandUseCase,
  };
  describe(`Query: v2BrandSearch`, async () => {
    it(`Should return data property`, async () => {
      const v2BrandSearch = BrandResolvers.Query.v2BrandSearch as Function;
      const input = {
        filterGroups: [],
        page: 1,
        size: 20,
        sortOrders: [],
      };
      jest.spyOn(dataSources.brandUseCase, 'find').mockReturnValue(Promise.resolve([]));

      await v2BrandSearch(null, { input }, { dataSources });
      expect(dataSources.brandUseCase.find).toHaveBeenCalled();
    });
  });

  describe(`Query: v2BrandById`, async () => {
    it(`Should return as null when it cannot find`, async () => {
      const v2BrandById = BrandResolvers.Query.v2BrandById as Function;
      const input = {
        brandId: '1',
      };
      jest.spyOn(dataSources.brandUseCase, 'findOne').mockReturnValue(Promise.resolve({} as any));
      const res = await v2BrandById(null, input, { dataSources });
      expect(dataSources.brandUseCase.find).toHaveBeenCalled();
    });

    it(`Should return data property when it found data`, async () => {
      const v2BrandById = BrandResolvers.Query.v2BrandById as Function;
      const input = {
        brandId: '2',
      };
      jest.spyOn(dataSources.brandUseCase, 'findOne').mockReturnValue(
        Promise.resolve({
          brand_id: 1,
          name: 'branName',
          extension_attributes: {
            brand_image_url: 'https://staging-mdc.central.co.th/',
            menu_css: 'test',
          },
          logo: 'ffff.png',
          description: 'test',
          url_key: '/test',
        } as any),
      );
      const res = await v2BrandById(null, input, { dataSources });
      expect(dataSources.brandUseCase.find).toHaveBeenCalled();
    });
  });
});
