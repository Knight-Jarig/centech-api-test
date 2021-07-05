import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoContactDataSource extends BaseRESTDataSource {
  contactUs(contact, storeCode) {
    return this.post(`/${storeCode}/V1/contact`, { contact });
  }
}
