import RegisterForm from '@/components/forms/register/RegisterForm';

const Register = () => {
  return (
    <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg mx-auto'>
      <h2 className='text-2xl font-bold text-center text-gray-800'>Rejestracja</h2>
      <RegisterForm />
    </div>
  );
};

export default Register;
