import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import type { ExpenseInstance } from './types.models';

export const Expenses = sequelize.define<ExpenseInstance>('expenses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
