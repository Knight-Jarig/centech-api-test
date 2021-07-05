import { intersectionBy } from 'lodash';
import { IOrderResolvers, IQueryResolvers } from '../../types/graphql';
import { ResolverContext } from '../../types';
import paymentResolvers from '../../schema/payment/paymentResolvers';

const typeDef = ``;

const Order: IOrderResolvers = {
  async children({ extension_attributes }, data, { dataSources, storeCode }) {
    if (!extension_attributes?.order_children_ids?.length) {
      return [];
    }

    const filter = {
      filterGroups: [
        {
          filters: [
            { field: 'entity_id', value: extension_attributes.order_children_ids.toString(), conditionType: 'in' },
          ],
        },
      ],
      page: 1,
      size: 0,
    };
    const response: any = await dataSources.magento.order.search(filter as any, storeCode);

    return response.items;
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async paymentInformations(root, input, context, info) {
    const resolve = paymentResolvers.Query.paymentInformations as any;
    const childrenIds = input?.childrenIds ?? [];
    const hasSplitOrder = childrenIds.length > 0;

    const paymentInformation = await resolve(root, input, context, info);

    if (!hasSplitOrder) return paymentInformation;

    const childPaymentInformations = await Promise.all(
      childrenIds.map(cartId => resolve(root, { ...input, cartId, isGuest: false }, context, info)),
    );
    const canPayByInstallment = paymentInformation?.extension_attributes?.payment_service_installment_plans?.length > 0;

    const childPaymentMethod = childPaymentInformations.map(childPaymentInfo =>
      childPaymentInfo.payment_methods.filter(
        ({ code }) => code !== 'payment_service_installment' || canPayByInstallment,
      ),
    );

    const intersectionPaymentMethod = intersectionBy(...childPaymentMethod, 'code');
    const defaultPaymentMethod = [
      {
        code: 'payment_service_fullpayment',
        title: 'Credit Card (Full Payment)',
      },
    ];
    const hasIntersectionPaymentMethod = intersectionPaymentMethod.length > 0;
    const payment_methods = hasIntersectionPaymentMethod ? intersectionPaymentMethod : defaultPaymentMethod;

    return {
      ...paymentInformation,
      payment_methods,
    };
  },
};

const resolver = {
  Order,
  Query,
};

export { typeDef, resolver };
