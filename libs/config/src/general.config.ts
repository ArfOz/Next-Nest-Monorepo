import { registerAs } from '@nestjs/config';

export default registerAs('general', () => ({
  node_env: process.env['NODE_ENV'],
  mongo_db_user: process.env['MONGO_DB_USER'],
  mongo_db_pass: process.env['MONGO_DB_PASSWORD'],
  database_url: process.env['DATABASE_URL'],
  static_token: process.env['STATIC_TOKEN'],
}));
