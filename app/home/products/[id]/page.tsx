import {Product} from '@/components/Product/Product';

export default function ProductDetail({params}: {params: {id: string}}) {
  return <Product id={params.id} />;
}
