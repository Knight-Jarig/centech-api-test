import { ResolverContext } from '../../types';
import { IBrand, IBrandDetail, IQueryResolvers } from '../../types/graphql';
import BrandModel from '../../transform/brand.model';

const Query: IQueryResolvers<ResolverContext> = {
  async brands(
    _source,
    { input: { filterGroups, page, size, sortOrders } },
    { dataSources, storeCode },
  ): Promise<IBrand[]> {
    return await dataSources.magento.brand.find({
      filterGroups,
      page,
      size,
      sortOrders: sortOrders as any,
      storeCode,
    });
  },
  async brandDetail(_source, { brandId }, { dataSources, storeCode }): Promise<IBrandDetail> {
    const brand = await dataSources.magento.brand.findOne({ brandId: brandId as any, storeCode });
    return BrandModel.transformBrand(brand);
  },
};

export default {
  Query,
};
