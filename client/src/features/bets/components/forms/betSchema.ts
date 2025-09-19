import { z } from 'zod';

export const betSchema = z.object({
  homeScore: z
    .string()
    .regex(/^([1-9][0-9]{0,2}|0)$/, 'Incorrect result format')
    .refine(
      val => parseInt(val, 10) >= 0 && parseInt(val, 10) <= 999,
      'The result must be in the range 0-999'
    ),
  awayScore: z
    .string()
    .regex(/^([1-9][0-9]{0,2}|0)$/, 'Incorrect result format')
    .refine(
      val => parseInt(val, 10) >= 0 && parseInt(val, 10) <= 999,
      'The result must be in the range 0-999'
    ),
});

export type BetSchemaType = z.infer<typeof betSchema>;
