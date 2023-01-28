// export const mongoConfig = {
//   mongodbHost: process.env.MONGO_HOST,
//   mongodbPort: +process.env.MONGO_PORT,
//   mongodbUsername: process.env.MONGO_USERNAME,
//   mongodbPassword: process.env.MONGO_PASSWORD,
//   mongodbUsersDatabase:
//     process.env.MONGO_USERS_DATABASE || process.env.MONGO_DATABASE,
//   mongodbUsersCollection: process.env.MONGO_USERS_COLLECTION,
// };

import { registerAs } from '@nestjs/config';

export const mongoConfig = registerAs('mongodb-config', () => ({
  mongodbHost: process.env.MONGO_HOST,
  mongodbPort: +process.env.MONGO_PORT,
  mongodbUsername: process.env.MONGO_USERNAME,
  mongodbPassword: process.env.MONGO_PASSWORD,
}));
