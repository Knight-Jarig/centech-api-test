import { MagentoContactDataSource } from './MagentoContactDataSource';

class MagentoContactDataSourceTest extends MagentoContactDataSource {
  post() {
    return jest.fn() as any;
  }
}

describe('MagentoContactBlockDataSource', () => {
  const MagentoContact = new MagentoContactDataSourceTest();
  const storeCode = 'cds_th';
  it(`should call contactUs with expect params`, async () => {
    const contact = 1;
    const path = `/${storeCode}/V1/contact`;

    jest.spyOn(MagentoContact, 'post').mockReturnValue(Promise.resolve({}) as any);
    await MagentoContact.contactUs(contact, storeCode);
    expect(MagentoContact.post).toBeCalledWith(path, { contact });
  });
});
