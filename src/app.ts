import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
const app: Express = express();

import cors from 'cors';
import morgan from 'morgan';

import usersRouter from './routes/users.routes';

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.get('/', (_: Request, res: Response) => {
  res.send('Hello World');
});
app.use(`${process.env.API_VERSION}/users`, usersRouter);

export default app;
