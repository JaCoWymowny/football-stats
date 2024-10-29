import LoginForm from '@/components/forms/login/LoginForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Login = () => {
  return (
    <div className='w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-6 sm:mt-12'>
      <Card className='shadow-md rounded-2xl transform transition-transform duration-200 hover:scale-105'>
        <CardHeader>
          <CardTitle className='text-center text-gray-800'>Logowanie</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
