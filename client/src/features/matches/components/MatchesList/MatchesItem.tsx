import React from 'react';
import { Match } from '@/types/types';

interface MatchItemProps {
  match: Match;
}

const MatchItem: React.FC<MatchItemProps> = ({ match }) => {
  const {
    utcDate,
    homeTeam,
    awayTeam,
    score: { fullTime },
    competition,
  } = match;

  const matchTime = new Date(utcDate).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='mb-4 p-4 border-b border-gray-300'>
      <div className='grid grid-cols-3 items-center gap-4'>
        <div className='flex items-center justify-start'>
          <img src={homeTeam.crest} alt={`${homeTeam.name} crest`} className='w-8 h-8 mr-2' />
          <span className='font-bold text-gray-800'>{homeTeam.name}</span>
        </div>

        <div className='text-center text-gray-600'>
          <span>{matchTime}</span>
        </div>

        <div className='flex items-center justify-end'>
          <span className='font-bold text-gray-800'>{awayTeam.name}</span>
          <img src={awayTeam.crest} alt={`${awayTeam.name} crest`} className='w-8 h-8 ml-2' />
        </div>
      </div>

      <div className='flex justify-center items-center mt-2'>
        <span className='text-lg font-semibold text-gray-700'>
          {fullTime.home !== null && fullTime.away !== null
            ? `${fullTime.home} - ${fullTime.away}`
            : 'Wynik: TBD'}
        </span>
      </div>

      <div className='text-sm text-gray-500 text-center'>{competition.name}</div>
    </div>
  );
};

export default MatchItem;
