import { MagentoAddress } from './MagentoAddressResponse';
import { PostCustomerAddressesRequestBody } from './request/PostCustomerAddressesRequestBody';
import { PutCustomerAddressesIdRequestBody } from './request/PutCustomerAddressesIdRequestBody';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoAddressDataSource extends BaseRESTDataSource {
  createMagentoAddress(address: PostCustomerAddressesRequestBody): Promise<MagentoAddress> {
    const path = '/V1/customers/addresses';
    const params = { address };

    return this.post(path, params);
  }

  updateMagentoAddress(address: PutCustomerAddressesIdRequestBody): Promise<MagentoAddress> {
    const path = `/V1/customers/addresses/${address.id}`;
    const params = { address };

    return this.put(path, params);
  }

  getMagentoAddress(addressId: string | number): Promise<MagentoAddress> {
    const path = `/V1/customers/addresses/${addressId}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  deleteMagentoAddress(addressId: string | number): Promise<any> {
    const path = `/V1/addresses/${addressId}`;

    return this.delete(path);
  }
}
