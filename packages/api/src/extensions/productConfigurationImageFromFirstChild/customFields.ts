import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

class CustomFields {
  async getDataFromProductSimple(transformed, dataSources, storeCode) {
    const typeId = get(transformed, 'type_id');
    const image = get(transformed, 'image');

    if (typeId === 'configurable' && (image === 'no_selection' || isEmpty(image))) {
      const firstProductySimple = get(transformed, 'extension_attributes.configurable_product_links[0]');

      try {
        const params = {
          filterGroups: [
            {
              filters: [{ field: 'status', value: '1' }],
            },
            {
              filters: [
                {
                  field: 'entity_id',
                  value: firstProductySimple,
                  conditionType: 'eq',
                },
              ],
            },
          ],
          page: 1,
          size: 1,
          sortOrders: [{ direction: 'ASC', field: 'price' }],
        };

        const product = await dataSources.catalogService.find(params, storeCode);

        transformed.image = get(product, 'products[0].image');
        transformed.small_image = get(product, 'products[0].small_image');
        transformed.thumbnail = get(product, 'products[0].thumbnail');
      } catch (error) {}
    }

    return transformed;
  }
}

export default new CustomFields();
