import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons';
import {PartyPopper, Star} from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug'
  },
  {
    value: 'feature',
    label: 'Feature'
  },
  {
    value: 'documentation',
    label: 'Documentation'
  }
];

export const statuses = [
  {
    value: 'created',
    label: 'Создано',
    icon: PartyPopper
  },
  {
    value: 'favourite',
    label: 'Избранное',
    icon: Star
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
  }
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon
  }
];
