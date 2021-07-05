import { InstagramDataSource } from './InstagramDataSource';
import { ApplicationError } from '../../error/ApplicationError';
class InstagramDataSourceTest extends InstagramDataSource {
  get() {
    return jest.fn() as any;
  }
  getAccessToken() {
    return jest.fn() as any;
  }
}
describe('InstagramDataSource', () => {
  const instagramDataSource = new InstagramDataSourceTest();
  it('Should it fetch posts from instagram account in case of no token', async () => {
    expect(async () => await instagramDataSource.getPosts()).rejects.toThrowError(
      new ApplicationError(`Token is mandatory field`),
    );
  });
});