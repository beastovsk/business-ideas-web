export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: '1.2К',
      description: 'Пользователей'
    },
    {
      quantity: '5К+',
      description: 'Продуктов создано'
    },
    {
      quantity: '2МЛН+',
      description: 'Доход продуктов'
    },
    {
      quantity: '600+',
      description: 'В разработке'
    }
  ];

  return (
    <section id='statistics'>
      <div className='grid grid-cols-1 mt-5 sm:mt-0 lg:grid-cols-4 gap-8'>
        {stats.map(({quantity, description}: statsProps) => (
          <div key={description} className='space-y-2 text-center'>
            <h2 className='text-3xl sm:text-4xl font-bold '>{quantity}</h2>
            <p className='text-xl text-muted-foreground'>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
