import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { ApplicationError } from '../../../error/ApplicationError';
import { getAddress } from './AddressTransformer';
import { IV2Address as IAddressResponse } from '../../../types/graphql';

interface AddressUseCaseOptions {
  magento: MagentoDataSource;
}

export class AddressUseCase {
  private storeCode: string;
  private customerToken: string;
  private magento: MagentoDataSource;

  constructor({ magento }: AddressUseCaseOptions) {
    this.magento = magento;
  }

  initialize(config): void {
    this.storeCode = config.context.storeCode;
    this.customerToken = config.context.customerToken;
  }

  async getAddresses(): Promise<IAddressResponse[]> {
    if (!this.customerToken) throw new ApplicationError('no permission');
    const customer = await this.magento.customer.getCustomer(this.storeCode);
    const addresses = customer.addresses.map(address => getAddress(address));
    return addresses;
  }
}
