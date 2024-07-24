import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {GiftIcon, MapIcon, MedalIcon, PlaneIcon} from './Icons';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: 'Регистрация',
    description: 'Создание аккаунта в Startup Idea'
  },
  {
    icon: <MapIcon />,
    title: 'Заполнение формы',
    description: 'Заполняете поля о ваших пожеланиях к продукту. Ваш бюджет, желаемую нишу, ЦА и личные комментарии'
  },
  {
    icon: <PlaneIcon />,
    title: 'Процесс генерации',
    description: 'Ожидаете процесс создания вашего идеального продукта'
  },
  {
    icon: <GiftIcon />,
    title: 'Результат',
    description: 'Получаете подробную информацию о продукте, редактируйте под себя и сохраняете в бэклог'
  }
];

export const HowItWorks = () => {
  return (
    <section id='howItWorks' className='container text-center py-24 sm:py-32'>
      <h2 className='text-3xl md:text-4xl font-bold '>
        Как это{' '}
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>Работает, </span>
        Пошаговое обучение
      </h2>
      <p className='md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground'>
        Ниже описан сценарий для генерации успешного продукта
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {features.map(({icon, title, description}: FeatureProps) => (
          <Card key={title} className='bg-muted/50'>
            <CardHeader>
              <CardTitle className='grid gap-4 place-items-center'>
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
