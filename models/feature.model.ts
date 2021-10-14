import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface FeatureAttributes {
  id?: number;
  featureName: string;
}

export class FeatureInstance extends Model<FeatureAttributes> {}

FeatureInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    featureName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Features',
    timestamps: true,
  }
);
