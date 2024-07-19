'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Icons} from '@/components/ui/icons';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {useToast} from '@/components/ui/use-toast';
import {ChangeEmail} from '@/data/api/user';
import {changeEmailSchema} from '@/lib/validation/email';
import {zodResolver} from '@hookform/resolvers/zod';
import {setCookie} from 'cookies-next';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as z from 'zod';

type FormData = z.infer<typeof changeEmailSchema>;

export const Profile = () => {
  const {mutate, isLoading} = useMutation(ChangeEmail);
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormData>({
    resolver: zodResolver(changeEmailSchema)
  });

  async function onSubmit({newEmail, password}: FormData) {
    const currentEmail = localStorage.getItem('email');

    mutate(
      {currentEmail, newEmail, password},
      {
        onSuccess: (data) => {
          if (data.message) toast({title: 'Уведомление о смене почты', description: data.message});
          if (data.token) setCookie('token', data.token);
          localStorage.setItem('email', newEmail);
        }
      }
    );
  }

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
                  id='newEmail'
                  placeholder='Новая почта'
                  type='mail'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={false}
                  {...register('newEmail')}
                />
                {errors?.newEmail && <p className='px-1 text-xs text-red-600'>{errors.newEmail.message}</p>}
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
                  disabled={isLoading}
                  {...register('password')}
                />
                {errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
              </div>

              <Separator className='my-3' />
              <Button disabled={isLoading} className='w-max'>
                {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                Подтвердить
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
