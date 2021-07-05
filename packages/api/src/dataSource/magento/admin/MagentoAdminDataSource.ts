import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoAdminDataSource extends BaseRESTDataSource {
  restoreShippingAssignment(cartId): Promise<any> {
    const path = `/V1/carts/${cartId}/restore-shipping-assignment`;
    const init = {
      headers: {
        Authorization: `Bearer ${this.context.token}`,
      },
    };
    return this.get(path, {}, init);
  }

  requestAdminToken(username: string, password: string): Promise<any> {
    const path = `/V1/integration/admin/token`;
    const payload = {
      username,
      password,
    };
    return this.post(path, payload);
  }
}
