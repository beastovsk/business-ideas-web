import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {formatProductPrice} from '@/src/helpers/hooks';
import {Avatar} from '@/components/ui/avatar';

const operationsList = [
  {
    id: 1,
    type: 'Deposit',
    amount: 100,
    date: '24.07.15',
    status: 'Completed'
  },
  {
    id: 2,
    type: 'Deposit',
    amount: 100,
    date: '24.07.15',
    status: 'Completed'
  },
  {
    id: 3,
    type: 'Deposit',
    amount: 100,
    date: '24.07.15',
    status: 'Completed'
  },
  {
    id: 4,
    type: 'Deposit',
    amount: 100,
    date: '24.07.15',
    status: 'Completed'
  }
];

export const Operations = () => {
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
              {operationsList.map(({amount, date, id, status, type}) => (
                <TableRow>
                  <TableCell>{id}</TableCell>
                  <TableCell className='font-medium'>{type}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    <Badge variant='outline'>{status}</Badge>
                  </TableCell>
                  <TableCell>{formatProductPrice(amount)}</TableCell>
                  <TableCell className='hidden md:table-cell'>{date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className='text-xs text-muted-foreground'>
            <strong>{operationsList.length}</strong> операций
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
