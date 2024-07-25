import {Button, buttonVariants} from '@/components/ui/button';
import {HeroCards} from './HeroCards';
import {ArrowDown} from 'lucide-react';

import Link from 'next/link';
import {getCookie} from 'cookies-next';

export const Hero = () => {
  const token = getCookie('token');

  return (
    <section className='container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10'>
      <div className='text-center lg:text-start space-y-6'>
        <main className='text-5xl md:text-6xl font-bold'>
          <h1 className='inline'>
            Находим{' '}
            <span className='inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text'>
              идеальную
            </span>{' '}
            бизнес-идею
          </h1>{' '}
          с помощью{' '}
          <h2 className='inline'>
            <span className='inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text'>
              ИИ
            </span>
          </h2>
        </main>

        <p className='text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0'>
          Единственный инструмент, который генерирует бизнес идеи на основе желаний и предпочтений
        </p>

        <div className='space-y-4 md:space-y-0 md:space-x-4'>
          <Link href={token ? '/home' : '/register'}>
            <Button className='w-full md:w-1/3'>{token ? 'Продолжить' : 'Начать'}</Button>
          </Link>
          <a
            rel='noreferrer noopener'
            href='#features'
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: 'outline'
            })}`}
          >
            Подробнее
            <ArrowDown className='ml-2 w-5 h-5' />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className='z-10'>
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className='shadow'></div>
    </section>
  );
};
