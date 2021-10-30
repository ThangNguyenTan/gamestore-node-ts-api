import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface WishlistAttributes {
  id?: number;
  UserInstanceId: number;
  GameInstanceId: number;
}

export class WishlistInstance extends Model<WishlistAttributes> {}

WishlistInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    UserInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GameInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Wishlists',
    timestamps: true,
  }
);
