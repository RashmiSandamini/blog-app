import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'reader',
    },
  },
  {
    timestamps: false,
  }
);

export default User;
