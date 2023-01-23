import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';

import { ConfigType } from '@nestjs/config';
import { authConfig } from './config/login.config';
import { UsersRepositoryMongodb } from '../../domains/Users/infrastructure/AuthUsersRepository.mongodb';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { UserLogin } from '@domains/Users/application/UsersLogin';
import { UsersRepository } from '@domains/Users/domain/UsersRepository';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigType<typeof authConfig>) => {
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expires,
          },
        };
      },
      inject: [authConfig.KEY],
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    UserLogin,
    {
      provide: MongodbConfig,
      inject: [authConfig.KEY],
      useFactory: async (config: ConfigType<typeof authConfig>) =>
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
export class LoginModule {}
