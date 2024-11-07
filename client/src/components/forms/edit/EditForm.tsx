import React, { FC, useState } from 'react';
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
  FormSection,
} from '@/components/ui/Form';
import { useUpdateUserProfile } from '@/features/hooks/useUpdateUserProfile';
import { User } from '@/types/types';
import { EditUserSchemaType } from '@/components/forms/edit/editSchema';
import { AxiosError } from 'axios';

interface EditFormProps {
  user: User;
  onCancel: () => void;
}

const EditForm: FC<EditFormProps> = ({ user, onCancel }) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
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
        <FormSection title='Podstawowe informacje'>
          <FormField
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-700'>Nazwa użytkownika</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={user.username}
                    readOnly
                    className='border-gray-300 bg-gray-300 text-gray-700 cursor-not-allowed rounded-lg'
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
                    value={field.value}
                    readOnly={!isEditingEmail}
                    onClick={() => setIsEditingEmail(true)}
                    placeholder='Wprowadź swój email'
                    className={`border-gray-300 rounded-lg transition-all ${
                      isEditingEmail
                        ? 'bg-white text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400'
                        : 'bg-gray-100 text-gray-600 cursor-pointer'
                    }`}
                    onBlur={() => setIsEditingEmail(false)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <hr className='my-4 border-t border-gray-300' />

        <FormSection title='Zmiana hasła'>
          <FormField
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-700'>Obecne hasło</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    readOnly={!isEditingPassword}
                    onClick={() => setIsEditingPassword(true)}
                    placeholder='Wprowadź obecne hasło'
                    className={`border-gray-300 rounded-lg transition-all ${
                      isEditingPassword
                        ? 'bg-white text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400'
                        : 'bg-gray-100 text-gray-600 cursor-pointer'
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isEditingPassword ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <FormField
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700'>Nowe hasło</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='Wprowadź nowe hasło'
                      className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white text-black'
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
                      className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>

        {isError && (
          <div className='text-red-600 mt-2'>
            {(error as AxiosError<{ message?: string }>)?.response?.data?.message ||
              'Wystąpił błąd. Spróbuj ponownie.'}
          </div>
        )}

        <FormSection title=''>
          <div className='flex justify-between mt-6'>
            <Button
              type='submit'
              disabled={isPending}
              className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${
                isPending ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
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
        </FormSection>
      </form>
    </Form>
  );
};

export default EditForm;
