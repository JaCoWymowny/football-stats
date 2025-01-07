import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import apiRouter from './routes/api';
import runScheduledTasks from './config/cron.config';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use('/', apiRouter);

app.get('/check', async (req, res) => {
  try {
    await prisma.$connect();
    res.status(200).send('Połączenie z bazą danych działa poprawnie.');
  } catch (error) {
    console.error('Błąd połączenia z bazą danych', error);
    res.status(500).send('Błąd połączenia z bazą danych');
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // runScheduledTasks();
});
