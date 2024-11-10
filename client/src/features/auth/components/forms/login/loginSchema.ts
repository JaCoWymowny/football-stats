import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Nazwa użytkownika jest wymagana')
    .regex(/^[a-zA-Z0-9_]+$/, 'Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia'),
  password: z.string().min(1, 'Hasło jest wymagane'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
