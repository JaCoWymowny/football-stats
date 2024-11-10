import ChangePasswordForm from '@/features/user/settings/components/forms/changePassword/ChangePasswordForm';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const ChangePassword = () => {
  return (
    <div className='mt-4'>
      <CardHeader>
        <CardTitle className='text-center text-gray-800'>Zmień Hasło</CardTitle>
      </CardHeader>
      <CardContent className='shadow-none'>
        <ChangePasswordForm />
      </CardContent>
    </div>
  );
};

export default ChangePassword;
