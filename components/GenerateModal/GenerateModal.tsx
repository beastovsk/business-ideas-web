'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectValue, SelectTrigger, SelectContent, SelectItem} from '@/components/ui/select';
import {ScrollArea} from '../ui/scroll-area';
import Loading from '@/app/loading';
import {useMutation, useQuery} from 'react-query';
import {generateProduct, getAllProducts} from '@/data/api/products';
import {useToast} from '../ui/use-toast';
import {useRouter} from 'next/navigation';
import {DonateModal} from '../DonateModal/DonateModal';

export const GenerateModal = () => {
  const {mutate, isLoading} = useMutation(generateProduct);
  const {refetch} = useQuery('products', () => getAllProducts({isLatest: false}));
  const {toast} = useToast();
  const [niche, setNiche] = useState('');
  const [showOtherNiche, setShowOtherNiche] = useState(false);
  const [targetAudience, setTargetAudience] = useState('');
  const [showProfession, setShowProfession] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [formData, setFormData] = useState({
    niche: '',
    otherNiche: '',
    budgetFrom: '',
    budgetTo: '',
    targetAudience: '',
    profession: '',
    productType: '',
    market: '',
    implementationTime: '',
    comments: ''
  });

  const loadingText = [
    'Продумываем название продукта',
    'Разрабатываем описание продукта',
    'Определяем ключевые особенности и преимущества',
    'Анализируем целевую аудиторию',
    'Проводим анализ рынка',
    'Выделяем конкурентные преимущества',
    'Оцениваем бюджет и сроки',
    'Определяем возможные вызовы и решения',
    'Предлагаем дополнительные рекомендации',
    'Создаем уникальное предложение продукта'
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingText.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading, loadingText.length]);

  const onSubmit = () => {
    mutate(
      {...formData},
      {
        onSuccess: (data) => {
          if (data.message) toast({title: 'Уведомление о генерации продукта', description: data.message});
          if (data.message === 'Недостаточно средств для генерации') return;
          refetch();
        }
      }
    );
  };

  const handleNicheChange = (value) => {
    setNiche(value);
    setShowOtherNiche(value === 'Other');
    setFormData((prev) => ({...prev, niche: value}));
  };

  const handleTargetAudienceChange = (value) => {
    setTargetAudience(value);
    setShowProfession(value === 'Профессионалы в определенной области');
    setFormData((prev) => ({...prev, targetAudience: value}));
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Сгенерировать продукт</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Генерация продукта</DialogTitle>
          <DialogDescription>Заполните поля ниже, чтобы получить более подходящий продукт</DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[540px]'>
          {isLoading ? (
            <div className='flex flex-col items-center justify-center h-full mt-20'>
              <div className='text-md font-semibold text-center'>{loadingText[loadingIndex]}</div>
              <p className='text-sm text-gray-500 text-center'>Пожалуйста подождите</p>
              <div className='w-10 h-10 mt-5'>
                <Loading />
              </div>
            </div>
          ) : (
            <form className='space-y-5 px-3'>
              {/* Ниша */}
              <div>
                <Label htmlFor='niche'>Ниша</Label>
                <Select value={niche} onValueChange={handleNicheChange}>
                  <SelectTrigger id='niche'>
                    <SelectValue placeholder='Выберите нишу' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Технологии'>Технологии</SelectItem>
                    <SelectItem value='Здоровье и фитнес'>Здоровье и фитнес</SelectItem>
                    <SelectItem value='Образование'>Образование</SelectItem>
                    <SelectItem value='Финансы'>Финансы</SelectItem>
                    <SelectItem value='Электронная коммерция'>Электронная коммерция</SelectItem>
                    <SelectItem value='Развлечения'>Развлечения</SelectItem>
                    <SelectItem value='Путешествия'>Путешествия</SelectItem>
                    <SelectItem value='Дом и сад'>Дом и сад</SelectItem>
                    <SelectItem value='Автомобили'>Автомобили</SelectItem>
                    <SelectItem value='Красота и мода'>Красота и мода</SelectItem>
                    <SelectItem value='Other'>Другое</SelectItem>
                  </SelectContent>
                </Select>
                {showOtherNiche && (
                  <Input
                    id='otherNiche'
                    name='otherNiche'
                    placeholder='Введите вашу нишу'
                    className='mt-2'
                    value={formData.otherNiche}
                    onChange={handleChange}
                  />
                )}
              </div>

              {/* Бюджет */}
              <div className='flex flex-col gap-5'>
                <div>
                  <Label htmlFor='budgetFrom'>Бюджет (От)</Label>
                  <Input
                    id='budgetFrom'
                    name='budgetFrom'
                    type='number'
                    value={formData.budgetFrom}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor='budgetTo'>Бюджет (До)</Label>
                  <Input
                    id='budgetTo'
                    name='budgetTo'
                    type='number'
                    value={formData.budgetTo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Целевая аудитория */}
              <div>
                <Label htmlFor='targetAudience'>Целевая аудитория</Label>
                <Select value={targetAudience} onValueChange={handleTargetAudienceChange}>
                  <SelectTrigger id='targetAudience'>
                    <SelectValue placeholder='Выберите целевую аудиторию' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Дети'>Дети</SelectItem>
                    <SelectItem value='Подростки'>Подростки</SelectItem>
                    <SelectItem value='Взрослые'>Взрослые</SelectItem>
                    <SelectItem value='Пожилые люди'>Пожилые люди</SelectItem>
                    <SelectItem value='Бизнесмены'>Бизнесмены</SelectItem>
                    <SelectItem value='Домохозяйки'>Домохозяйки</SelectItem>
                    <SelectItem value='Профессионалы в определенной области'>
                      Профессионалы в определенной области
                    </SelectItem>
                  </SelectContent>
                </Select>
                {showProfession && (
                  <Input
                    id='profession'
                    name='profession'
                    placeholder='Введите профессию'
                    className='mt-2'
                    value={formData.profession}
                    onChange={handleChange}
                  />
                )}
              </div>

              {/* Тип продукта */}
              <div>
                <Label htmlFor='productType'>Тип продукта</Label>
                <Select
                  value={formData.productType}
                  onValueChange={(value) => setFormData((prev) => ({...prev, productType: value}))}
                >
                  <SelectTrigger id='productType'>
                    <SelectValue placeholder='Выберите тип продукта' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Физический товар'>Физический товар</SelectItem>
                    <SelectItem value='Цифровой продукт'>Цифровой продукт</SelectItem>
                    <SelectItem value='Услуга'>Услуга</SelectItem>
                    <SelectItem value='Программное обеспечение'>Программное обеспечение</SelectItem>
                    <SelectItem value='Приложение'>Приложение</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Рынок */}
              <div>
                <Label htmlFor='market'>Рынок</Label>
                <Select
                  value={formData.market}
                  onValueChange={(value) => setFormData((prev) => ({...prev, market: value}))}
                >
                  <SelectTrigger id='market'>
                    <SelectValue placeholder='Выберите рынок' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Местный'>Местный</SelectItem>
                    <SelectItem value='Региональный'>Региональный</SelectItem>
                    <SelectItem value='Национальный'>Национальный</SelectItem>
                    <SelectItem value='Международный'>Международный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Время на реализацию */}
              <div>
                <Label htmlFor='implementationTime'>Время на реализацию</Label>
                <Select
                  value={formData.implementationTime}
                  onValueChange={(value) => setFormData((prev) => ({...prev, implementationTime: value}))}
                >
                  <SelectTrigger id='implementationTime'>
                    <SelectValue placeholder='Выберите время на реализацию' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Менее 3 месяцев'>Менее 3 месяцев</SelectItem>
                    <SelectItem value='3-6 месяцев'>3-6 месяцев</SelectItem>
                    <SelectItem value='6-12 месяцев'>6-12 месяцев</SelectItem>
                    <SelectItem value='Более 12 месяцев'>Более 12 месяцев</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Дополнительные комментарии */}
              <div>
                <Label htmlFor='comments'>Дополнительные комментарии</Label>
                <Textarea id='comments' name='comments' value={formData.comments} onChange={handleChange} />
              </div>

              <DialogFooter className='mt-10'>
                <Button type='button' onClick={onSubmit}>
                  Отправить
                </Button>
              </DialogFooter>
            </form>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
