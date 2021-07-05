import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { IFiltersQuery } from '../../../types/graphql';
import { MDCBrand, MDCBrandDetail } from './MagentoBrandResponse';

interface MagentoBrandFindParams extends IFiltersQuery {
  storeCode: string;
}

interface MagentoBrandFindOneParams {
  brandId: string;
  storeCode: string;
}

interface MagentoBrandSearchResponse {
  items: MDCBrand[];
}

export class MagentoBrandDataSource extends BaseRESTDataSource {
  async find({ storeCode, ...criteria }: MagentoBrandFindParams) {
    const searchCriteria = searchCriteriaBuilder(criteria);

    const path = `${storeCode}/V1/brands?${searchCriteria}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    const response: MagentoBrandSearchResponse = await this.get(path, params, init);

    return response.items;
  }

  async findOne({ brandId, storeCode }: MagentoBrandFindOneParams): Promise<MDCBrandDetail> {
    const path = `${storeCode}/V1/brands/${brandId}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };
    const data = await this.get(path, params, init);

    return data;
  }
}
