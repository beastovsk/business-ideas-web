import {AlertCircle} from 'lucide-react';

import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

type AlertType = {
  variant: 'default' | 'destructive';
  title: string;
  description: string;
};

export function AlertDestructive({variant, title, description}: AlertType) {
  return (
    <Alert variant={variant}>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
