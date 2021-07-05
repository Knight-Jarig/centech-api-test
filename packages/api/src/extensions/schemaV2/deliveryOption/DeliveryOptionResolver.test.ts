import { DeliveryOptionResolvers } from './DeliveryOptionResolver';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { DeliveryOptionUseCase } from './DeliveryOptionUseCase';

jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('./../../../dataSource/googleApi/index');

describe('Delivery Option Resolvers', () => {
  const magento = new MagentoDataSource();
  const deliveryOptionUseCase = new DeliveryOptionUseCase({ magento });
  const dataSources = {
    deliveryOptionUseCase,
    google: {
      getPostcodeByLatLng: jest.fn().mockReturnValue('12345'),
    },
  };
  const context = {
    dataSources,
  };
  describe(`Query v2DeliveryOptionByPostcode`, () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const v2DeliveryOptionByPostcode = DeliveryOptionResolvers.Query.v2DeliveryOptionByPostcode as Function;
    it(`should return data as expect`, async () => {
      jest.spyOn(dataSources.deliveryOptionUseCase, 'search').mockReturnValue(Promise.resolve(null));
      await v2DeliveryOptionByPostcode(
        null,
        {
          input: {
            sku: 'sku',
            postcode: '',
            lat: '0.1',
            lng: '0.1',
          },
        },
        context,
      );
      expect(dataSources.deliveryOptionUseCase.search).toHaveBeenCalled();
    });
  });
});
