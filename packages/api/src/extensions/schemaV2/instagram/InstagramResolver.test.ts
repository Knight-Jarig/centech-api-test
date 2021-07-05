import { ApolloError } from 'apollo-server';
import { ApplicationError } from '../../../error/ApplicationError';
import { InstagramResolvers } from './InstagramResolver';
import { createDataSources } from '../../../dataSource/';

const err = {
  extensions: {
    response: {
      status: 404,
    },
  },
};
const expectedErr = new ApolloError('');

describe('Instagram Resolvers', () => {
    const dataSources = createDataSources();
    dataSources.instagramUseCase = {
      v2InstagramPosts: jest.fn()
    } as any;
    describe(`Query: Instagram`, () => {
        const v2GetInstagram = InstagramResolvers.Query.v2GetInstagramPosts as Function;
        it(`Query: v2GetInstagramPosts`, async () => {
            await v2GetInstagram(null, {}, { dataSources });
            expect(dataSources.instagramUseCase.v2InstagramPosts).toHaveBeenCalled();
        });
        it('v2GetInstagramPosts throw error', async () => {
          jest.spyOn(dataSources.instagramUseCase, 'v2InstagramPosts').mockImplementation(() => {
            throw new Error();
          });
          expect(async () => await v2GetInstagram(null, {}, { dataSources })).rejects.toThrowError(
            new Error(),
          );
        });
        it('v2GetInstagramPosts throw error 404', async () => {
          jest.spyOn(dataSources.instagramUseCase, 'v2InstagramPosts').mockImplementation(() => {
            throw err;
          });
          expect(async () => await v2GetInstagram(null, {}, { dataSources })).rejects.toThrowError(
            ApplicationError.create(expectedErr),
          );
        });
      
    });
});
