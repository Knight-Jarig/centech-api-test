import {
  IV2EstimateShippingInput as IEstimateShippingInput,
  IV2EstimateShippingMethod as IEstimateShippingMethod,
  IV2ShippingMethods as IShippingMethods,
  IV2StoresLocation as IStoresLocation,
} from '../../../types/graphql';
import {
  MDCEstimateShippingMethods,
  MDCShippingMethods,
  MDCPickupStoresLocation,
  MDCPickupStoresLocationAdditionalText,
} from '../../../dataSource/magento/cart/MagentoCartResponse';
import { parseDateTime } from '../transformer/cs2-transformer';

export function transformEstimateShippingMethodsPayload(input: IEstimateShippingInput) {
  return {
    postcode: input.postcode,
    country_id: input.countryId,
    region_id: input.regionId,
  };
}

export function transformEstimateShippingMethodsResponse(
  response: MDCEstimateShippingMethods[],
): IEstimateShippingMethod[] {
  return response.map(data => ({
    deliveryMethod: {
      title: data.method,
      caption: data.method_caption,
      code: data.method_code,
    },
    shippingMethods: transformShippingMethods(data.shipping_method),
    isAllowSplitOrder: data.is_allow_split_order,
  }));
}

function transformShippingMethods(shippingMethods: MDCShippingMethods[]): IShippingMethods[] {
  return shippingMethods.map(shippingMethod => ({
    carrier: {
      title: shippingMethod.carrier_title,
      code: shippingMethod.carrier_code,
    },
    method: {
      title: shippingMethod.method_title,
      code: shippingMethod.method_code,
      caption: shippingMethod.caption,
    },
    amount: shippingMethod.amount,
    deliveryTimeLabel: {
      methodType: shippingMethod?.extension_attributes?.delivery_time_label?.method_type,
      methodLabel: shippingMethod?.extension_attributes?.delivery_time_label?.method_label,
      timeLabel: shippingMethod?.extension_attributes?.delivery_time_label?.time_label,
      minLeadTime: parseDateTime(shippingMethod?.extension_attributes?.delivery_time_label?.min_lead_time),
      maxLeadTime: parseDateTime(shippingMethod?.extension_attributes?.delivery_time_label?.max_lead_time),
    },
    pickupStoresLocations:
      transformPickupStoresLocation(shippingMethod?.extension_attributes?.pickup_stores_location) || null,
  }));
}

function transformPickupStoresLocation(pickupStoresLocations: MDCPickupStoresLocation[]): IStoresLocation[] {
  if (!pickupStoresLocations) return null;
  const activePickupStoresLocations = pickupStoresLocations.filter(store => !!store.is_active);

  return activePickupStoresLocations.map(pickupStoresLocation => ({
    id: `${pickupStoresLocation.id}`,
    name: pickupStoresLocation.name,
    code: pickupStoresLocation.store_code,
    address: {
      addressLine: pickupStoresLocation?.address.street,
      postcode: pickupStoresLocation?.address.post_code,
      latitude: pickupStoresLocation?.address.latitude,
      longitude: pickupStoresLocation?.address.longitude,
      subDistrict: {
        id: `${pickupStoresLocation?.address.sub_district_id || null}`,
        name: pickupStoresLocation?.address.sub_district,
      },
      district: {
        id: `${pickupStoresLocation?.address.district_id || null}`,
        name: pickupStoresLocation?.address.district,
      },
      province: {
        id: `${pickupStoresLocation?.address.region_id || null}`,
        name: pickupStoresLocation?.address.region,
      },
      countryCode: pickupStoresLocation?.address.country_code,
      telephone: pickupStoresLocation?.address.contact_number,
    },
    additionalText: {
      totalAvailable:
        pickupStoresLocation?.extension_attributes?.additional_text?.extension_attributes?.additional_text_variable
          .total_available,
      totalOrdered:
        pickupStoresLocation?.extension_attributes?.additional_text?.extension_attributes?.additional_text_variable
          .total_ordered,
      timeUnit: pickupStoresLocation?.extension_attributes?.additional_text.time_unit,
      timeValue: pickupStoresLocation?.extension_attributes?.additional_text.time_value,
      timeLabel: transformPickupStoresLocationTimeLabel(pickupStoresLocation?.extension_attributes?.additional_text),
      dateTime: parseDateTime(pickupStoresLocation?.extension_attributes?.additional_text.date_time),
    },
    openingHours: pickupStoresLocation?.extension_attributes.opening_hours,
    salableItems: pickupStoresLocation?.extension_attributes.salable_items,
    cutOffTime: pickupStoresLocation.extension_attributes?.cut_off_time,
    stockStatusCode: pickupStoresLocation.extension_attributes?.stock_status_code,
    stockStatusLabel: pickupStoresLocation.extension_attributes?.stock_status_label,
  }));
}

export function transformPickupStoresLocationTimeLabel({
  time_unit: unit,
  time_value: value,
}: MDCPickupStoresLocationAdditionalText): string {
  if (unit === 'd') {
    return `${value} ${value >= 2 ? 'days' : 'day'}`;
  }
  return `${value} ${value >= 2 ? 'hours' : 'hour'}`;
}
