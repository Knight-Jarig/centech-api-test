import { MDCStoreConfig } from '../../schemaV2/types/mdc-store-config';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { IV2Customer } from '../../../types/graphql';
import { getCustomerProfile, t1DataForm, transformToUpdateT1ById } from './CustomerTransformer';
import {
  V2UpdateCustomerT1Input,
  V2UpdateCustomerT1InputById,
} from '../../../dataSource/magento/customer/MagentoCustomerResponse';

interface CustomerUseCaseOptions {
  magento: MagentoDataSource;
}

export class CustomerUseCase {
  private store?: MDCStoreConfig;
  private magento: MagentoDataSource;

  constructor({ magento }: CustomerUseCaseOptions) {
    this.magento = magento;
  }

  initialize(config): void {
    this.store = config.context.store;
  }

  async customer(mdcToken?: string): Promise<IV2Customer> {
    const customer = await this.magento.customer.getCustomer(this.store.code, mdcToken);
    return getCustomerProfile(customer);
  }

  async updateCustomerT1({ customerProfile, t1cNumber, t1ApiVersion }: V2UpdateCustomerT1Input): Promise<IV2Customer> {
    const data = t1DataForm(customerProfile, t1cNumber, t1ApiVersion);
    const customer = await this.magento.customer.update(data);
    return getCustomerProfile(customer);
  }

  async updateCustomerT1ById({
    id,
    customerProfile,
    t1cNumber,
    t1ApiVersion,
  }: V2UpdateCustomerT1InputById): Promise<IV2Customer> {
    const formatted = transformToUpdateT1ById(id, customerProfile, t1cNumber, t1ApiVersion);
    const updatedCustomer = await this.magento.t1passport.updateById(formatted);

    return getCustomerProfile(updatedCustomer);
  }
}
