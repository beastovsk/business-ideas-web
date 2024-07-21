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
import {ProductMenu} from '../ProductMenu/ProductMenu';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({row}: DataTableRowActionsProps<TData>) {
  const id = row.getValue('id');

  return <ProductMenu id={id} />;
}
