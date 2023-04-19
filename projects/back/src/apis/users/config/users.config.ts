import { mongoConfig } from '@shared/configs/mongodb.config';
import { registerAs } from '@nestjs/config';

export const usersConfig = registerAs('users-config', () => ({
  ...mongoConfig(),
  mongodbUsersDatabase:
    process.env.MONGO_USERS_DATABASE || process.env.MONGO_DATABASE,
  mongodbUsersCollection: process.env.MONGO_USERS_COLLECTION,
}));
