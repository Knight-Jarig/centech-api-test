import { ShippingUseCase } from './ShippingUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import GoogleApi from '../../../dataSource/googleApi';
import {
  inputMultiShipping,
  inputMultiShippingNoneSubPackage,
  inputSingleShipping,
  mockCartByIDMDCResult1,
  mockCartByIDMDCResult2,
  mockCustomerMDCResult,
  mockPackageOptionsMDCResult1,
  mockPackageOptionsMDCResult2,
  mockPackageOptionsMDCResult3,
  mockPackageOptionsMDCResult4,
  mockPayloadTransformMultiShipping,
  mockPayloadTransformMultiShippingNoneSubPackage,
  mockPayloadTransformSingleShipping,
  inputSetValidatePin,
  expectInputGetEstimateShippingMethods1,
  inputGetEstimateShippingMethods1,
  expectInputGetEstimateShippingMethods2,
  inputGetEstimateShippingMethods2,
  mockEstimateShippingMethodsV4MDCResult,
  mockEstimateShippingMethodsV4Result,
} from './__mocks__/ShippingUseCase';

jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('../../../dataSource/googleApi');
const store = { code: 'cds_th' };

function runShippingCase(magento, input, payload?) {
  jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerMDCResult) as any);

  it('Member with cartId: success', async () => {
    const shippingUseCase = new ShippingUseCase({ magento });
    const cartId = 'j8mqsKPuobn2FZnQZqiV1Hw2AN3Zbo0l';
    jest.spyOn(magento.cartId, 'getCartByID').mockReturnValue(Promise.resolve(mockCartByIDMDCResult2) as any);

    shippingUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });
    const result = await shippingUseCase.setShippingInformation(input, cartId);
    expect(result).toBe(true);
    expect(magento.cartId.setShippingInformation).toBeCalledWith(expect.objectContaining(payload), cartId);
  });

  it('Member with cartId: fail (no permission)', async () => {
    const shippingUseCase = new ShippingUseCase({ magento });
    const cartId = 'j8mqsKPuobn2FZnQZqiV1Hw2AN3Zbo0l';
    jest.spyOn(magento.cartId, 'getCartByID').mockReturnValue(Promise.resolve(mockCartByIDMDCResult1) as any);

    shippingUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });
    await expect(() => shippingUseCase.setShippingInformation(input, cartId)).rejects.toThrow();
  });

  it('Member with no cartId', async () => {
    const shippingUseCase = new ShippingUseCase({ magento });
    shippingUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });
    const result = await shippingUseCase.setShippingInformation(input);
    expect(result).toBe(true);
    expect(magento.cart.setShippingInformation).toBeCalledWith(expect.objectContaining(payload));
  });

  it('Guest', async () => {
    const shippingUseCase = new ShippingUseCase({ magento });
    const cartId = 'j8mqsKPuobn2FZnQZqiV1Hw2AN3Zbo0l';
    shippingUseCase.initialize({
      context: {
        store,
        role: 'guest',
      },
    });
    const result = await shippingUseCase.setShippingInformation(input, cartId);
    expect(result).toBe(true);
    expect(magento.cartGuest.setShippingInformation).toBeCalledWith(expect.objectContaining(payload), cartId);
  });
}

function runPackageOptionCase(service, magento) {
  const shippingUseCase = new ShippingUseCase({ magento });

  it('Member (no cartId): has sub_package', async () => {
    jest.spyOn(magento.cart, service).mockReturnValue(Promise.resolve(mockPackageOptionsMDCResult1) as any);
    shippingUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });
    const packageOptions = await shippingUseCase[service]();
    expect(packageOptions[0].product[0].sku).toBe('SKUFORMEMBER');
    expect(packageOptions[0].has_sub_package).toBe(true);
    expect(packageOptions[0].sub_package).toHaveLength(1);
  });
  it('Guest (with cartId): has sub_package', async () => {
    jest.spyOn(magento.cartGuest, service).mockReturnValue(Promise.resolve(mockPackageOptionsMDCResult2) as any);
    shippingUseCase.initialize({
      context: {
        store,
        role: 'guest',
      },
    });
    const packageOptions = await shippingUseCase[service]();
    expect(packageOptions[0].product[0].sku).toBe('SKUFORGUEST');
    expect(packageOptions[0].has_sub_package).toBe(true);
    expect(packageOptions[0].sub_package).toHaveLength(1);
  });
}

function runEmptySubPackageCase(service, magento) {
  const shippingUseCase = new ShippingUseCase({ magento });

  it('Member (no cartId): none sub_package', async () => {
    jest.spyOn(magento.cart, service).mockReturnValue(Promise.resolve(mockPackageOptionsMDCResult3));
    shippingUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });
    const packageOptions = await shippingUseCase[service]();
    expect(packageOptions[0].product[0].sku).toBe('SKUFORMEMBER');
    expect(packageOptions[0].has_sub_package).toBe(false);
    expect(packageOptions[0].sub_package).toHaveLength(0);
  });
  it('Guest (with cartId): none sub_package', async () => {
    jest.spyOn(magento.cartGuest, service).mockReturnValue(Promise.resolve(mockPackageOptionsMDCResult4));
    shippingUseCase.initialize({
      context: {
        store,
        role: 'guest',
      },
    });
    const packageOptions = await shippingUseCase[service]();
    expect(packageOptions[0].product[0].sku).toBe('SKUFORGUEST');
    expect(packageOptions[0].has_sub_package).toBe(false);
    expect(packageOptions[0].sub_package).toHaveLength(0);
  });
}

describe('Shipping Usecase', () => {
  const magento = new MagentoDataSource();
  const google = new GoogleApi();

  describe('getPackageOptions: empty sub_package', () => {
    runEmptySubPackageCase('getPackageOptions', magento);
  });

  describe('getPackageOptions: has sub_package', () => {
    runPackageOptionCase('getPackageOptions', magento);
  });

  describe('getDeliveryPackageOptions: empty sub_package', () => {
    runEmptySubPackageCase('getDeliveryPackageOptions', magento);
  });

  describe('getDeliveryPackageOptions: has sub_package', () => {
    runPackageOptionCase('getDeliveryPackageOptions', magento);
  });

  describe('setShippingInformation: single shipping', () => {
    runShippingCase(magento, inputSingleShipping, mockPayloadTransformSingleShipping);
  });

  describe('setShippingInformation: multi shipping', () => {
    runShippingCase(magento, inputMultiShipping, mockPayloadTransformMultiShipping);

    it('None sub_package', async () => {
      const shippingUseCase = new ShippingUseCase({ magento });
      shippingUseCase.initialize({
        context: {
          store,
          role: 'guest',
        },
      });
      const result = await shippingUseCase.setShippingInformation(inputMultiShippingNoneSubPackage);
      expect(result).toBe(true);
      expect(magento.cartGuest.setShippingInformation).toBeCalledWith(
        expect.objectContaining(mockPayloadTransformMultiShippingNoneSubPackage),
        undefined,
      );
    });
  });

  describe('setValidatePin', () => {
    const shippingUseCase = new ShippingUseCase({ magento });
    const cartId = '1234';
    it('Should call magento.cartGuest.setValidatePin with expect attrs (guest case)', async () => {
      shippingUseCase.initialize({
        context: {
          store,
          role: 'guest',
        },
      });

      await shippingUseCase.setValidatePin(inputSetValidatePin, cartId);

      expect(magento.cartGuest.setValidatePin).toBeCalledWith(
        store.code,
        cartId,
        expect.objectContaining(inputSetValidatePin),
      );
    });

    it('Should call magento.cart.setValidatePin with expect attrs (member case)', async () => {
      shippingUseCase.initialize({
        context: {
          store,
          role: 'member',
        },
      });

      await shippingUseCase.setValidatePin(inputSetValidatePin);

      expect(magento.cart.setValidatePin).toBeCalledWith(store.code, expect.objectContaining(inputSetValidatePin));
    });
  });

  describe('getEstimateShippingMethods', () => {
    const shippingUseCase = new ShippingUseCase({ magento });
    const guestId = '1234';
    const version = 3;

    it('Should call magento.cart.estimateShippingMethodsV3 with expect attrs (member case)', async () => {
      shippingUseCase.initialize({
        context: {
          store,
          role: 'member',
        },
      });
      jest.spyOn(magento.cart, 'estimateShippingMethodsV3').mockReturnValue(Promise.resolve([]) as any);
      await shippingUseCase.getEstimateShippingMethods(inputGetEstimateShippingMethods1, '', version);

      expect(magento.cart.estimateShippingMethodsV3).toBeCalledWith(expectInputGetEstimateShippingMethods1, store.code);
    });

    it('Should call magento.cart.estimateShippingMethodsV4 with expect attrs (member case)', async () => {
      shippingUseCase.initialize({
        context: {
          store,
          role: 'member',
        },
      });
      jest.spyOn(magento.cart, 'estimateShippingMethodsV4').mockReturnValue(Promise.resolve([]) as any);
      await shippingUseCase.getEstimateShippingMethods(inputGetEstimateShippingMethods1);

      expect(magento.cart.estimateShippingMethodsV4).toBeCalledWith(expectInputGetEstimateShippingMethods1, store.code);
    });

    it('Should call magento.cartGuest.estimateShippingMethodsV3 with expect attrs (guest case)', async () => {
      shippingUseCase.initialize({
        context: {
          store,
          role: 'guest',
        },
      });
      jest.spyOn(magento.cartGuest, 'estimateShippingMethodsV3').mockReturnValue(Promise.resolve([]) as any);
      await shippingUseCase.getEstimateShippingMethods(inputGetEstimateShippingMethods2, guestId, version);

      expect(magento.cartGuest.estimateShippingMethodsV3).toBeCalledWith(
        expectInputGetEstimateShippingMethods2,
        guestId,
        store.code,
      );
    });

    it('Should call magento.cartGuest.estimateShippingMethodsV4 with expect attrs (guest case)', async () => {
      shippingUseCase.initialize({
        context: {
          store,
          role: 'guest',
        },
      });
      jest.spyOn(magento.cartGuest, 'estimateShippingMethodsV4').mockReturnValue(Promise.resolve([]) as any);
      await shippingUseCase.getEstimateShippingMethods(inputGetEstimateShippingMethods2, guestId);

      expect(magento.cartGuest.estimateShippingMethodsV4).toBeCalledWith(
        expectInputGetEstimateShippingMethods2,
        guestId,
        store.code,
      );
    });

    it('Should return expect result', async () => {
      shippingUseCase.initialize({
        context: {
          store,
          role: 'guest',
        },
      });
      jest
        .spyOn(magento.cartGuest, 'estimateShippingMethodsV4')
        .mockReturnValue(Promise.resolve(mockEstimateShippingMethodsV4MDCResult) as any);
      const result = await shippingUseCase.getEstimateShippingMethods(inputGetEstimateShippingMethods1, guestId);

      expect(JSON.parse(JSON.stringify(result))).toEqual(
        JSON.parse(JSON.stringify(mockEstimateShippingMethodsV4Result)),
      );
    });
  });

  describe('sortNearestLocationsByLatLng', () => {
    const shippingUseCase = new ShippingUseCase({ magento });

    it('Should run sortNearestLocationsByLatLng properly', async () => {
      const locations = [
        { address: { latitude: '1', longitude: '1' } },
        { address: { latitude: '2', longitude: '2' } },
        { address: { latitude: '3', longitude: '3' } },
      ];
      const lat = '0';
      const lng = '0';
      const result = await shippingUseCase.sortNearestLocationsByLatLng(locations, lat, lng);
      expect(result).toEqual(undefined);
    });
  });

  describe('getDistanceNearestPickupLocations', () => {
    const shippingUseCase = new ShippingUseCase({ magento, google });

    it('Should run getDistanceNearestPickupLocations properly', async () => {
      const pickupLocations = [{ address: { latitude: '13.8151118', longitude: '100.5005754' } }];
      const filter = { input: { country_id: '1' }, location: { lat: '13.8151118', lng: '100.5005754' }, keyword: 'a' };
      const limit = 0;
      const offset = 0;

      jest
        .spyOn(google, 'getDistanceMatrix')
        .mockReturnValue(Promise.resolve({ rows: [{ elements: { flat: () => '1' } }] }) as any);
      const expected = [{ address: { latitude: '13.8151118', longitude: '100.5005754' }, distance: undefined }];
      const result = await shippingUseCase.getDistanceNearestPickupLocations(pickupLocations, filter, limit, offset);
      expect(result).toEqual(expected);
    });
  });
});
