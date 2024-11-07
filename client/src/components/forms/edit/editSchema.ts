import { z } from 'zod';

export const editUserSchema = z
  .object({
    email: z.string().email('Podaj poprawny adres email'),
    currentPassword: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    data => {
      if (data.password || data.confirmPassword) {
        if (!data.currentPassword) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'Podanie obecnego hasła jest wymagane do zmiany hasła',
      path: ['currentPassword'],
    }
  )
  .refine(
    data => {
      if (data.password) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'Hasła muszą być takie same',
      path: ['confirmPassword'],
    }
  );

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
