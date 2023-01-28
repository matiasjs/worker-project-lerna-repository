import { AuthUsersRepository } from '../domain/AuthUsersRepository';
import { AuthUser } from '../domain/AuthUser';
import { Injectable } from '@nestjs/common/decorators';

import { Nullable } from 'shared-workers';
import { MongodbRepository } from '../../../domains/Shared/infrastructure/MongodbRepository';
import { MongodbConfig } from 'src/domains/Shared/infrastructure/MongodbConfig';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthUsersRepositoryMongodb
  extends MongodbRepository
  implements AuthUsersRepository
{
  constructor(
    @InjectPinoLogger(AuthUsersRepositoryMongodb.name)
    protected readonly logger: PinoLogger,
    config: MongodbConfig,
  ) {
    super(logger, config);
  }

  async findByUsername(username: string): Promise<Nullable<AuthUser>> {
    return this.collection.findOne({ username });
  }
}