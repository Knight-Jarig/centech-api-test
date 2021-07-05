import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import {
  IV2T1RedeemInput,
  IV2T1RedeemLoginInput,
  IV2T1RedeemNextProcessEnum,
  IV2T1RedeemProfile,
  IV2T1RedeemProfileInput,
  IV2T1RedeemResponse,
  IV2T1RedeemVerifyInput,
  IV2T1RedeemVerifyResponse,
  IV2T1Token,
  IV2T1RefreshTokenInput,
} from '../../../types/graphql';
import { T1InitiateResponse, T1VerifyResponse } from '../../../dataSource/magento/cart/MagentoCartResponse';
import {
  T1AccessTokenResponse,
  T1RedeemProfile,
} from '../../../dataSource/magento/t1Passport/MagentoT1PassportResponse';
import { ApplicationError } from '../../../error/ApplicationError';
import { tokenResponseMapper } from './T1RedeemTransformer';
import configs from '../../../configs/vars';
import { DateTime } from 'luxon';

interface T1RedeemUseCaseOption {
  magento: MagentoDataSource;
}

const IV2T1RedeemNextProcessEnumMap = {
  redemption: IV2T1RedeemNextProcessEnum.Redemption,
  verify: IV2T1RedeemNextProcessEnum.Verify,
};

const maxFailedAttempt = 3;

export class T1RedeemUseCase {
  private magento: MagentoDataSource;
  private role: 'member' | 'guest' = 'guest';
  private storeCode: string;

  constructor({ magento }: T1RedeemUseCaseOption) {
    this.magento = magento;
  }

  initialize(config): void {
    this.role = config.context.role;
    this.storeCode = config.context.storeCode;
  }

  async login(input: IV2T1RedeemLoginInput): Promise<IV2T1Token> {
    if (input.grant_type !== 'authorization_code') {
      throw new ApplicationError('currently support only authorization_code');
    }
    const tokenResponse = await this.dataSource.getToken(input);

    return tokenResponseMapper(tokenResponse);
  }

  async redeem(input: IV2T1RedeemInput, redisClient): Promise<IV2T1RedeemResponse> {
    const { points, token, guestId } = input;
    if (points <= 0) {
      throw new ApplicationError('points need to greater than 0');
    }
    const profile = await this.dataSource.profile(token);
    const cacheKey = `custom:t1redeem:otp:${profile.cards[0].card_no}`;
    const cacheData = await this.getCache(cacheKey, redisClient);
    if (cacheData && cacheData.numberFailedAttempt >= maxFailedAttempt) {
      throw new ApplicationError(cacheData.message, cacheData);
    }

    if (points > configs.t1Redeem.noVerifyPointLimit) {
      const response = await this.dataSource.t1RedeemInitiate(token, points, guestId);
      const nextProcess = IV2T1RedeemNextProcessEnumMap[response.next_process];
      if (!nextProcess) {
        throw new ApplicationError(`next_process is invalid [${response.next_process}]`);
      }

      return {
        nextProcess,
        requestID: response.request_id,
      };
    } else {
      const redeemResponse = await this.dataSource.burnPoint(points, guestId, token);

      return {
        nextProcess: IV2T1RedeemNextProcessEnum.Redemption,
        requestID: null,
        allItemApplied: !!redeemResponse.all_item_applied_t1c_rule,
        message: redeemResponse.message || null,
      };
    }
  }

  setCache = async (key, value, redisClient, ttl) => {
    await redisClient.set(key, JSON.stringify(value), { ttl });
  };

  getCache = async (key, redisClient) => {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  };
  async verify(input: IV2T1RedeemVerifyInput, redisClient): Promise<IV2T1RedeemVerifyResponse> {
    const { points, token, value, requestID, guestId } = input;
    const errorTimeOut = 15;
    const ttl = errorTimeOut * 60; // 15 min
    const profile = await this.dataSource.profile(token);
    const cacheKey = `custom:t1redeem:otp:${profile.cards[0].card_no}`;
    let response;
    try {
      response = await this.dataSource.verify(points, token, value, requestID, guestId);
    } catch (e) {
      const errorResponse = e.extensions.response.body;
      const code = errorResponse.code;
      if (code === '020004' || code === '910104') {
        const message = errorResponse.message;
        const failedTimeStamp = DateTime.fromISO(new Date().toISOString()).toUTC();
        const lastFailedAttempt = failedTimeStamp.toString();
        const availableTime = failedTimeStamp.plus({ minutes: errorTimeOut }).toUTC().toString();

        let cacheData = await this.getCache(cacheKey, redisClient);

        if (cacheData) {
          const nextNumberFailedAttempt = cacheData.numberFailedAttempt + 1;

          cacheData.numberFailedAttempt = nextNumberFailedAttempt > maxFailedAttempt ? maxFailedAttempt : nextNumberFailedAttempt
          cacheData.lastFailedAttempt = lastFailedAttempt
          cacheData.availableTime = availableTime
          cacheData.code = code
          cacheData.message = message
          await this.setCache(cacheKey, cacheData, redisClient, ttl);
        } else {
          cacheData = {
            numberFailedAttempt: 1,
            maxFailedAttempt,
            lastFailedAttempt,
            availableTime,
            availableInMinutes: errorTimeOut,
            code: code,
            message: message,
          };
          await this.setCache(cacheKey, cacheData, redisClient, ttl);
        }

        throw ApplicationError.create(e, {
          ...cacheData,
        });
      } else {
        throw ApplicationError.create(e);
      }
    }

    const nextProcess = IV2T1RedeemNextProcessEnumMap[response.next_process];
    if (!nextProcess) {
      throw new ApplicationError(`next_process is invalid [${response.next_process}]`);
    }

    const redeemResponse = await this.dataSource.burnPoint(points, guestId, token);
    await redisClient.delete(cacheKey);
    return {
      nextProcess,
      requestID: response.request_id,
      allItemApplied: !!redeemResponse.all_item_applied_t1c_rule,
      message: redeemResponse.message || null,
    };
  }

  async profile(input: IV2T1RedeemProfileInput): Promise<IV2T1RedeemProfile> {
    const { token } = input;
    const response = await this.dataSource.profile(token);

    return {
      firstName: response.first_name,
      lastName: response.last_name,
      memberLanguagePreference: response.member_language_preference,
      cards: (response.cards || []).map(card => {
        return {
          cardNo: card.card_no,
          pointsBalance: card.points_balance,
          pointsExpiryThisYear: card.expiry_points_this_year,
        };
      }),
      employeeId: response.employee_id,
      imageProfile: response.image_profile,
      userAccountId: response.user_account_id,
      accountType: response.account_type,
      conversionRate: response.conversion_rate,
      minAllowedPoints: response.min_allowed_points || null,
      maxAllowedPoints: response.max_allowed_points || null,
    };
  }

  async refreshToken(input: IV2T1RefreshTokenInput): Promise<IV2T1Token> {
    const tokenResponse = await this.dataSource.refreshToken(input.refreshToken);
    return tokenResponseMapper(tokenResponse);
  }

  private get dataSource(): {
    getToken(input: IV2T1RedeemLoginInput): Promise<T1AccessTokenResponse>;
    profile(token: string): Promise<T1RedeemProfile>;
    t1RedeemInitiate(token: string, points: number, guestId?: string): Promise<T1InitiateResponse>;
    burnPoint(points: number, guestId?: string, token?: string): Promise<any>;
    verify(
      points: number,
      token: string,
      value: string,
      requestID: string,
      guestId?: string,
    ): Promise<T1VerifyResponse>;
    refreshToken(refreshToken: string);
  } {
    const sources = {
      member: {
        getToken: (input: IV2T1RedeemLoginInput) => this.magento.t1passport.getToken({ userInfo: input }),
        profile: (token: string) => this.magento.t1passport.redeemProfile(token),
        t1RedeemInitiate: (token: string, points: number) => {
          return this.magento.cart.t1RedeemInitiate(token, points);
        },
        burnPoint: (points: number, _guestId?: string, token?: string) => {
          return this.magento.cart.burnPoint(points, this.storeCode, token);
        },
        verify: (points: number, token: string, value: string, requestID: string) => {
          return this.magento.cart.t1RedeemVerify(points, token, value, requestID);
        },
        refreshToken: (refreshToken: string) => this.magento.t1passport.refreshToken(refreshToken),
      },
      guest: {
        getToken: (input: IV2T1RedeemLoginInput) => this.magento.t1passport.getToken({ userInfo: input }),
        profile: (token: string) => this.magento.t1passport.redeemProfile(token),
        t1RedeemInitiate: (token: string, points: number, guestId: string) => {
          if (!guestId) throw new Error("GuestId doesn't exist");
          return this.magento.cartGuest.t1RedeemInitiate(guestId, token, points);
        },
        burnPoint: (points: number, guestId?: string, token?: string) => {
          if (!guestId) throw new Error("GuestId doesn't exist");
          return this.magento.cartGuest.burnPoint(points, guestId, this.storeCode, token);
        },
        verify: (points: number, token: string, value: string, requestID: string, guestId?: string) => {
          return this.magento.cartGuest.t1RedeemVerify(points, guestId, token, value, requestID);
        },
        refreshToken: (refreshToken: string) => this.magento.t1passport.refreshToken(refreshToken),
      },
    };

    return sources[this.role];
  }
}
