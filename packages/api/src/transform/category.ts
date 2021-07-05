import { setModel } from '../utils/setModel';
import get from 'lodash/get';
import map from 'lodash/map';
import { explode } from '../utils/attribute.utils';

const category: any = value => {
  const exploded = explode(value);
  const { number, array, string, bool } = setModel(exploded);

  return {
    ...value,
    id: number('id', null),
    parent_id: number('parent_id', null),
    name: string('name', ''),
    is_active: bool('is_active'),
    position: number('position'),
    level: number('level', null),
    children: string('children', ''),
    created_at: string('created_at'),
    updated_at: string('updated_at'),
    include_in_menu: bool('include_in_menu'),
    meta_title: string('custom_attributes.meta_title'),
    meta_keywords: string('custom_attributes.meta_keywords'),
    meta_description: string('custom_attributes.meta_description'),
    children_count: number('children_count', 0),
    url_key: string('custom_attributes.url_key'),
    url_path: string('custom_attributes.url_path'),
    path: array('path'),
    is_virtual_category: string('custom_attributes.is_virtual_category'),
    virtual_category_root: string('custom_attributes.virtual_category_root'),
    description: string('custom_attributes.description'),
    image: string('custom_attributes.image'),
    icon: string('custom_attributes.icon'),
    display_mode: string('custom_attributes.display_mode'),
    extension_attributes: {
      ...(value?.extension_attributes || {}),
      disable_new_arrival_section: string('custom_attributes.disable_new_arrival_section') === '1' ? true : false,
      disable_best_seller_section: string('custom_attributes.disable_best_seller_section') === '1' ? true : false,
    },
  };
};

const categories = value => {
  const cateExcludeRoot = value.children_data;
  const recuresiveMapping = currentCategory => {
    const transformedCate = {
      id: Number(currentCategory.id),
      parent_id: Number(currentCategory.parent_id),
      name: currentCategory.name,
      is_active: Boolean(get(currentCategory, 'is_active', false)),
      position: Number(currentCategory.position),
      level: Number(currentCategory.level),
      product_count: Number(get(currentCategory, 'product_count', 0)),
      include_in_menu: Boolean(get(currentCategory, 'include_in_menu', false)),
      children_count: Number(get(currentCategory, 'children_count', 0)),
      url_key: get(currentCategory, 'url_key', ''),
      url_path: get(currentCategory, 'url_path', ''),
      virtual_category_root: Number(get(currentCategory, 'virtual_category_root', null)),
      children_data: get(currentCategory, 'children_data', []),
    };

    if (currentCategory.children_data && currentCategory.children_data.length > 0) {
      return {
        ...transformedCate,
        children_data: map(currentCategory.children_data, children => recuresiveMapping(children)),
      };
    } else {
      return transformedCate;
    }
  };

  return map(cateExcludeRoot, cate => recuresiveMapping(cate));
};

export default {
  category,
  categories,
};
