import { Button } from '@/components/ui/Button';
import { BetDialog } from '../components/dialogs/BetDialog';
import { useModalStore } from '@/store/useModalStore';
import React from 'react';

const BetsPage = () => {
  const { openModal } = useModalStore();

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Zakłady</h1>
      <Button onClick={() => openModal}>Dodaj Zakład</Button>
      <BetDialog
        matchId={0}
        homeTeam={'selectedMatch.homeTeam'}
        awayTeam={'selectedMatch.awayTeam'}
      />
    </div>
  );
};

export default BetsPage;
