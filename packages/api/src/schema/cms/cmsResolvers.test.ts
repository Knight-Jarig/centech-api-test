import CmsResolvers from './cmsResolvers';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import { mockCmsPageResponseMDC } from './__mocks__/cms';

jest.mock('../../dataSource/magento/MagentoDataSource');

describe('cms Resolvers', () => {
  const magento = new MagentoDataSource();
  const dataSources = {
    magento,
  };
  const storeCode = 'cds';

  describe(`Query cmsPage`, () => {
    const getV2Wishlists = CmsResolvers.Query.cmsPage as Function;

    const context = {
      dataSources,
      storeCode,
    };

    it(`should call magento get cms page with param expect`, async () => {
      const id = 1;

      jest.spyOn(dataSources.magento.cms, 'getCmsPage').mockReturnValue(Promise.resolve(mockCmsPageResponseMDC));

      await getV2Wishlists(null, { id }, context);
      expect(context.dataSources.magento.cms.getCmsPage).toBeCalledWith(id, storeCode);
    });
  });
});
