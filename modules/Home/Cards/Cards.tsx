import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Album, BookMarked, DollarSign, LayoutDashboard, Reply} from 'lucide-react';

export const Cards = () => {
  const cards = [
    {
      title: 'Потрачено средств',
      subtitle: '1,200 RUB',
      description: 'за все время',
      icon: <DollarSign className='h-4 w-4 text-muted-foreground' />
    },
    {
      title: 'Количество идей для продуктов',
      subtitle: '+23',
      description: 'за все время',
      icon: <Album className='h-4 w-4 text-muted-foreground' />
    },
    {
      title: 'Количество успешных идей',
      subtitle: '+2',
      description: 'за все время',
      icon: <LayoutDashboard className='h-4 w-4 text-muted-foreground' />
    }
  ];

  return (
    <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
      {cards.map(({description, icon, subtitle, title}) => (
        <Card x-chunk='dashboard-01-chunk-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{subtitle}</div>
            <p className='text-xs text-muted-foreground'>{description}</p>
          </CardContent>
        </Card>
      ))}

      <Card x-chunk='dashboard-01-chunk-3'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Последняя идея</CardTitle>
          <BookMarked className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='flex gap-2 items-center cursor-pointer text-2xl font-bold hover:opacity-70 transition-opacity'>
            SaSS продук... <Reply />
          </div>
          <p className='text-xs text-muted-foreground'>платформа для ...</p>
        </CardContent>
      </Card>
    </div>
  );
};
