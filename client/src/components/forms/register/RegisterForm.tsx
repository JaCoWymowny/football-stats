import { RegisterSchemaType } from './registerSchema';
import { useRegisterForm } from '@/helpers/useFormHelper';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authApi } from '@/features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useRegisterForm();

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const response = await authApi.register(data);
      if (response && response.user) {
        console.log('Registration successful:', response);
        navigate('/auth/login');
      } else {
        console.error('Registration failed: Unexpected response');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Wprowadź nazwę użytkownika'
                  className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Wprowadź swój email'
                  className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Wprowadź hasło'
                  className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Potwierdź hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Potwierdź hasło'
                  className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'
        >
          Zarejestruj się
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
