/**
 * @title example extension
 * @desc Example extension boilerplate.
 **/
const typeDef = ``;
import { IResolvers } from '../../types/graphql';
import { ResolverContext } from '../../types';

const resolver: IResolvers<ResolverContext> = {
  UrlRewrite: {
    entity_type: async ({ entity_type, entity_id }, _, { dataSources, storeCode }) => {
      if (entity_type === 'category') {
        const { items } = await dataSources.magento.category.find(storeCode);
        const category = items.filter(item => `${entity_id}` === `${item.entity_id}`);
        if (category.length === 1) {
          if (category[0].display_mode === 'PAGE') {
            return 'category_landing_page';
          }
        }
      }
      return entity_type;
    },
  },
};

export { typeDef, resolver };
