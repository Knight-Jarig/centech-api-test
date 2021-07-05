import { MagentoPricePerStoreDataSource } from './MagentoPricePerStoreDataSource';
import cache from '../../../configs/cache';

class MagentoPricePerStoreDataSourceTest extends MagentoPricePerStoreDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoPricePerStoreDataSource', () => {
  const MagentoPricePerStore = new MagentoPricePerStoreDataSourceTest();
  const postcode = '11111';
  it(`should call getRetailerIdByPostcode with expect params`, async () => {
    const path = `/V1/sellerpostcode/seller`;
    jest.spyOn(MagentoPricePerStore, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoPricePerStore.getRetailerIdByPostcode(postcode);
    expect(MagentoPricePerStore.get).toBeCalledWith(
      path,
      {
        postcode,
      },
      {
        cacheOptions: { ttl: cache.PricingAPI.getRetailerIdByPostcode },
      },
    );
  });

  it(`should call listPriceBySku with expect params`, async () => {
    const sku = '123123123';
    const path = `/V1/pricing-per-store/get-all-store-price`;
    jest.spyOn(MagentoPricePerStore, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoPricePerStore.listPriceBySku({ sku });
    expect(MagentoPricePerStore.get).toBeCalledWith(
      path,
      {
        sku,
      },
      {
        cacheOptions: { ttl: cache.PricingAPI.list },
      },
    );
  });

  it(`should call getPricingPerStoreGetPrice with expect params`, async () => {
    const sku = '123123123';
    const retailer_id = '11111';
    const path = `/V1/pricing-per-store/get-price`;
    jest.spyOn(MagentoPricePerStore, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoPricePerStore.getPricingPerStoreGetPrice({ sku, retailer_id });
    expect(MagentoPricePerStore.get).toBeCalledWith(
      path,
      {
        sku,
        retailer_id,
      },
      {
        cacheOptions: { ttl: cache.PricingAPI.getPrice },
      },
    );
  });
});
