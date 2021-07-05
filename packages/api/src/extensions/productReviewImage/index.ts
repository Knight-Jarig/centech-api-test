import {
  IProductsExtensionAttributesReviewsExtensionAttributesResolvers,
  IProductsExtensionAttributesReviewsResolvers,
} from '../../types/graphql';

const typeDef = ``;

const ProductsExtensionAttributesReviews: IProductsExtensionAttributesReviewsResolvers = {
  images: root => {
    return root?.extension_attributes?.review_images
      ?.filter(item => {
        return item.length > 0;
      })
      .map(path => ({ path }));
  },
};

const ProductsExtensionAttributesReviewsExtensionAttributes: IProductsExtensionAttributesReviewsExtensionAttributesResolvers = {
  review_images: ({ review_images }) => {
    return review_images.filter(item => item.length > 0);
  },
};

const resolver = {
  ProductsExtensionAttributesReviews,
  ProductsExtensionAttributesReviewsExtensionAttributes,
};

export { typeDef, resolver };
