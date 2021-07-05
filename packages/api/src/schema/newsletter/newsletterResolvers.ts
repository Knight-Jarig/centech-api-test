import { ResolverContext } from '../../types';
import { IMutationResolvers, ISubscribe } from '../../types/graphql';
import { mapGender } from '../../utils/customer.utils';

const Mutation: IMutationResolvers<ResolverContext> = {
  async newsletter(_source, { email, optional }, { dataSources, storeCode }): Promise<string> {
    return await dataSources.magento.newsletter.add({
      email,
      storeCode,
      optional: {
        ...optional,
        gender: mapGender(optional?.gender) as any,
      },
    });
  },
  async subscribe(_source, { email }, { dataSources, storeCode }): Promise<ISubscribe> {
    return await dataSources.magento.newsletter.subscribe({
      email,
      storeCode,
    });
  },
};

export default {
  Mutation,
};
