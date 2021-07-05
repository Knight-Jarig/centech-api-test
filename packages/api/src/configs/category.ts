import config from '../configs/vars';

const bu = config.bu;

const whiteListMainCategoryConfig = {
  cds: {
    enable: true,
    fields: ['beauty', 'women', 'men', 'kids', 'home', 'tech', 'sports'],
  },
  rbs: {
    enable: true,
    fields: [
      'health-beauty',
      'home-living',
      'sports-leisure',
      'gadgets-electronics',
      'mom-kids',
      'women-fashion',
      'men-unisex',
      'bags-accessories',
    ],
  },
};

const whiteListMainCategoryEnable = whiteListMainCategoryConfig[bu]?.enable ?? false;

const whiteListMainCategory = whiteListMainCategoryEnable ? whiteListMainCategoryConfig[bu].fields : null;

export { whiteListMainCategory, whiteListMainCategoryEnable };
