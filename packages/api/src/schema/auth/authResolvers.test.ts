import AuthResolvers from './authResolvers';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import ConsentServiceApi from '../../dataSource/consentServiceApi';

jest.mock('../../dataSource/magento/MagentoDataSource');
jest.mock('../../dataSource/consentServiceApi');

describe('Auth Resolvers', () => {
  const magentoDataSource = new MagentoDataSource();
  const consentServiceAPI = new ConsentServiceApi();
  const dataSources = {
    magento: magentoDataSource,
    consent: consentServiceAPI,
  };
  describe('Mutation: login', () => {
    it('Should call login properly', async () => {
      const login = AuthResolvers.Mutation.login as Function;
      jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: '531f1b07c466e186a4e3e8193514cc03:i9cf5hkcvix1ae47jdt03rz2e9uzql1d',
        } as any),
      );
      const input = {
        username: 'test',
        password: '2222',
        guestToken: '',
        is_jwt: '',
      };
      await login(null, { input }, { dataSources });
      expect(dataSources.magento.auth.getCustomerToken).toHaveBeenCalled();
    });
  });

  describe('Mutation: forgotPassword', () => {
    it('Should call forgotPassword properly', async () => {
      const forgotPassword = AuthResolvers.Mutation.forgotPassword as Function;
      jest.spyOn(dataSources.magento.auth, 'forgotPassword').mockReturnValue(Promise.resolve({} as any));
      const input = {
        storeCode: 'th',
        email: 'test@example.com',
      };
      await forgotPassword(null, { input }, { dataSources });
      expect(dataSources.magento.auth.forgotPassword).toHaveBeenCalled();
    });
  });

  describe('Mutation: resetPassword', () => {
    it('Should call resetPassword properly', async () => {
      const resetPassword = AuthResolvers.Mutation.resetPassword as Function;
      jest.spyOn(dataSources.magento.auth, 'resetPassword').mockReturnValue(Promise.resolve({} as any));
      const input = {
        newPassword: '12312312121',
        email: 'test@example.com',
        resetToken: 'ejjssdfsdfjdfsdfjksjkksdf',
      };
      await resetPassword(null, { input }, { dataSources });
      expect(dataSources.magento.auth.resetPassword).toHaveBeenCalled();
    });
  });

  describe('Mutation: facebookLogin', () => {
    it('Should call facebookLogin properly', async () => {
      const facebookLogin = AuthResolvers.Mutation.facebookLogin as Function;
      jest.spyOn(dataSources.magento.auth, 'facebookLogin').mockReturnValue(Promise.resolve({} as any));
      const input = {
        social_id: '222232123123123123123123123',
      };
      await facebookLogin(null, input, { dataSources });
      expect(dataSources.magento.auth.facebookLogin).toHaveBeenCalled();
    });
  });

  describe('Mutation: register', () => {
    it('Should call register properly', async () => {
      const register = AuthResolvers.Mutation.register as Function;
      jest.spyOn(dataSources.magento.auth, 'register').mockReturnValue(
        Promise.resolve({
          id: 123,
        } as any),
      );
      jest.spyOn(dataSources.consent, 'getConsentInfo').mockReturnValue(Promise.resolve({} as any));
      jest.spyOn(dataSources.consent, 'createCustomerConsent').mockReturnValue(
        Promise.resolve({
          uuid: 123,
        } as any),
      );
      const input = {
        firstname: '',
        lastname: '',
        password: '',
        email: 'test@example.com',
        is_subscribed: false,
        storeId: '',
        dob: '',
        gender: '',
        tax_id: '',
        phone: '',
        language: '',
        t1c_no: '',
        t1c_phone: '',
        custom_attributes: '',
        accept_consents: [],
      };
      await register(null, { input }, { dataSources });
      expect(dataSources.magento.auth.register).toHaveBeenCalled();
    });
  });

  describe('Mutation: lazyRegister', () => {
    it('Should call lazyRegister properly', async () => {
      const lazyRegister = AuthResolvers.Mutation.lazyRegister as Function;
      jest.spyOn(dataSources.magento.auth, 'lazyRegister').mockReturnValue(
        Promise.resolve({
          id: 123,
        } as any),
      );
      jest.spyOn(dataSources.consent, 'getConsentInfo').mockReturnValue(Promise.resolve({} as any));
      jest.spyOn(dataSources.consent, 'createCustomerConsent').mockReturnValue(
        Promise.resolve({
          uuid: 123,
        } as any),
      );
      const input = {
        firstname: '',
        lastname: '',
        password: '',
        email: 'test@example.com',
        is_subscribed: false,
        storeId: '',
        orderId: '1212312121',
        accept_consents: [],
      };
      await lazyRegister(null, { input }, { dataSources });
      expect(dataSources.magento.auth.lazyRegister).toHaveBeenCalled();
    });
  });
});
