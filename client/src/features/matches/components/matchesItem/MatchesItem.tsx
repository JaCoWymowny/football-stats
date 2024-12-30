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
    <div className='mb-4 p-4 border-b border-gray-300'>
      <div className='text-center text-gray-600 mb-2'>
        <span>{matchTime}</span>
      </div>

      <div className='text-center text-lg font-semibold text-gray-700 mb-2'>
        {fullTime.home !== null && fullTime.away !== null
          ? `${fullTime.home} - ${fullTime.away}`
          : '-- - --'}
      </div>

      <div className='grid grid-cols-3 items-center gap-4'>
        <div className='flex items-center justify-start'>
          <img src={homeTeam.crest} alt={`${homeTeam.name} crest`} className='w-8 h-8 mr-2' />
          <span className='font-bold text-gray-800'>{homeTeam.name}</span>
        </div>

        <div className='text-center text-sm text-gray-500'>{competition.name}</div>

        <div className='flex items-center justify-end'>
          <span className='font-bold text-gray-800'>{awayTeam.name}</span>
          <img src={awayTeam.crest} alt={`${awayTeam.name} crest`} className='w-8 h-8 ml-2' />
        </div>
      </div>

      <div className='flex justify-center mt-4'>
        <Button
          onClick={() => onBetClick(id, homeTeam.name, awayTeam.name)}
          disabled={isDisabled}
          className={`py-2 px-6 font-semibold rounded-full shadow transition-all ${
            isDisabled
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Obstaw!
        </Button>
      </div>
    </div>
  );
};

export default MatchItem;
