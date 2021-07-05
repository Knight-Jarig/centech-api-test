/**
 * @title Register Response Status
 * @desc Return magento message instend of true|false in register mutation.
 **/
import typeDef from './types.graphql';
import { encrypt } from '../../utils/crypto.utils';
import {
  ICard,
  IMutationResolvers,
  IPaymentInformationsResolvers,
  IPaymentOfflineResponseResolvers,
  IPaymentStatusResponseResolvers,
  IQueryResolvers,
} from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';
import config from '../../configs/vars';
import { PaymentUseCase } from './PaymentUseCase';

async function setDefaultCard(cardId, customerId, dataSources) {
  try {
    await dataSources.payment.setDefaultCard(cardId, customerId);
  } catch (e) {
    const status = e?.extensions?.response?.status || 200;
    if (status !== 200) throw ApplicationError.create(e);
  }
  return true;
}

const getPaymentUseCase = (root, input, context): PaymentUseCase => {
  const { dataSources } = context;
  const buPaymentUseCase = {
    tops: dataSources.paymentTopsUseCase,
    ofm: dataSources.paymentOfmUseCase,
    cds: dataSources.paymentCdsUseCase,
    rbs: dataSources.paymentRbsUseCase,
    default: dataSources.paymentUseCase,
  };
  return buPaymentUseCase[config.bu] ?? buPaymentUseCase.default;
};

const Mutation: IMutationResolvers = {
  setPaymentInformation: async (root, input, context, info) => {
    const paymentUseCase = getPaymentUseCase(root, input, context);
    return paymentUseCase.setPaymentInformation(root, input, context, info);
  },
  createCard: async (_, { cardInput, setDefault: isSetDefaultCard }, { dataSources, storeCode }) => {
    const {
      cardholder_name: cardholderName,
      encrypted_card_data: cardEncryptData,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
    } = cardInput;
    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    if (!customer) {
      throw new ApplicationError('No customer');
    }
    try {
      return await dataSources.payment.createCard(
        customer.id,
        cardholderName,
        cardEncryptData,
        expiryMonth,
        expiryYear,
        isSetDefaultCard,
      );
    } catch (e) {
      throw ApplicationError.create(e);
    }
  },
  deleteCard: async (_, { cardId }, { dataSources, storeCode }) => {
    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    if (!customer) {
      throw new ApplicationError('No customer');
    }
    try {
      await dataSources.payment.deleteCard(cardId, customer.id);
    } catch (e) {
      const status = e?.extensions?.response?.status || 200;
      if (status !== 200) throw ApplicationError.create(e);
    }
    return true;
  },
  setDefaultCard: async (_, { cardId }, { dataSources, storeCode }) => {
    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    if (!customer) {
      throw new ApplicationError('No customer');
    }
    await setDefaultCard(cardId, customer.id, dataSources);
    const card = (await dataSources.payment.getCards(customer.id)).find(item => cardId === item.id);

    if (!card) {
      throw new ApplicationError('Card is not exits');
    }

    return card;
  },
  repayment: async (root, input, context) => {
    const paymentUseCase = getPaymentUseCase(root, input, context);
    return paymentUseCase.repayment(root, input, context);
  },
};

const Query: IQueryResolvers = {
  cards: async (_, { sort }, { dataSources, storeCode, store }) => {
    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    if (!customer) {
      throw new ApplicationError('No customer');
    }

    const cardListInit: ICard[] = await dataSources.payment.getCards(customer.id);
    let bankList = [];
    try {
      const blackListFindBank = ['tops'];
      if (!blackListFindBank.includes(config.bu)) {
        bankList = await dataSources.magento.bank.find({
          page: 1,
          size: 100,
          filterGroups: [],
          sortOrders: [],
        });
      }
    } catch (e) {}

    const { secure_base_media_url: baseMediaUrl } = store;

    const cardList = cardListInit.map(card => {
      const bankId = card?.bank_id;

      if (!bankId) return card;

      const MDCBank = bankList.find(element => element.bank_id === bankId);

      if (!MDCBank) return card;

      const bank = {
        id: MDCBank.bank_id,
        name: MDCBank.name,
        image: `${baseMediaUrl}${MDCBank.bank_image}`,
        icon: `${baseMediaUrl}${MDCBank.icon}`,
        color: MDCBank.color,
        active: MDCBank.active === '1',
      };

      return {
        ...card,
        bank,
      };
    });

    const hasDefaultCard = cardList.some(card => card.is_default);
    const needAutoDefaultCard = cardList.length > 0 && !hasDefaultCard;

    let resultCards: ICard[];
    if (needAutoDefaultCard) {
      const [card, ...otherCards] = cardList;
      await setDefaultCard(card.id, customer.id, dataSources);

      resultCards = [{ ...card, is_default: true }].concat(otherCards);
    } else {
      resultCards = cardList;
    }

    if (sort) {
      resultCards = resultCards.sort((a, b) => {
        const sortId = sort.id.toLowerCase();
        const dataA = a[sortId];
        const dataB = b[sortId];

        return sort.direction === 'ASC' ? dataA - dataB : dataB - dataA;
      });
    }

    return resultCards;
  },
  binLookup: async (_, { bin }, { dataSources }) => {
    return dataSources.payment.binLookup(bin);
  },
  paymentOffline: async (_, { incrementId, key }, { dataSources }) => {
    if (key !== encrypt(incrementId)) {
      throw new ApplicationError('incrementId is invalid');
    }

    return dataSources.payment.getOfflinePaymentDetail(incrementId);
  },
  paymentStatus: async (_, { incrementId, key, paymentServiceKey }, { dataSources }) => {
    const paymentServiceKeys = ['payment_service_dolfin'];

    if (!paymentServiceKeys.includes(paymentServiceKey)) {
      throw new ApplicationError(`${paymentServiceKey} is not supported`);
    }

    if (key !== encrypt(incrementId)) {
      throw new ApplicationError('incrementId is invalid');
    }

    const result = await dataSources.payment.getDolfinPaymentStatus(incrementId);
    return {
      is_success: result.isSuccess,
      response_code: result.responseCode,
      description: result.description,
      order_id: result.orderId,
      amount: result.amount,
      currency: result.currency,
    };
  },
};

const PaymentInformations: IPaymentInformationsResolvers = {
  installment_plans: root => {
    return (root?.extension_attributes as any)?.payment_service_installment_plans || [];
  },
};

const PaymentOfflineResponse: IPaymentOfflineResponseResolvers = {
  key: root => {
    return encrypt(root.detail.orderId);
  },
};

const PaymentStatusResponse: IPaymentStatusResponseResolvers = {
  key: root => {
    return encrypt(root.order_id);
  },
};

const resolver = {
  Mutation,
  Query,
  PaymentInformations,
  PaymentOfflineResponse,
  PaymentStatusResponse,
};

export { typeDef, resolver };
