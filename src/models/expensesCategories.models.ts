import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import type { ExpensesCategoriesInstance } from '../types';
import { IconsCategories } from './iconsCategory.models';

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

IconsCategories.hasOne(ExpensesCategories, {
  foreignKey: {
    name: 'icon_id',
    allowNull: false,
  },
  sourceKey: 'id',
});

ExpensesCategories.belongsTo(IconsCategories, {
  foreignKey: {
    name: 'icon_id',
    allowNull: false,
  },
  targetKey: 'id',
});
