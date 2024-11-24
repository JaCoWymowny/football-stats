import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const SettingsNav: FC = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-around mb-6 space-x-4'>
      <Button
        onClick={() => navigate('/settings/change-email')}
        className='bg-gray-800 text-white px-4 py-2 shadow hover:bg-gray-700 rounded-full transition-all'
      >
        Zmień Email
      </Button>
      <Button
        onClick={() => navigate('/settings/change-password')}
        className='bg-gray-800 text-white px-4 py-2 shadow hover:bg-gray-700 rounded-full transition-all'
      >
        Zmień Hasło
      </Button>
    </div>
  );
};

export default SettingsNav;
