import merge from 'lodash/merge';

import CommonSchema from './common/CommonSchema.graphql';
import BrandSchema from './brand/BrandSchema.graphql';
import ProductSchema from './products/ProductSchema.graphql';
import CartSchema from './cart/CartSchema.graphql';
import DeliveryOptionSchema from './deliveryOption/DeliveryOptionSchema.graphql';
import ShippingSchema from './shipping/ShippingSchema.graphql';
import SuggestSearchSchema from './suggestSearch/SuggestSearchSchema.graphql';
import AddressSchema from './address/AddressSchema.graphql';
import WishlistSchema from './wishlist/WishlistSchema.graphql';
import VoucherSchema from './vouchers/VoucherSchema.graphql';
import RewardSchema from './rewards/RewardSchema.graphql';
import OrderSchema from './order/OrderSchema.graphql';
import CategorySchema from './category/CategorySchema.graphql';
import ReviewSchema from './review/ReviewSchema.graphql';
import T1PassportSchema from './t1Passport/T1PassportSchema.graphql';
import CustomerSchema from './customer/CustomerSchema.graphql';
import T1RedeemSchema from './t1Redeem/T1RedeemSchema.graphql';
import InstagramSchema from './instagram/InstagramSchema.graphql';

import { IResolvers } from '../../types/graphql';
import { ProductResolvers } from './products/ProductResolvers';
import { CartResolvers } from './cart/CartResolvers';
import { BrandResolvers } from './brand/BrandResolvers';
import { DeliveryOptionResolvers } from './deliveryOption/DeliveryOptionResolver';
import { ShippingResolvers } from './shipping/ShippingResolvers';
import { SuggestSearchResolvers } from './suggestSearch/SuggestSearchResolvers';
import { AddressResolvers } from './address/AddressResolvers';
import { WishlistResolvers } from './wishlist/WishlistResolvers';
import { VoucherResolvers } from './vouchers/VoucherResolvers';
import { RewardResolvers } from './rewards/RewardResolvers';
import { OrderResolvers } from './order/OrderResolvers';
import { CategoryResolver } from './category/CategoryResolver';
import { ReviewResolvers } from './review/ReviewResolvers';
import { T1PassportResolvers } from './t1Passport/T1PassportResolvers';
import { CustomerResolvers } from './customer/CustomerResolvers';
import { T1RedeemResolvers } from './t1Redeem/T1RedeemResolvers';
import { InstagramResolvers } from './instagram/InstagramResolver';

const typeDef = [
  CommonSchema,
  ProductSchema,
  CartSchema,
  BrandSchema,
  DeliveryOptionSchema,
  AddressSchema,
  ShippingSchema,
  SuggestSearchSchema,
  WishlistSchema,
  VoucherSchema,
  RewardSchema,
  OrderSchema,
  CategorySchema,
  ReviewSchema,
  T1PassportSchema,
  CustomerSchema,
  T1RedeemSchema,
  InstagramSchema,
];
const resolver: IResolvers = merge(
  ProductResolvers,
  CartResolvers,
  DeliveryOptionResolvers,
  BrandResolvers,
  ShippingResolvers,
  SuggestSearchResolvers,
  AddressResolvers,
  WishlistResolvers,
  VoucherResolvers,
  RewardResolvers,
  OrderResolvers,
  CategoryResolver,
  ReviewResolvers,
  T1PassportResolvers,
  CustomerResolvers,
  T1RedeemResolvers,
  InstagramResolvers
);

export { typeDef, resolver };
