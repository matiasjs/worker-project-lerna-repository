import { mongoConfig } from '@shared/configs/mongodb.config';
import { registerAs } from '@nestjs/config';
import { redisConfig } from '@shared/configs/redis.config';

export const projectsConfig = registerAs('projects-config', () => ({
  ...mongoConfig(),
  mongodbProjectsDatabase:
    process.env.MONGO_PROJECTS_DATABASE || process.env.MONGO_DATABASE,
  mongodbProjectsCollection: process.env.MONGO_PROJECTS_COLLECTION,
}));
