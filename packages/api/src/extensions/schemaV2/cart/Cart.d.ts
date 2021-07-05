export interface PayloadAddCartItem {
  quote_id: string;
  qty: number;
  sku: string;
  product_option: PayloadAddCartItemProductOptions;
}

interface PayloadAddCartItemProductOptions {
  extension_attributes: PayloadAddCartItemProductOptionsExtensionAttributes;
}

interface PayloadAddCartItemProductOptionsExtensionAttributes {
  configurable_item_options: PayloadAddCartItemProductOptionsExtensionAttributesOptions[];
}

interface PayloadAddCartItemProductOptionsExtensionAttributesOptions {
  option_id: string;
  option_value: number;
}
