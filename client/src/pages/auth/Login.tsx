import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/schemas/loginSchema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/authApi';

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    console.log('test 21');
    try {
      const response = await authApi.login(data);
      console.log('test 24');
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
    <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg mx-auto'>
      <h2 className='text-2xl font-bold text-center text-gray-800'>Logowanie</h2>
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
    </div>
  );
};

export default Login;
