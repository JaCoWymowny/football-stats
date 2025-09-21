import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import apiClient from '../config/axios.config';
import { fetchMatches, getMatchesDateRange } from '../services/matches';

export async function httpPlaceBet(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'The user is not authenticated.' });
      return;
    }

    const { matchId, predictedScore } = req.body;

    if (!matchId || !predictedScore) {
      res.status(400).json({
        message: 'All fields are required.',
        fields: {
          ...(matchId ? {} : { matchId: 'Match ID is required.' }),
          ...(predictedScore ? {} : { predictedScore: 'A predicted score is required.' }),
        },
      });
      return;
    }

    if (!/^\d+-\d+$/.test(predictedScore)) {
      res.status(400).json({
        message: 'The predicted result must contain only numbers, e.g. 2-1',
        fields: { predictedScore: 'Incorrect result format.' },
      });
      return;
    }

    const [homeScore, awayScore] = predictedScore.split('-').map(Number);

    if (homeScore > 999 || awayScore > 999) {
      res.status(400).json({
        message: 'The score cannot exceed 999 for any team..',
        fields: { predictedScore: 'Incorrect result.' },
      });
      return;
    }

    const existingBet = await prisma.bet.findFirst({
      where: { betById: (user as { id: number }).id, matchId },
    });

    if (existingBet) {
      res.status(400).json({
        message: 'A bet on this match has already been placed.',
        fields: { matchId: 'You cannot bet on the same match more than once.' },
      });
      return;
    }

    const matches = await fetchMatches(getMatchesDateRange());
    const matchData = matches.find(m => m.id === matchId);

    if (!matchData || !matchData.utcDate) {
      res.status(404).json({
        message: 'No match found with the given ID.',
        fields: { matchId: 'Invalid match ID.' },
      });
      return;
    }

    const matchStartTime = new Date(matchData.utcDate).getTime();
    const now = Date.now();
    const marginTime = 5 * 60 * 1000;

    if (now >= matchStartTime - marginTime) {
      res.status(400).json({
        message:
          'You cannot place a bet on a match that has already started or is about to start..',
        fields: {
          matchId: 'Bets are only possible up to 5 minutes before the start of the match..',
        },
      });
      return;
    }

    const newBet = await prisma.bet.create({
      data: {
        betById: (user as { id: number }).id,
        matchId,
        predictedScore,
        matchStartTime: new Date(matchData.utcDate),
        homeTeam: matchData.homeTeam.name,
        awayTeam: matchData.awayTeam.name,
      },
    });

    res.status(201).json({
      message: 'The bet was added successfully.',
      bet: newBet,
    });
  } catch (error) {
    console.error('Błąd w httpPlaceBet:', error);
    res.status(500).json({
      message: 'A server error occurred. Please try again later..',
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
      const totalPoints = user.bets.reduce(
        (sum: number, bet: { pointsEarned: number | null }) => sum + (bet.pointsEarned ?? 0),
        0
      );

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
    console.log('Betting results update starts...');

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
      console.log('No bets to update');
      return;
    }

    const dateFrom = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const dateTo = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const response = await apiClient.get<API.MatchResponse>(`/matches`, {
      params: {
        dateFrom,
        dateTo,
      },
    });

    const matches = response.data.matches;
    console.log(`Number of matches downloaded from API: ${matches.length}`);

    if (!matches || !matches.length) {
      console.log('No matches to analyze.');
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

    const updates = bets.map((bet: (typeof bets)[number]) => {
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

    console.log(`Updated ${results.length} bets`);
    await calculateTotalPoints();
  } catch (error) {
    console.error('Error updating betting results:', error);
  }
};

export async function httpGetUserBets(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user;
    const userId = parseInt(req.params.id);

    if (!user || isNaN(userId)) {
      res.status(400).json({ message: 'Invalid request.' });
      return;
    }

    if ((user as { id: number }).id !== userId) {
      res.status(403).json({ message: 'No access to this data.' });
      return;
    }

    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [bets, totalCount] = await Promise.all([
      prisma.bet.findMany({
        where: { betById: userId },
        skip,
        take,
        orderBy: { matchStartTime: 'desc' },
      }),
      prisma.bet.count({ where: { betById: userId } }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({
      data: bets,
      meta: {
        totalCount,
        totalPages,
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error('Error while downloading user bets:', error);
    res.status(500).json({ message: 'A server error occurred.' });
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
