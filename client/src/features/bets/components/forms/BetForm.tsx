import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/Form';
import { useModalStore } from '@/store/useModalStore';

const betSchema = z.object({
  homeScore: z
    .string()
    .regex(/^([1-9][0-9]{0,2}|0)$/, 'Nieprawidłowy format wyniku') // Uproszczony komunikat
    .refine(
      val => parseInt(val, 10) >= 0 && parseInt(val, 10) <= 999,
      'Wynik musi być w zakresie 0-999'
    ),
  awayScore: z
    .string()
    .regex(/^([1-9][0-9]{0,2}|0)$/, 'Nieprawidłowy format wyniku') // Uproszczony komunikat
    .refine(
      val => parseInt(val, 10) >= 0 && parseInt(val, 10) <= 999,
      'Wynik musi być w zakresie 0-999'
    ),
});

type BetFormType = z.infer<typeof betSchema>;

const BetForm: React.FC<{ matchId: number }> = ({ matchId }) => {
  const { closeModal } = useModalStore();
  const form = useForm<BetFormType>({
    resolver: zodResolver(betSchema),
    defaultValues: {
      homeScore: '',
      awayScore: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: BetFormType) => {
    const payload = {
      matchId,
      predictedScore: `${values.homeScore}-${values.awayScore}`,
    };

    console.log('Dane do wysłania:', payload);

    closeModal();
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
