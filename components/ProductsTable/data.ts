import {ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircledIcon, StopwatchIcon} from '@radix-ui/react-icons';
import {PartyPopper, Undo} from 'lucide-react';

export const labels = [
  {
    value: 'favourite',
    label: 'Избранное'
  }
];

export const statuses = [
  {
    value: 'created',
    label: 'Создано',
    icon: PartyPopper
  },
  {
    value: 'in_process',
    label: 'В процессе',
    icon: StopwatchIcon
  },
  {
    value: 'done',
    label: 'Завершено',
    icon: CheckCircledIcon
  },
  {
    value: 'closed',
    label: 'Закрыт',
    icon: Undo
  }
];

export const priorities = [
  {
    label: 'Низкий',
    value: 'low',
    icon: ArrowDownIcon
  },
  {
    label: 'Средний',
    value: 'medium',
    icon: ArrowRightIcon
  },
  {
    label: 'Высокий',
    value: 'high',
    icon: ArrowUpIcon
  }
];
