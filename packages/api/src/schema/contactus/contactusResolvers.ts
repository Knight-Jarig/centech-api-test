import { ResolverContext } from '../../types';
import { IContactUsResponse, IMutationResolvers } from '../../types/graphql';

const Mutation: IMutationResolvers<ResolverContext> = {
  async contactUs(_source, { input: contact }, { dataSources, storeCode }): Promise<IContactUsResponse> {
    return await dataSources.magento.contact.contactUs(contact, storeCode);
  },
};

export default {
  Mutation,
};
