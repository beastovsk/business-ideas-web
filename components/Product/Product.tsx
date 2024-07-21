'use client';

import {ChevronLeft} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';

import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

import {priorities} from '../ProductsTable/data';
import {useEffect, useState} from 'react';
import {Input} from '../ui/input';
import {Textarea} from '../ui/textarea';
import {useMutation, useQuery} from 'react-query';
import {getProductById, updateProduct} from '@/data/api/products';
import Loading from '@/app/loading';
import {ProductMenu} from '../ProductMenu/ProductMenu';
import {useToast} from '../ui/use-toast';
import {Icons} from '../ui/icons';

export const Product = ({id}) => {
  const {data, isLoading, isSuccess, refetch} = useQuery('product', () => getProductById({id}));
  const {mutate, isLoading: isProductUpdating} = useMutation(updateProduct);
  const router = useRouter();
  const {toast} = useToast();
  const [priority, setPriority] = useState('');
  const [productDetails, setProductDetails] = useState({
    productName: '',
    productDescription: '',
    features: [],
    benefits: [],
    targetAudience: '',
    marketAnalysis: '',
    competitiveAdvantage: '',
    estimatedBudget: '',
    potentialChallenges: '',
    additionalRecommendations: '',
    uniqueOffer: ''
  });
  const [copyProduct, setCopyProduct] = useState(null);

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

  useEffect(() => {
    if (!isSuccess) return;

    const productDetailsNew = JSON.parse(JSON.parse(data.product.info).res);
    setCopyProduct(data.product.info.res);
    setProductDetails(productDetailsNew);
    setPriority(data.product.priority);
  }, [isSuccess, data]);

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  const handleUpdateProduct = () => {
    const updatedProduct = {
      id: data.product.id,
      title: productDetails.productName,
      description: productDetails.productDescription,
      date: data.product.date,
      amount: data.product.amount,
      info: JSON.stringify({
        req: JSON.parse(data.product.info).req,
        res: JSON.stringify(productDetails)
      }),
      favourite: data.product.favourite,
      status: data.product.status,
      label: data.product.label,
      priority,
      created_at: data.product.created_at,
      userid: data.product.userid
    };

    mutate(updatedProduct, {
      onSuccess: (data) => {
        if (data.message) toast({title: 'Уведомления продукта', description: data.message});
        refetch();
      }
    });
  };

  const resetProductUpdates = () => {
    const productDetailsNew = JSON.parse(JSON.parse(data.product.info).res);
    setCopyProduct(data.product.info.res);
    setProductDetails(productDetailsNew);
    setPriority(data.product.priority);
    toast({title: 'Уведомления продукта', description: 'Изменения успешно отменены'});
  };

  return (
    <main className='grid flex-1 items-start gap-4 p-0 sm:p-6 md:gap-8'>
      <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => router.back()}>
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Button>

          <h1 className='flex-1 truncate max-w-[150px] md:max-w-max shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight'>
            {productDetails?.productName}
          </h1>

          <Badge variant='outline' className='ml-auto sm:ml-0'>
            Создано
          </Badge>
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Button variant='outline' size='sm' onClick={resetProductUpdates}>
              Вернуть назад
            </Button>
            <Button size='sm' onClick={handleUpdateProduct}>
              {isProductUpdating && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
              Сохранить
            </Button>
          </div>
          <ProductMenu id={id} />
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
                      disabled={isLoading || isProductUpdating}
                      id='productName'
                      name='productName'
                      value={productDetails?.productName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='productDescription'>Описание</Label>
                    <Textarea
                      disabled={isLoading || isProductUpdating}
                      id='productDescription'
                      name='productDescription'
                      value={productDetails?.productDescription}
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
                      {productDetails?.features?.map((feature, index) => (
                        <li key={index} className='flex gap-2'>
                          <Input
                            disabled={isLoading || isProductUpdating}
                            type='text'
                            value={feature}
                            onChange={(e) => handleListChange('features', index, e.target.value)}
                          />
                          <Button
                            disabled={isLoading || isProductUpdating}
                            variant='outline'
                            onClick={() => handleRemoveItem('features', index)}
                          >
                            Удалить
                          </Button>
                        </li>
                      ))}
                      <Button onClick={() => handleAddItem('features')} disabled={isLoading || isProductUpdating}>
                        Добавить характеристику
                      </Button>
                    </ul>
                  </div>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='description'>Преимущества</Label>
                  <div>
                    <ul className='flex flex-col gap-2'>
                      {productDetails?.benefits?.map((benefit, index) => (
                        <li key={index} className='flex gap-2'>
                          <Input
                            disabled={isLoading || isProductUpdating}
                            type='text'
                            value={benefit}
                            onChange={(e) => handleListChange('benefits', index, e.target.value)}
                          />
                          <Button
                            disabled={isLoading || isProductUpdating}
                            variant='outline'
                            onClick={() => handleRemoveItem('benefits', index)}
                          >
                            Удалить
                          </Button>
                        </li>
                      ))}
                      <Button disabled={isLoading || isProductUpdating} onClick={() => handleAddItem('benefits')}>
                        Добавить преимущество
                      </Button>
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
                      disabled={isLoading || isProductUpdating}
                      id='targetAudience'
                      name='targetAudience'
                      value={productDetails?.targetAudience}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='marketAnalysis'>Анализ рынка</Label>
                    <Textarea
                      disabled={isLoading || isProductUpdating}
                      id='marketAnalysis'
                      name='marketAnalysis'
                      value={productDetails?.marketAnalysis}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='competitiveAdvantage'>Конкурентные преимущества</Label>
                    <Textarea
                      disabled={isLoading || isProductUpdating}
                      id='competitiveAdvantage'
                      name='competitiveAdvantage'
                      value={productDetails?.competitiveAdvantage}
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
                      disabled={isLoading || isProductUpdating}
                      id='estimatedBudget'
                      name='estimatedBudget'
                      value={productDetails?.estimatedBudget}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='potentialChallenges'>Возможные проблемы и пути их решения</Label>
                    <Textarea
                      disabled={isLoading || isProductUpdating}
                      id='potentialChallenges'
                      name='potentialChallenges'
                      value={productDetails?.potentialChallenges}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='additionalRecommendations'>Дополнительные рекомендации</Label>
                    <Textarea
                      disabled={isLoading || isProductUpdating}
                      id='additionalRecommendations'
                      name='additionalRecommendations'
                      value={productDetails?.additionalRecommendations}
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
                      disabled={isLoading || isProductUpdating}
                      id='uniqueOffer'
                      name='uniqueOffer'
                      value={productDetails?.uniqueOffer}
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
                    <Select
                      disabled={isLoading || isProductUpdating}
                      value={priority}
                      onValueChange={(val) => setPriority(val)}
                    >
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
                <Button disabled={isLoading || isProductUpdating} size='sm' variant='secondary'>
                  Добавить в избранное
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 md:hidden'>
          <Button variant='outline' size='sm' onClick={resetProductUpdates}>
            Вернуть назад
          </Button>
          <Button size='sm' onClick={handleUpdateProduct}>
            {isProductUpdating && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Сохранить
          </Button>
        </div>
      </div>
    </main>
  );
};
