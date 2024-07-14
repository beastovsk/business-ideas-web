'use client';

import {BriefcaseBusiness, CirclePlus, CircleUser, Menu} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Button} from '../ui/button';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {usePathname} from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const getLinkClassName = (path) => {
    return pathname === path ? 'text-foreground' : 'text-muted-foreground';
  };


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
        </SheetContent>
      </Sheet>
      <div className='flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <div className='flex gap-2 items-center'>
          <Button variant='ghost' onClick={() => {}}>
            <CirclePlus />
          </Button>
          100 RUB
        </div>
        <Button variant='secondary' size='icon' className='rounded-full'>
          <CircleUser className='h-5 w-5' />
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
};
