import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Button, buttonVariants} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Check} from 'lucide-react';
import {LightBulbIcon} from './Icons';
import {GitHubLogoIcon} from '@radix-ui/react-icons';

import danil from '@/src/assets/danil.jpg';
import me from '@/src/assets/me.jpg';
import tg from '@/src/assets/tg.svg';
import Image from 'next/image';
import Link from 'next/link';
import {getCookie} from 'cookies-next';

export const HeroCards = () => {
  const token = getCookie('token');

  return (
    <div className='hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]'>
      <Card className='absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10'>
        <CardHeader className='flex flex-row items-center gap-4 pb-2'>
          <Avatar>
            <AvatarImage alt='' src={danil.src} />
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>

          <div className='flex flex-col'>
            <CardTitle className='text-lg'>Danil Kostenko</CardTitle>
            <CardDescription>
              <Link
                target='_blank'
                className='cursor-pointer hover:underline transition-transform'
                href='https://t.me/danilaKostenko'
              >
                @danilaKostenko{' '}
              </Link>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>Нашли способ искать проекты</CardContent>
      </Card>

      {/* Team */}
      <Card className='absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10'>
        <CardHeader className='mt-8 flex justify-center items-center pb-2'>
          <img
            src={me.src}
            alt='user avatar'
            className='absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover'
          />
          <CardTitle className='text-center'>Artyom Narshinov</CardTitle>
          <CardDescription className='font-normal text-primary'>Founder, CEO</CardDescription>
        </CardHeader>

        <CardContent className='text-center pb-4'>
          <p>
            Мы построили продукт, который сэкономит вам сил и креативности, используйте их в индивидуальность вашего
            продукта{' '}
          </p>
        </CardContent>

        <CardFooter>
          <div className='flex items-center'>
            <a
              rel='noreferrer noopener'
              href='https://github.com/beastovsk'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm'
              })}
            >
              <span className='sr-only'>Github icon</span>
              <GitHubLogoIcon className='w-7 h-7' />
            </a>
            <a
              rel='noreferrer noopener'
              href='https://t.me/beastovsk'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm'
              })}
            >
              <span className='sr-only'>TG icon</span>
              <Image alt='tg' src={tg} width={40} height={40} />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className='absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10'>
        <CardHeader>
          <CardTitle className='flex item-center justify-between'>
            Бесплатно
            <Badge variant='secondary' className='text-sm text-primary'>
              Популярно
            </Badge>
          </CardTitle>
          <div>
            <span className='text-3xl font-bold'>300₽</span>
            <span className='text-muted-foreground'> за регистрацию</span>
          </div>

          <CardDescription>Подходит для генерации полноценного проекта</CardDescription>
        </CardHeader>

        <CardContent>
          <Link href={token ? '/home' : '/register'}>
            <Button className='w-full'>{token ? 'Продолжить' : 'Начать бесплатно'}</Button>
          </Link>
        </CardContent>

        <hr className='w-4/5 m-auto mb-4' />

        <CardFooter className='flex'>
          <div className='space-y-4'>
            {['Название и описание продукта', 'Рекомендации и советы', 'Бюджет, сроки проекта и ЦА'].map(
              (benefit: string) => (
                <span key={benefit} className='flex'>
                  <Check className='text-green-500' /> <h3 className='ml-2'>{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className='absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10'>
        <CardHeader className='space-y-1 flex md:flex-row justify-start items-start gap-4'>
          <div className='mt-1 bg-primary/20 p-1 rounded-2xl'>
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Светлая и темная тема</CardTitle>
            <CardDescription className='text-md mt-2'>
              Мы заботимся о UI/UX решении и сделали удобный и красивый сервис
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
