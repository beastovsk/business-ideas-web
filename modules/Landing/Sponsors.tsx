import {Radar} from 'lucide-react';

import mh from '@/src/assets/mh.svg';
import Image from 'next/image';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {CalendarIcon} from '@radix-ui/react-icons';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';

import mhLogo from '@/src/assets/mh-logo.png';
import Link from 'next/link';

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <Radar size={34} />,
    name: 'Sponsor place'
  },
  {
    icon: <Radar size={34} />,
    name: 'Sponsor place'
  }
];

export const Sponsors = () => {
  return (
    <section id='sponsors' className='container pt-24 sm:py-32'>
      <h2 className='text-center text-md lg:text-xl font-bold mb-8 text-primary'>Компании-партнеры, инвестора</h2>

      <div className='flex flex-wrap justify-center items-center gap-4 md:gap-8'>
        {sponsors.map(({icon, name}: SponsorProps) => (
          <div key={name} className='flex items-center gap-1 text-muted-foreground/60'>
            <span>{icon}</span>
            <h3 className='text-xl  font-bold'>{name}</h3>
          </div>
        ))}{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant='link' className='hover:opacity-70 transition-opacity'>
              {' '}
              <Image src={mh} alt='' width={150} height={150} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className='w-80'>
            <div className='flex justify-between space-x-4'>
              <Avatar>
                <AvatarImage src={mhLogo.src} />
                <AvatarFallback>MH</AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <Link href='https://marketing-helper.ru' className='hover:opacity-70 transition-opacity'>
                  <h4 className='text-sm font-semibold'>@marketing-helper</h4>
                </Link>
                <p className='text-sm'>
                  Анализируем ваши продукты для бизнеса с помощью ИИ и даем рекомендации для улучшения
                </p>
                <div className='flex items-center pt-2'>
                  <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                  <span className='text-xs text-muted-foreground'>С нами с 2023 года</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  );
};
