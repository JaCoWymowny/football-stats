import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserBetHistoryQuery } from '@/features/bets/services/mutations';
import { useUserContext } from '@/context/useUserContext';
import BetTable from '../components/table/BetTable';

const UserBetHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending: isCurrentUserPending } = useUserContext();
  const { data, isPending, isError, error } = useUserBetHistoryQuery(Number(id), currentPage, 10);

  const totalPages = data?.meta.totalPages || 1;

  const columns: Array<'match' | 'predictedScore' | 'finalScore' | 'points'> = [
    'match',
    'predictedScore',
    'finalScore',
    'points',
  ];

  const formattedData =
    data?.data.map(bet => ({
      match: `${bet.homeTeam} vs ${bet.awayTeam}`,
      predictedScore: bet.predictedScore,
      finalScore: bet.finalScore || 'Pending',
      points: bet.pointsEarned,
    })) || [];

  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className='container mx-auto mt-10'>
      <BetTable
        data={formattedData}
        columns={columns}
        columnHeaders={['match', 'predictedScore', 'finalScore', 'points']}
        isPending={isPending || isCurrentUserPending}
        isError={isError}
        errorMessage={error?.response?.data?.message}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UserBetHistoryPage;
