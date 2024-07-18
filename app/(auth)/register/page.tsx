import {Metadata} from 'next';
import Link from 'next/link';

import {cn} from '@/lib/utils';
import {buttonVariants} from '@/components/ui/button';
import {Icons} from '@/components/ui/icons';
import {UserAuthForm} from '@/components/Auth/Auth';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account'
};

export default function LoginPage() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <Link href='/' className={cn(buttonVariants({variant: 'ghost'}), 'absolute left-4 top-4 md:left-8 md:top-8')}>
        <>
          <Icons.chevronLeft className='mr-2 h-4 w-4' />
          Назад
        </>
      </Link>{' '}
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <Icons.case className='mx-auto h-6 w-6' />
          <h1 className='text-2xl font-semibold tracking-tight'>Добро пожаловать</h1>
          <p className='text-sm text-muted-foreground'>Введите данные своего аккаунта для регистрации</p>
        </div>
        <UserAuthForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link href='/login' className='hover:text-brand underline underline-offset-4'>
            Уже зарегистрированы? Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
