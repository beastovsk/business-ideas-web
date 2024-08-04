'use client';

import {BriefcaseBusiness, CircleUser, Menu} from 'lucide-react';
import Link from 'next/link';
import {Button} from '../ui/button';
import {Sheet, SheetClose, SheetContent, SheetTrigger} from '../ui/sheet';
import {usePathname, useRouter} from 'next/navigation';
import {DonateModal} from '../DonateModal/DonateModal';
import {useEffect} from 'react';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {useToast} from '../ui/use-toast';
import {useMutation, useQuery} from 'react-query';
import {GetUser} from '@/data/api/user';
import {Skeleton} from '../ui/skeleton';
import {formatProductPrice} from '@/src/helpers/hooks';
import {useSearchParams} from 'next/navigation';
import {ConfirmTransaction} from '@/data/api/user';
import {getAllOperations} from '@/data/api/operations';

export const Header = () => {
  const pathname = usePathname();
  const {push} = useRouter();
  const {toast} = useToast();
  const search = useSearchParams();
  const hasPaymentStatus = Boolean(search.get('paymentStatus'));

  const {mutate, isLoading: isConfirmLoading} = useMutation(ConfirmTransaction);
  const {data, isLoading, isSuccess, refetch} = useQuery('user', GetUser);
  const {refetch: operationRefetch} = useQuery('operations', () => getAllOperations({isLatest: false}));

  const getLinkClassName = (path) => {
    return pathname === path ? 'text-foreground' : 'text-muted-foreground';
  };

  useEffect(() => {
    const token = getCookie('token');

    if (!token || data?.user === null) {
      toast({title: 'Уведомление', description: 'Сессия завершена, пожалуйста перезайдите в аккаунт'});
      deleteCookie('token');
      return push('/login');
    }

    if (isSuccess) {
      setCookie('email', data?.user?.email);
    }

    if (!hasPaymentStatus) return;

    if (isConfirmLoading) {
      toast({title: 'Проверяем статус оплаты', description: 'Подождите несколько секунд, мы проверяем ваш платеж'});
    }

    const uuid = localStorage.getItem('uuid');
    const paymentMethod = localStorage.getItem('paymentMethod');
    const amount = localStorage.getItem('amount');

    if (isSuccess) {
      mutate(
        {uuid, paymentMethod, amount},
        {
          onSuccess: (data) => {
            if (data.message) {
              toast({
                title: 'Уведомление по платежу',
                description: data.message
              });
            }

            localStorage.removeItem('uuid');
            localStorage.removeItem('paymentMethod');
            localStorage.removeItem('amount');

            operationRefetch();
            refetch();
            push('/home');
          }
        }
      );
    }
  }, [data]);

  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link href='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
          <BriefcaseBusiness className='h-6 w-6' />
          <span className='sr-only'>Business Ideas</span>
        </Link>
        <Link href='/home' className={`${getLinkClassName('/home/')} transition-colors hover:text-foreground`}>
          Главная
        </Link>
        <Link
          href='/home/products'
          className={`${getLinkClassName('/home/products/')} transition-colors hover:text-foreground`}
        >
          Продукты
        </Link>
        <Link
          href='/home/operations'
          className={`${getLinkClassName('/home/operations/')} transition-colors hover:text-foreground`}
        >
          Операции
        </Link>
        <Link
          href='/home/settings'
          className={`${getLinkClassName('/home/settings/')} transition-colors hover:text-foreground`}
        >
          Настройки
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
              <BriefcaseBusiness className='h-6 w-6' />
              <span className='sr-only'>Business Ideas</span>
            </Link>
            <SheetClose asChild>
              <Link href='/home' className={`${getLinkClassName('/home/')} transition-colors hover:text-foreground`}>
                Главная
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href='/home/products'
                className={`${getLinkClassName('/home/products/')} transition-colors hover:text-foreground`}
              >
                Продукты
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href='/home/operations'
                className={`${getLinkClassName('/home/operations/')} transition-colors hover:text-foreground`}
              >
                Операции
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href='/home/settings'
                className={`${getLinkClassName('/home/settings/')} transition-colors hover:text-foreground`}
              >
                Настройки
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <div className='flex gap-2 items-center'>
          <DonateModal />
          {isLoading ? <Skeleton className='h-6 w-[70px]' /> : formatProductPrice(data?.user?.balance)}
        </div>
        <Button variant='secondary' size='icon' className='rounded-full'>
          <CircleUser className='h-5 w-5' />
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
};
