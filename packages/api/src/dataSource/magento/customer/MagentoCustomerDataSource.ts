import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { RequestOptions } from 'apollo-datasource-rest';

export class MagentoCustomerDataSource extends BaseRESTDataSource {
  getCustomer(storeCode: string, mdcToken = null) {
    if (mdcToken) {
      this.context.customerToken = `Bearer ${mdcToken}`;
    }
    return this.get(`${storeCode}/V1/customers/me`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  update(customer) {
    return this.put('/V1/customers/me', customer);
  }

  changePassword({ currentPassword, newPassword }) {
    return this.put('/V1/customers/me/password', { currentPassword, newPassword });
  }

  willSendRequest(request: RequestOptions): void {
    super.willSendRequest(request);

    request.headers.set('Authorization', this.context.customerToken);
  }
}
