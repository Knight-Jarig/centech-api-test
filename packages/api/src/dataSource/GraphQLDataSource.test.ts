import { GraphQLDataSource } from './GraphQLDataSource';
import configs from '../configs/vars';

class BaseDataSource extends GraphQLDataSource {
  public initialize(config) {
    this.context = config.context;
    this.cache = config.cache;
  }

  mockAddRequestUsage(query, ttl, error, response) {
    this.addRequestUsage(query, ttl, error, response);
  }

  async mockExecuteSingleOperation(operation, config) {
    return await this.executeSingleOperation(operation, config);
  }
}

jest.mock('../configs/vars');

describe('GraphQLDataSource', () => {
  const graphQLDataSource = new BaseDataSource();

  describe('addRequestUsage', () => {
    it('requestUsage with data response : requestUsageResponseEnable is true', () => {
      graphQLDataSource.initialize({
        context: {
          requestUsage: [],
          requestUsageResponseEnable: true,
        },
      });
      const mockQuery = {};
      const mockError = null;
      const mockTtl = 3600;
      const mockResponse = { data: 1 };

      graphQLDataSource.mockAddRequestUsage(mockQuery, mockTtl, mockError, mockResponse);

      const expected = [
        {
          request: {
            url: this.baseURL,
            method: 'POST',
            query: mockQuery,
          },
          response: {
            statusText: 'OK',
            status: 200,
            data: mockResponse,
          },
          ttl: mockTtl,
        },
      ];
      expect(graphQLDataSource.context.requestUsage).toEqual(expected);
    });

    it('requestUsage without data response : requestUsageResponseEnable is false', () => {
      graphQLDataSource.initialize({
        context: {
          requestUsage: [],
          requestUsageResponseEnable: false,
        },
      });
      const mockQuery = {};
      const mockError = null;
      const mockTtl = 3600;
      const mockResponse = { data: 1 };

      graphQLDataSource.mockAddRequestUsage(mockQuery, mockTtl, mockError, mockResponse);

      const expected = [
        {
          request: {
            url: this.baseURL,
            method: 'POST',
            query: mockQuery,
          },
          response: {
            statusText: 'OK',
            status: 200,
          },
          ttl: mockTtl,
        },
      ];
      expect(graphQLDataSource.context.requestUsage).toEqual(expected);
    });

    it('requestUsage without data response : case error', () => {
      graphQLDataSource.initialize({
        context: {
          requestUsage: [],
          requestUsageResponseEnable: false,
        },
      });
      const mockQuery = {};
      const mockError = { statusCode: 404, bodyText: 'Error' };
      const mockTtl = 3600;
      const mockResponse = { data: 1 };

      graphQLDataSource.mockAddRequestUsage(mockQuery, mockTtl, mockError, mockResponse);

      const expected = [
        {
          request: {
            url: this.baseURL,
            method: 'POST',
            query: mockQuery,
          },
          response: {
            statusText: 'Error',
            status: 404,
          },
          ttl: mockTtl,
        },
      ];
      expect(graphQLDataSource.context.requestUsage).toEqual(expected);
    });
  });

  describe('executeSingleOperation', () => {
    it('should return data as expect', async () => {
      const mockData = '123';
      graphQLDataSource.initialize({
        cache: {
          get: jest.fn(() => JSON.stringify(mockData)),
        },
        context: {
          requestUsage: [],
          requestUsageResponseEnable: true,
        },
      });

      configs.redisUrl = 'test';

      const mockOperation = {
        query: {
          kind: 'Document',
          definitions: [],
          loc: {
            start: 0,
            end: 8674,
          },
        },
        variables: {
          store: 'cds',
          locale: 'th',
          pagination: {
            offset: 0,
            size: 1,
          },
          values: ['GRCDS0820010137'],
        },
      };

      const config = { redisUrl: 'local' };

      const result = await graphQLDataSource.mockExecuteSingleOperation(mockOperation, config);

      expect(result).toEqual(mockData);
    });
  });
});
