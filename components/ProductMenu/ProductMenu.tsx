'use client';

import {DotsHorizontalIcon} from '@radix-ui/react-icons';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {useMutation, useQuery} from 'react-query';
import {deleteProductById, getAllProducts} from '../../data/api/products';
import {useToast} from '../ui/use-toast';
import {useEffect} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {GetUser} from '@/data/api/user';

export function ProductMenu({id}) {
  const params = useSearchParams();
  console.log(params.has('id'));
  const {mutate, isSuccess} = useMutation(deleteProductById);
  const {refetch: productsRefetch} = useQuery('products', () => getAllProducts({isLatest: false}));
  const {refetch: userRefetch} = useQuery('user', GetUser);
  const {toast} = useToast();
  const {push} = useRouter();

  useEffect(() => {
    if (!isSuccess) return;

    productsRefetch();
    userRefetch();
  }, [isSuccess]);

  const handleDeleteProduct = () => {
    mutate(
      {id},
      {
        onSuccess: (data) => {
          toast({title: 'Уведомление об удалении', description: data.message});
          push('/home/products');
        }
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Открыть меню</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {/* Params has only detail page, so we need link only in products list*/}
        {!params.has('id') ? (
          <>
            <Link href={`/home/products?id=${id}`} className='cursor-pointer'>
              <DropdownMenuItem>Перейти</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        ) : null}

        <DropdownMenuItem onClick={() => toast({title: 'Уведомление проекта', description: 'В разработке'})}>
          Начать проект
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteProduct}>
          Удалить
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
