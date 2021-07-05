import DataLoader from 'dataloader';
import cache from '../../../configs/cache';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { IBase64Image, IFiltersQuery, IRatingOptions } from '../../../types/graphql';
import {
  MagentoProductAddReviewParams,
  MagentoProductAddReviewV2Params,
  MagentoProductCompareProductsParams,
  MagentoProductFindBySkuParams,
  MagentoProductFindByUrlParams,
  MagentoProductSaleRuleOverlay,
} from './MagentoProductParams';

export class MagentoProductDataSource extends BaseRESTDataSource {
  findBySku({ storeCode, sku }: MagentoProductFindBySkuParams) {
    const path = `${storeCode}/V2/products/${sku}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.ProductAPI.findBySku },
    };

    return this.get(path, params, init);
  }

  findByUrl({ storeCode, url }: MagentoProductFindByUrlParams) {
    const urlEncode = encodeURI(url);

    const path = `${storeCode}/V1/products/url-key/${urlEncode}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.ProductAPI.findByUrl },
    };

    return this.get(path, params, init);
  }

  search(criteria: IFiltersQuery, storeCode: string) {
    const searchCriteria = searchCriteriaBuilder(criteria);

    return this.get(`${storeCode}/V1/products?${searchCriteria}`, null, {
      cacheOptions: { ttl: cache.ProductAPI.findByUrl },
    });
  }

  addReview({ review, sku, storeCode }: MagentoProductAddReviewParams) {
    const path = `${storeCode}/V1/products/${sku}/review`;
    const params = { review };

    return this.post(path, params);
  }

  addReviewV2({ review, sku, storeCode }: MagentoProductAddReviewV2Params) {
    const path = `${storeCode}/V2/products/${sku}/review`;
    const params = { review };

    return this.post(path, params);
  }

  uploadImageBase64Review(images: IBase64Image[]) {
    const path = `V1/reviews/upload`;

    return this.post(path, {
      images,
    });
  }

  deleteImageReview(imagePath) {
    const path = `V1/reviews/remove_file/product_review%2f${imagePath}`;

    return this.delete(path);
  }

  compareProducts({ storeCode, sku }: MagentoProductCompareProductsParams) {
    const path = `${storeCode}/V1/products/compare?sku=${sku}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.ProductAPI.compareProducts },
    };

    return this.get(path, params, init);
  }

  getSalableQtyByStock(sku) {
    const path = `V1/get-salable-qty-all-stock/${sku}`;

    return this.get(path);
  }

  isReviewByEmail(sku, email) {
    const path = `V1/products/${sku}/isReview/${email}`;

    return this.get(path);
  }

  ratingOptions(storeCode: string): Promise<IRatingOptions[][]> {
    const path = `${storeCode}/V1/products/rating/options`;
    return this.get(path);
  }

  getSaleRuleOverlays(productId: string): Promise<MagentoProductSaleRuleOverlay[]> {
    return this.loaderOverlays.load(productId);
  }

  getAttributes(id: string) {
    return this.loaderAttributes.load(id);
  }

  getAttributesByAttributeCode(code: string) {
    return this.loaderAttributeCodes.load(code);
  }

  getStockItem(storeCode: string, sku: string) {
    const path = `${storeCode}/V1/stockItems/${sku}`;
    return this.get(path);
  }

  private loaderOverlays = new DataLoader<string, MagentoProductSaleRuleOverlay[]>(productIds => {
    const storeCode = this.context.storeCode;
    const path = `${storeCode}/V1/product/salerule/getoverlay?productIds=${productIds.join()}`;

    return this.get(path, null, {
      cacheOptions: {
        ttl: cache.ProductAPI.getOverlay,
      },
    }).then(result => {
      const overlayMapping = {};
      result.forEach(overlay => {
        const { product_id } = overlay;
        overlayMapping[product_id] = (overlayMapping[product_id] ?? []).concat(overlay);
      });

      return productIds.map(id => overlayMapping[id] ?? []);
    });
  });

  private loaderAttributes = new DataLoader(attributeIds => {
    const paths = attributeIds.map(attrId => `V1/products/attributes/${attrId}`);
    const requests = paths.map(path =>
      this.get(path, null, {
        cacheOptions: {
          ttl: cache.ProductAPI.getAttributes,
        },
      }),
    );

    return Promise.all(requests).then(results => {
      const byId = results.reduce((memo, attribute) => {
        memo[attribute.attribute_id] = attribute;

        return memo;
      }, {} as any);

      return attributeIds.map(id => byId[`${id}`]);
    });
  });

  private loaderAttributeCodes = new DataLoader(attributeCodes => {
    const paths = attributeCodes.map(attrCode => `V1/products/attributes/${attrCode}`);
    const requests = paths.map(path =>
      this.get(path, null, {
        cacheOptions: {
          ttl: cache.ProductAPI.getAttributes,
        },
      }),
    );

    return Promise.all(requests).then(results => {
      const byId = results.reduce((memo, attribute) => {
        memo[attribute.attribute_code] = attribute;

        return memo;
      }, {} as any);

      return attributeCodes.map(id => byId[`${id}`]);
    });
  });
}
