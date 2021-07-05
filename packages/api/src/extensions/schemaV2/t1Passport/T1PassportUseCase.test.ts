import { T1PassportUseCase, ErrorType } from './T1PassportUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { T1PassportDataSource } from '../../../dataSource/t1Passport/T1PassportDataSource';
import ConsentServiceApi from '../../../dataSource/consentServiceApi';
import { CustomerUseCase } from '../customer/CustomerUseCase';
import {
  mockGetT1Profile,
  mockGetMdcId,
  mockGetCustomer,
  mockUpdateCustomer,
  mockLoginByMDC,
} from './__mocks__/t1Passport';
import { mockCustomerMe } from '../customer/__mocks__/Customer';
import { mockConsentInfo, mockCreateConsentResponse } from '../../../dataSource/consentServiceApi/__mocks__/consent';
import { getCustomerProfile } from '../customer/CustomerTransformer';
import { CustomizeError } from '../../../error/CustomizeError';

jest.mock('../../../dataSource/magento/customer/MagentoCustomerDataSource.ts');

describe('T1PassportUseCase', () => {
  const context = {
    bu: 'cds',
    store: 'cds_th',
    locale: 'th',
    token: '1234',
  };
  const magento = new MagentoDataSource();
  const t1Passport = new T1PassportDataSource();
  const consent = new ConsentServiceApi();
  const customerUseCase = new CustomerUseCase({ magento });
  customerUseCase.initialize({ context });
  const t1PassportUseCase = new T1PassportUseCase({ magento, t1Passport, consent, customerUseCase });
  t1PassportUseCase.initialize({ context });

  const t1Token = '1';
  const email = '1';
  const password = '1';
  const acceptConsents = ['PRIVACY', 'MARKETING'];

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('v2ConnectT1Profile should run properly', () => {
    it('case: mdc_id is null or empty', async () => {
      const updateMockGetMdcId = mockGetMdcId;
      delete updateMockGetMdcId?.items[0]?.id;
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(updateMockGetMdcId));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockGetCustomer));
      jest.spyOn(magento.customer, 'update').mockReturnValue(Promise.resolve(mockUpdateCustomer));
      await t1PassportUseCase.v2ConnectT1Profile(t1Token);
      expect(t1Passport.getT1Profile).toBeCalled();
      expect(magento.t1passport.getMdcId).toBeCalled();
      expect(magento.customer.getCustomer).toBeCalled();
      expect(magento.customer.update).toBeCalled();
    });

    it('case: mdc_id is equal', async () => {
      const updateMockGetMdcId = { ...mockGetMdcId };
      updateMockGetMdcId.items[0].id = 3655;
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(updateMockGetMdcId));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockGetCustomer));
      await t1PassportUseCase.v2ConnectT1Profile(t1Token);
      expect(t1Passport.getT1Profile).toBeCalled();
      expect(magento.t1passport.getMdcId).toBeCalled();
      expect(magento.customer.getCustomer).toBeCalled();
    });

    it('case: mdc_id is not equal', async () => {
      const updateMockGetMdcId = { ...mockGetMdcId };
      updateMockGetMdcId.items[0].id = 1;
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(updateMockGetMdcId));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockGetCustomer));
      jest.spyOn(magento.customer, 'update').mockReturnValue(Promise.resolve(mockUpdateCustomer));
      expect(async () => await t1PassportUseCase.v2ConnectT1Profile(t1Token)).rejects.toThrowError(
        new CustomizeError('t1 account already connected with other account', ErrorType.t1AlreadyConnected, {
          body: {
            error: {
              code: ErrorType.t1AlreadyConnected,
              description: 't1 account already connected with other account',
              name: ErrorType.t1AlreadyConnected,
            },
          },
          status: 409,
        }),
      );
    });

    it('case: throw error', async () => {
      jest.spyOn(t1Passport, 'getT1Profile').mockImplementation(() => {
        throw new Error();
      });
      expect(async () => await t1PassportUseCase.v2ConnectT1Profile(t1Token)).rejects.toThrowError(new Error());
    });
  });

  describe('v2GetT1CustomerProfile should run properly', () => {
    it('case: t1_token is null or empty', async () => {
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockGetCustomer));
      await t1PassportUseCase.v2GetT1CustomerProfile(null);
      expect(magento.customer.getCustomer).toBeCalled();
    });

    it('case: api_version is 2 and t1_number from t1_profile api and mdc_profile api is not equal', async () => {
      const updateMockGetCustomer = { ...mockGetCustomer };
      updateMockGetCustomer?.custom_attributes?.map(current => {
        if (current.attribute_code === 't1c_number') current.value = '1';
        return current;
      });
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(updateMockGetCustomer));
      await t1PassportUseCase.v2GetT1CustomerProfile(t1Token);
      expect(t1Passport.getT1Profile).toBeCalled();
      expect(magento.customer.getCustomer).toBeCalled();
    });

    it('case: api_version is 2 and t1_number from t1_profile api and mdc_profile api is equal', async () => {
      const updateMockGetCustomer = { ...mockGetCustomer };
      updateMockGetCustomer?.custom_attributes?.map(current => {
        if (current.attribute_code === 't1c_number') current.value = '2011010003925447';
        return current;
      });
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(updateMockGetCustomer));
      await t1PassportUseCase.v2GetT1CustomerProfile(t1Token);
      expect(t1Passport.getT1Profile).toBeCalled();
      expect(magento.customer.getCustomer).toBeCalled();
    });

    it('case: api_version is not equal 2 and check mdc_id from mdc_query and mdc_profile is not equal', async () => {
      const updateMockGetCustomer = { ...mockGetCustomer };
      updateMockGetCustomer?.custom_attributes?.map(current => {
        if (current.attribute_code === 't1_api_version') current.value = '1';
        return current;
      });
      updateMockGetCustomer.id = 1;
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(mockGetMdcId));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(updateMockGetCustomer));
      await t1PassportUseCase.v2GetT1CustomerProfile(t1Token);
      expect(t1Passport.getT1Profile).toBeCalled();
      expect(magento.t1passport.getMdcId).toBeCalled();
      expect(magento.customer.getCustomer).toBeCalled();
    });

    it('case: api_version is not equal 2 and check mdc_id from mdc_query and mdc_profile is equal', async () => {
      const updateMockGetCustomer = { ...mockGetCustomer };
      updateMockGetCustomer?.custom_attributes?.map(current => {
        if (current.attribute_code === 't1_api_version') current.value = '1';
        return current;
      });
      updateMockGetCustomer.id = 3655;
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(mockGetMdcId));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(updateMockGetCustomer));
      await t1PassportUseCase.v2GetT1CustomerProfile(t1Token);
      expect(t1Passport.getT1Profile).toBeCalled();
      expect(magento.t1passport.getMdcId).toBeCalled();
      expect(magento.customer.getCustomer).toBeCalled();
    });

    it('case: api_version is not equal 2 and check mdc_id from mdc_query is null or empty', async () => {
      const updateMockGetCustomer = { ...mockGetCustomer };
      updateMockGetCustomer?.custom_attributes?.map(current => {
        if (current.attribute_code === 't1_api_version') current.value = '1';
        return current;
      });
      const updateMockGetMdcId = { ...mockGetMdcId };
      updateMockGetMdcId.items[0].id = null;
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(updateMockGetMdcId));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(updateMockGetCustomer));
      jest.spyOn(magento.customer, 'update').mockReturnValue(Promise.resolve(mockUpdateCustomer));
      await t1PassportUseCase.v2GetT1CustomerProfile(t1Token);
      expect(t1Passport.getT1Profile).toBeCalled();
      expect(magento.t1passport.getMdcId).toBeCalled();
      expect(magento.customer.getCustomer).toBeCalled();
      expect(magento.customer.update).toBeCalled();
    });

    it('case: throw error', async () => {
      jest.spyOn(magento.customer, 'getCustomer').mockImplementation(() => {
        throw new Error();
      });
      expect(async () => await t1PassportUseCase.v2GetT1CustomerProfile(t1Token)).rejects.toThrowError(new Error());
    });
  });

  describe('v2DeleteT1Profile should run properly', () => {
    it('case: mdc_id is null or empty', async () => {
      jest.spyOn(t1Passport, 'signout').mockReturnValue(Promise.resolve(true));
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockGetCustomer));
      jest.spyOn(magento.customer, 'update').mockReturnValue(Promise.resolve(mockUpdateCustomer));
      await t1PassportUseCase.v2DeleteT1Profile();
      expect(magento.customer.getCustomer).toBeCalled();
      expect(magento.customer.update).toBeCalled();
    });

    it('case: throw error', async () => {
      jest.spyOn(magento.customer, 'getCustomer').mockImplementation(() => {
        throw new Error();
      });
      expect(async () => await t1PassportUseCase.v2DeleteT1Profile()).rejects.toThrowError(new Error());
    });
  });

  describe('v2CheckEmailRegistered should run properly', () => {
    it('case: email is null or empty', async () => {
      expect(async () => await t1PassportUseCase.v2CheckEmailRegistered(null)).rejects.toThrowError(
        new CustomizeError('Email is mandatory field', ErrorType.requiredEmailField, {
          body: {
            error: {
              code: ErrorType.requiredEmailField,
              description: 'Email is mandatory field',
              name: ErrorType.requiredEmailField,
            },
          },
          status: 400,
        }),
      );
    });

    it('case: email is in systems', async () => {
      const email = 'minhvb@smartosc.com';
      jest.spyOn(magento.t1passport, 'getCustomerByEmail').mockReturnValue(Promise.resolve(mockGetMdcId));
      const result = await t1PassportUseCase.v2CheckEmailRegistered(email);
      expect(result).toEqual({ email, hasMdcProfile: true });
    });

    it('case: email is not in systems', async () => {
      const email = 'minhvb1234@smartosc.com';
      jest.spyOn(magento.t1passport, 'getCustomerByEmail').mockReturnValue(Promise.resolve({ items: [] }));
      const result = await t1PassportUseCase.v2CheckEmailRegistered(email);
      expect(result).toEqual({ email, hasMdcProfile: false });
    });

    it('case: throw error', async () => {
      jest.spyOn(magento.t1passport, 'getCustomerByEmail').mockImplementation(() => {
        throw new Error();
      });
      expect(async () => await t1PassportUseCase.v2CheckEmailRegistered(t1Token)).rejects.toThrowError(new Error());
    });
  });

  describe('v2LoginT1PassportCaseToken should run properly', () => {
    it('case: loginByMDC is not null or empty', async () => {
      jest.spyOn(magento.t1passport, 'loginByMDC').mockReturnValue(Promise.resolve(mockLoginByMDC));
      await t1PassportUseCase.v2LoginT1PassportCaseToken(t1Token);
      expect(magento.t1passport.loginByMDC).toBeCalled();
    });

    it('case: throw error code 1 and has email in t1 profile', async () => {
      const e = {
        extensions: {
          response: {
            body: {
              code: 1,
            },
          },
        },
      };
      const myError = new Error();
      myError['extensions'] = e.extensions;
      jest.spyOn(magento.t1passport, 'loginByMDC').mockImplementation(() => {
        throw myError;
      });
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(mockGetT1Profile));
      expect(async () => await t1PassportUseCase.v2LoginT1PassportCaseToken(t1Token)).rejects.toThrowError(
        new CustomizeError('T1 have email', ErrorType.t1HaveEmail, {
          body: {
            error: {
              code: ErrorType.t1HaveEmail,
              description: 'T1 have email',
              name: ErrorType.t1HaveEmail,
            },
          },
          status: 409,
        }),
      );
    });

    it('case: throw error code 1 and has no email in t1 profile', async () => {
      const e = {
        extensions: {
          response: {
            body: {
              code: 1,
            },
          },
        },
      };
      const myError = new Error();
      myError['extensions'] = e.extensions;
      jest.spyOn(magento.t1passport, 'loginByMDC').mockImplementation(() => {
        throw myError;
      });
      const updateMockGetT1Profile = { ...mockGetT1Profile };
      updateMockGetT1Profile.data.onlineEmail.value = null;
      jest.spyOn(t1Passport, 'getT1Profile').mockReturnValue(Promise.resolve(updateMockGetT1Profile));
      expect(async () => await t1PassportUseCase.v2LoginT1PassportCaseToken(t1Token)).rejects.toThrowError(
        new CustomizeError('T1 not have email', ErrorType.t1NotHaveEmail, {
          body: {
            error: {
              code: ErrorType.t1NotHaveEmail,
              description: 'T1 not have email',
              name: ErrorType.t1NotHaveEmail,
            },
          },
          status: 409,
        }),
      );
    });

    it('case: throw error', async () => {
      jest.spyOn(magento.t1passport, 'loginByMDC').mockImplementation(() => {
        throw new Error();
      });
      expect(async () => await t1PassportUseCase.v2LoginT1PassportCaseToken(t1Token)).rejects.toThrowError(new Error());
    });
  });

  describe('v2LoginT1PassportCaseEmail should run properly', () => {
    it('case: v2LoginT1PassportCaseEmail run properly', async () => {
      jest.spyOn(magento.t1passport, 'loginByMDC').mockReturnValue(Promise.resolve(mockLoginByMDC));
      jest.spyOn(customerUseCase, 'customer').mockReturnValue(Promise.resolve(getCustomerProfile(mockCustomerMe)));
      jest.spyOn(consent, 'getConsentInfo').mockReturnValue(Promise.resolve(mockConsentInfo));
      jest.spyOn(consent, 'createCustomerConsent').mockReturnValue(Promise.resolve(mockCreateConsentResponse));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(mockGetMdcId));
      jest.spyOn(t1PassportUseCase, 'v2UpdateCustomerOldToNew').mockReturnValue(Promise.resolve());
      const result = await t1PassportUseCase.v2LoginT1PassportCaseEmail(t1Token, email, acceptConsents);
      expect(magento.t1passport.loginByMDC).toBeCalled();
      expect(customerUseCase.customer).toBeCalled();
      expect(consent.getConsentInfo).toBeCalled();
      expect(consent.createCustomerConsent).toBeCalled();
      expect(magento.t1passport.getMdcId).toBeCalled();
      expect(t1PassportUseCase.v2UpdateCustomerOldToNew).toBeCalled();
      const expected = { mdcToken: mockLoginByMDC.token };
      expect(result).toEqual(expected);
    });

    it('case: throw error', async () => {
      jest.spyOn(magento.t1passport, 'loginByMDC').mockImplementation(() => {
        throw new Error();
      });
      expect(
        async () => await t1PassportUseCase.v2LoginT1PassportCaseEmail(t1Token, email, acceptConsents),
      ).rejects.toThrowError(new Error());
    });
  });

  describe('v2LoginT1PassportCasePassword should run properly', () => {
    it('case: v2LoginT1PassportCasePassword run properly', async () => {
      jest.spyOn(magento.auth, 'getCustomerToken').mockReturnValue(Promise.resolve('mdctoken:1234'));
      jest.spyOn(magento.t1passport, 'loginByMDC').mockReturnValue(Promise.resolve(mockLoginByMDC));
      jest.spyOn(magento.t1passport, 'getMdcId').mockReturnValue(Promise.resolve(mockGetMdcId));
      jest.spyOn(customerUseCase, 'customer').mockReturnValue(Promise.resolve(getCustomerProfile(mockCustomerMe)));
      jest.spyOn(t1PassportUseCase, 'v2UpdateCustomerOldToNew').mockReturnValue(Promise.resolve());
      const result = await t1PassportUseCase.v2LoginT1PassportCasePassword(t1Token, email, password);
      expect(magento.t1passport.loginByMDC).toBeCalled();
      expect(magento.t1passport.getMdcId).toBeCalled();
      expect(customerUseCase.customer).toBeCalled();
      expect(t1PassportUseCase.v2UpdateCustomerOldToNew).toBeCalled();
      const expected = { mdcToken: mockLoginByMDC.token };
      expect(result).toEqual(expected);
    });

    it('case: throw error', async () => {
      jest.spyOn(magento.t1passport, 'loginByMDC').mockImplementation(() => {
        throw new Error();
      });
      expect(
        async () => await t1PassportUseCase.v2LoginT1PassportCasePassword(t1Token, email, password),
      ).rejects.toThrowError(new Error());
    });
  });

  describe('v2UpdateCustomerOldToNew should run properly', () => {
    it('case: v2UpdateCustomerOldToNew run properly', async () => {
      const updatedMockGetMdcId = { ...mockGetMdcId };
      updatedMockGetMdcId.items[0].id = 1;
      jest
        .spyOn(customerUseCase, 'updateCustomerT1ById')
        .mockReturnValue(Promise.resolve(getCustomerProfile(mockCustomerMe)));
      jest.spyOn(magento.t1passport, 'updateById').mockReturnValue(Promise.resolve(mockCustomerMe));
      await t1PassportUseCase.v2UpdateCustomerOldToNew(
        updatedMockGetMdcId.items[0],
        getCustomerProfile(mockCustomerMe),
        '5679',
      );
      expect(customerUseCase.updateCustomerT1ById).toBeCalled();
    });

    it('case: v2UpdateCustomerOldToNew run properly without old customer id', async () => {
      const updatedMockGetMdcId = { ...mockGetMdcId };
      updatedMockGetMdcId.items[0].id = null;
      jest
        .spyOn(customerUseCase, 'updateCustomerT1')
        .mockReturnValue(Promise.resolve(getCustomerProfile(mockCustomerMe)));
      jest.spyOn(magento.customer, 'update').mockReturnValue(Promise.resolve(mockCustomerMe));
      await t1PassportUseCase.v2UpdateCustomerOldToNew(
        updatedMockGetMdcId.items[0],
        getCustomerProfile(mockCustomerMe),
        '5679',
      );
      expect(customerUseCase.updateCustomerT1).toBeCalled();
    });
  });
});
