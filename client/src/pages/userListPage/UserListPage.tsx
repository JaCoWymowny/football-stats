import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/authApi';
import { User } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const UserListPage = () => {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: authApi.getUsers,
    staleTime: 300000,
    retry: false,
  });

  if (isLoading) {
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
    <div className='w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12'>
      <Card className='shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-center text-gray-800'>Lista Użytkowników</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {users?.map(user => (
            <div
              key={user.id}
              className='flex justify-between items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100'
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <span className='text-gray-800 font-semibold'>{user.username}</span>
              <span className='text-gray-600'>{user.email}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserListPage;
