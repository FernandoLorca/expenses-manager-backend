import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import type { IconsCategoriesInstance } from '../types';

export const IconsCategories = sequelize.define<IconsCategoriesInstance>(
  'icons_category',
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
    icon_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);
