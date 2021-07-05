import { sign, verify } from 'jsonwebtoken';
import { ResolverContext } from '../../types';
import { IMutationResolvers, IQueryResolvers, IResolvers } from '../../types/graphql';
import typeDef from './types.graphql';
import configs from '../../configs/vars';
import { ApplicationError } from '../../error/ApplicationError';
import { IVipValidateResponse } from '../../dataSource/magento/vvip/MagentoVipDataResponse';

const Query: IQueryResolvers<ResolverContext> = {
  async vipList(_source, data, { dataSources }) {
    return await dataSources.magento.vvip.getList();
  },
  async vipWithToken(_source, { token }, { dataSources }) {
    try {
      const response = verify(token, configs.jwt.secret) as IVipValidateResponse;
      const { url, email, phone, t1No } = response;
      const responseData = await dataSources.magento.vvip.validate({ url, email, phone, t1No });
      const newToken = sign({ ...responseData, t1No, url }, configs.jwt.secret, { expiresIn: '1d' });
      return {
        ...responseData,
        url,
        t1No,
        token: newToken,
      };
    } catch (e) {
      throw new ApplicationError('Token is not valid.');
    }
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async vipValidate(_source, { input }, { dataSources }) {
    const { url, email, phone, t1No } = input;
    const response = await dataSources.magento.vvip.validate({ url, email, phone, t1No });
    if (!response.status) throw new ApplicationError('401 Login Vip Failed.');
    const token = sign({ ...response, t1No, url }, configs.jwt.secret, { expiresIn: '1d' });

    return {
      ...response,
      url,
      token,
      t1No,
    };
  },
  async vipNeedAssistance(_source, { input }, { dataSources }) {
    const { url, t1No } = input;
    return await dataSources.magento.vvip.needAssistance({ url, t1No });
  },
  async vipInterest(_source, { input }, { dataSources }) {
    const { url, t1No, ids } = input;
    return await dataSources.magento.vvip.interest({ url, t1No, ids });
  },
};

const resolver: IResolvers = {
  Query,
  Mutation,
};

export { typeDef, resolver };
