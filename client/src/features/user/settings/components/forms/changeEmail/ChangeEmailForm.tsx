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
        title: 'Success',
        description: 'Email has been updated successfully!',
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
            title: 'Error',
            description: message,
            variant: 'destructive',
          });
        },
      });
    }
  };

  const handleCancel = () => {
    navigate('/settings');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2 mt-6'>
        <FormField
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary_text'>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your new email address'
                  className='placeholder:text-xs tablet:placeholder:text-sm border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between space-x-4'>
          <Button
            type='submit'
            variant='secondary'
            disabled={
              !form.formState.isValid || form.formState.isSubmitting || editMutation.isPending
            }
            className='px-2 py-1 tablet:px-4 tablet:py-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {editMutation.isPending ? 'Saving...' : 'Save'}
          </Button>

          <Button
            type='button'
            variant='secondary'
            onClick={handleCancel}
            className='px-2 py-1 tablet:px-4 tablet:py-2'
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeEmailForm;
