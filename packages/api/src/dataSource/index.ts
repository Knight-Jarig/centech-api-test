import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { DataSource } from 'apollo-datasource';
import DataLakeApi from './dataLakeApi';
import ElasticSearch from './elasticSearch';
import DataLakeRecommendationApi from './dataLakeRecommendationApi';
import DataLakeAppRecommendationApi from './dataLakeAppRecommendationApi';
import GoogleApi from './googleApi';
import { CmsDataSource } from './cms/CmsDataSource';
import { T1PassportDataSource } from './t1Passport/T1PassportDataSource';
import { MagentoDataSource } from './magento/MagentoDataSource';
import ConsentServiceApi from './consentServiceApi';
import { CaMPDataSource } from './camp/CaMPDataSource';
import { PaymentDataSource } from './payment/PaymentDataSource';
import { CatalogServiceDataSource } from './catalogService';
import { Prime } from './prime';
import { Firebase } from './firebase';
import { InstagramDataSource } from './instagram/InstagramDataSource';

import { ProductUseCase } from '../extensions/schemaV2/products/ProductUseCase';
import { LocationUseCase } from '../extensions/schemaV2/LocationUseCase';
import { CartUseCase } from '../extensions/schemaV2/cart/CartUseCase';
import { BrandUseCase } from '../extensions/schemaV2/brand/BrandUseCase';
import { DeliveryOptionUseCase } from '../extensions/schemaV2/deliveryOption/DeliveryOptionUseCase';
import { ShippingUseCase } from '../extensions/schemaV2/shipping/ShippingUseCase';
import { SuggestSearchUseCase } from '../extensions/schemaV2/suggestSearch/SuggestSearchUseCase';
import { PaymentUseCase } from '../extensions/paymentService/PaymentUseCase';
import { PaymentTopsUseCase } from '../extensions/paymentService/PaymentTopsUseCase';
import { PaymentOfmUseCase } from '../extensions/paymentService/PaymentOfmUseCase';
import { PaymentCdsUseCase } from '../extensions/paymentService/PaymentCdsUseCase';
import { PaymentRbsUseCase } from '../extensions/paymentService/PaymentRbsUseCase';
import { AddressUseCase } from '../extensions/schemaV2/address/AddressUseCase';
import { OrderUseCase } from '../extensions/schemaV2/order/OrderUseCase';
import { CategoryUseCase } from '../extensions/schemaV2/category/CategoryUseCase';
import { ReviewUseCase } from '../extensions/schemaV2/review/ReviewUseCase';
import { T1PassportUseCase } from '../extensions/schemaV2/t1Passport/T1PassportUseCase';
import { CustomerUseCase } from '../extensions/schemaV2/customer/CustomerUseCase';
import { T1RedeemUseCase } from '../extensions/schemaV2/t1Redeem/T1RedeemUseCase';
import { InstagramUseCase } from '../extensions/schemaV2/instagram/InstagramUseCase';

export interface CoreAPIDataSources extends DataSources<Record<string, DataSource>> {
  productUseCase: ProductUseCase;
  locationUseCase: LocationUseCase;
  cartUseCase: CartUseCase;
  brandUseCase: BrandUseCase;
  deliveryOptionUseCase: DeliveryOptionUseCase;
  shippingUseCase: ShippingUseCase;
  magento: MagentoDataSource;
  cms: CmsDataSource;
  t1Passport: T1PassportDataSource;
  dataLake: DataLakeApi;
  dataLakeRecommendation: DataLakeRecommendationApi;
  dataLakeAppRecommendation: DataLakeAppRecommendationApi;
  google: GoogleApi;
  consent: ConsentServiceApi;
  payment: PaymentDataSource;
  catalogService: CatalogServiceDataSource;
  suggestSearchUseCase: SuggestSearchUseCase;
  paymentUseCase: PaymentUseCase;
  paymentTopsUseCase: PaymentTopsUseCase;
  paymentOfmUseCase: PaymentOfmUseCase;
  paymentCdsUseCase: PaymentCdsUseCase;
  paymentRbsUseCase: PaymentRbsUseCase;
  addressUseCase: AddressUseCase;
  prime: Prime;
  firebase: Firebase;
  camp: CaMPDataSource;
  orderUseCase: OrderUseCase;
  categoryUseCase: CategoryUseCase;
  reviewUseCase: ReviewUseCase;
  t1PassportUseCase: T1PassportUseCase;
  customerUseCase: CustomerUseCase;
  t1RedeemUseCase: T1RedeemUseCase;
  instagramUseCase: InstagramUseCase;
}

export const createDataSources: () => CoreAPIDataSources = () => {
  const catalogService = new CatalogServiceDataSource();
  const magento = new MagentoDataSource();
  const dataLake = new DataLakeApi();
  const dataLakeRecommendation = new DataLakeRecommendationApi();
  const dataLakeAppRecommendation = new DataLakeAppRecommendationApi();
  const prime = new Prime();
  const firebase = new Firebase();
  const google = new GoogleApi();
  const consent = new ConsentServiceApi();
  const camp = new CaMPDataSource();
  const elasticSearch = new ElasticSearch();
  const t1Passport = new T1PassportDataSource();
  const instagram = new InstagramDataSource();

  const productUseCase = new ProductUseCase({
    catalogService,
    magento,
    prime,
    dataLakeRecommendation,
    dataLakeAppRecommendation,
  });
  const brandUseCase = new BrandUseCase({ catalogService, magento });
  const deliveryOptionUseCase = new DeliveryOptionUseCase({ magento });
  const shippingUseCase = new ShippingUseCase({ magento, google });
  const suggestSearchUseCase = new SuggestSearchUseCase({
    catalogService,
    dataLake,
    elasticSearch,
  });
  const paymentUseCase = new PaymentUseCase({ magento });
  const paymentTopsUseCase = new PaymentTopsUseCase({ magento });
  const paymentOfmUseCase = new PaymentOfmUseCase({ magento });
  const paymentCdsUseCase = new PaymentCdsUseCase({ magento });
  const paymentRbsUseCase = new PaymentRbsUseCase({ magento });
  const addressUseCase = new AddressUseCase({ magento });
  const orderUseCase = new OrderUseCase({ magento });
  const categoryUseCase = new CategoryUseCase({ magento });
  const reviewUseCase = new ReviewUseCase({ magento });
  const customerUseCase = new CustomerUseCase({ magento });
  const t1PassportUseCase = new T1PassportUseCase({ magento, t1Passport, consent, customerUseCase });
  const t1RedeemUseCase = new T1RedeemUseCase({ magento });
  const instagramUseCase = new InstagramUseCase({ instagram });

  return {
    locationUseCase: new LocationUseCase({ magento }),
    productUseCase,
    brandUseCase,
    deliveryOptionUseCase,
    cartUseCase: new CartUseCase({ magento, productUseCase }),
    shippingUseCase,
    suggestSearchUseCase,
    magento,
    cms: new CmsDataSource(),
    dataLake,
    dataLakeRecommendation,
    dataLakeAppRecommendation,
    elasticSearch,
    t1Passport,
    google,
    consent,
    payment: new PaymentDataSource(),
    catalogService,
    paymentTopsUseCase,
    paymentOfmUseCase,
    paymentCdsUseCase,
    paymentRbsUseCase,
    paymentUseCase,
    addressUseCase,
    orderUseCase,
    prime,
    firebase,
    camp,
    categoryUseCase,
    reviewUseCase,
    t1PassportUseCase,
    customerUseCase,
    t1RedeemUseCase,
    instagramUseCase,
    instagram,
  };
};
