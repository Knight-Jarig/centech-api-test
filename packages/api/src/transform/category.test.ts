import transformCategory from './category';

describe('logging utils', () => {
  it('category function should run properly', async () => {
    const expected = {
      children: '',
      children_count: 0,
      created_at: '',
      description: '',
      display_mode: '',
      icon: '',
      id: 0,
      image: '',
      include_in_menu: false,
      is_active: false,
      is_virtual_category: '',
      level: 0,
      meta_description: '',
      meta_keywords: '',
      meta_title: '',
      name: '',
      parent_id: 0,
      path: [],
      position: 0,
      updated_at: '',
      url_key: '',
      url_path: '',
      virtual_category_root: '',
      extension_attributes: {
        disable_best_seller_section: false,
        disable_new_arrival_section: false,
      },
    };
    const result = await transformCategory.category([]);
    expect(result).toEqual(expected);
  });

  it('category function should run properly', async () => {
    const category = {
      custom_attributes: [
        {
          attribute_code: 'disable_best_seller_section',
          value: '1',
          label: 'Disable_best_seller_section',
          name: 'disable_best_seller_section',
        },
        {
          attribute_code: 'disable_new_arrival_section',
          value: '0',
          label: 'disable_new_arrival_section',
          name: 'disable_new_arrival_section',
        },
      ],
    };
    const expected = {
      children: '',
      children_count: 0,
      created_at: '',
      description: '',
      display_mode: '',
      icon: '',
      id: 0,
      image: '',
      include_in_menu: false,
      is_active: false,
      is_virtual_category: '',
      level: 0,
      meta_description: '',
      meta_keywords: '',
      meta_title: '',
      name: '',
      parent_id: 0,
      path: [],
      position: 0,
      updated_at: '',
      url_key: '',
      url_path: '',
      virtual_category_root: '',
      custom_attributes: [
        {
          attribute_code: 'disable_best_seller_section',
          value: '1',
          label: 'Disable_best_seller_section',
          name: 'disable_best_seller_section',
        },
        {
          attribute_code: 'disable_new_arrival_section',
          value: '0',
          label: 'disable_new_arrival_section',
          name: 'disable_new_arrival_section',
        },
      ],
      extension_attributes: {
        disable_best_seller_section: true,
        disable_new_arrival_section: false,
      },
    };
    const result = await transformCategory.category(category);
    expect(result).toEqual(expected);
  });

  it('categories function should run properly', async () => {
    const input = {
      children_data: [
        {
          children: '',
          children_count: 0,
          created_at: '',
          description: '',
          display_mode: '',
          icon: '',
          id: 0,
          image: '',
          include_in_menu: false,
          is_active: false,
          is_virtual_category: '',
          level: 0,
          meta_description: '',
          meta_keywords: '',
          meta_title: '',
          name: '',
          parent_id: 0,
          path: [],
          position: 0,
          updated_at: '',
          url_key: '',
          url_path: '',
          virtual_category_root: '',
        },
      ],
    };
    const expected = [
      {
        children_count: 0,
        children_data: [],
        id: 0,
        include_in_menu: false,
        is_active: false,
        level: 0,
        name: '',
        parent_id: 0,
        position: 0,
        product_count: 0,
        url_key: '',
        url_path: '',
        virtual_category_root: 0,
      },
    ];
    const result = await transformCategory.categories(input);
    expect(result).toEqual(expected);
  });
});
