'use client';

import {useEffect, useState, Fragment} from 'react';
import {usePathname} from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean); // Разбиваем путь и фильтруем пустые сегменты
    const items = segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const isLast = index === segments.length - 1;

      return {
        text: segment.charAt(0).toUpperCase() + segment.slice(1), // Делаем первую букву заглавной
        href,
        isLast
      };
    });

    setBreadcrumbItems(items);
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={index}>
            {index !== 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.text}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
