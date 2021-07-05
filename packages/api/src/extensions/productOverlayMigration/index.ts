/**
 * @title old structure overlay
 * @desc support old structure overlay in product list
 **/
import get from 'lodash/get';

const typeDef = ``;

const resolver = {
  ProductsExtensionAttributes: {
    overlays: _source => {
      return [
        {
          overlay_image: get(_source, 'overlay_image'),
          overlay_status: get(_source, 'overlay_status'),
          mobile_overlay_status: get(_source, 'overlay_mobile_status'),
          overlay_start_date: get(_source, 'overlay_start_date'),
          overlay_end_date: get(_source, 'overlay_end_date'),
        },
      ];
    },
  },
};

export { typeDef, resolver };
