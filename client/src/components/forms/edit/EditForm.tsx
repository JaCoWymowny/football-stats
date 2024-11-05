import { useEditForm } from '@/helpers/useFormHelper';
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
import { useUpdateUserProfile } from '@/features/hooks/useUpdateUserProfile';
import { User } from '@/types/types';
import { FC } from 'react';
import { EditUserSchemaType } from '@/components/forms/edit/editSchema';
import { AxiosError } from 'axios';

interface EditFormProps {
  user: User;
  onCancel: () => void;
}

const EditForm: FC<EditFormProps> = ({ user, onCancel }) => {
  const form = useEditForm(user);
  const { mutate, isPending, isError, error } = useUpdateUserProfile();

  const onSubmit = (data: EditUserSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        alert('Profil został zaktualizowany pomyślnie.');
        onCancel();
      },
      onError: (mutationError: AxiosError<{ message?: string }>) => {
        const errorMessage =
          mutationError.response?.data?.message || 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.';
        form.setError('root', {
          type: 'manual',
          message: errorMessage,
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
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Obecne hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Wprowadź obecne hasło'
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
              <FormLabel className='text-gray-700'>Nowe hasło (opcjonalnie)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Wprowadź nowe hasło'
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
              <FormLabel className='text-gray-700'>Potwierdź nowe hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Potwierdź nowe hasło'
                  className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
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

        <div className='flex justify-between'>
          <Button
            type='submit'
            disabled={isPending}
            className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${isPending ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isPending ? 'Zapisywanie...' : 'Zapisz'}
          </Button>
          <Button
            type='button'
            onClick={onCancel}
            className='w-full py-3 ml-4 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors'
          >
            Anuluj
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
