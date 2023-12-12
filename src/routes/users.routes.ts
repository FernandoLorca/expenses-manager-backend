import { Router } from 'express';
import { credentialsValidation } from '../middlewares/credentialsValidation.middleware';
import { usersController } from '../controller/users.controller';

const usersRouter = Router();

usersRouter.post('/login', credentialsValidation.emailAndPasswordValidation);
usersRouter.post(
  '/register',
  credentialsValidation.registerInputsValidation,
  usersController.createUser
);

export default usersRouter;
