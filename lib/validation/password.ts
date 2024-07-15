import * as z from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(4, {message: 'Пароль должен содержать минимум 4 символа'}),
    password: z.string().min(4, {message: 'Пароль должен содержать минимум 4 символа'}),
    confirmPassword: z.string().min(4, {message: 'Пароль должен содержать минимум 4 символа'})
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'] // Ошибка будет указана в поле confirmPassword
  });
