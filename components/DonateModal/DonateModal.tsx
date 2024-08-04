'use client';

import * as React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Toggle} from '@/components/ui/toggle';
import {CirclePlus, CreditCard} from 'lucide-react'; // Assume you have these icons
import {ScrollArea} from '../ui/scroll-area';
import {useMutation, useQuery} from 'react-query';
import {CreateTransaction, GetUser} from '@/data/api/user';
import {Icons} from '../ui/icons';
import {useToast} from '../ui/use-toast';
import {useRouter} from 'next/navigation';

const paymentMethods = [
  {label: 'Карта', value: 'card', icon: <CreditCard />}
  // Добавьте другие методы оплаты здесь
];

const donateSchema = z.object({
  paymentMethod: z.string().nonempty('Выберите способ оплаты'),
  fullName: z.string().nonempty('Введите ФИО'),
  amount: z.string().nonempty('Введите сумму больше 0'),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, 'Введите корректный номер телефона')
});

type DonateFormValues = z.infer<typeof donateSchema>;

export const DonateModal = () => {
  const {toast} = useToast();
  const {mutate, isLoading} = useMutation(CreateTransaction);
  const {refetch} = useQuery('user', GetUser);
  const {
    handleSubmit,
    control,
    formState: {errors}
  } = useForm<DonateFormValues>({
    resolver: zodResolver(donateSchema)
  });
  const {push} = useRouter();

  const onSubmit = ({amount, fullName, paymentMethod, phoneNumber}: DonateFormValues) => {
    refetch();

    mutate(
      {amount, fullName, paymentMethod, phoneNumber},
      {
        onSuccess: (data) => {
          if (data.message) toast({title: 'Уведомление о пополнении', description: data.description});
          localStorage.setItem('paymentMethod', 'card');
          localStorage.setItem('uuid', data.id);
          localStorage.setItem('amount', amount);
          push(data.confirmation.confirmation_url);

          refetch();
        }
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Пополнение баланса</DialogTitle>
          <DialogDescription>Заполните форму ниже, чтобы пополнить баланс</DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <form className='space-y-5 px-3' onSubmit={handleSubmit(onSubmit)}>
            {/* Выбор способа оплаты */}
            <div>
              <Label htmlFor='paymentMethod'>Способ оплаты</Label>
              <Controller
                name='paymentMethod'
                control={control}
                render={({field}) => (
                  <div className='flex space-x-2'>
                    {paymentMethods.map((method) => (
                      <Toggle
                        key={method.value}
                        variant='outline'
                        size='lg'
                        className='p-5 py-10'
                        pressed={field.value === method.value}
                        onPressedChange={() => field.onChange(method.value)}
                      >
                        <div className='flex flex-col items-center space-x-1'>
                          {method.icon} <span>{method.label}</span>
                        </div>
                      </Toggle>
                    ))}
                  </div>
                )}
              />
              {errors.paymentMethod && <p className='text-red-500 text-sm'>{errors.paymentMethod.message}</p>}
            </div>

            {/* Поле ФИО */}
            <div>
              <Label htmlFor='fullName'>ФИО</Label>
              <Controller
                name='fullName'
                control={control}
                render={({field}) => <Input disabled={isLoading} id='fullName' {...field} />}
              />
              {errors.fullName && <p className='text-red-500 text-sm'>{errors.fullName.message}</p>}
            </div>

            {/* Поле Номер телефона */}
            <div>
              <Label htmlFor='phoneNumber'>Номер телефона</Label>
              <Controller
                name='phoneNumber'
                control={control}
                render={({field}) => <Input disabled={isLoading} id='phoneNumber' {...field} />}
              />
              {errors.phoneNumber && <p className='text-red-500 text-sm'>{errors.phoneNumber.message}</p>}
            </div>

            {/* Поле Номер телефона */}
            <div>
              <Label htmlFor='amount'>Сумма пополнения</Label>
              <Controller
                name='amount'
                control={control}
                render={({field}) => <Input disabled={isLoading} id='amount' {...field} />}
              />
              {errors.amount && <p className='text-red-500 text-sm'>{errors.amount.message}</p>}
            </div>

            <DialogFooter className='mt-10'>
              <Button disabled={isLoading} type='submit'>
                {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                Отправить
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
