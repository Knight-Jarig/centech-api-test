import 'firebase/firestore';
import config from '../configs/vars';
import RequestUsagePlugin from './RequestUsagePlugin';

jest.mock('../configs/vars');

describe('RequestUsagePlugin plugin', () => {
  const requestUsagePlugin = new RequestUsagePlugin();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('requestDidStart: add requestUsage when force-request-usage = 1', async () => {
    const mockRequest = {
      http: {
        headers: {
          get: jest.fn(key => {
            const configs = {
              'x-force-request-usage-enable': '1',
              'x-force-request-usage-token': config.requestUsageToken,
            };
            return configs[key];
          }),
        },
      },
    };
    const mockResponse = {
      extensions: { requestUsage: [] },
    };
    const mockContext = {
      requestUsageEnable: true,
      requestUsage: [{ a: 1 }],
    };

    const { willSendResponse } = requestUsagePlugin.requestDidStart() as any;
    willSendResponse({ context: mockContext, response: mockResponse, request: mockRequest });

    expect(typeof willSendResponse).toBe('function');
    expect(mockResponse.extensions.requestUsage).toEqual(mockContext.requestUsage);
  });

  it('requestDidStart: no added requestUsage when force-request-usage = 0', async () => {
    const mockRequest = {
      http: {
        headers: {
          get: jest.fn(key => {
            const configs = {
              'x-force-request-usage-enable': '0',
              'x-force-request-usage-token': config.requestUsageToken,
            };
            return configs[key];
          }),
        },
      },
    };
    const mockResponse = {
      extensions: { requestUsage: [] },
    };
    const mockContext = {
      requestUsage: [{ a: 1 }],
    };

    const { willSendResponse } = requestUsagePlugin.requestDidStart() as any;
    willSendResponse({ context: mockContext, response: mockResponse, request: mockRequest });

    expect(typeof willSendResponse).toBe('function');
    expect(mockResponse.extensions.requestUsage).toEqual([]);
  });
});
