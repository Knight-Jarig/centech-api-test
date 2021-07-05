export const mockCustomerResponse = {
  id: 3633,
  group_id: 1,
  default_shipping: '3779',
  created_at: '2020-08-06 06:10:29',
  updated_at: '2021-02-02 17:13:45',
  created_in: 'CDS TH',
  email: 'wantip@central.tech',
  firstname: 'Wan',
  lastname: 'A',
  store_id: 2,
  website_id: 1,
  addresses: [
    {
      id: 3773,
      customer_id: 3633,
      region: { region_code: 'bkk', region: 'กรุงเทพมหานคร', region_id: 570 },
      region_id: 570,
      country_id: 'TH',
      street: ['n/a'],
      telephone: '0123123312',
      postcode: '10170',
      city: 'n/a',
      firstname: 'waa',
      lastname: 'a',
      custom_attributes: [
        { attribute_code: 'customer_address_type', value: 'shipping', name: 'customer_address_type' },
        { attribute_code: 'address_name', value: 'home', name: 'address_name' },
        { attribute_code: 'address_line', value: '24/34', name: 'address_line' },
        { attribute_code: 'district', value: 'ตลิ่งชัน', name: 'district' },
        { attribute_code: 'district_id', value: '18', name: 'district_id' },
        { attribute_code: 'subdistrict', value: 'ตลิ่งชัน', name: 'subdistrict' },
        { attribute_code: 'subdistrict_id', value: '88', name: 'subdistrict_id' },
        { attribute_code: 'full_tax_type', value: 'personal', name: 'full_tax_type' },
      ],
    },
    {
      id: 3779,
      customer_id: 3633,
      region: { region_code: 'bkk', region: 'กรุงเทพมหานคร', region_id: 570 },
      region_id: 570,
      country_id: 'TH',
      street: ['n/a'],
      telephone: '0123121239',
      postcode: '10170',
      city: 'n/a',
      firstname: 'asdasd',
      lastname: 'wdqwd',
      vat_id: '1839900237332',
      default_shipping: true,
      custom_attributes: [
        { attribute_code: 'customer_address_type', value: 'billing', name: 'customer_address_type' },
        { attribute_code: 'address_line', value: 'adq', name: 'address_line' },
        { attribute_code: 'district', value: 'ตลิ่งชัน', name: 'district' },
        { attribute_code: 'district_id', value: '18', name: 'district_id' },
        { attribute_code: 'subdistrict', value: 'คลองชักพระ', name: 'subdistrict' },
        { attribute_code: 'subdistrict_id', value: '86', name: 'subdistrict_id' },
        { attribute_code: 'full_tax_type', value: 'personal', name: 'full_tax_type' },
      ],
    },
  ],
  disable_auto_group_change: 0,
  extension_attributes: { is_subscribed: true },
  custom_attributes: [
    { attribute_code: 'language', value: 'th', name: 'language' },
    { attribute_code: 'market_open', value: '0', name: 'market_open' },
  ],
};

export const mockReviewPayload1 = {
  nickname: 'wanwan',
  title: 'Great Product!',
  detail: 'deee',
  rating_items: [{ option_id: 20, rating_id: 4 }],
  region_id: 10,
  email: 'wantip@central.tech',
  customer_id: '3633',
  images: [{ path: 'url/test-upload.jpg' }],
};

export const mockReviewPayload2 = {
  nickname: 'guest',
  title: 'Great Product!',
  detail: 'no detail',
  rating_items: [{ option_id: 20, rating_id: 4 }],
  region_id: 10,
  email: 'guest@email.com',
  customer_id: null,
  images: [{ path: 'url/test-upload.jpg' }],
};

export const mockReviewPayload3 = {
  nickname: 'guest',
  title: 'Great Product!',
  detail: 'no_detail',
  rating_items: [{ option_id: 20, rating_id: 4 }],
  region_id: null,
  email: 'guest@gmail.com',
  customer_id: null,
  images: [],
};
