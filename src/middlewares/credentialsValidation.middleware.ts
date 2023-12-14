import { Request, Response, NextFunction } from 'express';
import { Users } from '../models/users.models';
import bcrypt from 'bcryptjs';
import type { RequestBodyType, UsersInstance } from '../types';

interface CustomRequest extends Request {
  user?: {
    user: UsersInstance;
  };
}

const userIsRegistering = (registerParam: string | undefined): boolean =>
  registerParam ? true : false;

const emailAndPasswordFormatValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, repeatPassword }: RequestBodyType = req.body;

  if (userIsRegistering(repeatPassword)) {
    if (!email || !password || !repeatPassword) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Email and password are required',
      });
      return;
    }
  } else {
    if (!email || !password) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Email and password are required',
      });
    }
  }

  const emailFormatValidation = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  if (!emailFormatValidation(email)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });
    return;
  }

  if (password.length < 6 || password.length >= 24) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Password must be between 6 and 24 characters',
    });
    return;
  }

  if (repeatPassword && password !== repeatPassword) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "Password don't match",
    });
    return;
  }

  next();
};

const verificationUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, repeatPassword }: { email: string; repeatPassword: string } =
    req.body;

  if (!email) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Email is required',
    });
    return;
  }

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!userIsRegistering(repeatPassword)) {
      if (user === null) {
        res.status(404).json({
          ok: false,
          status: 404,
          message: 'User not found.',
        });
        return;
      }

      (req as CustomRequest).user = {
        user,
      };

      next();
    } else {
      if (user) {
        res.status(409).json({
          ok: false,
          status: 409,
          message: 'Email already in use',
        });
        return;
      }

      next();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: error.message,
      });
      return;
    }
  }
};

const passwordVerification = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { password }: { password: string } = req.body;
  const passwordFromDatabase = req.user?.user?.dataValues.password;

  try {
    const passwordChecker = await bcrypt.compare(
      password,
      passwordFromDatabase!
    );

    if (!passwordChecker) {
      res.status(401).json({
        ok: false,
        status: 401,
        message: 'Unauthorized',
      });
      return;
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
  emailAndPasswordFormatValidation,
  verificationUserByEmail,
  passwordVerification,
};
