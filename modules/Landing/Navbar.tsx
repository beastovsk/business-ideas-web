'use client';
import {useState} from 'react';
import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from '@/components/ui/navigation-menu';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';

import {buttonVariants} from '@/components/ui/button';
import {ArrowRight, BriefcaseBusiness, Menu} from 'lucide-react';
import {getCookie} from 'cookies-next';
import Link from 'next/link';

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: '#features',
    label: 'Преимущества'
  },
  {
    href: '#howItWorks',
    label: 'Как это работает?'
  },
  {
    href: '#pricing',
    label: 'Цены'
  },
  {
    href: '#faq',
    label: 'Вопросы'
  }
];

export const Navbar = () => {
  const token = getCookie('token');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className='sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background'>
      <NavigationMenu className='mx-auto'>
        <NavigationMenuList className='container h-14 px-4 w-screen flex justify-between '>
          <NavigationMenuItem className='font-bold flex'>
            <a rel='noreferrer noopener' href='/' className='ml-2 font-bold text-xl flex items-center'>
              <BriefcaseBusiness className='mr-2' />
              Startup Idea
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className='flex md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className='px-2'>
                <Menu className='flex md:hidden h-5 w-5' onClick={() => setIsOpen(true)}>
                  <span className='sr-only'>Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className='font-bold text-xl'>Startup Idea</SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col justify-center items-center gap-2 mt-4'>
                  {routeList.map(({href, label}: RouteProps) => (
                    <a
                      rel='noreferrer noopener'
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({variant: 'ghost'})}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    rel='noreferrer noopener'
                    href='/register'
                    target='_blank'
                    className={`w-[110px] border ${buttonVariants({
                      variant: 'secondary'
                    })}`}
                  >
                    Начать <ArrowRight className='ml-2 w-5 h-5' />
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className='hidden md:flex gap-2'>
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel='noreferrer noopener'
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: 'ghost'
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className='hidden md:flex gap-2'>
            <Link
              rel='noreferrer noopener'
              href={token ? '/home' : '/register'}
              className={`border ${buttonVariants({variant: 'secondary'})}`}
            >
              {token ? 'Продолжить' : 'Начать'} <ArrowRight className='ml-2 w-5 h-5' />
            </Link>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
