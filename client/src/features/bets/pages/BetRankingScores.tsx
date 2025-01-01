import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import GlobalLoader from '@/components/ui/GLobalLoader';
import { useRankingQuery } from '@/features/bets/services/mutations';
import ErrorAlert from '@/components/ui/ErrorAlert';

const BetRankingScores = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, isPending, isError, error } = useRankingQuery(currentPage, 10);

  const errorMessage = error?.response?.data?.message;
  const totalPages = data?.meta.totalPages || 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (isPending) {
    return <GlobalLoader />;
  }

  return (
    <div className='container mx-auto mt-10'>
      <Card className='shadow-md rounded-2xl w-full'>
        <CardHeader className='bg-gray-100'>
          <CardTitle className='text-2xl font-bold text-gray-800 text-center'>
            Ranking Zakładów
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isError || !data?.data?.length ? (
            <ErrorAlert
              title={isError ? 'Błąd' : 'Brak danych'}
              description={errorMessage || 'Brak rekordów do wyświetlenia.'}
            />
          ) : (
            <table className='table-auto w-full border-collapse'>
              <thead>
                <tr className='bg-gray-200 text-gray-700'>
                  <th className='py-2 px-4 text-left'>Pozycja</th>
                  <th className='py-2 px-4 text-left'>Użytkownik</th>
                  <th className='py-2 px-4 text-right'>Punkty</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((rank, index) => (
                  <tr key={rank.id} className='border-b'>
                    <td className='py-2 px-4'>{(currentPage - 1) * 10 + index + 1}</td>
                    <td className='py-2 px-4'>{rank.user.username}</td>
                    <td className='py-2 px-4 text-right'>{rank.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className='flex justify-between items-center mt-4'>
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='py-2 px-4 bg-gray-300 text-gray-700 hover:bg-gray-400'
            >
              Poprzednia
            </Button>
            <p className='text-gray-700'>
              Strona {currentPage} z {totalPages}
            </p>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='py-2 px-4 bg-gray-300 text-gray-700 hover:bg-gray-400'
            >
              Następna
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetRankingScores;
