import { CmsDataSource } from './CmsDataSource';
import configs from '../../configs/vars';

jest.mock('../../configs/vars');
jest.mock('../../utils/aws.utils');

class CmsDataSourceTest extends CmsDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('CmsDataSource', () => {
  const cmsDataSource = new CmsDataSourceTest();
  cmsDataSource.initialize({
    context: {
      bu: 'cds',
    },
  });

  it('getCms', async () => {
    jest.spyOn(cmsDataSource, 'get').mockReturnValue(Promise.resolve({} as any));
    const cmsInput = {
      identifier: 'test_identifier',
      url_key:'url_test'
    };
    const cms = await cmsDataSource.getCms(cmsInput);
    expect(cms).toEqual({});
  });

  it('getCmsV2', async () => {
    jest.spyOn(cmsDataSource, 'get').mockReturnValue(Promise.resolve({} as any));
    const cmsInput = {
      identifier: 'test_identifier',
      url_key:'url_test'
    };
    const cms = await cmsDataSource.getCmsV2(cmsInput);
    expect(cms).toEqual({});
  })
  
  it('getCmsV2Mobile', async () => {
    jest.spyOn(cmsDataSource, 'get').mockReturnValue(Promise.resolve({} as any));
    const cmsInput = {
      identifier: 'test_identifier',
      url_key:'url_test'
    };
    const cms = await cmsDataSource.getCmsV2Mobile(cmsInput);
    expect(cms).toEqual({});
  })

});
