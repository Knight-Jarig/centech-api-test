import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { ApplicationError } from '../../../error/ApplicationError';
import { MDCStoreConfig } from '../types/mdc-store-config';
import { transformOrder, mapInputFilters, mapInputSorts } from './OrderTransformer';
import {
  IV2FilterInputCondition as IFilterInputCondition,
  IV2OrderInput as IOrderInput,
  IV2Order as IOrder,
  IV2OrderFilterQueryInput as IOrderFilterQueryInput,
  IV2OrderResult as IOrderResult,
} from '../../../types/graphql';
import { MagentoOrder } from '../../../dataSource/magento/order/MagentoOrderTypes';

interface OrderUseCaseOptions {
  magento: MagentoDataSource;
}

export class OrderUseCase {
  private storeCode: string;
  private customerToken: string;
  private magento: MagentoDataSource;
  private store: MDCStoreConfig;
  private orders: MagentoOrder[];

  constructor({ magento }: OrderUseCaseOptions) {
    this.magento = magento;
  }

  initialize(config): void {
    this.storeCode = config.context.storeCode;
    this.customerToken = config.context.customerToken;
    this.store = config.context.store;
  }

  async fetchOrderPackage(incrementId) {
    if (!this.orders) throw new ApplicationError('Orders do not exist');
    return {
      packages: await this.magento.order.fetchOrderPackageStatus(incrementId, this.storeCode),
      orders: this.orders
    };
  }

  async getOrder(input: IOrderInput): Promise<IOrder> {
    const customerFilter =
      !this.customerToken && input.email
        ? {
            id: 'customer_email',
            optionIds: [input.email],
            condition: IFilterInputCondition.Eq,
          }
        : await this.getOrderCustomerFilter();

    const filterGroups = mapInputFilters([
      customerFilter,
      {
        id: 'increment_id',
        optionIds: [input.incrementId],
        condition: IFilterInputCondition.Eq,
      },
    ]);

    const filter = {
      page: 1,
      size: 1,
      filterGroups,
    };

    const data = await this.magento.order.search(filter, this.storeCode);
    this.orders = data.items;

    if (this.orders.length === 0) return null;

    return transformOrder(this.orders[0]);
  }

  async getOrders(input: IOrderFilterQueryInput): Promise<IOrderResult> {
    const customerFilter = await this.getOrderCustomerFilter();
    const filters = input?.filters || [];
    const filterGroups = mapInputFilters([...filters, customerFilter]);
    const sortOrders = mapInputSorts(input.sorts);

    const filter = {
      page: input.page,
      size: input.limit,
      filterGroups,
      sortOrders,
    };

    const serachPackage = await this.magento.order.search(filter, this.storeCode);
    this.orders = serachPackage.items;
    const totalCount = serachPackage.total_count;

    return {
      orders: this.orders.map(order => transformOrder(order)),
      totalCount,
    };
  }

  private async getOrderCustomerFilter() {
    try {
      if (!this.customerToken) throw new Error();
      const customer = await this.magento.customer.getCustomer(this.storeCode);
      if (!customer) throw new Error();

      return {
        id: 'customer_id',
        optionIds: [customer.id],
        condition: IFilterInputCondition.Eq,
      };
    } catch {
      throw new ApplicationError("you don't have permission to view this order");
    }
  }
}
