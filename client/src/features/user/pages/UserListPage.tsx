import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useUsersQuery } from '@/features/user/settings/services/mutations';

const UserListPage = () => {
  const navigate = useNavigate();
  const { data: users, isPending, error } = useUsersQuery();

  if (isPending) {
    return <div className='text-center mt-6'>Ładowanie listy użytkowników...</div>;
  }

  if (error) {
    return (
      <div className='text-center mt-6 text-red-600'>
        Wystąpił błąd podczas pobierania listy użytkowników: {error.message}
      </div>
    );
  }

  return (
    <Card className='w-full max-w-4xl mx-auto mt-4 shadow-md rounded-lg bg-background_light'>
      <CardHeader className='p-4'>
        <CardTitle className='text-center text-lg text-gray-800'>Lista Użytkowników</CardTitle>
      </CardHeader>
      <CardContent>
        {users?.map((user, index) => (
          <div
            key={user.id}
            className={`flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100 ${
              index < users.length - 1 ? 'border-b border-gray-400' : ''
            }`}
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            <span className='text-gray-800 font-medium'>{user.username}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserListPage;
