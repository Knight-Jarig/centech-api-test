import configs from '../../configs/vars';
import cache from '../../configs/cache';
import {
  ProductRecommendationByUserResponse,
  ProductRecommendationBySkuResponse,
  ProductSimilarBySkuResponse,
  ProductAssociationViewBySkuResponse,
} from './DataLakeRecommendationApiResponse';
import DataLakeApi from '../dataLakeApi';

class DataLakeRecommendationApi extends DataLakeApi {
  baseURL = configs.dataLake.recommendation_url || `${configs.dataLake.base_url}recommendation`;
  token = configs.dataLake.recommendation_token || configs.dataLake.token;

  willSendRequest(request) {
    super.setCacheOptions(request);
    request.headers.set('x-api-key', `${this.token}`);
    request.headers.set('Content-Type', 'application/json');
  }

  productRecommendationBySku(lang = 'th', sku = '0'): Promise<ProductRecommendationBySkuResponse[]> {
    return this.get(
      `/products/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productRecommendationHomepage } },
    );
  }

  productRecommendationByUser(lang = 'th', userId = '0000'): Promise<ProductRecommendationByUserResponse[]> {
    return this.get(
      `/users/${userId}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productRecommendationByUser } },
    );
  }

  productAssociationBySku(lang, sku): Promise<ProductRecommendationBySkuResponse> {
    return this.get(
      `/products/association/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productAssociationBySku } },
    );
  }

  productSimilarBySku(lang, sku): Promise<ProductSimilarBySkuResponse> {
    return this.get(
      `/products/similarity/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productSimilarBySku } },
    );
  }

  productAssociationViewBySku(lang, sku): Promise<ProductAssociationViewBySkuResponse> {
    return this.get(
      `/products/association-view/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productAssociationViewBySku } },
    );
  }
}

export default DataLakeRecommendationApi;
