import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import BetForm from '../forms/BetForm';
import { useModalStore } from '@/store/useModalStore';

interface BetDialogProps {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
}

export const BetDialog: React.FC<BetDialogProps> = ({ matchId, homeTeam, awayTeam }) => {
  const { isOpen, closeModal } = useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && closeModal()}>
      <DialogContent className='w-[90%] max-w-md p-4 bg-background_light rounded-lg shadow-lg'>
        <DialogHeader>
          <DialogTitle className='flex justify-center my-4'>Dodaj Zakład</DialogTitle>
          <DialogDescription className='flex flex-col'>
            <span className='flex justify-center'>Czego się spodziewasz po meczu:</span>
            <span className='flex justify-center font-bold'>
              {homeTeam} - {awayTeam}?
            </span>
          </DialogDescription>
        </DialogHeader>
        <BetForm matchId={matchId} />
      </DialogContent>
    </Dialog>
  );
};
