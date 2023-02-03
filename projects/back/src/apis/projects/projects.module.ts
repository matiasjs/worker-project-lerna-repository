import { ProjectsRepository } from '@domains/Projects/domain/ProjectRepository';
import { ProjectsRepositoryMongodb } from '@domains/Projects/infrastructure/ProjectsRepository.mongodb';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { projectsConfig } from './config/projects.config';
import { MongodbConfig } from '@domains/Shared/infrastructure/MongodbConfig';

@Module({
  imports: [],
  controllers: [],
  providers: [
    // Mongodb
    {
      provide: MongodbConfig,
      inject: [projectsConfig.KEY],
      useFactory: async (config: ConfigType<typeof projectsConfig>) =>
        MongodbConfig.fromPrimitives({
          host: config.mongodbHost,
          port: config.mongodbPort,
          db: config.mongodbProjectsDatabase,
          collection: config.mongodbProjectsCollection,
          auth: {
            username: config.mongodbUsername,
            password: config.mongodbPassword,
          },
        }),
    },
    { provide: ProjectsRepository, useClass: ProjectsRepositoryMongodb },
  ],
})
export class RolesModule {}
