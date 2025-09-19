import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/store/useModalStore';
import { betSchema, BetSchemaType } from './betSchema';
import { usePlaceBetMutation } from '@/features/bets/services/mutations';
import { handleError } from '@/services/ErrorHandler';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/Form';

const BetForm: React.FC<{ matchId: number }> = ({ matchId }) => {
  const { closeModal } = useModalStore();
  const { toast } = useToast();
  const placeBetMutation = usePlaceBetMutation();

  const form = useForm<BetSchemaType>({
    resolver: zodResolver(betSchema),
    defaultValues: {
      homeScore: '',
      awayScore: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: BetSchemaType) => {
    const payload = {
      matchId,
      predictedScore: `${values.homeScore}-${values.awayScore}`,
    };
    try {
      await placeBetMutation.mutateAsync(payload);

      toast({
        title: 'Success',
        description: 'Bet added successfully!',
        variant: 'positive',
      });
      closeModal();
    } catch (error) {
      handleError({
        error,
        form,
        onToast: message => {
          toast({
            title: 'Error adding bet',
            description: message,
            variant: 'destructive',
          });
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-6'>
        <div className='flex items-center justify-between space-x-4'>
          <FormField
            name='homeScore'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    placeholder='Home Team'
                    className='placeholder:text-xs tablet:placeholder:text-sm border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
                  />
                </FormControl>
                <div className='h-[1.25rem]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <span className='text-xl font-bold tablet:text-2xl mb-[1.5rem]'>-</span>
          <FormField
            name='awayScore'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    placeholder='Away Team'
                    className='placeholder:text-xs tablet:placeholder:text-sm border-secondary bg-white text-primary_text rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent'
                  />
                </FormControl>
                <div className='h-[1.25rem]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-center'>
          <Button
            type='submit'
            variant='secondary'
            disabled={
              !form.formState.isValid || form.formState.isSubmitting || placeBetMutation.isPending
            }
            className='px-2 py-1 tablet:px-8 tablet:py-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {placeBetMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BetForm;
