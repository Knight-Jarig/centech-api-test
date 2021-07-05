import { T1AccessTokenResponse } from '../../../dataSource/magento/t1Passport/MagentoT1PassportResponse';
import { IV2T1Token } from '../../../types/graphql';

export function tokenResponseMapper(token: T1AccessTokenResponse): IV2T1Token {
  return {
    accessToken: token.access_token,
    expiresIn: token.expires_in,
    idToken: token.id_token,
    refreshToken: token.refresh_token,
    scope: token.scope,
    tokenType: token.token_type,
  };
}
