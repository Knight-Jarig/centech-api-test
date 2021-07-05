import { ICard, ICardType } from '../types/graphql';
import { DateTime } from 'luxon';
import { CardResponse } from '../dataSource/payment/PaymentDataSource';

function cardTransform(card: CardResponse): ICard {
  const cardTypes = Object.keys(ICardType).map(key => ICardType[key]);
  return {
    ...card,
    id: card.id,
    type: cardTypes.includes(card.cardType) ? (card.cardType as ICardType) : ICardType.Others,
    masked_number: card.maskPan,
    is_default: !!card.isDefault, // null to false
    expiry_month: card.expiryMonth,
    expiry_year: card.expiryYear,
    bank_id: card.bankId,
    bank_name: card.bankName,
    promo_codes: card.promoCodes,
    created_at: DateTime.fromISO(card.createdDateTime, { zone: 'utc+0' }).toUTC(),
  };
}

export { cardTransform };
