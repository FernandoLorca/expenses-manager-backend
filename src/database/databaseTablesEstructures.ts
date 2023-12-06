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
  desciption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export const ExpensesCategories = sequelize.define('expensesCategories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Expenses, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  sourceKey: 'id',
});

Expenses.belongsTo(Users, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  targetKey: 'id',
});

Users.hasMany(ExpensesCategories, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  sourceKey: 'id',
});

ExpensesCategories.belongsTo(Users, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  targetKey: 'id',
});

ExpensesCategories.hasMany(Expenses, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
  sourceKey: 'id',
});

Expenses.belongsTo(ExpensesCategories, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
  targetKey: 'id',
});
