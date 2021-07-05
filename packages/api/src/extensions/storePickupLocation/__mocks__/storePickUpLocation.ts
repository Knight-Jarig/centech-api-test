const mockGetPickupLocationBySKU = [
  {
    id: 2,
    name: 'Central Chidlom',
    store_code: 'CDS_CC_10114',
    is_active: true,
    address: {
      street_number: null,
      building: null,
      soi: null,
      street: '1027 Ploenchit Road 12 Sukhumvit Road 1027 Ploenchit Road 12 Sukhumvit Road',
      district: 'Pathum Wan',
      district_id: 35,
      sub_district: 'Lumphini',
      sub_district_id: 142,
      region: 'Bangkok',
      region_id: 570,
      post_code: '10330',
      contact_number: '0999999999',
      country_code: 'TH',
      city: 'Bangkok',
      latitude: '13.7445741',
      longitude: '100.5423063',
    },
    extension_attributes: {
      allocated_capacity: { allocated_capacity: 290 },
      opening_hours: [
        { day: 'Monday', open: '08:00', close: '22:00' },
        { day: 'Tuesday', open: '10:00', close: '16:30' },
        { day: 'Wednesday', open: '10:00', close: '22:00' },
        { day: 'Thursday', open: '10:00', close: '22:15' },
        { day: 'Friday', open: '10:00', close: '22:15' },
        { day: 'Saturday', open: '10:00', close: '22:00' },
        { day: 'Sunday', open: '10:00', close: '22:00' },
      ],
      image:
        'https://cds-staging-content-for-mobile-app.s3-ap-southeast-1.amazonaws.com/media/store/Chidlom-building.jpg',
      position: 1,
      allow_pick_at_store: true,
      display_as_store_information: true,
      store_pickup: { stock_id: 7, allow_ispu: true, allow_sts: null },
      store_delivery: { stock_id: 7, allow_ship_from_store: true },
      stock_id: 1,
      salable_items: [{ sku: 'MKP2000700', qty: 1000 }],
      additional_text: {
        method_code: 'pickupatstore_pickupatstore',
        method_label_code: 'future_day_pickup',
        time_value: 3,
        time_unit: 'd',
        date_time: '2020-12-07 04:10:27',
        extension_attributes: { additional_text_variable: { total_available: 1, total_ordered: 1 } },
      },
    },
  },
];

export { mockGetPickupLocationBySKU };
