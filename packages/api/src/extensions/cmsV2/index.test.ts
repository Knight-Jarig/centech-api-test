import { typeDef, resolver } from './index';
import { createDataSources } from '../../dataSource';
import { ApplicationError } from '../../error/ApplicationError';

import { cmsMobileResultMock } from './__mocks__/cmsV2';

jest.mock('../../dataSource');

describe('cmsV2', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe(`Query: cms`, () => {
    const cms = resolver.Query.cms as Function;
    const context = {
      dataSources: createDataSources(),
      storeCode: 'th',
    };

    it('getCmsV2 should have to be called with expect input', async () => {
      const input = {
        filter: { identifier: 'homepage_flash_sales', url_key: '' },
      };

      jest.spyOn(context.dataSources.cms, 'getCmsV2').mockReturnValue(Promise.resolve({} as any));

      await cms(null, input, context);

      expect(context.dataSources.cms.getCmsV2).toBeCalledWith({
        identifier: input.filter.identifier,
        url_key: input.filter.url_key,
        storeCode: context.storeCode,
      });
    });

    it('should throw error', async () => {
      const input = {
        filter: { identifier: 'homepage_flash_sales', url_key: '' },
      };

      jest.spyOn(context.dataSources.cms, 'getCmsV2').mockImplementation(() => {
        throw new Error();
      });

      expect(async () => await cms(null, input, context)).rejects.toThrowError(new Error());
    });

    it('should throw error with status 404', async () => {
      const input = {
        filter: { identifier: 'homepage_flash_sales', url_key: '' },
      };

      const error = {
        message: 'error 404',
        extensions: {
          response: { status: 404 },
        },
      } as any;

      jest.spyOn(context.dataSources.cms, 'getCmsV2').mockImplementation(() => {
        throw error;
      });

      await expect(cms(null, input, context)).rejects.toEqual(ApplicationError.create(error));
    });
  });

  describe(`Query: cmsMobile`, () => {
    const cmsMobile = resolver.Query.cmsMobile as Function;
    const context = {
      dataSources: createDataSources(),
      storeCode: 'th',
    };

    it('getCmsV2Mobile should have to be called with expect input', async () => {
      const input = {
        filter: { identifier: 'homepage_flash_sales', url_key: '' },
      };

      jest
        .spyOn(context.dataSources.cms, 'getCmsV2Mobile')
        .mockReturnValue(Promise.resolve(cmsMobileResultMock as any));

      await cmsMobile(null, input, context);

      expect(context.dataSources.cms.getCmsV2Mobile).toBeCalledWith({
        identifier: input.filter.identifier,
        url_key: input.filter.url_key,
        storeCode: context.storeCode,
      });
    });

    it('should throw error when status != successful', async () => {
      const input = {
        filter: { identifier: 'homepage_flash_sales', url_key: '' },
      };

      jest
        .spyOn(context.dataSources.cms, 'getCmsV2Mobile')
        .mockReturnValue(Promise.resolve({ status: 'failed' } as any));

      await expect(async () => await cmsMobile(null, input, context)).rejects.toEqual(new Error('Fetch CMS failed!'));
    });

    it('should throw error', async () => {
      const input = {
        filter: { identifier: 'homepage_flash_sales', url_key: '' },
      };

      jest.spyOn(context.dataSources.cms, 'getCmsV2Mobile').mockImplementation(() => {
        throw new Error();
      });

      expect(async () => await cmsMobile(null, input, context)).rejects.toThrowError(new Error());
    });

    it('should throw error with status 404', async () => {
      const input = {
        filter: { identifier: 'homepage_flash_sales', url_key: '' },
      };

      const error = {
        message: 'error 404',
        extensions: {
          response: { status: 404 },
        },
      } as any;

      jest.spyOn(context.dataSources.cms, 'getCmsV2Mobile').mockImplementation(() => {
        throw error;
      });

      await expect(cmsMobile(null, input, context)).rejects.toEqual(ApplicationError.create(error));
    });
  });
});
