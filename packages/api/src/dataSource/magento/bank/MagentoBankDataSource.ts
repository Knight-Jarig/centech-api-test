import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { IFiltersQuery } from '../../../types/graphql';

interface MagentoBankResponse {
  bank_id: string;
  name: string;
  bank_image: string;
  icon: string;
  color: string;
  active: string;
}

export class MagentoBankDataSource extends BaseRESTDataSource {
  async find(criteria: IFiltersQuery): Promise<MagentoBankResponse[]> {
    const searchCriteria = searchCriteriaBuilder(criteria);
    const path = `/V1/banks?${searchCriteria}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };
    const response = await this.get(path, params, init);
    const banks = response?.items || [];

    return banks;
  }
}
