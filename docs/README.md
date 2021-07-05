# API from MDC

## Query

| Query | API MDC |
|-------|:--------|
| **banner** | `{magentoAPI}/V1/banners?{searchCriteria}` |
| **binLookup** | `{paymentAPI}/V1/payment-service-full-payment/get-bu-info/card/lookup/{bin}` |
| **brandDetail** | `{magentoAPI}/{storeCode}/V1/brands/{brandId}` |
| **brands** | `{magentoAPI}/{storeCode}/V1/brands?{searchCriteria}` |
| **cards** | `{paymentAPI}/V1/payment-service-full-payment/get-bu-info/card/{customerId}` |
| **cart** | `{magentoAPI}/{storeCode}/V1/guest-carts/{guestId}` , `{magentoAPI}/{storeCode}/V1/guest-carts/{guestId}/totals` , `{magentoAPI}/{storeCode}/V1/carts/mine` , `{magentoAPI}/{storeCode}/V1/carts/mine/totals` |
| **cartMini** | `{magentoAPI}/{storeCode}/V1/guest-carts/{guestId}/mini` , `{magentoAPI}/{storeCode}/V1/carts/mine/mini` |
| **categories** | `{magentoAPI}/{storeCode}/V1/category/flat` |
| **categoriesTree** | `{magentoAPI}/{storeCode}/V1/category/flat` |
| **cms** | `{core-cms}/V1/cmsBlock/search?{searchCriteria}` |
| **cmsBlock** | `{magentoAPI}/V1/cmsBlock/{id}` |
| **cmsBlockByIdentifier** | `{magentoAPI}/V1/cmsBlock/search?{searchCriteria}` |
| **cmsBlocks** | `{magentoAPI}/V1/cmsBlock/search?{searchCriteria}` |
| **compareProducts** | `{magentoAPI}/{storeCode}/V1/products/compare?sku={sku}` |
| **consentInfo** | `{consentAPI}/consent_info` |
| **customer** | `{magentoAPI}/{storeCode}/V1/customers/me` |
| **deliveryOptions** | `{magentoAPI}/{storeCode}//V1/delivery-info/products/{sku}` , `{magentoAPI}/{storeCode}//V1/delivery-info/products/{sku}/postcode/{postcode}` |
| **districts** | `{magentoAPI}/{storeCode}/V1/region/province/{regionId}/district` |
| **get2hrsPickUpStores** | `{magentoAPI}/{storeCode}/V1/storepickup/stores/ispu/{sku}` |
| **getAddress** | `{magentoAPI}/{storeCode}/V1/customers/me` , `{magentoAPI}/V1/customers/addresses/{addressId}` |
| **getAllActive2hrsPickUpStores** | `{magentoAPI}/{storeCode}/V1/storepickup/stores/active/{sku}` |
| **getClickNCollectPickUpStores** | `{magentoAPI}/{storeCode}/V1/storepickup/stores/sts` |
| **getMulti2hrsPickUpStores** | `{magentoAPI}/{storeCode}/V1/storepickup/stores/ispu/{sku}` |
| **getStatusActivePickupStore** | `{magentoAPI}/{storeCode}/V1/storepickup/stores/active/{sku}/is-salable` |
| **getStore** | `{magentoAPI}/V1/retailer/get/{retailerId}` , `{magentoAPI}/V1/storelocator?{searchCriteria}` |
| **getStores** | `{magentoAPI}/V1/storelocator?criteria[filter_groups][0][filters][0][field]=is_active&criteria[filter_groups][0][filters][0][value]=1&criteria[filter_groups][0][filters][0][condition_type]=eq` |
| **hello** | `-` |
| **listAddresses** | `{magentoAPI}/{storeCode}/V1/customers/me` |
| **order** | `{magentoAPI}/{storeCode}/V1/orders/{orderId}` |
| **orderByEmail** | `{magentoAPI}/{storeCode}/V1/orders?{searchCriteria}` |
| **orderByIncrementId** | `{magentoAPI}/{storeCode}/V1/orders?{searchCriteria}` |
| **orders** | `{magentoAPI}/{storeCode}/V1/orders?{searchCriteria}` |
| **paymentInformations** | `{magentoAPI}/{storeCode}/V1/guest-carts/{guestId}/payment-information` , `{magentoAPI}/{storeCode}/V1/carts/{cartId}/payment-information` , `{magentoAPI}/{storeCode}/V1/carts/mine/payment-information` |
| **paymentOffline** | `{paymentAPI}/V1/payment-service-bank-transfer/get-bu-info/payment/offline/{incrementId}` |
| **product** | `{magentoAPI}/{storeCode}/V1/products/url-key/{urlEncode}` |
| **productBySku** | `{magentoAPI}/{storeCode}/V2/products/{sku}` , `{catalogServiceAPI}/catalog-service/{storeCode}/V1/products/search?{searchQueryString}` |
| **productSearch** | `{catalogServiceAPI}/catalog-service/{storeCode}/V1/products/search?{searchQueryString}` |
| **promotionSuggestion** | `{magentoAPI}/V1/promotion-suggestion/product?{searchCriteria}` |
| **ratingOptions** | `{magentoAPI}/{storeCode}/V1/products/rating/options` |
| **regionByPostCode** | `{magentoAPI}/{storeCode}/V1/region/postcode/{postcode}` |
| **regions** | `{magentoAPI}/{storeCode}/V1/region/postcode` |
| **searchSuggestion** | `{catalogServiceAPI}/catalog-service/{storeCode}/V1/products/suggest?q={encodeKeyword}&with_custom_attributes=true` |
| **searchTrending** | `{catalogServiceAPI}/catalog-service/{storeCode}/V1/products/top-search` |
| **storeConfigs** | `{magentoAPI}/V1/store/storeConfigs` |
| **subDistricts** | `{magentoAPI}/{storeCode}/V1/region/province/{regionId}/district/{districtId}/subdistrict` |
| **trackOrder** | `{magentoAPI}/{storeCode}/V1/shipment-tracking?{searchCriteria}` |
| **urlRedirect** | `{magentoAPI}/{storeCode}/V1/mapping-url?requestPath={encodeUrl}` |
| **urlRewrite** | `{magentoAPI}/V1/url-rewrite/{encodeUrl}` |
| **version** | `-` |
| **wishlists** | `{magentoAPI}/{storeCode}/V1/customers/me` |


## Mutation
| Mutation | API MDC |
|----------|:--------|
| **addCartItem** | `{magentoAPI}/V1/guest-carts/{guestId}/items` , `{magentoAPI}/V1/carts/mine/items` |
| **addCoupon** | `{magentoAPI}/V1/guest-carts/{cartId}/coupons/{coupon}` , `{magentoAPI}/V1/carts/mine/coupons/{coupon}` |
| **addCustomerAddress** | `{magentoAPI}/V1/customers/addresses` |
| **addGiftWrapMessage** | `{magentoAPI}/V1/guest-carts/{cartId}/gift-message` , `{magentoAPI}/V1/carts/mine/gift-message` |
| **addReview** | `{magentoAPI}/{storeCode}/V2/products/{sku}/review` |
| **burnPoint** | `{magentoAPI}/V1/guest-carts/{guestToken}/t1c` , `{magentoAPI}/V1/carts/mine/t1c` |
| **changePassword** | `{magentoAPI}/V1/customers/me/password` |
| **contactUs** | `{magentoAPI}/{storeCode}/V1/contact` |
| **createWishlist** | `{magentoAPI}/V1/wishlist` |
| **deleteCartItem** | `{magentoAPI}/V1/guest-carts/{guestId}/items/{itemId}` , `{magentoAPI}/V1/carts/mine/items/{itemId}` |
| **deleteCoupon** | `{magentoAPI}/V1/guest-carts/{cartId}/coupons/{coupon}` , `{magentoAPI}/V1/carts/mine/coupons/{coupon}` |
| **deleteCustomerAddress** | `{magentoAPI}/V1/addresses/{addressId}` |
| **deleteGiftWrapMessage** | `{magentoAPI}/V1/guest-carts/{cartId}/gift-message` , `{magentoAPI}/V1/carts/mine/gift-message` |
| **deletePoint** | `{magentoAPI}/V1/guest-carts/{guestToken}/t1c` , `{magentoAPI}/V1/carts/mine/t1c` |
| **deleteReviewImage** | `{magentoAPI}/V1/reviews/remove_file/product_review%2f{imagePath}` |
| **deleteWishlist** | `{magentoAPI}/V1/wishlist/{wishlistId}` |
| **editCartItem** | `{magentoAPI}/V1/guest-carts/{guestId}/items/{itemId}` , `{magentoAPI}/V1/carts/mine/items/{itemId}` |
| **editCustomerAddress** | `{magentoAPI}/V1/customers/addresses/{addressId}` |
| **estimateShippingMethods** | `{magentoAPI}/{storeCode}/V1/guest-carts/{guestId}/estimate-shipping-methods` , `{magentoAPI}/{storeCode}/V1/carts/mine/estimate-shipping-methods` , `{magentoAPI}/{storeCode}/V1/carts/{cartId}/estimate-shipping-methods` |
| **facebookLogin** | `{magentoAPI}/V1/integration/customer/social_token` |
| **forgotPassword** | `{magentoAPI}/{storeCode}/V1/customers/password` |
| **hello** | `-` |
| **lazyRegister** | `{magentoAPI}/V1/checkout/lazy-register` |
| **login** | `{magentoAPI}/V1/integration/customer/token` |
| **loginT1** | `{magentoAPI}/V1/guest-carts/{guestToken}/t1c/balance` , `{magentoAPI}/V1/carts/mine/t1c/balance` |
| **newsletter** | `{magentoAPI}/{storeCode}/V1/guest-subscriber/{email}` |
| **register** | `{magentoAPI}/{storeCode}/V1/customers` |
| **resetPassword** | `{magentoAPI}/V1/customers/resetPassword` |
| **restoreShippingAssignment** | `{magentoAPI}/undefined` |
| **setPaymentInformation** | `x` |
| **setShippingInformation** | `{magentoAPI}/V1/guest-carts/{guestId}/shipping-information` , `{magentoAPI}/V1/carts/mine/shipping-information` |
| **setShippingSlotHdl** | `{magentoAPI}/V1/carts/{cartId}/shipping-slot-hdl/book` , `{magentoAPI}/V1/carts/mine/shipping-slot-hdl/book` , `{magentoAPI}/V1/guest-carts/{guestId}/shipping-slot-hdl/book` |
| **subscribe** | `{magentoAPI}/{storeCode}/V1/newsletter/subscribe` |
| **updateCustomer** | `{magentoAPI}/V1/customers/me` |
| **updateMultiplePaymentInformation** | `{magentoAPI}/{storeCode}/V1/carts/set-multiple-payment-information` |
| **updatePaymentInformation** | `{magentoAPI}/{storeCode}/V1/guest-carts/{cartId}/set-payment-information` , `{magentoAPI}/{storeCode}/V1/carts/{cartId}/set-payment-information` , `{magentoAPI}/{storeCode}/V1/carts/mine/set-payment-information` |
| **updateWishlist** | `{magentoAPI}/V1/wishlist/{wishlistId}` |
| **uploadReviewImage** | `{magentoAPI}/V1/reviews/upload` |

