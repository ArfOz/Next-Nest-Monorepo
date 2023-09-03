import { registerAs } from '@nestjs/config';

export default registerAs('mongoDb', () => ({
  databaseUrl: process.env.DATABASE_URL,
}));
