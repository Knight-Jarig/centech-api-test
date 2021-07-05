import DataLakeRecommendationApi from '.';
import cache from '../../configs/cache';

class DataLakeRecommendationApiTest extends DataLakeRecommendationApi {
  get() {
    return jest.fn() as any;
  }
}

describe('dataLakeRecommendationApi DataSource', () => {
  const dataLakeRecommendation = new DataLakeRecommendationApiTest();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`willSendRequest should run properly`, async () => {
    dataLakeRecommendation.initialize({
      context: {},
    });
    const request = {
      headers: {
        set: jest.fn((name, value) => (request.headers[name] = value)),
      },
    };
    await dataLakeRecommendation.willSendRequest(request);
    expect(request.headers.set).toBeCalled();
  });

  it('productRecommendationBySku', async () => {
    const lang = 'th';
    const sku = '1234';
    jest.spyOn(dataLakeRecommendation, 'get').mockReturnValue(Promise.resolve({} as any));

    await dataLakeRecommendation.productRecommendationBySku(lang, sku);
    expect(dataLakeRecommendation.get).toBeCalledWith(
      `/products/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productRecommendationHomepage } },
    );
  });

  it('productRecommendationByUser', async () => {
    const lang = 'th';
    const userId = '1234';
    jest.spyOn(dataLakeRecommendation, 'get').mockReturnValue(Promise.resolve({} as any));

    await dataLakeRecommendation.productRecommendationByUser(lang, userId);
    expect(dataLakeRecommendation.get).toBeCalledWith(
      `/users/${userId}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productRecommendationByUser } },
    );
  });

  it('productAssociationBySku', async () => {
    const lang = 'th';
    const sku = '1234';
    jest.spyOn(dataLakeRecommendation, 'get').mockReturnValue(Promise.resolve({} as any));

    await dataLakeRecommendation.productAssociationBySku(lang, sku);
    expect(dataLakeRecommendation.get).toBeCalledWith(
      `/products/association/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productAssociationBySku } },
    );
  });

  it('productSimilarBySku', async () => {
    const lang = 'th';
    const sku = '1234';
    jest.spyOn(dataLakeRecommendation, 'get').mockReturnValue(Promise.resolve({} as any));

    await dataLakeRecommendation.productSimilarBySku(lang, sku);
    expect(dataLakeRecommendation.get).toBeCalledWith(
      `/products/similarity/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productSimilarBySku } },
    );
  });

  it('productAssociationViewBySku', async () => {
    const lang = 'th';
    const sku = '1234';
    jest.spyOn(dataLakeRecommendation, 'get').mockReturnValue(Promise.resolve({} as any));

    await dataLakeRecommendation.productAssociationViewBySku(lang, sku);
    expect(dataLakeRecommendation.get).toBeCalledWith(
      `/products/association-view/${sku}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.productAssociationViewBySku } },
    );
  });
});
