import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface PublisherAttributes {
  id?: number;
  publisherName: string;
}

export class PublisherInstance extends Model<PublisherAttributes> {}

PublisherInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    publisherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Publishers',
    timestamps: true,
  }
);
