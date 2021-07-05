import { ResolverContext } from '../../types';
import { extendItemsOfListWithProductInformation } from '../../utils/product.utils';
import get from 'lodash/get';
import map from 'lodash/map';
import { explode } from '../../utils/attribute.utils';
import productModel from '../../transform/product.model';
import orderModel from '../../transform/order.model';
import { encrypt } from '../../utils/crypto.utils';
import {
  IBillingAddressResolvers,
  IOrder,
  IOrderItemResolvers,
  IOrders,
  IProduct,
  IQueryResolvers,
  IShippingAddressResolvers,
} from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';

// TODO : deprecate this function, use extensions instead
async function getChildrenOrders({ childrenOrderId, dataSources, storeCode }) {
  if (childrenOrderId.length > 0) {
    const filterChildrenOrderParams = {
      filterGroups: [
        {
          filters: [{ field: 'entity_id', value: childrenOrderId.toString(), conditionType: 'in' }],
        },
      ],
      page: 1,
      size: 0,
    };
    const childOrders = await dataSources.magento.order.search(filterChildrenOrderParams as any, storeCode);
    return childOrders?.items || [];
  }
}

const OrderItem: IOrderItemResolvers<ResolverContext> = {
  async product(_source, data, { dataSources, storeCode }): Promise<IProduct> {
    const sku = _source.sku;
    const product = await dataSources.magento.product.findBySku({ storeCode, sku });
    return productModel.transform(product);
  },
};

const custom_attributes = (_source, { filter }): Record<string, any> => {
  const data = explode(get(_source, 'extension_attributes'));
  let customAttributes = {};
  map(filter, arg => {
    customAttributes = {
      ...customAttributes,
      [arg]: get(data, `custom_attributes.${arg}`, ''),
    };
  });
  return customAttributes;
}

const BillingAddress: IBillingAddressResolvers<ResolverContext> = {
  custom_attributes,
};

const ShippingAddress: IShippingAddressResolvers<ResolverContext> = {
  custom_attributes,
};

const Query: IQueryResolvers<ResolverContext> = {
  async orderByIncrementId(_source, { incrementId, key }, { dataSources, storeCode, customerToken }) {
    if (!incrementId) throw new Error('incrementId is requred.');
    if (!key) throw new ApplicationError('you dont have permission to view this order.');
    if (encrypt(incrementId) !== key) throw new ApplicationError('you dont have permission to view this order.');

    const filterParams: any = {
      filterGroups: [
        {
          filters: [{ field: 'increment_id', value: incrementId }],
        },
      ],
      page: 1,
      size: 1,
    };

    if (customerToken) {
      const customer = await dataSources.magento.customer.getCustomer(storeCode);
      filterParams.filterGroups.push({
        filters: [{ field: 'customer_id', value: customer.id }],
      });
    } else {
      filterParams.filterGroups.push({
        filters: [{ field: 'customer_is_guest', value: '1' }],
      });
    }

    const orders: any = await dataSources.magento.order.search(filterParams, storeCode);
    const selectedOrder = orders?.items?.[0];

    if (!selectedOrder) return null;

    const childrenOrderId = selectedOrder?.extension_attributes?.order_children_ids || [];

    // TODO : deprecate this function, use extensions instead
    selectedOrder.extension_attributes.order_children_items = getChildrenOrders({
      childrenOrderId,
      dataSources,
      storeCode,
    });

    return orderModel.transform(selectedOrder);
  },
  async orderByEmail(_source, { incrementId, email }, { dataSources, storeCode }) {
    const filterParams: any = {
      filterGroups: [
        {
          filters: [{ field: 'increment_id', value: incrementId }],
        },
        {
          filters: [{ field: 'customer_email', value: email }],
        },
      ],
      page: 1,
      size: 0,
    };

    const orders: any = await dataSources.magento.order.search(filterParams, storeCode);
    const selectedOrder = orders?.items?.[0];

    if (!selectedOrder) return null;

    const childrenOrderId = selectedOrder?.extension_attributes?.order_children_ids || [];

    // TODO : deprecate this function, use extensions instead
    selectedOrder.extension_attributes.order_children_items = getChildrenOrders({
      childrenOrderId,
      dataSources,
      storeCode,
    });

    return orderModel.transform(selectedOrder);
  },
  async orders(_source, { filter }, { dataSources, storeCode, customerToken }): Promise<IOrders> {
    if (!customerToken) throw new ApplicationError('you dont have permission to view this order');
    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    if (!customer) throw new ApplicationError('you dont have permission to view this order');
    filter.filterGroups.push({ filters: [{ field: 'customer_id', value: customer.id }] });

    const response: any = await dataSources.magento.order.search(filter as any, storeCode);
    const items = response.items?.map(orderModel.transform);
    response.items = items;
    return response;
  },
  async order(_source, { orderId }, { dataSources, storeCode, customerToken }): Promise<IOrder> {
    if (!customerToken) {
      throw new ApplicationError('you dont have permission to view this order');
    }
    const customer = await dataSources.magento.customer.getCustomer(storeCode);

    const order = await dataSources.magento.order.fetchOrder(orderId, storeCode);
    const isOwnerOrder = customer && order && customer.id === order.customer_id;

    if (!isOwnerOrder) {
      throw new ApplicationError('you dont have permission to view this order');
    }

    // TODO: remove this and use product type from OrderItem.
    order.items = await extendItemsOfListWithProductInformation(order, dataSources, storeCode);

    return orderModel.transform(order);
  },
};

export default {
  OrderItem,
  BillingAddress,
  ShippingAddress,
  Query,
};
