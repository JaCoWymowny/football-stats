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
import { useToast } from '@/components/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { useQueryClient } from '@tanstack/react-query';
import { handleError } from '@/services/ErrorHandler';

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

  const queryClient = useQueryClient();
  const editMutation = useEditMutation();
  const navigate = useNavigate();
  const { data: loggedInUser } = useUserQuery();
  const { toast } = useToast();

  const handleSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      await editMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast({
        title: 'Success',
        description: 'Password updated successfully!',
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
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary_text'>Current password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Type your current password'
                  className='placeholder:text-xs tablet:placeholder:text-sm border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary_text'>New password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Type your new password'
                  className='placeholder:text-xs tablet:placeholder:text-sm border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
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
              <FormLabel className='text-primary_text'>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Confirm new password'
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

export default ChangePasswordForm;
