import { ResolverContext } from '../../types';
import {
  IMutationResolvers,
  IProductsExtensionAttributesReviewsResolvers,
  IQueryResolvers,
  IReviewResponse,
} from '../../types/graphql';

const Mutation: IMutationResolvers<ResolverContext> = {
  async addReview(
    _source,
    { input: { nickname, title, detail, rating_items, sku, email, region_id, customer_id, images } },
    { dataSources, storeCode },
  ): Promise<IReviewResponse> {
    const response = await dataSources.magento.product.addReviewV2({
      review: {
        nickname,
        title,
        // if user has not enter any review detail it should send the value as no_detail
        // https://cenergy.atlassian.net/wiki/spaces/MD/pages/1895730373/Central+Rating+and+Review#Get-Reviews-with-Rating-only-(Customers-rate-the-product-but-does-not-give-details)
        detail: detail ?? 'no_detail',
        rating_items: [rating_items],
        email,
        region_id,
        customer_id,
        images,
      },
      sku,
      storeCode,
    });

    let success = false;
    if (response) {
      success = true;
    }
    return {
      success: `${success}`,
    };
  },
  async uploadReviewImage(_source, { input }, { dataSources }) {
    if (input?.base64Image) {
      return dataSources.magento.product.uploadImageBase64Review(input.base64Image);
    }
    return null;
  },
  async deleteReviewImage(_source, { input }, { dataSources }) {
    const imagePath = input.path.replace('product_review/', '');
    return dataSources.magento.product.deleteImageReview(imagePath);
  },
};
const Query: IQueryResolvers<ResolverContext> = {
  async ratingOptions(_, input, { dataSources, storeCode }) {
    const data = await dataSources.magento.product.ratingOptions(storeCode);
    return data.flat();
  },
};

const ProductsExtensionAttributesReviews: IProductsExtensionAttributesReviewsResolvers = {
  region_id: root => {
    return root?.extension_attributes?.region_id;
  },
};

export default {
  Mutation,
  ProductsExtensionAttributesReviews,
  Query,
};
