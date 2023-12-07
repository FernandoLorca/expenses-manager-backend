import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { Expenses } from './expenses.models';
import { ExpensesCategories } from './expensesCategories.models';
import type { UsersInstance } from './types.models';

export const Users = sequelize.define<UsersInstance>('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Expenses, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  sourceKey: 'id',
});

Expenses.belongsTo(Users, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  targetKey: 'id',
});

Users.hasMany(ExpensesCategories, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  sourceKey: 'id',
});

ExpensesCategories.belongsTo(Users, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  targetKey: 'id',
});
