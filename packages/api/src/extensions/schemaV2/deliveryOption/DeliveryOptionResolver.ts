import { IQueryResolvers, IResolvers } from '../../../types/graphql';
import { ResolverContext } from '../../../types';

const Query: IQueryResolvers<ResolverContext> = {
  async v2DeliveryOptionByPostcode(_source, { input }, { dataSources }) {
    let postcode = input.postcode;
    const latitude = input.lat;
    const longitude = input.lng;
    if (!postcode) {
      if (latitude && longitude) {
        postcode = await dataSources.google.getPostcodeByLatLng(latitude, longitude);
      }
    }

    return dataSources.deliveryOptionUseCase.search({ ...input, postcode });
  },
};

export const DeliveryOptionResolvers: IResolvers = {
  Query,
};
