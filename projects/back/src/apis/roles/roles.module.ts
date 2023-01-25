import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { rolesConfig } from './config/roles.config';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';
import { RolesGetAll } from '@domains/roles/application/RolesGetAll';
import { RolesRepositoryMongodb } from '@domains/roles/infrastructure/RolesRepository.mongodb';
import { RolesRepository } from '@domains/roles/domain/RolRepository';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesGetAll,
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
  ],
})
export class RolesModule {}
