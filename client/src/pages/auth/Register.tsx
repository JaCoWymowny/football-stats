import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchemaType, registerSchema } from '@/schemas/registerSchema';
import { useNavigate } from 'react-router-dom';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log('Form submitted:', data);
    navigate('/login');
  };

  return (
    <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg mx-auto'>
      <h2 className='text-2xl font-bold text-center text-gray-800'>Rejestracja</h2>
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
    </div>
  );
};

export default Register;
