import { z } from 'zod';

export const editUserSchema = z
  .object({
    username: z
      .string()
      .min(5, 'Nazwa użytkownika musi mieć co najmniej 5 znaków')
      .max(20, 'Nazwa użytkownika nie może mieć więcej niż 20 znaków')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia'
      ),
    email: z.string().email('Podaj poprawny adres email'),
    currentPassword: z.string().min(8, 'Obecne hasło musi mieć co najmniej 8 znaków').optional(),
    password: z
      .string()
      .min(8, 'Hasło musi mieć co najmniej 8 znaków')
      .max(25, 'Hasło nie może mieć więcej niż 25 znaków')
      // .regex(/[A-Z]/, 'Hasło musi zawierać co najmniej jedną wielką literę')
      // .regex(/[0-9]/, 'Hasło musi zawierać co najmniej jedną cyfrę')
      // .regex(/[@$!%*?&]/, 'Hasło musi zawierać co najmniej jeden znak specjalny'),
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(data => !data.password || data.password === data.confirmPassword, {
    message: 'Hasła muszą być takie same',
    path: ['confirmPassword'],
  })
  .refine(data => !data.password || data.currentPassword, {
    message: 'Podanie obecnego hasła jest wymagane do zmiany hasła',
    path: ['currentPassword'],
  });

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
