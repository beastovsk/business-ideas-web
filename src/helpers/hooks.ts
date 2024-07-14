export const formatProductPrice = (price: number) => {
  const RURubles = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  });

  return RURubles.format(price);
};

export const getParsedDate = (date: string) => {
  return new Intl.DateTimeFormat('ru-RU', {month: 'long', day: 'numeric', year: 'numeric'}).format(new Date(date));
};
