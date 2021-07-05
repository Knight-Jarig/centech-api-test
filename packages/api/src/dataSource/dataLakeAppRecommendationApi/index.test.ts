import DataLakeAppRecommendationApi from '.';
import cache from '../../configs/cache';

class DataLakeAppRecommendationApiTest extends DataLakeAppRecommendationApi {
  get() {
    return jest.fn() as any;
  }
}

describe('dataLakeRecommendationApi DataSource', () => {
  const dataLakeAppRecommendation = new DataLakeAppRecommendationApiTest();
  describe('dataLakeRecommendationApi productRecommendationByUser', () => {
    it('productRecommendationByUser with user 1234 and lang th', async () => {
      const lang = 'th';
      const userId = '1234';
      jest.spyOn(dataLakeAppRecommendation, 'get').mockReturnValue(Promise.resolve({} as any));

      await dataLakeAppRecommendation.productRecommendationByUser(lang, userId);
      expect(dataLakeAppRecommendation.get).toBeCalledWith(
        `/users/${userId}`,
        { lang: 'th' },
        { cacheOptions: { ttl: cache.DatatLake.productAssociationBySku } },
      );
    });

    it('productRecommendationByUser with default user and lang', async () => {
      jest.spyOn(dataLakeAppRecommendation, 'get').mockReturnValue(Promise.resolve({} as any));

      await dataLakeAppRecommendation.productRecommendationByUser();
      expect(dataLakeAppRecommendation.get).toBeCalledWith(
        `/users/${'0000'}`,
        { lang: 'th' },
        { cacheOptions: { ttl: cache.DatatLake.productAssociationBySku } },
      );
    });
  });

  describe('dataLakeRecommendationApi willSendRequest', () => {
    it(`willSendRequest should run properly`, async () => {
      dataLakeAppRecommendation.initialize({
        context: {
          bu: 'cds',
        },
      });
      const request = {
        headers: {
          set: jest.fn((name, value) => (request.headers[name] = value)),
        },
      };
      await dataLakeAppRecommendation.willSendRequest(request);
      expect(request.headers.set).toBeCalled();
    });
  });
});
