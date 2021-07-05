/**
 * @title catalogServiceFilterByFlashdeal
 * @desc Search for PWB logic check active flash deal category
 **/
import { find, get } from 'lodash';
import { ResolverContext } from '../../types';
import { DateTime } from 'luxon';
import productModel from '../../transform/product.model';

const typeDef = ``;

const isFlashDeal = async (dataSources, filterGroups) => {
  try {
    const activeCategory = await dataSources.magento.flashDeals.activeCategory();
    const activeCategoryId = get(activeCategory, 'active_flash_deal_category_id', 0);
    const category = find(filterGroups, filter => get(filter, 'filters.0.field') === 'category_id');
    const categoryId = get(category, 'filters.0.value', 0);

    return activeCategoryId !== 0 && activeCategoryId === categoryId;
  } catch (error) {
    return false;
  }
};

const resolver = {
  Category: {
    async is_hide_display_price({ name }) {
      const currentTime = DateTime.utc();
      const [startTimePeriod] = convertStringToTimePeriod(name);
      if (!startTimePeriod) return false;
      const startTime = DateTime.fromFormat(startTimePeriod, 'hh:mm a', { zone: 'utc+7' }).toUTC();

      return isFutureTime(currentTime, startTime);
    },
  },
  Query: {
    productSearch: async (
      _source,
      { filter: { filterGroups, page, size, sortOrders } },
      { dataSources, storeCode }: ResolverContext,
    ) => {
      let customFilterGroups = filterGroups;
      const isFlashDealEnable = await isFlashDeal(dataSources, filterGroups);

      if (isFlashDealEnable) {
        customFilterGroups = [...customFilterGroups, { filters: [{ field: 'flash_deal_enable', value: '1' }] }];
      }

      const result = await dataSources.magento.catalogService.find(
        {
          filterGroups: customFilterGroups,
          page,
          size,
          sortOrders,
        },
        storeCode,
      );
      return {
        ...result,
        products: result.products.map(item => productModel.transform(item)),
      };
    },
  },
};

export { typeDef, resolver };

export function addSpace(string) {
  return `${string.substr(0, 5)} ${string.substr(5, 2)}`;
}
export function convertStringToTimePeriod(text) {
  const re = /(\d{1,2}:\d{2}(AM|PM|) - \d{1,2}:\d{2}(AM|PM)){1}/g;
  try {
    const [start, end] = re.exec(text)?.[0].split(' - ');
    return [addSpace(start.endsWith('M') ? start : start + end.substr(5, 2)), addSpace(end)];
  } catch (error) {
    return [null, null];
  }
}
export function isFutureTime(currentTime: DateTime, startTime: DateTime): boolean {
  return currentTime < startTime;
}
