import { z } from 'zod';

export const betSchema = z.object({
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

export type BetSchemaType = z.infer<typeof betSchema>;
