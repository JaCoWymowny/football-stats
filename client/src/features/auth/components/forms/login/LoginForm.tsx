import React, { FC } from 'react';
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
      await loginMutation.mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2 mt-6'>
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary_text mb-2'>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Wprowadź nazwę użytkownika'
                  className='border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
                />
              </FormControl>
              <div className='h-[1.25rem]'>
                <FormMessage />
              </div>
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
                  className='border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent mt-4'
                />
              </FormControl>
              <div className='h-[1.25rem]'>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          variant='secondary'
          disabled={
            !form.formState.isValid || form.formState.isSubmitting || loginMutation.isPending
          }
          className='px-2 py-1 tablet:px-4 tablet:py-2 disabled:border-disabled-border'
        >
          {loginMutation.isPending ? 'Logowanie...' : 'Zaloguj się'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
