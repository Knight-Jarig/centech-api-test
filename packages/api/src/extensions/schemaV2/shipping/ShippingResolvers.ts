import { ResolverContext } from '../../../types';
import {
  IMutationResolvers,
  IQueryResolvers,
  IResolvers,
  IResponseMessage,
  IV2PackageOptionProductResolvers as IPackageOptionProductResolvers,
  IV2PackageOption as IPackageOption,
  IV2Product as IProduct,
  IV2EstimateShippingMethod as IEstimateShippingMethod,
  IV2StoresLocationAdditionalTextResolvers as IStoresLocationAdditionalTextResolvers,
} from '../../../types/graphql';

const PackageOptionProduct: IPackageOptionProductResolvers<ResolverContext> = {
  detail: getProductById,
};

const StoresLocationAdditionalText: IStoresLocationAdditionalTextResolvers<ResolverContext> = {
  timeLabel({ timeLabel }, _, { locale }) {
    let result = timeLabel;
    if (locale === 'th') {
      const day = /day.*/g;
      const hour = /hour.*/g;
      result = timeLabel.replace(day, 'วัน');
      result = result.replace(hour, 'ชั่วโมง');
    }
    return result;
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  v2PackageOptions(_source, { cartId, storeId }, { dataSources }): Promise<IPackageOption[]> {
    return dataSources.shippingUseCase.getPackageOptions(storeId, cartId);
  },
  v2DeliveryPackageOptions(_source, { cartId, input }, { dataSources }): Promise<IPackageOption[]> {
    return dataSources.shippingUseCase.getDeliveryPackageOptions(input, cartId);
  },
  v2EstimateShippingMethods(_source, { guestId, input, version }, { dataSources }): Promise<IEstimateShippingMethod[]> {
    return dataSources.shippingUseCase.getEstimateShippingMethods(input, guestId, version);
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async v2SetShippingInformation(_source, { cartId, input }, { dataSources }): Promise<IResponseMessage> {
    await dataSources.shippingUseCase.setShippingInformation(input, cartId);
    return { status: true };
  },
  async v2SetValidatePin(_source, { cartId, input }, { dataSources }): Promise<IResponseMessage> {
    const result = await dataSources.shippingUseCase.setValidatePin(input, cartId);
    return { status: result };
  },
};

function getProductById({ product_id }, _, { dataSources }: ResolverContext): Promise<IProduct> {
  return dataSources.productUseCase.findByIdNew(product_id);
}

export const ShippingResolvers: IResolvers = {
  V2PackageOptionProduct: PackageOptionProduct,
  V2StoresLocationAdditionalText: StoresLocationAdditionalText,
  Query,
  Mutation,
};
