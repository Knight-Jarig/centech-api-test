import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import {
  IVipInterestInput,
  IVipInterestResponse,
  IVipListResponse,
  IVipNeedAssistanceInput,
  IVipNeedAssistanceResponse,
  IVipValidateInput,
  IVipValidateResponse,
} from './MagentoVipDataResponse';
import cache from '../../../configs/cache';

export class MagentoVipDataSource extends BaseRESTDataSource {
  getList(): Promise<IVipListResponse> {
    const path = `/V1/central-vvip-pages/getList`;
    return this.get(path, null, { cacheOptions: { ttl: cache.VipAPI.list } });
  }
  validate(body: IVipValidateInput): Promise<IVipValidateResponse> {
    const path = `/V1/central-vvip-pages/validate`;
    return this.post(path, body);
  }
  needAssistance(body: IVipNeedAssistanceInput): Promise<IVipNeedAssistanceResponse> {
    const path = `/V1/central-vvip-pages/need-assistance`;
    return this.post(path, body);
  }
  interest(body: IVipInterestInput): Promise<IVipInterestResponse> {
    const path = `/V1/central-vvip-pages/interest`;
    return this.post(path, body);
  }
}
