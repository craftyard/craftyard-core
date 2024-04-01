import { UuidType } from 'rilata/src/common/types';

/** Тело токена авторизации */
export type AuthJwtPayload = {
  userId: UuidType,
  telegramId: number,
}

export type JwtTokens = {
  access: string,
  refresh: string,
}

export type Location = {
  latitude: number,
  longitude: number,
}

export type TelegramId = number;
