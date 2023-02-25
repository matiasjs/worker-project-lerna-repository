import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SpecializationsService } from './specializations.service';
import { SpecializationsController } from './specializations.controller';
import { specializationsConfig } from './config/specializations.config';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { RedisConfig } from '@domains/Shared/infrastructure/RedisConfig';
import { RedisRepository } from '@domains/Shared/infrastructure/RedisRepository';
import { SpecializationsRepository } from '@domains/Specializations/domain/SpecializationRepository';
import { SpecializationsRepositoryMongodb } from '@domains/Specializations/infrastructure/SpecializationsRepository.mongodb';
import { SpecializationsGetAll } from '@domains/Specializations/application/SpecializationsGetAll';

@Module({
  imports: [],
  controllers: [SpecializationsController],
  providers: [
    SpecializationsService,
    SpecializationsGetAll,
    RedisRepository,
    // Mongodb
    {
      provide: MongodbConfig,
      inject: [specializationsConfig.KEY],
      useFactory: async (config: ConfigType<typeof specializationsConfig>) =>
        MongodbConfig.fromPrimitives({
          host: config.mongodbHost,
          port: config.mongodbPort,
          db: config.mongodbSpecializationsDatabase,
          collection: config.mongodbSpecializationsCollection,
          auth: {
            username: config.mongodbUsername,
            password: config.mongodbPassword,
          },
        }),
    },
    {
      provide: SpecializationsRepository,
      useClass: SpecializationsRepositoryMongodb,
    },
    // Redis
    {
      provide: RedisConfig,
      inject: [specializationsConfig.KEY],
      useFactory: async (config: ConfigType<typeof specializationsConfig>) =>
        RedisConfig.fromPrimitives({
          readUrl: config.readUrl,
          writeUrl: config.writeUrl,
        }),
    },
  ],
})
export class SpecializationsModule {}
