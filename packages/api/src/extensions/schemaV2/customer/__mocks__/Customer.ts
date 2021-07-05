export const mockCustomerMeAddress = [
  {
    id: 4321,
    customer_id: 1234,
    region: {
      region_code: 'bkk',
      region: 'Bangkok',
      region_id: 570,
    },
    region_id: 570,
    country_id: 'TH',
    street: ['n/a'],
    telephone: '0821112222',
    postcode: '10600',
    city: 'n/a',
    firstname: 'John',
    lastname: 'Doe',
    default_shipping: true,
    custom_attributes: [
      {
        attribute_code: 'customer_address_type',
        value: 'shipping',
        name: 'customer_address_type',
      },
      {
        attribute_code: 'address_name',
        value: 'home',
        name: 'address_name',
      },
      {
        attribute_code: 'address_line',
        value: 'Supalai',
        name: 'address_line',
      },
      {
        attribute_code: 'district',
        value: 'Bangkok Yai',
        name: 'district',
      },
      {
        attribute_code: 'district_id',
        value: '23',
        name: 'district_id',
      },
      {
        attribute_code: 'subdistrict',
        value: 'Wat Tha Phra',
        name: 'subdistrict',
      },
      {
        attribute_code: 'subdistrict_id',
        value: '108',
        name: 'subdistrict_id',
      },
      {
        attribute_code: 'full_tax_type',
        value: 'personal',
        name: 'full_tax_type',
      },
      {
        attribute_code: 'branch_id',
        value: '1',
        name: 'branch_id',
      },
      {
        attribute_code: 'location_name',
        value: 'Parkland',
        name: 'location_name',
      },
      {
        attribute_code: 'latitude',
        value: '1234',
        name: 'latitude',
      },
      {
        attribute_code: 'longitude',
        value: '5678',
        name: 'longitude',
      },
    ],
  },
];

export const mockCustomerMeAddressTransform = [
  {
    addressLine: 'Supalai',
    addressName: 'home',
    branchId: '1',
    building: undefined,
    city: 'n/a',
    company: undefined,
    countryId: 'TH',
    customerAddressType: 'SHIPPING',
    customerId: '1234',
    district: { id: '23', name: 'Bangkok Yai' },
    firstname: 'John',
    fullTaxType: 'PERSONAL',
    id: '4321',
    isDefaultBilling: false,
    isDefaultShipping: true,
    lastname: 'Doe',
    postcode: '10600',
    province: { id: '570', code: 'bkk', name: 'Bangkok' },
    street: ['n/a'],
    subdistrict: { id: '108', name: 'Wat Tha Phra' },
    telephone: '0821112222',
    vatId: undefined,
    locationName: 'Parkland',
    latitude: '1234',
    longitude: '5678',
  },
];

export const mockCustomerMe = {
  id: 1234,
  group_id: 1,
  default_shipping: '3989',
  created_at: '2021-02-01 04:34:38',
  updated_at: '2021-02-24 06:06:19',
  created_in: 'CDS TH',
  email: 'johnd@central.tech',
  firstname: 'John',
  lastname: 'Doe',
  store_id: 2,
  website_id: 1,
  addresses: [],
  disable_auto_group_change: 0,
  extension_attributes: {
    is_subscribed: false,
  },
  custom_attributes: [
    {
      attribute_code: 'phone',
      value: '0812223333',
      name: 'phone',
    },
    {
      attribute_code: 'language',
      value: 'th',
      name: 'language',
    },
    {
      attribute_code: 'market_open',
      value: '0',
      name: 'market_open',
    },
    {
      attribute_code: 'profile_image_s3_url',
      value: '',
      name: 'profile_image_s3_url',
    },
  ],
};

export const mockCustomerMeTransform = {
  addresses: [],
  createdAt: '2021-02-01 04:34:38',
  createdIn: 'CDS TH',
  defaultBilling: undefined,
  defaultShipping: '3989',
  disableAutoGroupChange: 0,
  dob: undefined,
  email: 'johnd@central.tech',
  firstname: 'John',
  gender: null,
  groupId: '1',
  id: '1234',
  isSubscribed: false,
  language: 'th',
  lastname: 'Doe',
  marketOpen: '0',
  message: undefined,
  needReacceptConsents: undefined,
  phone: '0812223333',
  profileImage: '',
  storeId: '2',
  t1cApiVersion: '',
  t1cNo: '',
  t1cPhone: '',
  taxId: undefined,
  updatedAt: '2021-02-24 06:06:19',
  websiteId: '1',
};

export const mockUpdateProfileById = {
  id: 2783,
  group_id: 1,
  default_billing: '0',
  default_shipping: '4202',
  created_at: '2020-05-28 07:36:55',
  updated_at: '2021-05-19 07:58:58',
  created_in: 'CDS EN',
  dob: '1993-07-02',
  email: 'vanth3@smartosc.com',
  firstname: 'Van',
  lastname: 'La',
  gender: 2,
  store_id: 1,
  website_id: 1,
  addresses: [],
  disable_auto_group_change: 0,
  extension_attributes: {
    is_subscribed: false,
  },
  custom_attributes: [
    {
      attribute_code: 'phone',
      value: '099999999',
      name: 'phone',
    },
    {
      attribute_code: 't1c_number',
      value: '2011010003436769',
      name: 't1c_number',
    },
    {
      attribute_code: 'language',
      value: 'th',
      name: 'language',
    },
    {
      attribute_code: 'profile_image_s3_url',
      value: 'https://cds-stg-profile-image.s3.ap-southeast-1.amazonaws.com/customer_2783_profile_image',
      name: 'profile_image_s3_url',
    },
    {
      attribute_code: 't1_api_version',
      value: '2',
      name: 't1_api_version',
    },
    {
      attribute_code: 'market_open',
      value: '0',
      name: 'market_open',
    },
  ],
};

export const mockResponseUpdateT1 = {
  id: '2783',
  groupId: '1',
  defaultShipping: '4202',
  createdAt: '2020-05-28 07:36:55',
  updatedAt: '2021-05-19 07:58:58',
  createdIn: 'CDS EN',
  email: 'vanth3@smartosc.com',
  firstname: 'Van',
  lastname: 'La',
  message: undefined,
  needReacceptConsents: undefined,
  storeId: '1',
  websiteId: '1',
  addresses: [],
  disableAutoGroupChange: 0,
  isSubscribed: false,
  phone: '099999999',
  profileImage: 'https://cds-stg-profile-image.s3.ap-southeast-1.amazonaws.com/customer_2783_profile_image',
  t1cNo: '2011010003436769',
  t1cPhone: '',
  t1cApiVersion: '2',
  taxId: undefined,
  language: 'th',
  marketOpen: '0',
  defaultBilling: '0',
  dob: '1993-07-02',
  gender: 'FEMALE',
};
