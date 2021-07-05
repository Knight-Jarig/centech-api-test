export const USERNAME = 'plamworapot@gmail.com';
export const PASSWORD = 'password';
export const PRODUCT_URL = '';
export const CATEGORY_URL = '';
export const CMS_REF = '';
export const CMS_URL = '';
export const ADD_TO_CART_SKU = '244935';
export const newUser = () => {
  const time = new Date().getTime();
  const USERNAME_WITH_TIME = 'test.username+' + time + '@gmail.com';
  return {
    email: USERNAME_WITH_TIME,
    password: PASSWORD,
    firstname: 'TEST USER ' + time,
    lastname: 'LASTNAME',
  };
};
