import RegisterForm from '@/features/auth/components/forms/register/RegisterForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Register = () => {
  return (
    <div className='w-full max-w-md px-4 tablet:px-6 laptop:px-8 mx-auto'>
      <Card className='shadow-md rounded-2xl transform transition-transform duration-200 hover:scale-105 bg-background_light'>
        <CardHeader>
          <CardTitle className='text-center text-primary_text'>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
