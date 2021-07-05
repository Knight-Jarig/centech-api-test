const mockPayloadTransformSingleShipping = {
  billing_address: {
    city: 'Bangkok',
    country_id: 'TH',
    custom_attributes: {
      address_line: 'address_line',
    },
    default_shipping: true,
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    postcode: '10120',
    region_id: '610',
    same_as_billing: 1,
    street: ['n/a'],
    telephone: '06622134567',
  },
  shipping_address: {
    city: 'Bangkok',
    country_id: 'TH',
    custom_attributes: {
      address_line: 'address_line',
    },
    default_shipping: true,
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    postcode: '10120',
    region_id: '610',
    same_as_billing: 1,
    street: ['n/a'],
    telephone: '06622134567',
  },
  shipping_carrier_code: 'cds',
  shipping_method_code: 'standard',
};

const mockPayloadTransformMultiShipping = {
  billing_address: {
    city: 'Bangkok',
    country_id: 'TH',
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      customer_address_type: 'delivery',
      district: 'Bangna',
      district_id: '23',
      remark: 'Test ja',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
    },
    default_shipping: true,
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    postcode: '10120',
    region_id: '610',
    street: ['n/a'],
    telephone: '06622134567',
  },
  extension_attributes: {
    pickup_store: {
      pickup_store_id: '10',
      receiver_name: 'name',
      receiver_phone: '0909123456',
    },
    stock_ids_request: [
      {
        line_id: '144525',
        line_number: '1',
        stock_id: '1',
      },
      {
        line_id: '144525',
        line_number: '2',
        stock_id: '2',
      },
    ],
  },
  shipping_address: {
    city: 'Bangkok',
    country_id: 'TH',
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      customer_address_type: 'delivery',
      district: 'Bangna',
      district_id: '23',
      remark: 'Test ja',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
    },
    default_shipping: true,
    extension_attributes: {
      extra_addresses: [
        {
          city: 'Bangkok',
          country_id: 'TH',
          custom_attributes: {
            address_line: '6/115 Kosumrumjai',
            customer_address_type: 'delivery',
            district: 'Bangna',
            district_id: '23',
            remark: 'Test ja',
            subdistrict: 'Bangna',
            subdistrict_id: '152',
          },
          default_shipping: true,
          extension_attributes: {
            lines: [
              {
                extension_attributes: {
                  shipping_information: {
                    shipping_carrier_code: 'cds',
                    shipping_method_code: 'standard',
                  },
                },
                line_id: '144525',
                line_number: '2',
              },
            ],
          },
          firstname: 'Jinjutha',
          lastname: 'Tothup',
          postcode: '10120',
          region_id: '610',
          street: ['n/a'],
          telephone: '06622134567',
        },
      ],
      lines: [
        {
          extension_attributes: {
            shipping_information: {
              shipping_carrier_code: 'storepickup',
              shipping_method_code: 'ispu',
            },
          },
          line_id: '144525',
          line_number: '1',
        },
      ],
    },
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    postcode: '10120',
    region_id: '610',
    street: ['n/a'],
    telephone: '06622134567',
  },
  shipping_carrier_code: 'central',
  shipping_method_code: 'multi_shipping',
};

const mockPayloadTransformMultiShippingNoneSubPackage = {
  billing_address: {
    city: 'Bangkok',
    country_id: 'TH',
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      customer_address_type: 'delivery',
      district: 'Bangna',
      district_id: '23',
      remark: 'Test ja',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
    },
    default_shipping: true,
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    postcode: '10120',
    region_id: '610',
    street: ['n/a'],
    telephone: '06622134567',
  },
  extension_attributes: {
    pickup_store: {
      pickup_store_id: '10',
      receiver_name: 'name',
      receiver_phone: '0909123456',
    },
  },
  shipping_address: {
    city: 'Bangkok',
    country_id: 'TH',
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      customer_address_type: 'delivery',
      district: 'Bangna',
      district_id: '23',
      remark: 'Test ja',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
    },
    default_shipping: true,
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    postcode: '10120',
    region_id: '610',
    street: ['n/a'],
    telephone: '06622134567',
  },
  shipping_carrier_code: 'storepickup',
  shipping_method_code: 'ispu',
};

const inputSingleShipping = {
  shipping_address: {
    region_id: '610',
    country_id: 'TH',
    street: ['n/a'],
    telephone: '06622134567',
    postcode: '10120',
    city: 'Bangkok',
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    default_shipping: true,
    same_as_billing: 1,
    custom_attributes: {
      address_line: 'address_line',
    },
  },
  billing_address: {
    region_id: '610',
    country_id: 'TH',
    street: ['n/a'],
    telephone: '06622134567',
    postcode: '10120',
    city: 'Bangkok',
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    default_shipping: true,
    same_as_billing: 1,
    custom_attributes: {
      address_line: 'address_line',
    },
  },
  carrier_code: 'cds',
  method_code: 'standard',
};

const inputMultiShipping = {
  package: {
    line_items: [
      {
        line_id: '144525',
        line_number: '1',
      },
    ],
    stock_id: '1',
    carrier_code: 'storepickup',
    method_code: 'ispu',
    sub_package: {
      line_items: [
        {
          line_id: '144525',
          line_number: '2',
        },
      ],
      stock_id: '2',
      carrier_code: 'cds',
      method_code: 'standard',
    },
  },
  shipping_address: {
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    city: 'Bangkok',
    telephone: '06622134567',
    country_id: 'TH',
    street: ['n/a'],
    region_id: '610',
    postcode: '10120',
    default_shipping: true,
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      district: 'Bangna',
      district_id: '23',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
      remark: 'Test ja',
      customer_address_type: 'delivery',
    },
  },
  billing_address: {
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    city: 'Bangkok',
    telephone: '06622134567',
    country_id: 'TH',
    street: ['n/a'],
    region_id: '610',
    postcode: '10120',
    default_shipping: true,
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      district: 'Bangna',
      district_id: '23',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
      remark: 'Test ja',
      customer_address_type: 'delivery',
    },
  },
  extension_attributes: {
    pickup_store: {
      pickup_store_id: '10',
      receiver_name: 'name',
      receiver_phone: '0909123456',
    },
  },
};

const inputMultiShippingNoneSubPackage = {
  package: {
    line_items: [
      {
        line_id: '144525',
        line_number: '1',
      },
    ],
    stock_id: '1',
    carrier_code: 'storepickup',
    method_code: 'ispu',
  },
  shipping_address: {
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    city: 'Bangkok',
    telephone: '06622134567',
    country_id: 'TH',
    street: ['n/a'],
    region_id: '610',
    postcode: '10120',
    default_shipping: true,
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      district: 'Bangna',
      district_id: '23',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
      remark: 'Test ja',
      customer_address_type: 'delivery',
    },
  },
  billing_address: {
    firstname: 'Jinjutha',
    lastname: 'Tothup',
    city: 'Bangkok',
    telephone: '06622134567',
    country_id: 'TH',
    street: ['n/a'],
    region_id: '610',
    postcode: '10120',
    default_shipping: true,
    custom_attributes: {
      address_line: '6/115 Kosumrumjai',
      district: 'Bangna',
      district_id: '23',
      subdistrict: 'Bangna',
      subdistrict_id: '152',
      remark: 'Test ja',
      customer_address_type: 'delivery',
    },
  },
  extension_attributes: {
    pickup_store: {
      pickup_store_id: '10',
      receiver_name: 'name',
      receiver_phone: '0909123456',
    },
  },
};

const mockPackageOptionsMDCResult1 = [
  {
    product: [
      {
        product_id: 4399,
        item_id: 145594,
        sku: 'SKUFORMEMBER',
        qty_available_current_sku: 2,
        line_items: [
          {
            entity_id: '5890',
            line_id: '145594',
            line_number: '1',
          },
          {
            entity_id: '5891',
            line_id: '145594',
            line_number: '2',
          },
        ],
      },
    ],
    sub_package: [
      {
        product: [
          {
            product_id: 4399,
            item_id: 145594,
            sku: 'SKUFORMEMBER',
            qty_available_current_sku: 2,
            line_items: [
              {
                entity_id: '5890',
                line_id: '145594',
                line_number: '1',
              },
              {
                entity_id: '5891',
                line_id: '145594',
                line_number: '2',
              },
            ],
          },
        ],
        delivery_method: 'storepickup_ispu',
        stock_id: 2,
        is_package_available: true,
        has_sub_package: true,
        qty_data: {
          total_qty_available_in_package: 2,
          total_qty_for_current_package: 2,
          total_qty_ordered_in_cart: 2,
        },
        method_data: {
          carrier_title: '2 Hour Pickup',
          method_title: '2 Hour Pickup',
          carrier_code: 'storepickup',
          method_code: 'ispu',
          method_labels: {
            label: 'today_pickup',
            date_time: '2020-08-28 13:59:58',
          },
        },
      },
    ],
    delivery_method: 'storepickup_ispu',
    stock_id: 2,
    is_package_available: true,
    has_sub_package: true,
    qty_data: {
      total_qty_available_in_package: 2,
      total_qty_for_current_package: 2,
      total_qty_ordered_in_cart: 2,
    },
    method_data: {
      carrier_title: '2 Hour Pickup',
      method_title: '2 Hour Pickup',
      carrier_code: 'storepickup',
      method_code: 'ispu',
      method_labels: {
        label: 'today_pickup',
        date_time: '2020-08-28 13:59:58',
      },
    },
  },
];

const mockPackageOptionsMDCResult2 = [
  {
    product: [
      {
        product_id: 4398,
        item_id: 145595,
        sku: 'SKUFORGUEST',
        qty_available_current_sku: 2,
        line_items: [
          {
            entity_id: '5890',
            line_id: '145595',
            line_number: '1',
          },
          {
            entity_id: '5891',
            line_id: '145595',
            line_number: '2',
          },
        ],
      },
    ],
    sub_package: [
      {
        product: [
          {
            product_id: 4398,
            item_id: 145595,
            sku: 'SKUFORGUEST',
            qty_available_current_sku: 2,
            line_items: [
              {
                entity_id: '5890',
                line_id: '145595',
                line_number: '1',
              },
              {
                entity_id: '5891',
                line_id: '145595',
                line_number: '2',
              },
            ],
          },
        ],
        delivery_method: 'storepickup_ispu',
        stock_id: 2,
        is_package_available: true,
        has_sub_package: true,
        qty_data: {
          total_qty_available_in_package: 2,
          total_qty_for_current_package: 2,
          total_qty_ordered_in_cart: 2,
        },
        method_data: {
          carrier_title: '2 Hour Pickup',
          method_title: '2 Hour Pickup',
          carrier_code: 'storepickup',
          method_code: 'ispu',
          method_labels: {
            label: 'today_pickup',
            date_time: '2020-08-28 13:59:58',
          },
        },
      },
    ],
    delivery_method: 'storepickup_ispu',
    stock_id: 2,
    is_package_available: true,
    has_sub_package: true,
    qty_data: {
      total_qty_available_in_package: 2,
      total_qty_for_current_package: 2,
      total_qty_ordered_in_cart: 2,
    },
    method_data: {
      carrier_title: '2 Hour Pickup',
      method_title: '2 Hour Pickup',
      carrier_code: 'storepickup',
      method_code: 'ispu',
      method_labels: {
        label: 'today_pickup',
        date_time: '2020-08-28 13:59:58',
      },
    },
  },
];

const mockPackageOptionsMDCResult3 = [
  {
    product: [
      {
        product_id: 4399,
        item_id: 145594,
        sku: 'SKUFORMEMBER',
        qty_available_current_sku: 2,
        line_items: [
          {
            entity_id: '5890',
            line_id: '145594',
            line_number: '1',
          },
          {
            entity_id: '5891',
            line_id: '145594',
            line_number: '2',
          },
        ],
      },
    ],
    delivery_method: 'storepickup_ispu',
    stock_id: 2,
    is_package_available: true,
    has_sub_package: false,
    qty_data: {
      total_qty_available_in_package: 2,
      total_qty_for_current_package: 2,
      total_qty_ordered_in_cart: 2,
    },
    method_data: {
      carrier_title: '2 Hour Pickup',
      method_title: '2 Hour Pickup',
      carrier_code: 'storepickup',
      method_code: 'ispu',
      method_labels: {
        label: 'today_pickup',
        date_time: '2020-08-28 13:59:58',
      },
    },
  },
];

const mockPackageOptionsMDCResult4 = [
  {
    product: [
      {
        product_id: 4398,
        item_id: 145595,
        sku: 'SKUFORGUEST',
        qty_available_current_sku: 2,
        line_items: [
          {
            entity_id: '5890',
            line_id: '145595',
            line_number: '1',
          },
          {
            entity_id: '5891',
            line_id: '145595',
            line_number: '2',
          },
        ],
      },
    ],
    delivery_method: 'storepickup_ispu',
    stock_id: 2,
    is_package_available: true,
    has_sub_package: false,
    qty_data: {
      total_qty_available_in_package: 2,
      total_qty_for_current_package: 2,
      total_qty_ordered_in_cart: 2,
    },
    method_data: {
      carrier_title: '2 Hour Pickup',
      method_title: '2 Hour Pickup',
      carrier_code: 'storepickup',
      method_code: 'ispu',
      method_labels: {
        label: 'today_pickup',
        date_time: '2020-08-28 13:59:58',
      },
    },
  },
];

const mockCartByIDMDCResult1 = {
  customer: {
    id: '2',
  },
};

const mockCartByIDMDCResult2 = {
  customer: {
    id: '1',
  },
};

const mockCustomerMDCResult = { id: '1' };

export {
  mockPayloadTransformSingleShipping,
  mockPayloadTransformMultiShipping,
  mockPayloadTransformMultiShippingNoneSubPackage,
  inputSingleShipping,
  inputMultiShipping,
  inputMultiShippingNoneSubPackage,
  mockPackageOptionsMDCResult1,
  mockPackageOptionsMDCResult2,
  mockPackageOptionsMDCResult3,
  mockPackageOptionsMDCResult4,
  mockCartByIDMDCResult1,
  mockCartByIDMDCResult2,
  mockCustomerMDCResult,
};

export const inputSetValidatePin = {
  latitude: '13.674875',
  longitude: '100.633990',
};

export const inputGetEstimateShippingMethods1 = {
  countryId: 'TH',
  postcode: '10100',
  regionId: 570,
};

export const inputGetEstimateShippingMethods2 = {
  countryId: 'TH',
  postcode: '10100',
  regionId: 570,
};

export const expectInputGetEstimateShippingMethods1 = {
  postcode: '10100',
  country_id: 'TH',
  region_id: 570,
};

export const expectInputGetEstimateShippingMethods2 = {
  postcode: '10100',
  country_id: 'TH',
  region_id: 570,
};

export const mockEstimateShippingMethodsV4MDCResult = [
  {
    method: 'จัดส่งที่บ้าน',
    method_code: 'home_delivery',
    shipping_method: [
      {
        caption: '(ในบางพื้นที่)',
        carrier_code: 'cds',
        method_code: 'same_day',
        carrier_title: 'Central',
        method_title: 'จัดส่งภายในวัน',
        amount: 150,
        base_amount: 150,
        available: true,
        extension_attributes: {
          delivery_time_label: {
            method_type: null,
            method_label: 'ภายในวัน',
            min_lead_time: null,
            max_lead_time: null,
            time_label: '(8:00 - 20:00)',
          },
        },
        error_message: '',
        price_excl_tax: 150,
        price_incl_tax: 150,
      },
      {
        caption: '(ในบางพื้นที่)',
        carrier_code: 'cds',
        method_code: 'next_day',
        carrier_title: 'Central',
        method_title: 'จัดส่งวันถัดไป',
        amount: 150,
        base_amount: 150,
        available: true,
        extension_attributes: {
          delivery_time_label: {
            method_type: null,
            method_label: 'วันถัดไป',
            min_lead_time: null,
            max_lead_time: null,
            time_label: '(14:00 - 20:00)',
          },
        },
        error_message: '',
        price_excl_tax: 150,
        price_incl_tax: 150,
      },
      {
        caption: '(ในบางพื้นที่)',
        carrier_code: 'grab',
        method_code: 'ship_from_store',
        carrier_title: 'Central',
        method_title: 'ส่งด่วนใน 3 ชม.',
        amount: 15,
        base_amount: 15,
        available: true,
        extension_attributes: {
          delivery_time_label: {
            method_type: 'today_delivery',
            method_label: null,
            min_lead_time: null,
            max_lead_time: '2021-01-05 16:27:08',
            time_label: null,
          },
        },
        error_message: '',
        price_excl_tax: 15,
        price_incl_tax: 15,
      },
    ],
    is_allow_split_order: true,
  },
  {
    method: 'รับสินค้าที่สาขา',
    method_code: 'click_collect',
    shipping_method: [
      {
        caption: '(ในบางพื้นที่)',
        carrier_code: 'storepickup',
        method_code: 'ispu',
        carrier_title: 'รับใน 1 ชม.',
        method_title: 'รับใน 1 ชม.',
        amount: 0,
        base_amount: 0,
        available: true,
        error_message: '',
        price_excl_tax: 0,
        price_incl_tax: 0,
      },
      {
        caption: '(2 สาขา)',
        carrier_code: 'pickupatstore',
        method_code: 'pickupatstore',
        carrier_title: 'รับเวลาปกติ',
        method_title: 'รับเวลาปกติ',
        amount: 0,
        base_amount: 0,
        available: true,
        extension_attributes: {
          gmap_api_key: 'AIzaSyBuIWvRUGec3YFb-_qH6KFGw-i0JqssvkA',
          pickup_stores_location: [
            {
              id: 1,
              name: 'เซ็นทรัลชิดลม',
              store_code: 'CDS_CC_10102',
              is_active: true,
              address: {
                street_number: null,
                building: null,
                soi: null,
                street: '1027 ถนนเพลินจิต1027',
                district: 'ปทุมวัน',
                district_id: 35,
                sub_district: 'ลุมพินี',
                sub_district_id: 142,
                region: 'กรุงเทพมหานคร',
                region_id: 570,
                post_code: '10330',
                contact_number: '0279377777',
                country_code: 'TH',
                city: 'กรุงเทพมหานคร',
                latitude: '13.7445741',
                longitude: '100.5423063',
              },
              extension_attributes: {
                allocated_capacity: {
                  allocated_capacity: 13,
                },
                opening_hours: [
                  {
                    day: 'Monday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Tuesday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Wednesday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Thursday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Friday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Saturday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Sunday',
                    open: '10:00',
                    close: '22:00',
                  },
                ],
                image:
                  'https://cds-staging-content-for-mobile-app.s3-ap-southeast-1.amazonaws.com/media/store/Chidlom-building.jpg',
                position: 0,
                allow_pick_at_store: true,
                display_as_store_information: false,
                store_pickup: {
                  store_id: 1,
                  stock_id: 2,
                  allow_ispu: true,
                  allow_sts: null,
                },
                store_delivery: {
                  stock_id: 2,
                  allow_ship_from_store: true,
                },
                stock_id: 1,
                salable_items: [
                  {
                    sku: 'CDS13892944',
                    qty: 100,
                  },
                  {
                    sku: 'CDS11140771',
                    qty: 9807,
                  },
                ],
                additional_text: {
                  method_code: 'pickupatstore_pickupatstore',
                  method_label_code: 'future_day_pickup',
                  time_value: 3,
                  time_unit: 'd',
                  date_time: '2021-01-08 13:27:08',
                  extension_attributes: {
                    additional_text_variable: {
                      total_available: 1,
                      total_ordered: 2,
                    },
                  },
                },
              },
            },
            {
              id: 2,
              name: 'Central Chidlom',
              store_code: 'CDS_CC_10114',
              is_active: true,
              address: {
                street_number: null,
                building: null,
                soi: null,
                street: '1027 Ploenchit Road 12 Sukhumvit Road',
                district: 'ปทุมวัน',
                district_id: 35,
                sub_district: 'ลุมพินี',
                sub_district_id: 142,
                region: 'กรุงเทพมหานคร',
                region_id: 570,
                post_code: '10330',
                contact_number: '0999999999',
                country_code: 'TH',
                city: 'Bangkok',
                latitude: '13.7445741',
                longitude: '100.5423063',
              },
              extension_attributes: {
                allocated_capacity: {
                  allocated_capacity: 290,
                },
                opening_hours: [
                  {
                    day: 'Monday',
                    open: '08:00',
                    close: '22:00',
                  },
                  {
                    day: 'Tuesday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Wednesday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Thursday',
                    open: '10:00',
                    close: '22:15',
                  },
                  {
                    day: 'Friday',
                    open: '10:00',
                    close: '22:15',
                  },
                  {
                    day: 'Saturday',
                    open: '10:00',
                    close: '22:00',
                  },
                  {
                    day: 'Sunday',
                    open: '10:00',
                    close: '22:00',
                  },
                ],
                image:
                  'https://cds-staging-content-for-mobile-app.s3-ap-southeast-1.amazonaws.com/media/store/Chidlom-building.jpg',
                position: 0,
                allow_pick_at_store: true,
                display_as_store_information: true,
                store_pickup: {
                  store_id: 2,
                  stock_id: 7,
                  allow_ispu: true,
                  allow_sts: null,
                },
                store_delivery: {
                  stock_id: 7,
                  allow_ship_from_store: true,
                },
                stock_id: 7,
                salable_items: [
                  {
                    sku: 'CDS13892944',
                    qty: 0,
                  },
                  {
                    sku: 'CDS11140771',
                    qty: 9971,
                  },
                ],
                additional_text: {
                  method_code: 'storepickup_ispu',
                  method_label_code: 'next_day_pickup',
                  time_value: 1,
                  time_unit: 'h',
                  date_time: '2021-01-06 04:00:00',
                  extension_attributes: {
                    additional_text_variable: {
                      total_available: 1,
                      total_ordered: 2,
                    },
                  },
                },
                cut_off_time: '19:00',
              },
            },
          ],
        },
        error_message: '',
        price_excl_tax: 0,
        price_incl_tax: 0,
      },
    ],
    is_allow_split_order: false,
  },
];

export const mockEstimateShippingMethodsV4Result = [
  {
    deliveryMethod: { title: 'จัดส่งที่บ้าน', code: 'home_delivery' },
    shippingMethods: [
      {
        carrier: { title: 'Central', code: 'cds' },
        method: { title: 'จัดส่งภายในวัน', code: 'same_day', caption: '(ในบางพื้นที่)' },
        amount: 150,
        deliveryTimeLabel: {
          methodLabel: 'ภายในวัน',
          timeLabel: '(8:00 - 20:00)',
          methodType: null,
          minLeadTime: null,
          maxLeadTime: null,
        },
        pickupStoresLocations: null,
      },
      {
        carrier: { title: 'Central', code: 'cds' },
        method: { title: 'จัดส่งวันถัดไป', code: 'next_day', caption: '(ในบางพื้นที่)' },
        amount: 150,
        deliveryTimeLabel: {
          methodLabel: 'วันถัดไป',
          timeLabel: '(14:00 - 20:00)',
          minLeadTime: null,
          methodType: null,
          maxLeadTime: null,
        },
        pickupStoresLocations: null,
      },
      {
        carrier: { title: 'Central', code: 'grab' },
        method: { title: 'ส่งด่วนใน 3 ชม.', code: 'ship_from_store', caption: '(ในบางพื้นที่)' },
        amount: 15,
        deliveryTimeLabel: {
          methodLabel: null,
          timeLabel: null,
          minLeadTime: null,
          methodType: 'today_delivery',
          maxLeadTime: '2021-01-05T16:27:08.000Z',
        },
        pickupStoresLocations: null,
      },
    ],
    isAllowSplitOrder: true,
  },
  {
    deliveryMethod: { title: 'รับสินค้าที่สาขา', code: 'click_collect' },
    shippingMethods: [
      {
        carrier: { title: 'รับใน 1 ชม.', code: 'storepickup' },
        method: { title: 'รับใน 1 ชม.', code: 'ispu', caption: '(ในบางพื้นที่)' },
        amount: 0,
        deliveryTimeLabel: { maxLeadTime: null, minLeadTime: null },
        pickupStoresLocations: null,
      },
      {
        carrier: { title: 'รับเวลาปกติ', code: 'pickupatstore' },
        method: { title: 'รับเวลาปกติ', code: 'pickupatstore', caption: '(2 สาขา)' },
        amount: 0,
        deliveryTimeLabel: { maxLeadTime: null, minLeadTime: null },
        pickupStoresLocations: [
          {
            id: '1',
            name: 'เซ็นทรัลชิดลม',
            code: 'CDS_CC_10102',
            address: {
              addressLine: '1027 ถนนเพลินจิต1027',
              postcode: '10330',
              latitude: '13.7445741',
              longitude: '100.5423063',
              countryCode: 'TH',
              subDistrict: { id: '142', name: 'ลุมพินี' },
              district: { id: '35', name: 'ปทุมวัน' },
              province: { id: '570', name: 'กรุงเทพมหานคร' },
              telephone: '0279377777',
            },

            additionalText: {
              totalAvailable: 1,
              totalOrdered: 2,
              timeUnit: 'd',
              timeLabel: '3 days',
              timeValue: 3,
              dateTime: '2021-01-08T13:27:08.000Z',
            },
            openingHours: [
              { day: 'Monday', open: '10:00', close: '22:00' },
              { day: 'Tuesday', open: '10:00', close: '22:00' },
              { day: 'Wednesday', open: '10:00', close: '22:00' },
              { day: 'Thursday', open: '10:00', close: '22:00' },
              { day: 'Friday', open: '10:00', close: '22:00' },
              { day: 'Saturday', open: '10:00', close: '22:00' },
              { day: 'Sunday', open: '10:00', close: '22:00' },
            ],
            salableItems: [
              {
                qty: 100,
                sku: 'CDS13892944',
              },
              {
                qty: 9807,
                sku: 'CDS11140771',
              },
            ],
          },
          {
            id: '2',
            name: 'Central Chidlom',
            code: 'CDS_CC_10114',
            cutOffTime: '19:00',
            address: {
              addressLine: '1027 Ploenchit Road 12 Sukhumvit Road',
              postcode: '10330',
              countryCode: 'TH',
              latitude: '13.7445741',
              longitude: '100.5423063',
              subDistrict: { id: '142', name: 'ลุมพินี' },
              district: { id: '35', name: 'ปทุมวัน' },
              province: { id: '570', name: 'กรุงเทพมหานคร' },
              telephone: '0999999999',
            },
            additionalText: {
              totalAvailable: 1,
              totalOrdered: 2,
              timeUnit: 'h',
              timeLabel: '1 hour',
              timeValue: 1,
              dateTime: '2021-01-06T04:00:00.000Z',
            },
            openingHours: [
              { day: 'Monday', open: '08:00', close: '22:00' },
              { day: 'Tuesday', open: '10:00', close: '22:00' },
              { day: 'Wednesday', open: '10:00', close: '22:00' },
              { day: 'Thursday', open: '10:00', close: '22:15' },
              { day: 'Friday', open: '10:00', close: '22:15' },
              { day: 'Saturday', open: '10:00', close: '22:00' },
              { day: 'Sunday', open: '10:00', close: '22:00' },
            ],
            salableItems: [
              {
                qty: 0,
                sku: 'CDS13892944',
              },
              {
                qty: 9971,
                sku: 'CDS11140771',
              },
            ],
          },
        ],
      },
    ],
    isAllowSplitOrder: false,
  },
];
