import get from 'lodash/get';

class BrandModel {
  transforProductCollention(productCollention) {
    return {
      ...productCollention,
      brand_collection_id: `${productCollention.brand_collection_id}`,
      is_official: !!productCollention.is_official,
    };
  }

  transformBrand(brand) {
    if (!brand) return null;

    return {
      ...brand,
      brand_id: `${get(brand, 'brand_id')}`,
      extension_attributes: {
        ...get(brand, 'extension_attributes'),
        disable_new_arrival_section: !!get(brand, 'extension_attributes.disable_new_arrival_section'),
        disable_best_seller_section: !!get(brand, 'extension_attributes.disable_best_seller_section'),
        product_collections: get(brand, 'extension_attributes.product_collections')?.map(
          this.transforProductCollention,
        ),
      },
    };
  }
}

export default new BrandModel();
