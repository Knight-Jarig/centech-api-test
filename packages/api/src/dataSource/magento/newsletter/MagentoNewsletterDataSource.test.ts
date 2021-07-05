import { MagentoNewsletterDataSource } from './MagentoNewsletterDataSource';

class MagentoNewsletterDataSourceTest extends MagentoNewsletterDataSource {
  post() {
    return jest.fn() as any;
  }
}

describe('MagentoNewsletterDataSource', () => {
  const MagentoNewsletter = new MagentoNewsletterDataSourceTest();
  const storeCode = 'cds_th';
  it(`should call MagentoFlashDeals with expect params`, async () => {
    const email = 'email@example.com';
    const path = `/${storeCode}/V1/guest-subscriber/${email}`;
    jest.spyOn(MagentoNewsletter, 'post').mockReturnValue(Promise.resolve({}) as any);
    await MagentoNewsletter.add({ storeCode, email });
    expect(MagentoNewsletter.post).toBeCalledWith(path, null);
  });

  it(`should call subscribe with expect params`, async () => {
    const email = 'email@example.com';
    const path = `/${storeCode}/V1/newsletter/subscribe`;
    jest.spyOn(MagentoNewsletter, 'post').mockReturnValue(Promise.resolve({}) as any);
    await MagentoNewsletter.subscribe({ storeCode, email });
    expect(MagentoNewsletter.post).toBeCalledWith(path, { email });
  });
});
