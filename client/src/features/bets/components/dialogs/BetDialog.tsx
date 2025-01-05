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
      <DialogContent className='w-[90%] max-w-md p-4 bg-background_light rounded-lg shadow-lg mx-auto tablet:w-auto'>
        <DialogHeader>
          <DialogTitle className='text-center my-4 text-lg tablet:text-xl'>
            Dodaj Zakład
          </DialogTitle>
          <DialogDescription className='text-center text-sm tablet:text-base'>
            <div>Czego się spodziewasz po meczu:</div>
            <div className='font-bold'>
              {homeTeam} - {awayTeam}?
            </div>
          </DialogDescription>
        </DialogHeader>
        <BetForm matchId={matchId} />
      </DialogContent>
    </Dialog>
  );
};
