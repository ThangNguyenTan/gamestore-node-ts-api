import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

export interface TodoAttributes {
  id?: number;
  title: string;
  completed?: boolean;
}

export class TodoInstance extends Model<TodoAttributes> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Todos',
    timestamps: true,
  }
);
