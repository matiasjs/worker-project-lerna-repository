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
    const users = (await this.collection
      .aggregate([
        {
          $match: {
            username: username,
          },
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'rolid',
            foreignField: '_id',
            as: 'rol',
          },
        },
        {
          $unwind: {
            path: '$rol',
          },
        },
      ])
      .toArray()) as any;

    return users[0];
  }
}
