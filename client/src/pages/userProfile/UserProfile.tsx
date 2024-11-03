import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const UserProfile = () => {
  const { data: user, isLoading, error } = useUserQuery();

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

  return (
    <div className='w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12'>
      <Card className='shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-center text-gray-800'>Profil Użytkownika</CardTitle>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
