import { InstagramUseCase } from './InstagramUseCase';
import { InstagramDataSource } from '../../../dataSource/instagram/InstagramDataSource';
import { rawPosts, posts, rawPostsEmpty } from './__mocks__/instagram';

describe('InstagramUseCase', () => {
  const instagram = new InstagramDataSource();
  const instagramUseCase = new InstagramUseCase({ instagram });
  const context = {
    bu: 'cds',
    store: 'cds_th',
    locale: 'th',
  };
  instagramUseCase.initialize({ context });
  it('Should get instagram post', async () => {
    jest.spyOn(instagram, 'getPosts').mockReturnValue(Promise.resolve(rawPosts) as any);
    const result = await instagramUseCase.v2InstagramPosts();
    expect(result).toEqual(posts);
  });
  it('Should get instagram post empty', async () => {
    jest.spyOn(instagram, 'getPosts').mockReturnValue(Promise.resolve(rawPostsEmpty) as any);
    const result = await instagramUseCase.v2InstagramPosts();
    expect(result).toEqual([]);
  });
});
