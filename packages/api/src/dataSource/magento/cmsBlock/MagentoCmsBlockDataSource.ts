import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';
import get from 'lodash/get';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoCmsBlockDataSource extends BaseRESTDataSource {
  async findOne(id) {
    return await this.get(`V1/cmsBlock/${id}`, null, {
      cacheOptions: { ttl: cache.CMSBlockAPI.findOne },
    });
  }

  async find({ filterGroups, page, size, sortOrders }) {
    const searchCriteria = searchCriteriaBuilder({
      filterGroups,
      page,
      size,
      sortOrders,
    });
    const data = await this.get(`V1/cmsBlock/search?${searchCriteria}`, null, {
      cacheOptions: { ttl: cache.CMSBlockAPI.find },
    });
    return get(data, 'items', []);
  }
}
