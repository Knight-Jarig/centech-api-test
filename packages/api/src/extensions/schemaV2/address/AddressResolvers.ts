import { ResolverContext } from '../../../types';
import {
  IQueryResolvers,
  IResolvers,
  IV2Address as IAddressResponse,
  IV2AddressResolvers as IAddressResolvers,
} from '../../../types/graphql';

const ResolveTypeAddressResponse = (_, { bu }) => {
  switch (bu) {
    case 'tops':
      return 'V2AddressTOPS';
    case 'pwb':
      return 'V2AddressPWB';
    default:
      return 'V2AddressCDS';
  }
};

const V2Address: IAddressResolvers = {
  __resolveType: ResolveTypeAddressResponse as any,
};

const Query: IQueryResolvers<ResolverContext> = {
  async v2Addresses(_source, _input, { dataSources, customerToken, storeCode }): Promise<IAddressResponse[]> {
    const addresses = await dataSources.addressUseCase.getAddresses();
    return addresses;
  },
};

export const AddressResolvers: IResolvers = {
  V2Address,
  Query,
};
