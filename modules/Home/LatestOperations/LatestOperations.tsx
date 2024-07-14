import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {formatProductPrice} from '@/src/helpers/hooks';

const operationsList = [
  {title: 'Пополнение', date: '12.07.2024', amount: 200, type: 'receive'},
  {title: 'Возврат', date: '13.07.2024', amount: 57, type: 'cancel'},
  {title: 'Покупка', date: '13.07.2024', amount: 100, type: 'confirm'}
];

export const LatestOperations = () => {
  return (
    <Card x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle>Недавние операции</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        {operationsList.map(({amount, date, title, type}) => (
          <div className='flex items-center gap-4'>
            <Avatar className='hidden h-9 w-9 sm:flex'>
              <AvatarImage src='/avatars/01.png' alt='Avatar' />
              <AvatarFallback>BI</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              <p className='text-sm font-medium leading-none'>{title}</p>
              <p className='text-sm text-muted-foreground'>{date}</p>
            </div>
            <div className='ml-auto font-medium'>
              {type === 'receive' || type === 'cancel' ? '+' : '-'}
              {formatProductPrice(amount)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
