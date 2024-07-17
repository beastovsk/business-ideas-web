'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Icons} from '@/components/ui/icons';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {changeEmailSchema} from '@/lib/validation/email';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

type FormData = z.infer<typeof changeEmailSchema>;

export const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormData>({
    resolver: zodResolver(changeEmailSchema)
  });
  async function onSubmit(data: FormData) {}

  return (
    <div className='grid gap-6'>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Смена почты</CardTitle>
          <CardDescription>Заполните поля ниже, чтобы сменить почту</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1'>
                <Label className='sr-only' htmlFor='email'>
                  Новая почта
                </Label>
                <Input
                  id='email'
                  placeholder='Новая почта'
                  type='email'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={false}
                  {...register('email')}
                />
                {errors?.email && <p className='px-1 text-xs text-red-600'>{errors.email.message}</p>}
              </div>
              <div className='grid gap-1'>
                <Label className='sr-only' htmlFor='password'>
                  Текущий пароль
                </Label>
                <Input
                  id='password'
                  placeholder='Текущий пароль'
                  type='password'
                  autoCapitalize='none'
                  autoComplete='password'
                  autoCorrect='off'
                  disabled={false}
                  {...register('password')}
                />
                {errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
              </div>

              <Separator className='my-3' />
              <Button disabled={false} className='w-max'>
                {false && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                Подтвердить
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
