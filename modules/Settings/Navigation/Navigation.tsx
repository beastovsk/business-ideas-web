'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();

  const getLinkClassName = (path) => {
    return pathname === path ? 'font-semibold text-primary' : '';
  };
  return (
    <nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
      <Link href='/home/settings/' className={getLinkClassName('/home/settings/')}>
        Профиль
      </Link>
      <Link href='/home/settings/security/' className={getLinkClassName('/home/settings/security/')}>
        Безопасность
      </Link>
      <Link href='/home/settings/payments/' className={getLinkClassName('/home/settings/payments/')}>
        Платежи
      </Link>
    </nav>
  );
};
