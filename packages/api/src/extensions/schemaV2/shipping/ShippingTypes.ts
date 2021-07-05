interface IV2ShippingAddressCustomAttributes {
  address_line?: string;
  address_name?: string;
  branch_id?: string;
  customer_address_type?: string;
  remark?: string;
  house_no?: string;
  district_id?: string;
  district?: string;
  subdistrict_id?: string;
  subdistrict?: string;
  building?: string;
  fax?: string;
  soi?: string;
  postcode?: string;
  full_tax_request?: string;
  full_tax_type?: string;
}

interface IV2ShippingAddress {
  firstname?: string;
  lastname?: string;
  email?: string;
  city?: string;
  telephone?: string;
  country_id?: string;
  street?: string[];
  vat_id?: string;
  company?: string;
  region_id?: string;
  region?: string;
  postcode?: string;
  default_billing?: boolean;
  default_shipping?: boolean;
  region_code?: string;
  same_as_billing?: number;
  save_in_address_book?: number;
  custom_attributes?: IV2ShippingAddressCustomAttributes;

  customer_id?: number;
  address_id?: string;
  address_name?: string;
  address_line?: string;
  customer_address_type?: string;
  building?: string;
  district?: string;
  district_id?: string;
  subdistrict?: string;
  subdistrict_id?: string;
  remark?: string;
  billing_type?: string;
  branch_id?: string;
  full_tax_request?: string;
  full_tax_type?: string;
}

interface IV2ShippingAddressShippingInformation {
  shipping_method_code?: string;
  shipping_carrier_code?: string;
}

interface IV2ShippingAddressLinesExtensionAttributes {
  shipping_information?: IV2ShippingAddressShippingInformation;
}

interface IV2ShippingAddressExtensionAttributesLines {
  line_id?: string;
  line_number?: number;
  extension_attributes?: IV2ShippingAddressLinesExtensionAttributes;
}

interface IV2ShippingAddressExtensionAttributes {
  lines?: IV2ShippingAddressExtensionAttributesLines[];
  extra_addresses?: IV2MultiShippingAddress[];
}

interface IV2MultiShippingAddress extends IV2ShippingAddress {
  extension_attributes?: IV2ShippingAddressExtensionAttributes;
}

interface IV2StockIdsRequest {
  stock_id?: string;
  line_id?: string;
  line_number?: number;
}

interface IV2PickupStore {
  store_id?: string;
  pickup_store_id?: string;
  receiver_name?: string;
  receiver_phone?: string;
}

interface IV2ShippingExtensionAttributes {
  pickup_store?: IV2PickupStore;
  pickup_location_id?: string;
  stock_ids_request?: IV2StockIdsRequest[];
}

export interface IV2MultiShipping {
  shipping_address?: IV2MultiShippingAddress;
  billing_address?: IV2ShippingAddress;
  shipping_carrier_code?: string;
  shipping_method_code?: string;
  extension_attributes?: IV2ShippingExtensionAttributes;
}

export interface IV2SingleShipping {
  shipping_address?: IV2ShippingAddress;
  billing_address?: IV2ShippingAddress;
  shipping_carrier_code?: string;
  shipping_method_code?: string;
  extension_attributes?: IV2ShippingExtensionAttributes;
}

export enum IV2PackageShipping {
  multiShipping = 'multi_shipping',
  central = 'central',
}

export enum IV2Role {
  member = 'member',
  guest = 'guest',
}
