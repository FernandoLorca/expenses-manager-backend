import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { Expenses } from './expenses.models';
import type { ExpensesCategoriesInstance } from './types.models';

export const ExpensesCategories = sequelize.define<ExpensesCategoriesInstance>(
  'expenses_categories',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon_identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'expenses_categories',
  }
);

ExpensesCategories.hasMany(Expenses, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
  },
  sourceKey: 'id',
});

Expenses.belongsTo(ExpensesCategories, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
  },
  targetKey: 'id',
});
