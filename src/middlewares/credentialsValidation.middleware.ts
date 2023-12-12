import { Request, Response, NextFunction } from 'express';
import { Users } from '../models/users.models';

interface RequestBodyType {
  email: string;
  password: string;
}

const emailAndPasswordValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: RequestBodyType = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Email and password are required.',
    });
  }

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (user === null) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: error.message,
      });
    }
  }
};

const registerInputsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: RequestBodyType = req.body;

  if (!email || !password) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Email and password are required',
    });
  }

  const emailFormatValidation = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  if (!emailFormatValidation(email)) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });
  }

  if (password.length < 6 || password.length >= 24) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Password must be between 6 and 24 characters',
    });
  }

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: 'Email is already in use',
      });
    }

    next();
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

export const credentialsValidation = {
  emailAndPasswordValidation,
  registerInputsValidation,
};
