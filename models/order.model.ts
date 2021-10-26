import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface OrderAttributes {
  id?: number;
  UserInstanceId: number;
  GameInstanceId: number;
  total: number;
  paymentId: string;
}

export class OrderInstance extends Model<OrderAttributes> {}

OrderInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GameInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Orders',
    timestamps: true,
  }
);
