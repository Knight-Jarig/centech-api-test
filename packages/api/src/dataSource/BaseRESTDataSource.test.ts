import { BaseRESTDataSource } from './BaseRESTDataSource';
import { Headers, Request, Response } from 'apollo-server-env';
import configs from '../configs/vars';

jest.mock('../configs/vars');

class BaseDataSource extends BaseRESTDataSource {
  mockAddRequestUsage(request, response, responseBody = null) {
    this.addRequestUsage(request, response, responseBody);
  }

  async mockDidReceiveResponse(request, response) {
    return await this.didReceiveResponse(request, response);
  }

  async mockErrorFromResponse(request, response?) {
    return await this.errorFromResponse(request, response);
  }
}

describe('BaseRESTDataSource', () => {
  const baseRESTDataSource = new BaseDataSource();

  describe('addRequestUsage', () => {
    it('requestUsage with data response : no cache', () => {
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
          requestUsageResponseEnable: true,
        },
      });

      const mockRawBody = '';
      const mockData = { data: 1 };
      const mockRequest = {
        url: 'url',
        method: 'GET',
        body: mockRawBody,
        headers: new Headers({}),
      };

      const mockResponse = {
        url: 'url',
        statusText: 'success',
        status: 200,
      };

      baseRESTDataSource.mockAddRequestUsage(mockRequest, mockResponse, mockData);

      const expected = [
        {
          request: {
            url: mockRequest.url,
            method: mockRequest.method,
            headers: {},
            body: {},
          },
          response: {
            status: 200,
            statusText: 'success',
            data: mockData,
          },
          ttl: undefined,
        },
      ];
      expect(baseRESTDataSource.context.requestUsage).toEqual(expected);
    });

    it('requestUsage with data response : with cache', () => {
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
          requestUsageResponseEnable: true,
        },
      });

      const mockRawBody = '';
      const mockRequest = {
        url: 'url',
        method: 'GET',
        body: mockRawBody,
        headers: new Headers({}),
      };

      const mockResponse = {
        statusText: 'success',
        status: 200,
      };

      baseRESTDataSource.mockAddRequestUsage(mockRequest, mockResponse);

      const expected = [
        {
          request: {
            url: mockRequest.url,
            method: mockRequest.method,
            headers: {},
            body: {},
          },
          response: {
            status: 200,
            statusText: 'CACHE',
            data: null,
          },
          ttl: undefined,
        },
      ];
      expect(baseRESTDataSource.context.requestUsage).toEqual(expected);
    });

    it('requestUsage without data response when requestUsageResponseEnable is false', () => {
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
          requestUsageResponseEnable: false,
        },
      });

      const mockRawBody = '';
      const mockData = { data: 1 };
      const mockRequest = {
        url: 'url',
        method: 'GET',
        body: mockRawBody,
        headers: new Headers({}),
      };

      const mockResponse = {
        url: 'url',
        statusText: 'success',
        status: 200,
      };

      baseRESTDataSource.mockAddRequestUsage(mockRequest, mockResponse, mockData);

      const expected = [
        {
          request: {
            url: mockRequest.url,
            method: mockRequest.method,
            headers: {},
            body: {},
          },
          response: {
            status: 200,
            statusText: 'success',
          },
          ttl: undefined,
        },
      ];
      expect(baseRESTDataSource.context.requestUsage).toEqual(expected);
    });
  });

  describe('didReceiveResponse', () => {
    it('should return data as expect', async () => {
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
        },
      });

      const mockData = '123';
      const mockRequest = new Request('', { method: 'GET' });
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        url: 'url',
        statusText: 'success',
        headers: new Headers({ 'Content-Type': 'application/json', 'Content-Length': '3' }),
      });

      const result = await baseRESTDataSource.mockDidReceiveResponse(mockResponse, mockRequest);
      expect(result).toEqual(mockData);
    });
  });

  describe('errorFromResponse', () => {
    it('should return error as expect', async () => {
      const mockDataResponse = { message: `Can't check requested quantity for products without Source Items support.` };
      const mockResponse = new Response(JSON.stringify(mockDataResponse), {
        status: 404,
        url: 'url',
        statusText: 'Not found',
      });
      const mockResult = {
        extensions: {
          response: {
            body: mockDataResponse,
          },
        },
      };

      const result = await baseRESTDataSource.mockErrorFromResponse(mockResponse, mockDataResponse);
      expect(result.name).toEqual('Error');
      expect(JSON.parse(JSON.stringify(result))).toMatchObject(JSON.parse(JSON.stringify(mockResult)));
    });
    it('should return error 401', async () => {
      const mockDataResponse = { message: 'Unauthorized' };
      const mockResponse = new Response(JSON.stringify(mockDataResponse), {
        status: 401,
        url: 'url',
        statusText: 'Unauthorized',
      });

      const result = await baseRESTDataSource.mockErrorFromResponse(mockResponse, mockDataResponse);
      expect(result.name).toEqual('AuthenticationError');
    });

    it('should return error 403', async () => {
      const mockDataResponse = { message: 'FORBIDDEN' };
      const mockResponse = new Response(JSON.stringify(mockDataResponse), {
        status: 403,
        url: 'url',
        statusText: 'FORBIDDEN',
      });

      const result = await baseRESTDataSource.mockErrorFromResponse(mockResponse, mockDataResponse);
      expect(result.name).toEqual('ForbiddenError');
    });
  });

  describe('setCacheOptions', () => {
    it('cache is falsy with sit - header no-cache', async () => {
      configs.appEnv = 'sit';
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
          headers: {
            'cache-control': 'no-cache',
          },
        },
      });

      const mockRequest = {
        cacheOptions: { ttl: 300 },
        headers: {
          set: jest.fn(),
        },
      };
      baseRESTDataSource.setCacheOptions(mockRequest);
      expect(mockRequest.cacheOptions.ttl).toBeFalsy();
    });

    it('cache is truthy with sit - no header', async () => {
      configs.appEnv = 'sit';
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
          headers: {},
        },
      });

      const mockRequest = {
        cacheOptions: { ttl: 300 },
        headers: {
          set: jest.fn(),
        },
      };
      baseRESTDataSource.setCacheOptions(mockRequest);
      expect(mockRequest.cacheOptions.ttl).toBeTruthy();
    });

    it('cache is truthy with uat - no header', async () => {
      configs.appEnv = 'uat';
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
          headers: {},
        },
      });

      const mockRequest = {
        cacheOptions: { ttl: 300 },
        headers: {
          set: jest.fn(),
        },
      };
      baseRESTDataSource.setCacheOptions(mockRequest);
      expect(mockRequest.cacheOptions.ttl).toBeTruthy();
    });

    it('cache is truthy with uat - header no-cache', async () => {
      configs.appEnv = 'uat';
      baseRESTDataSource.initialize({
        context: {
          requestUsage: [],
          headers: {
            'cache-control': 'no-cache',
          },
        },
      });

      const mockRequest = {
        cacheOptions: { ttl: 300 },
        headers: {
          set: jest.fn(),
        },
      };
      baseRESTDataSource.setCacheOptions(mockRequest);
      expect(mockRequest.cacheOptions.ttl).toBeTruthy();
    });
  });
});
