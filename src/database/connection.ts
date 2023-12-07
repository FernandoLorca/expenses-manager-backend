import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.PG_DATABASE ?? 'expensesdb',
  process.env.PG_USER ?? 'postgres',
  process.env.PG_PASSWORD ?? 'root',
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
  }
);
