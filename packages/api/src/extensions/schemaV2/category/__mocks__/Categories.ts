import { mockStorePickUpStoreResponseStoreListNull } from 'extensions/schemaV2/cart/__mocks__/Cart';
import { isNullableType } from 'graphql';
import { ICategoryFlat, IV2Category } from 'types/graphql';
import { MagentoCategory } from '../../../../dataSource/magento/category/MagentoCategoryResponse';
import { MagentoCategoryFindResponse } from '../../../../dataSource/magento/category/MagentoCategoryResponse';
export const mockCategoryFlat: ICategoryFlat = {
  id: '3061',
  entity_id: '3061',
  parent_id: '260',
  name: 'เทคโนโลยี',
  is_active: '1',
  position: 7,
  level: '2',
  path: '1/260/3061',
  include_in_menu: '1',
  product_count: 6737,
  children: null,
  children_count: '59',
  mega_cms_banner: '117',
  mega_cms_brand: '83,111,153,339,352,519,541,636,824',
  mega_cms_menu: '146',
  url_key: 'tech',
  url_path: 'tech',
  virtual_category_root: '260',
};

export const mockCategoriesFlatFormatted: IV2Category = {
  id: '3061',
  parentId: '260',
  name: 'เทคโนโลยี',
  isActive: true,
  position: 7,
  level: '2',
  path: '1/260/3061',
  urlKey: 'tech',
  urlPath: 'tech',
  childrenCount: 59,
  includeInMenu: '1',
  productCount: 6737,
  virtualCategoryRoot: '260',
  megaCmsBrand: '83,111,153,339,352,519,541,636,824',
  megaCmsBanner: '117',
  megaCmsMenu: '146',
};

export const mockCategory: MagentoCategory = {
  id: 6521,
  parent_id: 260,
  name: 'Midnight Sale',
  is_active: true,
  position: 29,
  level: 2,
  product_count: 0,
  children_data: [],
};

export const mockCategories: MagentoCategory[] = [
  {
    id: 6521,
    parent_id: 260,
    name: 'Midnight Sale',
    is_active: true,
    position: 29,
    level: 2,
    product_count: 0,
    children_data: [],
  },
];

export const mockCategoriesFlat: ICategoryFlat[] = [
  {
    entity_id: '6521',
    parent_id: '260',
    name: 'Midnight Sale',
    is_active: '1',
    position: 29,
    level: '2',
    path: '1/260/6521',
    include_in_menu: '1',
    product_count: 0,
    children: null,
    children_count: '0',
    mega_cms_banner: null,
    mega_cms_brand: null,
    mega_cms_menu: null,
    url_key: 'midnight-sale',
    url_path: 'midnight-sale',
    virtual_category_root: null,
    id: '6521',
  },
];

export const mockCategoryFlatFormatted: any = {
  id: '6521',
  parentId: '260',
  name: 'Midnight Sale',
  isActive: true,
  position: 29,
  level: '2',
  path: '1/260/6521',
  urlKey: 'midnight-sale',
  urlPath: 'midnight-sale',
  childrenCount: 0,
  includeInMenu: '1',
  productCount: 0,
  virtualCategoryRoot: null,
  megaCmsBrand: null,
  megaCmsBanner: null,
  megaCmsMenu: null,
};

export const mockCategoriesFormatted: any = {
  id: '6521',
  parentId: '260',
  name: 'Midnight Sale',
  position: 29,
  level: '2',
  isActive: true,
  productCount: 0,
  childrenData: [],
};

export const mockCategoriesFlatTransform: ICategoryFlat[] = [
  {
    entity_id: '6521',
    parent_id: '260',
    name: 'Midnight Sale',
    is_active: '1',
    position: 29,
    level: '2',
    path: '1/260/6521',
    include_in_menu: '1',
    product_count: 0,
    mega_cms_banner: null,
    mega_cms_brand: null,
    mega_cms_menu: null,
    children: null,
    children_count: '0',
    url_key: 'midnight-sale',
    url_path: 'midnight-sale',
    virtual_category_root: null,
    id: '6521',
  },
];

export const mockCategoriesFlatFromMDC: MagentoCategoryFindResponse = {
  items: [
    {
      entity_id: '6521',
      parent_id: '260',
      name: 'Midnight Sale',
      is_active: '1',
      position: '29',
      level: '2',
      updated_at: '2020-06-09 04:33:50',
      created_at: '2018-10-08 11:08:28',
      path: '1/260/6521',
      available_sort_by: null,
      include_in_menu: '1',
      product_count: 0,
      children: null,
      children_count: '0',
      image_mobile: null,
      url_key: 'midnight-sale',
      url_path: 'midnight-sale',
      virtual_category_root: null,
    },
  ],
  search_criteria: null,
  total_count: 1,
};

export const mockCategoriesFromMDC: MagentoCategory = {
  id: 260,
  parent_id: 1,
  name: 'CDS',
  is_active: true,
  position: 2,
  level: 1,
  product_count: 45534,
  children_data: [
    {
      id: 6521,
      parent_id: 260,
      name: 'Midnight Sale',
      is_active: true,
      position: 29,
      level: 2,
      product_count: 0,
      children_data: [],
    },
  ],
};

export const mockCategoriesMerged: IV2Category[] = [
  {
    id: '6521',
    parentId: '260',
    name: 'Midnight Sale',
    isActive: true,
    position: 29,
    level: '2',
    path: '1/260/6521',
    urlKey: 'midnight-sale',
    urlPath: 'midnight-sale',
    childrenCount: 0,
    includeInMenu: '1',
    productCount: 0,
    virtualCategoryRoot: null,
    megaCmsBrand: null,
    megaCmsBanner: null,
    megaCmsMenu: null,
    childrenData: [],
  },
];

export const mockCategoriesMergedResult: IV2Category[] = [
  {
    id: '6521',
    parentId: '260',
    name: 'Midnight Sale',
    isActive: true,
    position: 29,
    level: '2',
    path: '1/260/6521',
    urlKey: 'midnight-sale',
    urlPath: 'midnight-sale',
    childrenCount: 0,
    includeInMenu: '1',
    productCount: 0,
    virtualCategoryRoot: null,
    megaCmsBrand: undefined,
    megaCmsBanner: undefined,
    megaCmsMenu: undefined,
    childrenData: [],
  },
];

export const mockMagentoCategoriesFlat = [
  {
    entity_id: '3051',
    parent_id: '260',
    name: 'แบรนด์',
    is_active: '1',
    position: '1',
    level: '2',
  },
  {
    entity_id: '3052',
    parent_id: '260',
    name: 'ผู้หญิง',
    is_active: '1',
    position: '4',
    level: '2',
  },
  {
    entity_id: '3053',
    parent_id: '260',
    name: 'ผู้ชาย',
    is_active: '1',
    position: '5',
    level: '2',
  },
  {
    entity_id: '3054',
    parent_id: '3051',
    name: 'เด็ก',
    is_active: '1',
    position: '6',
    level: '3',
  },
  {
    entity_id: '3128',
    parent_id: '3052',
    name: 'แปรงและอุปกรณ์แต่งหน้า',
    is_active: '1',
    position: '6',
    level: '3',
  },
  {
    entity_id: '3129',
    parent_id: '3052',
    name: 'แปรงสำหรับใบหน้า',
    is_active: '1',
    position: '1',
    level: '3',
  },
  {
    entity_id: '3130',
    parent_id: '3129',
    name: 'แปรงสำหรับดวงตาและคิ้ว',
    is_active: '1',
    position: '2',
    level: '4',
  },
  {
    entity_id: '3131',
    parent_id: '3129',
    name: 'แปรงสำหรับริมฝีปาก',
    is_active: '1',
    position: '3',
    level: '4',
  },
  {
    entity_id: '3132',
    parent_id: '3129',
    name: 'เซ็ตแปรงแต่งหน้า',
    is_active: '1',
    position: '4',
    level: '4',
  },
  {
    entity_id: '3133',
    parent_id: '3132',
    name: 'แปรง ฟองน้ำ และซิลิโคน สำหรับรองพื้น',
    is_active: '1',
    position: '5',
    level: '5',
  },
  {
    entity_id: '3134',
    parent_id: '3132',
    name: 'อุปกรณ์อื่นๆ',
    is_active: '1',
    position: '6',
    level: '5',
  },
  {
    entity_id: '3135',
    parent_id: '3131',
    name: 'ผลิตภัณฑ์ดูแลผิวหน้า',
    is_active: '1',
    position: '1',
    level: '5',
  },
  {
    entity_id: '3136',
    parent_id: '3131',
    name: 'ผลิตภัณฑ์ทำความสะอาดใบหน้า',
    is_active: '1',
    position: '2',
    level: '5',
  },
  {
    entity_id: '3137',
    parent_id: '3131',
    name: 'มาส์กและผลิตภัณฑ์ผลัดเซลล์ผิว',
    is_active: '1',
    position: '1',
    level: '5',
  },
  {
    entity_id: '4000',
    parent_id: '3054',
    name: 'test 3',
    is_active: '1',
    position: '1',
    level: '4',
  },
  {
    entity_id: '4001',
    parent_id: '4000',
    name: 'test 4',
    is_active: '1',
    position: '1',
    level: '5',
  },
  {
    entity_id: '4002',
    parent_id: '4000',
    name: 'test 5',
    is_active: '1',
    position: '1',
    level: '5',
  },
];

export const mockCategoriesTree = [
  {
    entity_id: '3051',
    parent_id: '260',
    name: 'แบรนด์',
    is_active: '1',
    position: '1',
    level: '2',
    children_data: [
      {
        entity_id: '3054',
        parent_id: '3051',
        name: 'เด็ก',
        is_active: '1',
        position: '6',
        level: '3',
        children_data: [
          {
            entity_id: '4000',
            parent_id: '3054',
            name: 'test 3',
            is_active: '1',
            position: '1',
            level: '4',
            children_data: [
              {
                entity_id: '4001',
                parent_id: '4000',
                name: 'test 4',
                is_active: '1',
                position: '1',
                level: '5',
                children_data: [],
              },
              {
                entity_id: '4002',
                parent_id: '4000',
                name: 'test 5',
                is_active: '1',
                position: '1',
                level: '5',
                children_data: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    entity_id: '3052',
    parent_id: '260',
    name: 'ผู้หญิง',
    is_active: '1',
    position: '4',
    level: '2',
    children_data: [
      {
        entity_id: '3128',
        parent_id: '3052',
        name: 'แปรงและอุปกรณ์แต่งหน้า',
        is_active: '1',
        position: '6',
        level: '3',
        children_data: [],
      },
      {
        entity_id: '3129',
        parent_id: '3052',
        name: 'แปรงสำหรับใบหน้า',
        is_active: '1',
        position: '1',
        level: '3',
        children_data: [
          {
            entity_id: '3130',
            parent_id: '3129',
            name: 'แปรงสำหรับดวงตาและคิ้ว',
            is_active: '1',
            position: '2',
            level: '4',
            children_data: [],
          },
          {
            entity_id: '3131',
            parent_id: '3129',
            name: 'แปรงสำหรับริมฝีปาก',
            is_active: '1',
            position: '3',
            level: '4',
            children_data: [
              {
                entity_id: '3135',
                parent_id: '3131',
                name: 'ผลิตภัณฑ์ดูแลผิวหน้า',
                is_active: '1',
                position: '1',
                level: '5',
                children_data: [],
              },
              {
                entity_id: '3136',
                parent_id: '3131',
                name: 'ผลิตภัณฑ์ทำความสะอาดใบหน้า',
                is_active: '1',
                position: '2',
                level: '5',
                children_data: [],
              },
              {
                entity_id: '3137',
                parent_id: '3131',
                name: 'มาส์กและผลิตภัณฑ์ผลัดเซลล์ผิว',
                is_active: '1',
                position: '1',
                level: '5',
                children_data: [],
              },
            ],
          },
          {
            entity_id: '3132',
            parent_id: '3129',
            name: 'เซ็ตแปรงแต่งหน้า',
            is_active: '1',
            position: '4',
            level: '4',
            children_data: [
              {
                entity_id: '3133',
                parent_id: '3132',
                name: 'แปรง ฟองน้ำ และซิลิโคน สำหรับรองพื้น',
                is_active: '1',
                position: '5',
                level: '5',
                children_data: [],
              },
              {
                entity_id: '3134',
                parent_id: '3132',
                name: 'อุปกรณ์อื่นๆ',
                is_active: '1',
                position: '6',
                level: '5',
                children_data: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    entity_id: '3053',
    parent_id: '260',
    name: 'ผู้ชาย',
    is_active: '1',
    position: '5',
    level: '2',
    children_data: [],
  },
];