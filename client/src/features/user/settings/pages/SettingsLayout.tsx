import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import SettingsNav from '@/features/user/components/SettingsNav/SettingsNav';

const SettingsLayout: FC = () => {
  const location = useLocation();
  const isChangeEmail = location.pathname.includes('change-email');
  const isChangePassword = location.pathname.includes('change-password');

  const title = isChangeEmail
    ? 'Zmień Email'
    : isChangePassword
      ? 'Zmień Hasło'
      : 'Ustawienia Konta';

  return (
    <div className='w-full max-w-md mx-auto px-4 tablet:px-6 laptop:px-8'>
      <Card className='rounded-2xl shadow-lg bg-background_light'>
        <CardHeader>
          <CardTitle className='text-center text-primary_text'>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsNav />
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsLayout;
