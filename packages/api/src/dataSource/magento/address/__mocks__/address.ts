import {
  customerAddressTypeMap,
  fullTaxTypeMap,
  pickAddressCustomAttributes,
} from '../request/AddressCustomAttributes';

export const address = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  street: [''],
  city: 'กรุงเทพมหานคร',
  telephone: '0812223333',
  postcode: '10200',
  country_id: 'TH',
  customer_id: 2222,
  region_id: 3333,
  region: 'พระนคร',
  company: 'central',
  vat_id: '7',
  default_billing: true,
  default_shipping: true,
  custom_attributes: pickAddressCustomAttributes(null, {
    building: 'string',
    address_name: 'string',
    address_line: 'string',
    district: 'string',
    district_id: 'string',
    subdistrict: 'string',
    subdistrict_id: 'string',
    customer_address_type: customerAddressTypeMap.SHIPPING,
    branch_id: 'string',
    full_tax_type: fullTaxTypeMap.PERSONAL,
  }),
  province: {
    id: 3333,
  },
};
