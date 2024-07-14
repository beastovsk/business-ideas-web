import {Cards} from '@/modules/Home/Cards/Cards';
import {LatestOperations} from '@/modules/Home/LatestOperations/LatestOperations';
import {LatestProducts} from '@/modules/Home/LatestProducts/LatestProducts';
import React from 'react';

export default async function Page() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <Cards />
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <LatestProducts />
          <LatestOperations />
        </div>
      </main>
    </div>
  );
}
