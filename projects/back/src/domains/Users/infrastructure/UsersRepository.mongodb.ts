import { UsersRepository } from '../domain/UsersRepository';
import { User } from '../domain/User';
import { Injectable } from '@nestjs/common/decorators';

import { Nullable } from 'shared-workers';
import { MongodbRepository } from '../../Shared/infrastructure/MongodbRepository';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UsersRepositoryMongodb
  extends MongodbRepository
  implements UsersRepository
{
  constructor(
    @InjectPinoLogger(UsersRepositoryMongodb.name)
    protected readonly logger: PinoLogger,
    config: MongodbConfig,
  ) {
    super(logger, config);
  }

  findBySpecialization(specializationid: string): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmailLogin(email: string): Promise<Nullable<User>> {
    return this.findByEmail(email);
  }

  async findByEmail(email: string): Promise<Nullable<User>> {
    const users = (await this.collection
      .aggregate([
        {
          $match: {
            email: email,
          },
        },
        {
          $lookup: {
            from: 'specializations',
            localField: 'specializationid',
            foreignField: '_id',
            as: 'specialization',
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
            path: '$specialization',
          },
        },
        {
          $unwind: {
            path: '$rol',
          },
        },
      ])
      .toArray()) as any;

    return User.fromPrimitives(users[0]);
  }

  async insert(user: User): Promise<Nullable<User>> {
    return this.collection
      .insertOne(user.toMongodb())
      .then(({ insertedId }) => {
        return User.fromPrimitives({
          ...user.toPrimitives(),
          _id: insertedId.toString(),
        });
      });
  }
}
