import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Podanie obecnego hasła jest wymagane'),
    newPassword: z
      .string()
      .min(8, 'Hasło musi mieć co najmniej 8 znaków')
      .max(25, 'Hasło nie może mieć więcej niż 25 znaków'),
    // .regex(/[A-Z]/, 'Hasło musi zawierać co najmniej jedną wielką literę')
    // .regex(/[0-9]/, 'Hasło musi zawierać co najmniej jedną cyfrę')
    // .regex(/[@$!%*?&]/, 'Hasło musi zawierać co najmniej jeden znak specjalny'),
    confirmPassword: z.string().min(8, 'Potwierdzenie hasła musi mieć co najmniej 8 znaków'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Hasła muszą być takie same',
    path: ['confirmPassword'],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
