export const mockDataEmpty = {
  currentPage: undefined,
  data: [],
  from: undefined,
  lastPage: undefined,
  perPage: undefined,
  to: undefined,
  total: undefined,
};

export const mockDataNull = {
  currentPage: undefined,
  data: null,
  from: undefined,
  lastPage: undefined,
  perPage: undefined,
  to: undefined,
  total: undefined,
};

export const mockResponseDataNull = {
  currentPage: undefined,
  data: [],
  from: undefined,
  lastPage: undefined,
  perPage: undefined,
  to: undefined,
  total: undefined,
};

export const mockDataArray = {
  currentPage: undefined,
  data: [
    {
      voucher_code: 'ABC27AQIPTA1F',
      voucher_key: '4CMLQM7ZC1UJGZB0I',
      state: 'issued',
      reserved_expires_at: null,
      voucher_starts_at: '2020-05-12T04:35:25.345Z',
      voucher_expires_at: '2021-05-30T11:56:10.183Z',
      issued_at: '2020-05-12T04:35:25.345Z',
      reward: {
        id: 23,
        reward_type: 'voucher',
        status: 'active',
        name: 'TEST',
        display_name: '',
        description: '<p>ทดสอบ - description</p>',
        short_description: 'ทดสอบ short description',
        terms_condition: 'terms_conditions_th',
        coupon_condition_description: '',
        image: 'https://asia-public.foodpanda.com/marketing/production/th/images/nl/partnerships/2018/The1%20Logo.jpg',
        tags: [],
        category: [1, 2],
        voucher_code_type: 'single',
      },
    },
  ],
  total: 2,
  per_page: 25,
  current_page: 1,
  last_page: 1,
  from: 1,
  to: 2,
};

export const mockResponseDataArray = {
  data: [
    {
      issuedAt: mockDataArray.data[0].issued_at,
      reservedExpiresAt: mockDataArray.data[0].reserved_expires_at,
      state: mockDataArray.data[0].state,
      voucherCode: mockDataArray.data[0].voucher_code,
      voucherExpiresAt: mockDataArray.data[0].voucher_expires_at,
      voucherKey: mockDataArray.data[0].voucher_key,
      voucherStartsAt: mockDataArray.data[0].voucher_starts_at,
      reward: {
        id: mockDataArray.data[0].reward.id,
        category: mockDataArray.data[0].reward.category,
        rewardType: mockDataArray.data[0].reward.reward_type,
        displayName: mockDataArray.data[0].reward.display_name,
        shortDescription: mockDataArray.data[0].reward.short_description,
        description: mockDataArray.data[0].reward.description,
        name: mockDataArray.data[0].reward.name,
        termsCondition: mockDataArray.data[0].reward.terms_condition,
        couponConditionDescription: mockDataArray.data[0].reward.coupon_condition_description,
        voucherCodeType: mockDataArray.data[0].reward.voucher_code_type,
        image: mockDataArray.data[0].reward.image,
        voucherCustomerLimit: undefined,
        voucherQuota: undefined,
        isRequiredCitizenId: undefined,
        tags:[],
        status: mockDataArray.data[0].reward.status,

      },
    },
  ],
  currentPage: mockDataArray.current_page,
  from: mockDataArray.from,
  lastPage: mockDataArray.last_page,
  perPage: mockDataArray.per_page,
  to: mockDataArray.to,
  total: mockDataArray.total,
};
