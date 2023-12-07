import { DataTypes } from 'sequelize';
import { sequelize } from './connection';

export const Users = sequelize.define('users', {
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

export const Expenses = sequelize.define('expenses', {
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

export const ExpensesCategories = sequelize.define(
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

// ERROR: column "category_id" of relation "expenses_categories" does not exist
// No sé porque no me esta creando la columna category_id en la tabla expenses_categories.
ExpensesCategories.hasMany(Expenses, {
  foreignKey: {
    name: 'category_id',
  },
  sourceKey: 'id',
});

Expenses.belongsTo(ExpensesCategories, {
  foreignKey: {
    name: 'category_id',
  },
  targetKey: 'id',
});
