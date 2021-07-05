export const mockProductAssociationBySkuResponse1 = {
  id: 1,
  name: 'You may also like',
  data: [
    {
      code: 'product_asso',
      item: ['387247', '227123'],
    },
  ],
  filler: [],
};

export const mockProductAssociationBySkuResponse2 = {
  id: 1,
  name: 'You may also like',
  data: [
    {
      code: 'product_asso',
      item: [],
    },
  ],
  filler: [],
};

export const mockCatalogServiceProductResponse1 = {
  products: [
    {
      sku: '387247',
    },
    {
      sku: '227123',
    },
  ],
};

export const mockCatalogServiceProductResponse2 = {
  products: [],
};

export const mockCatalogServiceProductResponse3 = {
  products: [
    {
      sku: '233090',
    },
    {
      sku: '260561',
    },
    {
      sku: '234473',
    },
    {
      sku: '261317',
    },
    {
      sku: '252069',
    },
    {
      sku: '242068',
    },
  ],
};

export const mockCatalogServiceProductResponse4 = {
  products: [
    {
      sku: '256002',
    },
    {
      sku: '235889',
    },
    {
      sku: '238084',
    },
    {
      sku: '248109',
    },
  ],
};

export const mockPWBProductAssociationBySkuResult1 = {
  products: [
    {
      sku: '387247',
    },
    {
      sku: '227123',
    },
  ],
};

export const mockPWBProductAssociationBySkuResult2 = {
  products: null,
};

export const mockProductSimilarBySkuResponse1 = {
  id: 1,
  name: 'สินค้าที่คล้ายกัน',
  data: [
    {
      code: 'same_brand',
      item: ['234473', '242068'],
    },
    {
      code: 'diff_brand',
      item: ['260561', '261317'],
    },
  ],
  filler: ['233090', '252069'],
};

export const mockProductSimilarBySkuResponse2 = {
  id: 1,
  name: 'สินค้าที่คล้ายกัน',
  data: [
    {
      code: 'same_brand',
      item: [],
    },
    {
      code: 'diff_brand',
      item: [],
    },
  ],
  filler: [],
};

export const mockPWBProductSimilarBySkuResult1 = {
  products: [
    {
      sku: '260561',
    },
    {
      sku: '261317',
    },
  ],
};

export const mockProductAssociationViewBySkuResponse1 = {
  id: 1,
  name: 'You may also like',
  data: [
    {
      code: 'product_asso_view',
      item: ['256002', '235889'],
    },
  ],
  filler: ['248109', '238084'],
};

export const mockProductAssociationViewBySkuResponse2 = {
  id: 1,
  name: 'You may also like',
  data: [
    {
      code: 'product_asso_view',
      item: [],
    },
  ],
  filler: [],
};

export const mockPWBProductAssociationViewBySkuResult1 = {
  products: [
    {
      sku: '248109',
    },
    {
      sku: '238084',
    },
  ],
};

export const mockPWBProductAssociationViewBySkuResult2 = {
  products: null,
};
