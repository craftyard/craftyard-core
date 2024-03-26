import { BunServer } from 'rilata/src/app/server/bun-server';
import { InjectCallerMiddleware } from 'rilata/src/app/middleware/inject-caller';
import { Middleware } from 'rilata/src/app/middleware/middleware';
import { OnlyPostMethodMiddleware } from 'rilata/src/app/middleware/only-post-method';
import { Constructor } from 'rilata/src/common/types';
import { AuthJwtPayload } from '../types';

export class CraftyardServer extends BunServer<AuthJwtPayload> {
  protected middlewareCtors: Constructor<Middleware>[] = [
    OnlyPostMethodMiddleware,
    InjectCallerMiddleware,
  ];
}
