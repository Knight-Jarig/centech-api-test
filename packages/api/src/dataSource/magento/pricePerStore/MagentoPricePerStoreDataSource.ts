import cache from '../../../configs/cache';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';

interface GetPricingPerStoreGetPriceParams {
  sku: string;
  retailer_id: string;
}

export class MagentoPricePerStoreDataSource extends BaseRESTDataSource {
  async getRetailerIdByPostcode(postcode) {
    const result = await this.get(
      '/V1/sellerpostcode/seller',
      {
        postcode,
      },
      {
        cacheOptions: { ttl: cache.PricingAPI.getRetailerIdByPostcode },
      },
    );
    if (!result.retailer_id) {
      return null;
    }
    return result.retailer_id;
  }

  listPriceBySku({ sku }: { sku: string }) {
    return this.get(
      '/V1/pricing-per-store/get-all-store-price',
      {
        sku,
      },
      {
        cacheOptions: { ttl: cache.PricingAPI.list },
      },
    );
  }

  getPricingPerStoreGetPrice({ sku, retailer_id }: GetPricingPerStoreGetPriceParams) {
    return this.get(
      '/V1/pricing-per-store/get-price',
      {
        sku,
        retailer_id,
      },
      {
        cacheOptions: { ttl: cache.PricingAPI.getPrice },
      },
    );
  }
}
