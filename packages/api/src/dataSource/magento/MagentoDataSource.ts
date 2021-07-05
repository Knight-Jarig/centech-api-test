import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { MagentoCategoryDataSource } from './category/MagentoCategoryDataSource';
import { MagentoNewsletterDataSource } from './newsletter/MagentoNewsletterDataSource';
import { MagentoProductDataSource } from './product/MagentoProductDataSource';
import { MagentoUrlRewriteDataSource } from './urlRewrite/MagentoUrlRewriteDataSource';
import { MagentoStorePickUpDataSource } from './storePickup/MagentoStorePickUpDataSource';
import { MagentoAddressDataSource } from './address/MagentoAddressDataSource';
import { MagentoAuthDataSource } from './auth/MagentoAuthDataSource';
import { MagentoBannerDataSource } from './banner/MagentoBannerDataSource';
import { MagentoBrandDataSource } from './brand/MagentoBrandDataSource';
import { MagentoCartDataSource } from './cart/MagentoCartDataSource';
import { MagentoCartGuestDataSource } from './cartGuest/MagentoCartGuestDataSource';
import { MagentoWishlistDataSource } from './wishlist/MagentoWithlistDataSource';
import { MagnetoStoreLocatorDataSource } from './storeLocator/MagentoStoreLocatorDataSource';
import { MagentoStoreConfigDataSource } from './storeConfig/MagentoStoreConfigDataSource';
import { MagentoRegionDataSource } from './region/MagentoRegionDataSource';
import { MagentoPromotionDataSource } from './promotion/MagentoPromotionDataSource';
import { MagentoCatalogServiceDataSource } from './catalogService/MagentoCatalogServiceDataSource';
import { MagentoCmsDataSource } from './cms/MagentoCmsDataSource';
import { MagentoCmsBlockDataSource } from './cmsBlock/MagentoCmsBlockDataSource';
import { MagentoCartIdDataSource } from './cartId/MagentoCartIdDataSource';
import { MagentoContactDataSource } from './contact/MagentoContactDataSource';
import { MagentoCustomerDataSource } from './customer/MagentoCustomerDataSource';
import { MagentoDeliveryOptionDataSource } from './deliveryOption/MagentoDeliveryOptionDataSource';
import { MagentoOrderDataSource } from './order/MagentoOrderDataSource';
import { BaseRESTDataSource } from '../BaseRESTDataSource';
import { MagentoPricePerStoreDataSource } from './pricePerStore/MagentoPricePerStoreDataSource';
import { MagentoFlashDealsDataSource } from './flashDeals/MagentoFlashDealsDataSource';
import { MagentoDeliveryMethodDataSource } from './deliveryMethod/MagentoDeliveryMethodDataSource';
import { MagentoAdminDataSource } from './admin/MagentoAdminDataSource';
import { MagentoBankDataSource } from './bank/MagentoBankDataSource';
import { MagentoCouponDataSource } from './coupon/MagentoCouponDataSource';
import { MagentoVipDataSource } from './vvip/MagentoVipDataSource';
import { MagentoT1PassportDataSource } from './t1Passport/MagentoT1PassportDataSource';

export class MagentoDataSource extends DataSource {
  address = new MagentoAddressDataSource();
  auth = new MagentoAuthDataSource();
  bank = new MagentoBankDataSource();
  banner = new MagentoBannerDataSource();
  brand = new MagentoBrandDataSource();
  cart = new MagentoCartDataSource();
  cartGuest = new MagentoCartGuestDataSource();
  cartId = new MagentoCartIdDataSource();
  catalogService = new MagentoCatalogServiceDataSource();
  category = new MagentoCategoryDataSource();
  cms = new MagentoCmsDataSource();
  cmsBlock = new MagentoCmsBlockDataSource();
  contact = new MagentoContactDataSource();
  coupon = new MagentoCouponDataSource();
  customer = new MagentoCustomerDataSource();
  deliveryOption = new MagentoDeliveryOptionDataSource();
  deliveryMethod = new MagentoDeliveryMethodDataSource();
  newsletter = new MagentoNewsletterDataSource();
  order = new MagentoOrderDataSource();
  product = new MagentoProductDataSource();
  promotion = new MagentoPromotionDataSource();
  region = new MagentoRegionDataSource();
  storeConfig = new MagentoStoreConfigDataSource();
  storeLocator = new MagnetoStoreLocatorDataSource();
  storePickUp = new MagentoStorePickUpDataSource();
  urlRewrite = new MagentoUrlRewriteDataSource();
  vvip = new MagentoVipDataSource();
  wishlist = new MagentoWishlistDataSource();
  flashDeals = new MagentoFlashDealsDataSource();
  pricePerStore = new MagentoPricePerStoreDataSource();
  admin = new MagentoAdminDataSource();
  t1passport = new MagentoT1PassportDataSource();

  initialize(config: DataSourceConfig<any>) {
    Object.keys(this)
      .filter(key => this[key] instanceof BaseRESTDataSource)
      .map(key => this[key] as BaseRESTDataSource)
      .forEach(dataSource => dataSource.initialize?.(config));
  }
}
