import {buttonVariants} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Facebook, Instagram, Linkedin} from 'lucide-react';

import me from '@/src/assets/me.jpg';
import danil from '@/src/assets/danil.jpg';
import avatar from '@/src/assets/avatar.png';

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: me.src,
    name: 'Artyom Narshinov',
    position: 'Founder',
    description: 'Следим за качеством Startup Idea и продуктивностью ИИ'
  },
  {
    imageUrl: danil.src,
    name: 'Danil Kostenko',
    position: 'Co-Founder, Tech Lead',
    description: 'Защищаем техническую часть и ускоряем работу сервиса'
  },
  {
    imageUrl: avatar.src,
    name: 'Скрыто имя',
    position: 'Frontend Developer',
    description: 'Делаем чистый и приятный интерфейс сервиса'
  },
  {
    imageUrl: avatar.src,
    name: 'Скрыто имя',
    position: 'Backend Developer',
    description: 'Оптимизируем запросы и работаем с ИИ'
  }
];

export const Team = () => {
  return (
    <section id='team' className='container py-24 sm:py-32'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          Наша потрясающая{' '}
        </span>
        команда
      </h2>

      <p className='mt-4 mb-10 text-xl text-muted-foreground'>
        Все мы стараемся для улучшения пользовательского опыта и качества вашего нового продукта
      </p>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10'>
        {teamList.map(({imageUrl, name, position, description}: TeamProps) => (
          <Card key={name} className='bg-muted/50 relative mt-8 flex flex-col justify-center items-center'>
            <CardHeader className='mt-8 flex justify-center items-center pb-2'>
              <img
                src={imageUrl}
                alt={`${name} ${position}`}
                className='absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover'
              />
              <CardTitle className='text-center'>{name}</CardTitle>
              <CardDescription className='text-primary'>{position}</CardDescription>
            </CardHeader>

            <CardContent className='text-center pb-2'>
              <p>{description}</p>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
