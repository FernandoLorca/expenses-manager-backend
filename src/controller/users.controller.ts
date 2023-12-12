import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Users } from '../models/users.models';

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      email,
      password: hashPassword,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      user: {
        id: newUser.dataValues.id,
        name: newUser.dataValues.name,
        email: newUser.dataValues.email,
        token: jwt.sign(
          {
            id: newUser.dataValues.id,
            email: newUser.dataValues.email,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: '24h',
          }
        ),
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

export const usersController = {
  createUser,
};
