import 'reflect-metadata';

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

import { ITierPricePromotion, ITierPricePromotionExtension, ITierPricePromotionType } from '../../types/graphql';

export const tierPromotionTypeMap = {
  tier_fixed_amount: ITierPricePromotionType.FixedAmount,
  tier_special_price: ITierPricePromotionType.SpecialPrice,
  tier_percent_amount: ITierPricePromotionType.PercentAmount,
};

export class TierPricePromotionExtension implements ITierPricePromotionExtension {
  @IsNumber()
  @IsOptional()
  qty_from?: number;

  @IsNumber()
  @IsOptional()
  qty_to?: number;

  @IsNumber({}, { each: true })
  applicable_store_ids: number[];
}

export class TierPricePromotion implements ITierPricePromotion {
  @Transform(value => value.toString())
  @IsString()
  @Expose({ name: 'rule_id' })
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @Expose({ name: 'discount_amount' })
  amount: number;

  @Type(() => TierPricePromotionExtension)
  extension_attributes: TierPricePromotionExtension;

  type: ITierPricePromotionType;
}
