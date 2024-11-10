import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useEditMutation } from '@/features/user/settings/services/mutations';
import { ChangePasswordSchemaType, changePasswordSchema } from './changePasswordSchema';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserQuery } from '@/features/hooks/UseUserQuery';

const ChangePasswordForm: FC = () => {
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { mutate, isPending, isError, error } = useEditMutation();
  const navigate = useNavigate();
  const { data: loggedInUser } = useUserQuery();

  const onSubmit = (data: ChangePasswordSchemaType) => {
    mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          alert('Hasło zostało zaktualizowane pomyślnie.');
          form.reset();
          navigate(`/profile/${loggedInUser?.id}`);
        },
        onError: (mutationError: unknown) => {
          const axiosError = mutationError as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message || 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.';
          form.setError('currentPassword', {
            type: 'manual',
            message: errorMessage,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Obecne hasło</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='Wprowadź obecne hasło' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nowe hasło</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='Wprowadź nowe hasło' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potwierdź nowe hasło</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='Potwierdź nowe hasło' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && (
          <div className='text-red-600 mt-2'>
            {(error as AxiosError<{ message?: string }>)?.response?.data?.message ||
              'Wystąpił błąd. Spróbuj ponownie.'}
          </div>
        )}

        <div className='flex justify-between space-x-4'>
          <Button
            type='submit'
            disabled={isPending || !form.formState.isValid}
            className='w-full py-3 text-white font-semibold rounded-lg transition-colors bg-indigo-600 hover:bg-indigo-700'
          >
            {isPending ? 'Zapisywanie...' : 'Zapisz'}
          </Button>
          <Button
            type='button'
            onClick={handleCancel}
            className='w-full py-3 text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200'
          >
            Anuluj
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
