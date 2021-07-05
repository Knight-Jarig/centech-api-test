import BrandResolvers from './brandResolvers';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';

jest.mock('../../dataSource/magento/MagentoDataSource');

describe('Brand Resolvers', () => {
  const magentoDataSource = new MagentoDataSource();
  const dataSources = {
    magento: magentoDataSource,
  };
  describe('Query: brands', () => {
    it('Should call brands properly', async () => {
      const brands = BrandResolvers.Query.brands as Function;
      jest.spyOn(dataSources.magento.brand, 'find').mockReturnValue(Promise.resolve([]));
      const input = {
        filterGroups: [],
        page: 1,
        size: 20,
        sortOrders: {},
      };
      await brands(null, { input }, { dataSources });
      expect(dataSources.magento.brand.find).toHaveBeenCalled();
    });

    it('Should call brandDetail properly', async () => {
      const brandDetail = BrandResolvers.Query.brandDetail as Function;
      jest.spyOn(dataSources.magento.brand, 'findOne').mockReturnValue(Promise.resolve({} as any));
      const input = {
        brandId: '1',
      };
      await brandDetail(null, { input }, { dataSources });
      expect(dataSources.magento.brand.findOne).toHaveBeenCalled();
    });
  });
});
