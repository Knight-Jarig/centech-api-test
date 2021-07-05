import { chunk } from 'lodash';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import GoogleApi from '../../../dataSource/googleApi';
import { MDCStoreConfig } from '../types/mdc-store-config';
import {
  IV2LineItems as ILineItems,
  IV2PackageInput as IPackageInput,
  IV2PackageOptionProduct as IPackageOptionProduct,
  IV2PackageOption as IPackageOption,
  IV2SetShippingInformationInput as ISetShippingInformationInput,
  IV2SubPackage as ISubPackage,
  IV2SetValidatePinInput as ISetValidatePinInput,
  IV2DeliveryPackageOptionInput as IDeliveryPackageOptionInput,
  IV2EstimateShippingInput as IEstimateShippingInput,
} from '../../../types/graphql';
import {
  IV2SingleShipping as ISingleShipping,
  IV2MultiShipping as IMultiShipping,
  IV2PackageShipping as IPackageShipping,
  IV2Role as IRole,
} from './ShippingTypes';
import {
  MDCPackageOption,
  MDCPackageOptionProduct,
  MDCShippingInfomation,
  MDCEstimateShippingMethods,
} from '../../../dataSource/magento/cart/MagentoCartResponse';
import { ApplicationError } from '../../../error/ApplicationError';
import { transformEstimateShippingMethodsPayload, transformEstimateShippingMethodsResponse } from './ShippingTransform';

interface ShippingUseCaseOptions {
  magento: MagentoDataSource;
  google?: GoogleApi;
}

export class ShippingUseCase {
  private store?: MDCStoreConfig;
  private role: IRole.member | IRole.guest = IRole.guest;
  private token: string;
  private magento: MagentoDataSource;
  private google: GoogleApi;

  constructor({ magento, google }: ShippingUseCaseOptions) {
    this.magento = magento;
    this.google = google;
  }

  initialize(config): void {
    this.store = config.context.store;
    this.role = config.context.role;
    this.token = config.context.authToken;
  }

  async getPackageOptions(storeId: string, cartId?: string): Promise<IPackageOption[]> {
    const result = await this.dataSource.getPackageOptions(storeId, cartId);
    return this.mapPackageOptions(result);
  }

  async getDeliveryPackageOptions(input: IDeliveryPackageOptionInput, cartId?: string): Promise<IPackageOption[]> {
    const result = await this.dataSource.getDeliveryPackageOptions(input, cartId);
    return this.mapPackageOptions(result);
  }

  async setValidatePin(input: ISetValidatePinInput, cartId?: string): Promise<boolean> {
    return this.dataSource.setValidatePin(input, cartId);
  }

  async setShippingInformation(
    input: ISetShippingInformationInput,
    cartId?: string,
  ): Promise<MDCShippingInfomation | []> {
    if (cartId && this.role === IRole.member) {
      const cart = await this.magento.cartId.getCartByID(this.store.code, cartId);
      const customer = await this.magento.customer.getCustomer(this.store.code);

      const isCartIdAllowToSetShipping = +customer.id === +cart.customer.id;
      if (!isCartIdAllowToSetShipping) {
        throw new ApplicationError('no permission');
      }
    }

    const isMultiShipping = Object.keys(input.package || {}).length > 0;
    const payload = isMultiShipping ? this.transformMultiShipping(input) : this.transformSingleShipping(input);

    return this.dataSource.setShippingInformation(payload, cartId);
  }

  async getEstimateShippingMethods(input: IEstimateShippingInput, guestId?: string, version?: number) {
    const payload = transformEstimateShippingMethodsPayload(input);
    const result = await this.dataSource.getEstimateShippingMethods(payload, guestId, version || 4);

    return transformEstimateShippingMethodsResponse(result);
  }

  private mapPackageOptions(result): IPackageOption[] {
    const packageOptions = result.map(packageOption => ({
      ...this.transformPackageOption(packageOption),
      sub_package: packageOption.sub_package
        ? packageOption.sub_package.map(subPackage => this.transformPackageOption(subPackage))
        : [],
    }));

    return packageOptions;
  }

  private transformPackageOption(packageOption): IPackageOption | ISubPackage {
    const { product, ...tailingFields } = packageOption;

    return {
      ...tailingFields,
      product: this.transformPackageOptionsProduct(product),
      line_items: this.transformPackageOptionsLineItems(product),
    };
  }

  private transformPackageOptionsLineItems(product: MDCPackageOptionProduct[]): ILineItems[] {
    const mapFields = line_item => ({
      line_id: line_item.line_id,
      line_number: line_item.line_number,
    });

    return product.map(p => p.line_items.map(mapFields)).flat();
  }

  private transformPackageOptionsProduct(product: MDCPackageOptionProduct[]): IPackageOptionProduct[] {
    return product.reduce((acc, cur) => {
      const { line_items, ...tailingFields } = cur;
      acc.push(tailingFields);
      return acc;
    }, []);
  }

  private transformSingleShipping(input: ISetShippingInformationInput): ISingleShipping {
    const { carrier_code, method_code, ...tailingInput } = input;

    return {
      ...tailingInput,
      shipping_carrier_code: carrier_code,
      shipping_method_code: method_code,
    };
  }

  private transformMultiShipping(input: ISetShippingInformationInput): IMultiShipping {
    const { package: mainPackage, shipping_address, billing_address, extension_attributes } = input;

    const hasSubPackage = mainPackage.sub_package && Object.keys(mainPackage.sub_package).length > 0;
    if (hasSubPackage) {
      const {
        lines: mainLines,
        stockIdsRequest: mainStockIdsRequest,
      } = this.transformShippingAddressExtensionAttributes(mainPackage);
      const { lines: subLines, stockIdsRequest: subStockIdsRequest } = this.transformShippingAddressExtensionAttributes(
        mainPackage.sub_package,
      );

      return {
        shipping_address: {
          ...shipping_address,
          extension_attributes: {
            lines: mainLines,
            extra_addresses: [
              {
                ...shipping_address,
                extension_attributes: {
                  lines: subLines,
                },
              },
            ],
          },
        },
        billing_address,
        extension_attributes: {
          ...extension_attributes,
          stock_ids_request: [...mainStockIdsRequest, ...subStockIdsRequest],
        },
        shipping_method_code: IPackageShipping.multiShipping,
        shipping_carrier_code: IPackageShipping.central,
      };
    }

    return {
      shipping_address,
      billing_address,
      extension_attributes,
      shipping_method_code: mainPackage.method_code,
      shipping_carrier_code: mainPackage.carrier_code,
    };
  }

  private transformShippingAddressExtensionAttributes = (pk: IPackageInput) =>
    pk.line_items.reduce(
      (acc, cur) => {
        const { method_code: shipping_method_code, carrier_code: shipping_carrier_code } = pk;

        acc.lines = [
          ...acc.lines,
          {
            line_id: cur.line_id,
            line_number: cur.line_number,
            extension_attributes: {
              shipping_information: {
                shipping_method_code,
                shipping_carrier_code,
              },
            },
          },
        ];

        acc.stockIdsRequest = [
          ...acc.stockIdsRequest,
          {
            stock_id: pk.stock_id,
            line_id: cur.line_id,
            line_number: cur.line_number,
          },
        ];
        return acc;
      },
      {
        lines: [],
        stockIdsRequest: [],
      },
    );

  private get dataSource(): {
    setShippingInformation(payload, cartId?: string): Promise<MDCShippingInfomation | []>;
    getPackageOptions(storeId, cartId?: string): Promise<MDCPackageOption[]>;
    setValidatePin(payload, cartId?: string): Promise<boolean>;
    getDeliveryPackageOptions(input: IDeliveryPackageOptionInput, cartId?: string): Promise<MDCPackageOption[]>;
    getEstimateShippingMethods(input, cartId?: string, version?: number): Promise<MDCEstimateShippingMethods[]>;
  } {
    const estimateShippingMethods = {
      [IRole.member]: {
        3: input => this.magento.cart.estimateShippingMethodsV3(input, this.store.code),
        4: input => this.magento.cart.estimateShippingMethodsV4(input, this.store.code),
      },
      [IRole.guest]: {
        3: (input, cartId) => this.magento.cartGuest.estimateShippingMethodsV3(input, cartId, this.store.code),
        4: (input, cartId) => this.magento.cartGuest.estimateShippingMethodsV4(input, cartId, this.store.code),
      },
    };
    const sources = {
      [IRole.member]: {
        setShippingInformation: (payload, cartId) => {
          if (cartId) return this.magento.cartId.setShippingInformation(payload, cartId);
          return this.magento.cart.setShippingInformation(payload);
        },
        getPackageOptions: storeId => this.magento.cart.getPackageOptions(this.store.code, storeId),
        setValidatePin: payload => this.magento.cart.setValidatePin(this.store.code, payload),
        getDeliveryPackageOptions: input => this.magento.cart.getDeliveryPackageOptions(this.store.code, input),
        getEstimateShippingMethods: (payload, _, version) =>
          estimateShippingMethods[`${this.role}`][`${version}`](payload, this.store.code),
      },
      [IRole.guest]: {
        setShippingInformation: (payload, cartId) => this.magento.cartGuest.setShippingInformation(payload, cartId),
        getPackageOptions: (storeId, cartId) =>
          this.magento.cartGuest.getPackageOptions(this.store.code, storeId, cartId),
        setValidatePin: (payload, cartId) => this.magento.cartGuest.setValidatePin(this.store.code, cartId, payload),
        getDeliveryPackageOptions: (input, cartId) =>
          this.magento.cartGuest.getDeliveryPackageOptions(this.store.code, input, cartId),
        getEstimateShippingMethods: (payload, guestId, version) =>
          estimateShippingMethods[`${this.role}`][`${version}`](payload, guestId, this.store.code),
      },
    };

    return sources[this.role];
  }

  sortNearestLocationsByLatLng(locations, lat, lng) {
    function dist(data) {
      return (
        (data.address.latitude - lat) * (data.address.latitude - lat) +
        (data.address.longitude - lng) * (data.address.longitude - lng)
      );
    }

    locations.sort((a, b) => {
      return dist(a) - dist(b);
    });
  }

  async getDistanceNearestPickupLocations(pickupLocations, filter, limit, offset) {
    const region = (filter.input?.country_id ?? '').toLowerCase() || 'th';
    let lat = filter.location?.lat;
    let lng = filter.location?.lng;

    if (filter.keyword && !(lat && lng)) {
      const params = {
        address: filter.keyword,
        region,
      };
      const geocode = await this.google.getGeocode(params);
      const location = geocode.results?.[0]?.geometry?.location ?? {};

      lat = location.lat;
      lng = location.lng;
    }

    this.sortNearestLocationsByLatLng(pickupLocations, lat, lng);

    const end = limit ? (offset ?? 0) + limit : undefined;
    pickupLocations = pickupLocations.slice(offset, end);

    if (!lat || !lng) {
      return pickupLocations;
    }

    const countLocaitons = pickupLocations.length;
    const maxLengthDestination = 100;
    const locationChunk =
      countLocaitons > maxLengthDestination ? chunk(pickupLocations, maxLengthDestination) : [pickupLocations];

    const locationResultChunk: Array<any> = await Promise.all(
      locationChunk.map(async locate => {
        const locations = locate.map(store => `${store.address.latitude},${store.address.longitude}`);
        const params = {
          destinations: locations.join('|'),
          origins: `${lat},${lng}`,
          region,
        };
        const { rows } = await this.google.getDistanceMatrix(params);

        return rows?.[0]?.elements;
      }),
    );

    const distanceMatrixElements = locationResultChunk.flat();
    const pickupStoresLocation = pickupLocations
      .map((store, index) => ({
        ...store,
        distance: distanceMatrixElements?.[index]?.distance,
      }))
      .sort((a, b) => a.distance?.value - b.distance?.value);

    return pickupStoresLocation;
  }
}
