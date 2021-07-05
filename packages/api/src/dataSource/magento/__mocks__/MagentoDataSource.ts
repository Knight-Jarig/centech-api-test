const deliveryMethod = {
  getDeliveryMethodsV2: jest.fn(),
};

const banner = {
  find: jest.fn(),
};

const brand = {
  find: jest.fn(),
  findOne: jest.fn()
}

const cart = {
  getPackageOptions: jest.fn(),
  getCartMine: jest.fn(),
  getCartMineTotals: jest.fn(),
  getCartMineMini: jest.fn(),
  setShippingInformation: jest.fn(() => true),
  setValidatePin: jest.fn(),
  getDeliveryPackageOptions: jest.fn(),
  estimateShippingMethodsV4: jest.fn(),
  estimateShippingMethodsV3: jest.fn(),
  getStoreListCustomer: jest.fn(),
  deleteCartMineItem: jest.fn(),
  getStoreList: jest.fn(),
  getEstimateShippingMethods: jest.fn(),
  addCoupon: jest.fn(),
  addGiftWrapMessage: jest.fn(),
  deleteCoupon: jest.fn(),
  editCartItem: jest.fn(),
  deleteGiftWrapMessage: jest.fn(),
  createCartMine: jest.fn(),
  addCartMineItem: jest.fn(),
  getGiftMessage: jest.fn(),
  burnPoint: jest.fn(),
  t1RedeemInitiate: jest.fn(),
  t1RedeemVerify: jest.fn(),
  getPaymentInformation: jest.fn(),
};

const cartGuest = {
  getPackageOptions: jest.fn(),
  getCartGuest: jest.fn(),
  getCartGuestTotals: jest.fn(),
  getCartGuestMini: jest.fn(),
  setShippingInformation: jest.fn(() => true),
  setValidatePin: jest.fn(),
  getDeliveryPackageOptions: jest.fn(),
  estimateShippingMethodsV4: jest.fn(),
  estimateShippingMethodsV3: jest.fn(),
  getStoreListGuest: jest.fn(),
  deleteCartGuestItem: jest.fn(),
  getStoreList: jest.fn(),
  getEstimateShippingMethods: jest.fn(),
  addCoupon: jest.fn(),
  addGiftWrapMessage: jest.fn(),
  deleteCoupon: jest.fn(),
  editCartItem: jest.fn(),
  deleteGiftWrapMessage: jest.fn(),
  createCartGuest: jest.fn(),
  addCartGuestItem: jest.fn(),
  getGiftMessage: jest.fn(),
  burnPoint: jest.fn(),
  t1RedeemInitiate: jest.fn(),
  t1RedeemVerify: jest.fn(),
  getPaymentInformation: jest.fn(),
};

const cartId = {
  getPackageOptions: jest.fn(),
  setShippingInformation: jest.fn(() => true),
  getCartByID: jest.fn(),
  getCartTotalsByID: jest.fn(),
};

const customer = {
  getCustomer: jest.fn(),
};

const order = {
  search: jest.fn(),
  fetchOrderPackageStatus: jest.fn(),
};

const product = {
  getSaleRuleOverlays: jest.fn(),
  getAttributesByAttributeCode: jest.fn(),
  addReviewV2: jest.fn(),
};

const wishlist = {
  search: jest.fn(),
  getWishlistItem: jest.fn(),
  getWishlist: jest.fn(),
  createWishlistItem: jest.fn(),
  searchWishlistItems: jest.fn(),
  deleteWishlistItem: jest.fn(),
  selectForUser: jest.fn(),
  createWishlist: jest.fn(),
};

const storePickUp = {
  getPickupLocationsBySKU: jest.fn(),
  getStorePickupLocationsAvailable: jest.fn(),
};

const cms = {
  getCmsPage: jest.fn(),
};

const category = {
  find: jest.fn(),
  all: jest.fn(),
};

const cmsBlock = {
  find: jest.fn(),
  findOne: jest.fn()
}

const auth = {
  getCustomerToken: jest.fn(),
  register: jest.fn(),
  lazyRegister: jest.fn(),
  facebookLogin: jest.fn(),
  socialLogin: jest.fn(),
  forgotPassword: jest.fn(),
  resetPassword: jest.fn(),
}

const catalogService = {
  find: jest.fn(),
};

const t1passport = {
  getToken: jest.fn(),
  redeemProfile: jest.fn(),
  refreshToken: jest.fn(),
  verify: jest.fn(),
};

const MagentoDataSource = jest.fn(() => {
  return {
    deliveryMethod,
    banner,
    brand,
    auth,
    cart,
    cartGuest,
    cartId,
    customer,
    order,
    product,
    wishlist,
    storePickUp,
    cms,
    cmsBlock,
    category,
    catalogService,
    t1passport,
  };
});

export { MagentoDataSource };
