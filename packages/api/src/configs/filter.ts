import config from '../configs/vars';

const bu = config.bu;

const whiteListFilterConfigCDSRBS = {
  enable: true,
  fields: [
    'shipping_delivery_methods.delivery_method',
    'brand_name',
    'color_group_name',
    'clothing_size',
    // 'age_range',
    'material_general',
    // 'fashion_neckline',
    // 'fashion_occasion',
    // 'rating',
  ],
};

const whiteListFilterConfig = {
  cds: whiteListFilterConfigCDSRBS,
  rbs: whiteListFilterConfigCDSRBS,
  common: {
    fields: ['categories.id', 'max_price', 'min_price'],
    // fields: ['max_price', 'min_price'],
  },
};
const whiteListFilterEnable = whiteListFilterConfig[bu]?.enable ?? false;

const whiteListFilter = whiteListFilterEnable
  ? [...whiteListFilterConfig[bu].fields, ...whiteListFilterConfig.common.fields]
  : null;

const attributeCodeCSToMDC = {
  color_group_name: 'color_group',
};

// use this config when attribute label not found in mdc
const attributeLabelConfig = {
  'shipping_delivery_methods.delivery_method': {
    th: 'วิธีการจัดส่ง',
    en: 'Delivery Method',
  },
  'categories.id': {
    th: 'หมวดหมู่',
    en: 'Categories',
  },
  rating: {
    th: 'รีวิวจากลูกค้า',
    en: 'Customer Rating',
  },
};

const attributeLabelOptionsConfig = {
  rating: {
    1: {
      th: '1 ดาว',
      en: '1 Star',
    },
    2: {
      th: '2 ดาว',
      en: '2 Stars',
    },
    3: {
      th: '3 ดาว',
      en: '3 Stars',
    },
    4: {
      th: '4 ดาว',
      en: '4 Stars',
    },
    5: {
      th: '5 ดาว',
      en: '5 Stars',
    },
    norating: {
      th: 'ไม่มีคะแนนโหวต',
      en: 'Unrated',
    },
  },
};

const whiteListFilterCS = [
  'id',
  'sku',
  'status',
  'price',
  'url_key',
  'brand_name',
  'material_general',
  'color_group_name',
  'shipping_delivery_methods.delivery_method',
  'categories.id',
  'clothing_size',
  'visibility',
  //'is_in_stock', old logic it's remove this key
  'type_id',
  'rating',
  'homepage_new',
  'recommended',
  'flash_deal',
  'best_sellers',
  'brand_id',
];

export {
  whiteListFilter,
  whiteListFilterEnable,
  attributeCodeCSToMDC,
  attributeLabelConfig,
  attributeLabelOptionsConfig,
  whiteListFilterCS,
};
