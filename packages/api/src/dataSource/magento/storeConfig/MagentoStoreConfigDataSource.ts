import find from 'lodash/find';
import cache from '../../../configs/cache';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { StoreConfig } from './MagentoStoreCodeType';
import { storeConfigTransform } from '../../../transform/storeConfig';
import { IStoreConfig } from '../../../types/graphql';

export class MagentoStoreConfigDataSource extends BaseRESTDataSource {
  async find(): Promise<IStoreConfig[]> {
    const response: StoreConfig[] = await this.get('/V1/store/storeConfigs', null, {
      cacheOptions: { ttl: cache.StoreConfigAPI.find },
    });
    return (response ?? []).map(storeConfigTransform);
  }

  async findOne(code: string): Promise<IStoreConfig> {
    const storeConfigs = await this.find();
    const currentConfig = find(storeConfigs, config => config.code === code);
    return currentConfig;
  }
}
