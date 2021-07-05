import { __, evolve, pick, pipe, prop, propOr } from 'ramda';
import { IPlace } from '../../../../types/graphql';

export interface AddressCustomAttributes {
  building?: string;
  address_name?: string;
  address_line: string;
  district: string;
  district_id: string;
  subdistrict: string;
  subdistrict_id: string;
  customer_address_type: 'shipping' | 'billing';
  branch_id?: string;
  full_tax_type?: 'personal' | 'company';
}

export function pickAddressCustomAttributes(_, obj) {
  return Object.assign(
    propOr({}, 'custom_attributes', obj),
    pick(['building', 'address_name', 'address_line', 'branch_id'])(obj),
    pipe(pick(['customer_address_type', 'full_tax_type']), evolve(transformEnum))(obj),
    mapPlace('district', obj.district),
    mapPlace('subdistrict', obj.subdistrict),
  );
}

export function mapPlace(key: string, place: IPlace): Record<string, any> {
  if (!place) return {};

  const { id, name } = place;

  return {
    [`${key}_id`]: id,
    [key]: name,
  };
}

export const customerAddressTypeMap = {
  SHIPPING: 'shipping',
  BILLING: 'billing',
};

export const fullTaxTypeMap = {
  PERSONAL: 'personal',
  COMPANY: 'company',
};

export const transformEnum = {
  customer_address_type: prop(__, customerAddressTypeMap),
  full_tax_type: prop(__, fullTaxTypeMap),
};
