import { BaseJwtDecoder } from 'rilata/src/infra/jwt/base-jwt-decoder';
import { AuthJwtPayload } from '../../types';
import { uuidUtility } from 'rilata/src/common/utils/uuid/uuid-utility';

export class JwtDecoderImpl extends BaseJwtDecoder<AuthJwtPayload> {
    constructor(public expiredTimeShiftAsMs: number) {
      super();
    };

    payloadBodyIsValid(payload: AuthJwtPayload): boolean {
      return uuidUtility.isValidValue(payload.userId) && typeof payload.telegramId === 'number'
    }

}
