import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/useUserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import GlobalLoader from '@/components/ui/GLobalLoader';

const UserProfileView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, isPending } = useUserContext();

  if (isPending) {
    return <GlobalLoader />;
  }

  const isCurrentUser = currentUser?.id === Number(id);

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
            <span className='text-gray-800'>{currentUser?.email}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-700 font-semibold'>Nazwa Użytkownika:</span>
            <span className='text-gray-800'>{currentUser?.username}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-700 font-semibold'>Rola:</span>
            <span className='text-gray-800'>{currentUser?.role}</span>
          </div>
        </CardContent>
      </Card>

      {isCurrentUser && (
        <div className='text-center mt-4'>
          <Button
            onClick={() => navigate('/settings')}
            className='bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'
          >
            Przejdź do ustawień
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfileView;
