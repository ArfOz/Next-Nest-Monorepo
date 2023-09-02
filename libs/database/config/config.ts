import { registerAs } from '@nestjs/config';

export default registerAs('mongoDb', () => ({
  databaseUrl: process.env.MONGO_DB_DATABASE_URL,
}));
