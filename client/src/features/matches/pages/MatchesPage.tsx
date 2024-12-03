import React from 'react';
import { useMatchesQuery } from '@/features/hooks/useMatchesQuery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import GlobalLoader from '@/components/ui/GLobalLoader';
import ErrorAlert from '@/components/ui/ErrorAlert';
import MatchesList from '../components/MatchesList/MatchesList';

const MatchesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useMatchesQuery();

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className='w-full max-w-screen-lg mx-auto flex justify-center'>
      <Card className='shadow-md rounded-2xl w-full overflow-hidden'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-gray-800 text-center'>
            Dane Meczów
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          {isError || !data?.matches?.length ? (
            <ErrorAlert
              title={isError ? 'Błąd' : 'Brak danych'}
              description={
                isError
                  ? error?.response?.status === 429
                    ? 'Limit zapytań został przekroczony. Spróbuj ponownie za chwilę.'
                    : 'Wystąpił problem podczas pobierania danych.'
                  : 'Nie znaleziono danych meczów.'
              }
            />
          ) : (
            <MatchesList matches={data.matches} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchesPage;
