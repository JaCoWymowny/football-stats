import React from 'react';
import { useMatchesQuery } from '@/features/hooks/useMatchesQuery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface Match {
  id: number;
  utcDate: string;
  homeTeam: {
    name: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  competition: {
    name: string;
  };
}

const MatchesPage = () => {
  const { data: matches, isPending, error } = useMatchesQuery();

  if (isPending) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div>Failed to load matches data.</div>;
  }

  const renderMatches = () => {
    if (!matches || !matches.matches) {
      return <div>No match data available</div>;
    }

    return matches.matches.map((match: Match) => {
      const {
        utcDate,
        homeTeam,
        awayTeam,
        score: { fullTime },
        competition,
      } = match;

      const matchTime = new Date(utcDate).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        <div key={match.id} className='mb-4 p-4 border-b border-gray-300'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <img src={homeTeam.crest} alt={`${homeTeam.name} crest`} className='w-8 h-8 mr-2' />
              <span className='font-bold text-gray-800'>{homeTeam.name}</span>
            </div>
            <div className='text-gray-600'>{matchTime}</div>
            <div className='flex items-center'>
              <span className='font-bold text-gray-800'>{awayTeam.name}</span>
              <img src={awayTeam.crest} alt={`${awayTeam.name} crest`} className='w-8 h-8 ml-2' />
            </div>
          </div>
          <div className='flex justify-center items-center mt-2'>
            <span className='text-lg font-semibold text-gray-700'>
              {fullTime.home !== null && fullTime.away !== null
                ? `${fullTime.home} - ${fullTime.away}`
                : 'Wynik: TBD'}
            </span>
          </div>
          <div className='text-sm text-gray-500 text-center'>{competition.name}</div>
        </div>
      );
    });
  };

  return (
    <div className='w-full max-w-screen-lg mx-auto flex justify-center'>
      <Card className='shadow-md rounded-2xl w-full overflow-hidden'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-gray-800 text-center'>
            Dane Meczów
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <div className='rounded-md p-4 max-h-[500px] overflow-auto'>{renderMatches()}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchesPage;
