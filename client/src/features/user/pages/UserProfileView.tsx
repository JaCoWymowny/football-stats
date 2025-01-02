import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/useUserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import GlobalLoader from '@/components/ui/GLobalLoader';
import { useUserByIdQuery } from '@/features/hooks/useUserByIdQuery';

const UserProfileView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, isPending: isCurrentUserPending } = useUserContext();
  const { data: userFromQuery, isPending: isUserFromQueryPending } = useUserByIdQuery(Number(id));
  const userToDisplay = userFromQuery || (currentUser?.id === Number(id) ? currentUser : null);
  const isCurrentUser = currentUser?.id === Number(id);

  if (isCurrentUserPending || isUserFromQueryPending) {
    return <GlobalLoader />;
  }

  return (
    <div className='w-full max-w-lg px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12 space-y-6'>
      <Card className='shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-center text-gray-800'>
            {isCurrentUser ? 'Twój Profil' : 'Profil Użytkownika'}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex justify-between'>
            <span className='text-gray-700 font-semibold'>Email:</span>
            <span className='text-gray-800'>{isCurrentUser ? userToDisplay?.email : '-'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-700 font-semibold'>Nazwa Użytkownika:</span>
            <span className='text-gray-800'>{userToDisplay?.username}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-700 font-semibold'>Rola:</span>
            <span className='text-gray-800'>{userToDisplay?.role}</span>
          </div>
        </CardContent>
      </Card>

      {isCurrentUser && (
        <div className='text-center mt-4'>
          <Button
            onClick={() => navigate('/settings')}
            className='bg-gray-800 text-white px-4 py-2 shadow hover:bg-gray-700 rounded-full transition-all'
          >
            Przejdź do ustawień
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfileView;
