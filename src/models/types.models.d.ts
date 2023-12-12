import { Optional, Model } from 'sequelize';

interface ExpenseAttributes {
  id: number;
  description: string;
  amount: number;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> {}

export interface ExpenseInstance
  extends Model<ExpenseAttributes, ExpenseCreationAttributes>,
    ExpenseAttributes {}

interface UsersAttributes {
  id: number;
  name?: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UsersAttributes, 'id'> {}

export interface UsersInstance
  extends Model<UsersAttributes, UserCreationAttributes>,
    UsersAttributes {}

interface ExpensesCategoriesAttributes {
  id: number;
  name: string;
  icon_identifier: string;
}

interface ExpensesCategoriesCreationAttributes
  extends Optional<ExpensesCategoriesAttributes, 'id'> {}

export interface ExpensesCategoriesInstance
  extends Model<
      ExpensesCategoriesAttributes,
      ExpensesCategoriesCreationAttributes
    >,
    ExpensesCategoriesAttributes {}
