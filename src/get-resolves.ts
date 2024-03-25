import { ServerResolves } from 'rilata/src/app/server/server-resolves';
import { JwtVerifierImpl } from 'rilata/src/infra/jwt/jwt-verifier';
import { JwtCreatorImpl } from 'rilata/src/infra/jwt/jwt-creator';
import { ConsoleLogger } from 'rilata/src/common/logger/console-logger';
import { RunMode } from 'rilata/src/app/types';
import { AuthJwtPayload } from './types';
import { JwtDecoderImpl } from './infra/jwt/decoder';

function getRunMode(): RunMode {
  if (process.env.NODE_ENV && (
    process.env.NODE_ENV === 'dev'
    || process.env.NODE_ENV === 'prod'
    || process.env.NODE_ENV === 'test'
  )) return process.env.NODE_ENV;
  throw Error('not finded env.NODE_ENV value');
}

export function getCyServerResolves(
  jwtSecretKey: string,
  resolves?: Partial<ServerResolves<AuthJwtPayload>>,
): ServerResolves<AuthJwtPayload> {
  const defaultResolves: Omit<ServerResolves<AuthJwtPayload>, 'jwtSecretKey'> = {
    logger: new ConsoleLogger(),
    runMode: getRunMode(),
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
  const recievedResolves = resolves || {};
  return {
    ...defaultResolves,
    ...recievedResolves,
    jwtSecretKey,
  };
}
