import * as Sentry from '@sentry/node';
import SentryPlugin from './SentryPlugin';

jest.mock('@sentry/node');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SentryPlugin', () => {
  const sentryPlugin = new SentryPlugin();

  const SentryMockScope = {
    setExtra: jest.fn(),
    setExtras: jest.fn(),
    setTag: jest.fn(),
    setFingerprint: jest.fn(),
    setSpan: jest.fn(),
  };
  (Sentry.withScope as any).mockImplementation(callback => {
    callback(SentryMockScope);
  });

  (Sentry.configureScope as any).mockImplementation(callback => {
    callback(SentryMockScope);
  });

  const SentrySetName = {
    setName: jest.fn(),
  };

  (Sentry.getCurrentHub as any).mockImplementation(callback => {
    return {
      getScope: () => ({
        getTransaction: () => SentrySetName,
      }),
    };
  });

  describe('didEncounterErrors', () => {
    const mockContext = {
      referer: 'web',
      storeCode: 'th',
      requestId: '123',
      requestUsage: [
        {
          request: {
            body: { itemId: 111 },
            headers: null,
          },
          response: {
            data: { message: 'error from MDC' },
          },
        },
      ],
    };
    const mockResponseData = {
      data: JSON.stringify(mockContext.requestUsage[0].response.data),
    };

    it('ApplicationError: Should not call setExtras and setFingerprint', async () => {
      const mockErrors = [
        {
          originalError: { name: 'ApplicationError' },
        },
      ];

      const { didEncounterErrors } = sentryPlugin.requestDidStart() as any;
      didEncounterErrors({
        context: mockContext,
        errors: mockErrors,
      });

      expect(SentryMockScope.setFingerprint).toBeCalledTimes(0);
      expect(SentryMockScope.setExtras).toBeCalledTimes(0);
    });

    it('Should call setExtra and setTag to sentry as expect', async () => {
      const mockErrors = [
        {
          message: '404: Not Found',
          locations: [{ line: 2, column: 3 }],
          path: ['v2DeleteWishListItem'],
          extensions: {
            response: {
              url: 'https://sit-mdc.central.co.th/rest/V1/wishlist-item/7941',
              status: 404,
              statusText: 'Not Found',
              body: { message: 'Wish list item with id "%1" does not exist.', parameters: [7941] },
            },
            fingerprint: 'MagentoWishlistDataSource',
          },
        },
      ];

      const { didEncounterErrors } = sentryPlugin.requestDidStart() as any;
      didEncounterErrors({ context: mockContext, errors: mockErrors });

      expect(typeof didEncounterErrors).toBe('function');
      expect(SentryMockScope.setExtra).toHaveBeenCalledWith('referer', mockContext.referer);
      expect(SentryMockScope.setExtra).toHaveBeenCalledWith('storeCode', mockContext.storeCode);
      expect(SentryMockScope.setExtra).toHaveBeenCalledWith(
        'requestUsage[0][request]',
        mockContext.requestUsage[0].request,
      );
      expect(SentryMockScope.setExtra).toHaveBeenCalledWith('requestUsage[0][response]', mockResponseData);
      expect(SentryMockScope.setTag).toHaveBeenCalledWith('request_id', mockContext.requestId);
      expect(SentryMockScope.setFingerprint).toHaveBeenCalledWith([
        '{{ default }}',
        'v2DeleteWishListItem',
        'MagentoWishlistDataSource',
      ]);
    });

    it('Should not call setExtra requestUsage', async () => {
      const { didEncounterErrors } = sentryPlugin.requestDidStart() as any;
      didEncounterErrors({
        context: {
          ...mockContext,
          requestUsage: null,
        },
        errors: [],
      });

      expect(SentryMockScope.setExtra).not.toHaveBeenCalledWith('requestUsage[0][request]', mockContext.requestUsage);
    });

    it('GraphQLError: Should call setExtra and setTag to sentry as expect', async () => {
      const mockErrors = [
        {
          name: 'GraphQLError',
          message: '404: Not Found',
        },
      ];

      const { didEncounterErrors } = sentryPlugin.requestDidStart() as any;
      didEncounterErrors({ context: mockContext, errors: mockErrors });

      expect(SentryMockScope.setExtras).toHaveBeenCalledWith({});
      expect(Sentry.captureMessage).toHaveBeenCalledWith(`GraphQLWrongQuery: ${mockErrors[0].message}`);
    });
  });

  describe('didResolveOperation', () => {
    it('Should set span to sentry as expect', async () => {
      const requestContext = { operationName: '' };

      const { didResolveOperation } = sentryPlugin.requestDidStart() as any;
      didResolveOperation(requestContext);

      expect(SentryMockScope.setSpan).toHaveBeenCalled();
    });
  });
});
