import { Router } from 'express';
import { credentialsValidation } from '../middlewares/credentialsValidation.middleware';
import { usersController } from '../controller/users.controller';

const usersRouter = Router();

usersRouter.post(
  '/sign-in',
  credentialsValidation.signInInputsFormatValidation,
  credentialsValidation.signInVerificationUserByEmail,
  credentialsValidation.passwordHashVerification,
  usersController.getUser
);
usersRouter.post(
  '/sign-up',
  credentialsValidation.signUpInputsFormatValidation,
  credentialsValidation.signUpVerigicationUserByEmail,
  usersController.createUser
);

export default usersRouter;
