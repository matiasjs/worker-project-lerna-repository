import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersConfig } from './config/users.config';
import { UsersRepositoryMongodb } from '@domains/Users/infrastructure/UsersRepository.mongodb';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { UsersRepository } from '@domains/Users/domain/UsersRepository';
import { UserInsert } from '@domains/Users/application/UsersInsert';
import { UsersGetByEmail } from '@domains/Users/application/UsersGetByEmail';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserInsert,
    UsersGetByEmail,
    {
      provide: MongodbConfig,
      inject: [usersConfig.KEY],
      useFactory: async (config: ConfigType<typeof usersConfig>) =>
        MongodbConfig.fromPrimitives({
          host: config.mongodbHost,
          port: config.mongodbPort,
          db: config.mongodbUsersDatabase,
          collection: config.mongodbUsersCollection,
          auth: {
            username: config.mongodbUsername,
            password: config.mongodbPassword,
          },
        }),
    },
    { provide: UsersRepository, useClass: UsersRepositoryMongodb },
  ],
})
export class UsersModule {}
