const getMethod = (method, text) => `${method}\` | \`${text}`
const magento = (method, text, storeCode) => storeCode ? `{magentoAPI}/{storeCode}/${text}` : `{magentoAPI}/${text}`
const cms = (method, text) => `{core-cms}/${text}`
const catalogService = (method, text) => `{catalogServiceAPI}/catalog-service/{storeCode}/${text}`
const consent = (method, text) => `{consentAPI}/${text}`
const payment = (method, text) => `{paymentAPI}/${text}`
const none = () => '-'

// Methods
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE'

const dataSources = {
  magento,
  cms,
  catalogService,
  consent,
  payment,
}

module.exports = {
  Query: {
    hello: none(),
    version: none(),
    listAddresses: magento(GET, 'V1/customers/me', true),
    getAddress: [
      magento(GET, 'V1/customers/me', true),
      magento(GET, 'V1/customers/addresses/{addressId}')
    ],
    banner: magento(GET, 'V1/banners?{searchCriteria}'),
    brands: magento(GET, 'V1/brands?{searchCriteria}', true),
    brandDetail: magento(GET, 'V1/brands/{brandId}', true),
    cart: [
      magento(GET, 'V1/guest-carts/{guestId}', true),
      magento(GET, 'V1/guest-carts/{guestId}/totals', true),
      magento(GET, 'V1/carts/mine', true),
      magento(GET, 'V1/carts/mine/totals', true)
    ],
    cartMini: [
      magento(GET, 'V1/guest-carts/{guestId}/mini', true),
      magento(GET, 'V1/carts/mine/mini', true),
    ],
    categories: magento(GET, 'V1/category/flat', true),
    categoriesTree: magento(GET, 'V1/category/flat', true),
    cms: cms(GET, 'V1/cmsBlock/search?{searchCriteria}'),
    cmsBlocks: magento(GET, 'V1/cmsBlock/search?{searchCriteria}'),
    cmsBlock: magento(GET, 'V1/cmsBlock/{id}'),
    cmsBlockByIdentifier: magento(GET, 'V1/cmsBlock/search?{searchCriteria}'),
    customer: magento(GET, 'V1/customers/me', true),
    deliveryOptions: [
      magento(GET, '/V1/delivery-info/products/{sku}', true),
      magento(GET, '/V1/delivery-info/products/{sku}/postcode/{postcode}', true),
    ],
    order: magento(GET, 'V1/orders/{orderId}', true),
    orders: magento(GET, 'V1/orders?{searchCriteria}', true),
    orderByIncrementId: magento(GET, 'V1/orders?{searchCriteria}', true), 
    orderByEmail: magento(GET, 'V1/orders?{searchCriteria}', true),
    paymentInformations: [
      magento(GET, 'V1/guest-carts/{guestId}/payment-information', true),
      magento(GET, 'V1/carts/{cartId}/payment-information', true),
      magento(GET, 'V1/carts/mine/payment-information', true),
    ],
    product: magento(GET, 'V1/products/url-key/{urlEncode}', true),
    productSearch: catalogService(GET, 'V1/products/search?{searchQueryString}'),
    productBySku: [
      magento(GET, 'V2/products/{sku}', true),
      catalogService(GET, 'V1/products/search?{searchQueryString}')
    ],
    searchTrending: catalogService(GET, 'V1/products/top-search'),
    searchSuggestion: catalogService(GET, 'V1/products/suggest?q={encodeKeyword}&with_custom_attributes=true'),
    compareProducts: magento(GET, 'V1/products/compare?sku={sku}', true),
    promotionSuggestion: magento(GET, 'V1/promotion-suggestion/product?{searchCriteria}'),
    regions: magento(GET, 'V1/region/postcode', true),
    regionByPostCode: magento(GET, 'V1/region/postcode/{postcode}', true),
    districts: magento(GET, 'V1/region/province/{regionId}/district', true),
    subDistricts: magento(GET, 'V1/region/province/{regionId}/district/{districtId}/subdistrict', true),
    ratingOptions: magento(GET, 'V1/products/rating/options', true),
    storeConfigs: magento(GET, 'V1/store/storeConfigs'),
    getStores: magento(GET, 'V1/storelocator?criteria[filter_groups][0][filters][0][field]=is_active&criteria[filter_groups][0][filters][0][value]=1&criteria[filter_groups][0][filters][0][condition_type]=eq'),
    getStore: [
      magento(GET, 'V1/retailer/get/{retailerId}'),
      magento(GET, 'V1/storelocator?{searchCriteria}')
    ],
    get2hrsPickUpStores: magento(GET, 'V1/storepickup/stores/ispu/{sku}', true),
    getAllActive2hrsPickUpStores: magento(GET, 'V1/storepickup/stores/active/{sku}', true),
    getMulti2hrsPickUpStores: magento(GET, 'V1/storepickup/stores/ispu/{sku}', true),
    getClickNCollectPickUpStores: magento(GET, 'V1/storepickup/stores/sts', true),
    getStatusActivePickupStore: magento(GET, 'V1/storepickup/stores/active/{sku}/is-salable', true),
    urlRewrite: magento(GET, 'V1/url-rewrite/{encodeUrl}'),
    urlRedirect: magento(GET, 'V1/mapping-url?requestPath={encodeUrl}', true),
    wishlists: magento(GET, 'V1/customers/me', true),
    consentInfo: consent(GET, 'consent_info'),
    trackOrder: magento(GET, 'V1/shipment-tracking?{searchCriteria}', true),
    cards: payment(GET, 'V1/payment-service-full-payment/get-bu-info/card/{customerId}'),
    binLookup: payment(GET, 'V1/payment-service-full-payment/get-bu-info/card/lookup/{bin}'),
    paymentOffline: payment(GET, 'V1/payment-service-bank-transfer/get-bu-info/payment/offline/{incrementId}'),
  },
  Mutation: {
    hello: none(),
    addCustomerAddress: magento(POST, 'V1/customers/addresses'),
    editCustomerAddress: magento(PUT, 'V1/customers/addresses/{addressId}'),
    deleteCustomerAddress: magento(DELETE, 'V1/addresses/{addressId}'),
    login: magento(POST, 'V1/integration/customer/token'),
    register: magento(POST, 'V1/customers', true),
    lazyRegister: magento(POST, 'V1/checkout/lazy-register'),
    facebookLogin: magento(POST, 'V1/integration/customer/social_token'),
    forgotPassword: magento(POST, 'V1/customers/password', true),
    resetPassword: magento(POST, 'V1/customers/resetPassword'),
    editCartItem: [
      magento(PUT, 'V1/guest-carts/{guestId}/items/{itemId}'),
      magento(PUT, 'V1/carts/mine/items/{itemId}'),
    ],
    deleteCartItem: [
      magento(DELETE, 'V1/guest-carts/{guestId}/items/{itemId}'),
      magento(DELETE, 'V1/carts/mine/items/{itemId}'),
    ],
    addCartItem: [
      magento(POST, 'V1/guest-carts/{guestId}/items'),
      magento(POST, 'V1/carts/mine/items'),
    ],
    addCoupon: [
      magento(PUT, 'V1/guest-carts/{cartId}/coupons/{coupon}'),
      magento(PUT, 'V1/carts/mine/coupons/{coupon}'),
    ],
    deleteCoupon: [
      magento(DELETE, 'V1/guest-carts/{cartId}/coupons/{coupon}'),
      magento(DELETE, 'V1/carts/mine/coupons/{coupon}'),
    ],
    loginT1: [
      magento(POST, 'V1/guest-carts/{guestToken}/t1c/balance'),
      magento(POST, 'V1/carts/mine/t1c/balance'),
    ],
    burnPoint: [
      magento(PUT, 'V1/guest-carts/{guestToken}/t1c'),
      magento(PUT, 'V1/carts/mine/t1c'),
    ],
    deletePoint: [
      magento(DELETE, 'V1/guest-carts/{guestToken}/t1c'),
      magento(DELETE, 'V1/carts/mine/t1c'),
    ],
    addGiftWrapMessage: [
      magento(POST, 'V1/guest-carts/{cartId}/gift-message'),
      magento(POST, 'V1/carts/mine/gift-message'),
    ],
    deleteGiftWrapMessage: [
      magento(DELETE, 'V1/guest-carts/{cartId}/gift-message'),
      magento(DELETE, 'V1/carts/mine/gift-message'),
    ],
    restoreShippingAssignment: magento('V1/carts/{cartId}/restore-shipping-assignment'),
    contactUs: magento(POST, 'V1/contact', true),
    updateCustomer: magento(PUT, 'V1/customers/me'),
    changePassword: magento(PUT, 'V1/customers/me/password'),
    newsletter: magento(POST, 'V1/guest-subscriber/{email}', true),
    subscribe: magento(POST, 'V1/newsletter/subscribe', true),
    setPaymentInformation: 'x',
    updatePaymentInformation: [
      magento(POST, 'V1/guest-carts/{cartId}/set-payment-information', true),
      magento(POST, 'V1/carts/{cartId}/set-payment-information', true),
      magento(POST, 'V1/carts/mine/set-payment-information', true),
    ],
    updateMultiplePaymentInformation: magento(POST, 'V1/carts/set-multiple-payment-information', true),
    addReview: magento(POST, 'V2/products/{sku}/review', true),
    uploadReviewImage: magento(POST, 'V1/reviews/upload'),
    deleteReviewImage: magento(DELETE, 'V1/reviews/remove_file/product_review%2f{imagePath}'),
    estimateShippingMethods: [
      magento(POST, 'V1/guest-carts/{guestId}/estimate-shipping-methods', true),
      magento(POST, 'V1/carts/mine/estimate-shipping-methods', true),
      magento(POST, 'V1/carts/{cartId}/estimate-shipping-methods', true),
    ],
    setShippingInformation: [
      magento(POST, 'V1/guest-carts/{guestId}/shipping-information'),
      magento(POST, 'V1/carts/mine/shipping-information'),
    ],
    setShippingSlotHdl: [
      magento(PUT, 'V1/carts/{cartId}/shipping-slot-hdl/book'),
      magento(PUT, 'V1/carts/mine/shipping-slot-hdl/book'),
      magento(PUT, 'V1/guest-carts/{guestId}/shipping-slot-hdl/book'),
    ],
    createWishlist: magento(PUT, 'V1/wishlist'),
    updateWishlist: magento(POST, 'V1/wishlist/{wishlistId}'),
    deleteWishlist: magento(DELETE, 'V1/wishlist/{wishlistId}'),
  }
}