import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export const Payments = () => {
  return (
    <div className='grid gap-6'>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Мы не сохраняем ваши платежные данные</CardTitle>
          <CardDescription>
            Все поля, которые вы заполняете при пополнении - запрашиваются исключительно платежной системой. Мы
            предоставляем полную безопасность и не имеем доступа к вашим платежным данным.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
