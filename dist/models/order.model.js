"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class OrderInstance extends sequelize_1.Model {
}
exports.OrderInstance = OrderInstance;
OrderInstance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    paymentId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    UserInstanceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    GameInstanceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'Orders',
    timestamps: true,
});
