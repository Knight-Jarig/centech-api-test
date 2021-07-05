const mockDeliveryOptionMDCResult1 = [
  {
    delivery_title: 'Home Delivery',
    delivery_methods: [
      {
        delivery_method: 'delivery',
        delivery_method_label: 'Standard Delivery',
        delivery_method_lead_times_label: 'Order now, delivers: 12 Sep - 15 Sep',
        delivery_method_free_label: 'FREE on order above ฿699',
        delivery_method_caption: '',
        sort_order: 10
      }
    ]
  },
  {
    delivery_title: 'Click & Collect',
    delivery_methods: [
      {
        delivery_method: 'click_and_collect',
        delivery_method_label: 'Standard Pickup',
        delivery_method_lead_times_label: 'Order now, pickup: 12 Sep - 15 Sep',
        delivery_method_free_label: 'FREE',
        delivery_method_caption: '(159 locations)',
        sort_order: 30
      },
      {
        delivery_method: "hour_pickup",
        delivery_method_label: "รับใน 1 ชั่วโมง",
        delivery_method_lead_times_label: "สั่งตอนนี้ รับที่สาขา: วันนี้ 13:40น.",
        delivery_method_free_label: "ฟรี",
        delivery_method_caption: "(selected stores)",
        sort_order: 40
      }
    ]
  }
];

const mockDeliveryOptionResult1 =  [
  {
    title: 'Home Delivery',
    postcode: '10170',
    methods: [
      {
        method: 'delivery',
        label: 'Standard Delivery',
        leadTimes: 'Order now, delivers: 12 Sep - 15 Sep',
        freeLabel: 'FREE on order above ฿699',
        sortOrder: '10'
      }
    ]
  },
  {
    title: 'Click & Collect',
    postcode: '10170',
    methods: [
      {
        method: 'click_and_collect',
        label: 'Standard Pickup',
        leadTimes: 'Order now, pickup: 12 Sep - 15 Sep',
        freeLabel: 'FREE',
        sortOrder: '30'
      },
      {
        method: "hour_pickup",
        label: "รับใน 1 ชั่วโมง",
        leadTimes: "สั่งตอนนี้ รับที่สาขา: วันนี้ 13:40น.",
        freeLabel: "ฟรี",
        sortOrder: "40"
      }
    ]
  }
];

const mockDeliveryOptionMDCResult2 =  [
  {
    delivery_title: 'Home Delivery',
    delivery_methods: null
  },
  {
    delivery_title: 'Click & Collect',
    delivery_methods: null
  }
];

const mockDeliveryOptionResult2 =  [
  {
    title: 'Home Delivery',
    postcode: '0'
  },
  {
    title: 'Click & Collect',
    postcode: '0'
  }
];

const mockDeliveryOptionResult3 =  [
  {
    title: 'Home Delivery',
    postcode: '10170',
    methods: [
      {
        method: 'delivery',
        label: 'Standard Delivery',
        leadTimes: 'Order now, delivers: 12 Sep - 15 Sep',
        freeLabel: 'FREE on order above ฿699',
        sortOrder: '10'
      }
    ]
  },
  {
    title: 'Click & Collect',
    postcode: '10170',
    methods: [
      {
        method: 'click_and_collect',
        label: 'Standard Pickup',
        leadTimes: 'Order now, pickup: 12 Sep - 15 Sep',
        freeLabel: 'FREE',
        sortOrder: '30'
      }
    ]
  }
];

const mockDeliveryOptionResult5 =  [
  {
    title: 'Home Delivery',
    postcode: '10170',
    methods: []
  },
  {
    title: 'Click & Collect',
    postcode: '10170',
    methods: []
  }
];

export {
  mockDeliveryOptionResult1,
  mockDeliveryOptionResult2,
  mockDeliveryOptionMDCResult1,
  mockDeliveryOptionMDCResult2,
  mockDeliveryOptionResult3,
  mockDeliveryOptionResult5
};
