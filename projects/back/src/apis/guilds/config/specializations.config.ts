import { mongoConfig } from '@shared/configs/mongodb.config';
import { registerAs } from '@nestjs/config';
import { redisConfig } from '@shared/configs/redis.config';

export const specializationsConfig = registerAs(
  'specializations-config',
  () => ({
    ...mongoConfig(),
    ...redisConfig(),
    mongodbSpecializationsDatabase:
      process.env.MONGO_SPECIALIZATIONS_DATABASE || process.env.MONGO_DATABASE,
    mongodbSpecializationsCollection:
      process.env.MONGO_SPECIALIZATIONS_COLLECTION,
  }),
);
