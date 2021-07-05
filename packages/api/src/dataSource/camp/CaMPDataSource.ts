import { BaseRESTDataSource } from '../BaseRESTDataSource';
import configs from '../../configs/vars';
import cache from '../../configs/cache';
import { IV2FilterRewards, IV2FilterVouchers } from '../../types/graphql';
import { ICampRewards, IResponseVouchers } from './CaMPDataSourceParams';
import { AWSServiceMethod, awsSign4CampRequestHeader } from '../../utils/aws.utils';

export class CaMPDataSource extends BaseRESTDataSource {
  constructor() {
    super();
    this.baseURL = configs.camp.base_url;
  }

  async getVouchers(request: IV2FilterVouchers, queryParams): Promise<IResponseVouchers> {
    const { limit = 100, page = 0, userId } = request;
    const queryParamsRequest = { ...queryParams, page, per_page: limit };
    const path = '/api/v1/vouchers';
    const headers = {
      'user-id': userId,
      'bu-code': this.context.bu,
    };
    const signedHeader = awsSign4CampRequestHeader(AWSServiceMethod.GET, configs.camp, path, headers, queryParamsRequest);
    const response = await this.get(path, queryParamsRequest, {
      headers: {
        ...signedHeader,
      },
      cacheOptions: { ttl: cache.CaMP.getVouchers },
    });

    return response;
  }

  async getRewards(request: IV2FilterRewards, queryParams): Promise<ICampRewards> {
    const { limit = 100, page = 0, userId } = request;
    const queryParamsRequest = { ...queryParams, page, per_page: limit };
    const path = '/api/v1/rewards';
    const headers = {
      'user-id': userId,
      'bu-code': this.context.bu,
    };
    const signedHeader = awsSign4CampRequestHeader(AWSServiceMethod.GET, configs.camp, path, headers, queryParamsRequest);
    const response = await this.get(path, queryParamsRequest, {
      headers: {
        ...signedHeader,
      },
      cacheOptions: { ttl: cache.CaMP.getVouchers },
    });

    return response;
  }
}
