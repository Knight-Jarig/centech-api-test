import { ResolverContext } from '../../types';
import { IDistrict, IQueryResolvers, IRegionByPostCode, IRegions, ISubDistrict } from '../../types/graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async regions(_source, data, { dataSources, storeCode }): Promise<IRegions[]> {
    return await dataSources.magento.region.getRegions(storeCode);
  },
  async regionByPostCode(_source, { input: { postcode } }, { dataSources, storeCode }): Promise<IRegionByPostCode> {
    return await dataSources.magento.region.getRegionByPostcode(storeCode, postcode);
  },
  async districts(_source, { input: { regionId } }, { dataSources, storeCode }): Promise<IDistrict[]> {
    return await dataSources.magento.region.getDistricts(storeCode, regionId);
  },
  async subDistricts(
    _source,
    { input: { regionId, districtId } },
    { dataSources, storeCode },
  ): Promise<ISubDistrict[]> {
    return await dataSources.magento.region.getSubDistricts(storeCode, regionId, districtId);
  },
};

export default {
  Query,
};
