import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import apiClient from '../config/axios.config';

const prisma = new PrismaClient();

export async function httpPlaceBet(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'Użytkownik nie jest uwierzytelniony.' });
      return;
    }

    const { matchId, predictedScore } = req.body;

    if (!matchId || !predictedScore) {
      res.status(400).json({
        message: 'Wszystkie pola są wymagane.',
        fields: {
          ...(matchId ? {} : { matchId: 'ID meczu jest wymagane.' }),
          ...(predictedScore ? {} : { predictedScore: 'Przewidywany wynik jest wymagany.' }),
        },
      });
      return;
    }

    const existingBet = await prisma.bet.findFirst({
      where: { betById: user.id, matchId },
    });

    if (existingBet) {
      res.status(400).json({
        message: 'Zakład na ten mecz został już obstawiony.',
        fields: { matchId: 'Nie możesz obstawić tego samego meczu więcej niż raz.' },
      });
      return;
    }

    const matchResponse = await apiClient.get(`/matches/${matchId}`);
    const matchData = matchResponse.data;

    if (!matchData || !matchData.utcDate) {
      res.status(404).json({
        message: 'Nie znaleziono meczu o podanym ID.',
        fields: { matchId: 'Nieprawidłowe ID meczu.' },
      });
      return;
    }

    // const matchStartTime = new Date(matchData.utcDate).getTime();
    // const now = Date.now();
    // const marginTime = 5 * 60 * 1000;
    //
    // if (now >= matchStartTime - marginTime) {
    //   res.status(400).json({
    //     message: 'Nie można obstawić zakładu na mecz, który już się rozpoczął lub rozpocznie się za chwilę.',
    //     fields: { matchId: 'Zakłady są możliwe tylko do 5 minut przed rozpoczęciem meczu.' },
    //   });
    //   return;
    // }

    const newBet = await prisma.bet.create({
      data: {
        betById: user.id,
        matchId,
        predictedScore,
      },
    });

    res.status(201).json({
      message: 'Zakład został dodany pomyślnie.',
      bet: newBet,
    });
  } catch (error) {
    console.error('Błąd w httpPlaceBet:', error);
    res.status(500).json({
      message: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
    });
  }
}

export const updateBetResults = async () => {
  try {
    console.log('Rozpoczęcie aktualizacji wyników zakładów...');

    const bets = await prisma.bet.findMany({
      where: { finalScore: null },
      include: { betBy: true },
    });

    if (!bets.length) {
      console.log('Brak zakładów do aktualizacji.');
      return;
    }

    const matchIds = [...new Set(bets.map(bet => bet.matchId))];
    const matchResults: { [key: number]: string } = {};

    for (const matchId of matchIds) {
      try {
        const response = await apiClient.get(`/matches/${matchId}`);
        const { home, away } = response.data.score.fullTime;
        matchResults[matchId] = `${home}-${away}`;
      } catch (err) {
        console.error(`Błąd dla meczu ID ${matchId}:`);
      }
    }

    const updates = bets.map(bet => {
      const actualScore = matchResults[bet.matchId];
      if (!actualScore) {
        return null;
      }

      const points = bet.predictedScore === actualScore ? 10 : 0;

      return prisma.bet.update({
        where: { id: bet.id },
        data: {
          finalScore: actualScore,
          pointsEarned: points,
        },
      });
    });

    await Promise.all(updates.filter(Boolean));

    console.log('Wyniki zakładów zostały zaktualizowane.');
  } catch (error) {
    console.error('Błąd podczas aktualizacji wyników zakładów:');
  }
};

export async function httpGetUserBets(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Nieprawidłowe ID użytkownika.' });
      return;
    }

    const bets = await prisma.bet.findMany({
      where: { betById: userId },
    });

    res.status(200).json(bets);
  } catch (error) {
    console.error('Błąd podczas pobierania zakładów użytkownika:');
    res.status(500).json({ message: 'Wystąpił błąd serwera.' });
  }
}
