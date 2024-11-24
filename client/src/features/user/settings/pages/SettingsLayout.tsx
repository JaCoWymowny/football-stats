import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import SettingsNav from '@/features/user/components/SettingsNav/SettingsNav';

const SettingsLayout: FC = () => {
  return (
    <div className='w-full max-w-lg px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12'>
      <Card className='shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-center text-gray-800'>Ustawienia Konta</CardTitle>
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
