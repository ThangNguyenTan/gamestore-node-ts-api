import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Users',
    timestamps: true,
  }
);
