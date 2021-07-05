import { ApolloError } from 'apollo-server';
import { ApplicationError } from '../../error/ApplicationError';
import UrlRewriteResolvers from './urlRewriteResolvers';

const mockDataSources = {
  urlRewrite: {
    find: () => new Promise(resolve => resolve(true)),
    redirect: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesCategory = {
  magento: {
    urlRewrite: mockDataSources.urlRewrite,
  },
};

describe('UrlRewriteResolvers', () => {
  const queryUrlRewrite = UrlRewriteResolvers.Query.urlRewrite as Function;
  const queryUrlRedirect = UrlRewriteResolvers.Query.urlRedirect as Function;

  const _source = {};
  const url = 'privacy-policy';
  const dataSources = dataSourcesCategory;
  const storeCode = 'cds_th';

  const err = {
    extensions: {
      response: {
        status: 404,
      },
    },
  };
  const expectedErr = new ApolloError('');

  describe('urlRewrite', () => {
    it('Query urlRewrite should call properly', async () => {
      jest.spyOn(dataSources.magento.urlRewrite, 'find').mockReturnValue(Promise.resolve({}));
      await queryUrlRewrite(_source, { url }, { dataSources, storeCode });
      expect(dataSources.magento.urlRewrite.find).toBeCalledWith({ url, storeCode });
    });

    it('Query urlRewrite throw error', async () => {
      jest.spyOn(dataSources.magento.urlRewrite, 'find').mockImplementation(() => {
        throw new Error();
      });
      expect(async () => await queryUrlRewrite(_source, { url }, { dataSources, storeCode })).rejects.toThrowError(
        new Error(),
      );
    });

    it('Query urlRewrite throw error 404', async () => {
      jest.spyOn(dataSources.magento.urlRewrite, 'find').mockImplementation(() => {
        throw err;
      });
      expect(async () => await queryUrlRewrite(_source, { url }, { dataSources, storeCode })).rejects.toThrowError(
        ApplicationError.create(expectedErr),
      );
    });
  });

  describe('urlRedirect', () => {
    it('Query urlRedirect should call properly', async () => {
      jest.spyOn(dataSources.magento.urlRewrite, 'redirect').mockReturnValue(Promise.resolve({}));
      await queryUrlRedirect(_source, { url }, { dataSources, storeCode });
      expect(dataSources.magento.urlRewrite.redirect).toBeCalledWith({ url, storeCode });
    });

    it('Query urlRedirect throw error', async () => {
      jest.spyOn(dataSources.magento.urlRewrite, 'redirect').mockImplementation(() => {
        throw new Error();
      });
      expect(async () => await queryUrlRedirect(_source, { url }, { dataSources, storeCode })).rejects.toThrowError(
        new Error(),
      );
    });

    it('Query urlRedirect throw error 404', async () => {
      jest.spyOn(dataSources.magento.urlRewrite, 'redirect').mockImplementation(() => {
        throw err;
      });
      expect(async () => await queryUrlRedirect(_source, { url }, { dataSources, storeCode })).rejects.toThrowError(
        ApplicationError.create(expectedErr),
      );
    });
  });
});
