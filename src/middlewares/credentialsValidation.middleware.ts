import { Request, Response, NextFunction } from 'express';
import { Users } from '../models/users.models';
import { inputsFormatValidation } from '../utilities/inputsFormatValidation';
import bcrypt from 'bcryptjs';
import type {
  SignInRequestBodyType,
  SignUpRequestBodyType,
  UsersInstance,
} from '../types';

interface CustomRequest extends Request {
  user?: {
    user: UsersInstance;
  };
}

const signInInputsFormatValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password }: SignInRequestBodyType = req.body;

  if (!email || !password) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Email and password are required',
    });
    return;
  }

  if (!inputsFormatValidation.emailFormatValidation(email)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });
    return;
  }

  if (!inputsFormatValidation.passwordFormatValidation(password)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Password must be between 6 and 24 characters',
    });
    return;
  }

  next();
};

const signUpInputsFormatValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password, repeatPassword }: SignUpRequestBodyType = req.body;

  if (!email || !password || !repeatPassword) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Email and passwords are required',
    });
    return;
  }

  if (!inputsFormatValidation.emailFormatValidation(email)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid Email',
    });
    return;
  }

  if (!inputsFormatValidation.passwordFormatValidation(password)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Password must be between 6 and 24 characters',
    });
    return;
  }

  if (password !== repeatPassword) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "Passwords don't match",
    });
    return;
  }

  next();
};

const signInVerificationUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email }: { email: string } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

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

const signUpVerigicationUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email }: { email: string } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (user !== null) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: 'That email is already in use',
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

const passwordHashVerification = async (
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
  signInInputsFormatValidation,
  signUpInputsFormatValidation,
  signInVerificationUserByEmail,
  signUpVerigicationUserByEmail,
  passwordHashVerification,
};
