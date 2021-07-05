import { typeDef, resolver } from './index';

const mockDataSources = {
  cms: {
    getCmsV2: () => new Promise(resolve => resolve(true)),
    getCmsV2Mobile: () => new Promise(resolve => resolve(true))
  },
};

const dataSourcesOrder = {
  cms: mockDataSources.cms,
};

describe('cmsV2', () => {
  const cmsResolver = resolver.Query.cms as Function;
  const cmsMobileResolver = resolver.Query.cmsMobile as Function;
  const _source = {};
  const dataSources = dataSourcesOrder;
  const params = {
    filter: { 
      identifier: "test_iden",
      url_key: "test_url" 
    } 
  };
  it('cmsResolver should run properly', async () => {
    jest.spyOn(dataSources.cms, 'getCmsV2').mockReturnValue(Promise.resolve([]));
    await cmsResolver(_source, params, { dataSources });
    expect(dataSources.cms.getCmsV2).toBeCalledWith(params.filter);
  });

  it('cmsMobileResolver should run properly', async () => {
    jest.spyOn(dataSources.cms, 'getCmsV2Mobile').mockReturnValue(Promise.resolve({status: 'successful',cms_list: []}));
    await cmsMobileResolver(_source, params, { dataSources, storeCode: 'th'});
    const paramsMobile = {
      identifier: "test_iden",
      url_key: "test_url",
      storeCode: "th"
    }
    expect(dataSources.cms.getCmsV2Mobile).toBeCalledWith(paramsMobile);
  });
});
