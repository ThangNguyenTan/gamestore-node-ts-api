import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface GameAttributes {
  id?: number;
  gameName: string;
  gamePoster: string;
  gameTrailer: string;
  gameDescription: string;
  releaseDate: string;
  PublisherInstanceId: number;
  GenreInstanceId: number;
  FeatureInstanceId: number;
  DeveloperInstanceId: number;
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
    PublisherInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GenreInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FeatureInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DeveloperInstanceId: {
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
