import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './apis/login/login.module';
import { authConfig } from './apis/login/config/login.config';

import { LoggerModule } from 'nestjs-pino';
import { WorkersModule } from './apis/workers/workers.module';
import { BasicStrategy } from './shared/guards/strategies/basic.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './shared/guards/strategies/jwt.strategy';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CommonHttpInterceptor } from './shared/interceptors/http.interceptor';
import { CommonHttpExceptionFilter } from './shared/filters/http.filter';
import { SharedModule } from './shared/common.module';
import { UsersModule } from './apis/users/users.module';
import { usersConfig } from './apis/users/config/users.config';
import { RolesModule } from './apis/roles/roles.module';
import { rolesConfig } from './apis/roles/config/roles.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, usersConfig, rolesConfig],
      envFilePath: '.env',
    }),
    LoggerModule.forRoot(),
    PassportModule,
    SharedModule,
    LoginModule,
    WorkersModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BasicStrategy,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: CommonHttpInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CommonHttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
