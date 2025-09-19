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
    <div className='w-full max-w-md mx-auto px-4 tablet:px-6 laptop:px-8 space-y-8'>
      <Card className='rounded-2xl shadow-lg bg-background_light'>
        <CardHeader>
          <CardTitle className='text-center text-primary_text'>
            {isCurrentUser ? 'Your Profile' : 'User Profile'}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex justify-between'>
            <span className='font-medium text-primary_text'>Email:</span>
            <span>{isCurrentUser ? userToDisplay?.email : '-'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium text-primary_text'>Username:</span>
            <span>{userToDisplay?.username}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium text-primary_text'>Role:</span>
            <span>{userToDisplay?.role}</span>
          </div>
        </CardContent>
      </Card>

      {isCurrentUser && (
        <div className='text-center'>
          <Button
            onClick={() => navigate('/settings')}
            className='px-4 py-2 bg-accent text-secondary_text rounded-lg shadow hover:bg-accent/80'
          >
            Go to settings
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfileView;
