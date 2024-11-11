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
import { useToast } from '@/components/hooks/use-toast';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { useQueryClient } from '@tanstack/react-query';
import { handleError } from '@/services/ErrorHandler';

const ChangeEmailForm: FC = () => {
  const form = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const editMutation = useEditMutation();
  const navigate = useNavigate();
  const { data: loggedInUser } = useUserQuery();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (data: ChangeEmailSchemaType) => {
    try {
      await editMutation.mutateAsync({ email: data.email });
      toast({
        title: 'Sukces',
        description: 'Email został zaktualizowany pomyślnie!',
        variant: 'positive',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      form.reset();
      navigate(`/profile/${loggedInUser?.id}`);
    } catch (error) {
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

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
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
        <div className='flex justify-between space-x-4'>
          <Button
            type='submit'
            disabled={editMutation.isPending || !form.formState.isValid}
            className='w-full py-3 text-white font-semibold rounded-lg transition-colors bg-indigo-600 hover:bg-indigo-700'
          >
            {editMutation.isPending ? 'Zapisywanie...' : 'Zapisz'}
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
