import { Global, Logger, Module } from '@nestjs/common';

import { CommonErrorParser } from './parsers/error.parser';
import { ClassValidatorErrorParser } from './parsers/error-parsers/class-validator-error-parser';
import { DomainErrorParser } from './parsers/error-parsers/domain-error-parser';
import { ForbiddenErrorParser } from './parsers/error-parsers/forbidden-error-parser';
import { GenericErrorParser } from './parsers/error-parsers/generic-error-parser';
import { HttpErrorParser } from './parsers/error-parsers/http-error-parser';
import { TimeoutErrorParser } from './parsers/error-parsers/timeout-error-parser';
import { BearerStrategy } from './guards/strategies/bearer.strategy';
import { BasicStrategy } from './guards/strategies/basic.strategy';
import { OwnAuthGuard } from './guards/own-auth-guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './configs/jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ load: [jwtConfig], isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expires,
          },
        };
      },
      inject: [jwtConfig.KEY],
    }),
  ],
  providers: [
    CommonErrorParser,
    ClassValidatorErrorParser,
    DomainErrorParser,
    ForbiddenErrorParser,
    GenericErrorParser,
    HttpErrorParser,
    TimeoutErrorParser,
    BearerStrategy,
    BasicStrategy,
    OwnAuthGuard,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [CommonErrorParser],
})
export class SharedModule {}
