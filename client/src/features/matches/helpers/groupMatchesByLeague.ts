import { Match } from '@/types/types';

export const groupMatchesByLeague = (matches: Match[]) => {
  return matches.reduce(
    (acc, match) => {
      const league = match.competition.name;
      if (!acc[league]) {
        acc[league] = [];
      }
      acc[league].push(match);
      return acc;
    },
    {} as Record<string, Match[]>
  );
};
