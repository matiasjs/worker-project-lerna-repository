import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';

import { ConfigType } from '@nestjs/config';
import { authConfig } from './config/auth.config';
import { AuthUsersRepositoryMongodb } from '../../domains/AuthUsers/infrastructure/AuthUsersRepository.mongodb';
import { AuthUsersRepository } from 'src/domains/AuthUsers/domain/AuthUsersRepository';
import { AuthUserLogin } from 'src/domains/AuthUsers/application/AuthUsersLogin';
import { AppController } from 'src/app.controller';

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
    AuthUserLogin,
    { provide: AuthUsersRepository, useClass: AuthUsersRepositoryMongodb },
  ],
})
export class LoginModule {}
