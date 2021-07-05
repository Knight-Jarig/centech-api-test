import { IProduct, IProductResolvers } from '../../types/graphql';

const typeDef = ``;

const Product: IProductResolvers = {
  extension_attributes: (source: IProduct) => {
    const customAttributesOption = source?.custom_attributes_option;
    const extensionAttributes = source?.extension_attributes || {};

    if (!customAttributesOption?.brand_name) {
      return extensionAttributes;
    }

    const name: string = customAttributesOption.brand_name;
    const brand_id: number = parseInt(
      name
        .split('')
        .map(s => s.charCodeAt(0))
        .join('')
        .substring(0, 7),
    );

    return {
      ...extensionAttributes,
      brand: {
        brand_id,
        name,
      },
    };
  },
};

const resolver = {
  Product,
};

export { typeDef, resolver };
