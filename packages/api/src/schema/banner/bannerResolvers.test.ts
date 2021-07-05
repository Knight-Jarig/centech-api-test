import BannerResolver from './bannerResolvers';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';

jest.mock('../../dataSource');
jest.mock('../../dataSource/magento/MagentoDataSource');
jest.mock('./bannerUtils');
describe('Banner Resolvers', () => {
  const magentoDataSource = new MagentoDataSource();
  const dataSources = {
    magento: magentoDataSource,
  };
  describe(`Query: Banner`, () => {
    it(`Banner with not shuffle`, async () => {
      const banner = BannerResolver.Query.banner as Function;
      const input = {
        filterGroups: [
          {
            filters: {
              field: 'name',
              value: 'homepage_hero_banner',
            },
          },
        ],
      };
      jest.spyOn(dataSources.magento.banner, 'find').mockReturnValue(Promise.resolve([] as any));
      await banner(null, { input }, { dataSources });
      expect(dataSources.magento.banner.find).toHaveBeenCalled();
    });

    it(`Banner with shuffle banner`, async () => {
      const banner = BannerResolver.Query.banner as Function;
      const input = {
        filterGroups: [
          {
            filters: {
              field: 'name',
              value: 'homepage_hero_banner',
            },
          },
        ],
      };
      jest.spyOn(dataSources.magento.banner, 'find').mockReturnValue(
        Promise.resolve([{
          is_random_order_image: true,
        }] as any),
      );
      await banner(null, { input }, { dataSources });
      expect(dataSources.magento.banner.find).toHaveBeenCalled();
    });
  });
});
