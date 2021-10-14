import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface GenreAttributes {
  id?: number;
  genreName: string;
}

export class GenreInstance extends Model<GenreAttributes> {}

GenreInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    genreName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Genres',
    timestamps: true,
  }
);
