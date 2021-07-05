import merge from 'lodash/merge';
import addressResolver from './address/addressResolvers';
import authResolver from './auth/authResolvers';
import bannerResolver from './banner/bannerResolvers';
import brandResolver from './brand/brandResolvers';
import cacheResolver from './cache/cacheResolver';
import cartResolver from './cart/cartResolvers';
import categoriesResolver from './categories/categoriesResolvers';
import cmsResolver from './cms/cmsResolvers';
import cmsBlockResolver from './cmsBlock/cmsBlockResolvers';
import commonResolver from './common/commonResolvers';
import contactusResolver from './contactus/contactusResolvers';
import customerResolver from './customer/customerResolvers';
import deliveryOptionResolver from './deliveryOption/deliveryOptionResolvers';
import newsletterResolver from './newsletter/newsletterResolvers';
import orderResolver from './order/orderResolvers';
import paymentResolver from './payment/paymentResolvers';
import productsResolver from './products/productsResolvers';
import promotionResolver from './promotion/promotionResolvers';
import regionResolver from './region/regionResolvers';
import reviewResolver from './review/reviewResolvers';
import shippingResolver from './shipping/shippingResolvers';
import storeConfigsResolver from './storeConfigs/storeConfigsResolvers';
import storeLocatorResolver from './storeLocator/storeLocatorResolvers';
import storePickUpResolver from './storePickUp/storePickUpResolvers';
import urlRewriteResolver from './urlRewrite/urlRewriteResolvers';
import wishlistResolver from './wishlist/wishlistResolvers';
import consentResolvers from './consent/consentResolvers';

import addressTypes from './address/addressSchema.graphql';
import authTypes from './auth/authSchema.graphql';
import bannerTypes from './banner/bannerSchema.graphql';
import brandTypes from './brand/brandSchema.graphql';
import cacheTypes from './cache/cacheSchema.graphql';
import cartTypes from './cart/cartSchema.graphql';
import categoriesTypes from './categories/categoriesSchema.graphql';
import cmsTypes from './cms/cmsSchema.graphql';
import cmsBlockTypes from './cmsBlock/cmsBlockSchema.graphql';
import commonTypes from './common/commonSchema.graphql';
import contactusTypes from './contactus/contactusSchema.graphql';
import customerTypes from './customer/customerSchema.graphql';
import deliveryOptionTypes from './deliveryOption/deliveryOptionSchema.graphql';
import newsletterTypes from './newsletter/newsletterSchema.graphql';
import orderTypes from './order/orderSchema.graphql';
import paymentTypes from './payment/paymentSchema.graphql';
import productsTypes from './products/productsSchema.graphql';
import promotionTypes from './promotion/promotionSchema.graphql';
import regionTypes from './region/regionSchema.graphql';
import reviewTypes from './review/reviewSchema.graphql';
import shippingTypes from './shipping/shippingSchema.graphql';
import storeConfigsTypes from './storeConfigs/storeConfigsSchema.graphql';
import storeLocatorTypes from './storeLocator/storeLocatorSchema.graphql';
import storePickUpTypes from './storePickUp/storePickUpSchema.graphql';
import urlRewriteTypes from './urlRewrite/urlRewriteSchema.graphql';
import wishlistTypes from './wishlist/wishlistSchema.graphql';
import consentTypes from './consent/consentSchema.graphql';
import couponTypes from './coupon/couponSchema.graphql';

import paymentSchemaExtension from '../extensions/paymentService/paymentSchema.graphql';
import orderSchemaSchemaExtension from '../extensions/orderShipmentTracking/orderSchema.graphql';

export const typeDefs = [
  addressTypes,
  authTypes,
  bannerTypes,
  brandTypes,
  cacheTypes,
  cartTypes,
  categoriesTypes,
  cmsTypes,
  cmsBlockTypes,
  commonTypes,
  contactusTypes,
  customerTypes,
  deliveryOptionTypes,
  newsletterTypes,
  orderTypes,
  paymentTypes,
  productsTypes,
  promotionTypes,
  regionTypes,
  reviewTypes,
  shippingTypes,
  storeConfigsTypes,
  storeLocatorTypes,
  storePickUpTypes,
  urlRewriteTypes,
  wishlistTypes,
  consentTypes,
  couponTypes,

  // schema from extension
  paymentSchemaExtension,
  orderSchemaSchemaExtension,
];
export const resolvers = merge(
  addressResolver,
  authResolver,
  bannerResolver,
  brandResolver,
  cacheResolver,
  cartResolver,
  categoriesResolver,
  cmsResolver,
  cmsBlockResolver,
  commonResolver,
  contactusResolver,
  customerResolver,
  deliveryOptionResolver,
  newsletterResolver,
  orderResolver,
  paymentResolver,
  productsResolver,
  promotionResolver,
  regionResolver,
  reviewResolver,
  shippingResolver,
  storeConfigsResolver,
  storeLocatorResolver,
  storePickUpResolver,
  urlRewriteResolver,
  wishlistResolver,
  consentResolvers,
);
