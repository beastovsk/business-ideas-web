'use client';

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';

import {Badge} from '@/components/ui/badge';
import {formatProductPrice} from '@/src/helpers/hooks';
import {Avatar} from '@/components/ui/avatar';
import {useQuery} from 'react-query';
import {getAllOperations} from '@/data/api/operations';
import {Skeleton} from '@/components/ui/skeleton';

export const Operations = () => {
  const {data, isLoading, isSuccess} = useQuery('operations', () => getAllOperations({isLatest: false}));

  return (
    <div>
      {' '}
      <div className='flex items-center justify-between space-y-2 mb-10'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Список операций</h2>
          <p className='text-muted-foreground'>Здесь вы можете следить за вашими операциями</p>
        </div>
        <div className='flex items-center space-x-2'>
          <Avatar />
        </div>
      </div>
      <Card x-chunk='dashboard-06-chunk-0'>
        <CardHeader></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Тип операции</TableHead>
                <TableHead className='hidden md:table-cell'>Статус</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead className='hidden md:table-cell'>Дата</TableHead>
                <TableHead>
                  <span className='sr-only'>Действия</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isSuccess
                ? data.operations.map(({amount, date, id, status, type}) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell className='font-medium'>{type}</TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <Badge variant='outline'>{status}</Badge>
                      </TableCell>
                      <TableCell>{formatProductPrice(amount)}</TableCell>
                      <TableCell className='hidden md:table-cell'>{date}</TableCell>
                    </TableRow>
                  ))
                : null}
              {isSuccess && !data.operations.length ? (
                <TableRow>
                  <TableCell colSpan={5} className='h-24 text-center'>
                    Нет результатов.
                  </TableCell>
                </TableRow>
              ) : null}
              {isLoading
                ? Array.from(Array(5).keys()).map(() => (
                    <TableRow>
                      <TableCell>
                        <Skeleton className='h-5 w-[250px]' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-5 w-[250px]' />
                      </TableCell>
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
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className='text-xs text-muted-foreground'>
            <strong>{isSuccess ? data.operations.length : 0}</strong> операций
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
