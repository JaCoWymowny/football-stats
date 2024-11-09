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
import { ChangeEmailSchemaType, changeEmailSchema } from './changeEmailSchema';
import { useEditMutation } from '@/features/user/settings/services/mutations';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const ChangeEmailForm: FC = () => {
  const form = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const { mutate, isPending, isError, error } = useEditMutation();
  const navigate = useNavigate();

  const onSubmit = (data: ChangeEmailSchemaType) => {
    mutate(
      { email: data.email },
      {
        onSuccess: () => {
          alert('Email został zaktualizowany pomyślnie.');
          form.reset();
          navigate('/profile');
        },
        onError: mutationError => {
          const axiosError = mutationError as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message || 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.';
          form.setError('email', {
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Wprowadź swój nowy email' />
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
            disabled={isPending}
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

export default ChangeEmailForm;
