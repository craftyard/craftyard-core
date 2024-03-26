import { ServerResolves } from 'rilata/src/app/server/server-resolves';
import { Logger } from 'rilata/src/common/logger/logger';
import { ConsoleLogger } from 'rilata/src/common/logger/console-logger';
import { RunMode } from 'rilata/src/app/types';
import { JwtVerifierImpl } from 'rilata/src/infra/jwt/jwt-verifier';
import { JwtCreatorImpl } from 'rilata/src/infra/jwt/jwt-creator';
import { getLoggerMode } from 'rilata/src/common/logger/logger-modes';
import { JwtDecoderImpl } from '../infra/jwt/decoder';
import { AuthJwtPayload } from '../types';

export type CraftyardServerResolves = ServerResolves<AuthJwtPayload>

function getLogger(): Logger {
  return new ConsoleLogger(getLoggerMode());
}

function getRunMode(): RunMode {
  if (process.env.NODE_ENV && (
    process.env.NODE_ENV === 'dev'
    || process.env.NODE_ENV === 'prod'
    || process.env.NODE_ENV === 'test'
  )) return process.env.NODE_ENV;
  getLogger().warning('Переменная среды NODE_ENV не установлен, установленно значение "test"');
  return 'test';
}

function getJwtSecretKey(): string {
  const secret = process.env.JWT_SECRET_KEY;
  if (secret) return secret;
  throw getLogger().error(
    'not founded jwt secret key by CraftyardServer starting',
  );
}

export function getCyServerResolves(
  resolves?: Partial<CraftyardServerResolves>,
): CraftyardServerResolves {
  const defaultResolves: CraftyardServerResolves = {
    logger: getLogger(),
    runMode: getRunMode(),
    jwtSecretKey: getJwtSecretKey(),
    jwtDecoder: new JwtDecoderImpl(0),
    jwtVerifier: new JwtVerifierImpl(),
    jwtCreator: new JwtCreatorImpl(),
    jwtConfig: {
      algorithm: 'HS256',
      jwtLifetimeAsHour: 24,
      jwtRefreshLifetimeAsHour: 24 * 3,
    },
    serverConfig: {
      hostname: 'localhost',
      port: 3000,
      loggerModes: 'all',
    },
  };
  const recievedResolves = resolves ?? {};
  return {
    ...defaultResolves,
    ...recievedResolves,
  };
}
