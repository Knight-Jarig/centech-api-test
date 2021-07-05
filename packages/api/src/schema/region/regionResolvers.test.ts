import RegionResolvers from './regionResolvers';

jest.mock('class-transformer-validator');

const mockDataSources = {
  region: {
    getRegions: () => new Promise(resolve => resolve(true)),
    getRegionByPostcode: () => new Promise(resolve => resolve(true)),
    getDistricts: () => new Promise(resolve => resolve(true)),
    getSubDistricts: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesRegion = {
  magento: {
    region: mockDataSources.region,
  },
};

describe('RegionResolvers', () => {
  const regions = RegionResolvers.Query.regions as Function;
  const regionByPostCode = RegionResolvers.Query.regionByPostCode as Function;
  const districts = RegionResolvers.Query.districts as Function;
  const subDistricts = RegionResolvers.Query.subDistricts as Function;

  const _source = {};
  const input = {};
  const dataSources = dataSourcesRegion;
  const storeCode = 'cds_th';
  const customerToken = '1234';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('regions should run properly', async () => {
    jest.spyOn(dataSources.magento.region, 'getRegions').mockReturnValue(Promise.resolve({}));
    await regions(_source, { input }, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.region.getRegions).toBeCalledWith(storeCode);
  });

  it('regionByPostCode should run properly', async () => {
    const postcode = '1';
    jest.spyOn(dataSources.magento.region, 'getRegionByPostcode').mockReturnValue(Promise.resolve({}));
    await regionByPostCode(_source, { input: { postcode } }, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.region.getRegionByPostcode).toBeCalledWith(storeCode, postcode);
  });

  it('districts should run properly', async () => {
    const regionId = '1';
    jest.spyOn(dataSources.magento.region, 'getDistricts').mockReturnValue(Promise.resolve({}));
    await districts(_source, { input: { regionId } }, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.region.getDistricts).toBeCalledWith(storeCode, regionId);
  });

  it('subDistricts should run properly', async () => {
    const regionId = '1';
    const districtId = '1';
    jest.spyOn(dataSources.magento.region, 'getSubDistricts').mockReturnValue(Promise.resolve({}));
    await subDistricts(_source, { input: { regionId, districtId } }, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.region.getSubDistricts).toBeCalledWith(storeCode, regionId, districtId);
  });
});
