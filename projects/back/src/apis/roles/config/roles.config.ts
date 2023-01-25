import { mongoConfig } from '@shared/configs/mongodb.config';
import { registerAs } from '@nestjs/config';

export const rolesConfig = registerAs('roles-config', () => ({
  ...mongoConfig(),
  mongodbRolesDatabase:
    process.env.MONGO_ROLES_DATABASE || process.env.MONGO_DATABASE,
  mongodbRolesCollection: process.env.MONGO_ROLES_COLLECTION,
}));
