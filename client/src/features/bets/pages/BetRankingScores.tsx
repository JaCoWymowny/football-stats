import React, { useState } from 'react';
import { useRankingQuery } from '@/features/bets/services/mutations';
import { useNavigate } from 'react-router-dom';
import BetTable from '../components/table/BetTable';

const BetRankingScores = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, isError, error } = useRankingQuery(currentPage, 10);

  const totalPages = data?.meta.totalPages || 1;

  const columns: Array<'position' | 'username' | 'points'> = ['position', 'username', 'points'];

  const formattedData =
    data?.data.map((rank, index) => ({
      position: (currentPage - 1) * 10 + index + 1,
      username: rank.user.username,
      points: rank.totalPoints,
      userId: rank.userId,
    })) || [];

  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className='container mx-auto mt-10'>
      <BetTable
        data={formattedData}
        columns={columns}
        columnHeaders={['Pozycja', 'Użytkownik', 'Punkty']}
        isPending={isPending}
        isError={isError}
        errorMessage={error?.response?.data?.message}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onRowClick={row => navigate(`/profile/${row.userId}`)}
      />
    </div>
  );
};

export default BetRankingScores;
