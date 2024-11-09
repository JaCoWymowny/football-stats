import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import ChangeEmailForm from '@/features/user/settings/components/ChangeEmailForm';
import ChangePasswordForm from '@/features/user/settings/components/ChangePasswordForm';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

const UserProfileEdit: FC = () => {
  const { isLoading, error } = useUserQuery();

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
    <div className='w-full max-w-lg px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12'>
      <Card className='shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-center'>Ustawienia Konta</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='change-email' className='w-full'>
            <TabsList className='flex justify-center mb-4'>
              <TabsTrigger value='change-email'>Zmień Email</TabsTrigger>
              <TabsTrigger value='change-password'>Zmień Hasło</TabsTrigger>
            </TabsList>
            <TabsContent value='change-email'>
              <ChangeEmailForm />
            </TabsContent>
            <TabsContent value='change-password'>
              <ChangePasswordForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileEdit;
