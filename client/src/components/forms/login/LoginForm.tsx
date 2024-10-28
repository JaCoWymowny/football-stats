import { LoginSchemaType } from '@/components/forms/login/loginSchema';
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
import { useLoginForm } from '@/helpers/useFormHelper';
import { authApi } from '@/features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useLoginForm();

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await authApi.login(data);
      if (response && response.token) {
        console.log('Login successful:', response);
        navigate('/home');
      } else {
        console.error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Error during login:', error);
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
        <Button
          type='submit'
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md mt-4'
        >
          Zaloguj się
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
