'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {getAllOperations} from '@/data/api/operations';
import {formatProductPrice} from '@/src/helpers/hooks';
import {useQuery} from 'react-query';

export const LatestOperations = () => {
  const {data, isLoading, isSuccess} = useQuery('latestOperations', () => getAllOperations({isLatest: true}));

  return (
    <Card x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle>Недавние операции</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        {isLoading
          ? Array.from(Array(5).keys()).map(() => (
              <>
                <Skeleton className='h-5 w-[250px]' />
              </>
            ))
          : null}
        {isSuccess
          ? data?.operations?.map(({id, amount, date, status, type}) => (
              <div className='flex items-center gap-4' key={id}>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/01.png' alt='Avatar' />
                  <AvatarFallback>BI</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>{type}</p>
                  <p className='text-sm text-muted-foreground'>{date}</p>
                </div>
                <div className='ml-auto font-medium'>
                  {type === 'receive' || type === 'cancel' ? '+' : '-'}
                  {formatProductPrice(amount)}
                </div>
              </div>
            ))
          : null}
        {isSuccess && !data?.operations?.length ? <p className='text-center mt-10'>Список пуст</p> : null}
      </CardContent>
    </Card>
  );
};
