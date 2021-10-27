"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class GameInstance extends sequelize_1.Model {
}
exports.GameInstance = GameInstance;
GameInstance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    gameName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    gamePrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    gamePoster: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    gameTrailer: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    gameDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    releaseDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    PublisherInstanceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    GenreInstanceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    FeatureInstanceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    DeveloperInstanceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'Games',
    timestamps: true,
});
