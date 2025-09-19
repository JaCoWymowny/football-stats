import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const SettingsNav: FC = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col tablet:flex-row justify-center gap-4 mb-8'>
      <Button
        onClick={() => navigate('/settings/change-email')}
        className='px-4 py-2 bg-accent text-secondary_text rounded-lg shadow hover:bg-accent/80'
      >
        Change Email
      </Button>
      <Button
        onClick={() => navigate('/settings/change-password')}
        className='px-4 py-2 bg-accent text-secondary_text rounded-lg shadow hover:bg-accent/80'
      >
        Change Password
      </Button>
    </div>
  );
};

export default SettingsNav;
