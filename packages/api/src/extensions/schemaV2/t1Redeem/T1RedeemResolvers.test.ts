import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { T1RedeemResolvers } from './T1RedeemResolvers';
import { T1RedeemUseCase } from './T1RedeemUseCase';
import {
  IV2T1RedeemInput,
  IV2T1RedeemLoginInput,
  IV2T1RedeemNextProcessEnum, IV2T1RedeemProfile, IV2T1RedeemProfileInput,
  IV2T1RedeemResponse, IV2T1RedeemVerifyInput,IV2T1RefreshTokenInput,
} from '../../../types/graphql';
import configs from '../../../configs/vars';
import { T1InitiateResponse, T1VerifyResponse } from '../../../dataSource/magento/cart/MagentoCartResponse';
import { IV2T1Token } from '../../../types/graphql';
import { mockGetT1Profile } from './__mocks__/t1Redeem';


import {
  T1AccessTokenResponse,
  T1RedeemProfile,
} from '../../../dataSource/magento/t1Passport/MagentoT1PassportResponse';

jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('../../../configs/vars');

const responseToken: T1AccessTokenResponse = {
  access_token: 'MOCK',
  refresh_token: 'MOCK',
  id_token: 'MOCK',
  expires_in: 1000,
  scope: 'MOCK',
  token_type: 'MOCK'
}

const expectResponseToken: IV2T1Token = {
  accessToken: 'MOCK',
  expiresIn: 1000,
  idToken: 'MOCK',
  refreshToken: 'MOCK',
  scope: 'MOCK',
  tokenType: 'MOCK',
}

const t1RedeemProfile: T1RedeemProfile = {
  first_name: 'string',
  last_name: 'string',
  member_language_preference: 'string',
  cards: [
    {
      card_no: 'string',
      card_type: 'string',
      parent_member_name: 'string',
      expiry_points_this_year: 10,
      points_balance: 10,
      authority_type: 'string',
    }
  ],
  employee_id: 'string',
  image_profile: 'string',
  user_account_id: 'string',
  account_type: 'string',
  conversion_rate: 10,
  min_allowed_points: 100,
  max_allowed_points: 5000,
}
const expectValue: IV2T1RedeemProfile = {
  firstName: t1RedeemProfile.first_name,
  lastName: t1RedeemProfile.last_name,
  memberLanguagePreference: t1RedeemProfile.member_language_preference,
  cards: [
    {
      cardNo: t1RedeemProfile.cards[0].card_no,
      pointsBalance: t1RedeemProfile.cards[0].points_balance,
      pointsExpiryThisYear: t1RedeemProfile.cards[0].expiry_points_this_year,
    }

  ],
  employeeId: t1RedeemProfile.employee_id,
  imageProfile: t1RedeemProfile.image_profile,
  userAccountId: t1RedeemProfile.user_account_id,
  accountType: t1RedeemProfile.account_type,
  conversionRate: t1RedeemProfile.conversion_rate,
  minAllowedPoints: t1RedeemProfile.min_allowed_points,
  maxAllowedPoints: t1RedeemProfile.max_allowed_points,
}

const redisClient = {
  get: jest.fn().mockReturnValue(Promise.resolve(null)),
  set: jest.fn().mockReturnValue(Promise.resolve()),
  delete: jest.fn().mockReturnValue(Promise.resolve()),
}

describe('t1Redeem', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const magento = new MagentoDataSource();
  const t1RedeemUseCase = new T1RedeemUseCase({ magento });
  const dataSources = {
    magento,
    t1RedeemUseCase,
  };
  const t1MDCRedeemResponse = {
    message: 'MOCK MESSAGE',
    all_item_applied_t1c_rule: false,
  }

  it('t1RedeemVerify limit should read from config file', async () => {
    const noVerifyPointLimitResolver = T1RedeemResolvers.V2T1RedeemResponse.noVerifyPointLimit as Function;
    const result = await noVerifyPointLimitResolver();
    expect(result).toEqual(configs.t1Redeem.noVerifyPointLimit);
  });

  it('t1login should be run correctly on member', async () => {
    const v2T1RedeemLogin = T1RedeemResolvers.Mutation.v2T1RedeemLogin as Function;
    const input: IV2T1RedeemLoginInput = {
      grant_type: "authorization_code",
      code: "MOCK_CODE",
      redirect_uri: "MOCK_URL",
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.t1passport, 'getToken').mockReturnValue(Promise.resolve(responseToken));

    const result = await v2T1RedeemLogin( null, { input }, context)
    expect(expectResponseToken).toEqual(result);
  });

  it('t1login should be run correctly on guest', async () => {
    const v2T1RedeemLogin = T1RedeemResolvers.Mutation.v2T1RedeemLogin as Function;
    const input: IV2T1RedeemLoginInput = {
      grant_type: "authorization_code",
      code: "MOCK_CODE",
      redirect_uri: "MOCK_URL",
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.t1passport, 'getToken').mockReturnValue(Promise.resolve(responseToken));

    const result = await v2T1RedeemLogin( null, { input }, context)
    expect(expectResponseToken).toEqual(result);
  });

  it('t1login should throw error when not support authorization_code', async () => {
    const v2T1RedeemLogin = T1RedeemResolvers.Mutation.v2T1RedeemLogin as Function;
    const input: IV2T1RedeemLoginInput = {
      grant_type: "MOCK",
      code: "MOCK_CODE",
      redirect_uri: "MOCK_URL",
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.t1passport, 'getToken').mockReturnValue(Promise.resolve(responseToken));

    await expect(() => v2T1RedeemLogin( null, { input }, context)).rejects.toThrow();
  });

  it('v2T1Redeem on member with points > 4000', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: 4001,
      token: "MOCK_TOKEN"
    }
    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
      redisClient: {
        get: jest.fn().mockReturnValue(Promise.resolve(null)),
        set: jest.fn().mockReturnValue(Promise.resolve()),
        delete: jest.fn().mockReturnValue(Promise.resolve()),
      },
    };
    t1RedeemUseCase.initialize({ context })

    const t1InitiateResponse: T1InitiateResponse = {
      request_id: 'MOCK_ID',
      next_process: 'verify'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Verify,
      requestID: t1InitiateResponse.request_id
    }

    jest.spyOn(context.dataSources.magento.cart, 't1RedeemInitiate').mockReturnValue(Promise.resolve(t1InitiateResponse));
    jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));

    const result = await v2T1Redeem( null, { input }, context)

    expect(context.dataSources.magento.cart.t1RedeemInitiate).toHaveBeenCalled();
    expect(expectValue).toEqual(result);
  });

  it('v2T1Redeem on member with points <= 4000', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: 4000,
      token: "MOCK_TOKEN"
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
      redisClient: {
        get: jest.fn().mockReturnValue(Promise.resolve(null)),
        set: jest.fn().mockReturnValue(Promise.resolve()),
        delete: jest.fn().mockReturnValue(Promise.resolve()),
      },
    };
    t1RedeemUseCase.initialize({ context })

    const t1InitiateResponse: T1InitiateResponse = {
      request_id: null,
      next_process: 'redemption'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Redemption,
      requestID: t1InitiateResponse.request_id,
      message: t1MDCRedeemResponse.message,
      allItemApplied: t1MDCRedeemResponse.all_item_applied_t1c_rule,
    }

    jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));
    jest.spyOn(context.dataSources.magento.cart, 'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));

    const result = await v2T1Redeem( null, { input }, context)

    expect(context.dataSources.magento.cart.burnPoint).toHaveBeenCalled();
    expect(expectValue).toEqual(result);
  });

  it('v2T1Redeem on guest with points > 4000', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: 4001,
      token: "MOCK_TOKEN",
      guestId: "MOCK"
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
      redisClient: redisClient,
    };
    t1RedeemUseCase.initialize({ context })

    const t1InitiateResponse: T1InitiateResponse = {
      request_id: 'MOCK_ID',
      next_process: 'verify'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Verify,
      requestID: t1InitiateResponse.request_id
    }

    jest.spyOn(context.dataSources.magento.cartGuest, 't1RedeemInitiate').mockReturnValue(Promise.resolve(t1InitiateResponse));
    jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));

    const result = await v2T1Redeem( null, { input }, context)

    expect(context.dataSources.magento.cartGuest.t1RedeemInitiate).toHaveBeenCalled();
    expect(expectValue).toEqual(result);
  });
  it('v2T1Redeem on guest with points > 4000 without guest Id', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: 4001,
      token: "MOCK_TOKEN",
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };
    t1RedeemUseCase.initialize({ context })

    const t1InitiateResponse: T1InitiateResponse = {
      request_id: 'MOCK_ID',
      next_process: 'verify'
    }

    jest.spyOn(context.dataSources.magento.cartGuest, 't1RedeemInitiate').mockReturnValue(Promise.resolve(t1InitiateResponse));
    jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));

    await expect(() => v2T1Redeem( null, { input }, context)).rejects.toThrow();
  });

  it('v2T1Redeem on guest with points <= 4000', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: 4000,
      token: "MOCK_TOKEN",
      guestId: "MOCK"
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
      redisClient: redisClient,
    };
    t1RedeemUseCase.initialize({ context })

    const t1InitiateResponse: T1InitiateResponse = {
      request_id: null,
      next_process: 'redemption'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Redemption,
      requestID: t1InitiateResponse.request_id,
      message: t1MDCRedeemResponse.message,
      allItemApplied: t1MDCRedeemResponse.all_item_applied_t1c_rule,
    }

    jest.spyOn(context.dataSources.magento.cartGuest, 'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));
    jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));

    const result = await v2T1Redeem( null, { input }, context)

    expect(context.dataSources.magento.cartGuest.burnPoint).toHaveBeenCalled();
    expect(expectValue).toEqual(result);
  });
  it('v2T1Redeem on guest with points <= 4000 without guest Id', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: 4000,
      token: "MOCK_TOKEN",
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.cartGuest, 'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));
    jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));

    await expect(() => v2T1Redeem( null, { input }, context)).rejects.toThrow();
  });

  it('v2T1Redeem should throw when <= 0', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: -1,
      token: "MOCK_TOKEN",
      guestId: "MOCK"
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.cartGuest, 'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));

    await expect(() => v2T1Redeem( null, { input }, context)).rejects.toThrow();
  });
  it('v2T1Redeem should throw when next_process is not in list', async () => {
    const v2T1Redeem = T1RedeemResolvers.Mutation.v2T1Redeem as Function;
    const input: IV2T1RedeemInput = {
      points: 4001,
      token: "MOCK_TOKEN",
      guestId: "MOCK"
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };
    t1RedeemUseCase.initialize({ context })

    const t1InitiateResponse: T1InitiateResponse = {
      request_id: null,
      next_process: 'MOCK'
    }

    jest.spyOn(context.dataSources.magento.cartGuest, 't1RedeemInitiate').mockReturnValue(Promise.resolve(t1InitiateResponse));

    await expect(() => v2T1Redeem( null, { input }, context)).rejects.toThrow();
  });

  it('t1Verify should be run correctly on member', async () => {
    const v2T1RedeemVerify = T1RedeemResolvers.Mutation.v2T1RedeemVerify as Function;
    const input: IV2T1RedeemVerifyInput = {
      requestID: "MOCK",
      value: "123456",
      token: "MOCK_TOKEN",
      points: 40,
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
      redisClient: redisClient,
    };
    t1RedeemUseCase.initialize({ context })

    const t1VerifyResponse: T1VerifyResponse = {
      request_id: 'MOCK',
      next_process: 'redemption'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Redemption,
      requestID: t1VerifyResponse.request_id,
      message: t1MDCRedeemResponse.message,
      allItemApplied: t1MDCRedeemResponse.all_item_applied_t1c_rule,
    }

    jest.spyOn(context.dataSources.magento.cart, 't1RedeemVerify').mockReturnValue(Promise.resolve(t1VerifyResponse));
    const result = await v2T1RedeemVerify( null, { input }, context)

    expect(expectValue).toEqual(result);
  });

  it('t1Verify should be run correctly on guest', async () => {
    const v2T1RedeemVerify = T1RedeemResolvers.Mutation.v2T1RedeemVerify as Function;
    const input: IV2T1RedeemVerifyInput = {
      requestID: "MOCK",
      value: "123456",
      token: "MOCK_TOKEN",
      guestId: "MOCK_ID",
      points: 40,
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
      redisClient: redisClient,
    };
    t1RedeemUseCase.initialize({ context })

    const t1VerifyResponse: T1VerifyResponse = {
      request_id: 'MOCK',
      next_process: 'redemption'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Redemption,
      requestID: t1VerifyResponse.request_id,
      message: t1MDCRedeemResponse.message,
      allItemApplied: t1MDCRedeemResponse.all_item_applied_t1c_rule,
    }

    jest.spyOn(context.dataSources.magento.cartGuest, 't1RedeemVerify').mockReturnValue(Promise.resolve(t1VerifyResponse));
    const result = await v2T1RedeemVerify( null, { input }, context)

    expect(expectValue).toEqual(result);
  });

  it('t1Verify should be run correctly on member in case point > 4000', async () => {
    const v2T1RedeemVerify = T1RedeemResolvers.Mutation.v2T1RedeemVerify as Function;
    const input: IV2T1RedeemVerifyInput = {
      requestID: "MOCK",
      value: "123456",
      token: "MOCK_TOKEN",
      points: 4001,
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
      redisClient: redisClient,
    };
    t1RedeemUseCase.initialize({ context })

    const t1VerifyResponse: T1VerifyResponse = {
      request_id: 'MOCK',
      next_process: 'redemption'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Redemption,
      requestID: t1VerifyResponse.request_id,
      message: t1MDCRedeemResponse.message,
      allItemApplied: t1MDCRedeemResponse.all_item_applied_t1c_rule,
    }

    jest.spyOn(context.dataSources.magento.cart, 't1RedeemVerify').mockReturnValue(Promise.resolve(t1VerifyResponse));
    jest.spyOn(context.dataSources.magento.cart, 'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));

    const result = await v2T1RedeemVerify( null, { input }, context)

    expect(context.dataSources.magento.cart.burnPoint).toHaveBeenCalled();
    expect(expectValue).toEqual(result);
  });

  it('t1Verify should be run correctly on guest in case point > 4000', async () => {
    const v2T1RedeemVerify = T1RedeemResolvers.Mutation.v2T1RedeemVerify as Function;
    const input: IV2T1RedeemVerifyInput = {
      requestID: "MOCK",
      value: "123456",
      token: "MOCK_TOKEN",
      guestId: "MOCK_ID",
      points: 4001,
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
      redisClient: redisClient,
    };
    t1RedeemUseCase.initialize({ context })

    const t1VerifyResponse: T1VerifyResponse = {
      request_id: 'MOCK',
      next_process: 'redemption'
    }
    const expectValue: IV2T1RedeemResponse = {
      nextProcess: IV2T1RedeemNextProcessEnum.Redemption,
      requestID: t1VerifyResponse.request_id,
      message: t1MDCRedeemResponse.message,
      allItemApplied: t1MDCRedeemResponse.all_item_applied_t1c_rule,
    }

    jest.spyOn(context.dataSources.magento.cartGuest, 't1RedeemVerify').mockReturnValue(Promise.resolve(t1VerifyResponse));
    jest.spyOn(context.dataSources.magento.cartGuest, 'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));
    const result = await v2T1RedeemVerify( null, { input }, context)

    expect(context.dataSources.magento.cartGuest.burnPoint).toHaveBeenCalled();
    expect(expectValue).toEqual(result);
  });
  it('t1Verify should be throw when next_process is not in list', async () => {
    const v2T1RedeemVerify = T1RedeemResolvers.Mutation.v2T1RedeemVerify as Function;
    const input: IV2T1RedeemVerifyInput = {
      requestID: "MOCK",
      value: "123456",
      token: "MOCK_TOKEN",
      guestId: "MOCK_ID",
      points: 40,
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
      redisClient: redisClient,
    };
    t1RedeemUseCase.initialize({ context })

    const t1VerifyResponse: T1VerifyResponse = {
      request_id: 'MOCK',
      next_process: 'MOCK'
    }

    jest.spyOn(context.dataSources.magento.cartGuest, 't1RedeemVerify').mockReturnValue(Promise.resolve(t1VerifyResponse));
    await expect(() => v2T1RedeemVerify( null, { input }, context)).rejects.toThrow();
  });

  it('get profile should be run correctly on member', async () => {
    const v2T1RedeemProfile = T1RedeemResolvers.Query.v2T1RedeemProfile as Function;
    const input: IV2T1RedeemProfileInput = {
      token: "MOCK",
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.t1passport, 'redeemProfile').mockReturnValue(Promise.resolve(t1RedeemProfile));
    const result = await v2T1RedeemProfile( null, { input }, context)

    expect(expectValue).toEqual(result);
  });

  it('get profile should be run correctly on guest', async () => {
    const v2T1RedeemProfile = T1RedeemResolvers.Query.v2T1RedeemProfile as Function;
    const input: IV2T1RedeemProfileInput = {
      token: "MOCK",
    }

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.t1passport, 'redeemProfile').mockReturnValue(Promise.resolve(t1RedeemProfile));
    const result = await v2T1RedeemProfile( null, { input }, context)

    expect(expectValue).toEqual(result);
  });


  it(`refresh token should be run correctly on member`, async () => {
    const v2T1RefreshToken = T1RedeemResolvers.Mutation.v2T1RefreshToken as Function;
    const input:IV2T1RefreshTokenInput = {
      refreshToken : 'MOCK REFRESH TOKEN',
    };

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'member',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.t1passport, 'refreshToken').mockReturnValue(Promise.resolve(responseToken));
    const result = await v2T1RefreshToken(null, { input }, context);

    expect(expectResponseToken).toEqual(result);
  })

  it(`refresh token should be run correctly on guest`, async () => {
    const v2T1RefreshToken = T1RedeemResolvers.Mutation.v2T1RefreshToken as Function;
    const input:IV2T1RefreshTokenInput = {
      refreshToken : 'MOCK REFRESH TOKEN',
    };

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };
    t1RedeemUseCase.initialize({ context })

    jest.spyOn(context.dataSources.magento.t1passport, 'refreshToken').mockReturnValue(Promise.resolve(responseToken));
    const result = await v2T1RefreshToken(null, { input }, context);

    expect(expectResponseToken).toEqual(result);
  })
});
