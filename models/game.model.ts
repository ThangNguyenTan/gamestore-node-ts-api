import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface GameAttributes {
  id?: number;
  gameName: string;
  gamePoster: string;
  gameTrailer: string;
  gameDescription: string;
  releaseDate: string;
  publisherId: number;
  developerId: number;
  featureId: number;
  genreId: number;
}

export class GameInstance extends Model<GameAttributes> {}

GameInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    gameName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gamePoster: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gameTrailer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gameDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    publisherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    developerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    featureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Games',
    timestamps: true,
  }
);
