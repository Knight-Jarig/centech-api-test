import DataLoader from 'dataloader';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import { MDCStoreConfig } from './types/mdc-store-config';
import { MDCRegion } from './types/mdc-type';
import { IPlace } from '../../types/graphql';

export interface LocationUseCaseOptions {
  magento: MagentoDataSource;
}

export class LocationUseCase {
  private store?: MDCStoreConfig;
  private locale = 'en';

  private magento: MagentoDataSource;

  private loader = new DataLoader<string, MDCRegion>(ids => {
    return this.magento.region.getRegions(this.store.code).then(result => {
      const byId = result.reduce((memo, region) => {
        memo[region.region_id] = region;

        return memo;
      }, {} as any);

      return ids.map(id => byId[id]);
    });
  });

  constructor({ magento }: LocationUseCaseOptions) {
    this.magento = magento;
  }

  initialize(config): void {
    this.store = config.context.store;
    this.locale = config.context.locale;
  }

  async findProvinceById(id: string): Promise<IPlace> {
    const region = await this.loader.load(id);

    return {
      id: region.region_id,
      name: region.name,
    };
  }
}
