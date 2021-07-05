import { setModel } from '../utils/setModel';
import { explode } from '../utils/attribute.utils';
import get from 'lodash/get';
import moment from 'moment';

class ProductModel {
  specialPriceCalculate(start, end, specialPrice) {
    const currentDate = moment().add(7, 'hours');
    const minDate = moment(start);
    const maxDate = moment(end);

    // case has special without start and end
    if (specialPrice && !start && !end) {
      return specialPrice;
    }

    // case has minDate and max date
    if (minDate && currentDate > minDate) {
      if (!maxDate.isValid()) {
        return specialPrice;
      }

      if (maxDate && currentDate < maxDate) {
        return specialPrice;
      }

      return null;
    } else {
      return null;
    }
  }

  transformPriceRuleOverlay(overlay) {
    return {
      id: overlay.rule_id,
      overlay_image: overlay.overlay_image,
      display_priority: +overlay.display_priority,
    };
  }

  transform(product): any {
    const exploded = explode(product);
    const { number, array, string, bool, object } = setModel(exploded);

    const defaultSchema = {
      id: number('id', null),
      attribute_set_id: number('attribute_set_id', null),
      sku: string('sku', null),
      name: string('name', null),
      price: number('price', null),
      breadcrumbs: array('breadcrumbs') || [],
      status: number('status', null),
      visibility: number('visibility', null),
      type_id: string('type_id', null),
      created_at: string('created_at', null),
      updated_at: string('updated_at', null),
      product_links: array('product_links'),
      options: array('options'),
      media_gallery_entries: array('media_gallery_entries'),
      tier_prices: array('tier_prices'),
      // Common Product attribute
      image: string('image', string('custom_attributes.image', null)),
      small_image: string('small_image', string('custom_attributes.small_image', null)),
      thumbnail: string('thumbnail', string('custom_attributes.thumbnail', null)),
      url_key: string('custom_attributes.url_key', null),
      description: string('custom_attributes.description', null),
      short_description: string('custom_attributes.short_description', null),
      special_price: this.specialPriceCalculate(
        product?.special_from_date || string('custom_attributes.special_from_date', null),
        product?.special_to_date || string('custom_attributes.special_to_date', null),
        product?.special_price || number('custom_attributes.special_price', null),
      ),
      special_from_date: product?.special_from_date || string('custom_attributes.special_from_date', null),
      special_to_date: product?.special_to_date || string('custom_attributes.special_to_date', null),
      meta_title: string('custom_attributes.meta_title'),
      meta_keyword: string('custom_attributes.meta_keyword'),
      meta_description: string('custom_attributes.meta_description'),
      marketplace_product_type_option: string('custom_attributes.marketplace_product_type'),
      marketplace_seller_option: string('custom_attributes_option.marketplace_seller'),
      // Custom Product attribute
      custom_attributes: object('custom_attributes'),
      custom_attributes_option: object('custom_attributes_option'),
      extension_attributes: {
        ...object('extension_attributes'),
        category_paths: array('extension_attributes.category_paths'),
        free_shipping_amount: number('extension_attributes.free_shipping_amount'),
        category_links: array('extension_attributes.category_links'),
        ispu_salable: bool('extension_attributes.ispu_salable', null),
        salable: bool('extension_attributes.salable') || bool('stock.salable'),
        seller_url_key: string('extension_attributes.seller_url_key'),
        stock_item: {
          ...object('extension_attributes.stock_item'),
          qty: number('extension_attributes.stock_item.qty', null),
          is_in_stock: bool('extension_attributes.stock_item.is_in_stock', null),
          use_config_min_qty: bool('extension_attributes.stock_item.use_config_min_qty'),
          min_qty: number('extension_attributes.stock_item.min_qty', null),
          use_config_min_sale_qty: bool('extension_attributes.stock_item.use_config_min_sale_qty'),
          min_sale_qty: number('extension_attributes.stock_item.min_sale_qty'),
          use_config_max_sale_qty: bool('extension_attributes.stock_item.use_config_max_sale_qty'),
          max_sale_qty: number('extension_attributes.stock_item.max_sale_qty'),
        },
        overall_rating: {
          rating: number('extension_attributes.overall_rating.rating', null),
          total_vote: number('extension_attributes.overall_rating.total_vote', null),
          five_star: number('extension_attributes.overall_rating.five_star', null),
          four_star: number('extension_attributes.overall_rating.four_star', null),
          three_star: number('extension_attributes.overall_rating.three_star', null),
          two_star: number('extension_attributes.overall_rating.two_star', null),
          one_star: number('extension_attributes.overall_rating.one_star', null),
          rounded_rating: number('extension_attributes.overall_rating.rounded_rating', null),
        },
        reviews: array('extension_attributes.reviews').map(review => {
          const ratingItem = get(review, 'rating_items', []);
          const images = get(review, 'extension_attributes.images', []);
          return (
            review && {
              ...review,
              nickname: review.nickname || '',
              rating_items: {
                rating_id: (ratingItem[0] && ratingItem[0].rating_id) || 0,
                rating: (ratingItem[0] && ratingItem[0].rating) || 0,
                category: (ratingItem[0] && ratingItem[0].category) || '',
              },
              created_at: review.created_at || '',
              title: review.title || '',
              detail: review.detail || '',
              is_validate: !!review.is_validate,
              images: images?.map(image => ({ path: image })),
            }
          );
        }),
        // specification_attributes: array('extension_attributes.specification_attributes') || [],
        specification_attributes: array('extension_attributes.specification_attributes').map(spec => {
          const attributeCode = get(spec, 'attribute_code', null);
          return (
            attributeCode && {
              attribute_code: attributeCode,
              label: get(spec, 'label', ''),
              value:
                get(exploded, `custom_attributes_option[${attributeCode}]`) ||
                get(exploded, `custom_attributes[${attributeCode}]`),
            }
          );
        }),
        t1c_redeemable_points: array('extension_attributes.t1c_redeemable_points'),
        t1c_earn_points_estimate: array('extension_attributes.t1c_earn_points_estimate'),
        free_items: array('extension_attributes.free_items').map((item, index) => ({
          qty: number(`extension_attributes.free_items.${index}.qty`),
          sku: get(item, 'sku', ''),
          name: get(item, 'name', ''),
          url_key: get(item, 'custom_attributes.url_key', ''),
          image: get(item, 'custom_attributes.image', ''),
          thumbnail: get(item, 'custom_attributes.thumbnail', ''),
        })),
        free_items_added: array(`extension_attributes.free_items_added`).map((fia, fiaKey) => ({
          quote_id: number(`extension_attributes.free_items_added.${fiaKey}.quote_id`),
          item_id: number(`extension_attributes.free_items_added.${fiaKey}.item_id`),
          sku: string(`extension_attributes.free_items_added.${fiaKey}.sku`),
          sales_rule_id: number(`extension_attributes.free_items_added.${fiaKey}.sales_rule_id`),
          qty: number(`extension_attributes.free_items_added.${fiaKey}.qty`),
          intent_qty: number(`extension_attributes.free_items_added.${fiaKey}.intent_qty`),
          for_item_id: number(`extension_attributes.free_items_added.${fiaKey}.for_item_id`),
          associated_item_id: number(`extension_attributes.free_items_added.${fiaKey}.associated_item_id`),
        })),
        installment_plans: array('extension_attributes.installment_plans').map(plan => ({
          installmentplan_id: get(plan, 'installmentplan_id', null),
          name: get(plan, 'installmentplan_id', null),
          bank_id: get(plan, 'bank_id', null),
          bank: get(plan, 'bank', {}),
          currency: get(plan, 'currency', ''),
          period: get(plan, 'period', ''),
          merchant_rate: get(plan, 'merchant_rate', ''),
          customer_rate: get(plan, 'customer_rate', ''),
          min_amount: get(plan, 'min_amount', ''),
          max_amount: get(plan, 'max_amount', ''),
          active: get(plan, 'active', ''),
          valid_from: get(plan, 'valid_from', ''),
          valid_until: get(plan, 'valid_until', ''),
          create: get(plan, 'create', ''),
        })),
        suggest_promotions: array('extension_attributes.suggest_promotions'),
        cc_promotions: array('extension_attributes.cc_promotions').map(promotion => ({
          discount: get(promotion, 'discount', 0),
          bank_icon: get(promotion, 'bank_icon', ''),
          bank_color: get(promotion, 'bank_color', ''),
          sales_rule_id: get(promotion, 'sales_rule_id', ''),
          promotion_id: get(promotion, 'promotion_id', ''),
        })),
        overlays: array('extension_attributes.overlays'),
        size_map: object('extension_attributes.size_map', {}),
        size_maps: array('extension_attributes.size_maps', []),
        flash_sale_price: array('extension_attributes.flash_sale_price'),
      },
      configurable_product_items: array('configurable_product_items'),
      marketplace: {
        seller: selectMarketPlaceSeller(array('custom_attributes_option')),
        seller_id: string('custom_attributes.marketplace_seller'),
        seller_url_key: string('extension_attributes.seller_url_key'),
      },
    };

    return defaultSchema;
  }
}

function selectMarketPlaceSeller(custom_attributes) {
  return custom_attributes?.marketplace_seller || '';
}

export default new ProductModel();
