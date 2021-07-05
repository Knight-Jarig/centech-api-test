import { IAddressType, ITaxType } from '../../../types/graphql';

export interface MDCGetItems {
  items: MDCItems[];
}

export interface MDCItems {
  id: number;
  group_id: number;
  default_billing: string;
  default_shipping: string;
  created_at: string;
  updated_at: string;
  created_in: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: number;
  store_id: number;
  website_id: number;
  addresses: MDCItemsAddresses[];
  disable_auto_group_change: number;
  custom_attributes: MDCItemsCustomAttributes[];
}

export interface MDCItemsCustomAttributes {
  attribute_code: string;
  value: string;
  name: string;
}

export interface MDCItemsAddresses {
  id: string;
  firstname: string;
  lastname: string;
  telephone: string;
  building: string;
  address_line: string;
  subdistrict: MDCItemsAddressesPlace;
  district: MDCItemsAddressesPlace;
  province: MDCItemsAddressesPlace;
  postcode: string;
  address_name: string;
  customer_address_type: IAddressType;
  full_tax_type: ITaxType;
  vat_id: string;
  company: string;
  branch_id: string;
  country_id: string;
  is_default_billing: boolean;
  is_default_shipping: boolean;
  city: string;
}

export interface MDCItemsAddressesPlace {
  id: string;
  name: string;
}

export interface T1AccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface T1Card {
  card_no: string;
  card_type: string;
  parent_member_name: string;
  expiry_points_this_year: number;
  points_balance: number;
  authority_type: string;
}

export interface T1RedeemProfile {
  first_name: string;
  last_name: string;
  member_language_preference: string;
  cards: T1Card[];
  employee_id: string;
  image_profile: string;
  user_account_id: string;
  account_type: string;
  //
  conversion_rate: number;
  min_allowed_points: number;
  max_allowed_points: number;
}

export interface T1LoginByMDCCustomer {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  website_id: number;
}

export interface T1LoginByMDCResponse {
  token: string;
  t1c_number?: string;
  customer?: T1LoginByMDCCustomer;
}
