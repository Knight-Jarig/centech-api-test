export interface MDCGetCustomer {
  id: number;
  group_id: number;
  default_shipping: string;
  created_at: string;
  updated_at: string;
  created_in: string;
  email: string;
  firstname: string;
  lastname: string;
  store_id: number;
  website_id: number;
  addresses: MDCGetCustomerAddresses[];
  disable_auto_group_change: number;
  extension_attributes: MDCGetCustomerExtensionAttributes;
  custom_attributes: MDCGetCustomerCustomAttributes[];
  needReacceptConsents?: boolean;
  default_billing?: string;
  dob?: string;
  gender?: number;
  message?: string;
  taxvat?: number;
}

export interface MDCGetCustomerExtensionAttributes {
  is_subscribed: boolean;
}

export interface MDCGetCustomerCustomAttributes {
  attribute_code: string;
  value: string;
  name: string;
}

export interface MDCGetCustomerAddresses {
  id: number;
  customer_id: number;
  region: MDCGetCustomerAddressesRegion;
  region_id: number;
  country_id: string;
  street: string[];
  telephone?: string;
  postcode: string;
  city: string;
  firstname: string;
  lastname: string;
  default_shipping: boolean;
  custom_attributes: MDCGetCustomerCustomAttributes[];
  vat_id?: number;
  company?: string;
  default_billing?: boolean;
}

export interface MDCGetCustomerAddressesRegion {
  region_code: string;
  region: string;
  region_id: number;
}

export interface V2T1DataFormCustomerCustomAttributes {
  attribute_code: string;
  value: string;
}

export interface V2T1DataFormCustomer {
  email: string;
  firstname: string;
  lastname: string;
  website_id: number;
  custom_attributes: V2T1DataFormCustomerCustomAttributes[];
}

export interface V2T1DataFormCustomerById extends V2T1DataFormCustomer {
  id: string;
}

export interface V2T1DataForm {
  customer: V2T1DataFormCustomer;
}

export interface V2UpdateCustomerT1Input {
  customerProfile: V2UpdateCustomerT1InputCustomerProfile;
  t1cNumber: string;
  t1ApiVersion: string;
}

export interface V2UpdateCustomerT1InputById extends V2UpdateCustomerT1Input {
  id: string;
}

export interface V2UpdateCustomerT1InputCustomerProfile {
  email: string;
  firstname: string;
  lastname: string;
  websiteId: string;
}
