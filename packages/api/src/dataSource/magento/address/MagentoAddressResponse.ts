export interface MagentoAddress {
  id: number;
  customer_id: number;
  firstname: string;
  lastname: string;
  city: string;
  telephone: string;
  country_id: string;
  vat_id?: string;
  company?: string;
  street?: string[];
  region_id: number;
  region: {
    region: string;
    region_code: string;
    region_id: number;
  };
  default_billing?: boolean;
  default_shipping?: boolean;
  postcode: string;
  custom_attributes: {
    attribute_code: string;
    value: string;
    name: string;
  }[];
}
