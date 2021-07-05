import shippingResolvers from './shippingResolvers';
import { createDataSources } from '../../dataSource';

jest.mock('../../dataSource');

describe('Product Resolvers', () => {
  const dataSources = createDataSources();
  dataSources.shippingUseCase = {
    getDeliveryPackageOptions: jest.fn(),
  } as any;

  describe(`Query: v2DeliveryPackageOptions`, () => {
    const estimateShippingMethodsV4 = shippingResolvers.Query.estimateShippingMethodsV4 as Function;
    const storeCode = 'cds_th';
    const input = {};

    it(`should call estimateShippingMethodsV4 without cartId(member)`, async () => {
      jest.spyOn(dataSources.magento.cart, 'estimateShippingMethodsV4').mockReturnValue(Promise.resolve([]));
      await estimateShippingMethodsV4(null, { input, isGuest: false }, { dataSources, storeCode });
      expect(dataSources.magento.cart.estimateShippingMethodsV4).toBeCalledWith(input, storeCode);
    });

    it(`should call estimateShippingMethodsV4 with cartId(guest)`, async () => {
      const cartId = '123';
      jest.spyOn(dataSources.magento.cartGuest, 'estimateShippingMethodsV4').mockReturnValue(Promise.resolve([]));
      await estimateShippingMethodsV4(null, { input, cartId, isGuest: true }, { dataSources, storeCode });
      expect(dataSources.magento.cartGuest.estimateShippingMethodsV4).toBeCalledWith(input, cartId, storeCode);
    });
  });
});
