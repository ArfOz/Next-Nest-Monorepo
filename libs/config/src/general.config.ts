import { registerAs } from '@nestjs/config';

export default registerAs('general', () => ({
    node_env: process.env['NODE_ENV'],
    mongo_db_user: process.env['MONGO_DB_USER'],
    mongo_db_pass: process.env['MONGO_DB_PASSWORD'],
    mongodb_database_url: process.env['MONGODB_DATABASE_URL'],
    static_token: process.env['STATIC_TOKEN'],
    jwt_secret_key: process.env['JWT_SECRET_KEY'],
    jwt_access_expired: process.env['JWT_ACCESS_EXPIRES_IN'] || '10',
    jwt_refresh_expired: process.env['JWT_REFRESH_EXPIRES_IN'] || '30'
}));
