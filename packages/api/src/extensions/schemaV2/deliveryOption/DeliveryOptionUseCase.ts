import { MDCStoreConfig } from '../types/mdc-store-config';
import { IV2DeliveryOptionByPostcodeInput, IV2DeliveryOptionByPostcode } from '../../../types/graphql';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { DataSource } from 'apollo-datasource';
import { filterOutShippingDeliveryMethods } from '../../../utils/delivery.utils';

export class DeliveryOptionUseCaseOption {
  magento: MagentoDataSource;
}

export class DeliveryOptionUseCase extends DataSource {
  private store?: MDCStoreConfig;
  private defaultPostcode = '0';
  private magento: MagentoDataSource;

  constructor({ magento }: DeliveryOptionUseCaseOption) {
    super();
    this.magento = magento;
  }

  initialize(config): void {
    this.store = config.context.store;
  }

  async search({ sku, postcode, onlineSalable = true, offlineSalable = true }: IV2DeliveryOptionByPostcodeInput): Promise<IV2DeliveryOptionByPostcode[]> {
    const postcodeInput = postcode || this.defaultPostcode;

    const groupedDeliveryMethod = await this.magento.deliveryMethod.getDeliveryMethodsV2({
      sku,
      postcode: postcodeInput,
      storeCode: this.store.code,
    });
    
    if (!onlineSalable || !offlineSalable) {
      for (const delivery of groupedDeliveryMethod) {
        if (!onlineSalable) delivery.delivery_methods = filterOutShippingDeliveryMethods('online', delivery.delivery_methods, 'delivery_method');
        if (!offlineSalable) delivery.delivery_methods = filterOutShippingDeliveryMethods('offline', delivery.delivery_methods, 'delivery_method');
      }
    }

    return (
      groupedDeliveryMethod?.map(item => {
        return {
          title: item.delivery_title,
          postcode: postcodeInput,
          methods:
            item.delivery_methods?.map(deliveryMethod => ({
              method: deliveryMethod.delivery_method,
              label: deliveryMethod.delivery_method_label,
              leadTimes: deliveryMethod.delivery_method_lead_times_label,
              freeLabel: deliveryMethod.delivery_method_free_label,
              sortOrder: deliveryMethod.sort_order.toString(),
            })) ?? [],
        };
      }) ?? []
    );
  }
}
