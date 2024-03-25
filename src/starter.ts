import { Module } from 'rilata/src/app/module/module';
import { ServerStarter } from 'rilata/src/app/server/server-starter';
import { ServerResolves } from 'rilata/src/app/server/server-resolves';
import { ModuleConstructors } from 'rilata/src/app/server/types';
import { AuthJwtPayload } from './types';
import { CraftyardServer } from './server';
import { getCyServerResolves } from './get-resolves';

export class CraftyardServerStarter<M extends Module<AuthJwtPayload>>
  extends ServerStarter<AuthJwtPayload, M> {
  protected ServerCtor = CraftyardServer;

  constructor(
    jwtSecretKey: string,
    ModuleCtors: ModuleConstructors<M>[],
    resolves?: Partial<ServerResolves<AuthJwtPayload>>,
  ) {
    super(CraftyardServer, getCyServerResolves(jwtSecretKey, resolves), ModuleCtors);
  }
}
