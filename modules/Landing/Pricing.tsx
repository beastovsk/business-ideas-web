import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Check} from 'lucide-react';
import Link from 'next/link';

enum PopularPlanType {
  NO = 0,
  YES = 1
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: 'Генерация продукта',
    popular: 1,
    price: 100,
    description: 'Вы получаете все то, о чем мы писали выше',
    buttonText: 'Получить 300₽ бесплатно',
    benefitList: [
      'Общая информация о продукте',
      'Характеристики и преимущества',
      'Информация о рынке и аудитории',
      'Информация о создании продукта',
      'Уникальное торговое предложение'
    ]
  }
];

export const Pricing = () => {
  return (
    <section id='pricing' className='container py-24 sm:py-32'>
      <h2 className='text-3xl md:text-4xl font-bold text-center'>
        Постоянная
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          {' '}
          фиксированная{' '}
        </span>
        цена
      </h2>
      <h3 className='text-xl text-center text-muted-foreground pt-4 pb-8'>
        Мы генерируем продукты для ваших бизнесов за постоянную и низкую цену
      </h3>
      <div className='flex justify-center gap-8'>
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES ? 'drop-shadow-xl shadow-black/10 dark:shadow-white/10' : ''
            }
          >
            <CardHeader>
              <CardTitle className='flex item-center justify-between'>
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant='secondary' className='text-sm text-primary'>
                    Популярное
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className='text-3xl font-bold'>{pricing.price}₽</span>
                <span className='text-muted-foreground'> /продукт</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Link href='/register'>
                <Button className='w-full'>{pricing.buttonText}</Button>
              </Link>
            </CardContent>

            <hr className='w-4/5 m-auto mb-4' />

            <CardFooter className='flex'>
              <div className='space-y-4'>
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className='flex'>
                    <Check className='text-green-500' /> <h3 className='ml-2'>{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
