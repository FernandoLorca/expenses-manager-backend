import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';

const app: Express = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
