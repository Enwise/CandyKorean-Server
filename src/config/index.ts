import {config} from 'dotenv';

config();

export const {NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, ORIGIN, CREDENTIALS, JWT_SECRET_KEY } = process.env;