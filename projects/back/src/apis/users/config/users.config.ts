import { mongoConfig } from '@shared/configs/mongodb.config';
import { registerAs } from '@nestjs/config';

export const usersConfig = registerAs('users-config', () => ({
  ...mongoConfig(),
}));
