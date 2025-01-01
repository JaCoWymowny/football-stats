import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import GlobalLoader from '@/components/ui/GLobalLoader';
import { useUserBetHistoryQuery } from '@/features/bets/services/mutations';
import { useUserContext } from '@/context/useUserContext';
import { useParams } from 'react-router-dom';
import ErrorAlert from '@/components/ui/ErrorAlert';

const UserBetHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = React.useState(1);
  const { currentUser, isPending: isCurrentUserPending } = useUserContext();
  const { data, isPending, isError, error } = useUserBetHistoryQuery(Number(id), currentPage, 10);

  const errorMessage = error?.response?.data?.message;
  const userId = Number(id) === currentUser?.id;
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

  if (isPending || isCurrentUserPending) {
    return <GlobalLoader />;
  }

  return (
    <div className='container mx-auto mt-10'>
      <Card className='shadow-md rounded-2xl w-full'>
        <CardHeader className='bg-gray-100'>
          <CardTitle className='text-2xl font-bold text-gray-800 text-center'>
            Moja Historia Zakładów
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isError || !data?.data?.length || !userId ? (
            <ErrorAlert
              title={isError ? 'Błąd' : 'Brak danych'}
              description={errorMessage || 'Brak rekordów do wyświetlenia.'}
            />
          ) : (
            <table className='table-auto w-full border-collapse'>
              <thead>
                <tr className='bg-gray-200 text-gray-700'>
                  <th className='py-2 px-4 text-left'>Mecz</th>
                  <th className='py-2 px-4 text-left'>Obstawiony Wynik</th>
                  <th className='py-2 px-4 text-left'>Faktyczny Wynik</th>
                  <th className='py-2 px-4 text-right'>Punkty</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map(bet => (
                  <tr key={bet.id} className='border-b'>
                    <td className='py-2 px-4'>
                      {bet.homeTeam} vs {bet.awayTeam}
                    </td>
                    <td className='py-2 px-4'>{bet.predictedScore}</td>
                    <td className='py-2 px-4'>{bet.finalScore || 'Oczekuje'}</td>
                    <td className='py-2 px-4 text-right'>{bet.pointsEarned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className='flex justify-between items-center mt-4'>
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || totalPages === 1}
              className={`py-2 px-6 font-semibold rounded-full shadow transition-all ${
                currentPage === 1 || totalPages === 1
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Poprzednia
            </Button>
            <p className='text-gray-700'>
              Strona {currentPage} z {totalPages}
            </p>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 1}
              className={`py-2 px-6 font-semibold rounded-full shadow transition-all ${
                currentPage === totalPages || totalPages === 1
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Następna
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBetHistoryPage;
