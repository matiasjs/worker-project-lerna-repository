import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis-config', () => ({
  readUrl: process.env.REDIS_READ_URL,
  writeUrl: process.env.REDIS_WRITE_URL,
}));
