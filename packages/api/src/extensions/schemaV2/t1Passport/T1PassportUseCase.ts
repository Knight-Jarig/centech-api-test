import { MDCStoreConfig } from '../../schemaV2/types/mdc-store-config';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { T1PassportDataSource } from '../../../dataSource/t1Passport/T1PassportDataSource';
import ConsentServiceApi from '../../../dataSource/consentServiceApi';
import {
  IConsentType,
  IV2T1ProfileData,
  IV2GetT1ProfileResponse,
  IV2T1DeleteProfileResponse,
  IV2CheckEmailRegistered,
  IV2LoginT1PassportResponse,
  IV2Customer,
} from '../../../types/graphql';
import { CustomizeError } from '../../../error/CustomizeError';
import { CustomerUseCase } from '../customer/CustomerUseCase';
import { MDCItems } from '../../../dataSource/magento/t1Passport/MagentoT1PassportResponse';
interface T1PassportUseCaseOptions {
  magento: MagentoDataSource;
  t1Passport: T1PassportDataSource;
  consent: ConsentServiceApi;
  customerUseCase: CustomerUseCase;
}

export enum ErrorType {
  t1AlreadyConnected = 'T1_ALREADY_CONNECTED',
  requiredEmailField = 'EMAIL_FIELD_IS_REQUIRED',
  t1NotHaveEmail = 'T1_NOT_HAVE_EMAIL',
  t1HaveEmail = 'T1_HAVE_EMAIL',
}

export class T1PassportUseCase {
  private store?: MDCStoreConfig;
  private magento: MagentoDataSource;
  private t1Passport: T1PassportDataSource;
  private consent: ConsentServiceApi;
  private customerUseCase: CustomerUseCase;

  constructor({ magento, t1Passport, consent, customerUseCase }: T1PassportUseCaseOptions) {
    this.magento = magento;
    this.t1Passport = t1Passport;
    this.consent = consent;
    this.customerUseCase = customerUseCase;
  }

  initialize(config): void {
    this.store = config.context.store;
  }

  async v2ConnectT1Profile(t1Token: string): Promise<IV2T1ProfileData> {
    const getT1Profile = await this.t1Passport.getT1Profile(t1Token);
    const t1Profile = {
      ...getT1Profile?.data,
      card: getT1Profile?.data?.cards,
    };
    const t1cNumber = t1Profile?.cards[0]?.cardNo;
    const mdcData = await this.magento.t1passport.getMdcId(t1cNumber);
    const mdcDataId = mdcData?.items[0]?.id;
    const customerProfile = await this.customerUseCase.customer();
    const customerProfileMdcId = parseInt(customerProfile?.id);
    if (!mdcDataId) {
      await this.customerUseCase.updateCustomerT1({ customerProfile, t1cNumber, t1ApiVersion: '2' });
      return t1Profile as IV2T1ProfileData;
    } else if (mdcDataId === customerProfileMdcId) {
      return t1Profile as IV2T1ProfileData;
    } else if (mdcDataId !== customerProfileMdcId) {
      throw new CustomizeError('t1 account already connected with other account', ErrorType.t1AlreadyConnected, {
        body: {
          error: {
            code: ErrorType.t1AlreadyConnected,
            description: 't1 account already connected with other account',
            name: ErrorType.t1AlreadyConnected,
          },
        },
        status: 409,
      });
    }
  }

  async v2GetT1CustomerProfile(t1Token: string): Promise<IV2GetT1ProfileResponse> {
    const customerProfile = await this.customerUseCase.customer();
    const customerProfileMdcId = parseInt(customerProfile?.id);
    const t1cNo = customerProfile?.t1cNo;
    const t1ApiVersion = customerProfile?.t1cApiVersion;
    if (!t1Token) {
      return { mdcProfile: customerProfile };
    }
    const getT1Profile = await this.t1Passport.getT1Profile(t1Token);
    const t1Profile = {
      ...getT1Profile?.data,
      card: getT1Profile?.data?.cards,
    };
    const t1cNumber = t1Profile?.cards[0]?.cardNo;
    if (t1ApiVersion !== '2') {
      const mdcData = await this.magento.t1passport.getMdcId(t1cNumber);
      const mdcDataId = mdcData?.items[0]?.id;
      if (!mdcDataId) {
        const updatedCustomerProfile = await this.customerUseCase.updateCustomerT1({
          customerProfile,
          t1cNumber,
          t1ApiVersion: '2',
        });
        return { t1Profile, mdcProfile: updatedCustomerProfile, mdcMatch: true } as IV2GetT1ProfileResponse;
      } else if (customerProfileMdcId === mdcDataId) {
        return { mdcProfile: customerProfile, mdcMatch: true };
      } else if (customerProfileMdcId !== mdcDataId) {
        return { mdcProfile: customerProfile, mdcMatch: false };
      }
    } else if (t1ApiVersion === '2' && t1cNo !== t1cNumber) {
      return { mdcProfile: customerProfile, mdcMatch: false };
    } else if (t1ApiVersion === '2' && t1cNo === t1cNumber) {
      return { t1Profile, mdcProfile: customerProfile, mdcMatch: true } as IV2GetT1ProfileResponse;
    }
  }

  async v2DeleteT1Profile(): Promise<IV2T1DeleteProfileResponse> {
    const customerProfile = await this.customerUseCase.customer();
    await this.customerUseCase.updateCustomerT1({ customerProfile, t1cNumber: '', t1ApiVersion: '' });

    return { isSuccess: true };
  }

  async v2CheckEmailRegistered(email: string): Promise<IV2CheckEmailRegistered> {
    if (!email) {
      throw new CustomizeError('Email is mandatory field', ErrorType.requiredEmailField, {
        body: {
          error: {
            code: ErrorType.requiredEmailField,
            description: 'Email is mandatory field',
            name: ErrorType.requiredEmailField,
          },
        },
        status: 400,
      });
    }
    const customer = await this.magento.t1passport.getCustomerByEmail(email);
    const customerProfile = customer?.items?.[0];
    if (!customerProfile) {
      return { email, hasMdcProfile: false };
    }
    return { email, hasMdcProfile: true };
  }

  async v2LoginT1PassportCaseToken(t1Token: string): Promise<IV2LoginT1PassportResponse> {
    try {
      const t1LoginSocial = await this.magento.t1passport.loginByMDC({ token: t1Token });
      return { mdcToken: t1LoginSocial.token };
    } catch (e) {
      if (e?.extensions?.response?.body?.code === 1) {
        const getT1Profile = await this.t1Passport.getT1Profile(t1Token);
        const getT1ProfileEmail = getT1Profile?.data?.onlineEmail?.value;
        if (!getT1ProfileEmail) {
          throw new CustomizeError('T1 not have email', ErrorType.t1NotHaveEmail, {
            body: {
              error: {
                code: ErrorType.t1NotHaveEmail,
                description: 'T1 not have email',
                name: ErrorType.t1NotHaveEmail,
              },
            },
            status: 409,
          });
        }
        throw new CustomizeError('T1 have email', ErrorType.t1HaveEmail, {
          body: {
            error: {
              code: ErrorType.t1HaveEmail,
              description: 'T1 have email',
              name: ErrorType.t1HaveEmail,
              email: getT1ProfileEmail,
            },
          },
          status: 409,
        });
      }
      throw e;
    }
  }

  async v2LoginT1PassportCaseEmail(
    t1Token: string,
    email: string,
    acceptConsents: string[] = [],
  ): Promise<IV2LoginT1PassportResponse> {
    const t1LoginSocial = await this.magento.t1passport.loginByMDC({ token: t1Token, email });
    const mdcToken = t1LoginSocial?.token;
    const t1cNumber = t1LoginSocial?.t1c_number;

    const [customerProfile, consentInfo] = await Promise.all([
      this.customerUseCase.customer(mdcToken),
      this.consent.getConsentInfo(),
    ]);
    await this.consent.createCustomerConsent({
      ref_id: customerProfile.id,
      email: customerProfile.email,
      consent_privacy_version: consentInfo?.consent_privacy_version,
      consent_privacy_status: acceptConsents.includes(IConsentType.Privacy),
      consent_marketing_status: acceptConsents.includes(IConsentType.Marketing),
    });

    const mdcData = await this.magento.t1passport.getMdcId(t1cNumber);
    const mdcDataItem = mdcData?.items[0];
    await this.v2UpdateCustomerOldToNew(mdcDataItem, customerProfile, t1cNumber);
    return { mdcToken };
  }

  async v2LoginT1PassportCasePassword(
    t1Token: string,
    email: string,
    password: string,
  ): Promise<IV2LoginT1PassportResponse> {
    await this.magento.auth.getCustomerToken({ username: email, password });
    const t1LoginSocial = await this.magento.t1passport.loginByMDC({ token: t1Token, email });
    const mdcToken = t1LoginSocial?.token;
    const t1cNumber = t1LoginSocial?.t1c_number;

    const [mdcData, customerProfile] = await Promise.all([
      this.magento.t1passport.getMdcId(t1cNumber),
      this.customerUseCase.customer(mdcToken),
    ]);
    const mdcDataItem = mdcData?.items[0];
    await this.v2UpdateCustomerOldToNew(mdcDataItem, customerProfile, t1cNumber);
    return { mdcToken };
  }

  async v2UpdateCustomerOldToNew(
    oldCustomerData: MDCItems,
    newCustomerData: IV2Customer,
    t1cNumber: string,
  ): Promise<void> {
    const oldCustomerId = oldCustomerData?.id?.toString();
    if (oldCustomerId) {
      const data = {
        id: oldCustomerId,
        customerProfile: {
          email: oldCustomerData?.email,
          firstname: oldCustomerData?.firstname,
          lastname: oldCustomerData?.lastname,
          websiteId: oldCustomerData?.website_id?.toString(),
        },
        t1cNumber: '',
        t1ApiVersion: '',
      };
      await this.customerUseCase.updateCustomerT1ById(data);
    } else {
      await this.customerUseCase.updateCustomerT1({ customerProfile: newCustomerData, t1cNumber, t1ApiVersion: '2' });
    }
  }
}
