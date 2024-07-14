import * as z from 'zod';

export const userAuthSchema = z.object({
  email: z.string().email({message: 'Некорректный адрес электронной почты'}),
  password: z.string().min(4, {message: 'Пароль должен содержать минимум 4 символа'})
});
