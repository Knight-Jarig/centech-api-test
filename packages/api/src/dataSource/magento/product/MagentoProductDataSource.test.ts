import { MagentoProductDataSource } from './MagentoProductDataSource';
import DataLoader from 'dataloader';
import { MagentoProductSaleRuleOverlay } from './MagentoProductParams';

class MagentoProductDataSourceTest extends MagentoProductDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
  delete() {
    return jest.fn() as any
  }
}

describe('MagentoCartDataSource', () => {
  const magentoProduct = new MagentoProductDataSourceTest();
  const storeCode = 'cds_th';
  const init = {
    cacheOptions: { ttl: 300 },
  };

  describe(`getStockItem`, () => {
    it(`should call getStockItem with expect params`, async () => {
      const sku = 'CDS10836583';
      const path = `${storeCode}/V1/stockItems/${sku}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.getStockItem(storeCode, sku);
      expect(magentoProduct.get).toBeCalledWith(path);
    });
  });

  describe(`findBySku`, () => {
    it(`should call findBySku with expect params`, async () => {
      const sku = 'CDS10836583';
      const path = `${storeCode}/V2/products/${sku}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.findBySku({ storeCode, sku });
      expect(magentoProduct.get).toBeCalledWith(path, null, init);
    });
  });
  
  describe(`findByUrl`, () => {
    it(`should call findByUrl with expect params`, async () => {
      const url = 'test_url';
      const path = `${storeCode}/V1/products/url-key/${url}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.findByUrl({ storeCode, url });
      expect(magentoProduct.get).toBeCalledWith(path, null, init);
    });
  });
  
  describe('search', () => {
    it(`should call search with expect params`, async () => {
      const criteria = {
        filterGroups:[
          {
            filters: [{ field: "entity_id", value: "257038" }]
          }
        ], 
        page: 1,
        size: 1
      };
      const searchCriteria = `searchCriteria[pageSize]=1&searchCriteria[currentPage]=1&searchCriteria[filter_groups][0][filters][0][field]=entity_id&searchCriteria[filter_groups][0][filters][0][value]=257038`;
      const path = `${storeCode}/V1/products?${searchCriteria}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.search(criteria, storeCode);
      expect(magentoProduct.get).toBeCalledWith(path, null, init);
    });
  })

  describe(`Test Review on Magento Product`, () => {
    it(`addReview: should call addReview with expect params`, async () => {
      const sku = "cds14353246";
      const path = `${storeCode}/V1/products/${sku}/review`;
      const review = {
        nickname: 'knight',
        title: 'Testing Product',
        detail: 'Mocking Detail',
        rating_items: [{ option_id: 20, rating_id: 4 }],
        region_id: 10,
        email: 'jarig@central.tech',
        customer_id: '9999',
        images: [{ path: 'url/test-upload.jpg' }],
      };

      jest.spyOn(magentoProduct, 'post').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.addReview({ review, sku, storeCode });
      expect(magentoProduct.post).toBeCalledWith(path, { review });
    });

    it(`addReviewV2: should call addReviewV2 with expect params`, async () => {
      const sku = "cds14353246"
      const path = `${storeCode}/V2/products/${sku}/review`;
      const review = {
        nickname: 'knight',
        title: 'Testing Product',
        detail: 'Mocking Detail',
        rating_items: [{ option_id: 20, rating_id: 4 }],
        region_id: 10,
        email: 'jarig@central.tech',
        customer_id: '9999',
        images: [{ path: 'url/test-upload.jpg' }],
      };

      jest.spyOn(magentoProduct, 'post').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.addReviewV2({ review, sku, storeCode });
      expect(magentoProduct.post).toBeCalledWith(path, { review });
    });
  });

  describe(`uploadImageBase64Review`, () => {
    it(`should call uploadImageBase64Review with expect params`, async () => {
      const images = [
        {
          image: 'test_image',
          image_type: 'testing'
        }
      ];
      const path = `V1/reviews/upload`;

      jest.spyOn(magentoProduct, 'post').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.uploadImageBase64Review(images);
      expect(magentoProduct.post).toBeCalledWith(path, { images });
    });
  });

  describe(`deleteImageReview`, () => {
    it(`should call deleteImageReview with expect params`, async () => {
      const imagePath = 'test_img_path';
      const path = `V1/reviews/remove_file/product_review%2f${imagePath}`;

      jest.spyOn(magentoProduct, 'delete').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.deleteImageReview(imagePath);
      expect(magentoProduct.delete).toBeCalledWith(path);
    });
  });

  describe(`compareProducts`, () => {
    it(`should call compareProducts with expect params`, async () => {
      const sku = 'CDS10836583';
      const path = `${storeCode}/V1/products/compare?sku=${sku}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.compareProducts({ storeCode, sku });
      expect(magentoProduct.get).toBeCalledWith(path, null, init);
    });
  });

  describe(`getSalableQtyByStock`, () => {
    it(`should call getSalableQtyByStock with expect params`, async () => {
      const sku = 'CDS10836583';
      const path = `V1/get-salable-qty-all-stock/${sku}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.getSalableQtyByStock(sku);
      expect(magentoProduct.get).toBeCalledWith(path);
    });
  });

  describe(`isReviewByEmail`, () => {
    it(`should call isReviewByEmail with expect params`, async () => {
      const sku = 'CDS10836583';
      const email = 'jarig@central.tech';
      const path = `V1/products/${sku}/isReview/${email}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.isReviewByEmail(sku, email);
      expect(magentoProduct.get).toBeCalledWith(path);
    });
  });

  describe(`ratingOptions`, () => {
    it(`should call ratingOptions with expect params`, async () => {
      const path = `${storeCode}/V1/products/rating/options`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.ratingOptions(storeCode);
      expect(magentoProduct.get).toBeCalledWith(path);
    });
  });

  describe(`getAttributesByAttributeCode`, () => {
    it(`should call getAttributesByAttributeCode with expect params`, async () => {
      const code = 'test_code';
      const path = `V1/products/attributes/${code}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.getAttributesByAttributeCode(code);
      expect(magentoProduct.get).toBeCalledWith(path, null, { cacheOptions: { ttl: 3600 }, });
    });
  });

  describe(`getAttributes`, () => {
    it(`should call getAttributes with expect params`, async () => {
      const attrId = 'xxxxxxxxx';
      const path = `V1/products/attributes/${attrId}`;

      jest.spyOn(magentoProduct, 'get').mockReturnValue(Promise.resolve([]) as any);

      await magentoProduct.getAttributes(attrId);
      expect(magentoProduct.get).toBeCalledWith(path, null, { cacheOptions: { ttl: 3600 }, });
    });
  });
});
