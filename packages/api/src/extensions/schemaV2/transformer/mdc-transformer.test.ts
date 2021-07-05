import {
  getSaleRuleOverlayImageUrl,
  getPriceSummary,
  getSpecialPriceDateRange,
  isBetweenDateRange,
  getDiscount,
  getBrand,
  getMediaGallery,
  parseDateTime,
  getBreadcrumbs,
  getInstallmentPlans,
  getThe1Redemtion,
  getOverlayImageUrl,
  getSeller,
  getReviews,
  getPreorder,
  find,
  getIsGiftWrappingAvailable,
  getPromotionEffectiveDateRange,
  getPromotions,
  getRating,
  getFlashdeal,
  getThumbnailUrl,
  getFlags,
  getPurchaseLimit,
  getShippingMethods,
  getPaymentMethods,
  transformProduct,
} from './mdc-transformer';
import {
  mockCartPriceRuleOverlays,
  mockProductData,
  mockStoreConfig,
  mockSuggestPromotion,
} from '../products/__mocks__/Products';

const store = { secure_base_media_url: 'url/' } as any;

describe('mdc-transformer', () => {
  it('getSaleRuleOverlayImageUrl should return overlay url that high priority', () => {
    const result = getSaleRuleOverlayImageUrl(mockCartPriceRuleOverlays, store);
    const expected = `${store.secure_base_media_url}salesrule_overlay/11111.png`;
    expect(result).toEqual(expected);
  });

  it('getSaleRuleOverlayImageUrl should return null when overlays is empty', () => {
    const mockData = [];
    const result = getSaleRuleOverlayImageUrl(mockData, store);
    expect(result).toBeNull();
  });

  it('getSaleRuleOverlayImageUrl should return null when overlays is null', () => {
    const mockData = null;
    const result = getSaleRuleOverlayImageUrl(mockData, store);
    expect(result).toBeNull();
  });

  it('getPriceSummary should run properly', () => {
    const result = getPriceSummary(mockProductData);
    expect(result).toEqual({ discount: null, final: 1, original: 1 });
  });

  it('getSpecialPriceDateRange should run properly', () => {
    const result = getSpecialPriceDateRange(mockProductData);
    expect(result).toEqual(null);
  });

  it('isBetweenDateRange should run properly', () => {
    const from = null;
    const to = null;
    const result = isBetweenDateRange({ from, to });
    expect(result).toEqual(false);
  });

  it('getDiscount should run properly', () => {
    const result = getDiscount(mockProductData);
    expect(result).toEqual(null);
  });

  it('getBrand should run properly', () => {
    const result = getBrand(mockProductData);
    expect(result).toEqual({ id: '1', name: '1', urlKey: '1' });
  });

  it('getMediaGallery should run properly', () => {
    const result = getMediaGallery(mockProductData, mockStoreConfig);
    expect(result).toEqual([
      {
        id: '102080',
        title: '1',
        type: 'IMAGE',
        url: '1',
      },
    ]);
  });

  it('parseDateTime should run properly', () => {
    const result = parseDateTime('abc');
    expect(result).toEqual(null);
  });

  it('getBreadcrumbs should run properly', () => {
    const result = getBreadcrumbs(mockProductData);
    expect(result).toEqual([]);
  });

  it('getInstallmentPlans should run properly', () => {
    const result = getInstallmentPlans(mockProductData);
    expect(result).toEqual([]);
  });

  it('getThe1Redemtion should run properly', () => {
    const result = getThe1Redemtion(mockProductData);
    expect(result).toEqual(null);
  });

  it('getOverlayImageUrl should run properly', () => {
    const result = getOverlayImageUrl(mockProductData, mockStoreConfig);
    expect(result).toEqual(null);
  });

  it('getSeller should run properly', () => {
    const result = getSeller(mockProductData);
    expect(result).toEqual({ id: 'N/A', name: 'N/A' });
  });

  it('getReviews should run properly', () => {
    const result = getReviews(mockProductData);
    expect(result).toEqual([]);
  });

  it('getPreorder should run properly', () => {
    const result = getPreorder(mockProductData);
    expect(result).toEqual(null);
  });

  it('find should run properly', () => {
    const result = find('1', mockProductData.custom_attributes_option);
    expect(result).toEqual('1');
  });

  it('getIsGiftWrappingAvailable should run properly', () => {
    const result = getIsGiftWrappingAvailable(mockProductData);
    expect(result).toEqual(false);
  });

  it('getPromotionEffectiveDateRange should run properly', () => {
    const result = getPromotionEffectiveDateRange(mockSuggestPromotion);
    expect(result).toEqual({ from: null, to: null });
  });

  it('getPromotions should run properly', () => {
    const result = getPromotions(mockProductData);
    expect(result).toEqual([]);
  });

  it('getFlashdeal should run properly', () => {
    const result = getFlashdeal(mockProductData);
    expect(result).toEqual(null);
  });

  it('getRating should run properly', () => {
    const result = getRating(mockProductData);
    expect(result).toEqual(null);
  });

  it('getThumbnailUrl should run properly', () => {
    const result = getThumbnailUrl(mockProductData, mockStoreConfig);
    expect(result).toEqual('1catalog/product/C/D/CDS16533073.jpg');
  });

  it('getFlags should run properly', () => {
    const result = getFlags(mockProductData);
    expect(result).toEqual([]);
  });

  it('getPurchaseLimit should run properly', () => {
    const result = getPurchaseLimit(mockProductData);
    expect(result).toEqual({ quantity: { max: 1, min: 1 } });
  });

  it('getShippingMethods should run properly', () => {
    const result = getShippingMethods(mockProductData);
    expect(result).toEqual([]);
  });

  it('getPaymentMethods should run properly', () => {
    const result = getPaymentMethods(mockProductData);
    expect(result).toEqual([]);
  });

  it('transformProduct should run properly', () => {
    const expected = {
      brand: { id: '1', name: '1', urlKey: '1' },
      breadcrumbs: [],
      description: undefined,
      flags: [],
      flashdeal: null,
      id: '416505',
      installmentPlans: [],
      links: {
        breadcrumbs: [],
        crossSell: [],
        crossSellSKUs: [],
        related: [],
        relatedSKUs: [],
        similar: [],
        upSell: [],
        upSellSKUs: [],
      },
      mediaGallery: [{ id: '102080', title: '1', type: 'IMAGE', url: '1' }],
      name: 'เครื่องปั่นร้อนเย็นพลังสูง Hot & Cold High Speed Blender (2.7ลิตร, 1300วัตต์) รุ่น BL985A66 ',
      overlayImageUrl: null,
      paymentMethods: [],
      preorder: null,
      priceSummary: { discount: null, final: 1, original: 1 },
      promotions: [],
      purchaseLimit: { quantity: { max: 1, min: 1 } },
      rating: null,
      reviews: [],
      seller: { id: 'N/A', name: 'N/A' },
      shippingMethods: [],
      shortDescription: undefined,
      sku: 'CDS19287492',
      the1Redemption: null,
      thumbnailUrl: '1catalog/product/C/D/CDS16533073.jpg',
      type: 'simple',
      urlKey: '1',
    };
    const result = transformProduct(mockProductData, mockStoreConfig);
    expect(result).toEqual(expected);
  });
});
