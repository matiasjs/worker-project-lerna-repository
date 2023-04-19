import { registerAs } from '@nestjs/config';

export const workersConfig = registerAs('workers-config', () => ({}));
