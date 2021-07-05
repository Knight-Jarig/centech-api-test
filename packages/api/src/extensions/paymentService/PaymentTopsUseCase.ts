import { ApplicationError } from '../../error/ApplicationError';
import { IConditionType } from '../../types/graphql';
import { Is3dsInput, PaymentUseCase } from './PaymentUseCase';
import { ResolverContext } from '../../types';

export class PaymentTopsUseCase extends PaymentUseCase {
  async getMinTotal(context) {
    const minTotal = 1000;
    try {
      const creditCardConfig = await context.dataSources.firebase.getData('credit_card', 'config', 60);
      return creditCardConfig.price_require_cvv;
    } catch (e) {}

    return minTotal;
  }

  validateCVV(saved_card) {
    // validateCVV in is3ds function
  }

  async getBaseGrandTotal(isGuest: boolean, context: ResolverContext, cartId: string): Promise<any> {
    if (isGuest) {
      return await context.dataSources.magento.cartGuest.getCartGuestTotals(cartId, context.storeCode);
    } else if (cartId) {
      return await context.dataSources.magento.cartId.getCartTotalsByID(context.storeCode, cartId);
    }
    return await context.dataSources.magento.cart.getCartMineTotals(context.storeCode);
  }

  is3ds = async ({ saved_card, isGuest, card, context, cartId }: Is3dsInput): Promise<boolean> => {
    const { base_grand_total } = await this.getBaseGrandTotal(isGuest, context, cartId);

    const minTotal = await this.getMinTotal(context);

    const is3ds = !!card || base_grand_total > minTotal;

    if (saved_card && !saved_card.encrypted_card_data && base_grand_total > minTotal) {
      throw new ApplicationError('input encrypted_card_data is required', {
        statusCode: 'require_encrypted_card_data',
      });
    }
    return is3ds;
  };

  is3dsRepayment = async ({ card, saved_card, context, incrementId }: Is3dsInput): Promise<boolean> => {
    const { dataSources, storeCode } = context;

    const searchOrderResponse = await dataSources.magento.order.search(
      {
        filterGroups: [
          {
            filters: [
              {
                field: 'increment_id',
                value: incrementId,
                conditionType: IConditionType.Eq,
              },
            ],
          },
        ],
      },
      storeCode,
    );

    const items = searchOrderResponse?.items;

    if (items.length === 0) {
      throw new ApplicationError('order not found');
    }

    const order = items[0];
    const { base_grand_total } = order;

    const minTotal = await this.getMinTotal(context);
    const is3ds = !!card || base_grand_total > minTotal;

    if (saved_card && !saved_card.encrypted_card_data && base_grand_total > minTotal) {
      throw new ApplicationError('input encrypted_card_data is required', {
        statusCode: 'require_encrypted_card_data',
      });
    }
    return is3ds;
  };
}
