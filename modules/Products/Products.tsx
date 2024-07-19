'use client';

import {GenerateModal} from '@/components/GenerateModal/GenerateModal';
import {Product} from '@/components/Product/Product';
import {columns} from '@/components/ProductsTable/columns';
import {DataTable} from '@/components/ProductsTable/data-table';
import {getAllProducts} from '@/data/api/products';
import {getCookie} from 'cookies-next';
import {useSearchParams} from 'next/navigation';
import {useQuery} from 'react-query';

export const Products = () => {
  const searchParams = useSearchParams();
  const {data, isLoading, isSuccess} = useQuery('products', () => getAllProducts({isLatest: false}));
  const token = getCookie('token');
  const id = searchParams.get('id');

  if (id) {
    return <Product id={id} />;
  }

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-0 flex'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Список продуктов</h2>
          <p className='text-muted-foreground'>Здесь находятся все ваши сгенерированные продукты</p>
        </div>
        <div className='flex items-center space-x-2'>
          <GenerateModal />
        </div>
      </div>
      <DataTable isLoading={isLoading} data={isSuccess ? data.products : []} columns={columns} />
    </div>
  );
};
