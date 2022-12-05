import {config} from 'dotenv';

config();

export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    ORIGIN,
    CREDENTIALS,
    JWT_SECRET_KEY,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME
} = process.env;