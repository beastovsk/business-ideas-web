import {columns} from '@/components/ProductsTable/columns';
import {DataTable} from '@/components/ProductsTable/data-table';
import {tasks} from '@/components/ProductsTable/tasks';
import {Avatar} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';

export const Products = () => {
  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Список продуктов</h2>
          <p className='text-muted-foreground'>Здесь находятся все ваши сгенерированные продукты</p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button>Сгенерировать продукт</Button>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
};
