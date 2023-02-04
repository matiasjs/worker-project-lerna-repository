import { mongoConfig } from '@shared/configs/mongodb.config';
import { registerAs } from '@nestjs/config';
import { redisConfig } from '@shared/configs/redis.config';

export const rolesConfig = registerAs('roles-config', () => ({
  ...mongoConfig(),
  ...redisConfig(),
  mongodbRolesDatabase:
    process.env.MONGO_ROLES_DATABASE || process.env.MONGO_DATABASE,
  mongodbRolesCollection: process.env.MONGO_ROLES_COLLECTION,
}));
