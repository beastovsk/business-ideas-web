'use client';

import {ChevronLeft} from 'lucide-react';
import {Badge} from '@/components/ui/badge';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import {useRouter} from 'next/navigation'; // Usage: App router

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

import {priorities} from '../ProductsTable/data';
import {useState} from 'react';
import {Input} from '../ui/input';
import {Textarea} from '../ui/textarea';

export const Product = ({id}) => {
  const router = useRouter();
  console.log(id);

  const [productDetails, setProductDetails] = useState({
    productName: 'Gamer Gear Pro Controller',
    productDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
    targetAudience: 'Gamers',
    marketAnalysis: 'Market analysis details here...',
    competitiveAdvantage: 'Competitive advantage details here...',
    estimatedBudget: 'Estimated budget details here...',
    potentialChallenges: 'Potential challenges and solutions here...',
    additionalRecommendations: 'Additional recommendations here...',
    uniqueOffer: 'Unique product offer here...'
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };
  const handleListChange = (name, index, value) => {
    setProductDetails((prevDetails) => {
      const newList = [...prevDetails[name]];
      newList[index] = value;
      return {...prevDetails, [name]: newList};
    });
  };
  const handleAddItem = (name) => {
    setProductDetails((prevDetails) => {
      const newList = [...prevDetails[name], ''];
      return {...prevDetails, [name]: newList};
    });
  };

  const handleRemoveItem = (name, index) => {
    setProductDetails((prevDetails) => {
      const newList = prevDetails[name].filter((_, i) => i !== index);
      return {...prevDetails, [name]: newList};
    });
  };

  return (
    <main className='grid flex-1 items-start gap-4 sm:p-4 sm:px-6 md:gap-8'>
      <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => router.back()}>
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Button>

          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            {productDetails.productName}
          </h1>

          <Badge variant='outline' className='ml-auto sm:ml-0'>
            Создано
          </Badge>
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Button variant='outline' size='sm'>
              Вернуть назад
            </Button>
            <Button size='sm'>Сохранить</Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Открыть меню</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
              <DropdownMenuItem>Избранное</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Начать проект</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Пожаловаться</DropdownMenuItem>
              <DropdownMenuItem>
                Удалить
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
            <Card x-chunk='dashboard-07-chunk-0'>
              <CardHeader>
                <CardTitle>Общая информация о продукте</CardTitle>
                <CardDescription>Предположительное название и описание</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='productName'>Название</Label>
                    <Input
                      id='productName'
                      name='productName'
                      value={productDetails.productName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='productDescription'>Описание</Label>
                    <Textarea
                      id='productDescription'
                      name='productDescription'
                      value={productDetails.productDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-07-chunk-1'>
              <CardHeader>
                <CardTitle>Характеристики и преимущества</CardTitle>
                <CardDescription>Список полезный для общего понимания продукта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-3 mb-5'>
                  <Label htmlFor='description'>Характеристики</Label>
                  <div>
                    <ul className='flex flex-col gap-2'>
                      {productDetails.features.map((feature, index) => (
                        <li key={index} className='flex gap-2'>
                          <Input
                            type='text'
                            value={feature}
                            onChange={(e) => handleListChange('features', index, e.target.value)}
                          />
                          <Button variant='outline' onClick={() => handleRemoveItem('features', index)}>
                            Удалить
                          </Button>
                        </li>
                      ))}
                      <Button onClick={() => handleAddItem('features')}>Добавить характеристику</Button>
                    </ul>
                  </div>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='description'>Преимущества</Label>
                  <div>
                    <ul className='flex flex-col gap-2'>
                      {productDetails.benefits.map((benefit, index) => (
                        <li key={index} className='flex gap-2'>
                          <Input
                            type='text'
                            value={benefit}
                            onChange={(e) => handleListChange('benefits', index, e.target.value)}
                          />
                          <Button variant='outline' onClick={() => handleRemoveItem('benefits', index)}>
                            Удалить
                          </Button>
                        </li>
                      ))}
                      <Button onClick={() => handleAddItem('benefits')}>Добавить преимущество</Button>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-07-chunk-0'>
              <CardHeader>
                <CardTitle>Информация о рынке и аудитории</CardTitle>
                <CardDescription>Ключевые знания для продаж и маркетинга</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='targetAudience'>Целевая аудитория</Label>
                    <Input
                      id='targetAudience'
                      name='targetAudience'
                      value={productDetails.targetAudience}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='marketAnalysis'>Анализ рынка</Label>
                    <Textarea
                      id='marketAnalysis'
                      name='marketAnalysis'
                      value={productDetails.marketAnalysis}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='marketAnalysis'>Конкурентные преимущества</Label>
                    <Textarea
                      id='marketAnalysis'
                      name='marketAnalysis'
                      value={productDetails.competitiveAdvantage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-07-chunk-0'>
              <CardHeader>
                <CardTitle>Информация о создании продукта</CardTitle>
                <CardDescription>Ключевые знания для начала бизнеса</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='estimatedBudget'>Предполагаемый бюджет и сроки</Label>
                    <Textarea
                      id='estimatedBudget'
                      name='estimatedBudget'
                      value={productDetails.estimatedBudget}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='potentialChallenges'>Возможные проблемы и пути их решения</Label>
                    <Textarea
                      id='potentialChallenges'
                      name='potentialChallenges'
                      value={productDetails.potentialChallenges}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='additionalRecommendations'>Дополнительные рекомендации</Label>
                    <Textarea
                      id='additionalRecommendations'
                      name='additionalRecommendations'
                      value={productDetails.additionalRecommendations}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card x-chunk='dashboard-07-chunk-0'>
              <CardHeader>
                <CardTitle>Дополнительно</CardTitle>
                <CardDescription>Дополнительная информация для успеха продукта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='uniqueOffer'>Уникальное торговое предложение</Label>
                    <Textarea
                      id='uniqueOffer'
                      name='uniqueOffer'
                      value={productDetails.uniqueOffer}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
            <Card x-chunk='dashboard-07-chunk-3'>
              <CardHeader>
                <CardTitle>Приоритет продукта</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='status'>Обновить приоритет</Label>
                    <Select>
                      <SelectTrigger id='status' aria-label='Select status'>
                        <SelectValue placeholder='Выберите приоритет' />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(({icon, label, value}) => (
                          <SelectItem value={value} key={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-07-chunk-5'>
              <CardHeader>
                <CardTitle>Избранное</CardTitle>
                <CardDescription>Добавьте продукт в избранное чтобы не потерять его из вида</CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size='sm' variant='secondary'>
                  Добавить в избранное
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 md:hidden'>
          <Button variant='outline' size='sm'>
            Вернуть назад
          </Button>
          <Button size='sm'>Сохранить</Button>
        </div>
      </div>
    </main>
  );
};
