'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
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
import {generateProductSchema} from '@/lib/validation/generate';
import {ScrollArea} from '../ui/scroll-area';

type FormData = z.infer<typeof generateProductSchema>;

export const GenerateModal = () => {
  const [niche, setNiche] = useState('');
  const [showOtherNiche, setShowOtherNiche] = useState(false);
  const [targetAudience, setTargetAudience] = useState('');
  const [showProfession, setShowProfession] = useState(false);
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

  const onSubmit = () => {
    console.log(formData);
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
                <Input id='budgetTo' name='budgetTo' type='number' value={formData.budgetTo} onChange={handleChange} />
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};