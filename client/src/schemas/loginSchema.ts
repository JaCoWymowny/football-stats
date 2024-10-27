import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Wprowadź poprawny adres email'),
  password: z.string().min(1, 'Hasło jest wymagane'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
