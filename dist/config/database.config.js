"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("config"));
let db = new sequelize_1.Sequelize(config_1.default.get('database_test'));
if (config_1.default.get('node_env') != 'test') {
    if (config_1.default.get('database_url')) {
        db = new sequelize_1.Sequelize(config_1.default.get('database_url'), {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });
    }
    else {
        db = new sequelize_1.Sequelize(config_1.default.get('database'), config_1.default.get('username'), config_1.default.get('password'), {
            host: config_1.default.get('host'),
            dialect: config_1.default.get('dialect'),
            port: 5432,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });
    }
}
exports.default = db;
