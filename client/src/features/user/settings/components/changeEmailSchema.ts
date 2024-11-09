import { z } from 'zod';

export const changeEmailSchema = z.object({
  email: z.string().email('Podaj poprawny adres email').min(1, 'Email jest wymagany'),
});

export type ChangeEmailSchemaType = z.infer<typeof changeEmailSchema>;
