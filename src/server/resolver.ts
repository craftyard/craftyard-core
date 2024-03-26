import { ServerResolver } from 'rilata/src/app/server/server-resolver';
import { AuthJwtPayload } from '../types';

export class CraftyardServerResolver extends ServerResolver<AuthJwtPayload> {}
