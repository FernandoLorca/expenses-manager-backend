import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Users } from '../models/users.models';
import type { RequestBodyType, UsersInstance } from '../types';

interface NewUser {
  dataValues: {
    id: number;
    name?: string;
    email: string;
  };
}

interface CustomRequest extends Request {
  user?: {
    user: UsersInstance;
  };
}

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: RequestBodyType = req.body;

  try {
    const hashPassword: string = await bcrypt.hash(password, 10);
    const newUser: NewUser = await Users.create({
      email,
      password: hashPassword,
    });
    const generateToken: string = jwt.sign(
      {
        id: newUser.dataValues.id,
        email: newUser.dataValues.email,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: '24h',
      }
    );

    res.status(201).json({
      ok: true,
      status: 201,
      user: {
        id: newUser.dataValues.id,
        name: newUser.dataValues.name,
        email: newUser.dataValues.email,
        token: generateToken,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: error.message,
      });
    }
  }
};

const getUser = async (req: CustomRequest, res: Response): Promise<void> => {
  const user = req.user?.user;

  const generateToken: string = jwt.sign(
    {
      id: user?.id,
      email: user?.email,
    },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: '24h',
    }
  );

  res.status(200).json({
    ok: true,
    status: 200,
    message: 'User found',
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      token: generateToken,
    },
  });
};

export const usersController = {
  createUser,
  getUser,
};
