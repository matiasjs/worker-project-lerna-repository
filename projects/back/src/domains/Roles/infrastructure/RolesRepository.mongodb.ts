import { Injectable } from '@nestjs/common/decorators';

import { Nullable } from 'shared-workers';
import { MongodbRepository } from '../../Shared/infrastructure/MongodbRepository';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ObjectId } from 'mongodb';
import { RolesRepository } from '../domain/RolRepository';
import { Rol } from '../domain/Rol';

@Injectable()
export class RolesRepositoryMongodb
  extends MongodbRepository
  implements RolesRepository
{
  constructor(
    @InjectPinoLogger(RolesRepositoryMongodb.name)
    protected readonly logger: PinoLogger,
    config: MongodbConfig,
  ) {
    super(logger, config);
  }

  async getAll(): Promise<Rol[]> {
    const roles = await this.collection.find().toArray();

    return roles.map(Rol.fromPrimitives);
  }
}
