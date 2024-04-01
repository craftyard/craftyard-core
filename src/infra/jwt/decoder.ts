import { BaseJwtDecoder } from 'rilata/src/infra/jwt/base-jwt-decoder';
import { uuidUtility } from 'rilata/src/common/utils/uuid/uuid-utility';
import { AuthJwtPayload } from '../../types';

export class JwtDecoderImpl extends BaseJwtDecoder<AuthJwtPayload> {
  constructor(protected expiredTimeShiftAsMs: number) {
    super();
  }

  payloadBodyIsValid(payload: AuthJwtPayload): boolean {
    return uuidUtility.isValidValue(payload.userId) && typeof payload.telegramId === 'number';
  }
}
