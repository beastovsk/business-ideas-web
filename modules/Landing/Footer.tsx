import {Offer} from '@/components/Docs/Offer';
import {BriefcaseBusiness} from 'lucide-react';

export const Footer = () => {
  return (
    <footer id='footer'>
      <hr className='w-11/12 mx-auto' />

      <section className='container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8'>
        <div className='col-span-full xl:col-span-2'>
          <a rel='noreferrer noopener' href='/' className='font-bold text-xl flex'>
            <BriefcaseBusiness className='mr-2' />
            Startup Idea
          </a>
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='font-bold text-lg'>Соц. сети</h3>
          <div>
            <a
              rel='noreferrer noopener'
              href='https://www.youtube.com/@beastovsk'
              className='opacity-60 hover:opacity-100'
            >
              Youtube
            </a>
          </div>

          <div>
            <a rel='noreferrer noopener' href='https://t.me/beastovsk' className='opacity-60 hover:opacity-100'>
              Telegram
            </a>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='font-bold text-lg'>Документы</h3>
          <div>
            <Offer />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='font-bold text-lg'>Сервис</h3>
          <div>
            <a rel='noreferrer noopener' href='#about' className='opacity-60 hover:opacity-100'>
              О нас
            </a>
          </div>

          <div>
            <a rel='noreferrer noopener' href='#pricing' className='opacity-60 hover:opacity-100'>
              Цены
            </a>
          </div>

          <div>
            <a rel='noreferrer noopener' href='#faq' className='opacity-60 hover:opacity-100'>
              Вопросы
            </a>
          </div>
        </div>
      </section>

      <section className='container pb-14 text-center'>
        <h3>&copy; 2024 Startup Idea, Наршинов А.А. ИНН 645326949589</h3>
      </section>
    </footer>
  );
};
