import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import image from '@/src/assets/growth.png';
import image3 from '@/src/assets/growth.png';
import image4 from '@/src/assets/growth.png';
import {Badge} from '@/components/ui/badge';
import Image, {StaticImageData} from 'next/image';

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const features: FeatureProps[] = [
  {
    title: 'Responsive Design',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    image: image4
  },
  {
    title: 'Intuitive user interface',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    image: image3
  },
  {
    title: 'AI-Powered insights',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    image: image
  }
];

const featureList: string[] = [
  'Название',
  'Описание',
  'Характеристики',
  'Преимущества',
  'Целевая аудитория',
  'Анализ рынка',
  'Конкурентные преимущества',
  'Предполагаемый бюджет и сроки',
  'Возможные проблемы и пути их решения',
  'Дополнительные рекомендации',
  'Уникальное торговое предложение'
];

export const Features = () => {
  return (
    <section id='features' className='container py-24 sm:py-32 space-y-8'>
      <h2 className='text-3xl lg:text-4xl font-bold md:text-center'>
        Вот что{' '}
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>Startup Idea</span>{' '}
        гарантированно покажет
      </h2>

      <div className='flex flex-wrap md:justify-center gap-4'>
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant='secondary' className='text-sm'>
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      {/* <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {features.map(({title, description, image}: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image src={image} alt='About feature' className='w-[200px] lg:w-[300px] mx-auto' />
            </CardFooter>
          </Card>
        ))}
      </div> */}
    </section>
  );
};
