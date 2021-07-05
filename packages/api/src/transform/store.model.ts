import get from 'lodash/get';

class StoreModel {
  transform(store) {
    if (!store) return null;
    return {
      id: get(store, 'id'),
      name: get(store, 'name'),
      is_active: get(store, 'is_active'),
      seller_code: get(store, 'seller_code'),
      attribute_set_name: get(store, 'attribute_set_name'),
      custom_attributes: get(store, 'custom_attributes'),
      extension_attributes: {
        address: {
          id: get(store, 'extension_attributes.address.id'),
          retailer_id: get(store, 'extension_attributes.address.retailer_id'),
          coordinates: {
            latitude: get(store, 'extension_attributes.address.coordinates.latitude'),
            longitude: get(store, 'extension_attributes.address.coordinates.longitude'),
          },
          region: get(store, 'extension_attributes.address.region'),
          region_id: get(store, 'extension_attributes.address.region_id'),
          country_id: get(store, 'extension_attributes.address.country_id'),
          street: get(store, 'extension_attributes.address.street'),
          postcode: get(store, 'extension_attributes.address.postcode'),
          city: get(store, 'extension_attributes.address.city'),
        },
        opening_hours: get(store, 'extension_attributes.opening_hours'),
        special_opening_hours: get(store, 'extension_attributes.special_opening_hours'),
        ispu_promise_delivery: get(store, 'extension_attributes.ispu_promise_delivery'),
        stock_low_indicator_threshold: get(store, 'extension_attributes.stock_low_indicator_threshold'),
      },
    };
  }

  transformPickUpLocationAddress(address) {
    return {
      streetNumber: address.street_number,
      building: address.building,
      soi: address.soi,
      street: address.street,
      district: address.district,
      districtId: address.district_id,
      subDistrict: address.sub_district,
      subDistrictId: address.sub_district_id,
      region: address.region,
      regionId: address.region_id,
      postcode: address.post_code,
      contactNumber: address.contact_number,
      countryCode: address.country_code,
      city: address.city,
      latitude: address.latitude,
      longitude: address.longitude,
    };
  }

  transformPickUpLocation(store) {
    if (!store) return null;

    return {
      id: `${get(store, 'id')}`,
      name: get(store, 'name'),
      isActive: get(store, 'is_active'),
      storeCode: get(store, 'store_code'),
      address: this.transformPickUpLocationAddress(get(store, 'address', {})),
      openingHours: get(store, 'extension_attributes.opening_hours')?.map(({ day, open, close }) => ({
        day,
        openTime: open,
        closeTime: close,
      })),
      image: get(store, 'extension_attributes.image'),
      allowPickAtStore: get(store, 'extension_attributes.allow_pick_at_store'),
      isDisplayAsStoreInformation: get(store, 'extension_attributes.display_as_store_information'),
      salableItems: get(store, 'extension_attributes.salable_items'),
      storePickup: {
        stockId: get(store, 'extension_attributes.store_pickup.stock_id'),
        allowIspu: !!get(store, 'extension_attributes.store_pickup.allow_ispu'),
        allowSts: !!get(store, 'extension_attributes.store_pickup.allow_sts'),
      },
      additionalText: {
        methodCode: get(store, 'extension_attributes.additional_text.method_code'),
        methodLabelCode: get(store, 'extension_attributes.additional_text.method_label_code'),
        timeValue: get(store, 'extension_attributes.additional_text.time_value'),
        timeUnit: get(store, 'extension_attributes.additional_text.time_unit'),
        datetime: get(store, 'extension_attributes.additional_text.date_time'),
        totalAvailable: get(
          store,
          'extension_attributes.additional_text.extension_attributes.additional_text_variable.total_available',
        ),
        totalOrdered: get(
          store,
          'extension_attributes.additional_text.extension_attributes.additional_text_variable.total_ordered',
        ),
      },
      cutOffTime: get(store, 'extension_attributes.cut_off_time'),
      stockStatusCode: get(store, 'extension_attributes.stock_status_code'),
      stockStatusLabel: get(store, 'extension_attributes.stock_status_label'),
      distance: get(store, 'distance'),
    };
  }
}

export default new StoreModel();
