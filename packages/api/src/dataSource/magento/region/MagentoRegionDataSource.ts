import cache from '../../../configs/cache';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoRegionDataSource extends BaseRESTDataSource {
  getRegions(store) {
    return this.get(`${store}/V1/region/province`, null, {
      cacheOptions: { ttl: cache.RegionApi.getRegions },
    });
  }

  getRegionByPostcode(store, postcode) {
    return this.get(`${store}/V1/region/postcode/${postcode}`, null, {
      cacheOptions: { ttl: cache.RegionApi.getRegionByPostcode },
    });
  }

  getDistricts(store, regionId) {
    return this.get(`${store}/V1/region/province/${regionId}/district`, null, {
      cacheOptions: { ttl: cache.RegionApi.getDistricts },
    });
  }

  getSubDistricts(store, regionId, districtId) {
    return this.get(`${store}/V1/region/province/${regionId}/district/${districtId}/subdistrict`, null, {
      cacheOptions: { ttl: cache.RegionApi.getSubDistricts },
    });
  }
}
