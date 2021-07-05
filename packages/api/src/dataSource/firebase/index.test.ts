import firebase from 'firebase';
import 'firebase/firestore';
import config from '../../configs/vars';
import { Firebase } from './';

jest.mock('../../configs/vars');

describe('Firebase DataSource', () => {
  const dataSource = new Firebase();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initializeApp when 1st time', async () => {
    jest.spyOn(firebase, 'initializeApp');

    dataSource.initialize({
      context: null,
    });

    expect(firebase.initializeApp).toBeCalled();
  });

  it('not initializeApp when 2nd time', async () => {
    jest.spyOn(firebase, 'initializeApp');
    firebase.apps.push('MOCK' as any);

    dataSource.initialize({
      context: null,
    });

    expect(firebase.initializeApp).not.toBeCalled();
  });

  it('not initializeApp when dont have key', async () => {
    jest.spyOn(firebase, 'initializeApp');
    config.firebase.apiKey = '';
    dataSource.initialize({
      context: null,
    });

    expect(firebase.initializeApp).not.toBeCalled();
  });

  it('getFireStore', async () => {
    dataSource.initialize({
      context: null,
    });

    const fireStore = dataSource.getFireStore();
    expect(fireStore).toBeInstanceOf(firebase.firestore.Firestore);
  });

  it('get data with redis cache', async () => {
    const mockResult = {
      data: 'MOCK_VALUE',
    };
    dataSource.initialize({
      context: {
        requestUsage: [],
        redisClient: {
          get: jest.fn().mockReturnValue(JSON.stringify(mockResult)),
        },
      },
    });

    const result = await dataSource.getData('collection', 'doc');
    const cacheKey = dataSource.withCachePrefix(`collection:doc`);
    expect(dataSource.context.redisClient.get).toBeCalledWith(cacheKey);
    expect(dataSource.context.requestUsage.length).toBeGreaterThan(0);
    expect(result).toEqual(mockResult);
  });

  it('get data without redis cache', async () => {
    const mockValue = {
      data: 'MOCK_VALUE',
    };
    const mockResult = {
      exists: true,
      data: () => mockValue,
    };
    dataSource.initialize({
      context: {
        requestUsage: [],
        redisClient: {
          get: jest.fn().mockReturnValue(Promise.resolve(null)),
          set: jest.fn().mockReturnValue(Promise.resolve()),
        },
      },
    });
    jest.spyOn(dataSource, 'getFireStore').mockReturnValue({
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue(Promise.resolve(mockResult)),
        }),
      }),
    } as any);

    const result = await dataSource.getData('collection', 'doc');
    const cacheKey = dataSource.withCachePrefix(`collection:doc`);
    const firestore = dataSource.getFireStore();
    expect(firestore.collection).toBeCalledWith('collection');
    expect(dataSource.context.redisClient.get).toBeCalledWith(cacheKey);
    expect(firestore.collection('collection').doc).toBeCalledWith('doc');
    expect(firestore.collection('collection').doc('doc').get).toBeCalled();
    expect(dataSource.context.requestUsage.length).toBeGreaterThan(0);
    expect(dataSource.context.redisClient.set).toBeCalledWith(cacheKey, JSON.stringify(mockValue), { ttl: 3600 });
    expect(result).toEqual(mockValue);
  });

  it('addRequestUsageData', async () => {
    dataSource.initialize({
      context: {
        requestUsage: [],
        requestUsageResponseEnable: true,
      },
    });

    const mockRequest = {};
    const mockResponse = {
      statusText: 'FROM CACHE',
      status: 200,
    };
    const mockTtl = 3600;
    const responseData = { data: 1 };

    dataSource.addRequestUsageData(mockRequest, mockResponse, mockTtl, responseData);

    const expected = [
      {
        request: {},
        response: {
          statusText: mockResponse.statusText,
          status: mockResponse.status,
          data: responseData,
        },
        ttl: mockTtl,
      },
    ];
    expect(dataSource.context.requestUsage).toEqual(expected);
  });
});
