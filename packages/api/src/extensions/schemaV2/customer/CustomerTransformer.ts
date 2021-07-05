import { DateTime } from 'luxon';
import { mapGender } from '../../../utils/customer.utils';
import { fromCustomAttributes } from '../../../utils/transformer';
import { IAddressType, ITaxType, IV2Customer, IV2CustomerAddress } from '../../../types/graphql';
import {
  MDCGetCustomer,
  MDCGetCustomerAddresses,
  V2T1DataForm,
  V2T1DataFormCustomerById,
  V2UpdateCustomerT1InputCustomerProfile,
} from '../../../dataSource/magento/customer/MagentoCustomerResponse';

export function getCustomerProfile(customerProfile: MDCGetCustomer): IV2Customer {
  return {
    id: customerProfile?.id?.toString(),
    groupId: customerProfile?.group_id?.toString(),
    defaultShipping: customerProfile?.default_shipping,
    createdAt: DateTime.fromFormat(customerProfile?.created_at ?? '', 'yyyy-MM-dd HH:mm:ss', {
      zone: 'utc+0',
    }).toUTC(),
    updatedAt: DateTime.fromFormat(customerProfile?.updated_at ?? '', 'yyyy-MM-dd HH:mm:ss', {
      zone: 'utc+0',
    }).toUTC(),
    createdIn: customerProfile?.created_in,
    email: customerProfile?.email,
    firstname: customerProfile?.firstname,
    lastname: customerProfile?.lastname,
    storeId: customerProfile?.store_id?.toString(),
    websiteId: customerProfile?.website_id?.toString(),
    addresses: transformAddress(customerProfile?.addresses),
    disableAutoGroupChange: customerProfile?.disable_auto_group_change,
    isSubscribed: customerProfile?.extension_attributes?.is_subscribed || false,
    phone: fromCustomAttributes({ key: 'phone' })(null, customerProfile),
    profileImage: fromCustomAttributes({ key: 'profile_image_s3_url', defaultValue: '' })(null, customerProfile),
    t1cNo: fromCustomAttributes({ key: 't1c_number', defaultValue: '' })(null, customerProfile),
    t1cPhone: fromCustomAttributes({ key: 't1c_phone', defaultValue: '' })(null, customerProfile),
    t1cApiVersion: fromCustomAttributes({ key: 't1_api_version', defaultValue: '' })(null, customerProfile),
    language: fromCustomAttributes({ key: 'language', defaultValue: 'th' })(null, customerProfile),
    marketOpen: fromCustomAttributes({ key: 'market_open', defaultValue: '' })(null, customerProfile),
    needReacceptConsents: customerProfile?.needReacceptConsents,
    defaultBilling: customerProfile?.default_billing,
    dob: customerProfile.dob,
    gender: mapGender(customerProfile?.gender),
    message: customerProfile?.message,
    taxId: customerProfile?.taxvat?.toString(),
  };
}

export function transformAddress(addresses: MDCGetCustomerAddresses[]): IV2CustomerAddress[] {
  return addresses.map(current => {
    return {
      id: current?.id?.toString(),
      firstname: current?.firstname,
      lastname: current?.lastname,
      telephone: current?.telephone,
      building: fromCustomAttributes({ key: 'building' })(null, current),
      addressLine: fromCustomAttributes({ key: 'address_line', defaultValue: '' })(null, current),
      subdistrict: {
        id: fromCustomAttributes({ key: 'subdistrict_id', transform: val => val?.toString() })(null, current),
        name: fromCustomAttributes({ key: 'subdistrict' })(null, current),
      },
      district: {
        id: fromCustomAttributes({ key: 'district_id', transform: val => val?.toString() })(null, current),
        name: fromCustomAttributes({ key: 'district' })(null, current),
      },
      province: {
        id: current?.region_id?.toString(),
        code: current?.region?.region_code,
        name: current?.region?.region,
      },
      postcode: current?.postcode,
      addressName: fromCustomAttributes({ key: 'address_name' })(null, current),
      customerAddressType: fromCustomAttributes({
        key: 'customer_address_type',
        defaultValue: IAddressType.Shipping,
        transform: val => val?.toUpperCase(),
      })(null, current),
      fullTaxType: fromCustomAttributes({
        key: 'full_tax_type',
        defaultValue: ITaxType.Personal,
        transform: val => val?.toUpperCase(),
      })(null, current),
      branchId: fromCustomAttributes({ key: 'branch_id', transform: val => val?.toString() })(null, current),
      countryId: current?.country_id?.toString(),
      isDefaultShipping: !!current?.default_shipping,
      city: current?.city,
      customerId: current?.customer_id?.toString(),
      street: current?.street,
      vatId: current?.vat_id?.toString(),
      company: current?.company,
      isDefaultBilling: !!current?.default_billing,
      locationName: fromCustomAttributes({ key: 'location_name', defaultValue: '' })(null, current),
      latitude: fromCustomAttributes({ key: 'latitude', defaultValue: '' })(null, current),
      longitude: fromCustomAttributes({ key: 'longitude', defaultValue: '' })(null, current),
    };
  });
}

export function t1DataForm(
  customerProfile: V2UpdateCustomerT1InputCustomerProfile,
  t1cNumber: string,
  t1ApiVersion: string,
): V2T1DataForm {
  return {
    customer: {
      email: customerProfile?.email,
      firstname: customerProfile?.firstname,
      lastname: customerProfile?.lastname,
      website_id: parseInt(customerProfile?.websiteId),
      custom_attributes: [
        { attribute_code: 't1c_number', value: t1cNumber },
        { attribute_code: 't1_api_version', value: t1ApiVersion },
      ],
    },
  };
}

export function transformToUpdateT1ById(
  id: string,
  customerProfile: V2UpdateCustomerT1InputCustomerProfile,
  t1cNumber: string,
  t1ApiVersion: string,
): V2T1DataFormCustomerById {
  return {
    id: id?.toString(),
    email: customerProfile?.email,
    firstname: customerProfile?.firstname,
    lastname: customerProfile?.lastname,
    website_id: parseInt(customerProfile?.websiteId),
    custom_attributes: [
      { attribute_code: 't1c_number', value: t1cNumber },
      { attribute_code: 't1_api_version', value: t1ApiVersion },
    ],
  };
}
