import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Podanie obecnego hasła jest wymagane'),
    newPassword: z.string().min(6, 'Nowe hasło musi mieć co najmniej 6 znaków'),
    confirmPassword: z.string().min(6, 'Potwierdzenie hasła musi mieć co najmniej 6 znaków'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Hasła muszą być takie same',
    path: ['confirmPassword'],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
