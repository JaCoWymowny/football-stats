import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { prisma } from './db/prisma';
import apiRouter from './routes/api';
import runScheduledTasks from './config/cron.config';

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);
app.use('/', apiRouter);

app.get('/healthz', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.set('Cache-Control', 'no-store');
    res.status(200).json({ status: 'Połączenie z bazą danych działa poprawnie.' });
  } catch (error) {
    console.error('Błąd połączenia z bazą danych', error);
    res.status(500).json({ status: 'Błąd połączenia z bazą danych' });
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  runScheduledTasks();
});
