import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './apis/login/login.module';
import { authConfig } from './apis/login/config/auth.config';

import { LoggerModule } from 'nestjs-pino';
import { WorkersModule } from './apis/workers/workers.module';
import { BasicStrategy } from './shared/guards/strategies/basic.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './shared/guards/strategies/jwt.strategy';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [authConfig] }),
    LoginModule,
    WorkersModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasicStrategy, JwtStrategy],
})
export class AppModule {}
