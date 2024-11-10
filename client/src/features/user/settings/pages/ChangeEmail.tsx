import ChangeEmailForm from '../components/ChangeEmailForm';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const ChangeEmail = () => {
  return (
    <div className='mt-4'>
      <CardHeader>
        <CardTitle className='text-center text-gray-800'>Zmień Email</CardTitle>
      </CardHeader>
      <CardContent className='shadow-none'>
        <ChangeEmailForm />
      </CardContent>
    </div>
  );
};

export default ChangeEmail;
