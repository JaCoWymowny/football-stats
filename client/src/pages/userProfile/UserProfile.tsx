import { useParams } from 'react-router-dom';
import { useUserByIdQuery } from '@/features/hooks/useUserByIdQuery';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import EditForm from '@/components/forms/edit/EditForm';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: loggedInUser } = useUserQuery();
  const { data: user, isLoading, error } = useUserByIdQuery(Number(id));
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <div className='text-center mt-6'>Ładowanie danych użytkownika...</div>;
  }

  if (error) {
    return (
      <div className='text-center mt-6 text-red-600'>
        Wystąpił błąd podczas pobierania danych użytkownika: {error.message}
      </div>
    );
  }

  const isCurrentUser = loggedInUser?.id === user?.id;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className='w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12'>
      {isEditing ? (
        <Card className='shadow-md rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-center text-gray-800'>Edytuj Profil</CardTitle>
          </CardHeader>
          <CardContent>{user && <EditForm user={user} onCancel={handleCancelEdit} />}</CardContent>
        </Card>
      ) : (
        <Card className='shadow-md rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-center text-gray-800'>
              {isCurrentUser ? 'Twój Profil' : 'Profil Użytkownika'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between'>
              <span className='text-gray-700 font-semibold'>Email:</span>
              <span className='text-gray-800'>{user?.email}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-700 font-semibold'>Nazwa Użytkownika:</span>
              <span className='text-gray-800'>{user?.username}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-700 font-semibold'>Rola:</span>
              <span className='text-gray-800'>{user?.role}</span>
            </div>
            {isCurrentUser && (
              <div className='text-right'>
                <Button
                  onClick={handleEditClick}
                  className='bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'
                >
                  Edytuj Profil
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
