export const mockGetT1Profile = {
  data: {
    accountType: 'member',
    address: [
      {
        addressType: 'Contact Address',
        typeOfHousing: 'คอนโดมิเนียม',
        homeNo: '223/43',
        villageOrBuilding: 'Water Fall Village and Spa',
        floor: '1',
        moo: '45',
        soi: '45',
        yak: '45',
        road: 'Miracle Road',
        country: 'Thailand',
        subDistrict: 'บ้านพานถม',
        postalCode: '10200',
        district: 'พระนคร',
        city: 'กรุงเทพมหานคร',
      },
    ],
    cards: [
      {
        cardNo: '2011010003925447',
        pointsBalance: 432284,
        pointsExpiryThisYear: 0,
      },
    ],
    dateOfBirth: '2010-02',
    employeeBUShortCode: '',
    employeeID: '',
    firstName: {
      en: 'TUTA',
      th: 'ชื่อ-TH',
    },
    gender: 'ชาย / Male',
    isStaff: 'N',
    lastName: {
      en: 'LASTNAME-EN',
      th: 'นามสกุล-TH',
    },
    memberLanguagePref: 'TH',
    status: 'Active',
    style: [],
    title: {
      en: 'Khun',
      th: 'คุณ',
    },
    svoc: {},
    svocError: 'Code: 210301, Description: member_number not found, Name: datainsights_service',
    segments: [
      {
        segmentLevelID: '1',
        segmentLevel: 'VIP',
        segmentLevelLongDesc: 'The 1 VIP',
        endDate: '30062100',
      },
    ],
    imageProfile:
      'https://d28ry3rbm7w4pe.cloudfront.net/profile_uat/cfcb4513829a2035ce353b0302fec77cbb93238168994e14a52e7fae5c041fd8?t=1614679229386',
    consentDate: '14052020_18:12:23:000',
    userAccountID: 'b92f31df-17f3-40c8-8078-b2f18fc11797',
    onlineEmail: {
      value: 'm.ekkramthesmalldeepbluecloud@gmail.com',
      verified: true,
    },
    onlineMobile: {
      country: '66',
      value: '922002081',
      verified: true,
    },
    consentFlag: 'Y',
    consentVersion: '1.1',
    dcsConsentVersion: '1.1',
  },
};

export const mockGetMdcId = {
  items: [
    {
      id: 3655,
      group_id: 1,
      default_billing: '0',
      default_shipping: '0',
      created_at: '2020-09-23 10:46:13',
      updated_at: '2021-03-02 08:55:26',
      created_in: 'CDS EN',
      email: 'minhvb@smartosc.com',
      firstname: 'Minh',
      lastname: 'Vu Binh',
      gender: 0,
      store_id: 1,
      website_id: 1,
      addresses: [],
      disable_auto_group_change: 0,
      custom_attributes: [
        {
          attribute_code: 't1c_number',
          value: '2011010003925447',
          name: 't1c_number',
        },
        {
          attribute_code: 't1_api_version',
          value: '2',
          name: 't1_api_version',
        },
        {
          attribute_code: 'language',
          value: 'th',
          name: 'language',
        },
        {
          attribute_code: 'reward_update_notification',
          value: '0',
          name: 'reward_update_notification',
        },
        {
          attribute_code: 'market_open',
          value: '0',
          name: 'market_open',
        },
      ],
    },
  ],
};

export const mockGetCustomer = {
  id: 3655,
  group_id: 1,
  default_billing: '0',
  default_shipping: '0',
  created_at: '2020-09-23 10:46:13',
  updated_at: '2021-03-02 08:55:26',
  created_in: 'CDS EN',
  email: 'minhvb@smartosc.com',
  firstname: 'Minh',
  lastname: 'Vu Binh',
  gender: 0,
  store_id: 1,
  website_id: 1,
  addresses: [],
  disable_auto_group_change: 0,
  extension_attributes: {
    is_subscribed: false,
  },
  custom_attributes: [
    {
      attribute_code: 't1c_number',
      value: '2011010003925447',
      name: 't1c_number',
    },
    {
      attribute_code: 'language',
      value: 'th',
      name: 'language',
    },
    {
      attribute_code: 't1_api_version',
      value: '2',
      name: 't1_api_version',
    },
    {
      attribute_code: 'reward_update_notification',
      value: '0',
      name: 'reward_update_notification',
    },
    {
      attribute_code: 'market_open',
      value: '0',
      name: 'market_open',
    },
  ],
};

export const mockUpdateCustomer = {
  id: 3655,
  group_id: 1,
  default_billing: '0',
  default_shipping: '0',
  created_at: '2020-09-23 10:46:13',
  updated_at: '2021-03-02 09:55:26',
  created_in: 'CDS EN',
  email: 'minhvb@smartosc.com',
  firstname: 'Minh2',
  lastname: 'Vu Binh',
  gender: 0,
  store_id: 1,
  website_id: 1,
  addresses: [],
  disable_auto_group_change: 0,
  extension_attributes: {
    is_subscribed: false,
  },
  custom_attributes: [
    {
      attribute_code: 't1c_number',
      value: '2011010003925447',
      name: 't1c_number',
    },
    {
      attribute_code: 'language',
      value: 'th',
      name: 'language',
    },
    {
      attribute_code: 't1_api_version',
      value: '2',
      name: 't1_api_version',
    },
    {
      attribute_code: 'reward_update_notification',
      value: '0',
      name: 'reward_update_notification',
    },
    {
      attribute_code: 'market_open',
      value: '0',
      name: 'market_open',
    },
  ],
};

export const mockLoginByMDC = {
  token: '12345',
  customer: {
    id: 3655,
    email: 'minhvb@smartosc.com',
    firstname: 'Minh2',
    lastname: 'Vu Binh',
    website_id: 1,
  },
  t1c_number: '2011010003925447',
};
