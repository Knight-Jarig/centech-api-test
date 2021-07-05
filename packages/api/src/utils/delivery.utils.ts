export const filterOutShippingDeliveryMethods = (type, shipping_delivery_methods, key = "delivery_method_code") => {
    
    const deliveryOptions = {
        online: ['delivery', 'click_and_collect', 'express_delivery'],
        offline: ['hour_pickup', 'ship_from_store'],
        };

    return shipping_delivery_methods.filter(method => !deliveryOptions[type].includes(method[key]));
  }