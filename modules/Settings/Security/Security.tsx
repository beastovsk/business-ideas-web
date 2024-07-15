'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Icons} from '@/components/ui/icons';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {changePasswordSchema} from '@/lib/validation/password';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

type FormData = z.infer<typeof changePasswordSchema>;

export const Security = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, }
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema)
  });
  async function onSubmit(data: FormData) {}

  return (
    <div className='grid gap-6'>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Смена пароля</CardTitle>
          <CardDescription>Заполните поля ниже, чтобы сменить пароль</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1'>
                <Label className='sr-only' htmlFor='email'>
                  Текущий пароль
                </Label>
                <Input
                  id='currentPassword'
                  placeholder='Текущий пароль'
                  type='password'
                  autoCapitalize='none'
                  autoComplete='password'
                  autoCorrect='off'
                  disabled={false}
                  {...register('currentPassword')}
                />
                {errors?.currentPassword && (
                  <p className='px-1 text-xs text-red-600'>{errors.currentPassword.message}</p>
                )}
              </div>
              <div className='grid gap-1'>
                <Label className='sr-only' htmlFor='password'>
                  Новый пароль
                </Label>
                <Input
                  id='password'
                  placeholder='Новый пароль'
                  type='password'
                  autoCapitalize='none'
                  autoComplete='password'
                  autoCorrect='off'
                  disabled={false}
                  {...register('password')}
                />
                {errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
              </div>
              <div className='grid gap-1'>
                <Label className='sr-only' htmlFor='password'>
                  Пароль
                </Label>
                <Input
                  id='confirmPassword'
                  placeholder='Повтор нового пароля'
                  type='password'
                  autoCapitalize='none'
                  autoComplete='password'
                  autoCorrect='off'
                  disabled={false}
                  {...register('confirmPassword')}
                />
                {errors?.confirmPassword && (
                  <p className='px-1 text-xs text-red-600'>{errors.confirmPassword.message}</p>
                )}
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
