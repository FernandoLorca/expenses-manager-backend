import { Optional, Model } from 'sequelize';

export interface SignInRequestBodyType {
  email: string;
  password: string;
}

export interface SignUpRequestBodyType extends SignInRequestBodyType {
  repeatPassword: string;
}

// Model espenses types
interface ExpenseAttributes {
  id: number;
  description: string;
  amount: number;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> {}

export interface ExpenseInstance
  extends Model<ExpenseAttributes, ExpenseCreationAttributes>,
    ExpenseAttributes {}

// Model users types
interface UsersAttributes {
  id: number;
  name?: string;
  email: string;
  password: string;
  admin: boolean;
}

interface UserCreationAttributes extends Optional<UsersAttributes, 'id'> {}

export interface UsersInstance
  extends Model<UsersAttributes, UserCreationAttributes>,
    UsersAttributes {}

// Model expenses categories types
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

// Model icons categories types
interface IconsCategoryAtttributes {
  id: number;
  name: string;
  icon_path: string;
}

interface IconsCategoriesCreationAttributes
  extends Optional<IconsCategoryAtttributes, 'id'> {}

export interface IconsCategoriesInstance
  extends Model<IconsCategoryAtttributes, IconsCategoriesCreationAttributes>,
    IconsCategoryAtttributes {}
