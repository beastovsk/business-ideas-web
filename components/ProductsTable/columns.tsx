'use client';

import {labels, priorities, statuses} from './data';
import {DataTableRowActions} from './data-table-row-actions';
import {Badge} from '../ui/badge';
import {DataTableColumnHeader} from './data-table-column-header';
import Link from 'next/link';

export const columns = [
  {
    accessorKey: 'id',
    header: ({column}) => <DataTableColumnHeader column={column} title='Продукт' />,
    cell: ({row}) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: ({column}) => <DataTableColumnHeader column={column} title='Название' />,
    cell: ({row}) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <Link
          href={`/home/products?id=${row.getValue('id')}`}
          className='flex space-x-2 cursor-pointer hover:opacity-70 transition-opacity'
        >
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('title')}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'status',
    header: ({column}) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({row}) => {
      const status = statuses.find((status) => status.value === row.getValue('status'));

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'priority',
    header: ({column}) => <DataTableColumnHeader column={column} title='Приоритет' />,
    cell: ({row}) => {
      const priority = priorities.find((priority) => priority.value === row.getValue('priority'));

      if (!priority) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} />
  }
];
