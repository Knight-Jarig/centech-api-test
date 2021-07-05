import * as Types from '@central-tech/operation/dist/types';

import { GraphQLClient } from 'graphql-request';
import { print, ASTNode } from 'graphql';
import * as Operations from '@central-tech/operation';

export function getSdk(client: GraphQLClient) {
  return {
    addCustomerAddress(
      variables?: Types.IAddCustomerAddressMutationVariables,
    ): Promise<Types.IAddCustomerAddressMutation> {
      return client.request<Types.IAddCustomerAddressMutation>(
        print(Operations.addCustomerAddress as ASTNode),
        variables,
      );
    },
    deleteCustomerAddress(
      variables?: Types.IDeleteCustomerAddressMutationVariables,
    ): Promise<Types.IDeleteCustomerAddressMutation> {
      return client.request<Types.IDeleteCustomerAddressMutation>(
        print(Operations.deleteCustomerAddress as ASTNode),
        variables,
      );
    },
    editCustomerAddress(
      variables?: Types.IEditCustomerAddressMutationVariables,
    ): Promise<Types.IEditCustomerAddressMutation> {
      return client.request<Types.IEditCustomerAddressMutation>(
        print(Operations.editCustomerAddress as ASTNode),
        variables,
      );
    },
    assignCoupon(variables: Types.IAssignCouponMutationVariables): Promise<Types.IAssignCouponMutation> {
      return client.request<Types.IAssignCouponMutation>(print(Operations.assignCoupon as ASTNode), variables);
    },
    assignCouponCampaign(
      variables: Types.IAssignCouponCampaignMutationVariables,
    ): Promise<Types.IAssignCouponCampaignMutation> {
      return client.request<Types.IAssignCouponCampaignMutation>(
        print(Operations.assignCouponCampaign as ASTNode),
        variables,
      );
    },
    facebookLogin(variables: Types.IFacebookLoginMutationVariables): Promise<Types.IFacebookLoginMutation> {
      return client.request<Types.IFacebookLoginMutation>(print(Operations.facebookLogin as ASTNode), variables);
    },
    forgotPassword(variables: Types.IForgotPasswordMutationVariables): Promise<Types.IForgotPasswordMutation> {
      return client.request<Types.IForgotPasswordMutation>(print(Operations.forgotPassword as ASTNode), variables);
    },
    loginMutation(variables: Types.ILoginMutationMutationVariables): Promise<Types.ILoginMutationMutation> {
      return client.request<Types.ILoginMutationMutation>(print(Operations.loginMutation as ASTNode), variables);
    },
    resetPassword(variables: Types.IResetPasswordMutationVariables): Promise<Types.IResetPasswordMutation> {
      return client.request<Types.IResetPasswordMutation>(print(Operations.resetPassword as ASTNode), variables);
    },
    socialLogin(variables: Types.ISocialLoginMutationVariables): Promise<Types.ISocialLoginMutation> {
      return client.request<Types.ISocialLoginMutation>(print(Operations.socialLogin as ASTNode), variables);
    },
    addCartItem(variables: Types.IAddCartItemMutationVariables): Promise<Types.IAddCartItemMutation> {
      return client.request<Types.IAddCartItemMutation>(print(Operations.addCartItem as ASTNode), variables);
    },
    addCouponResponse(
      variables?: Types.IAddCouponResponseMutationVariables,
    ): Promise<Types.IAddCouponResponseMutation> {
      return client.request<Types.IAddCouponResponseMutation>(
        print(Operations.addCouponResponse as ASTNode),
        variables,
      );
    },
    addGiftWrapMessage(
      variables: Types.IAddGiftWrapMessageMutationVariables,
    ): Promise<Types.IAddGiftWrapMessageMutation> {
      return client.request<Types.IAddGiftWrapMessageMutation>(
        print(Operations.addGiftWrapMessage as ASTNode),
        variables,
      );
    },
    deleteCartItem(variables: Types.IDeleteCartItemMutationVariables): Promise<Types.IDeleteCartItemMutation> {
      return client.request<Types.IDeleteCartItemMutation>(print(Operations.deleteCartItem as ASTNode), variables);
    },
    deleteCouponResponse(
      variables?: Types.IDeleteCouponResponseMutationVariables,
    ): Promise<Types.IDeleteCouponResponseMutation> {
      return client.request<Types.IDeleteCouponResponseMutation>(
        print(Operations.deleteCouponResponse as ASTNode),
        variables,
      );
    },
    deleteGiftWrapMessage(
      variables: Types.IDeleteGiftWrapMessageMutationVariables,
    ): Promise<Types.IDeleteGiftWrapMessageMutation> {
      return client.request<Types.IDeleteGiftWrapMessageMutation>(
        print(Operations.deleteGiftWrapMessage as ASTNode),
        variables,
      );
    },
    editCartItem(variables: Types.IEditCartItemMutationVariables): Promise<Types.IEditCartItemMutation> {
      return client.request<Types.IEditCartItemMutation>(print(Operations.editCartItem as ASTNode), variables);
    },
    restoreShippingAssignment(
      variables: Types.IRestoreShippingAssignmentMutationVariables,
    ): Promise<Types.IRestoreShippingAssignmentMutation> {
      return client.request<Types.IRestoreShippingAssignmentMutation>(
        print(Operations.restoreShippingAssignment as ASTNode),
        variables,
      );
    },
    estimateShippingMethods(
      variables: Types.IEstimateShippingMethodsMutationVariables,
    ): Promise<Types.IEstimateShippingMethodsMutation> {
      return client.request<Types.IEstimateShippingMethodsMutation>(
        print(Operations.estimateShippingMethods as ASTNode),
        variables,
      );
    },
    setPaymentInformation(
      variables: Types.ISetPaymentInformationMutationVariables,
    ): Promise<Types.ISetPaymentInformationMutation> {
      return client.request<Types.ISetPaymentInformationMutation>(
        print(Operations.setPaymentInformation as ASTNode),
        variables,
      );
    },
    setShippingInformation(
      variables: Types.ISetShippingInformationMutationVariables,
    ): Promise<Types.ISetShippingInformationMutation> {
      return client.request<Types.ISetShippingInformationMutation>(
        print(Operations.setShippingInformation as ASTNode),
        variables,
      );
    },
    setShippingSlotHdl(
      variables: Types.ISetShippingSlotHdlMutationVariables,
    ): Promise<Types.ISetShippingSlotHdlMutation> {
      return client.request<Types.ISetShippingSlotHdlMutation>(
        print(Operations.setShippingSlotHdl as ASTNode),
        variables,
      );
    },
    updateMultiplePaymentInformation(
      variables: Types.IUpdateMultiplePaymentInformationMutationVariables,
    ): Promise<Types.IUpdateMultiplePaymentInformationMutation> {
      return client.request<Types.IUpdateMultiplePaymentInformationMutation>(
        print(Operations.updateMultiplePaymentInformation as ASTNode),
        variables,
      );
    },
    updatePaymentInformation(
      variables: Types.IUpdatePaymentInformationMutationVariables,
    ): Promise<Types.IUpdatePaymentInformationMutation> {
      return client.request<Types.IUpdatePaymentInformationMutation>(
        print(Operations.updatePaymentInformation as ASTNode),
        variables,
      );
    },
    v2SetShippingInformation(
      variables: Types.IV2SetShippingInformationMutationVariables,
    ): Promise<Types.IV2SetShippingInformationMutation> {
      return client.request<Types.IV2SetShippingInformationMutation>(
        print(Operations.v2SetShippingInformation as ASTNode),
        variables,
      );
    },
    v2SetValidatePin(variables: Types.IV2SetValidatePinMutationVariables): Promise<Types.IV2SetValidatePinMutation> {
      return client.request<Types.IV2SetValidatePinMutation>(print(Operations.v2SetValidatePin as ASTNode), variables);
    },
    consent(variables: Types.IConsentMutationVariables): Promise<Types.IConsentMutation> {
      return client.request<Types.IConsentMutation>(print(Operations.consent as ASTNode), variables);
    },
    contactUs(variables: Types.IContactUsMutationVariables): Promise<Types.IContactUsMutation> {
      return client.request<Types.IContactUsMutation>(print(Operations.contactUs as ASTNode), variables);
    },
    createCard(variables: Types.ICreateCardMutationVariables): Promise<Types.ICreateCardMutation> {
      return client.request<Types.ICreateCardMutation>(print(Operations.createCard as ASTNode), variables);
    },
    changePassword(variables: Types.IChangePasswordMutationVariables): Promise<Types.IChangePasswordMutation> {
      return client.request<Types.IChangePasswordMutation>(print(Operations.changePassword as ASTNode), variables);
    },
    lazyRegister(variables: Types.ILazyRegisterMutationVariables): Promise<Types.ILazyRegisterMutation> {
      return client.request<Types.ILazyRegisterMutation>(print(Operations.lazyRegister as ASTNode), variables);
    },
    register(variables: Types.IRegisterMutationVariables): Promise<Types.IRegisterMutation> {
      return client.request<Types.IRegisterMutation>(print(Operations.register as ASTNode), variables);
    },
    updateCustomer(variables?: Types.IUpdateCustomerMutationVariables): Promise<Types.IUpdateCustomerMutation> {
      return client.request<Types.IUpdateCustomerMutation>(print(Operations.updateCustomer as ASTNode), variables);
    },
    deleteCard(variables: Types.IDeleteCardMutationVariables): Promise<Types.IDeleteCardMutation> {
      return client.request<Types.IDeleteCardMutation>(print(Operations.deleteCard as ASTNode), variables);
    },
    deleteReviewImage(variables: Types.IDeleteReviewImageMutationVariables): Promise<Types.IDeleteReviewImageMutation> {
      return client.request<Types.IDeleteReviewImageMutation>(
        print(Operations.deleteReviewImage as ASTNode),
        variables,
      );
    },
    newsletter(variables: Types.INewsletterMutationVariables): Promise<Types.INewsletterMutation> {
      return client.request<Types.INewsletterMutation>(print(Operations.newsletter as ASTNode), variables);
    },
    newsletterManual(variables: Types.INewsletterManualMutationVariables): Promise<Types.INewsletterManualMutation> {
      return client.request<Types.INewsletterManualMutation>(print(Operations.newsletterManual as ASTNode), variables);
    },
    subscribe(variables: Types.ISubscribeMutationVariables): Promise<Types.ISubscribeMutation> {
      return client.request<Types.ISubscribeMutation>(print(Operations.subscribe as ASTNode), variables);
    },
    repayment(variables: Types.IRepaymentMutationVariables): Promise<Types.IRepaymentMutation> {
      return client.request<Types.IRepaymentMutation>(print(Operations.repayment as ASTNode), variables);
    },
    review(variables: Types.IReviewMutationVariables): Promise<Types.IReviewMutation> {
      return client.request<Types.IReviewMutation>(print(Operations.review as ASTNode), variables);
    },
    setDefaultCard(variables: Types.ISetDefaultCardMutationVariables): Promise<Types.ISetDefaultCardMutation> {
      return client.request<Types.ISetDefaultCardMutation>(print(Operations.setDefaultCard as ASTNode), variables);
    },
    burnPoint(variables: Types.IBurnPointMutationVariables): Promise<Types.IBurnPointMutation> {
      return client.request<Types.IBurnPointMutation>(print(Operations.burnPoint as ASTNode), variables);
    },
    deletePoint(variables?: Types.IDeletePointMutationVariables): Promise<Types.IDeletePointMutation> {
      return client.request<Types.IDeletePointMutation>(print(Operations.deletePoint as ASTNode), variables);
    },
    loginT1(variables: Types.ILoginT1MutationVariables): Promise<Types.ILoginT1Mutation> {
      return client.request<Types.ILoginT1Mutation>(print(Operations.loginT1 as ASTNode), variables);
    },
    uploadReviewImage(variables: Types.IUploadReviewImageMutationVariables): Promise<Types.IUploadReviewImageMutation> {
      return client.request<Types.IUploadReviewImageMutation>(
        print(Operations.uploadReviewImage as ASTNode),
        variables,
      );
    },
    vipInterest(variables: Types.IVipInterestMutationVariables): Promise<Types.IVipInterestMutation> {
      return client.request<Types.IVipInterestMutation>(print(Operations.vipInterest as ASTNode), variables);
    },
    vipNeedAssistance(variables: Types.IVipNeedAssistanceMutationVariables): Promise<Types.IVipNeedAssistanceMutation> {
      return client.request<Types.IVipNeedAssistanceMutation>(
        print(Operations.vipNeedAssistance as ASTNode),
        variables,
      );
    },
    vipValidate(variables: Types.IVipValidateMutationVariables): Promise<Types.IVipValidateMutation> {
      return client.request<Types.IVipValidateMutation>(print(Operations.vipValidate as ASTNode), variables);
    },
    createWishlist(variables: Types.ICreateWishlistMutationVariables): Promise<Types.ICreateWishlistMutation> {
      return client.request<Types.ICreateWishlistMutation>(print(Operations.createWishlist as ASTNode), variables);
    },
    createWishlistItem(
      variables: Types.ICreateWishlistItemMutationVariables,
    ): Promise<Types.ICreateWishlistItemMutation> {
      return client.request<Types.ICreateWishlistItemMutation>(
        print(Operations.createWishlistItem as ASTNode),
        variables,
      );
    },
    deleteWishlist(variables: Types.IDeleteWishlistMutationVariables): Promise<Types.IDeleteWishlistMutation> {
      return client.request<Types.IDeleteWishlistMutation>(print(Operations.deleteWishlist as ASTNode), variables);
    },
    deleteWishlistItem(
      variables: Types.IDeleteWishlistItemMutationVariables,
    ): Promise<Types.IDeleteWishlistItemMutation> {
      return client.request<Types.IDeleteWishlistItemMutation>(
        print(Operations.deleteWishlistItem as ASTNode),
        variables,
      );
    },
    updateWishlist(variables: Types.IUpdateWishlistMutationVariables): Promise<Types.IUpdateWishlistMutation> {
      return client.request<Types.IUpdateWishlistMutation>(print(Operations.updateWishlist as ASTNode), variables);
    },
    updateWishlistItem(
      variables: Types.IUpdateWishlistItemMutationVariables,
    ): Promise<Types.IUpdateWishlistItemMutation> {
      return client.request<Types.IUpdateWishlistItemMutation>(
        print(Operations.updateWishlistItem as ASTNode),
        variables,
      );
    },
    productAssociationBySku(
      variables?: Types.IProductAssociationBySkuQueryVariables,
    ): Promise<Types.IProductAssociationBySkuQuery> {
      return client.request<Types.IProductAssociationBySkuQuery>(
        print(Operations.productAssociationBySku as ASTNode),
        variables,
      );
    },
    productRecommendationByUser(
      variables?: Types.IProductRecommendationByUserQueryVariables,
    ): Promise<Types.IProductRecommendationByUserQuery> {
      return client.request<Types.IProductRecommendationByUserQuery>(
        print(Operations.productRecommendationByUser as ASTNode),
        variables,
      );
    },
    active2hrsPickUpStores(
      variables?: Types.IActive2hrsPickUpStoresQueryVariables,
    ): Promise<Types.IActive2hrsPickUpStoresQuery> {
      return client.request<Types.IActive2hrsPickUpStoresQuery>(
        print(Operations.active2hrsPickUpStores as ASTNode),
        variables,
      );
    },
    activeStatus2HrsPickUpStores(
      variables?: Types.IActiveStatus2HrsPickUpStoresQueryVariables,
    ): Promise<Types.IActiveStatus2HrsPickUpStoresQuery> {
      return client.request<Types.IActiveStatus2HrsPickUpStoresQuery>(
        print(Operations.activeStatus2HrsPickUpStores as ASTNode),
        variables,
      );
    },
    banner(variables: Types.IBannerQueryVariables): Promise<Types.IBannerQuery> {
      return client.request<Types.IBannerQuery>(print(Operations.banner as ASTNode), variables);
    },
    binLookup(variables: Types.IBinLookupQueryVariables): Promise<Types.IBinLookupQuery> {
      return client.request<Types.IBinLookupQuery>(print(Operations.binLookup as ASTNode), variables);
    },
    brandDetail(variables?: Types.IBrandDetailQueryVariables): Promise<Types.IBrandDetailQuery> {
      return client.request<Types.IBrandDetailQuery>(print(Operations.brandDetail as ASTNode), variables);
    },
    brands(variables?: Types.IBrandsQueryVariables): Promise<Types.IBrandsQuery> {
      return client.request<Types.IBrandsQuery>(print(Operations.brands as ASTNode), variables);
    },
    cards(variables?: Types.ICardsQueryVariables): Promise<Types.ICardsQuery> {
      return client.request<Types.ICardsQuery>(print(Operations.cards as ASTNode), variables);
    },
    cart(variables?: Types.ICartQueryVariables): Promise<Types.ICartQuery> {
      return client.request<Types.ICartQuery>(print(Operations.cart as ASTNode), variables);
    },
    cartMini(variables?: Types.ICartMiniQueryVariables): Promise<Types.ICartMiniQuery> {
      return client.request<Types.ICartMiniQuery>(print(Operations.cartMini as ASTNode), variables);
    },
    categories(variables?: Types.ICategoriesQueryVariables): Promise<Types.ICategoriesQuery> {
      return client.request<Types.ICategoriesQuery>(print(Operations.categories as ASTNode), variables);
    },
    categoriesTree(variables?: Types.ICategoriesTreeQueryVariables): Promise<Types.ICategoriesTreeQuery> {
      return client.request<Types.ICategoriesTreeQuery>(print(Operations.categoriesTree as ASTNode), variables);
    },
    category(variables: Types.ICategoryQueryVariables): Promise<Types.ICategoryQuery> {
      return client.request<Types.ICategoryQuery>(print(Operations.category as ASTNode), variables);
    },
    clickNCollectPickUpStores(
      variables?: Types.IClickNCollectPickUpStoresQueryVariables,
    ): Promise<Types.IClickNCollectPickUpStoresQuery> {
      return client.request<Types.IClickNCollectPickUpStoresQuery>(
        print(Operations.clickNCollectPickUpStores as ASTNode),
        variables,
      );
    },
    cms(variables: Types.ICmsQueryVariables): Promise<Types.ICmsQuery> {
      return client.request<Types.ICmsQuery>(print(Operations.cms as ASTNode), variables);
    },
    cmsBlockByIdentifier(
      variables: Types.ICmsBlockByIdentifierQueryVariables,
    ): Promise<Types.ICmsBlockByIdentifierQuery> {
      return client.request<Types.ICmsBlockByIdentifierQuery>(
        print(Operations.cmsBlockByIdentifier as ASTNode),
        variables,
      );
    },
    cmsBlocks(variables: Types.ICmsBlocksQueryVariables): Promise<Types.ICmsBlocksQuery> {
      return client.request<Types.ICmsBlocksQuery>(print(Operations.cmsBlocks as ASTNode), variables);
    },
    cmsSearchBlock(variables: Types.ICmsSearchBlockQueryVariables): Promise<Types.ICmsSearchBlockQuery> {
      return client.request<Types.ICmsSearchBlockQuery>(print(Operations.cmsSearchBlock as ASTNode), variables);
    },
    consentInfo(variables?: Types.IConsentInfoQueryVariables): Promise<Types.IConsentInfoQuery> {
      return client.request<Types.IConsentInfoQuery>(print(Operations.consentInfo as ASTNode), variables);
    },
    couponCampaignList(variables: Types.ICouponCampaignListQueryVariables): Promise<Types.ICouponCampaignListQuery> {
      return client.request<Types.ICouponCampaignListQuery>(print(Operations.couponCampaignList as ASTNode), variables);
    },
    couponList(variables: Types.ICouponListQueryVariables): Promise<Types.ICouponListQuery> {
      return client.request<Types.ICouponListQuery>(print(Operations.couponList as ASTNode), variables);
    },
    customer(variables?: Types.ICustomerQueryVariables): Promise<Types.ICustomerQuery> {
      return client.request<Types.ICustomerQuery>(print(Operations.customer as ASTNode), variables);
    },
    customerCouponList(variables: Types.ICustomerCouponListQueryVariables): Promise<Types.ICustomerCouponListQuery> {
      return client.request<Types.ICustomerCouponListQuery>(print(Operations.customerCouponList as ASTNode), variables);
    },
    deliveryOptions(variables: Types.IDeliveryOptionsQueryVariables): Promise<Types.IDeliveryOptionsQuery> {
      return client.request<Types.IDeliveryOptionsQuery>(print(Operations.deliveryOptions as ASTNode), variables);
    },
    districtsByProvinceId(
      variables?: Types.IDistrictsByProvinceIdQueryVariables,
    ): Promise<Types.IDistrictsByProvinceIdQuery> {
      return client.request<Types.IDistrictsByProvinceIdQuery>(
        print(Operations.districtsByProvinceId as ASTNode),
        variables,
      );
    },
    estimateShippingMethodsV3(
      variables: Types.IEstimateShippingMethodsV3QueryVariables,
    ): Promise<Types.IEstimateShippingMethodsV3Query> {
      return client.request<Types.IEstimateShippingMethodsV3Query>(
        print(Operations.estimateShippingMethodsV3 as ASTNode),
        variables,
      );
    },
    estimateShippingMethodsV4(
      variables: Types.IEstimateShippingMethodsV4QueryVariables,
    ): Promise<Types.IEstimateShippingMethodsV4Query> {
      return client.request<Types.IEstimateShippingMethodsV4Query>(
        print(Operations.estimateShippingMethodsV4 as ASTNode),
        variables,
      );
    },
    getAddress(variables: Types.IGetAddressQueryVariables): Promise<Types.IGetAddressQuery> {
      return client.request<Types.IGetAddressQuery>(print(Operations.getAddress as ASTNode), variables);
    },
    listAddresses(variables?: Types.IListAddressesQueryVariables): Promise<Types.IListAddressesQuery> {
      return client.request<Types.IListAddressesQuery>(print(Operations.listAddresses as ASTNode), variables);
    },
    multi2hrsPickUpStores(
      variables?: Types.IMulti2hrsPickUpStoresQueryVariables,
    ): Promise<Types.IMulti2hrsPickUpStoresQuery> {
      return client.request<Types.IMulti2hrsPickUpStoresQuery>(
        print(Operations.multi2hrsPickUpStores as ASTNode),
        variables,
      );
    },
    paymentOffline(variables: Types.IPaymentOfflineQueryVariables): Promise<Types.IPaymentOfflineQuery> {
      return client.request<Types.IPaymentOfflineQuery>(print(Operations.paymentOffline as ASTNode), variables);
    },
    order(variables: Types.IOrderQueryVariables): Promise<Types.IOrderQuery> {
      return client.request<Types.IOrderQuery>(print(Operations.order as ASTNode), variables);
    },
    trackOrder(variables: Types.ITrackOrderQueryVariables): Promise<Types.ITrackOrderQuery> {
      return client.request<Types.ITrackOrderQuery>(print(Operations.trackOrder as ASTNode), variables);
    },
    orderByEmail(variables: Types.IOrderByEmailQueryVariables): Promise<Types.IOrderByEmailQuery> {
      return client.request<Types.IOrderByEmailQuery>(print(Operations.orderByEmail as ASTNode), variables);
    },
    orderByIncrementId(variables: Types.IOrderByIncrementIdQueryVariables): Promise<Types.IOrderByIncrementIdQuery> {
      return client.request<Types.IOrderByIncrementIdQuery>(print(Operations.orderByIncrementId as ASTNode), variables);
    },
    orders(variables: Types.IOrdersQueryVariables): Promise<Types.IOrdersQuery> {
      return client.request<Types.IOrdersQuery>(print(Operations.orders as ASTNode), variables);
    },
    paymentMethods(variables?: Types.IPaymentMethodsQueryVariables): Promise<Types.IPaymentMethodsQuery> {
      return client.request<Types.IPaymentMethodsQuery>(print(Operations.paymentMethods as ASTNode), variables);
    },
    paymentStatus(variables: Types.IPaymentStatusQueryVariables): Promise<Types.IPaymentStatusQuery> {
      return client.request<Types.IPaymentStatusQuery>(print(Operations.paymentStatus as ASTNode), variables);
    },
    pickupLocations(variables: Types.IPickupLocationsQueryVariables): Promise<Types.IPickupLocationsQuery> {
      return client.request<Types.IPickupLocationsQuery>(print(Operations.pickupLocations as ASTNode), variables);
    },
    postcodeByLatLng(variables: Types.IPostcodeByLatLngQueryVariables): Promise<Types.IPostcodeByLatLngQuery> {
      return client.request<Types.IPostcodeByLatLngQuery>(print(Operations.postcodeByLatLng as ASTNode), variables);
    },
    pricePerStore(variables: Types.IPricePerStoreQueryVariables): Promise<Types.IPricePerStoreQuery> {
      return client.request<Types.IPricePerStoreQuery>(print(Operations.pricePerStore as ASTNode), variables);
    },
    product(variables?: Types.IProductQueryVariables): Promise<Types.IProductQuery> {
      return client.request<Types.IProductQuery>(print(Operations.product as ASTNode), variables);
    },
    productById(variables: Types.IProductByIdQueryVariables): Promise<Types.IProductByIdQuery> {
      return client.request<Types.IProductByIdQuery>(print(Operations.productById as ASTNode), variables);
    },
    productBySku(variables: Types.IProductBySkuQueryVariables): Promise<Types.IProductBySkuQuery> {
      return client.request<Types.IProductBySkuQuery>(print(Operations.productBySku as ASTNode), variables);
    },
    productSearch(variables: Types.IProductSearchQueryVariables): Promise<Types.IProductSearchQuery> {
      return client.request<Types.IProductSearchQuery>(print(Operations.productSearch as ASTNode), variables);
    },
    promotion(variables?: Types.IPromotionQueryVariables): Promise<Types.IPromotionQuery> {
      return client.request<Types.IPromotionQuery>(print(Operations.promotion as ASTNode), variables);
    },
    provinces(variables?: Types.IProvincesQueryVariables): Promise<Types.IProvincesQuery> {
      return client.request<Types.IProvincesQuery>(print(Operations.provinces as ASTNode), variables);
    },
    ratingOptions(variables?: Types.IRatingOptionsQueryVariables): Promise<Types.IRatingOptionsQuery> {
      return client.request<Types.IRatingOptionsQuery>(print(Operations.ratingOptions as ASTNode), variables);
    },
    regions(variables?: Types.IRegionsQueryVariables): Promise<Types.IRegionsQuery> {
      return client.request<Types.IRegionsQuery>(print(Operations.regions as ASTNode), variables);
    },
    regionsByPostcode(variables?: Types.IRegionsByPostcodeQueryVariables): Promise<Types.IRegionsByPostcodeQuery> {
      return client.request<Types.IRegionsByPostcodeQuery>(print(Operations.regionsByPostcode as ASTNode), variables);
    },
    retailerById(variables: Types.IRetailerByIdQueryVariables): Promise<Types.IRetailerByIdQuery> {
      return client.request<Types.IRetailerByIdQuery>(print(Operations.retailerById as ASTNode), variables);
    },
    retailerByPostcode(variables: Types.IRetailerByPostcodeQueryVariables): Promise<Types.IRetailerByPostcodeQuery> {
      return client.request<Types.IRetailerByPostcodeQuery>(print(Operations.retailerByPostcode as ASTNode), variables);
    },
    searchTerms(variables?: Types.ISearchTermsQueryVariables): Promise<Types.ISearchTermsQuery> {
      return client.request<Types.ISearchTermsQuery>(print(Operations.searchTerms as ASTNode), variables);
    },
    shipFromStoreAvailableTime(
      variables?: Types.IShipFromStoreAvailableTimeQueryVariables,
    ): Promise<Types.IShipFromStoreAvailableTimeQuery> {
      return client.request<Types.IShipFromStoreAvailableTimeQuery>(
        print(Operations.shipFromStoreAvailableTime as ASTNode),
        variables,
      );
    },
    shippingSlotInfoHdl(variables: Types.IShippingSlotInfoHdlQueryVariables): Promise<Types.IShippingSlotInfoHdlQuery> {
      return client.request<Types.IShippingSlotInfoHdlQuery>(
        print(Operations.shippingSlotInfoHdl as ASTNode),
        variables,
      );
    },
    stockItem(variables: Types.IStockItemQueryVariables): Promise<Types.IStockItemQuery> {
      return client.request<Types.IStockItemQuery>(print(Operations.stockItem as ASTNode), variables);
    },
    storeConfigs(variables?: Types.IStoreConfigsQueryVariables): Promise<Types.IStoreConfigsQuery> {
      return client.request<Types.IStoreConfigsQuery>(print(Operations.storeConfigs as ASTNode), variables);
    },
    storePickupLocationsAvailable(
      variables: Types.IStorePickupLocationsAvailableQueryVariables,
    ): Promise<Types.IStorePickupLocationsAvailableQuery> {
      return client.request<Types.IStorePickupLocationsAvailableQuery>(
        print(Operations.storePickupLocationsAvailable as ASTNode),
        variables,
      );
    },
    storeWithStockLevel(variables: Types.IStoreWithStockLevelQueryVariables): Promise<Types.IStoreWithStockLevelQuery> {
      return client.request<Types.IStoreWithStockLevelQuery>(
        print(Operations.storeWithStockLevel as ASTNode),
        variables,
      );
    },
    stores(variables?: Types.IStoresQueryVariables): Promise<Types.IStoresQuery> {
      return client.request<Types.IStoresQuery>(print(Operations.stores as ASTNode), variables);
    },
    subDistrictsByProvinceId(
      variables?: Types.ISubDistrictsByProvinceIdQueryVariables,
    ): Promise<Types.ISubDistrictsByProvinceIdQuery> {
      return client.request<Types.ISubDistrictsByProvinceIdQuery>(
        print(Operations.subDistrictsByProvinceId as ASTNode),
        variables,
      );
    },
    trendingSuggestions(variables: Types.ITrendingSuggestionsQueryVariables): Promise<Types.ITrendingSuggestionsQuery> {
      return client.request<Types.ITrendingSuggestionsQuery>(
        print(Operations.trendingSuggestions as ASTNode),
        variables,
      );
    },
    twoHrsPickUpStores(variables?: Types.ITwoHrsPickUpStoresQueryVariables): Promise<Types.ITwoHrsPickUpStoresQuery> {
      return client.request<Types.ITwoHrsPickUpStoresQuery>(print(Operations.twoHrsPickUpStores as ASTNode), variables);
    },
    urlRedirect(variables: Types.IUrlRedirectQueryVariables): Promise<Types.IUrlRedirectQuery> {
      return client.request<Types.IUrlRedirectQuery>(print(Operations.urlRedirect as ASTNode), variables);
    },
    urlRewrite(variables: Types.IUrlRewriteQueryVariables): Promise<Types.IUrlRewriteQuery> {
      return client.request<Types.IUrlRewriteQuery>(print(Operations.urlRewrite as ASTNode), variables);
    },
    v2DeliveryOptionByPostcode(
      variables: Types.IV2DeliveryOptionByPostcodeQueryVariables,
    ): Promise<Types.IV2DeliveryOptionByPostcodeQuery> {
      return client.request<Types.IV2DeliveryOptionByPostcodeQuery>(
        print(Operations.v2DeliveryOptionByPostcode as ASTNode),
        variables,
      );
    },
    v2DeliveryPackageOptions(
      variables: Types.IV2DeliveryPackageOptionsQueryVariables,
    ): Promise<Types.IV2DeliveryPackageOptionsQuery> {
      return client.request<Types.IV2DeliveryPackageOptionsQuery>(
        print(Operations.v2DeliveryPackageOptions as ASTNode),
        variables,
      );
    },
    v2PackageOptions(variables: Types.IV2PackageOptionsQueryVariables): Promise<Types.IV2PackageOptionsQuery> {
      return client.request<Types.IV2PackageOptionsQuery>(print(Operations.v2PackageOptions as ASTNode), variables);
    },
    v2SuggestSearch(variables?: Types.IV2SuggestSearchQueryVariables): Promise<Types.IV2SuggestSearchQuery> {
      return client.request<Types.IV2SuggestSearchQuery>(print(Operations.v2SuggestSearch as ASTNode), variables);
    },
    v2TrendingSearch(variables?: Types.IV2TrendingSearchQueryVariables): Promise<Types.IV2TrendingSearchQuery> {
      return client.request<Types.IV2TrendingSearchQuery>(print(Operations.v2TrendingSearch as ASTNode), variables);
    },
    vipList(variables?: Types.IVipListQueryVariables): Promise<Types.IVipListQuery> {
      return client.request<Types.IVipListQuery>(print(Operations.vipList as ASTNode), variables);
    },
    vipWithToken(variables: Types.IVipWithTokenQueryVariables): Promise<Types.IVipWithTokenQuery> {
      return client.request<Types.IVipWithTokenQuery>(print(Operations.vipWithToken as ASTNode), variables);
    },
    wishList(variables: Types.IWishListQueryVariables): Promise<Types.IWishListQuery> {
      return client.request<Types.IWishListQuery>(print(Operations.wishList as ASTNode), variables);
    },
    withStoreConfig(variables?: Types.IWithStoreConfigQueryVariables): Promise<Types.IWithStoreConfigQuery> {
      return client.request<Types.IWithStoreConfigQuery>(print(Operations.withStoreConfig as ASTNode), variables);
    },
  };
}
