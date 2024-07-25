'use client';

import React, {useEffect} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {userAuthSchema} from '@/lib/validation/auth';
import {Icons} from '../ui/icons';
import {useMutation} from 'react-query';
import {ConfirmEmail, LoginRequest, RegRequest} from '@/data/api/auth';
import {usePathname, useRouter} from 'next/navigation';
import {useToast} from '../ui/use-toast';
import {getCookie, setCookie} from 'cookies-next';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '../ui/dialog';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [confirmCode, setConfirmCode] = React.useState('');
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  });
  const {mutate: login, isLoading: isLoginLoading} = useMutation(LoginRequest);
  const {mutate: reg, isLoading: isRegLoading} = useMutation(RegRequest);
  const {mutate: confirm, isLoading: isConfirmLoading} = useMutation(ConfirmEmail);

  const token = getCookie('token');
  const {toast} = useToast();
  const {push} = useRouter();

  const isLoading = isLoginLoading || isRegLoading;

  const handleAuthRequest = (data) => {
    if (
      data.message === 'Подтверждение регистрации отправлено на вашу почту' ||
      data.message === 'Аккаунт не подтвержден. Проверьте вашу почту для подтверждения регистрации' ||
      data.message === 'Подтвердите почту'
    ) {
      setConfirmOpen(true);
    }
    if (data.message) toast({title: 'Уведомление', description: data.message});
    if (data.token) {
      setCookie('token', data.token);
      push('/home');
    }
  };

  async function onSubmit(data: FormData) {
    setEmail(data.email);
    if (pathname === '/register/') {
      return reg(data, {
        onSuccess: (data) => handleAuthRequest(data)
      });
    }

    login(data, {
      onSuccess: (data) => {
        handleAuthRequest(data);
      }
    });
  }

  const onConfirmCode = () => {
    confirm({confirmToken: confirmCode, email} as any, {
      onSuccess: (data) => {
        handleAuthRequest(data);
        setEmail('');
        setConfirmCode('');
      }
    });
  };

  useEffect(() => {
    if (token) {
      push('/home');
    }
  }, [token]);

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
            {pathname === '/register/' ? 'Создать аккаунт' : 'Войти'} через почту
          </Button>
        </div>
      </form>

      <Dialog open={confirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение почты</DialogTitle>
            <DialogDescription>
              Вам на почты был отправлен код для подтверждения, вставьте его пожалуйста в форму ниже.
            </DialogDescription>
          </DialogHeader>

          <Input
            disabled={isConfirmLoading}
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
            placeholder='8 символов'
            maxLength={8}
            className='text-center'
          />
          <Button disabled={isConfirmLoading} onClick={onConfirmCode}>
            {isConfirmLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Отправить
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
