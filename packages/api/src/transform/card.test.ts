import { cardTransform } from './card';
import {
  cardOne,
  cardOneBeforeTransform,
  cardThree,
  cardThreeBeforeTransform,
  cardTwo,
  cardTwoBeforeTransform,
} from '../extensions/paymentService/__mocks__/PaymentUseCase';
import { ICard } from '../types/graphql';

describe('Card Transform', () => {
  it(`Card one transform`, async () => {
    const card: ICard = cardTransform(cardOneBeforeTransform)
    expect(card).toMatchObject(cardOne);
  });

  it(`Card two transform`, async () => {
    const card: ICard = cardTransform(cardTwoBeforeTransform)
    expect(card).toMatchObject(cardTwo);
  });

  it(`Card three transform`, async () => {
    const card: ICard = cardTransform(cardThreeBeforeTransform)
    expect(card).toMatchObject(cardThree);
  });
});
