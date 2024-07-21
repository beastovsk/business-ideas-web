'use client';

import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useQuery} from 'react-query';
import {getAllProducts} from '@/data/api/products';
import {Skeleton} from '@/components/ui/skeleton';
import {formatProductPrice} from '@/src/helpers/hooks';
import moment from 'moment';

export const LatestProducts = () => {
  const {data, isLoading, isSuccess} = useQuery('latestProducts', () => getAllProducts({isLatest: true}));

  return (
    <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-col md:flex-row items-end md:items-center'>
        <div className='grid gap-2 w-full'>
          <CardTitle>Последние продукты</CardTitle>
          <CardDescription>Список последних сгенерированных продуктов</CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto gap-1'>
          <Link href='/home/products'>
            Посмотреть все <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Продукт</TableHead>
              <TableHead className='hidden md:table-cell'>Дата</TableHead>
              <TableHead className='text-right'>Сумма</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from(Array(5).keys()).map(() => (
                  <TableRow key={`skeleton-${Math.random()}`}>
                    <TableCell>
                      <Skeleton className='h-5 w-[250px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-5 w-[250px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-5 w-[250px]' />
                    </TableCell>
                  </TableRow>
                ))
              : null}
            {isSuccess
              ? data?.products?.map(({id, amount, date, description, title}) => (
                  <TableRow className='cursor-pointer' key={id}>
                    <TableCell className='truncate'>
                      <Link href={`/home/products?id=${id}`}>
                        <div className='font-medium truncate max-w-[80px] md:max-w-[200px] sm:max-w-[150px] xs:max-w-[100px] lg:max-w-[300px]'>
                          {title}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className='hidden md:table-cell truncate'>{moment(date).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className='text-right truncate'>{formatProductPrice(amount)}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {isSuccess && !data?.products?.length ? <p className='text-center mt-10'>Список пуст</p> : null}
      </CardContent>
    </Card>
  );
};
