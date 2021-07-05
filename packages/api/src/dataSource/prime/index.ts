import configs from '../../configs/vars';
import { BaseRESTDataSource } from '../BaseRESTDataSource';
import DataLoader from 'dataloader';
import { IV2InventoryStock } from '../../types/graphql';

interface stockInfo {
  stockStatusQty: number;
  stockItemMinQty: number;
  inventoryReservationQty?: number;
}

export interface InventoryServiceResponse {
  sku: string;
  stockInfo: stockInfo;
  salable: boolean;
  onlineSalable?: boolean;
  onlineSalableQty?: number;
}

export class Prime extends BaseRESTDataSource {
  baseURL = configs.prime.base_url;
  stockDataLoader = new DataLoader<string, IV2InventoryStock>(
    async skus => {
      const result = await this.fetchBySku(skus);

      if (!result) {
        return skus.map(() => null);
      }
      const resultBySku = result.reduce((acc, item) => {
        return {
          ...acc,
          [item.sku]: {
            sku: item.sku,
            quantity: item.onlineSalable
              ? item.onlineSalableQty
              : item.salable
              ? item.stockInfo.stockStatusQty + item.stockInfo.inventoryReservationQty - item.stockInfo.stockItemMinQty
              : 0,
          },
        };
      }, {});

      return skus.map(sku => {
        return resultBySku?.[sku] || null;
      });
    },
    {
      maxBatchSize: 50,
    },
  );

  willSendRequest(request) {
    super.setCacheOptions(request);
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('x-api-key', configs.prime.token);
  }

  public getStockBySku(sku: string) {
    if (!configs.prime.base_url || !configs.prime.token) {
      return null;
    }
    return this.stockDataLoader.load(sku);
  }

  public getStockBySkus(skus: string[]) {
    if (!configs.prime.base_url || !configs.prime.token) {
      return null;
    }
    return this.stockDataLoader.loadMany(skus);
  }

  fetchBySku(skus: readonly string[]): Promise<InventoryServiceResponse[]> {
    return this.get('/module/salable', { skus: skus.join(',') });
  }
}
