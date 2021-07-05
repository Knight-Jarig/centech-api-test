import { customAttributes as transformCustomAttributes } from '../../../utils/transformer';
import {
  IV2AddressType as IAddressType,
  IV2TaxType as ITaxType,
  IV2Place as IPlace,
  IV2Province as IProvince,
  IV2AddressCds as IAddressCDS,
  IV2AddressTops as IAddressTOPS,
  IV2AddressPwb as IAddressPWB,
} from '../../../types/graphql';

type IAddressUnion = IAddressCDS | IAddressTOPS | IAddressPWB;

export function getAddress<T = IAddressUnion>(address, bu?: string): T | IAddressUnion {
  const customAttributes = transformCustomAttributes(
    address?.custom_attributes || address?.extension_attributes?.custom_attributes,
    // order will return custom_attributes in extension_attributes
  );
  // must refractor split function getAddressOrder
  const province = address?.region?.constructor === Object ? address.region : address;

  return {
    id: address.id?.toString(),
    customerId: address.customerId?.toString(),
    firstName: address.firstname,
    lastName: address.lastname,
    telephone: address.telephone,
    postcode: address.postcode,
    countryId: address.country_id?.toString(),
    company: address.company,
    vatId: address.vat_id,
    subDistrict: getSubDistrict(customAttributes),
    district: getDistrict(customAttributes),
    province: getProvince(province),
    isDefaultBilling: !!address.default_billing,
    isDefaultShipping: !!address.default_shipping,
    isFullTaxRequest: !!Number(customAttributes.full_tax_request) || false,
    customerAddressType: customAttributes.customer_address_type?.toUpperCase() || IAddressType.Shipping,

    ...getAllCustomAttributes(customAttributes),
  };
}

function getAllCustomAttributes(customAttributes) {
  return {
    addressLine: customAttributes.address_line || '',
    addressName: customAttributes.address_name || '',
    building: customAttributes.building || '',
    branchId: customAttributes.branch_id || '',
    remark: customAttributes.remark || '',
    houseNo: customAttributes.house_no || '',
    fax: customAttributes.fax || '',
    soi: customAttributes.soi || '',
    villageName: customAttributes.village_name || '',
    road: customAttributes.road || '',
    moo: customAttributes.moo || '',
    buildingType: customAttributes.building_type || '',
    telMobile: customAttributes.tel_mobile || '',
    lat: customAttributes.lat?.toString() || '',
    lng: customAttributes.lng?.toString() || '',
    fullTaxType: customAttributes.full_tax_type?.toUpperCase() || ITaxType.Personal,
  };
}

export function getDistrict(address): IPlace {
  if (!address?.district_id && !address?.district) return null;

  return {
    id: address?.district_id?.toString(),
    name: address?.district,
  };
}

export function getSubDistrict(address): IPlace {
  if (!address?.subdistrict_id && !address?.subdistrict) return null;

  return {
    id: address?.subdistrict_id?.toString(),
    name: address?.subdistrict,
  };
}

export function getProvince(address): IProvince {
  if (!address?.region_id && !address?.region) return null;

  return {
    id: address?.region_id?.toString(),
    code: address?.region_code,
    name: address?.region,
  };
}
