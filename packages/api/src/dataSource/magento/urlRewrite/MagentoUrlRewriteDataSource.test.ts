import { MagentoUrlRewriteDataSource } from './MagentoUrlRewriteDataSource';
import cache from '../../../configs/cache';

class MagentoUrlRewriteDataSourceTest extends MagentoUrlRewriteDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
}

describe('MagentoUrlRewriteDataSource', () => {
  const MagentoUrlRewriteDataSource = new MagentoUrlRewriteDataSourceTest();

  const params = null;
  const storeCode = 'cds_th';
  const url = 'privacy-policy';

  it(`find function should run properly`, async () => {
    const encodeUrl = encodeURIComponent(url);
    const path = `/${storeCode}/V1/url-rewrite/${encodeUrl}`;
    const init = {
      cacheOptions: { ttl: cache.UrlRewriteApi.find },
    };
    jest.spyOn(MagentoUrlRewriteDataSource, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoUrlRewriteDataSource.find({ url, storeCode });
    expect(MagentoUrlRewriteDataSource.get).toBeCalledWith(path, params, init);
  });

  it(`redirect function should run properly`, async () => {
    const encodeUrl = encodeURIComponent(url);
    const path = `/${storeCode}/V1/mapping-url?requestPath=${encodeUrl}`;
    jest.spyOn(MagentoUrlRewriteDataSource, 'post').mockReturnValue(Promise.resolve({}) as any);
    await MagentoUrlRewriteDataSource.redirect({ url, storeCode });
    expect(MagentoUrlRewriteDataSource.post).toBeCalledWith(path);
  });
});
