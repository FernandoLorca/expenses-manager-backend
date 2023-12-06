import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app: Express = express();

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World');
});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
console.log('app.ts');

export default app;
