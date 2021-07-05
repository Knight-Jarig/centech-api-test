import { mapObjectToCustomAttributes } from '../utils/attribute.utils';
import get from 'lodash/get';
import { MagentoAddress } from '../dataSource/magento/address/MagentoAddressResponse';
import { ICustomerAddressResult } from '../types/graphql';

class AddressModel {
  static transformAddressToMagentoAddress(address): MagentoAddress {
    return {
      id: address.id,
      customer_id: address.customer_id,
      firstname: address.firstname,
      lastname: address.lastname,
      city: address.city,
      telephone: address.telephone,
      country_id: address.country_id,
      vat_id: address.vat_id,
      company: address.company,
      street: ['n/a'],
      region_id: Number(address.region_id),
      region: {
        region: address.region,
        region_code: address.region_code,
        region_id: Number(address.region_id),
      },
      default_billing: !!address.default_billing,
      default_shipping: !!address.default_shipping,
      postcode: address.postcode,
      custom_attributes: mapObjectToCustomAttributes(address.custom_attributes),
    };
  }
  static transformMagentoAddressToAddress(magentoAddress: MagentoAddress): ICustomerAddressResult {
    return {
      id: magentoAddress.id,
      customer_id: magentoAddress.customer_id,
      firstname: magentoAddress.firstname,
      lastname: magentoAddress.lastname,
      city: magentoAddress.city,
      telephone: magentoAddress.telephone,
      country_id: magentoAddress.country_id,
      vat_id: magentoAddress.vat_id,
      company: magentoAddress.company,
      region_id: `${magentoAddress.region_id}`,
      region: get(magentoAddress, 'region.region', 'n/a'),
      default_billing: !!magentoAddress.default_billing,
      default_shipping: !!magentoAddress.default_shipping,
      postcode: magentoAddress.postcode,
      custom_attributes: magentoAddress.custom_attributes,
    };
  }
}

export default AddressModel;
