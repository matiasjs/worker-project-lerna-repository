import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { rolesConfig } from './config/roles.config';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { RedisConfig } from '@domains/Shared/infrastructure/RedisConfig';
import { RedisRepository } from '@domains/Shared/infrastructure/RedisRepository';
import { RolesCreate } from '@domains/roles/application/RolesCreate';
import { RolesGetAll } from '@domains/roles/application/RolesGetAll';
import { RolesRepository } from '@domains/roles/domain/RolRepository';
import { RolesRepositoryMongodb } from '@domains/roles/infrastructure/RolesRepository.mongodb';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesGetAll,
    RolesCreate,
    RedisRepository,
    // Mongodb
    {
      provide: MongodbConfig,
      inject: [rolesConfig.KEY],
      useFactory: async (config: ConfigType<typeof rolesConfig>) =>
        MongodbConfig.fromPrimitives({
          host: config.mongodbHost,
          port: config.mongodbPort,
          db: config.mongodbRolesDatabase,
          collection: config.mongodbRolesCollection,
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
      inject: [rolesConfig.KEY],
      useFactory: async (config: ConfigType<typeof rolesConfig>) =>
        RedisConfig.fromPrimitives({
          readUrl: config.readUrl,
          writeUrl: config.writeUrl,
        }),
    },
  ],
})
export class RolesModule {}
