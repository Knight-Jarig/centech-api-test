import { ShippingResolvers } from './ShippingResolvers';
import { createDataSources } from '../../../dataSource/';

jest.mock('../../../dataSource');

describe('Shipping Resolvers', () => {
  const dataSources = createDataSources();
  dataSources.shippingUseCase = {
    getDeliveryPackageOptions: jest.fn(),
    setValidatePin: jest.fn(),
    getEstimateShippingMethods: jest.fn(),
    getEstimateShippingMethodsV3: jest.fn(),
  } as any;

  describe(`V2StoresLocationAdditionalText`, () => {
    const getTimeLabel = ShippingResolvers.V2StoresLocationAdditionalText.timeLabel as Function;

    it(`should return timeLabel with replace string`, async () => {
      const timeLabel = await getTimeLabel({ timeLabel: '3 days' }, null, { locale: 'th' });
      expect(timeLabel).toEqual('3 วัน');
    });
  });

  describe(`Query: v2DeliveryPackageOptions`, () => {
    const v2DeliveryPackageOptions = ShippingResolvers.Query.v2DeliveryPackageOptions as Function;
    it(`should call getDeliveryPackageOptions with expect attrs`, async () => {
      const cartId = '123';
      const input = {
        method_code: 'cds_standard',
      };
      await v2DeliveryPackageOptions(null, { cartId, input }, { dataSources });

      expect(dataSources.shippingUseCase.getDeliveryPackageOptions).toBeCalledWith(input, cartId);
    });
  });

  describe(`Query: v2EstimateShippingMethods`, () => {
    const v2EstimateShippingMethods = ShippingResolvers.Query.v2EstimateShippingMethods as Function;
    it(`should call getEstimateShippingMethods with expect attrs`, async () => {
      const guestId = '123';
      const input = {};
      const version = 4;

      await v2EstimateShippingMethods(null, { guestId, input, version }, { dataSources });

      expect(dataSources.shippingUseCase.getEstimateShippingMethods).toBeCalledWith(input, guestId, version);
    });
  });

  describe(`Mutation: v2SetValidatePin`, () => {
    const v2SetValidatePin = ShippingResolvers.Mutation.v2SetValidatePin as Function;
    const input = {
      latitude: '13.674875',
      longitude: '100.633990',
    };

    it(`should call setValidatePin with expect attrs`, async () => {
      const cartId = '123';
      await v2SetValidatePin(null, { cartId, input }, { dataSources });

      expect(dataSources.shippingUseCase.setValidatePin).toBeCalledWith(input, cartId);
    });
  });
});
