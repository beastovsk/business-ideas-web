'use client';

import * as React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {userAuthSchema} from '@/lib/validation/auth';
import {Icons} from '../ui/icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    // const signInResult = await signIn('email', {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get('from') || '/dashboard'
    // });

    // setIsLoading(false);

    // if (!signInResult?.ok) {
    //   return toast({
    //     title: 'Something went wrong.',
    //     description: 'Your sign in request failed. Please try again.',
    //     variant: 'destructive'
    //   });
    // }

    // return toast({
    //   title: 'Check your email',
    //   description: 'We sent you a login link. Be sure to check your spam too.'
    // });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Почта
            </Label>
            <Input
              id='email'
              placeholder='yourtemplatemail@mail.ru'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && <p className='px-1 text-xs text-red-600'>{errors.email.message}</p>}
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Пароль
            </Label>
            <Input
              id='password'
              placeholder='******'
              type='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Войти через почту
          </Button>
        </div>
      </form>
    </div>
  );
}
