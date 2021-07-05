export interface MagentoProductFindBySkuParams {
  storeCode: string;
  sku: string;
}

export interface MagentoProductFindByUrlParams {
  storeCode: string;
  url: string;
}

export interface MagentoProductAddReviewParams {
  review: any;
  sku: string;
  storeCode: string;
}

export type MagentoProductAddReviewV2Params = MagentoProductAddReviewParams;

export interface MagentoProductCompareProductsParams {
  storeCode: string;
  sku: string;
}

export interface MagentoProductSaleRuleOverlay {
  rule_id: string;
  product_id: string;
  overlay_image: string;
  display_priority: string;
}
