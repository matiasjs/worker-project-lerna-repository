import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from './apis/login/config/login.config';
import { LoginModule } from './apis/login/login.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '@shared/configs/jwt.config';
import { LoggerModule } from 'nestjs-pino';
import { specializationsConfig } from './apis/guilds/config/specializations.config';
import { SpecializationsModule } from './apis/guilds/guilds.module';
import { projectsConfig } from './apis/projects/config/projects.config';
import { ProjectsModule } from './apis/projects/projects.module';
import { rolesConfig } from './apis/roles/config/roles.config';
import { RolesModule } from './apis/roles/roles.module';
import { usersConfig } from './apis/users/config/users.config';
import { UsersModule } from './apis/users/users.module';
import { WorkersModule } from './apis/workers/workers.module';
import { SharedModule } from './shared/common.module';
import { CommonHttpExceptionFilter } from './shared/filters/http.filter';
import { BasicStrategy } from './shared/guards/strategies/basic.strategy';
import { JwtStrategy } from './shared/guards/strategies/jwt.strategy';
import { CommonHttpInterceptor } from './shared/interceptors/http.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        authConfig,
        usersConfig,
        rolesConfig,
        jwtConfig,
        projectsConfig,
        specializationsConfig,
      ],
      envFilePath: '.env',
    }),
    LoggerModule.forRoot(),
    PassportModule,
    SharedModule,
    LoginModule,
    WorkersModule,
    UsersModule,
    RolesModule,
    ProjectsModule,
    SpecializationsModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
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
  exports: [JwtService],
})
export class AppModule {}
