export const productSimple = {
    type_id: 'simple',
    custom_attributes: {
        size: 1,
        price: 99,
        description: 'test description',
    },
    custom_attributes_option: {
        size: 'SMALL',
        price: 99,
        description: 'test description option',
    },
    configurable_product_items: [],
    special_price: 50,
    price: 90,
};

export const productConfigurable = {
    type_id: 'configurable',
    image: '',
    media_gallery_entries: [],
    custom_attributes: {
        size: 1,
        price: 99,
        description: 'test description',
        product_tags: 'tag1, tag2, tag3',
    },
    custom_attributes_option: {
        size: 'SMALL',
        price: 99,
        description: 'test description option',
    },
    configurable_product_items: [
        {
            image: '',
            price: 500,
            special_price: 300,
            media_gallery_entries: [],
        },
        {
            image: 'image_url.jpg',
            price: 50,
            special_price: null,
            media_gallery_entries: [],
        },
        {
            image: '',
            price: 1000,
            special_price: 30,
            media_gallery_entries: [
                {
                    disabled: false,
                    file: 'image_gallery.jpg',
                    id: 1,
                    label: 'sample',
                },
            ],
        },
    ],
    special_price: 0,
    price: 0,
};

export const mockProductBySku = {
    custom_attributes_option: [
      { attribute_code: 'brand_name', value: "BURT'S BEES" },
      { attribute_code: 'group_by', value: 'ไซส์' },
      { attribute_code: 'gift_message_available', value: 'No' },
      { attribute_code: 'gift_wrapping_available', value: 'No' },
      {
        attribute_code: 'options_container',
        value: 'Block after Info Column'
      },
      { attribute_code: 'bu', value: 'CDS' },
      { attribute_code: 'product_sell_type', value: 'Free Gift' },
      { attribute_code: 'content_status', value: 'Approved' },
      { attribute_code: 'copywrite_status', value: 'New' },
      {
        attribute_code: 'msrp_display_actual_price_type',
        value: 'Use config'
      },
      { attribute_code: 'photo_status', value: 'New' },
      { attribute_code: 'jda_status_code', value: 'P' },
      { attribute_code: 'tax_class_id', value: 'Taxable Goods' },
      { attribute_code: 'can_return', value: 'Yes' },
      { attribute_code: 'can_exchange', value: 'Yes' },
      { attribute_code: 'cmpgn', value: [ 'default' ] },
      { attribute_code: 'size', value: '0.12 ออนซ์' },
      { attribute_code: 'color_shade', value: 'Doused Rose' },
      { 
          attribute_code: 'payment_methods', 
          value: [
              'Bank Transfer / Service Counter',
              'Credit Card / Debit Card',
              'Cash On Delivery',
              'PayPal Billing Agreement'
          ]
      },
      { attribute_code: 'shipping_methods', value: [ 'รับเวลาปกติ', 'MultiShipping', 'จัดส่งปกติ' ] },
      { attribute_code: 'color', value: 'ขาว' }
    ],
    breadcrumbs: [
      { category_id: 5452, name: 'beauty', level: 2, url: 'root/beauty' },
      {
        category_id: 5453,
        name: 'makeup',
        level: 3,
        url: 'root/beauty/makeup'
      },
      {
        category_id: 5473,
        name: 'lips',
        level: 4,
        url: 'root/beauty/makeup/lips'
      },
      {
        category_id: 5474,
        name: 'lipstick',
        level: 5,
        url: 'root/beauty/makeup/lips/lipstick'
      }
    ],
    id: 9236,
    sku: 'CDS14281891',
    name: "BURT'S BEES ลิปสติก Lipstick #Doused Rose",
    attribute_set_id: 4,
    price: 890,
    status: 1,
    visibility: 1,
    type_id: 'simple',
    created_at: '2018-08-14 12:41:43',
    updated_at: '2021-01-29 04:32:13',
    extension_attributes: {
      website_ids: [ 1 ],
      category_links: [
          { position: 0, category_id: '5474' },
          { position: 0, category_id: '5473' },
          { position: 0, category_id: '5453' },
          { position: 0, category_id: '5452' },
          { position: 0, category_id: '5451' },
          { position: 0, category_id: '260' },
          { position: 0, category_id: '3112' },
          { position: 0, category_id: '3111' },
          { position: 0, category_id: '3092' },
          { position: 0, category_id: '3060' },
          { position: 0, category_id: '3055' },
          { position: 0, category_id: '3742' },
          { position: 0, category_id: '6856' },
          { position: 0, category_id: '6786' }
      ],
      stock_item: {
        item_id: 201595,
        product_id: 9236,
        stock_id: 1,
        qty: 1555,
        is_in_stock: true,
        is_qty_decimal: false,
        show_default_notification_message: false,
        use_config_min_qty: true,
        min_qty: 0,
        use_config_min_sale_qty: 1,
        min_sale_qty: 1,
        use_config_max_sale_qty: true,
        max_sale_qty: 200,
        use_config_backorders: true,
        backorders: 0,
        use_config_notify_stock_qty: true,
        notify_stock_qty: 1,
        use_config_qty_increments: true,
        qty_increments: 0,
        use_config_enable_qty_inc: true,
        enable_qty_increments: false,
        use_config_manage_stock: true,
        manage_stock: true,
        low_stock_date: null,
        is_decimal_divided: false,
        stock_status_changed_auto: 0
      },
      overall_rating: {
        rating_id: null,
        rating: 0,
        category: null,
        option_id: null,
        total_vote: 0,
        five_star: 0,
        four_star: 0,
        three_star: 0,
        two_star: 0,
        one_star: 0
      },
      reviews: [],
      specification_attributes: [ { attribute_code: 'room_size_sqm', label: 'Room size (SQM)' } ],
      category_paths: [
          { category_id: 5474, name: 'lipstick', level: 6, parent_id: 5473 },
          { category_id: 5473, name: 'lips', level: 5, parent_id: 5453 },
          { category_id: 5453, name: 'makeup', level: 4, parent_id: 5452 },
          { category_id: 5452, name: 'beauty', level: 3, parent_id: 5451 },
          { category_id: 5451, name: 'root', level: 2, parent_id: 260 },
          { category_id: 260, name: 'CDS', level: 1, parent_id: 1 },
          { category_id: 3112, name: 'Lipstick', level: 5, parent_id: 3111 },
          { category_id: 3111, name: 'Lips', level: 4, parent_id: 3092 },
          { category_id: 3092, name: 'Makeup', level: 3, parent_id: 3060 },
          { category_id: 3060, name: 'Beauty', level: 2, parent_id: 260 },
          { category_id: 3055, name: 'Home', level: 2, parent_id: 260 },
          {
              category_id: 3742,
              name: 'cooking_dining',
              level: 3,
              parent_id: 3055
          },
          { category_id: 6856, name: 'PreOrder', level: 3, parent_id: 6786 },
          { category_id: 6786, name: 'QA', level: 2, parent_id: 260 }
      ],
      t1c_redeemable_points: [ 7120 ],
      t1c_earn_points_estimate: [ 36 ],
      suggest_promotions: [
          {
              rule_id: 218,
              rule_is_active: true,
              rule_sort_order: 10,
              rule_name: 'Buy 1000  get free item',
              action_type: 'ampromo_items',
              label: 'Buy 1000  get free item',
              coupon_code: 'freeitem',
              start_datetime: '2018-11-26',
              end_datetime: null,
              promotion_name: 'TEST',
              full_condition: 'TEST',
              short_description: 'TEST',
              display_priority: 1
          }
      ]
    },
    product_links: [],
    options: [],
    media_gallery_entries: [
      {
        id: 20179,
        media_type: 'image',
        label: null,
        position: 1,
        disabled: false,
        types: [ 'image', 'small_image', 'thumbnail' ],
        file: '/C/D/CDS14281891.jpg'
      }
    ],
    tier_prices: [],
    custom_attributes: [
      {
        attribute_code: 'brand_name',
        value: '1044',
        label: 'Brand Name',
        name: 'brand_name'
      },
      {
        attribute_code: 'is_migrated',
        value: '1',
        label: 'is_migrated',
        name: 'is_migrated'
      },
      {
        attribute_code: 'is_limited',
        value: '0',
        label: 'Limited Edition',
        name: 'is_limited'
      },
      {
        attribute_code: 'group_by',
        value: '762',
        label: 'Group By',
        name: 'group_by'
      },
      {
        attribute_code: 'image',
        value: '/C/D/CDS14281891.jpg',
        label: 'Base',
        name: 'image'
      },
      {
        attribute_code: 'url_key',
        value: 'lipstick-doused-rose-doused-rose-0-12-oz1-cds14281891',
        label: 'URL Key',
        name: 'url_key'
      },
      {
        attribute_code: 'special_price',
        value: '890.000000',
        label: 'Special Price',
        name: 'special_price'
      },
      {
        attribute_code: 'flash_deal_enable',
        value: '0',
        label: 'Enable',
        name: 'flash_deal_enable'
      },
      {
        attribute_code: 'gift_message_available',
        value: '0',
        label: 'Allow Gift Message',
        name: 'gift_message_available'
      },
      {
        attribute_code: 'is_jda',
        value: '0',
        label: 'is_jda',
        name: 'is_jda'
      },
      {
        attribute_code: 'stock_status_breakpoint',
        value: '100',
        label: 'Stock Status Breakpoint',
        name: 'stock_status_breakpoint'
      },
      {
        attribute_code: 'description',
        value: "<p><strong>BURT'S BEES</strong> ลิปสติก</p>\r\n" +
          '<p>ลิปสติกที่รักริมฝีปากคุณ เนื้อสัมผัส ดุจซาติน มีให้เลือกถึง 18 สี จาก <strong><span class="caps">BURT</span>‘S <span class="caps">BEES</span></strong></p>\r\n' +
          '<ul>\r\n' +
          '<li>ลิปสติกสูตรใหม่ เนื้อสัมผัสดุจซาติน มาพร้อมส่วนผสมจากธรรมชาติ 100%</li>\r\n' +
          '<li>อาทิ บีส์แว๊กซ์ โมริงก้าออยล์ และเมล็ดราสเบอร์รี่ออยล์ ที่จะมอบประสบการณ์เลอค่าให้ริมฝีปากของคุณสาวๆ ด้วยความชุ่มชื่นล้ำลึกยาวนานถึง 8 ชั่วโมง</li>\r\n' +
          '<li>ไม่เพียงแค่ส่วนผสม 100% ของลิปสติกมาจากธรรมชาติเท่านั้น บรรจุภัณฑ์ยังทำจากวัสดุรีไซเคิล 100% ซึ่งไม่เพียงที่เราจะรักตัวเองด้วยการใช้ผลิตภัณฑ์ดีๆ แต่ยังรักษ์ธรรมชาติอีกด้วย</li>\r\n' +
          '<li>สี Doused Rose</li>\r\n' +
          '<li>0.12 oz.</li>\r\n' +
          '</ul>\r\n' +
          '<ul>\r\n' +
          '<li><strong>สินค้ามีอายุ 3 ปี นับจากวันผลิต</strong></li>\r\n' +
          '</ul>\r\n' +
          '<p><strong>หมายเหตุ: สีของผลิตภัณฑ์ที่แสดงบนเว็บไซต์อาจมีความแตกต่างกันจากการตั้งค่าการแสดงผลของแต่ละหน้าจอ</strong></p>',
        label: 'Description',
        name: 'description'
      },
      {
        attribute_code: 'is_travel',
        value: '0',
        label: 'Travel Mini',
        name: 'is_travel'
      },
      {
        attribute_code: 'group_name',
        value: 'ลิปสติก Lipstick',
        label: 'group name',
        name: 'group_name'
      },
      {
        attribute_code: 'small_image',
        value: '/C/D/CDS14281891.jpg',
        label: 'Small',
        name: 'small_image'
      },
      {
        attribute_code: 'meta_title',
        value: "BURT'S BEES ลิปสติก Lipstick #Doused Rose | Central Online",
        label: 'Meta Title',
        name: 'meta_title'
      },
      {
        attribute_code: 'gift_wrapping_available',
        value: '0',
        label: 'Allow Gift Wrapping',
        name: 'gift_wrapping_available'
      },
      {
        attribute_code: 'jda_sku',
        value: '4551866',
        label: 'jda_sku',
        name: 'jda_sku'
      },
      {
        attribute_code: 'options_container',
        value: 'container2',
        label: 'Display Product Options In',
        name: 'options_container'
      },
      {
        attribute_code: 'is_sets',
        value: '0',
        label: 'Sets',
        name: 'is_sets'
      },
      {
        attribute_code: 'thumbnail',
        value: '/C/D/CDS14281891.jpg',
        label: 'Thumbnail',
        name: 'thumbnail'
      },
      {
        attribute_code: 'jda_price',
        value: '790.000000',
        label: 'Original_price',
        name: 'jda_price'
      },
      { attribute_code: 'bu', value: '225', label: 'BU', name: 'bu' },
      {
        attribute_code: 'job_number',
        value: 'CDS1803-0664',
        label: 'Job number',
        name: 'job_number'
      },
      {
        attribute_code: 'meta_description',
        value: "BURT'S BEES ลิปสติก",
        label: 'Meta Description',
        name: 'meta_description'
      },
      {
        attribute_code: 'flash_deal_sold_qty',
        value: '-2',
        label: 'Sold Qty',
        name: 'flash_deal_sold_qty'
      },
      {
        attribute_code: 'jda_dept',
        value: '1',
        label: 'jda_dept',
        name: 'jda_dept'
      },
      {
        attribute_code: 'content_note',
        value: '30/10/2018 Clean Data จาก Admin ไป Magento Linesheet - NEW<br/>Yes',
        label: 'Content note',
        name: 'content_note'
      },
      {
        attribute_code: 'catalog_no',
        value: '8982722',
        label: 'Catalog No.',
        name: 'catalog_no'
      },
      {
        attribute_code: 'jda_subdept',
        value: '102',
        label: 'jda_subdept',
        name: 'jda_subdept'
      },
      {
        attribute_code: 'product_sell_type',
        value: '448',
        label: 'Product Sell type',
        name: 'product_sell_type'
      },
      {
        attribute_code: 'content_status',
        value: '2906',
        label: 'Content Status',
        name: 'content_status'
      },
      { attribute_code: 'new', value: '1', label: 'New', name: 'new' },
      {
        attribute_code: 'jda_class',
        value: '102',
        label: 'jda_class',
        name: 'jda_class'
      },
      {
        attribute_code: 'copywrite_status',
        value: '2910',
        label: 'Copywrite Status',
        name: 'copywrite_status'
      },
      {
        attribute_code: 'only_central_tag',
        value: '0',
        label: 'Only at Central',
        name: 'only_central_tag'
      },
      {
        attribute_code: 'jda_subclass',
        value: '4',
        label: 'jda_subclass',
        name: 'jda_subclass'
      },
      {
        attribute_code: 'online_exclusive_tag',
        value: '1',
        label: 'Online Exclusive Tag',
        name: 'online_exclusive_tag'
      },
      {
        attribute_code: 'msrp_display_actual_price_type',
        value: '0',
        label: 'Display Actual Price',
        name: 'msrp_display_actual_price_type'
      },
      {
        attribute_code: 'jda_brand_id',
        value: 'TESTPROD',
        label: 'jda_brand_id',
        name: 'jda_brand_id'
      },
      {
        attribute_code: 'allow_cc',
        value: '1',
        label: 'Allow C&C',
        name: 'allow_cc'
      },
      {
        attribute_code: 'online_price_enabled',
        value: '1',
        label: 'Online Price Enabled',
        name: 'online_price_enabled'
      },
      {
        attribute_code: 'jda_sbc',
        value: '14281891',
        label: 'jda_sbc',
        name: 'jda_sbc'
      },
      {
        attribute_code: 'photo_status',
        value: '2914',
        label: 'Photo Status',
        name: 'photo_status'
      },
      {
        attribute_code: 'allow_gift_wrapping',
        value: '1',
        label: 'Allow Gift Wrapping',
        name: 'allow_gift_wrapping'
      },
      {
        attribute_code: 'online_price',
        value: '18.000000',
        label: 'Online Price',
        name: 'online_price'
      },
      {
        attribute_code: 'allow_cod',
        value: '1',
        label: 'Allow COD',
        name: 'allow_cod'
      },
      {
        attribute_code: 'jda_dtype',
        value: 'C',
        label: 'jda_dtype',
        name: 'jda_dtype'
      },
      {
        attribute_code: 'allow_express',
        value: '0',
        label: 'Allow Express Delivery',
        name: 'allow_express'
      },
      {
        attribute_code: 'online_to_date',
        value: '2019-11-30 08:31:00',
        label: 'Online Price To Date',
        name: 'online_to_date'
      },
      {
        attribute_code: 'allow_return',
        value: '0',
        label: 'Allow Return',
        name: 'allow_return'
      },
      {
        attribute_code: 'jda_discount_code',
        value: '00',
        label: 'JDA Discount Code',
        name: 'jda_discount_code'
      },
      {
        attribute_code: 'jda_status_code',
        value: '231',
        label: 'jda_status_code',
        name: 'jda_status_code'
      },
      {
        attribute_code: 'required_options',
        value: '0',
        name: 'required_options'
      },
      {
        attribute_code: 'category_ids',
        value: [
              '5474', '5473', '5453',
              '5452', '5451', '260',
              '3112', '3111', '3092',
              '3060', '3055', '3742',
              '6856', '6786'
          ],
        label: 'Categories',
        name: 'category_ids'
      },
      {
        attribute_code: 'allow_installment',
        value: '0',
        label: 'Allow Installment',
        name: 'allow_installment'
      },
      {
        attribute_code: 'jda_sku_type',
        value: '02',
        label: 'jda_sku_type',
        name: 'jda_sku_type'
      },
      { attribute_code: 'has_options', value: '0', name: 'has_options' },
      {
        attribute_code: 'tax_class_id',
        value: '2',
        label: 'Tax Class',
        name: 'tax_class_id'
      },
      {
        attribute_code: 'minimum_stock',
        value: '1',
        label: 'Minimum Stock',
        name: 'minimum_stock'
      },
      {
        attribute_code: 'can_return',
        value: '1',
        label: 'Can Return',
        name: 'can_return'
      },
      {
        attribute_code: 'can_exchange',
        value: '1',
        label: 'Can Exchange',
        name: 'can_exchange'
      },
      {
        attribute_code: 'preorder_shipping_date',
        value: '2019-09-04 00:00:00',
        label: 'Pre-order shipping date',
        name: 'preorder_shipping_date'
      },
      {
        attribute_code: 'recommended',
        value: '1',
        label: 'Recommended',
        name: 'recommended'
      },
      {
        attribute_code: 'homepage_new',
        value: '1',
        label: 'Homepage New',
        name: 'homepage_new'
      },
      {
        attribute_code: 'homepage_best_sellers',
        value: '0',
        label: 'Homepage Best Sellers',
        name: 'homepage_best_sellers'
      },
      {
        attribute_code: 'vat',
        value: '0',
        label: 'jda_is_vat',
        name: 'vat'
      },
      {
        attribute_code: 'is_returnable',
        value: '2',
        label: 'Enable RMA',
        name: 'is_returnable'
      },
      {
        attribute_code: 'amxnotif_hide_alert',
        value: '0',
        label: 'Hide Stock Alert Block',
        name: 'amxnotif_hide_alert'
      },
      {
        attribute_code: 'sell_on_jd',
        value: '0',
        label: 'Sell on JD',
        name: 'sell_on_jd'
      },
      {
        attribute_code: 'cmpgn',
        value: '16569',
        label: 'Campaign',
        name: 'cmpgn'
      },
      {
        attribute_code: 'search_keywords',
        value: "BURT'S BEES ลิปสติก Lipstick #Doused Rose Lipstick #Doused Rose Doused Rose 0.12 oz",
        label: 'Search Keywords',
        name: 'search_keywords'
      },
      {
        attribute_code: 'size',
        value: '10473',
        label: 'Size',
        name: 'size'
      },
      {
        attribute_code: 'ranking',
        value: '0.000000',
        label: 'Product Ranking',
        name: 'ranking'
      },
      {
        attribute_code: 'color_shade',
        value: '27659',
        label: 'Shade',
        name: 'color_shade'
      },
      {
        attribute_code: 'payment_methods',
        value: 'payment_service_bank_transfer,payment_service_fullpayment,cashondelivery,paypal_billing_agreement',
        label: 'Payment Methods',
        name: 'payment_methods'
      },
      {
        attribute_code: 'shipping_methods',
        value: 'pickupatstore_pickupatstore,central_multi_shipping,cds_standard',
        label: 'Shipping Methods',
        name: 'shipping_methods'
      },
      {
        attribute_code: 'size_type',
        value: '0',
        label: 'Size Type',
        name: 'size_type'
      },
      {
        attribute_code: 'color',
        value: '68',
        label: 'Color Template',
        name: 'color'
      },
      {
        attribute_code: 'central_url_generator_flag',
        value: '1',
        label: 'Url Generator Flag',
        name: 'central_url_generator_flag'
      },
      {
        attribute_code: 'pm2_5',
        value: '0',
        label: 'PM2.5',
        name: 'pm2_5'
      },
      {
        attribute_code: 'price_discount',
        value: '0.000000',
        label: 'Product Price Discount',
        name: 'price_discount'
      },
      {
        attribute_code: 'sold_qty',
        value: '85',
        label: 'Product Sold by Website',
        name: 'sold_qty'
      },
      {
        attribute_code: 'price_saving',
        value: '0.000000',
        label: 'Product Price Saving',
        name: 'price_saving'
      }
    ]
};
