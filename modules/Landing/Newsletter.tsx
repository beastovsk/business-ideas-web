import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

export const Newsletter = () => {
  return (
    <div id='newsletter'>
      <hr className='w-11/12 mx-auto' />

      <div className='container py-24 sm:py-32'>
        <h3 className='text-center text-4xl md:text-5xl font-bold'>
          Подпишитесь на{' '}
          <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
            ежедневную рассылку
          </span>
        </h3>
        <p className='text-xl text-muted-foreground text-center mt-4 mb-8'>
          Мы будем присылать информацию об обновлениях, новостях и дополнениях
        </p>

        <div className='flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2'>
          <Input placeholder='templatemail@mail.ru' className='bg-muted/50 dark:bg-muted/80 ' aria-label='email' />
          <Button>Подписаться</Button>
        </div>
      </div>

      <hr className='w-11/12 mx-auto' />
    </div>
  );
};
