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
        title: 'Sukces',
        description: 'Zakład dodany pomyślnie!',
        variant: 'positive',
      });
      closeModal();
    } catch (error) {
      handleError({
        error,
        form,
        onToast: message => {
          toast({
            title: 'Błąd dodawania zakładu',
            description: message,
            variant: 'destructive',
          });
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex items-center justify-between space-x-4'>
          <FormField
            name='homeScore'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </FormControl>
                <div className='h-[1.25rem]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <span className='text-xl font-bold'>-</span>
          <FormField
            name='awayScore'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
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
            className='w-[50%] px-4 py-2 bg-gray-800 text-white font-semibold rounded-full shadow hover:bg-gray-700 transition-all'
          >
            Zapisz
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BetForm;
