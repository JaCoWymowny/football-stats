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
    <div className='p-2 rounded-md bg-background_light shadow-sm tablet:p-4'>
      <div className='text-center text-sm mb-2 tablet:text-base'>{matchTime}</div>

      <div className='text-center text-lg font-bold mb-2 tablet:text-xl'>
        {fullTime.home !== null && fullTime.away !== null
          ? `${fullTime.home} - ${fullTime.away}`
          : '-- - --'}
      </div>

      <div className='grid grid-cols-1 gap-2 tablet:grid-cols-3 tablet:items-center tablet:gap-4'>
        <div className='flex flex-col items-center tablet:flex-row tablet:justify-start'>
          <img
            src={homeTeam.crest}
            alt={`${homeTeam.name} crest`}
            className='w-10 h-10 mb-1 tablet:mb-0 tablet:mr-2'
          />
          <span className='font-bold text-xs tablet:text-base text-center tablet:text-left'>
            {homeTeam.name}
          </span>
        </div>

        <div className='text-center text-xs tablet:text-sm font-bold'>{competition.name}</div>

        <div className='flex flex-col items-center tablet:flex-row tablet:justify-end'>
          <span className='font-bold text-xs tablet:text-base text-center tablet:text-right'>
            {awayTeam.name}
          </span>
          <img
            src={awayTeam.crest}
            alt={`${awayTeam.name} crest`}
            className='w-10 h-10 mb-1 tablet:mb-0 tablet:ml-2'
          />
        </div>
      </div>

      <div className='flex justify-center mt-4'>
        <Button
          onClick={() => onBetClick(id, homeTeam.name, awayTeam.name)}
          disabled={isDisabled}
          variant='secondary'
          className='px-4 py-2 text-sm tablet:px-10 tablet:py-4'
        >
          Obstaw!
        </Button>
      </div>
    </div>
  );
};

export default MatchItem;
