import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function httpPlaceBet(req: Request, res: Response): Promise<void> {
  try {
    console.log('Request Body:', req.body);

    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'Użytkownik nie jest uwierzytelniony.' });
      return;
    } else {
      const test = user.id;
      console.log('Test:', test);
    }

    const { matchId, predictedScore } = req.body;

    if (!matchId || !predictedScore) {
      res.status(400).json({ message: 'Missing required fields: matchId or predictedScore.' });
      return;
    }

    const newBet = await prisma.bet.create({
      data: {
        betById: user.id,
        matchId: matchId,
        predictedScore: predictedScore,
      },
    });

    console.log('New Bet Created:', newBet);

    res.status(201).json({
      message: 'Zakład został dodany pomyślnie.',
      bet: newBet,
    });
  } catch (error) {
    console.error('Error in httpPlaceBet:', error);
    res.status(500).json({
      message: 'Wystąpił błąd podczas dodawania zakładu.',
    });
  }
}

export async function httpGetUserBets(req: Request, res: Response): Promise<void> {
  //w planach todo
}
