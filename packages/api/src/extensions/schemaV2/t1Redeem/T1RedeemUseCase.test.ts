import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { T1RedeemUseCase } from './T1RedeemUseCase';
import { T1AccessTokenResponse } from '../../../dataSource/magento/t1Passport/MagentoT1PassportResponse';
import { T1VerifyResponse } from '../../../dataSource/magento/cart/MagentoCartResponse';
import { mockGetT1Profile } from './__mocks__/t1Redeem';
import { ApplicationError } from '../../../error/ApplicationError';
import { ApolloError } from 'apollo-server';

const responseToken: T1AccessTokenResponse = {
    access_token: 'MOCK',
    refresh_token: 'MOCK',
    id_token: 'MOCK',
    expires_in: 1000,
    scope: 'MOCK',
    token_type: 'MOCK'
}

const verifyResponse: T1VerifyResponse = {
    next_process: 'redemption',
    request_id: 'MOCK',
}

const t1MDCRedeemResponse = {
    message: 'MOCK MESSAGE',
    all_item_applied_t1c_rule: false,
  }

const mockRedisClient = {
    redisClient: {
        get: jest.fn().mockReturnValue(Promise.resolve(null)),
        set: jest.fn().mockReturnValue(Promise.resolve()),
        delete: jest.fn().mockReturnValue(Promise.resolve()),
    }
}

describe('T1RedeemUseCase', () => {
    const magento = new MagentoDataSource();
    const t1RedeemUsecase = new T1RedeemUseCase({ magento });
    const redisClient = mockRedisClient.redisClient;

    describe('redeem function should run properly', () => {
        it('case numberFailedAttempt >= 3 on member', async () => {
            const input = {
                token: 'MOCK',
                points: 1234,
            }

            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'member',
            };
            const mockCacheData = {
                numberFailedAttempt: 3,
                lastFailedAttempt: "MOCK",
                errorCode: "020004",
                errorMessage: "MOCK",
            }
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));
            jest.spyOn(redisClient,'get').mockReturnValue(Promise.resolve(JSON.stringify(mockCacheData)));
            expect(async() => await t1RedeemUsecase.redeem(input, redisClient)).rejects.toThrowError(
                new ApplicationError(mockCacheData.errorMessage, mockCacheData)
            )

        })

        it('case numberFailedAttempt >= 3 on guest', async () => {
            const input = {
                token: 'MOCK',
                points: 1234,
            }

            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'guest',
            };
            const mockCacheData = {
                numberFailedAttempt: 3,
                lastFailedAttempt: "MOCK",
                errorCode: "MOCK",
                errorMessage: "MOCK",
            }
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));
            jest.spyOn(redisClient,'get').mockReturnValue(Promise.resolve(JSON.stringify(mockCacheData)));
            expect(async() => await t1RedeemUsecase.redeem(input, redisClient)).rejects.toThrowError(
                new ApplicationError(mockCacheData.errorMessage, mockCacheData)
            )

        })
    })

    describe('verify function should run properly', () => {
        it('case verify pass member', async () => {
            const input = {
                token: 'MOCK',
                value: 'MOCK',
                requestID: 'MOCK',
                points: 1234,
            };
            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'member',
                
            };
            
            const cacheKey = 'custom:t1redeem:otp:2011010003925447'
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.cart,'t1RedeemVerify').mockReturnValue(Promise.resolve(verifyResponse));
            jest.spyOn(magento.cart,'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));
            jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));
            await t1RedeemUsecase.verify(input,redisClient);
            expect(redisClient.delete).toBeCalledWith(cacheKey);
            expect(magento.cart.t1RedeemVerify).toBeCalledWith(input.points,input.token,input.value,input.requestID);

        });

        it('case verify pass guest', async () => {
            const input = {
                token: 'MOCK',
                value: 'MOCK',
                requestID: 'MOCK',
                points: 1234,
                guestId: "MOCK"
            };
            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'guest',
                
            };
            const cacheKey = 'custom:t1redeem:otp:2011010003925447'
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.cartGuest,'t1RedeemVerify').mockReturnValue(Promise.resolve(verifyResponse));
            jest.spyOn(magento.cartGuest,'burnPoint').mockReturnValue(Promise.resolve(t1MDCRedeemResponse));
            jest.spyOn(magento.t1passport,'redeemProfile').mockReturnValue(Promise.resolve(mockGetT1Profile));
            await t1RedeemUsecase.verify(input,redisClient);
            expect(redisClient.delete).toBeCalledWith(cacheKey);
            expect(magento.cartGuest.t1RedeemVerify).toBeCalledWith(input.points,input.token,input.value,input.requestID,input.guestId);

        });

        it('case verify failed member', async () => {
            const input = {
                token: 'MOCK',
                value: 'MOCK',
                requestID: 'MOCK',
                points: 1234,
            };
            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'member',
                
            };
            const error = {
                extentions: {
                    response: {
                        body: {
                            code: "020004",
                            message: "MOCK",
                        }
                    }
                }
            }
            const mockCacheData = {
                numberFailedAttempt: 1,
                lastFailedAttempt: "MOCK",
                errorCode: "020004",
                errorMessage: "MOCK",
            }
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.cart,'t1RedeemVerify').mockImplementation(() => {
                const e = new ApolloError("MOCK","MOCK",error.extentions);
                throw e;
              });
            expect(async() => await t1RedeemUsecase.verify(input, redisClient)).rejects.toThrowError(
                new ApplicationError(error.extentions.response.body.message, mockCacheData)
            )
        })

        it('case verify failed guest', async () => {
            const input = {
                token: 'MOCK',
                value: 'MOCK',
                requestID: 'MOCK',
                points: 1234,
                guestId: "MOCK"
            };
            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'guest',
                
            };
            const error = {
                extentions: {
                    response: {
                        body: {
                            code: "MOCK",
                            message: "MOCK",
                        }
                    }
                }
            }
            const mockCacheData = {
                numberFailedAttempt: 1,
                lastFailedAttempt: "MOCK",
                errorCode: "MOCK",
                errorMessage: "MOCK",
            }
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.cartGuest,'t1RedeemVerify').mockImplementation(() => {
                const e = new ApolloError("MOCK","MOCK",error.extentions);
                throw e;
              });
            expect(async() => await t1RedeemUsecase.verify(input, redisClient)).rejects.toThrowError(
                new ApplicationError(error.extentions.response.body.message, mockCacheData)
            )
        })
    });

    describe('refresh token function should run properly', () => {
        it('case valid refresh token for member', async () => {
            const input = {
                refreshToken: 'MOCK',
            }
            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'member',
            };
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.t1passport,'refreshToken').mockReturnValue(Promise.resolve(responseToken));
            await t1RedeemUsecase.refreshToken(input);
            expect(magento.t1passport.refreshToken).toBeCalledWith(input.refreshToken);
        });

        it('case valid refresh token for guest', async () => {
            const input = {
                refreshToken: 'MOCK',
            }
            const context = {
                bu: 'cds',
                store: 'cds_th',
                locale: 'th',
                role: 'guest',
            };
            t1RedeemUsecase.initialize({ context });
            jest.spyOn(magento.t1passport,'refreshToken').mockReturnValue(Promise.resolve(responseToken));
            await t1RedeemUsecase.refreshToken(input);
            expect(magento.t1passport.refreshToken).toBeCalledWith(input.refreshToken);
        });
    });
})