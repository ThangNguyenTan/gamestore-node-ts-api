import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface DeveloperAttributes {
  id?: number;
  developerName: string;
}

export class DeveloperInstance extends Model<DeveloperAttributes> {}

DeveloperInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    developerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Developers',
    timestamps: true,
  }
);
