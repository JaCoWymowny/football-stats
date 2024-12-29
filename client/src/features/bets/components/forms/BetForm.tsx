import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useModalStore } from '@/store/useModalStore';

const betSchema = z.object({
  predictedScore: z.string().min(1, 'Musisz podać wynik.'),
});

type BetFormType = z.infer<typeof betSchema>;

const BetForm: React.FC<{ matchId: number }> = ({ matchId }) => {
  const { closeModal } = useModalStore();
  const form = useForm<BetFormType>({
    resolver: zodResolver(betSchema),
    defaultValues: {
      predictedScore: '',
    },
  });

  const onSubmit = (values: BetFormType) => {
    console.log('Zakład zapisany:', { matchId, ...values });
    closeModal();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Wynik</label>
        <Input placeholder='Podaj przewidywany wynik' {...form.register('predictedScore')} />
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
  );
};

export default BetForm;
