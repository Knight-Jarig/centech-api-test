import { DeliveryOptionUseCase } from './DeliveryOptionUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import {
  mockDeliveryOptionMDCResult1,
  mockDeliveryOptionMDCResult2,
  mockDeliveryOptionResult1,
  mockDeliveryOptionResult2,
  mockDeliveryOptionResult3,
  mockDeliveryOptionResult5,
} from './__mocks__/DeliveryOptionUseCase';

jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Delivery Option Usecase', () => {
  const magento = new MagentoDataSource();
  const deliveryOptionUseCase = new DeliveryOptionUseCase({ magento });
  deliveryOptionUseCase.initialize({
    context: {
      store: 'cds_th',
    },
  });
  const sku = 'Sku Test';
  const postcode = '10170';

  it('Search: case 1', async () => {
    jest
      .spyOn(magento.deliveryMethod, 'getDeliveryMethodsV2')
      .mockReturnValue(Promise.resolve(mockDeliveryOptionMDCResult2));
    const deliveryOptionResult = await deliveryOptionUseCase.search({ sku, postcode: '' });
    expect(deliveryOptionResult).toMatchObject(mockDeliveryOptionResult2);
  });

  it('Search: case 2', async () => {
    jest.spyOn(magento.deliveryMethod, 'getDeliveryMethodsV2').mockReturnValue(Promise.resolve(null));
    const deliveryOptionResult = await deliveryOptionUseCase.search({ sku, postcode });
    expect(deliveryOptionResult).toMatchObject([]);
  });

  it('Search: case 3', async () => {
    jest
      .spyOn(magento.deliveryMethod, 'getDeliveryMethodsV2')
      .mockReturnValue(Promise.resolve(mockDeliveryOptionMDCResult1));
    const deliveryOptionResult = await deliveryOptionUseCase.search({ sku, postcode });
    expect(deliveryOptionResult).toMatchObject(mockDeliveryOptionResult1);
  });

  it('Search: case 4', async () => {
    jest
      .spyOn(magento.deliveryMethod, 'getDeliveryMethodsV2')
      .mockReturnValue(Promise.resolve(mockDeliveryOptionMDCResult1));
    const deliveryOptionResult = await deliveryOptionUseCase.search({ sku, postcode, onlineSalable: true, offlineSalable: true });
    expect(deliveryOptionResult).toMatchObject(mockDeliveryOptionResult1);
  });

  it('Search: case 5', async () => {
    jest
      .spyOn(magento.deliveryMethod, 'getDeliveryMethodsV2')
      .mockReturnValue(Promise.resolve(mockDeliveryOptionMDCResult1));
    const deliveryOptionResult = await deliveryOptionUseCase.search({ sku, postcode, onlineSalable: true, offlineSalable: false });
    expect(deliveryOptionResult).toMatchObject(mockDeliveryOptionResult3);
  });

  it('Search: case 7', async () => {
    jest
      .spyOn(magento.deliveryMethod, 'getDeliveryMethodsV2')
      .mockReturnValue(Promise.resolve(mockDeliveryOptionMDCResult1));
    const deliveryOptionResult = await deliveryOptionUseCase.search({ sku, postcode, onlineSalable: false, offlineSalable: false });
    expect(deliveryOptionResult).toMatchObject(mockDeliveryOptionResult5);
  });
});
