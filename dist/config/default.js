"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const rootPath = process.cwd();
const createEnvAccessPoint = () => {
    const environment = process.env.NODE_ENV ? process.env.NODE_ENV.replace(/\W/g, '') : 'production';
    if (environment === 'production') {
        return '.env';
    }
    return `.env.${environment}`;
};
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', `${createEnvAccessPoint()}`) });
module.exports = {
    port: process.env.PORT || '5000',
    node_env: process.env.NODE_ENV.replace(/\W/g, '') || 'production',
    allow_logging: process.env.NODE_ENV &&
        (process.env.NODE_ENV.replace(/\W/g, '') === 'test' ||
            process.env.NODE_ENV.replace(/\W/g, '') === 'production')
        ? false
        : true,
    jwt_secret: process.env.JWT_SECRET || 'secret',
    jwt_expired_date: process.env.JWT_EXPIRED_DATE || '30d',
    root_path: rootPath,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    database_test: {
        storage: process.env.DB_STORAGE,
        dialect: process.env.DB_CONNECTION,
    },
    database_url: process.env.DATABASE_URL,
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
};
