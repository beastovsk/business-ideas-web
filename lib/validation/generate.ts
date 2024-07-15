import * as z from 'zod';

export const generateProductSchema = z
  .object({
    niche: z.string().nonempty('Ниша обязательна для заполнения'),
    budgetFrom: z
      .number()
      .min(0, 'Минимальный бюджет не может быть отрицательным')
      .refine((value) => value !== undefined, {
        message: 'Бюджет (От) обязателен для заполнения'
      }),
    budgetTo: z
      .number()
      .min(0, 'Максимальный бюджет не может быть отрицательным')
      .refine((value) => value !== undefined, {
        message: 'Бюджет (До) обязателен для заполнения'
      }),
    targetAudience: z.string().nonempty('Целевая аудитория обязательна для заполнения'),
    productType: z.string().nonempty('Тип продукта обязателен для заполнения'),
    market: z.string().nonempty('Рынок обязателен для заполнения'),
    implementationTime: z.string().nonempty('Время на реализацию обязательно для заполнения'),
    comments: z.string().optional(),
    otherNiche: z.string().nonempty()
  })
  .refine((data) => data.budgetFrom <= data.budgetTo, {
    message: 'Минимальный бюджет не может быть больше максимального',
    path: ['budgetTo'] // Куда будет добавлено сообщение об ошибке
  });
