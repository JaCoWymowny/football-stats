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
import { useToast } from '@/components/hooks/use-toast';
import { handleError } from '@/services/ErrorHandler';
import { UserQueries } from '@/features/hooks/UserQueries';
import { useQueryClient } from '@tanstack/react-query';
import { AuthStatus } from '@/store/authStatus';
import { useAuthStore } from '@/store/useAuthStore';

const LoginForm: FC = () => {
  const loginMutation = useLoginMutation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setStatus } = useAuthStore();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: LoginSchemaType) => {
    try {
      const loginResponse = await loginMutation.mutateAsync(data);
      queryClient.setQueryData(UserQueries.getCurrentUser().queryKey, loginResponse.user);
      setStatus(AuthStatus.AUTHENTICATED);
      toast({
        title: 'Sukces',
        description: 'Zalogowano pomyślnie!',
        variant: 'positive',
      });
    } catch (error) {
      handleError({
        error,
        form,
        onToast: message => {
          toast({
            title: 'Błąd logowania',
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
          disabled={
            !form.formState.isValid || form.formState.isSubmitting || loginMutation.isPending
          }
          className='w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'
        >
          {loginMutation.isPending ? 'Logowanie...' : 'Zaloguj się'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
