import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';

const app: Express = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
