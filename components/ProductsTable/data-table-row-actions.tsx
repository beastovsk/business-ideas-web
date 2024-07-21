'use client';

import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import {Row} from '@tanstack/react-table';

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
import {useRouter} from 'next/navigation';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({row}: DataTableRowActionsProps<TData>) {
  const id = row.getValue('id');
  const {mutate, isSuccess} = useMutation(deleteProductById);
  const {refetch} = useQuery('products', () => getAllProducts({isLatest: false}));
  const {toast} = useToast();
  const {push} = useRouter();

  useEffect(() => {
    if (!isSuccess) return;

    refetch();
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
        <Link href={`/home/products?id=${id}`} className='cursor-pointer'>
          <DropdownMenuItem>Перейти</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => toast({title: 'Уведомление продукта', description: 'В разработке'})}>
          Избранное
        </DropdownMenuItem>

        <DropdownMenuSeparator />
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
