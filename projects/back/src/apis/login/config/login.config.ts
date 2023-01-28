import { mongoConfig } from '@shared/configs/mongodb.config';
import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth-config', () => ({
  secret: process.env.JWT_TOKEN_SECRET,
  expires: `${parseInt(process.env.JWT_EXPIRES_IN_MINUTES)}m`,
  ...mongoConfig(),
  mongodbUsersDatabase:
    process.env.MONGO_USERS_DATABASE || process.env.MONGO_DATABASE,
  mongodbUsersCollection: process.env.MONGO_USERS_COLLECTION,
}));
