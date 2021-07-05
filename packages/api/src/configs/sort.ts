import config from '../configs/vars';

const sortProductListConfigCDSRBS = [
  {
    key: 'recommended',
    label: { th: 'สินค้าแนะนำ', en: 'Recommended' },
    sortBy: 'recommended',
    orderBy: 'DESC',
  },
  {
    key: 'new_arrivals',
    label: { th: 'สินค้ามาใหม่', en: 'New Arrivals' },
    sortBy: 'created_at',
    orderBy: 'DESC',
  },
  {
    key: 'price_desc',
    label: { th: 'ราคา สูง-ต่ำ', en: 'Price High-Low' },
    sortBy: 'price',
    orderBy: 'DESC',
  },
  {
    key: 'price_asc',
    label: { th: 'ราคา ต่ำ-สูง', en: 'Price Low-High' },
    sortBy: 'price',
    orderBy: 'ASC',
  },
  {
    key: 'discount_amount_desc',
    label: { th: 'ส่วนลด สูง-ต่ำ', en: 'Discount High-Low' },
    sortBy: 'discount_amount',
    orderBy: 'DESC',
  },
  {
    key: 'discount_amount_asc',
    label: { th: 'ส่วนลด ต่ำ-สูง', en: 'Discount Low-High' },
    sortBy: 'discount_amount',
    orderBy: 'ASC',
  },
  // {
  //   key: 'top_rated',
  //   label: { th: 'สินค้าที่ได้คะแนนโหวตสูงสุด', en: 'Top Rated' },
  //   sortBy: 'rating',
  //   orderBy: 'DESC',
  // },
  {
    key: 'most_reviews',
    label: { th: 'สินค้าที่มีการโหวตเยอะสุด', en: 'Most Reviews' },
    sortBy: 'review_count',
    orderBy: 'DESC',
  },
];

const sortProductListConfig = {
  cds: sortProductListConfigCDSRBS,
  rbs: sortProductListConfigCDSRBS,
  default: [
    {
      key: 'recommended',
      label: { th: 'สินค้าแนะนำ', en: 'Recommended' },
      sortBy: 'recommended',
      orderBy: 'DESC',
    },
  ],
};

const sortProductListConfigBU = sortProductListConfig[config.bu] ?? sortProductListConfig.default;

const clothingSizeConfig = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'];

export { sortProductListConfigBU, clothingSizeConfig };
