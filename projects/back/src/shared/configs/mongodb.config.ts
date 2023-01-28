import { registerAs } from '@nestjs/config';

export const mongoConfig = registerAs('mongodb-config', () => ({
  mongodbHost: process.env.MONGO_HOST,
  mongodbPort: +process.env.MONGO_PORT,
  mongodbUsername: process.env.MONGO_USERNAME,
  mongodbPassword: process.env.MONGO_PASSWORD,
}));
