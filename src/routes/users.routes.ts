import { Router } from 'express';
import { credentialsValidation } from '../middlewares/credentialsValidation.middleware';
import { usersController } from '../controller/users.controller';

const usersRouter = Router();

usersRouter.post(
  '/login',
  credentialsValidation.emailAndPasswordFormatValidation,
  credentialsValidation.verificationUserByEmail,
  credentialsValidation.passwordVerification,
  usersController.getUser
);
usersRouter.post(
  '/register',
  credentialsValidation.emailAndPasswordFormatValidation,
  credentialsValidation.verificationUserByEmail,
  usersController.createUser
);

export default usersRouter;
