import LoginForm from '@/components/forms/login/LoginForm';

const Login = () => {
  return (
    <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg mx-auto'>
      <h2 className='text-2xl font-bold text-center text-gray-800'>Logowanie</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
