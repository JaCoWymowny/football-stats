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

    if (!/^\d+-\d+$/.test(predictedScore)) {
      res.status(400).json({
        message: 'Przewidywany wynik musi zawierać same cyfry np. 2-1',
        fields: { predictedScore: 'Niepoprawny format wyniku.' },
      });
      return;
    }

    const [homeScore, awayScore] = predictedScore.split('-').map(Number);

    if (homeScore > 999 || awayScore > 999) {
      res.status(400).json({
        message: 'Wynik nie może przekraczać 999 dla żadnej drużyny.',
        fields: { predictedScore: 'Nieprawidłowy wynik.' },
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
        matchStartTime: new Date(matchData.utcDate),
        homeTeam: matchData.homeTeam.name,
        awayTeam: matchData.awayTeam.name,
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

export const calculateTotalPoints = async () => {
  try {
    console.log('Calculating total points for all users...');

    const users = await prisma.user.findMany({
      include: {
        bets: {
          where: { finalScore: { not: null } },
          select: { pointsEarned: true },
        },
      },
    });

    for (const user of users) {
      const totalPoints = user.bets.reduce((sum, bet) => sum + (bet.pointsEarned || 0), 0);

      await prisma.ranking.upsert({
        where: { userId: user.id },
        update: { totalPoints },
        create: {
          userId: user.id,
          totalPoints,
        },
      });
    }

    console.log('Total points calculated and rankings updated.');
  } catch (error) {
    console.error('Error while calculating total points:', error);
  }
};

export const updateBetResults = async () => {
  try {
    console.log('Rozpoczęcie aktualizacji wyników zakładów...');

    const bets = await prisma.bet.findMany({
      where: {
        finalScore: null,
        matchStartTime: {
          lte: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
      },
      include: { betBy: true },
    });

    if (!bets.length) {
      console.log('Brak zakładów do aktualizacji');
      return;
    }

    const dateFrom = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const dateTo = new Date().toISOString().split('T')[0];
    const response = await apiClient.get<API.MatchResponse>(`/matches`, {
      params: {
        dateFrom,
        dateTo,
      },
    });

    const matches = response.data.matches;
    console.log(`Liczba meczów pobranych z API: ${matches.length}`);

    if (!matches || !matches.length) {
      console.log('Brak meczów do analizy.');
      return;
    }

    const matchResults = matches
      .filter(match => match.status === 'FINISHED')
      .reduce(
        (acc, match) => {
          const { id, score } = match;
          acc[id] = `${score.fullTime.home}-${score.fullTime.away}`;
          return acc;
        },
        {} as { [key: number]: string }
      );

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

    const results = await Promise.all(updates.filter(Boolean));

    console.log(`Zaktualizowano ${results.length} zakładów`);
    await calculateTotalPoints();
  } catch (error) {
    console.error('Błąd podczas aktualizacji wyników zakładów:', error);
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

export const getBetRanking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [rankings, totalCount] = await Promise.all([
      prisma.ranking.findMany({
        skip,
        take,
        orderBy: {
          totalPoints: 'desc',
        },
        include: {
          user: {
            select: { username: true },
          },
        },
      }),
      prisma.ranking.count(),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({
      data: rankings,
      meta: {
        totalCount,
        totalPages,
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching rankings:', error);
    res.status(500).json({ message: 'Failed to fetch rankings.' });
  }
};
