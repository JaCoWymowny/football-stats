import { RegisterSchemaType } from './registerSchema';
import { useRegisterForm } from '@/helpers/useFormHelper';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
        navigate('/login');
      } else {
        console.error('Registration failed: Unexpected response');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Wprowadź nazwę użytkownika' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Wprowadź swój email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='Wprowadź hasło' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potwierdź hasło</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='Potwierdź hasło' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md mt-6'
        >
          Zarejestruj się
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
