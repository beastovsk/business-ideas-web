import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

const productsList = [
  {id: 0, label: 'SaSS платформа', description: 'Анализ продуктов', date: '14.07.2024', amount: 20},
  {id: 1, label: 'SaSS платформа', description: 'Анализ продуктов', date: '14.07.2024', amount: 20}
];

export const LatestProducts = () => {
  return (
    <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-col md:flex-row items-end md:items-center'>
        <div className='grid gap-2'>
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
            {productsList.map(({id, amount, date, description, label}) => (
              <TableRow className='cursor-pointer'>
                <TableCell className='truncate'>
                  <Link href={`/home/products/${id}`} key={id}>
                    <div className='font-medium truncate'>{label}</div>
                    <div className='hidden text-sm text-muted-foreground md:inline truncate'>{description}</div>{' '}
                  </Link>
                </TableCell>
                <TableCell className='hidden md:table-cell truncate'>{date}</TableCell>
                <TableCell className='text-right truncate'>{amount} RUB</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
