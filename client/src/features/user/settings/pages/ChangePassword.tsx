import ChangePasswordForm from '../components/ChangePasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const ChangePassword = () => {
  return (
    <div className='w-full max-w-lg px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12'>
      <Card className='shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-center text-gray-800'>Zmień Hasło</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
