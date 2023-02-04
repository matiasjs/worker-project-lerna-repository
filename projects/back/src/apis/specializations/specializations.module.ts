import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SpecializationsService } from './specializations.service';
import { SpecializationsController } from './specializations.controller';
import { specializationsConfig } from './config/specializations.config';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { RolesGetAll } from '@domains/roles/application/RolesGetAll';
import { RolesRepositoryMongodb } from '@domains/roles/infrastructure/RolesRepository.mongodb';
import { RolesRepository } from '@domains/roles/domain/RolRepository';
import { RolesCreate } from '@domains/roles/application/RolesCreate';
import { RedisConfig } from '@domains/Shared/infrastructure/RedisConfig';
import { RedisRepository } from '@domains/Shared/infrastructure/RedisRepository';

@Module({
  imports: [],
  controllers: [SpecializationsController],
  providers: [
    SpecializationsService,
    RolesGetAll,
    RolesCreate,
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
    { provide: RolesRepository, useClass: RolesRepositoryMongodb },
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
export class RolesModule {}
