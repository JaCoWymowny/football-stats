import React, { useState } from 'react';
import { useMatchesQuery } from '@/features/hooks/useMatchesQuery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import GlobalLoader from '@/components/ui/GLobalLoader';
import ErrorAlert from '@/components/ui/ErrorAlert';
import MatchItem from '@/features/matches/components/matchesItem/MatchesItem';
import { groupMatchesByLeague } from '../helpers/groupMatchesByLeague';
import { BetDialog } from '@/features/bets/components/dialogs/BetDialog';
import { useModalStore } from '@/store/useModalStore';

const MatchesPage = () => {
  const { data, isPending, isError, error } = useMatchesQuery();
  const [selectedMatch, setSelectedMatch] = useState<{
    matchId: number;
    homeTeam: string;
    awayTeam: string;
  }>({ matchId: 0, homeTeam: '', awayTeam: '' });
  const { openModal } = useModalStore();

  const errorMessage = error?.response?.data?.message;

  if (isPending) {
    return <GlobalLoader />;
  }

  const handleOpenBetDialog = (matchId: number, homeTeam: string, awayTeam: string) => {
    setSelectedMatch({ matchId, homeTeam, awayTeam });
    openModal();
  };

  return (
    <div className='w-full max-w-screen-lg mx-auto flex justify-center'>
      <Card className='shadow-md rounded-2xl w-full overflow-hidden'>
        <CardHeader className='bg-gray-100'>
          <CardTitle className='text-3xl font-bold text-gray-800 text-center'>
            Dane Meczów
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          {isError || !data?.matches?.length ? (
            <ErrorAlert
              title={isError ? 'Błąd' : 'Brak danych'}
              description={errorMessage || 'Nie znaleziono danych meczów.'}
            />
          ) : (
            <div className='rounded-md p-4 max-h-[500px] overflow-auto'>
              {Object.entries(groupMatchesByLeague(data.matches)).map(([league, matches]) => (
                <div key={league} className='mb-6 text-center'>
                  <div className='space-y-4'>
                    {matches.map(match => (
                      <MatchItem key={match.id} match={match} onBetClick={handleOpenBetDialog} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <BetDialog
        matchId={selectedMatch.matchId}
        homeTeam={selectedMatch.homeTeam}
        awayTeam={selectedMatch.awayTeam}
      />
    </div>
  );
};

export default MatchesPage;
