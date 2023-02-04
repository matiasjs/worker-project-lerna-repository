import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt-config', () => ({
  secret: process.env.JWT_TOKEN_SECRET,
  expires: `${parseInt(process.env.JWT_EXPIRES_IN_MINUTES)}m`,
}));
