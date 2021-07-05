import configs from '../../configs/vars';
import cache from '../../configs/cache';
import { ProductRecommendationByUserResponse } from '../dataLakeRecommendationApi/DataLakeRecommendationApiResponse';
import DataLakeApi from '../dataLakeApi';

class DataLakeAppRecommendationApi extends DataLakeApi {
  baseURL = configs.dataLake.app_recommendation_url || `${configs.dataLake.base_url}app/recommendation`;
  token = configs.dataLake.app_recommendation_token || configs.dataLake.token;

  willSendRequest(request) {
    super.setCacheOptions(request);
    request.headers.set('x-api-key', `${this.token}`);
    request.headers.set('Content-Type', 'application/json');
  }

  productRecommendationByUser(lang = 'th', userId = '0000'): Promise<ProductRecommendationByUserResponse[]> {
    return this.get(
      `/users/${userId}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productRecommendationByUser } },
    );
  }
}

export default DataLakeAppRecommendationApi;
