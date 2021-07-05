export interface MDCClickNCollectPickUpStores {
  store: MDCStoreAddress;
}

export interface MDCStoreAddress {
  id: string;
  name: string;
  is_active: boolean;
  seller_code: string;
  attribute_set_name: string;
  custom_attributes: any;
  extension_attributes: MDCStoreAddressExtension;
}

export interface MDCStoreAddressExtension {
  address: any;
  opening_hours: MDCStoreOpeningHours[];
  special_opening_hours: MDCStoreOpeningHours[];
  ispu_promise_delivery: any;
  stock_low_indicator_threshold: any;
}

export interface MDCStoreOpeningHours {
  start_time: string;
  end_time: string;
}

export interface MDCPickupLocation {
  id: number;
  name: string;
  store_code: string;
  is_active: boolean;
  address: MDCPickupLocationAddress;
  extension_attributes: MDCPickupLocationExtension;
}

export interface MDCPickupLocationAddress {
  street_number: string;
  building: string;
  soi: string;
  street: string;
  district: string;
  district_id: number;
  sub_district: string;
  sub_district_id: number;
  region: string;
  region_id: number;
  post_code: string;
  contact_number: string;
  country_code: string;
  city: string;
  latitude: string;
  longitude: string;
}

export interface MDCPickupLocationExtension {
  opening_hours: MDCPickupLocationOpeningHour[];
  store_pickup: MDCPickupLocationExtensionStorePickup;
  stock_id: number;
  image: string;
  allow_pick_at_store: boolean;
  display_as_store_information: boolean;
  salable_items: MDCPickupLocationSalableItem[];
  additional_text: MDCPickupLocationAdditionalText;
  cut_off_time: string;
}

export interface MDCPickupLocationOpeningHour {
  day: string;
  open: string;
  close: string;
}

export interface MDCPickupLocationExtensionStorePickup {
  stock_id: number;
  allow_ispu: boolean;
  allow_sts: any;
}

export interface MDCPickupLocationSalableItem {
  sku: string;
  qty: number;
}

export interface MDCPickupLocationAdditionalText {
  method_code: string;
  method_label_code: string;
  time_value: number;
  time_unit: string;
  date_time: string;
  extension_attributes: MDCPickupLocationAdditionalTextExtensionAttributes;
}

export interface MDCPickupLocationAdditionalTextExtensionAttributes {
  additional_text_variable: MDCPickupLocationAdditionalTextExtensionVariable;
}

export interface MDCPickupLocationAdditionalTextExtensionVariable {
  total_available: number;
  total_ordered: number;
}

interface MDCStorePickupLocationsAvailableExtension {
  opening_hours: MDCPickupLocationOpeningHour[];
  store_pickup: MDCPickupLocationExtensionStorePickup;
  stock_id: number;
  image: string;
  allow_pick_at_store: boolean;
  display_as_store_information: boolean;
  stock_status_code: string;
  stock_status_label: string;
}

export interface MDCStorePickupLocationsAvailable {
  id: number;
  name: string;
  store_code: string;
  is_active: boolean;
  address: MDCPickupLocationAddress;
  extension_attributes: MDCStorePickupLocationsAvailableExtension;
}

export interface MDCShipFromStoreAvailableTime {
  available_from: string;
  available_to: string;
}
