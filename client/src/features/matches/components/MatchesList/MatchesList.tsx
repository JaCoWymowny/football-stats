import React from 'react';
import { Match } from '@/types/types';
import MatchItem from './MatchesItem';
import { groupMatchesByLeague } from '../../helpers/groupMatchesByLeague';

interface MatchesListProps {
  matches: Match[];
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  const groupedMatches = groupMatchesByLeague(matches);

  return (
    <div className='rounded-md p-4 max-h-[500px] overflow-auto'>
      {Object.entries(groupedMatches).map(([league, matches]) => (
        <div key={league} className='mb-6 text-center'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>{league}</h2>
          <div className='space-y-4'>
            {matches.map(match => (
              <MatchItem key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesList;
