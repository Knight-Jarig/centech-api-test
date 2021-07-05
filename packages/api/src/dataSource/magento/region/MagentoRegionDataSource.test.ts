import { MagentoRegionDataSource } from './MagentoRegionDataSource';
import cache from '../../../configs/cache';

class MagentoRegionDataSourceTest extends MagentoRegionDataSource {
  get = () => jest.fn() as any;
  post = () => jest.fn() as any;
  put = () => jest.fn() as any;
  delete = () => jest.fn() as any;
}

describe('MagentoRegionDataSource', () => {
  const magentoAddress = new MagentoRegionDataSourceTest();

  const store = 'CDS';
  const params = null;
  const init = {
    cacheOptions: { ttl: cache.RegionApi.getRegions },
  };

  it(`getRegions should run properly`, async () => {
    const path = `${store}/V1/region/province`;
    jest.spyOn(magentoAddress, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.getRegions(store);
    expect(magentoAddress.get).toBeCalledWith(path, params, init);
  });

  it(`getRegionByPostcode should run properly`, async () => {
    const postcode = '12345';
    const path = `${store}/V1/region/postcode/${postcode}`;
    jest.spyOn(magentoAddress, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.getRegionByPostcode(store, postcode);
    expect(magentoAddress.get).toBeCalledWith(path, params, init);
  });

  it(`getDistricts should run properly`, async () => {
    const regionId = '12345';
    const path = `${store}/V1/region/province/${regionId}/district`;
    jest.spyOn(magentoAddress, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.getDistricts(store, regionId);
    expect(magentoAddress.get).toBeCalledWith(path, params, init);
  });

  it(`getSubDistricts should run properly`, async () => {
    const regionId = '12345';
    const districtId = '12345';
    const path = `${store}/V1/region/province/${regionId}/district/${districtId}/subdistrict`;
    jest.spyOn(magentoAddress, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoAddress.getSubDistricts(store, regionId, districtId);
    expect(magentoAddress.get).toBeCalledWith(path, params, init);
  });
});
