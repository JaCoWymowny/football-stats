import LoginForm from '@/features/auth/components/forms/login/LoginForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Login = () => {
  return (
    <div className='w-full max-w-md px-4 tablet:px-6 laptop:px-8 mx-auto mt-6 tablet:mt-12'>
      <Card className='shadow-md rounded-2xl transform transition-transform duration-200 hover:scale-105 bg-background_light'>
        <CardHeader>
          <CardTitle className='text-center text-primary_text'>Logowanie</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
