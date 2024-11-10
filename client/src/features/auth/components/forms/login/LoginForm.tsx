import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from './loginSchema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/Form';
import { useLoginMutation } from '@/features/auth/services/mutations';
import { useNavigate } from 'react-router-dom';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLoginMutation();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: LoginSchemaType) => {
    login(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: error => {
        form.setError('username', { message: error.message || 'Wystąpił błąd podczas logowania.' });
      },
    });
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
        <Button
          type='submit'
          disabled={isPending}
          className='w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'
        >
          {isPending ? 'Logowanie...' : 'Zaloguj się'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
