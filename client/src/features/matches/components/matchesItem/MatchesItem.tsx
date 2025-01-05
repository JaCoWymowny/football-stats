import React from 'react';
import { Match } from '@/types/types';
import { Button } from '@/components/ui/Button';

interface MatchItemProps {
  match: Match;
  onBetClick: (matchId: number, homeTeam: string, awayTeam: string) => void;
}

const MatchItem: React.FC<MatchItemProps> = ({ match, onBetClick }) => {
  const {
    utcDate,
    homeTeam,
    awayTeam,
    score: { fullTime },
    competition,
    id,
    status,
  } = match;

  const matchTime = new Date(utcDate).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isDisabled = status === 'FINISHED' || status === 'IN_PLAY';

  return (
    <div className='p-4 rounded-lg bg-background_light shadow-md'>
      <div className='text-center text-secondary_text mb-2'>{matchTime}</div>

      <div className='text-center text-xl font-bold text-primary_text mb-4'>
        {fullTime.home !== null && fullTime.away !== null
          ? `${fullTime.home} - ${fullTime.away}`
          : '-- - --'}
      </div>

      <div className='grid grid-cols-3 items-center gap-4'>
        <div className='flex items-center justify-start'>
          <img src={homeTeam.crest} alt={`${homeTeam.name} crest`} className='w-10 h-10 mr-2' />
          <span className='font-medium text-primary_text'>{homeTeam.name}</span>
        </div>

        <div className='text-center text-sm text-secondary_text'>{competition.name}</div>

        <div className='flex items-center justify-end'>
          <span className='font-medium text-primary_text'>{awayTeam.name}</span>
          <img src={awayTeam.crest} alt={`${awayTeam.name} crest`} className='w-10 h-10 ml-2' />
        </div>
      </div>

      <div className='flex justify-center mt-6'>
        <Button
          onClick={() => onBetClick(id, homeTeam.name, awayTeam.name)}
          disabled={isDisabled}
          variant='secondary'
          className='px-2 py-1 tablet:px-10 tablet:py-4'
        >
          Obstaw!
        </Button>
      </div>
    </div>
  );
};

export default MatchItem;
