import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchemaType } from './registerSchema';
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
import { useRegisterMutation } from '@/features/auth/services/mutations';
import { useNavigate } from 'react-router-dom';

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegisterMutation();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterSchemaType) => {
    register(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: error => {
        form.setError('username', {
          message: error.message || 'Wystąpił błąd podczas rejestracji.',
        });
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
          disabled={isPending}
          className='w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'
        >
          {isPending ? 'Rejestrowanie...' : 'Zarejestruj się'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
