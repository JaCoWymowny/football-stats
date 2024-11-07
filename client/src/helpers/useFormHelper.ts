import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/components/forms/login/loginSchema';
import { registerSchema, RegisterSchemaType } from '@/components/forms/register/registerSchema';
import { editUserSchema, EditUserSchemaType } from '@/components/forms/edit/editSchema';
import { User } from '@/types/types';

export const useLoginForm = () => {
  return useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
};

export const useRegisterForm = () => {
  return useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
};

export const useEditForm = (user: User) => {
  return useForm<EditUserSchemaType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user.email || '',
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });
};
