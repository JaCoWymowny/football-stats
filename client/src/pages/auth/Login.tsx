import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/schemas/loginSchema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log('Login data:', data);
    navigate('/home');
  };

  return (
    <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg mx-auto'>
      <h2 className='text-2xl font-bold text-center text-gray-800'>Logowanie</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
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
          <Button
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md mt-4'
          >
            Zaloguj się
          </Button>
        </Form>
      </form>
    </div>
  );
};

export default Login;
