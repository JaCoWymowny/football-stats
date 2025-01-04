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
import { useRegisterMutation, useLoginMutation } from '@/features/auth/services/mutations';
import { handleError } from '@/services/ErrorHandler';
import { useToast } from '@/components/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { UserQueries } from '@/features/hooks/UserQueries';
import { AuthStatus } from '@/store/authStatus';
import { useAuthStore } from '@/store/useAuthStore';

const RegisterForm: FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const registerMutation = useRegisterMutation();
  const loginMutation = useLoginMutation();
  const { setStatus } = useAuthStore();

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

  const handleSubmit = async (values: RegisterSchemaType) => {
    const credentials = {
      username: values.username,
      password: values.password,
      email: values.email,
    };

    try {
      await registerMutation.mutateAsync(credentials);
      const loginResponse = await loginMutation.mutateAsync({
        username: values.username,
        password: values.password,
      });

      queryClient.setQueryData(UserQueries.getCurrentUser().queryKey, loginResponse.user);
      setStatus(AuthStatus.AUTHENTICATED);
      toast({
        title: 'Sukces',
        description: 'Zarejestrowano i zalogowano pomyślnie!',
        variant: 'positive',
      });
    } catch (error) {
      console.error('Błąd rejestracji:   ', error);
      setStatus(AuthStatus.UNAUTHENTICATED);
      handleError({
        error,
        form,
        onToast: message => {
          toast({
            title: 'Błąd',
            description: message,
            variant: 'destructive',
          });
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary_text'>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Wprowadź nazwę użytkownika'
                  className='border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
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
              <FormLabel className='text-primary_text'>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Wprowadź swój email'
                  className='border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
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
              <FormLabel className='text-primary_text'>Hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Wprowadź hasło'
                  className='border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
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
              <FormLabel className='text-primary_text'>Potwierdź hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Potwierdź hasło'
                  className='border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          variant='secondary'
          disabled={
            !form.formState.isValid || form.formState.isSubmitting || registerMutation.isPending
          }
          className='px-2 py-1 tablet:px-4 tablet:py-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {registerMutation.isPending ? 'Rejestrowanie...' : 'Zarejestruj się'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
